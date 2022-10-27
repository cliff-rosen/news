Readme for news app

Deployment to AWS

AWS Setup
 Front End: Route59 -> CloudFront -> S3
 * S3 bucket with public access for front end
 * CloudFront as gateway to S3 bucket for HTTPS, etc.
 * Route59 maps URL to CloudFront/S3

 Back End: EC2 (Node) -> RDS (MariaDB)
 * EC2 instance running Ubuntu with npm, node and gh
 * RDS running MariaDB with news / admin / *** and public access

Front End Deployment
* update conf.js with API_URL
* npm run build
* deploy build folder to S3 via AWS console

Back End Deployment
* HeidiSQL to RDS
 - run create.sql
* SSH to EC2 (Node)
  - update secrets.js
  - git pull
  - npm i
  - node app OR pm2 start app.js

Running Node with PM2
	pm2 start app.js --log app.log
	tail -f /home/ubuntu/.pm2/logs/app-out.log
	pm2 stop app
	pm2 reload app
	pm2 list
https://pm2.keymetrics.io/docs/usage/quick-start/
https://app.pm2.io/bucket/63595d62fb25bf525687fe37/backend/overview/servers
username: crosen
email: cliff.rosen@gmail.com
password: cmrpm2
Successfully created the bucket
[PM2 I/O] Using: 
Public key: xl0hmflo95gi2qz | 
Private key: 812wqp859hc12qm | 
Machine name: ip-172-31-33-212-ce1c


