# 🤖 AI Powered Policy Management System

A full-stack AI Powered Policy Management System developed using **Spring Boot**, **React**, **MySQL**, **Spring AI**, and **Ollama (Llama 3)**. The application enables users to manage customers, create insurance policies, assign policies, and receive AI-powered policy recommendations through an intelligent chatbot.

---

## 🚀 Features

### Customer Management
- Create Customer
- View Customers
- Update Customer
- Delete Customer

### Policy Management
- Create Insurance Policies
- Update Policies
- Delete Policies
- View Available Policies

### Policy Assignment
- Assign Policies to Customers
- View Assigned Policies
- Update Assignment Status
- Remove Assignments

### AI Policy Assistant
- AI-powered chatbot using **Ollama + Llama 3**
- Recommends suitable insurance policies
- Answers customer policy-related questions
- Uses live policy data stored in the MySQL database
- Personalized insurance recommendations

### Additional Features
- RESTful APIs
- Form Validation
- Global Exception Handling
- Responsive Bootstrap UI
- MySQL Database Integration
- Clean Layered Architecture

---

# 🛠 Tech Stack

## Backend
- Java 21
- Spring Boot 3
- Spring Data JPA
- Spring Web
- Spring AI
- Ollama (Llama 3)
- Hibernate
- MySQL
- Lombok
- Maven

## Frontend
- React
- Vite
- Axios
- Bootstrap 5

## Database
- MySQL

## AI
- Ollama
- Llama 3
- Spring AI ChatClient

---

# 📂 Project Structure

```
policy-management-system
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🗄 Database Setup

Create the database:

```sql
CREATE DATABASE policy_management_db;
```

Update:

```
backend/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/policy_management_db
spring.datasource.username=root
spring.datasource.password=your_password
```

---

# 🤖 Ollama Setup

Install Ollama:

https://ollama.com

Download the Llama 3 model:

```bash
ollama pull llama3
```

Start Ollama:

```bash
ollama run llama3
```

Spring AI Configuration:

```properties
spring.ai.ollama.base-url=http://localhost:11434
spring.ai.ollama.chat.options.model=llama3
spring.ai.ollama.chat.options.temperature=0.3
```

---

# ▶ Running the Backend

Navigate to the backend folder:

```bash
cd backend
```

Run:

Windows

```powershell
.\mvnw.cmd spring-boot:run
```

Linux/Mac

```bash
./mvnw spring-boot:run
```

Backend URL

```
http://localhost:8080
```

---

# ▶ Running the Frontend

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 🌐 REST API Endpoints

## Customers

```
POST   /api/customers
GET    /api/customers
GET    /api/customers/{id}
PUT    /api/customers/{id}
DELETE /api/customers/{id}
```

## Policies

```
POST   /api/policies
GET    /api/policies
GET    /api/policies/{id}
PUT    /api/policies/{id}
DELETE /api/policies/{id}
```

## Policy Assignments

```
POST   /api/assignments
GET    /api/assignments
GET    /api/assignments/{id}
PATCH  /api/assignments/{id}/status
DELETE /api/assignments/{id}
```

## AI Chatbot

```
POST /api/ai/chat
```

---

# 📋 Sample Requests

## Create Customer

```json
{
  "name": "Mohammed Musadiq",
  "email": "musadiq@example.com",
  "phone": "9876543210",
  "address": "Hyderabad"
}
```

## Create Policy

```json
{
  "policyNumber": "POL101",
  "name": "HealthGuard Premium",
  "type": "HEALTH",
  "premiumAmount": 1000,
  "coverageAmount": 1000000,
  "durationInMonths": 24,
  "description": "Comprehensive health insurance policy."
}
```

## Assign Policy

```json
{
  "customerId": 1,
  "policyId": 1,
  "startDate": "2026-06-30"
}
```

## AI Chat Request

```
Which health insurance policy is best for a family?
```

Example Response

```
Based on the available policies, I recommend HealthGuard Premium because it offers ₹10,00,000 coverage with affordable annual premium and is suitable for families.
```

---

# 🔮 Future Enhancements

- JWT Authentication & Authorization
- Claims Management
- Premium Payment Module
- Policy Renewal Reminder
- AI Policy Comparison
- AI Risk Assessment
- AI Customer Support
- Dashboard & Analytics
- Email Notifications
- Search & Filtering
- Pagination
- Document Upload & AI Analysis

---

# 👨‍💻 Author

**Mohammed Musadiq**

AI Powered Full Stack Developer

- Java
- Spring Boot
- React
- MySQL
- Spring AI
- Ollama
- REST APIs
