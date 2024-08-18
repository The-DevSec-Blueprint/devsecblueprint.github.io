# Installing and Configurating Gitea

## Prerequisities

1. **Install MariaDB:**

   - Run the following command to install MariaDB:

     ```bash
     sudo apt install mariadb-server
     ```

2. **Secure MariaDB Installation:**

   - Run the secure installation script:

     ```bash
     sudo mysql_secure_installation
     ```

   - During the setup, follow these prompts:
     - **Enter current password for root:** Press Enter if none.
     - **Switch to unix_socket authentication?** Type `y` and press Enter.
     - **Change the root password?** Type `n` and press Enter.
     - **Remove anonymous users?** Type `y` and press Enter.
     - **Disallow root login remotely?** Type `y` and press Enter.
     - **Remove test database and access to it?** Type `y` and press Enter.
     - **Reload privilege tables now?** Type `y` and press Enter.
   - After completing these steps, your MariaDB installation should be secure.

3. **Log into MariaDB as Root:**

   - Use the following command to log into MariaDB:

     ```bash
     mysql -u root -p
     ```

4. **Configure the Database:**

   - Create a new database for Gitea:

     ```sql
     CREATE DATABASE giteadb CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin';
     ```

   - Grant all privileges to a new user:

     ```sql
     GRANT ALL PRIVILEGES ON giteadb.* TO 'gitea'@'%';
     FLUSH PRIVILEGES;
     ```

   - Create a user for Gitea and set a secure password:

     ```sql
     SET old_passwords=0;
     CREATE USER 'gitea'@'%' IDENTIFIED BY 'your_password';
     ```

5. **Test Database Connection:**

   - Test the connection to the Gitea database:

     ```bash
     mysql -u gitea -h 203.0.113.3 -p giteadb
     ```

6. **Install Nginx:**

   - Install Nginx using the following command:

     ```bash
     sudo apt install nginx
     ```

7. **Configure Nginx:**

   - Unlink the default configuration file:

     ```bash
     sudo unlink /etc/nginx/sites-enabled/default
     ```

   - Create a new configuration file for the reverse proxy:

     ```bash
     sudo nano /etc/nginx/sites-available/reverse-proxy
     ```

   - Copy the following configuration into the file, then save and close it:

     ```nginx
     server {
         listen 80;
         server_name localhost;

         location / {
             proxy_pass http://127.0.0.1:3000;
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
             proxy_set_header X-Forwarded-Proto $scheme;
         }
     }
     ```

   - Activate the new proxy configuration and restart Nginx:

     ```bash
     sudo ln -s /etc/nginx/sites-available/reverse-proxy /etc/nginx/sites-enabled/
     sudo systemctl restart nginx
     ```

## Installation Steps

8. **Install Gitea:**

   - Install Gitea using snap:

     ```bash
     sudo snap install gitea
     ```

   - Start the Gitea service:

     ```bash
     sudo snap start gitea
     ```

## Configuration Steps

9. **Configure Gitea:**

   - Open a web browser and navigate to your server's IP address or domain name.
   - Follow the on-screen instructions to configure Gitea, entering your previously created database credentials when prompted.
     ![Gitea Setup Screenshot](installing-gitea/image.png)

10. **Create an Account:**

    - Create an admin account to manage your Gitea instance.
      ![Create Account Screenshot](installing-gitea/image-1.png)

11. **You’re Done!**
    - Congratulations! Gitea is now successfully installed and configured on your server.
      ![Success Screenshot](installing-gitea/image-2.png)
