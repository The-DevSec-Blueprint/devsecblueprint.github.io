- make dir
```
cd apps 
mkdir cadvisor
```

- create docker lib dir
```
cd /var/lib
mkdir docker
chown -R root:root docker
```

- create docker compose file
```
touch docker-compose.yml
```

- copy into file
```
version: '3.8'

services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor
    container_name: cadvisor
    privileged: true
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
    network_mode: host
```

```
docker-compose up -d
```

you're done!