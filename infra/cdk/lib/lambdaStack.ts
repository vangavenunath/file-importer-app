import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';

export class RubyLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda Layer
    const layer = new lambda.LayerVersion(this, 'RubyGemLayer', {
      compatibleRuntimes: [lambda.Runtime.RUBY_3_4],
      code: lambda.Code.fromAsset('lambda-layer'),
      description: 'Lambda layer with required ruby gems',
    });

    // Create Lambda Function
    const rubyFunction = new lambda.Function(this, 'fileImporterLambda', {
      runtime: lambda.Runtime.RUBY_3_2,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/fileImporterLambda'),
      layers: [layer],
      environment: {
        // Add any environment variables your function needs
      },
    });

     // Create S3 Bucket
     const bucket = new s3.Bucket(this, 'TriggerBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Use with caution
      autoDeleteObjects: true, // Use with caution
    });

    // Add S3 trigger to Lambda function
    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3n.LambdaDestination(rubyFunction)
    );

    // Grant necessary permissions to the Lambda function
    bucket.grantRead(rubyFunction);
  }
}
