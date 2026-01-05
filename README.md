# ProxyMukt - Automated Student Attendance System

[![Live Demo]](https://proxymukt.onrender.com)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green)](https://mongodb.com/)

A comprehensive, modern attendance management system designed for educational institutions, featuring QR code scanning, geofencing, real-time analytics, and advanced security measures.

## 🎯 Target Audience

- **Educational Institutions**: Schools, colleges, universities, and training centers
- **Corporate Training Centers**: Organizations conducting regular training sessions
- **Event Organizers**: Managing attendance for workshops, seminars, and conferences
- **Faculty Members**: Teachers and instructors managing multiple classes
- **System Administrators**: IT personnel overseeing attendance systems

## 🚨 Problem Statement

Traditional attendance systems face numerous challenges:

- **Manual Processes**: Time-consuming paper-based attendance marking
- **Proxy Attendance**: Students marking attendance for absent peers
- **Location Fraud**: Attendance marked from unauthorized locations
- **Data Inconsistency**: Manual errors leading to inaccurate records
- **Limited Analytics**: Lack of comprehensive attendance insights
- **Security Vulnerabilities**: Easily manipulated attendance systems
- **Real-time Monitoring**: Inability to track attendance in real-time
- **Scalability Issues**: Systems that don't scale with growing institutions

## 🎯 Project Aim

To develop a robust, secure, and user-friendly automated attendance system that:

1. **Eliminates Proxy Attendance** through advanced security measures
2. **Ensures Location Accuracy** using geofencing technology
3. **Provides Real-time Monitoring** with live session tracking
4. **Delivers Comprehensive Analytics** for informed decision-making
5. **Maintains High Security Standards** with modern authentication
6. **Scales Efficiently** for institutions of all sizes
7. **Improves User Experience** with intuitive interfaces
8. **Reduces Administrative Overhead** through automation

## 💡 Solution Overview

ProxyMukt addresses these challenges through:

### 🔐 Advanced Security Features
- **Dynamic QR Codes**: Time-rotated QR codes (20-second intervals) preventing screenshot fraud
- **HMAC Signing**: Cryptographically signed QR codes ensuring authenticity
- **Geofencing**: Location-based verification using Haversine formula
- **Device Fingerprinting**: Unique device identification preventing spoofing
- **JWT Authentication**: Secure token-based authentication with refresh tokens

### 🌐 Real-time Capabilities
- **WebSocket Integration**: Live session monitoring and updates
- **Instant Notifications**: Real-time attendance alerts
- **Dynamic Session Management**: Live QR code rotation and session control

### 📊 Comprehensive Analytics
- **Attendance Trends**: Historical data analysis and visualization
- **Performance Metrics**: Individual and class-wide statistics
- **Reporting System**: Detailed attendance reports with export capabilities
- **Dashboard Analytics**: Role-based insights for different user types

### 🎨 Modern User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Role-based Dashboards**: Customized interfaces for Admin, Faculty, and Students
- **Intuitive Navigation**: User-friendly interface design
- **Progressive Web App**: Offline capabilities and app-like experience

## 🛠️ Technology Stack

### Frontend
- **React 18+**: Modern UI library with hooks and context
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management
- **Framer Motion**: Smooth animations and transitions
- **Recharts**: Data visualization and analytics charts

### Backend
- **Node.js 18+**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for scalable data storage
- **Socket.IO**: Real-time bidirectional communication
- **Mongoose**: MongoDB object modeling

### Security & Authentication
- **JWT (JSON Web Tokens)**: Secure authentication mechanism
- **bcryptjs**: Password hashing and encryption
- **Helmet**: Security middleware for Express
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: API request throttling

### DevOps & Deployment
- **Render**: Cloud platform for deployment
- **MongoDB Atlas**: Cloud database service
- **Git**: Version control system
- **npm**: Package management

## 🚀 Key Features

### For Students
- **QR Code Scanning**: Quick attendance marking via mobile camera
- **Attendance History**: Personal attendance records and statistics
- **Real-time Updates**: Instant feedback on attendance status
- **Mobile Optimization**: Seamless mobile experience

### For Faculty
- **Session Management**: Create and manage attendance sessions
- **Live Monitoring**: Real-time session tracking and student participation
- **Class Analytics**: Comprehensive attendance reports and insights
- **Bulk Operations**: Efficient management of multiple classes

### For Administrators
- **User Management**: Complete control over system users and roles
- **System Analytics**: Institution-wide attendance statistics
- **Audit Logs**: Detailed system activity tracking
- **Configuration Management**: System settings and security parameters

## 📁 Project Structure

```
ProxyMukt/
├── client/                     # React Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # Base UI components
│   │   │   └── layout/        # Layout components
│   │   ├── pages/             # Route-based page components
│   │   │   ├── auth/          # Authentication pages
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   └── attendance/    # Attendance-related pages
│   │   ├── store/             # State management (Zustand)
│   │   ├── utils/             # Utility functions and helpers
│   │   ├── lib/               # Third-party library configurations
│   │   └── styles/            # Global styles and Tailwind config
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── server/                     # Node.js Backend Application
│   ├── src/
│   │   ├── controllers/        # Business logic controllers
│   │   │   ├── authController.js
│   │   │   ├── attendanceController.js
│   │   │   └── analyticsController.js
│   │   ├── models/            # MongoDB schemas (Mongoose)
│   │   │   ├── User.js
│   │   │   ├── Class.js
│   │   │   ├── Session.js
│   │   │   └── Attendance.js
│   │   ├── routes/            # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── classRoutes.js
│   │   │   └── attendanceRoutes.js
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── auth.js        # Authentication middleware
│   │   │   ├── validation.js  # Input validation
│   │   │   └── errorHandler.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── qr.js          # QR code generation and validation
│   │   │   ├── geofencing.js  # Location verification
│   │   │   └── security.js    # Security utilities
│   │   ├── config/            # Configuration files
│   │   │   └── db.js          # Database connection
│   │   └── server.js          # Main server file
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
│
├── README.md                   # Project documentation
├── render.yaml                 # Render deployment configuration
└── .gitignore                 # Git ignore rules
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- MongoDB 6 or higher
- Git for version control

### Local Development Setup

1. **Clone the Repository**
```bash
git clone https://github.com/Sumant3086/ProxyMukt-Attendance-System.git
cd ProxyMukt-Attendance-System
```

2. **Backend Setup**
```bash
cd server
npm install
cp .env.example .env
# Configure your .env file with database credentials
```

3. **Frontend Setup**
```bash
cd ../client
npm install
cp .env.example .env
# Configure your .env file with API URL
```

4. **Database Setup**
```bash
cd ../server
npm run seed  # Creates initial admin user
```

5. **Start Development Servers**
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Live Demo: https://proxymukt.onrender.com

## 🌐 API Documentation

### Authentication Endpoints
```
POST /api/auth/register         # User registration
POST /api/auth/login           # User login
POST /api/auth/logout          # User logout
GET  /api/auth/profile         # Get user profile
PUT  /api/auth/profile         # Update user profile
```

### Class Management
```
GET  /api/classes              # List all classes
POST /api/classes              # Create new class
GET  /api/classes/:id          # Get specific class
PUT  /api/classes/:id          # Update class
DELETE /api/classes/:id        # Delete class
```

### Session Management
```
GET  /api/sessions             # List sessions
POST /api/sessions             # Create session
GET  /api/sessions/:id         # Get session details
PUT  /api/sessions/:id         # Update session
DELETE /api/sessions/:id       # Delete session
```

### Attendance Operations
```
POST /api/attendance/mark      # Mark attendance
GET  /api/attendance/history   # Get attendance history
GET  /api/attendance/stats     # Get attendance statistics
GET  /api/attendance/report    # Generate attendance report
```

### Analytics & Reports
```
GET  /api/analytics/overview   # System overview statistics
GET  /api/analytics/trends     # Attendance trends
GET  /api/analytics/class/:id  # Class-specific analytics
```

## ⚙️ Configuration

### Environment Variables

#### Server Configuration (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
QR_SECRET=your_qr_signing_secret
CLIENT_URL=https://proxymukt.onrender.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_admin_password
```

#### Client Configuration (.env)
```env
VITE_API_URL=https://proxymukt.onrender.com/api
```

## 👥 User Roles & Permissions

### 🔑 Administrator
- **User Management**: Create, update, delete users
- **System Configuration**: Manage system settings
- **Analytics Access**: View institution-wide statistics
- **Audit Logs**: Monitor system activities
- **Role Assignment**: Assign roles to users

### 👨‍🏫 Faculty
- **Class Management**: Create and manage classes
- **Session Control**: Start/stop attendance sessions
- **Student Management**: Add/remove students from classes
- **Reports Generation**: Generate attendance reports
- **Real-time Monitoring**: Monitor live sessions

### 👨‍🎓 Student
- **Attendance Marking**: Scan QR codes to mark attendance
- **History Access**: View personal attendance history
- **Statistics**: Access personal attendance analytics
- **Profile Management**: Update personal information

## 🔒 Security Measures

### Authentication & Authorization
- **JWT Tokens**: Secure authentication with access and refresh tokens
- **Role-based Access**: Granular permissions based on user roles
- **Session Management**: Secure session handling and timeout

### Anti-fraud Mechanisms
- **Dynamic QR Codes**: Time-based rotation preventing screenshot fraud
- **Geofencing**: Location verification using GPS coordinates
- **Device Fingerprinting**: Unique device identification
- **Rate Limiting**: API request throttling to prevent abuse

### Data Protection
- **Password Hashing**: bcrypt encryption for user passwords
- **HTTPS Enforcement**: Secure data transmission
- **Input Validation**: Comprehensive input sanitization
- **CORS Configuration**: Controlled cross-origin requests

## 📊 Analytics & Reporting

### Real-time Dashboards
- **Live Session Monitoring**: Track active sessions and participation
- **Attendance Trends**: Visual representation of attendance patterns
- **Performance Metrics**: Individual and class-wide statistics

### Report Generation
- **Attendance Reports**: Detailed attendance records with export options
- **Analytics Insights**: Data-driven insights for decision making
- **Custom Filters**: Flexible filtering options for specific data views

## 🚀 Deployment

### Production Deployment (Render)
The application is deployed on Render with the following configuration:

```yaml
services:
  - type: web
    name: proxymukt
    env: node
    buildCommand: cd client && npm install && npm run build && cd ../server && npm install
    startCommand: cd server && npm start
```

### Environment Setup
1. Configure MongoDB Atlas for database
2. Set environment variables in Render dashboard
3. Deploy from GitHub repository
4. Run database seeding for initial setup

## 🤝 Contributing

We welcome contributions to ProxyMukt! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

For support, questions, or contributions:

- **Live Demo**: [https://proxymukt.onrender.com](https://proxymukt.onrender.com)
- **GitHub Repository**: [ProxyMukt-Attendance-System](https://github.com/Sumant3086/ProxyMukt-Attendance-System)
- **Issues**: Report bugs and request features via GitHub Issues

---

**ProxyMukt** - Revolutionizing attendance management through technology 🚀