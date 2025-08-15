# S3 Files uploader application
This is a frontend ReactJS application provides login/logout ability.
User has to be created in the AWS Cognito first.
Once user login is complete, they will have ability to upload multiple files.<br/>
For single file uploads, name format should be:<br/>
dailies_YYYYMMDD_v1.xlsx<br/>
For multiple file uploads and order of processing the files is strict then format should be:<br/>
1_dailies_YYYYMMDD_v1.xlsx<br/>
2_dailies_health_YYYYMMDD_v1.xlsx<br/>

# Assumptions
It is assumed that user always keeps headers and columns in same order

# To run the app locally

```bash
npm run dev
```

# To build the app
```bash
npm run build
```