project
                          GitHub
                            |
                     Pull Request
                            |
                            ↓
                    GitHub Actions
                            |
              ┌─────────────┴─────────────┐
              |                           |
             CI                          Test
              |                           |
              └─────────────┬─────────────┘
                            ↓
                         DEV EC2
                            |
                         PM2
                            |
                            ↓
                      DEV Application
                            |
                      Developer Testing
                            |
                            ↓
                         QA EC2
                            |
                         PM2
                            |
                            ↓
                       QA Application
                            |
                         QA Testing
                            |
                         Approval
                            |
                            ↓
                        PROD EC2
                            |
                           PM2
                            |
                            ↓
                    Production Application
                            |
                            ↓
                         Customers

 
developer 1
push      -   git -  GitHub repo - cicd(githubations- 1.build process means create a zip,2.deploy ) - aws ec2 - git ,node,npm,pm2 - url refresh

ec2 machine 1 time setup ,configure,- manually run the application - up and running

-application nodejs

settings > secrets and variables -> actions > EC2_HOST , EC2_SSH_KEY - manage sensitive data

githubaction process -
folder -----> .github/workflows/xyz.yml


ec2 - open port - 3000,80,22

ssh -i ec2-user@ip

software install
sudo dnf update -y
sudo dnf install git -y
git --version
sudo dnf list nodejs
sudo dnf install nodejs -y
node --version
npm --version

ec2 -machine
mkdir -p ~/node-cicd-demo
cd ~/node-cicd-demo
git clone https://github.com/YOUR_USERNAME/aws-cicd.git .
cd aws-cicd
npm install - run time pe packages installed
npm start - run applications
you should see Server running on port 3000
crt +c
new bash window -  curl http://localhost:3000  ->  running application on local machine
sudo npm install -g pm2
cd node-cicd-demo/aws-ec2-cicd/
pm2 start app.js --name node-cicd-demo
pm2 status
you should see - node-cicd-demo    online
pm2 save
pm2 startup

windows 13.235.70.128
public ip:3000

ec2 - security- security groups - inbound rules - 3000,80

GitHub- settings - secrets and variables -actions - new repository secrets
EC2_HOST - ex. 54.123.45.67
EC2_SSH_KEY - key

git pull origin main


windows code -  github push - githubaction(build process - zip ,deploy )-   Aws ec2 - manually clone ,git nodejs ,pm2 git clone ,run
node application

app.js - update - GitHub actions pipeline run - checkout push the code - deploy code ec2  - application url  refresh ->
app.js - upadte
app123.js  - update


sudo ss -lntp | grep :3000
ps aux | grep node
node app.js
curl http://localhost:3000
pm2 delete node-cicd-demo
pm2 start app.js --name node-cicd-demo
pm2 status
sudo lsof -i :3000
sudo ss -lntp | grep :3000
node app.js
ps aux | grep node

yml

name: Deploy Node.js App

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ec2-user
          key: ${{ secrets.EC2_SSH_KEY }}

          script: |
            set -e

            echo "======================================"
            echo "Starting deployment..."
            echo "======================================"

            cd /home/ec2-user/node-cicd-demo/aws-ec2-cicd

            echo "1. Getting latest code..."
            git fetch origin main
            git reset --hard origin/main
            git clean -fd

            echo "2. Checking deployed commit..."
            git rev-parse HEAD
            git log -1 --oneline

            echo "3. Installing dependencies..."
            npm install

            echo "4. Restarting PM2 application..."

            if pm2 describe node-cicd-demo > /dev/null 2>&1; then
                pm2 restart node-cicd-demo --update-env
            else
                pm2 start app.js --name node-cicd-demo
            fi

            pm2 save

            echo "5. Checking PM2 status..."
            pm2 status

            echo "6. Deployment completed successfully!"


dev env       QA env   prod env(main)
code - dev
dev.yml
ec2_host_dev
ec2_key_dev


QA env
code - qa
qa.yml
ec2_host_qa
ec2_key_qa

node js  - dev,QA,prod  - aws ec2 using    gitubaction as cicd


const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.APP_ENV || "DEV";

app.get("/", (req, res) => {
  res.send(`Hello Team - Environment: ${ENV}`);
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Application running on port ${PORT}`);
});


{
  "name": "node-cicd-demo",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}


APP_ENV=DEV pm2 start app.js --name node-cicd-demo

