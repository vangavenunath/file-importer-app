// src/aws-exports.js
const awsconfig = {
    Auth: {
      Cognito: {
          region: 'ap-southeast-2',
        userPoolId: 'ap-southeast-2_vABbcxCi9',
        userPoolClientId: '5mlg0fu54v1radumlspf4vu73k',
        identityPoolId: 'ap-southeast-2:a86f7c6f-6ea6-434a-a433-a0a1108d2267'
      }
    },
    Storage: {
      S3: {
        bucket: 'testcsvfilesbucket333',
        region: 'ap-southeast-2',
      },
    },
  };
  
  export default awsconfig;
  