# Deployment to EC2 Instance of Amazon

This project demonstrates automated deployment of a React application to an **Amazon EC2 instance** using **GitHub Actions**.

---

## ⚙️ GitHub Actions Workflow

The workflow runs on every push to the `master` branch.  
It connects to your EC2 instance via SSH and deploys the latest build.

### `.github/workflows/deploy.yml`

```yaml
name: Deployment to EC2 instance of Amazon

on:
    push:
        branches:
            - master

jobs:
    deploy:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout Code
                uses: actions/checkout@v4

            - name: Deploy via SSH
                uses: appleboy/ssh-action@v1.0.3
                with: 
                    host: ${{ secrets.SSH_IP_EC2 }}
                    username: ec2-user
                    key: ${{ secrets.SSH_KEY_EC2 }}
                    port: 22
                    script: |
                        cd /home/ec2-user/ExampleWebApp
                        git pull
                        npm install
                        npm run build
                        sudo rsync -av --delete ./dist/ /var/www/html/
```

## 🔑 Required Secrets

Add the following secrets in your GitHub repository settings:

- **SSH_IP_EC2** → Public IP of your EC2 instance
- **SSH_KEY_EC2** → Private SSH key for your EC2 instance
## 📂 Deployment Steps

1. Launch an Amazon EC2 instance (Amazon Linux or Ubuntu recommended)
2. Install Node.js and npm on the EC2 instance
3. Clone your project into `/home/ec2-user/ExampleWebApp`
4. Configure Nginx or Apache to serve files from `/var/www/html/`
5. Configure Security Groups:
    - Allow **HTTP (port 80)** from your IP only (for dev purposes)
    - Allow **SSH (port 22)** from anywhere `0.0.0.0/0` (for GitHub Actions access)
6. Push changes to the `master` branch → GitHub Actions will:
    - Pull latest code
    - Install dependencies
    - Build the React app
    - Sync build output (`dist/`) to `/var/www/html/`

