---
id: install-config-sonarqube
title: SonarQube
sidebar_position: 4
---

1. **Switch to the PostgreSQL User**  
   First, switch to the `postgres` user to perform database-related tasks:

   ```bash
   sudo -i -u postgres
   ```

2. **Create a Database and User for SonarQube**  
   Create a new PostgreSQL user and database for SonarQube:

   ```bash
   createuser sonar
   createdb sonar
   ```

3. **Set Password and Grant Privileges**  
   Set a password for the `sonar` user and grant the necessary privileges:

   ```bash
   psql
   ALTER USER sonar WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE sonar TO sonar;

   \c sonar
   GRANT ALL ON SCHEMA public TO sonar;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sonar;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sonar;
   GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO sonar;
   GRANT USAGE ON SCHEMA public TO sonar;
   GRANT CREATE ON SCHEMA public TO sonar;
   ```

4. **Exit PostgreSQL and Return to the Original User**  
   Exit the PostgreSQL session and return to your original user:

   ```bash
   exit 
   exit
   ```

5. **Update the `pg_hba.conf` File**  
   Modify the `pg_hba.conf` file to configure authentication:

   ```bash
   sudo nano /etc/postgresql/16/main/pg_hba.conf
   ```

   Add the following line to enable `scram-sha-256` authentication for the `sonar` user:

   ```conf
   local   sonar           sonar                                   scram-sha-256 
   ```

6. **Download and Install SonarQube**  
   Download the SonarQube package and extract it:

   ```bash
   cd /opt
   sudo wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-10.6.0.92116.zip
   sudo apt install unzip -y
   sudo unzip sonarqube-10.6.0.92116.zip
   sudo mv sonarqube-10.6.0.92116 sonarqube
   ```

7. **Create a SonarQube User**  
   Create a dedicated user for running SonarQube and set the correct permissions:

   ```bash
   sudo adduser sonar
   sudo chown -R sonar:sonar /opt/sonarqube
   ```

8. **Update SonarQube Database Configuration**  
   Edit the `sonar.properties` file to configure SonarQube's connection to the PostgreSQL database:

   ```bash
   sudo nano /opt/sonarqube/conf/sonar.properties
   ```

   Update the PostgreSQL settings:

   ```ini
   # PostgreSQL settings
   sonar.jdbc.username=sonar
   sonar.jdbc.password=your_password
   sonar.jdbc.url=jdbc:postgresql://localhost/sonar
   ```

9. **Set Up the SonarQube Service**  
   Create a new systemd service file for SonarQube:

   ```bash
   sudo nano /etc/systemd/system/sonarqube.service
   ```

   Copy the following content into the file:

   ```ini
   [Unit]
   Description=SonarQube service
   After=syslog.target network.target

   [Service]
   Type=forking
   User=sonar
   Group=sonar

   ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
   ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
   ExecReload=/opt/sonarqube/bin/linux-x86-64/sonar.sh restart

   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```

10. **Reload Systemd and Start SonarQube**  
    Reload the systemd daemon and start the SonarQube service:

    ```bash
    sudo systemctl daemon-reload
    sudo systemctl start sonarqube
    sudo systemctl enable sonarqube
    ```

11. **Confirm SonarQube is Running**  
    Verify that SonarQube is running by opening your web browser and navigating to:

    ```
    http://your_ip_address:9000
    ```

    ![SonarQube Interface](/img/projects/devsecops-home-lab/installing-security-tools/image.png)
