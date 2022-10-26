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
  - node app
