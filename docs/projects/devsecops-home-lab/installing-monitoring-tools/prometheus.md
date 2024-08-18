---
id: install-config-prometheus
title: Prometheus
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

1. **Create a Docker-Compose File for Prometheus**

   - Create the necessary directories and Docker-Compose file:

     ```bash
     mkdir -p ~/apps/prometheus
     touch ~/apps/prometheus/docker-compose.yml
     ```

2. **Copy and Save the Docker-Compose Configuration**

   - Use the following configuration in your `docker-compose.yml` file:

     ```yaml
     version: '3.7'

     services:
       prometheus:
         image: prom/prometheus:latest
         container_name: prometheus
         volumes:
           - prometheus_data:/prometheus
           - ./prometheus.yml:/etc/prometheus/prometheus.yml
         ports:
           - "9090:9090"
         restart: always

     volumes:
       prometheus_data:
     ```

   - Open the file with nano or your preferred text editor and paste the configuration:

     ```bash
     nano ~/apps/prometheus/docker-compose.yml
     ```

   - Save and close the file.

3. **Create a Custom `prometheus.yml` File**

   - Create the `prometheus.yml` file in the Prometheus directory:

     ```bash
     touch ~/apps/prometheus/prometheus.yml
     ```

   - Add the following configuration to the `prometheus.yml` file:

     ```yaml
     global:
       scrape_interval: 15s
       evaluation_interval: 15s

     scrape_configs:
       - job_name: 'prometheus'
         static_configs:
           - targets: ['localhost:9090']
     ```

4. **Run Prometheus with Docker-Compose**

   - Navigate to the Prometheus directory and run the container:

     ```bash
     cd ~/apps/prometheus
     docker-compose up -d
     ```

5. **Confirm Prometheus is Running**

   - Check if Prometheus is up and running by visiting `http://localhost:9090` in your web browser.

   ![Prometheus Dashboard](/img/projects/devsecops-home-lab/installing-monitoring-tools/image-4.png)

**You're done!** You’ve successfully installed and configured Prometheus on your system.
