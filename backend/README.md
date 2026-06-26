# Mini Policy Management System

Spring Boot 3, Java 21, MySQL, Spring Data JPA, Spring Web, Validation, and Lombok based REST API.

## Modules

- Customer Management
- Policy Management
- Policy Assignment

## Package Structure

```text
com.example.policymanagement
├── controller
├── dto
│   ├── request
│   └── response
├── entity
├── enums
├── exception
├── repository
└── service
```

## Database

Create a MySQL database manually or let the connection URL create it:

```sql
CREATE DATABASE policy_management_db;
```

Update credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=root
```

## Run

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

## API Endpoints

### Customers

- `POST /api/customers`
- `GET /api/customers`
- `GET /api/customers/{id}`
- `PUT /api/customers/{id}`
- `DELETE /api/customers/{id}`

### Policies

- `POST /api/policies`
- `GET /api/policies`
- `GET /api/policies/{id}`
- `PUT /api/policies/{id}`
- `DELETE /api/policies/{id}`

### Assignments

- `POST /api/assignments`
- `GET /api/assignments`
- `GET /api/assignments?customerId={customerId}`
- `GET /api/assignments?policyId={policyId}`
- `GET /api/assignments/{id}`
- `PATCH /api/assignments/{id}/status`
- `DELETE /api/assignments/{id}`

## Sample Requests

Create customer:

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "9876543210",
  "address": "Mumbai"
}
```

Create policy:

```json
{
  "policyNumber": "POL-1001",
  "name": "Health Secure",
  "type": "HEALTH",
  "premiumAmount": 12000,
  "coverageAmount": 500000,
  "durationInMonths": 12,
  "description": "Basic health insurance policy"
}
```

Assign policy:

```json
{
  "customerId": 1,
  "policyId": 1,
  "startDate": "2026-06-25"
}
```
