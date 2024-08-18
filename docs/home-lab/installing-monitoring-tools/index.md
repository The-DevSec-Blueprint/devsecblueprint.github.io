# Installing and Configuring Monitoring Tools

## Prerequisities

- install docker
```
sudo snap install docker
```

- create docker group and add user to it
```
sudo groupadd docker
sudo usermod -aG docker $USER
sudo reboot
```

## Grafana

### Installation Steps

- Create docker-compose file for grafana:
```
mkdir ~/apps
mkdir ~/apps/grafana
touch ~/apps/grafana/docker-compose.yml
```

- Copy text below and svae using nano:
```
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

- run with docker-compose
```
cd ~/apps/grafana
docker-compose up -d
```

## Prometheus

### Installation Steps

- Create docker-compose file for Prometheus:
```
mkdir ~/apps
mkdir ~/apps/prometheus
touch ~/apps/prometheus/docker-compose.yml
```

- Copy text below and svae using nano:
```
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

- create custom protheus.yml file:
```
touch prometheus.yml
```
```
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

```
cd ~/apps/prometheus
docker-compose up -d
```