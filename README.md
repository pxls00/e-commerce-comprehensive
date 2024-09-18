## **E-commerce App - Quick Start Guide##**

**Prerequisites:**

Before starting, please ensure you have **Docker** installed on your system.

**Setup Instructions:**

App requires: 

**localhost:8080** // admin-panel

**localhost:8081** // marketplace

**localhost:3000** // api

**localhost:5432** // postgres

**localhost:4434** // pgadmin


1. Ensure Docker is running on your system.
2. Open a terminal and navigate to the ``root/docker-compose`` directory.
3. Run the following command to build the Docker images:

```bash
./up.sh
```

This script uses the `docker-compose.yaml` configuration file to build and run all necessary containers.

