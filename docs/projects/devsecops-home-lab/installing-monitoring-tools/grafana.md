---
id: install-config-grafana
title: Grafana
sidebar_position: 4
---

## **Prerequisites**

1. **Install Docker**

   - Install Docker using Snap:

     ```bash
     sudo snap install docker
     ```

2. **Create Docker Group and Add User to It**

   - Create a Docker group and add your user to it:

     ```bash
     sudo groupadd docker
     sudo usermod -aG docker $USER
     sudo reboot
     ```

## **Installation Steps**

1. **Create a Docker-Compose File for Grafana**

   - Create the necessary directories and Docker-Compose file:

     ```bash
     mkdir -p ~/apps/grafana
     touch ~/apps/grafana/docker-compose.yml
     ```

2. **Copy and Save the Docker-Compose Configuration**

   - Use the following configuration in your `docker-compose.yml` file:

     ```yaml
     version: '3.7'

     services:
       grafana:
         image: grafana/grafana:latest
         container_name: grafana
         ports:
           - "3000:3000"
         environment:
           - GF_SECURITY_ADMIN_PASSWORD=your_admin_password
           - GF_SECURITY_ADMIN_USER=your_admin_user
         volumes:
           - grafana_data:/var/lib/grafana
         restart: always

     volumes:
       grafana_data:
     ```

   - Open the file with nano or your preferred text editor and paste the configuration:

     ```bash
     nano ~/apps/grafana/docker-compose.yml
     ```

   - Save and close the file.

3. **Run Grafana with Docker-Compose**

   - Navigate to the Grafana directory and run the container:

     ```bash
     cd ~/apps/grafana
     docker-compose up -d
     ```

4. **Confirm Grafana is Running**

   - Check if Grafana is up and running by visiting `http://localhost:3000` in your web browser.

   ![Grafana Login](/img/projects/devsecops-home-lab/installing-monitoring-tools/image.png)

## **Configuration Steps**

1. **Log into the Dashboard**

   - Use your admin username and password to log into the Grafana dashboard.

   ![Grafana Dashboard](/img/projects/devsecops-home-lab/installing-monitoring-tools/image-1.png)

2. **Update Admin Username**

   - Click on your profile and update the admin username.

   ![Update Username](/img/projects/devsecops-home-lab/installing-monitoring-tools/image-2.png)

3. **Update Admin Password**

   - Change your password for enhanced security.

   ![Update Password](/img/projects/devsecops-home-lab/installing-monitoring-tools/image-3.png)

**You're done!** You’ve successfully installed and configured Grafana on your system.
