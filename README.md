# NotesWay – Academic Notes Management Platform


## Project Summary
**NotesWay** is a production-ready, cloud-hosted academic notes management platform designed for students, professors, and educational institutions. The application enables secure uploading, organization, sharing, and downloading of academic resources with a strong emphasis on scalability, security, and real-world deployment practices.

---

## Live Deployment
- **Frontend:** https://notesway.in  
- **Backend API:** https://api.notesway.in  

---

## Objectives
- Build a centralized platform for managing academic notes
- Implement secure authentication and authorization mechanisms
- Enable efficient file storage and retrieval using cloud services
- Deploy a scalable and production-grade web application
- Follow industry-standard DevOps and security practices

---

## System Architecture
NotesWay is built using a **three-tier architecture**:

### 1. Presentation Layer
- React.js-based frontend
- Responsive and user-friendly interface
- Secure API communication

### 2. Application Layer
- Node.js with Express.js
- RESTful API architecture
- JWT-based authentication
- Role-based access control

### 3. Data & Infrastructure Layer
- MongoDB Atlas for database management
- AWS S3 for file storage
- AWS EC2 for backend hosting
- Nginx as a reverse proxy and load handler
- HTTPS-enabled custom domain

---

## Technology Stack

### Frontend
- React.js
- CSS Modules
- Axios
- React Router

### Backend
- Python
- RESTful APIs
- JWT authentication
- Secure file handling with AWS S3

### Database
- MongoDB Atlas

### Cloud
- Amazon EC2
- Amazon S3
- Amazon Cloudfront
- AWS IAM
- AWS Security Groups
- Nginx
- PM2 Process Manager
- Git & GitHub

---

## Core Features
- User registration and authentication
- Role-based dashboards (Student, Professor, College)
- Secure file upload and download
- Cloud-based file storage using AWS S3
- Note sharing functionality
- Production-ready API deployment
- Domain and SSL configuration

---

## Security Implementation
- JWT-based authentication and authorization
- Secure handling of environment variables
- CORS configuration for controlled access
- HTTPS enforcement using SSL certificates
- Access-restricted APIs and file resources

---

## Deployment Workflow
1. Source code managed using GitHub
2. Backend deployed on AWS EC2
3. Nginx configured as reverse proxy
4. Static and file assets stored in AWS S3
5. Domain configured with SSL
6. PM2 used for backend process management

---

## Scalability & Performance
- Stateless REST APIs
- Cloud-native storage architecture
- Optimized backend routes
- Ready for horizontal scaling
- CDN-compatible setup

---

## Author
**Manikant Kumar**  
Cloud Engineer 

---

## License
This project is intended for educational, portfolio, and demonstration purposes.
