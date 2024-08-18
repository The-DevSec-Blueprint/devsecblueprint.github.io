---
id: install-config-jenkins
title: Jenkins - Installation and Configuration
sidebar_position: 3
---

## Prerequisities

1. **Install Java:**

   - First, update your package manager and install Java:

     ```bash
     sudo apt update
     sudo apt install fontconfig openjdk-17-jre
     ```

## Installation Steps

2. **Configure the Package Manager and Install Jenkins:**

   - Add Jenkins to your package manager by downloading and installing the Jenkins key:

     ```bash
     sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
     ```

   - Add the Jenkins repository to your sources list:

     ```bash
     echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
     ```

   - Update your package list and install Jenkins:

     ```bash
     sudo apt-get update
     sudo apt-get install jenkins
     ```

3. **Enable and Start Jenkins:**

   - Enable Jenkins to start on boot:

     ```bash
     sudo systemctl enable jenkins
     ```

   - Start Jenkins:

     ```bash
     sudo systemctl start jenkins
     ```

4. **Verify Jenkins is Running:**

   - Check the status of Jenkins to ensure it's active:

     ```bash
     sudo systemctl status jenkins
     ```

   - You should see output similar to the following if Jenkins is up and running:

     ```bash
     ● jenkins.service - Jenkins Continuous Integration Server
        Loaded: loaded (/usr/lib/systemd/system/jenkins.service; enabled; preset: enabled)
        Active: active (running) since [DATE]; [TIME] ago
        Main PID: 9188 (java)
     ```

## Configuration Steps

5. **Access Jenkins via Web Browser:**

   - Open your web browser and go to:

     ```bash
     http://your_ip:8080
     ```

   - You should see the Jenkins setup screen.
     ![alt text](/img/projects/devsecops-home-lab/installing-jenkins/image.png)

6. **Retrieve the Initial Admin Password:**

   - To proceed with the setup, you will need the initial admin password. Retrieve it by running the following command on your server:

     ```bash
     sudo cat /var/lib/jenkins/secrets/initialAdminPassword
     ```

   - Copy the password and enter it in the password box on the web interface.
     ![alt text](/img/projects/devsecops-home-lab/installing-jenkins/image-1.png)

7. **Install Suggested Plugins:**

   - After entering the admin password, click **Install suggested plugins** and allow Jenkins to install the necessary plugins.
     ![alt text](/img/projects/devsecops-home-lab/installing-jenkins/image-2.png)

8. **Set Up Your Admin Account:**

   - After the plugins are installed, you’ll be prompted to set up your admin account. Enter your details and set up your Jenkins instance.
     ![alt text](/img/projects/devsecops-home-lab/installing-jenkins/image-3.png)
     ![alt text](/img/projects/devsecops-home-lab/installing-jenkins/image-4.png)

9. **Jenkins is Ready!**
   - Once the setup is complete, Jenkins is fully configured and ready for use.
     ![alt text](/img/projects/devsecops-home-lab/installing-jenkins/image-5.png)
