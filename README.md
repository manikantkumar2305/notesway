# NotesWay – Academic Notes Management Platform

NotesWay is a production-grade, cloud-native academic notes management platform for students, professors, and educational institutions. It provides secure upload, organization, sharing, and retrieval of academic resources, built on a fully managed AWS 3-tier architecture with a strong focus on scalability, security, and observability.


---

## Architecture Overview

NotesWay follows a **3-tier cloud architecture** on AWS, split into a Presentation Tier, Application Tier, and Data/Infrastructure Tier, fronted by DNS and edge security, and backed by fully managed cloud services for storage, notifications, monitoring, and backups.

<img width="1536" height="1024" alt="notesway-arc" src="https://github.com/user-attachments/assets/5ad8580c-b08a-44ff-adb2-8bd360f71db2" />


### 1. Presentation Tier — 
- **Amazon CloudFront (CDN)** — serves the React frontend globally with low latency and edge caching.
- **Amazon S3 (Static Website Hosting)** — hosts the built React application (HTML/CSS/JS assets).

### 2. Application Tier — 
- **AWS WAF** — filters malicious traffic and protects against common web exploits (SQLi, XSS, bots) before requests reach the application.
- **Application Load Balancer (ALB)** — distributes incoming API traffic, terminates SSL/TLS, and routes requests into the VPC.
- **Amazon VPC (`10.0.0.0/16`)** — isolated network boundary for all compute resources.
  - **Public Subnet (`10.0.1.0/24`)**
    - **Amazon EC2 Instance** (Elastic IP-backed, static public IP)
      - **Docker Container** running the **NotesWay Backend (FastAPI)** — containerized for consistent, reproducible deployments.
  - **Internet Gateway** — enables inbound/outbound internet connectivity for the public subnet.
  - **Elastic IP** — guarantees a static public IP for the EC2 instance across restarts.

### 3. Data & Infrastructure Tier
- **MongoDB Atlas (Cluster)** — managed NoSQL database storing the NotesWay application data.
- **Amazon S3 (Notes & Files)** + **S3 Pre-signed URLs** — secure, time-limited, direct-to-client file upload/download without exposing the bucket publicly.
- **Amazon SES → Amazon SNS** — transactional email delivery and push/event notifications.
- **Amazon CloudWatch → CloudWatch Logs** — centralized metrics, application logs, and alerting.
- **Amazon S3 (Backups)** — scheduled backups for disaster recovery.

### Security & Management (Cross-Cutting)
- **AWS IAM** — least-privilege roles and policies for all services and compute resources.
- **AWS Security Groups** — stateful, instance-level firewall rules controlling inbound/outbound traffic.
- **AWS Certificate Manager (ACM)** — provisions and auto-renews SSL/TLS certificates for HTTPS on both domains.
- **Network ACLs** — stateless, subnet-level traffic filtering as a defense-in-depth layer.

---

## Objectives

- Build a centralized, cloud-hosted platform for managing academic notes
- Implement secure authentication and role-based authorization
- Enable efficient, scalable file storage and retrieval via AWS S3 with pre-signed URLs
- Deploy a fault-tolerant, horizontally scalable 3-tier architecture on AWS
- Apply production-grade DevOps practices: containerization, load balancing, WAF, monitoring, and automated backups

---

## Technology Stack

**Frontend**
- React.js
- CSS Modules
- Axios
- React Router
- Amazon CloudFront (CDN) + Amazon S3 (static hosting)

**Backend**
- Python (FastAPI)
- Docker (containerized deployment)
- JWT-based authentication
- RESTful API design
- Amazon EC2 (compute) + Application Load Balancer

**Database**
- MongoDB Atlas (managed cluster)

**Cloud & Infrastructure (AWS)**
- Amazon Route 53 (DNS)
- Amazon CloudFront (CDN)
- Amazon S3 (static hosting, file storage, backups)
- AWS WAF (web application firewall)
- Application Load Balancer (ALB)
- Amazon VPC, Public Subnet, Internet Gateway, Elastic IP
- Amazon EC2 + Docker
- Amazon SES / Amazon SNS (email & notifications)
- Amazon CloudWatch (monitoring & logging)
- AWS IAM, Security Groups, Network ACLs
- AWS Certificate Manager (SSL/TLS)

**DevOps & Tooling**
- Git & GitHub (version control)
- Docker (containerization)
- CI/CD-ready deployment pipeline
- Infrastructure secured via IAM, Security Groups, and NACLs

---

## Core Features

- Secure user registration, authentication, and JWT-based session management
- Role-based dashboards (Student, Professor, College)
- Secure file upload/download using S3 pre-signed URLs
- Cloud-native, containerized backend for consistent deployments
- Note sharing and organization
- WAF-protected, load-balanced, highly available API
- Automated email/notification pipeline (SES + SNS)
- Centralized logging and monitoring (CloudWatch)
- Scheduled S3 backups for disaster recovery

---

## Security Implementation

- **Edge protection:** AWS WAF filters malicious traffic before it reaches the application
- **Transport security:** HTTPS enforced end-to-end via AWS Certificate Manager (ACM)
- **Network isolation:** Custom VPC with public subnet, Internet Gateway, and Elastic IP
- **Access control:** Security Groups (instance-level) + Network ACLs (subnet-level) as layered firewalls
- **Identity & permissions:** AWS IAM roles and policies following least-privilege principles
- **Application security:** JWT-based authentication/authorization, CORS configuration, secure environment variable handling
- **File security:** Time-limited S3 pre-signed URLs instead of public bucket access

---

## Deployment Workflow

1. Source code managed and versioned via GitHub
2. Backend containerized using Docker and deployed to an EC2 instance within a VPC public subnet
3. Traffic secured with AWS WAF and distributed via an Application Load Balancer
4. Frontend built and deployed to S3, distributed globally via CloudFront
5. Domains (`notesway.in`, `api.notesway.in`) configured through Route 53 with ACM-issued SSL certificates
6. MongoDB Atlas provisioned as the managed database layer
7. CloudWatch configured for application/infrastructure monitoring and logging
8. Automated backups configured to Amazon S3

---

## Scalability & Performance

- Stateless REST APIs enable horizontal scaling behind the ALB
- Containerized backend (Docker) allows consistent, repeatable scaling across EC2 instances
- CloudFront CDN reduces latency and offloads static asset delivery globally
- S3 pre-signed URLs offload file transfer directly between client and storage, reducing backend load
- CloudWatch-driven monitoring supports proactive scaling and incident response
- Architecture is ready for Auto Scaling Groups and multi-AZ expansion

---

## Author

**Manikant Kumar**
Cloud Engineer

