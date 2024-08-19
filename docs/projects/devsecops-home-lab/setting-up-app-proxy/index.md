# Setting Up App Proxy

5. **Install Nginx:**

   - Install Nginx using the following command:

     ```bash
     sudo apt install nginx
     ```

6. **Configure Nginx:**

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
             proxy_pass http://127.0.0.1:8080;
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

Now we have a proxy for our application that we've configured that's going to give us what we need from it.
