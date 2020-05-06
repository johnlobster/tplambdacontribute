 # tplambdacontribute

lambda server to pass contributions from Toilet Paper Crisis website to email

**John Webster**

Github : https://github.com/johnlobster

LinkedIn : https://www.linkedin.com/in/johnwwebster/

Portfolio : https://johnlobster.github.io/portfolio/

### Technologies used

- Node.js
- (Node) express
- (Node) cors
- (Node) dotenv

### Deployment

#### Testing

nodemon
Postman

#### Netlify

#### Required environment variables

`TP_HOST_NAME`
The host name of tp crisis website, eg www.ToiletPaperCrisis.com, or netlify name etc. during development

`TP_CONTRIBUTION_LAMBDA_ADDRESS`
Host name/port of server

`TP_EMAIL_ADDRESS`
Email address to send contributed information to 

```
TP_NODEMAILER_HOST=
TP_NODEMAILER_PORT=
TP_NODEMAILER_SECURE=
TP_NODEMAILER_AUTH_USERNAME=
TP_NODEMAILER_AUTH_PASSWORD=
```
Information to allow `nodemailer` to connect to mail server

### Deployment to google app engine

The main problem is that app engine doesn't support passing secrets except through the app.yaml and yaml format
doesn't have an include mechanism. The easiest solution is to add the secrets to app.yaml during the build flow,
with the exact mechanism depending on how the build flow reads secrets. The natural flow would be to use a github action,
but as this is a very simple server and should probably be rewritten as a cloud "function", manual deploys from the command line
are the simplest, and this is added into the `package.json` file.

It is also important not to check in the `app.yaml` file as it could contain secrets. The normal `app.yaml` content is therefore
in `google.app` which is checked in but does not have to be uploaded to the app engine.

```
    "deploy:google": "rm -rf app.yaml && node buildYaml.js && gcloud app deploy"
```
This package.json script assumes running on a machine with cloud SDK loaded and `gcloud` set up to refer to the deployment project

Example of environment variables in the google `app.yaml`
```
env_variables:
  MY_VAR: "my value"
```

### Technical notes

Very simple server


env_variables:
  MY_VAR: "my value"