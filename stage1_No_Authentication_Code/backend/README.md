# Electricity Bill Management System

A Spring Boot based Electricity Bill Management System designed to manage customers and generate electricity bills efficiently.
This application demonstrates REST API development, JPA entity relationships, validation, global exception handling, and Thymeleaf-based UI rendering.

---

## Overview

The system allows administrators to:

* Create, update, delete, and view customers
* Generate electricity bills for customers
* Search bills by Customer ID and Name
* View all customers and associated bills
* Handle validation and exceptions in a structured manner

---

## Technology Stack

* Backend: Spring Boot
* Database: MySQL
* ORM: Spring Data JPA (Hibernate)
* Validation: Jakarta Validation
* Frontend: Thymeleaf
* Build Tool: Maven
* Java Version: 17+

---

## Architecture

The application follows a layered architecture:

Entity → Repository → Service → Controller → View

### Entities

Customer

* Represents a consumer.
* One-to-Many relationship with Bill.

Bill

* Represents electricity usage and billing details.
* Many-to-One relationship with Customer.

Relationship Structure:

Customer (1) ---- (Many) Bill

---

## API Endpoints

### Customer APIs

| Method | Endpoint            | Description             |
| ------ | ------------------- | ----------------------- |
| POST   | /api/customers      | Add a new customer      |
| GET    | /api/customers      | Retrieve all customers  |
| GET    | /api/customers/{id} | Retrieve customer by ID |
| PUT    | /api/customers/{id} | Update customer details |
| DELETE | /api/customers/{id} | Delete a customer       |

---

### Bill APIs

| Method | Endpoint                        | Description                |
| ------ | ------------------------------- | -------------------------- |
| POST   | /bills/customer/{customerId}    | Add bill for a customer    |
| GET    | /bills                          | Retrieve all bills         |
| GET    | /bills/{billId}                 | Retrieve bill by ID        |
| GET    | /bills/by-customer/{customerId} | Retrieve bills by customer |
| DELETE | /bills/{billId}                 | Delete a bill              |

---

## Business Logic

Bill amount calculation:

Amount = Units × 5

The current implementation uses a flat rate calculation. This can be extended to a slab-based tariff system in future enhancements.

---

## Validation and Exception Handling

Validation is implemented using:

* @NotBlank
* @Email
* @Size
* @Min

Custom Exception:

* ResourceNotFoundException

Global exception handling is implemented using @RestControllerAdvice to ensure consistent error responses.

---

## Thymeleaf Pages

* search.html – Search bill by customer ID and name
* bills.html – Display customer bills
* customers.html – View all customers

---

## Database Configuration

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/electricity_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

---

## How to Run

1. Clone the repository.
2. Create a MySQL database.
3. Update database credentials in application.properties.
4. Run the Spring Boot application.
5. Access the application:

   * API: http://localhost:8080/api/customers
   * UI: http://localhost:8080/billSearch

---

## Future Enhancements

* Slab-based tariff calculation
* Pagination and sorting
* Authentication and authorization using Spring Security
* Swagger API documentation
* Docker deployment

---

## Author

Gayathri R
Email: [gayathriii575@gmail.com]
GitHub: https://github.com/Gayathri575

---

## License

This project is developed for educational purposes.

# Electricity Bill Calculator

**Technology Stack:** Java, Spring Boot, Thymeleaf, MySQL, Hibernate

This project is a **web-based Electricity Management System** that allows administrators and users to manage customers and calculate their electricity bills efficiently. Users can enter a **Customer ID and Name** to view their bills dynamically in a **clear, tabular format**.

## Key Features

- Calculates electricity bills based on units consumed.
- Search and display bills by Customer ID or Name.
- 4-digit ID formatting for clarity (e.g., 0001, 0002).
- Input validation and error handling for accurate calculations.
- Interactive frontend using Thymeleaf.
- Robust backend logic using Spring Boot and MySQL.
- Demonstrates layered architecture: Controller → Service → Repository.

