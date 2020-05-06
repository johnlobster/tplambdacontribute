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

### Technical notes

Very simple server


