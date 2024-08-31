---
id: devsecops-home-lab
title: DevSecOps Home Lab
description: Build a DevSecOps Home Lab based on what I have done.
sidebar_position: 3
---

Author: [Damien Burks]

## Overview

So you decided that you want to go down the route of building your own home lab? Well, hell... welcome! This is the first project where I'm going to show you how to setup your own home lab from scratch! This will include you going in and setting up and configuring databases, installing packages, and a lot of things that System Administrators would do.

>_According to [The Linux Handbook], a homelab is the name given to a server (or multiple server setup) that resides locally in your home and where you host several applications and virtualized systems for testing and developing or for home and functional usage._

To be more formal (in a sense), we're going to build a comprehensive DevSecOps Home Lab that simulates a real-world environment for testing, learning, and enhancing your DevSecOps skills. This lab is designed to give you hands-on experience with a variety of tools and technologies commonly used in the DevSecOps ecosystem.

## Don't have servers at home?

This is totally okay! There are two options that I'd recommend then:

1. Check out this video to learn how I went out to buy my systems for a very low price:
2. If you have experience with building things out in the cloud, you can replicate this exact architecture, although it may be a little different when connecting to your machines and vice versa.
3. Use tools like VirtualBox to create VM's locally. This comes with a bit of a learning curve.

## Architecture Overview and Debrief

My home lab consists of two servers running Ubuntu 24.04 LTS. To avoid any compatibility issues, you want to ensure that you are using this EXACT version.

You can take a look at this video to really understand the specifications of my machines: [YouTube Video - TBD](https://youtube.com)

![Architecture Diagram](/img/projects/devsecops-home-lab/architecture.drawio.svg)

## What You'll Learn

By completed this project fully, you will gain hands-on experience (practical) on setting up a DevSecOps environment, such as:

- Containerization: Deploying and managing applications in Docker containers.
- Monitoring and Logging: Using Prometheus to monitor application health and performance.
- Security Scanning: Implementing security tools like Trivy and SonarQube to identify vulnerabilities and maintain code quality.
- Web Traffic Management: Configuring Nginx as a reverse proxy to efficiently route and secure web traffic.

<!-- Links -->

[Damien Burks]: https://www.linkedin.com/in/damienjburks/
[The Linux Handbook]: https://linuxhandbook.com/homelab/
