# Policy Management System

A full-stack Policy Management System developed using **Spring Boot**, **React**, and **MySQL**. The application allows users to manage customers, create insurance policies, and assign policies to customers through a simple and responsive web interface.

---

## Features

- Customer Management (CRUD)
- Policy Management (CRUD)
- Policy Assignment
- RESTful APIs
- Form Validation
- Global Exception Handling
- Responsive UI with Bootstrap
- MySQL Database Integration

---

## Tech Stack

### Backend
- Java 21
- Spring Boot 3
- Spring Data JPA
- Spring Web
- Hibernate
- MySQL
- Lombok
- Maven

### Frontend
- React
- Vite
- Axios
- Bootstrap 5

---

## Project Structure

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

## Database Setup

Create the database in MySQL.

```sql
CREATE DATABASE policy_management_db;
```

Update the database credentials in:

```
backend/src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/policy_management_db
spring.datasource.username=root
spring.datasource.password=root
```

---

## Running the Backend

Navigate to the backend folder.

```bash
cd backend
```

Run the application.

Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Linux/Mac:

```bash
./mvnw spring-boot:run
```

Backend URL:

```
http://localhost:8080
```

---

## Running the Frontend

Navigate to the frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

## REST API Endpoints

### Customers

- POST `/api/customers`
- GET `/api/customers`
- GET `/api/customers/{id}`
- PUT `/api/customers/{id}`
- DELETE `/api/customers/{id}`

### Policies

- POST `/api/policies`
- GET `/api/policies`
- GET `/api/policies/{id}`
- PUT `/api/policies/{id}`
- DELETE `/api/policies/{id}`

### Policy Assignments

- POST `/api/assignments`
- GET `/api/assignments`
- GET `/api/assignments/{id}`
- PATCH `/api/assignments/{id}/status`
- DELETE `/api/assignments/{id}`

---

## Sample Request

### Create Customer

```json
{
  "name": "Mohammed Musadiq",
  "email": "musadiq@example.com",
  "phone": "9876543210",
  "address": "Hyderabad"
}
```

### Create Policy

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

### Assign Policy

```json
{
  "customerId": 1,
  "policyId": 1,
  "startDate": "2026-06-30"
}
```

---

## Future Enhancements

- Authentication & Authorization (JWT)
- Claims Management
- Premium Payment Module
- Dashboard & Reports
- Email Notifications
- Search & Filtering
- Pagination

---

## Author

**Mohammed Musadiq**
