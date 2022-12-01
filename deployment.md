## Deployment Instructions

## EC2 Setup
1. Go to EC2 Dashboard, click on launch instance
2. Choose ubuntu as os and t2.medium as instance type
3. Click on create key pair, download the file, and keep it in a safe place
4. Under Network settings, tick “Allow HTTPS traffic from the internet” and “Allow HTTP traffic from the internet”
5. Click on launch instance

## EC2 Instance Setup

1. Open terminal and type “ssh -i ‘YOUR_KEY_PAIR.pem’ ubuntu@PublicIPv4DNS”. Can also get the public ipv4 dns from the instance’s details page.

2. ssh into the VM (Eg. ssh -i "aster.pem" ubuntu@ec2-54-193-115-169.us-west-1.compute.amazonaws.com) and run the following commands
```
sudo apt update -y
sudo apt upgrade -y
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" 
sudo apt install docker-ce docker-compose -y 
sudo systemctl enable docker 
sudo usermod -aG docker ubuntu 
mkdir ~/app 
ssh-keygen -t ed25519 -a 200 -C "your_email@example.com" 
cat .ssh/id_ed25519.pub >> ~/.ssh/authorized_keys 
[COPY THE OUTPUT OF] cat ~/.ssh/id_ed25519 [AND SAVE IT FOR LATER] 
sudo reboot 
```

## Github Actions Setup
- Go to project repo and add the following ENV VARIABLES to action secrets
  - COVALENT_API_KEY
  - HOST [Public IPv4 DNS]
  - KEY [~/.ssh/id_ed25519]
  - MONGO_URI [mongodb://mongo:27017]
  - NXYZ_API_KEY
  - PORT [8000]
  - USERNAME [ubuntu]
