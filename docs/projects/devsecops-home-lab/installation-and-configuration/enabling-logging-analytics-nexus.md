To configure Grafana to view Nexus traffic, you'll need to follow these steps:

### 1. **Set Up Nexus Repository Manager Monitoring**
   - Ensure that Nexus Repository Manager is properly configured to expose metrics. Nexus supports Prometheus for metrics exposure, which Grafana can use to visualize the data.
   - Enable Prometheus metrics in Nexus by editing the `nexus.properties` file, usually located in the `etc/` directory of your Nexus installation. Add or update the following property:
     ```
     sudo nano ./apps/nexus/nexus-data/etc/nexus.properties
     nexus.prometheus.enabled=true
     ```
   - Restart Nexus for the changes to take effect.
   ```
   docker compose down
   ```

### 2. **Set Up Prometheus**
   - Install and configure Prometheus to scrape metrics from Nexus.
   - In your Prometheus configuration (`prometheus.yml`), add a scrape job for Nexus:
     ```yaml
     scrape_configs:
       - job_name: 'nexus'
         static_configs:
           - targets: ['<nexus_host>:<nexus_port>']
     ```
     Replace `<nexus_host>` with your Nexus server's hostname or IP address and `<nexus_port>` with the port where Nexus is running (default is 8081).

   - Start Prometheus to begin collecting metrics from Nexus.

### 3. **Install and Configure Grafana**
   - Install Grafana if you haven't already.
   - Log in to Grafana and add Prometheus as a data source:
     1. Go to **Configuration > Data Sources**.
     2. Click **Add data source**.
     3. Select **Prometheus**.
     4. Enter your Prometheus server URL (e.g., `http://localhost:9090`).
     5. Click **Save & Test** to verify the connection.

### 4. **Create Dashboards in Grafana**
 - using this URL: https://grafana.com/grafana/dashboards/16459-infra-nexus/
   - Now that Prometheus is collecting Nexus metrics and Grafana is connected to Prometheus, you can create a dashboard to visualize Nexus traffic.
   - Go to **Create > Dashboard** in Grafana.
   - Click on **Add new panel**.
   - Select **Prometheus** as your data source.
   - Use the Prometheus query editor to fetch Nexus traffic data. For example:
     ```promql
     nexus_requests_total
     ```
     You can adjust the query to focus on specific aspects of Nexus traffic, such as request counts, response times, etc.

   - Customize the visualization type (e.g., graph, gauge, heatmap) according to your preferences.
   - Save the dashboard and panels.

### 5. **Monitor and Refine**
   - Once the dashboard is set up, monitor the traffic and refine the queries and visualizations as needed.
   - You can also set up alerts in Grafana based on traffic thresholds or other conditions.

### Example Dashboard Queries
Here are a few example Prometheus queries you might use:

- **Total Requests:**
  ```promql
  sum(rate(nexus_requests_total[1m]))
  ```

- **Request Latency:**
  ```promql
  histogram_quantile(0.95, sum(rate(nexus_request_duration_seconds_bucket[5m])) by (le))
  ```

- **Error Rate:**
  ```promql
  sum(rate(nexus_requests_total{status="500"}[5m])) / sum(rate(nexus_requests_total[5m])) * 100
  ```

This setup will allow you to visualize and monitor Nexus traffic in Grafana, helping you keep an eye on the performance and usage of your Nexus Repository Manager.