require "pg"
require "roo"
require "aws-sdk-s3"
require "json"

def lambda_handler(event:, context:)
  # ENV variables (ensure they are set in Lambda config)
  db_config = {
    host: ENV["DB_HOST"],
    dbname: ENV["DB_NAME"],
    user: ENV["DB_USER"],
    password: ENV["DB_PASSWORD"],
    port: ENV.fetch("DB_PORT", 5432),
  }

  s3 = Aws::S3::Client.new

  # Process S3 event
  event["Records"].each do |record|
    bucket_name = record["s3"]["bucket"]["name"]
    object_key = record["s3"]["object"]["key"]

    puts "Processing file: #{object_key} from bucket: #{bucket_name}"

    # Download file
    resp = s3.get_object(bucket: bucket, key: key)
    File.open("/tmp/upload.xlsx", "wb") { |f| f.write(resp.body.read) }
    # TODO: Validate the file has required headers and update the status
    # TODO: Add error handling to avoid process stopping when single file import fails
    # Parse Excel
    xlsx = Roo::Excelx.new("/tmp/upload.xlsx")
    sheet = xlsx.sheet(0)
    headers = sheet.row(1).map(&:strip).map(&:downcase)

    conn = PG.connect(db_config)

    success_count = 0
    failure_count = 0

    (2..sheet.last_row).each do |i|
      row = sheet.row(i)
      data = Hash[headers.zip(row)]

      begin
        conn.exec_params(
          "MERGE INTO Dailies AS tt
          USING (VALUES ($1, $2)) AS source_data(unleash_id, name)
          ON tt.unleash_id = source_data.unleash_id
          WHEN MATCHED THEN
              UPDATE SET name = source_data.name,
                          updated_at = NOW()
          WHEN NOT MATCHED THEN
              INSERT (unleash_id, name, created_at, updated_at) VALUES (source_data.unleash_id, source_data.name, , NOW(), NOW())",
          [data["unleash id"], data["name"]]
        )
        success_count += 1
      rescue => e
        failure_count += 1
        puts "Row #{i} failed: #{e.message}"
      end
    end
  end

  conn.close

  {
    statusCode: 200,
    body: JSON.generate({
      file: key,
      total_rows: sheet.last_row - 1,
      success: success_count,
      failed: failure_count,
    }),
  }
end
