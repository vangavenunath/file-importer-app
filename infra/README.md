# About
This backend lambda will automatically triggered when file is uploaded to S3 bucket(from the UI or directly).
Lambda will validate, process and save the data in Postgres Database.
TODO: Move the files to processed folder once finished.

# Pre-requisites
Ensure you have node v22 and ruby 3.4 installed.<br/>
Install aws cli. Configure the default profile with the account credentials where you want to deploy.<br/>
Install cdk library globally for build and deploy. Run `npm install -g cdk`.<br/>
Install postgresql locally. `brew install postgresql`<br/>
Go to lambda-layer folder, download ruby gems using `bundle install --path ruby/gems`<br/>

# Deployment
This deployment will create lambda, S3 bucket, S3 trigger config and relevant permissions.
```
cdk synth
cdk deploy
```
# Destroy the infra
```
cdk destroy
```
