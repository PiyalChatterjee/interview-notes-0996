# 🎯 SQL Interview Preparation: Azure Cloud FullStack Developer

**Last Updated:** November 19, 2025  
**Target Role:** Azure Cloud FullStack Developer  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 30-40 hours

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Q&A Section](#qa-section)
4. [Code Samples](#code-samples)
5. [TL;DR Summary](#tldr-summary)

---

# Introduction

## Overview of SQL/RDBMS in Azure Cloud Context

SQL (Structured Query Language) and Relational Database Management Systems (RDBMS) are fundamental to modern cloud applications on Azure. As an Azure Cloud FullStack Developer, SQL expertise is critical for:

- **Data Storage & Management**: Designing efficient database schemas with Azure SQL Database
- **Performance Optimization**: Query tuning, indexing strategies, and execution plan analysis
- **Scalability Solutions**: Implementing elastic pools, read replicas, and horizontal scaling
- **Security & Compliance**: Row-level security, dynamic data masking, and audit trails
- **Cloud Integration**: Leveraging Azure SQL features like auto-scaling, geo-replication, and intelligent performance
- **DevOps Integration**: Database CI/CD with Azure DevOps and SQL Database Projects

## Key Areas to Focus for Interviews

### 1. **Database Fundamentals**

- Relational model and ACID properties
- Database normalization (1NF, 2NF, 3NF, BCNF)
- Entity-Relationship modeling
- Data types and constraints
- Primary keys, foreign keys, and referential integrity

### 2. **SQL Query Mastery**

- Complex JOINs (INNER, LEFT, RIGHT, FULL OUTER, CROSS)
- Subqueries and correlated subqueries
- Window functions and analytical queries
- Common Table Expressions (CTEs) and recursive queries
- CASE statements and conditional logic
- String manipulation and date functions

### 3. **Advanced SQL Concepts**

- Stored procedures, functions, and triggers
- Views and materialized views
- Indexes (clustered, non-clustered, covering, filtered)
- Query execution plans and optimization
- Transactions and concurrency control
- Isolation levels and locking mechanisms

### 4. **Performance Optimization**

- Query tuning techniques
- Index optimization strategies
- Execution plan analysis
- Statistics and cardinality estimation
- Partitioning and data distribution
- Memory and I/O optimization

### 5. **Azure SQL Database Specifics**

- Elastic pools and database scaling
- Geo-replication and failover groups
- Automatic tuning and intelligent insights
- Azure SQL Managed Instance features
- Hyperscale architecture
- Serverless compute tier

### 6. **Security & Compliance**

- Authentication methods (SQL, Azure AD, Managed Identity)
- Authorization and role-based access control
- Row-level security and dynamic data masking
- Always Encrypted and Transparent Data Encryption
- Auditing and compliance features
- Network security and firewall rules

### 7. **T-SQL and SQL Server Features**

- T-SQL specific syntax and functions
- MERGE statements and UPSERT operations
- XML and JSON data handling
- Full-text search capabilities
- Service Broker and messaging
- CLR integration and user-defined functions

### 8. **Monitoring & Troubleshooting**

- Query Store and performance insights
- Azure Monitor and Log Analytics integration
- Database performance metrics
- Deadlock detection and resolution
- Wait statistics and resource utilization
- Intelligent performance recommendations

---

# Core Concepts

## 1. Database Fundamentals

### ACID Properties

**ACID** is a set of properties that guarantee database transactions are processed reliably:

#### **Atomicity**

- All operations in a transaction succeed or fail together
- No partial transactions are allowed
- Example: Money transfer must debit from one account and credit another, or neither

```sql
BEGIN TRANSACTION;
UPDATE Accounts SET Balance = Balance - 100 WHERE AccountID = 1;
UPDATE Accounts SET Balance = Balance + 100 WHERE AccountID = 2;
COMMIT; -- Both operations succeed or both are rolled back
```

#### **Consistency**

- Database moves from one valid state to another
- All constraints, triggers, and rules are satisfied
- Foreign key relationships remain intact

#### **Isolation**

- Concurrent transactions don't interfere with each other
- Each transaction sees a consistent view of the database
- Controlled by isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)

#### **Durability**

- Committed transactions persist even after system failure
- Changes are written to stable storage (disk)
- Transaction logs ensure recoverability

### Database Normalization

#### **First Normal Form (1NF)**

- Each column contains atomic (indivisible) values
- No repeating groups or arrays
- Each row is unique

```sql
-- Violated 1NF (multiple phone numbers in one column)
CREATE TABLE Customer_Bad (
    CustomerID INT,
    Name NVARCHAR(100),
    PhoneNumbers NVARCHAR(500) -- "123-456-7890, 098-765-4321"
);

-- Complies with 1NF
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    Name NVARCHAR(100)
);

CREATE TABLE CustomerPhone (
    CustomerID INT,
    PhoneNumber NVARCHAR(20),
    PhoneType NVARCHAR(10), -- 'Home', 'Work', 'Mobile'
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
```

#### **Second Normal Form (2NF)**

- Must be in 1NF
- No partial dependencies on composite primary key
- All non-key columns depend on the entire primary key

```sql
-- Violated 2NF (CourseTitle depends only on CourseID, not StudentID)
CREATE TABLE StudentCourse_Bad (
    StudentID INT,
    CourseID INT,
    CourseTitle NVARCHAR(100), -- Partial dependency
    Grade CHAR(1),
    PRIMARY KEY (StudentID, CourseID)
);

-- Complies with 2NF
CREATE TABLE Course (
    CourseID INT PRIMARY KEY,
    CourseTitle NVARCHAR(100)
);

CREATE TABLE StudentCourse (
    StudentID INT,
    CourseID INT,
    Grade CHAR(1),
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
);
```

#### **Third Normal Form (3NF)**

- Must be in 2NF
- No transitive dependencies
- Non-key columns don't depend on other non-key columns

```sql
-- Violated 3NF (DepartmentName depends on DepartmentID, not EmployeeID)
CREATE TABLE Employee_Bad (
    EmployeeID INT PRIMARY KEY,
    Name NVARCHAR(100),
    DepartmentID INT,
    DepartmentName NVARCHAR(100) -- Transitive dependency
);

-- Complies with 3NF
CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    DepartmentName NVARCHAR(100)
);

CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    Name NVARCHAR(100),
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);
```

### Data Types and Constraints

#### **Common SQL Server Data Types**

```sql
CREATE TABLE DataTypeExample (
    -- Numeric types
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Price DECIMAL(10,2), -- Exact numeric
    Percentage FLOAT, -- Approximate numeric

    -- Character types
    Code CHAR(5), -- Fixed length
    Name NVARCHAR(100), -- Variable length Unicode
    Description NVARCHAR(MAX), -- Large text

    -- Date/Time types
    CreatedDate DATETIME2(7), -- High precision
    BirthDate DATE, -- Date only
    EventTime TIME(3), -- Time only

    -- Other types
    IsActive BIT, -- Boolean
    DocumentID UNIQUEIDENTIFIER DEFAULT NEWID(), -- GUID
    ProfileImage VARBINARY(MAX), -- Binary data
    Metadata XML -- Structured data
);
```

#### **Constraints**

```sql
CREATE TABLE Product (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,

    -- NOT NULL constraint
    ProductName NVARCHAR(100) NOT NULL,

    -- CHECK constraint
    Price DECIMAL(10,2) CHECK (Price > 0),

    -- UNIQUE constraint
    SKU NVARCHAR(50) UNIQUE NOT NULL,

    -- DEFAULT constraint
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    Status NVARCHAR(20) DEFAULT 'Active',

    -- Foreign key constraint
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
        ON DELETE CASCADE -- Cascade delete
        ON UPDATE CASCADE  -- Cascade update
);

-- Named constraints for better error messages
ALTER TABLE Product
ADD CONSTRAINT CK_Product_ValidStatus
CHECK (Status IN ('Active', 'Inactive', 'Discontinued'));
```

## 2. SQL Query Mastery

### JOIN Operations

#### **INNER JOIN**

Returns only matching records from both tables.

```sql
-- Get customers with orders
SELECT c.CustomerName, o.OrderDate, o.TotalAmount
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID
WHERE o.OrderDate >= '2024-01-01';
```

#### **LEFT JOIN (LEFT OUTER JOIN)**

Returns all records from left table and matching records from right table.

```sql
-- Get all customers, including those without orders
SELECT c.CustomerName,
       ISNULL(o.OrderCount, 0) as OrderCount,
       ISNULL(o.TotalSpent, 0) as TotalSpent
FROM Customers c
LEFT JOIN (
    SELECT CustomerID,
           COUNT(*) as OrderCount,
           SUM(TotalAmount) as TotalSpent
    FROM Orders
    GROUP BY CustomerID
) o ON c.CustomerID = o.CustomerID;
```

#### **RIGHT JOIN (RIGHT OUTER JOIN)**

Returns all records from right table and matching records from left table.

```sql
-- Get all products, including those never ordered
SELECT p.ProductName,
       ISNULL(oi.QuantitySold, 0) as QuantitySold
FROM OrderItems oi
RIGHT JOIN Products p ON oi.ProductID = p.ProductID;
```

#### **FULL OUTER JOIN**

Returns all records when there's a match in either table.

```sql
-- Compare current vs previous year sales
SELECT ISNULL(c.Month, p.Month) as Month,
       ISNULL(c.CurrentYearSales, 0) as CurrentYear,
       ISNULL(p.PreviousYearSales, 0) as PreviousYear
FROM (SELECT MONTH(OrderDate) as Month, SUM(TotalAmount) as CurrentYearSales
      FROM Orders WHERE YEAR(OrderDate) = 2024 GROUP BY MONTH(OrderDate)) c
FULL OUTER JOIN
     (SELECT MONTH(OrderDate) as Month, SUM(TotalAmount) as PreviousYearSales
      FROM Orders WHERE YEAR(OrderDate) = 2023 GROUP BY MONTH(OrderDate)) p
ON c.Month = p.Month
ORDER BY Month;
```

#### **CROSS JOIN**

Cartesian product of both tables.

```sql
-- Generate all possible size/color combinations
SELECT s.SizeName, c.ColorName
FROM Sizes s
CROSS JOIN Colors c
ORDER BY s.SizeName, c.ColorName;
```

#### **SELF JOIN**

Joining a table to itself.

```sql
-- Find employees and their managers
SELECT e.EmployeeName as Employee,
       m.EmployeeName as Manager
FROM Employees e
LEFT JOIN Employees m ON e.ManagerID = m.EmployeeID;

-- Find employees in the same department
SELECT e1.EmployeeName as Employee1,
       e2.EmployeeName as Employee2
FROM Employees e1
INNER JOIN Employees e2 ON e1.DepartmentID = e2.DepartmentID
WHERE e1.EmployeeID < e2.EmployeeID; -- Avoid duplicates
```

### Subqueries and CTEs

#### **Correlated Subquery**

Subquery that references columns from outer query.

```sql
-- Find customers who spent more than their department average
SELECT CustomerName, TotalSpent
FROM (
    SELECT c.CustomerName,
           SUM(o.TotalAmount) as TotalSpent,
           c.Region
    FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
    GROUP BY c.CustomerID, c.CustomerName, c.Region
) customer_totals
WHERE TotalSpent > (
    SELECT AVG(region_avg.TotalSpent)
    FROM (
        SELECT SUM(o2.TotalAmount) as TotalSpent
        FROM Customers c2
        JOIN Orders o2 ON c2.CustomerID = o2.CustomerID
        WHERE c2.Region = customer_totals.Region
        GROUP BY c2.CustomerID
    ) region_avg
);
```

#### **Common Table Expressions (CTEs)**

```sql
-- Recursive CTE for organizational hierarchy
WITH EmployeeHierarchy AS (
    -- Anchor member: Top-level managers
    SELECT EmployeeID, EmployeeName, ManagerID, 0 as Level
    FROM Employees
    WHERE ManagerID IS NULL

    UNION ALL

    -- Recursive member: Subordinates
    SELECT e.EmployeeID, e.EmployeeName, e.ManagerID, eh.Level + 1
    FROM Employees e
    INNER JOIN EmployeeHierarchy eh ON e.ManagerID = eh.EmployeeID
)
SELECT EmployeeName, Level,
       REPLICATE('  ', Level) + EmployeeName as Indented
FROM EmployeeHierarchy
ORDER BY Level, EmployeeName;

-- Multiple CTEs for complex analysis
WITH MonthlySales AS (
    SELECT YEAR(OrderDate) as Year,
           MONTH(OrderDate) as Month,
           SUM(TotalAmount) as MonthlySales
    FROM Orders
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
),
SalesGrowth AS (
    SELECT Year, Month, MonthlySales,
           LAG(MonthlySales) OVER (ORDER BY Year, Month) as PreviousMonth,
           MonthlySales - LAG(MonthlySales) OVER (ORDER BY Year, Month) as Growth
    FROM MonthlySales
)
SELECT Year, Month, MonthlySales, Growth,
       CASE
           WHEN Growth > 0 THEN 'Increasing'
           WHEN Growth < 0 THEN 'Decreasing'
           ELSE 'Stable'
       END as Trend
FROM SalesGrowth
ORDER BY Year, Month;
```

### Window Functions

#### **ROW_NUMBER, RANK, DENSE_RANK**

```sql
SELECT CustomerID, OrderDate, TotalAmount,
       -- Sequential numbering
       ROW_NUMBER() OVER (PARTITION BY CustomerID ORDER BY OrderDate) as OrderSequence,

       -- Ranking with gaps
       RANK() OVER (ORDER BY TotalAmount DESC) as AmountRank,

       -- Ranking without gaps
       DENSE_RANK() OVER (ORDER BY TotalAmount DESC) as AmountDenseRank,

       -- Percentile
       PERCENT_RANK() OVER (ORDER BY TotalAmount) as AmountPercentile
FROM Orders;
```

#### **LAG and LEAD**

```sql
SELECT OrderDate, TotalAmount,
       -- Previous value
       LAG(TotalAmount, 1, 0) OVER (ORDER BY OrderDate) as PreviousSale,

       -- Next value
       LEAD(TotalAmount, 1, 0) OVER (ORDER BY OrderDate) as NextSale,

       -- Calculate difference
       TotalAmount - LAG(TotalAmount, 1, 0) OVER (ORDER BY OrderDate) as SalesDifference
FROM Orders
ORDER BY OrderDate;
```

#### **Running Totals and Moving Averages**

```sql
SELECT OrderDate, TotalAmount,
       -- Running total
       SUM(TotalAmount) OVER (ORDER BY OrderDate
                              ROWS UNBOUNDED PRECEDING) as RunningTotal,

       -- Moving average (last 3 orders)
       AVG(TotalAmount) OVER (ORDER BY OrderDate
                              ROWS 2 PRECEDING) as MovingAverage3,

       -- Percentage of total
       TotalAmount * 100.0 / SUM(TotalAmount) OVER () as PercentageOfTotal
FROM Orders
ORDER BY OrderDate;
```

## 3. Advanced SQL Concepts

### Indexes and Performance

#### **Index Types**

```sql
-- Clustered Index (one per table, determines physical storage)
CREATE CLUSTERED INDEX IX_Orders_OrderDate
ON Orders (OrderDate);

-- Non-Clustered Index
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID
ON Orders (CustomerID);

-- Composite Index
CREATE NONCLUSTERED INDEX IX_Orders_Customer_Date
ON Orders (CustomerID, OrderDate);

-- Covering Index (includes non-key columns)
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID_Covering
ON Orders (CustomerID)
INCLUDE (OrderDate, TotalAmount, Status);

-- Filtered Index (with WHERE condition)
CREATE NONCLUSTERED INDEX IX_Orders_ActiveOrders
ON Orders (OrderDate)
WHERE Status = 'Active';

-- Unique Index
CREATE UNIQUE NONCLUSTERED INDEX IX_Products_SKU
ON Products (SKU);
```

#### **Index Maintenance**

```sql
-- Check index fragmentation
SELECT
    i.name as IndexName,
    ips.avg_fragmentation_in_percent,
    ips.page_count,
    CASE
        WHEN ips.avg_fragmentation_in_percent > 30 THEN 'REBUILD'
        WHEN ips.avg_fragmentation_in_percent > 10 THEN 'REORGANIZE'
        ELSE 'NO ACTION NEEDED'
    END as Recommendation
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i ON ips.object_id = i.object_id AND ips.index_id = i.index_id
WHERE ips.avg_fragmentation_in_percent > 5;

-- Rebuild fragmented indexes
ALTER INDEX IX_Orders_CustomerID ON Orders REBUILD;

-- Reorganize slightly fragmented indexes
ALTER INDEX IX_Orders_CustomerID ON Orders REORGANIZE;

-- Update statistics
UPDATE STATISTICS Orders WITH FULLSCAN;
```

### Stored Procedures and Functions

#### **Stored Procedures**

```sql
CREATE PROCEDURE sp_GetCustomerOrderSummary
    @CustomerID INT,
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- Set defaults if not provided
    IF @StartDate IS NULL SET @StartDate = DATEADD(YEAR, -1, GETDATE());
    IF @EndDate IS NULL SET @EndDate = GETDATE();

    -- Validate parameters
    IF @StartDate > @EndDate
    BEGIN
        RAISERROR('Start date cannot be greater than end date', 16, 1);
        RETURN;
    END

    -- Main query
    SELECT
        c.CustomerName,
        COUNT(o.OrderID) as OrderCount,
        SUM(o.TotalAmount) as TotalSpent,
        AVG(o.TotalAmount) as AverageOrderValue,
        MIN(o.OrderDate) as FirstOrder,
        MAX(o.OrderDate) as LastOrder
    FROM Customers c
    LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
        AND o.OrderDate BETWEEN @StartDate AND @EndDate
    WHERE c.CustomerID = @CustomerID
    GROUP BY c.CustomerID, c.CustomerName;
END;

-- Execute procedure
EXEC sp_GetCustomerOrderSummary @CustomerID = 1, @StartDate = '2024-01-01';
```

#### **User-Defined Functions**

```sql
-- Scalar Function
CREATE FUNCTION dbo.fn_CalculateAge(@BirthDate DATE)
RETURNS INT
AS
BEGIN
    DECLARE @Age INT;
    SET @Age = DATEDIFF(YEAR, @BirthDate, GETDATE()) -
               CASE
                   WHEN MONTH(@BirthDate) > MONTH(GETDATE()) OR
                        (MONTH(@BirthDate) = MONTH(GETDATE()) AND DAY(@BirthDate) > DAY(GETDATE()))
                   THEN 1
                   ELSE 0
               END;
    RETURN @Age;
END;

-- Table-Valued Function
CREATE FUNCTION dbo.fn_GetTopCustomers(@TopN INT, @Year INT)
RETURNS TABLE
AS
RETURN (
    SELECT TOP (@TopN)
        c.CustomerID,
        c.CustomerName,
        SUM(o.TotalAmount) as TotalSpent,
        COUNT(o.OrderID) as OrderCount
    FROM Customers c
    JOIN Orders o ON c.CustomerID = o.CustomerID
    WHERE YEAR(o.OrderDate) = @Year
    GROUP BY c.CustomerID, c.CustomerName
    ORDER BY SUM(o.TotalAmount) DESC
);

-- Usage
SELECT * FROM dbo.fn_GetTopCustomers(10, 2024);
SELECT CustomerName, dbo.fn_CalculateAge(BirthDate) as Age FROM Customers;
```

### Transactions and Concurrency

#### **Transaction Management**

```sql
-- Explicit transaction with error handling
BEGIN TRANSACTION;
BEGIN TRY
    -- Business logic
    UPDATE Inventory
    SET Quantity = Quantity - 5
    WHERE ProductID = 1;

    IF @@ROWCOUNT = 0
    BEGIN
        RAISERROR('Product not found', 16, 1);
    END

    INSERT INTO Orders (CustomerID, ProductID, Quantity, TotalAmount)
    VALUES (1, 1, 5, 250.00);

    -- Commit if all operations succeed
    COMMIT TRANSACTION;
    PRINT 'Transaction committed successfully';
END TRY
BEGIN CATCH
    -- Rollback on any error
    ROLLBACK TRANSACTION;

    -- Log error details
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
    DECLARE @ErrorState INT = ERROR_STATE();

    RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
END CATCH;
```

#### **Isolation Levels**

```sql
-- Read Uncommitted (allows dirty reads)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SELECT * FROM Orders; -- May read uncommitted data

-- Read Committed (default, prevents dirty reads)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT * FROM Orders; -- Only reads committed data

-- Repeatable Read (prevents non-repeatable reads)
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
SELECT COUNT(*) FROM Orders; -- First read
WAITFOR DELAY '00:00:10';    -- Wait 10 seconds
SELECT COUNT(*) FROM Orders; -- Second read (same result guaranteed)
COMMIT;

-- Serializable (prevents phantom reads)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
SELECT * FROM Orders WHERE TotalAmount > 1000;
-- No new rows matching criteria can be inserted by other transactions
COMMIT;

-- Snapshot Isolation (optimistic concurrency)
ALTER DATABASE YourDatabase SET ALLOW_SNAPSHOT_ISOLATION ON;
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;
-- Reads consistent snapshot of data from transaction start
```

---

# Q&A Section

## 1. Database Fundamentals

### Q1: What are the ACID properties and why are they important?

**Answer:** ACID ensures database reliability through:

- **Atomicity**: All-or-nothing transactions (prevents partial updates)
- **Consistency**: Maintains database integrity (constraints, rules)
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Committed changes survive system failures

**Example:** Bank transfer must debit one account AND credit another, or neither operation should occur.

### Q2: Explain the difference between DELETE, TRUNCATE, and DROP.

**Answer:**

- **DELETE**: Removes rows, can use WHERE clause, logged, triggers fire, slower
- **TRUNCATE**: Removes all rows, faster, minimal logging, resets identity, no triggers
- **DROP**: Removes entire table structure and data

```sql
DELETE FROM Orders WHERE OrderDate < '2020-01-01'; -- Conditional deletion
TRUNCATE TABLE TempOrders; -- Clear all data quickly
DROP TABLE ObsoleteTable; -- Remove table entirely
```

### Q3: What is the difference between Primary Key and Unique Key?

**Answer:**
| Primary Key | Unique Key |
|-------------|------------|
| Only one per table | Multiple allowed |
| Cannot be NULL | Can contain one NULL |
| Creates clustered index by default | Creates non-clustered index |
| Defines table's identity | Enforces uniqueness only |

### Q4: Explain database normalization and its benefits.

**Answer:** Normalization reduces data redundancy and improves integrity:

- **1NF**: Atomic values, no repeating groups
- **2NF**: No partial dependencies on composite keys
- **3NF**: No transitive dependencies
- **Benefits**: Reduced storage, improved consistency, easier maintenance

### Q5: What is a composite key and when would you use it?

**Answer:** A primary key consisting of multiple columns. Used when no single column uniquely identifies a row.

```sql
CREATE TABLE OrderItems (
    OrderID INT,
    ProductID INT,
    Quantity INT,
    PRIMARY KEY (OrderID, ProductID) -- Composite key
);
```

## 2. SQL Query Mastery

### Q6: Explain the difference between INNER JOIN and LEFT JOIN with examples.

**Answer:**

- **INNER JOIN**: Returns only matching records from both tables
- **LEFT JOIN**: Returns all records from left table + matching from right

```sql
-- INNER JOIN: Only customers with orders
SELECT c.CustomerName, o.OrderDate
FROM Customers c
INNER JOIN Orders o ON c.CustomerID = o.CustomerID;

-- LEFT JOIN: All customers, even without orders
SELECT c.CustomerName, ISNULL(o.OrderDate, 'No Orders') as OrderDate
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID;
```

### Q7: What is the difference between WHERE and HAVING clauses?

**Answer:**

- **WHERE**: Filters rows before grouping, cannot use aggregate functions
- **HAVING**: Filters groups after grouping, can use aggregate functions

```sql
SELECT CustomerID, COUNT(*) as OrderCount, SUM(TotalAmount) as Total
FROM Orders
WHERE OrderDate >= '2024-01-01' -- Filter individual rows
GROUP BY CustomerID
HAVING COUNT(*) > 5; -- Filter grouped results
```

### Q8: Explain subqueries and their types.

**Answer:**

- **Scalar**: Returns single value
- **Multi-row**: Returns multiple rows
- **Correlated**: References outer query columns
- **Non-correlated**: Independent of outer query

```sql
-- Scalar subquery
SELECT * FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);

-- Correlated subquery
SELECT * FROM Customers c
WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.CustomerID = c.CustomerID);
```

### Q9: What are window functions and how do they differ from aggregate functions?

**Answer:** Window functions perform calculations across related rows without collapsing them into groups.

```sql
SELECT
    OrderID,
    TotalAmount,
    -- Window function: keeps all rows
    ROW_NUMBER() OVER (ORDER BY TotalAmount DESC) as Rank,
    -- Aggregate in window: running total
    SUM(TotalAmount) OVER (ORDER BY OrderDate) as RunningTotal
FROM Orders;
```

### Q10: Explain Common Table Expressions (CTEs) and their advantages.

**Answer:** CTEs create temporary named result sets for complex queries:

- **Recursive CTEs**: Handle hierarchical data
- **Multiple CTEs**: Break complex logic into readable parts
- **Better readability** than nested subqueries

```sql
WITH SalesHierarchy AS (
    SELECT EmployeeID, Name, ManagerID, 0 as Level
    FROM Employees WHERE ManagerID IS NULL
    UNION ALL
    SELECT e.EmployeeID, e.Name, e.ManagerID, sh.Level + 1
    FROM Employees e
    JOIN SalesHierarchy sh ON e.ManagerID = sh.EmployeeID
)
SELECT * FROM SalesHierarchy ORDER BY Level;
```

## 3. Advanced SQL Concepts

### Q11: What are indexes and how do they improve performance?

**Answer:** Indexes are data structures that improve query speed by creating shortcuts to data:

- **Clustered**: Determines physical storage order (one per table)
- **Non-clustered**: Separate structure pointing to data rows (multiple allowed)
- **Composite**: Multiple columns in single index
- **Covering**: Includes non-key columns to avoid key lookups

```sql
-- Performance improvement example
CREATE NONCLUSTERED INDEX IX_Orders_CustomerDate
ON Orders (CustomerID, OrderDate)
INCLUDE (TotalAmount); -- Covering index
```

### Q12: Explain query execution plans and how to read them.

**Answer:** Execution plans show how SQL Server executes queries:

- **Estimated vs Actual**: Planned vs real execution
- **Operators**: Table Scan, Index Seek, Hash Join, etc.
- **Cost**: Relative expense of operations
- **Key metrics**: Rows, I/O, CPU time

```sql
-- View execution plan
SET STATISTICS IO ON;
SET SHOWPLAN_ALL ON;
SELECT * FROM Orders WHERE CustomerID = 1;
```

### Q13: What are stored procedures and their benefits?

**Answer:** Precompiled SQL statements stored in database:

- **Performance**: Compiled once, executed many times
- **Security**: Prevent SQL injection, controlled access
- **Maintainability**: Centralized business logic
- **Network traffic**: Reduced data transfer

### Q14: Explain the difference between functions and stored procedures.

**Answer:**
| Stored Procedures | Functions |
|-------------------|-----------|
| Can modify data | Read-only (scalar) |
| Cannot be used in SELECT | Can be used in SELECT |
| Can have multiple result sets | Single return value/table |
| Can use transactions | Limited transaction support |

### Q15: What are triggers and when should you use them?

**Answer:** Special stored procedures that automatically execute in response to events:

- **AFTER triggers**: Execute after DML operations
- **INSTEAD OF triggers**: Replace DML operations (views)
- **DDL triggers**: Respond to schema changes

```sql
CREATE TRIGGER tr_AuditOrderChanges
ON Orders
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    INSERT INTO OrderAudit (OrderID, Action, ChangedBy, ChangeDate)
    SELECT
        ISNULL(i.OrderID, d.OrderID),
        CASE
            WHEN i.OrderID IS NOT NULL AND d.OrderID IS NOT NULL THEN 'UPDATE'
            WHEN i.OrderID IS NOT NULL THEN 'INSERT'
            ELSE 'DELETE'
        END,
        SYSTEM_USER,
        GETDATE()
    FROM inserted i
    FULL OUTER JOIN deleted d ON i.OrderID = d.OrderID;
END;
```

## 4. Performance Optimization

### Q16: How do you optimize a slow-performing query?

**Answer:** Systematic approach to query optimization:

1. **Analyze execution plan** for expensive operations
2. **Check indexes** on WHERE/JOIN/ORDER BY columns
3. **Avoid SELECT \*** - specify needed columns only
4. **Use appropriate JOINs** instead of subqueries when possible
5. **Update statistics** for accurate cost estimation
6. **Consider partitioning** for large tables

```sql
-- Before optimization
SELECT * FROM Orders o
WHERE EXISTS (SELECT 1 FROM Customers c WHERE c.CustomerID = o.CustomerID AND c.City = 'New York');

-- After optimization
SELECT o.OrderID, o.OrderDate, o.TotalAmount
FROM Orders o
INNER JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.City = 'New York';
```

### Q17: What is index fragmentation and how do you handle it?

**Answer:** Fragmentation occurs when index pages are not physically contiguous:

- **Internal fragmentation**: Partially filled pages
- **External fragmentation**: Logical order differs from physical order

```sql
-- Check fragmentation
SELECT
    i.name,
    ips.avg_fragmentation_in_percent,
    CASE
        WHEN ips.avg_fragmentation_in_percent > 30 THEN 'REBUILD'
        WHEN ips.avg_fragmentation_in_percent > 10 THEN 'REORGANIZE'
        ELSE 'OK'
    END as Action
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, NULL) ips
JOIN sys.indexes i ON ips.object_id = i.object_id;

-- Fix fragmentation
ALTER INDEX IX_Orders_CustomerID ON Orders REBUILD; -- >30%
ALTER INDEX IX_Orders_CustomerID ON Orders REORGANIZE; -- 10-30%
```

### Q18: Explain query hints and when to use them.

**Answer:** Hints override query optimizer decisions (use sparingly):

- **JOIN hints**: HASH, MERGE, LOOP
- **INDEX hints**: WITH (INDEX(indexname))
- **QUERY hints**: MAXDOP, OPTIMIZE FOR

```sql
-- Force specific index
SELECT * FROM Orders WITH (INDEX(IX_Orders_CustomerID))
WHERE CustomerID = 1;

-- Limit parallel processing
SELECT * FROM LargeTable
OPTION (MAXDOP 1);
```

### Q19: What are statistics and why are they important?

**Answer:** Statistics help query optimizer make cost-based decisions:

- **Histogram**: Data distribution information
- **Density**: Uniqueness of values
- **Auto-update**: SQL Server maintains automatically
- **Manual update**: For better accuracy

```sql
-- View statistics
DBCC SHOW_STATISTICS('Orders', 'IX_Orders_CustomerID');

-- Update statistics
UPDATE STATISTICS Orders WITH FULLSCAN;
```

### Q20: How do you handle deadlocks?

**Answer:** Deadlocks occur when two transactions block each other:

- **Detection**: SQL Server automatically detects and kills one transaction
- **Prevention**: Consistent lock order, shorter transactions
- **Monitoring**: Extended events, error logs

```sql
-- Deadlock prevention example
BEGIN TRANSACTION;
-- Always access tables in same order
SELECT * FROM Customers WITH (UPDLOCK) WHERE CustomerID = 1;
SELECT * FROM Orders WITH (UPDLOCK) WHERE OrderID = 1;
-- Perform updates
COMMIT;
```

## 5. Azure SQL Database Specifics

### Q21: What are the key differences between Azure SQL Database and SQL Server on-premises?

**Answer:**
| Azure SQL Database | SQL Server On-Premises |
|--------------------|------------------------|
| PaaS service | Full control |
| Automatic backups/patching | Manual maintenance |
| Built-in high availability | Configure yourself |
| Elastic scaling | Hardware limitations |
| Pay-per-use | License + infrastructure costs |

### Q22: Explain Azure SQL Database service tiers.

**Answer:**

- **Basic**: Development/testing, up to 2GB
- **Standard**: Production workloads, up to 1TB
- **Premium**: Mission-critical, up to 4TB
- **General Purpose**: Balanced compute/storage
- **Business Critical**: Low latency, high IOPS
- **Hyperscale**: Large databases, up to 100TB

### Q23: What is Azure SQL Database Elastic Pool?

**Answer:** Shared resource pool for multiple databases:

- **Cost optimization**: Share resources across databases
- **Automatic scaling**: Resources allocated dynamically
- **Performance isolation**: Min/max resource guarantees per database
- **Monitoring**: Pool-level and database-level metrics

```sql
-- Create elastic pool
CREATE ELASTIC POOL MyPool
WITH (
    EDITION = 'Standard',
    DtU = 100,
    DATABASE_DtU_MIN = 10,
    DATABASE_DtU_MAX = 20
);
```

### Q24: How do you implement high availability in Azure SQL Database?

**Answer:**

- **Built-in HA**: 99.99% SLA with automatic failover
- **Geo-replication**: Active geo-replication for read scale
- **Failover groups**: Automatic failover with connection redirection
- **Zone redundancy**: Protection against datacenter failures

```sql
-- Create failover group
ALTER DATABASE MyDatabase
ADD TO FAILOVER GROUP MyFailoverGroup;
```

### Q25: What is Azure SQL Database Serverless?

**Answer:** Compute tier that automatically scales based on workload:

- **Auto-pause**: Pauses during inactivity
- **Auto-resume**: Resumes on connection
- **Per-second billing**: Pay only for compute used
- **Ideal for**: Intermittent workloads, development/testing

## 6. Security & Compliance

### Q26: What are the authentication methods available in Azure SQL Database?

**Answer:**

- **SQL Authentication**: Username/password
- **Azure AD Authentication**: Integrated with Azure Active Directory
- **Azure AD Integrated**: Single sign-on
- **Managed Identity**: System or user-assigned identities

```sql
-- Create Azure AD user
CREATE USER [user@domain.com] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [user@domain.com];
```

### Q27: Explain Row-Level Security (RLS) in SQL Server.

**Answer:** Filters rows based on user context:

- **Filter predicates**: Silently filter SELECT operations
- **Block predicates**: Prevent INSERT/UPDATE/DELETE operations
- **Security policies**: Define which predicates apply to which tables

```sql
-- Create security function
CREATE FUNCTION dbo.fn_securitypredicate(@UserID INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN SELECT 1 AS result
WHERE @UserID = USER_ID() OR IS_MEMBER('db_owner') = 1;

-- Create security policy
CREATE SECURITY POLICY CustomerSecurityPolicy
ADD FILTER PREDICATE dbo.fn_securitypredicate(CustomerID) ON Customers
WITH (STATE = ON);
```

### Q28: What is Dynamic Data Masking?

**Answer:** Obfuscates sensitive data for non-privileged users:

- **Default masking**: Shows XXXX for strings, 0 for numbers
- **Email masking**: Shows aXXX@XXXX.com
- **Random masking**: Random values within specified range
- **Custom masking**: Custom patterns

```sql
-- Add data masking
ALTER TABLE Customers
ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()');

ALTER TABLE Customers
ALTER COLUMN CreditCard ADD MASKED WITH (FUNCTION = 'partial(0,"XXXX-XXXX-XXXX-",4)');
```

### Q29: Explain Always Encrypted in SQL Server.

**Answer:** Client-side encryption for sensitive data:

- **Deterministic**: Same plaintext = same ciphertext (supports equality)
- **Randomized**: Different ciphertext each time (more secure)
- **Column Master Key**: Protects column encryption keys
- **Column Encryption Key**: Encrypts actual data

### Q30: What are the auditing capabilities in Azure SQL Database?

**Answer:**

- **Database auditing**: Tracks database events
- **Server auditing**: Tracks server-level events
- **Storage destinations**: Azure Storage, Log Analytics, Event Hub
- **Audit policies**: Define what events to capture

```sql
-- Enable auditing
CREATE DATABASE AUDIT SPECIFICATION MyDatabaseAuditSpec
FOR SERVER AUDIT MyServerAudit
ADD (SELECT, INSERT, UPDATE, DELETE ON SCHEMA::dbo BY public);

ALTER DATABASE AUDIT SPECIFICATION MyDatabaseAuditSpec
WITH (STATE = ON);
```

## 7. T-SQL and SQL Server Features

### Q31: What are the differences between UNION and UNION ALL?

**Answer:**

- **UNION**: Combines results and removes duplicates (slower)
- **UNION ALL**: Combines results without removing duplicates (faster)

```sql
-- UNION removes duplicates
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers;

-- UNION ALL keeps duplicates
SELECT City FROM Customers
UNION ALL
SELECT City FROM Suppliers;
```

### Q32: Explain the MERGE statement and its use cases.

**Answer:** MERGE performs INSERT, UPDATE, or DELETE in a single statement:

```sql
MERGE Inventory AS target
USING (SELECT ProductID, NewQuantity FROM ProductUpdates) AS source
ON target.ProductID = source.ProductID
WHEN MATCHED THEN
    UPDATE SET Quantity = source.NewQuantity
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductID, Quantity) VALUES (source.ProductID, source.NewQuantity)
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
```

### Q33: How do you handle JSON data in SQL Server?

**Answer:** SQL Server provides built-in JSON functions:

```sql
-- Parse JSON
DECLARE @json NVARCHAR(MAX) = '{"name": "John", "age": 30, "skills": ["C#", "SQL"]}';

SELECT
    JSON_VALUE(@json, '$.name') as Name,
    JSON_VALUE(@json, '$.age') as Age,
    JSON_QUERY(@json, '$.skills') as Skills;

-- Generate JSON
SELECT CustomerID, CustomerName, Email
FROM Customers
FOR JSON PATH;

-- Query JSON in table
SELECT * FROM Products
WHERE JSON_VALUE(Attributes, '$.color') = 'Red';
```

### Q34: What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?

**Answer:**

- **ROW_NUMBER()**: Sequential numbering (1,2,3,4,5)
- **RANK()**: Ranking with gaps (1,2,2,4,5)
- **DENSE_RANK()**: Ranking without gaps (1,2,2,3,4)

```sql
SELECT
    ProductName,
    Price,
    ROW_NUMBER() OVER (ORDER BY Price DESC) as RowNum,
    RANK() OVER (ORDER BY Price DESC) as Rank,
    DENSE_RANK() OVER (ORDER BY Price DESC) as DenseRank
FROM Products;
```

### Q35: Explain the PIVOT and UNPIVOT operations.

**Answer:**

- **PIVOT**: Rotates rows into columns
- **UNPIVOT**: Rotates columns into rows

```sql
-- PIVOT example: Sales by quarter
SELECT *
FROM (
    SELECT Year, Quarter, Sales FROM SalesData
) AS source
PIVOT (
    SUM(Sales) FOR Quarter IN ([Q1], [Q2], [Q3], [Q4])
) AS pivoted;

-- UNPIVOT example: Normalize pivoted data
SELECT Year, Quarter, Sales
FROM SalesDataPivoted
UNPIVOT (
    Sales FOR Quarter IN ([Q1], [Q2], [Q3], [Q4])
) AS unpivoted;
```

## 8. Monitoring & Troubleshooting

### Q36: How do you monitor query performance in Azure SQL Database?

**Answer:**

- **Query Store**: Built-in query performance monitoring
- **Azure Monitor**: Metrics and alerts
- **Intelligent Insights**: AI-powered performance analysis
- **DMVs**: Dynamic management views for real-time data

```sql
-- Query Store analysis
SELECT
    qsq.query_id,
    qst.query_sql_text,
    qrs.avg_duration/1000.0 as avg_duration_ms,
    qrs.avg_cpu_time/1000.0 as avg_cpu_ms
FROM sys.query_store_query qsq
JOIN sys.query_store_query_text qst ON qsq.query_text_id = qst.query_text_id
JOIN sys.query_store_runtime_stats qrs ON qsq.query_id = qrs.query_id
ORDER BY qrs.avg_duration DESC;
```

### Q37: What are Dynamic Management Views (DMVs) and how do you use them?

**Answer:** DMVs provide real-time system information:

```sql
-- Find expensive queries
SELECT TOP 10
    qs.sql_handle,
    qs.execution_count,
    qs.total_worker_time/1000 as total_cpu_ms,
    qs.total_elapsed_time/1000 as total_elapsed_ms,
    SUBSTRING(st.text, (qs.statement_start_offset/2)+1,
        CASE WHEN qs.statement_end_offset = -1
        THEN LEN(CONVERT(nvarchar(max), st.text)) * 2
        ELSE qs.statement_end_offset END - qs.statement_start_offset)/2) as query_text
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) st
ORDER BY qs.total_worker_time DESC;

-- Check wait statistics
SELECT
    wait_type,
    waiting_tasks_count,
    wait_time_ms,
    max_wait_time_ms,
    signal_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_time_ms > 0
ORDER BY wait_time_ms DESC;
```

### Q38: How do you identify and resolve blocking queries?

**Answer:**

- **sp_who2**: Show current connections and blocking
- **Activity Monitor**: GUI tool for monitoring
- **Extended Events**: Capture blocking events

```sql
-- Find blocking queries
SELECT
    blocking.session_id as blocking_session,
    blocked.session_id as blocked_session,
    blocking_text.text as blocking_query,
    blocked_text.text as blocked_query
FROM sys.dm_exec_requests blocked
INNER JOIN sys.dm_exec_requests blocking ON blocked.blocking_session_id = blocking.session_id
CROSS APPLY sys.dm_exec_sql_text(blocking.sql_handle) blocking_text
CROSS APPLY sys.dm_exec_sql_text(blocked.sql_handle) blocked_text;
```

### Q39: What is Query Store and how does it help with performance tuning?

**Answer:** Query Store captures query execution history:

- **Automatic capture**: All queries and their performance
- **Plan forcing**: Force specific execution plans
- **Regression detection**: Identify performance degradation
- **What-if analysis**: Compare different plans

```sql
-- Enable Query Store
ALTER DATABASE MyDatabase SET QUERY_STORE = ON;

-- Force a specific plan
EXEC sp_query_store_force_plan @query_id = 123, @plan_id = 456;

-- Find regressed queries
SELECT
    q.query_id,
    qt.query_sql_text,
    rs1.avg_duration as recent_avg_duration,
    rs2.avg_duration as history_avg_duration,
    (rs1.avg_duration - rs2.avg_duration) as duration_increase
FROM sys.query_store_query q
JOIN sys.query_store_query_text qt ON q.query_text_id = qt.query_text_id
JOIN sys.query_store_runtime_stats rs1 ON q.query_id = rs1.query_id
JOIN sys.query_store_runtime_stats rs2 ON q.query_id = rs2.query_id
WHERE rs1.runtime_stats_interval_id > rs2.runtime_stats_interval_id
AND rs1.avg_duration > rs2.avg_duration * 1.5; -- 50% slower
```

### Q40: How do you troubleshoot timeout issues in SQL Server?

**Answer:**

- **Check for blocking**: Use DMVs to find blocking sessions
- **Analyze wait statistics**: Identify resource bottlenecks
- **Review execution plans**: Look for expensive operations
- **Monitor resource usage**: CPU, memory, I/O metrics

```sql
-- Find long-running queries
SELECT
    r.session_id,
    r.start_time,
    r.command,
    r.status,
    r.wait_type,
    r.total_elapsed_time/1000 as elapsed_seconds,
    t.text as query_text
FROM sys.dm_exec_requests r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t
WHERE r.total_elapsed_time > 30000 -- More than 30 seconds
ORDER BY r.total_elapsed_time DESC;
```

## 9. Data Warehousing and Analytics

### Q41: What is the difference between OLTP and OLAP systems?

**Answer:**
| OLTP | OLAP |
|------|------|
| Transaction processing | Analytical processing |
| Current data | Historical data |
| Normalized design | Denormalized (star/snowflake) |
| High concurrency | Complex queries |
| Row-oriented | Column-oriented |

### Q42: Explain star schema and snowflake schema.

**Answer:**

- **Star Schema**: Fact table surrounded by dimension tables (denormalized)
- **Snowflake Schema**: Normalized dimension tables (multiple related tables)

```sql
-- Star Schema Example
-- Fact table
CREATE TABLE SalesFact (
    SalesID INT PRIMARY KEY,
    ProductID INT, -- FK to Product dimension
    CustomerID INT, -- FK to Customer dimension
    DateID INT, -- FK to Date dimension
    Quantity INT,
    Amount DECIMAL(10,2)
);

-- Dimension tables (denormalized)
CREATE TABLE ProductDim (
    ProductID INT PRIMARY KEY,
    ProductName NVARCHAR(100),
    Category NVARCHAR(50),
    Subcategory NVARCHAR(50),
    Brand NVARCHAR(50)
);
```

### Q43: What are slowly changing dimensions (SCD)?

**Answer:** Methods to handle dimension data changes:

- **Type 0**: No changes allowed
- **Type 1**: Overwrite (no history)
- **Type 2**: Add new record (preserve history)
- **Type 3**: Add new column (limited history)

```sql
-- SCD Type 2 implementation
CREATE TABLE CustomerDim (
    CustomerKey INT IDENTITY(1,1) PRIMARY KEY, -- Surrogate key
    CustomerID INT, -- Natural key
    CustomerName NVARCHAR(100),
    City NVARCHAR(50),
    EffectiveDate DATE,
    ExpirationDate DATE,
    IsCurrent BIT
);

-- Handle customer city change
INSERT INTO CustomerDim (CustomerID, CustomerName, City, EffectiveDate, ExpirationDate, IsCurrent)
VALUES (123, 'John Smith', 'New York', '2024-01-01', '9999-12-31', 1);

-- When city changes
UPDATE CustomerDim
SET ExpirationDate = '2024-06-30', IsCurrent = 0
WHERE CustomerID = 123 AND IsCurrent = 1;

INSERT INTO CustomerDim (CustomerID, CustomerName, City, EffectiveDate, ExpirationDate, IsCurrent)
VALUES (123, 'John Smith', 'Boston', '2024-07-01', '9999-12-31', 1);
```

### Q44: How do you implement incremental data loading?

**Answer:** Load only changed data since last update:

```sql
-- CDC (Change Data Capture) approach
-- Enable CDC
EXEC sys.sp_cdc_enable_db;
EXEC sys.sp_cdc_enable_table @source_schema = 'dbo', @source_name = 'Orders';

-- Query CDC data
SELECT * FROM cdc.dbo_Orders_CT
WHERE __$start_lsn > @last_processed_lsn;

-- Timestamp approach
ALTER TABLE Orders ADD LastModified DATETIME2 DEFAULT GETDATE();

-- Incremental load query
SELECT * FROM Orders
WHERE LastModified > @last_load_timestamp;
```

### Q45: What are columnstore indexes and when should you use them?

**Answer:** Columnar storage format optimized for analytics:

- **Clustered**: Entire table stored in columnar format
- **Non-clustered**: Additional columnstore index on rowstore table
- **Benefits**: High compression, fast aggregations
- **Use cases**: Data warehousing, analytics, reporting

```sql
-- Create clustered columnstore index
CREATE CLUSTERED COLUMNSTORE INDEX CCI_SalesFact ON SalesFact;

-- Create non-clustered columnstore index
CREATE NONCLUSTERED COLUMNSTORE INDEX NCCI_Orders_Analytics
ON Orders (OrderDate, CustomerID, TotalAmount, ProductID);

-- Partition columnstore for better performance
CREATE PARTITION FUNCTION pf_SalesDate (DATE)
AS RANGE RIGHT FOR VALUES ('2023-01-01', '2024-01-01', '2025-01-01');

CREATE CLUSTERED COLUMNSTORE INDEX CCI_SalesPartitioned ON SalesFact
ON ps_SalesDate (OrderDate);
```

## 10. Advanced Topics

### Q46: What is temporal table (system-versioned) in SQL Server?

**Answer:** Automatically tracks data changes over time:

```sql
-- Create temporal table
CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    Name NVARCHAR(100),
    Salary DECIMAL(10,2),
    StartTime DATETIME2 GENERATED ALWAYS AS ROW START HIDDEN,
    EndTime DATETIME2 GENERATED ALWAYS AS ROW END HIDDEN,
    PERIOD FOR SYSTEM_TIME (StartTime, EndTime)
) WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.EmployeeHistory));

-- Query historical data
SELECT * FROM Employee FOR SYSTEM_TIME AS OF '2024-01-01';
SELECT * FROM Employee FOR SYSTEM_TIME BETWEEN '2024-01-01' AND '2024-12-31';
```

### Q47: How do you implement database partitioning?

**Answer:** Divide large tables into smaller, manageable pieces:

```sql
-- Create partition function
CREATE PARTITION FUNCTION pf_OrderDate (DATE)
AS RANGE RIGHT FOR VALUES ('2023-01-01', '2024-01-01', '2025-01-01');

-- Create partition scheme
CREATE PARTITION SCHEME ps_OrderDate
AS PARTITION pf_OrderDate
TO ([PRIMARY], [FG2023], [FG2024], [FG2025]);

-- Create partitioned table
CREATE TABLE Orders (
    OrderID INT,
    OrderDate DATE,
    CustomerID INT,
    TotalAmount DECIMAL(10,2)
) ON ps_OrderDate(OrderDate);

-- Partition elimination in queries
SELECT * FROM Orders WHERE OrderDate >= '2024-01-01' AND OrderDate < '2024-02-01';
```

### Q48: What is In-Memory OLTP (Hekaton) and when to use it?

**Answer:** Memory-optimized tables and natively compiled procedures:

- **Lock-free**: Optimistic concurrency control
- **Durability options**: Schema and data, or schema only
- **Limitations**: No foreign keys, limited data types
- **Use cases**: High-throughput OLTP, session state, staging tables

```sql
-- Create memory-optimized table
CREATE TABLE OrdersMemory (
    OrderID INT NOT NULL PRIMARY KEY NONCLUSTERED HASH WITH (BUCKET_COUNT = 1000000),
    OrderDate DATETIME2 NOT NULL,
    CustomerID INT NOT NULL,
    TotalAmount DECIMAL(10,2) NOT NULL,
    INDEX IX_CustomerID NONCLUSTERED (CustomerID)
) WITH (MEMORY_OPTIMIZED = ON, DURABILITY = SCHEMA_AND_DATA);

-- Natively compiled stored procedure
CREATE PROCEDURE sp_InsertOrderFast
    @OrderID INT,
    @CustomerID INT,
    @TotalAmount DECIMAL(10,2)
WITH NATIVE_COMPILATION, SCHEMABINDING
AS
BEGIN ATOMIC WITH (TRANSACTION_ISOLATION_LEVEL = SNAPSHOT, LANGUAGE = N'us_english')
    INSERT INTO dbo.OrdersMemory (OrderID, OrderDate, CustomerID, TotalAmount)
    VALUES (@OrderID, GETDATE(), @CustomerID, @TotalAmount);
END;
```

### Q49: How do you handle large object (LOB) data efficiently?

**Answer:** Strategies for managing BLOB/CLOB data:

- **FILESTREAM**: Store in filesystem, managed by SQL Server
- **FILETABLE**: File system interface to FILESTREAM data
- **Remote Blob Storage**: Store in external storage (Azure Blob)

```sql
-- Enable FILESTREAM
EXEC sp_configure filestream_access_level, 2;
RECONFIGURE;

-- Create FILESTREAM filegroup
ALTER DATABASE MyDB ADD FILEGROUP FileStreamGroup CONTAINS FILESTREAM;
ALTER DATABASE MyDB ADD FILE (
    NAME = 'MyDB_FileStream',
    FILENAME = 'C:\MyDB\FileStream'
) TO FILEGROUP FileStreamGroup;

-- Create table with FILESTREAM column
CREATE TABLE Documents (
    DocumentID UNIQUEIDENTIFIER ROWGUIDCOL NOT NULL UNIQUE DEFAULT NEWID(),
    DocumentName NVARCHAR(255),
    DocumentContent VARBINARY(MAX) FILESTREAM NULL
);
```

### Q50: What are the best practices for database backup and recovery?

**Answer:** Comprehensive backup strategy:

- **Full backups**: Complete database copy (weekly)
- **Differential backups**: Changes since last full backup (daily)
- **Transaction log backups**: Continuous (every 15 minutes)
- **Testing**: Regular restore testing
- **Automation**: Scheduled backup jobs

```sql
-- Full backup
BACKUP DATABASE MyDatabase
TO DISK = 'C:\Backup\MyDatabase_Full.bak'
WITH COMPRESSION, CHECKSUM;

-- Differential backup
BACKUP DATABASE MyDatabase
TO DISK = 'C:\Backup\MyDatabase_Diff.bak'
WITH DIFFERENTIAL, COMPRESSION, CHECKSUM;

-- Transaction log backup
BACKUP LOG MyDatabase
TO DISK = 'C:\Backup\MyDatabase_Log.trn'
WITH COMPRESSION, CHECKSUM;

-- Point-in-time restore
RESTORE DATABASE MyDatabase_Restored
FROM DISK = 'C:\Backup\MyDatabase_Full.bak'
WITH NORECOVERY, REPLACE;

RESTORE DATABASE MyDatabase_Restored
FROM DISK = 'C:\Backup\MyDatabase_Diff.bak'
WITH NORECOVERY;

RESTORE LOG MyDatabase_Restored
FROM DISK = 'C:\Backup\MyDatabase_Log.trn'
WITH STOPAT = '2024-11-19 14:30:00';
```

---

# Code Samples

## 1. Database Design & Schema Creation

### Complete E-Commerce Database Schema

```sql
-- Create database with optimal settings for Azure SQL
CREATE DATABASE ECommerceDB
(
    EDITION = 'Standard',
    SERVICE_OBJECTIVE = 'S2',
    MAXSIZE = 250GB
);

-- Use the database
USE ECommerceDB;

-- Enable Query Store for performance monitoring
ALTER DATABASE ECommerceDB SET QUERY_STORE = ON;

-- Create schemas for organization
CREATE SCHEMA Sales;
CREATE SCHEMA Inventory;
CREATE SCHEMA Customer;
CREATE SCHEMA Audit;

-- Create sequence for order numbers
CREATE SEQUENCE Sales.OrderNumberSequence
    START WITH 100000
    INCREMENT BY 1
    CACHE 50;

-- Customer management tables
CREATE TABLE Customer.Customers (
    CustomerID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerGUID UNIQUEIDENTIFIER DEFAULT NEWID(),
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(20),
    DateOfBirth DATE,
    CreatedDate DATETIME2(7) DEFAULT GETDATE(),
    ModifiedDate DATETIME2(7) DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1,

    -- Constraints
    CONSTRAINT UK_Customers_Email UNIQUE (Email),
    CONSTRAINT CK_Customers_Email CHECK (Email LIKE '%@%.%'),
    CONSTRAINT CK_Customers_Phone CHECK (Phone NOT LIKE '%[^0-9+()-. ]%')
);

CREATE TABLE Customer.Addresses (
    AddressID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL,
    AddressType NVARCHAR(20) NOT NULL DEFAULT 'Billing', -- Billing, Shipping
    Street1 NVARCHAR(100) NOT NULL,
    Street2 NVARCHAR(100),
    City NVARCHAR(50) NOT NULL,
    State NVARCHAR(50) NOT NULL,
    ZipCode NVARCHAR(10) NOT NULL,
    Country NVARCHAR(50) NOT NULL DEFAULT 'USA',
    IsDefault BIT DEFAULT 0,
    CreatedDate DATETIME2(7) DEFAULT GETDATE(),

    -- Foreign key
    CONSTRAINT FK_Addresses_CustomerID
        FOREIGN KEY (CustomerID) REFERENCES Customer.Customers(CustomerID)
        ON DELETE CASCADE,

    -- Constraints
    CONSTRAINT CK_Addresses_AddressType
        CHECK (AddressType IN ('Billing', 'Shipping')),
    CONSTRAINT CK_Addresses_ZipCode
        CHECK (ZipCode NOT LIKE '%[^0-9-]%')
);

-- Product and inventory management
CREATE TABLE Inventory.Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL,
    ParentCategoryID INT NULL,
    Description NVARCHAR(500),
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME2(7) DEFAULT GETDATE(),

    -- Self-referencing foreign key
    CONSTRAINT FK_Categories_ParentCategoryID
        FOREIGN KEY (ParentCategoryID) REFERENCES Inventory.Categories(CategoryID),

    -- Unique constraint
    CONSTRAINT UK_Categories_Name_Parent
        UNIQUE (CategoryName, ParentCategoryID)
);

CREATE TABLE Inventory.Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    ProductSKU NVARCHAR(50) NOT NULL,
    ProductName NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    CategoryID INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    CostPrice DECIMAL(10,2) NOT NULL,
    Weight DECIMAL(8,2),
    Dimensions NVARCHAR(50), -- JSON: {"length": 10, "width": 5, "height": 3}
    IsActive BIT DEFAULT 1,
    CreatedDate DATETIME2(7) DEFAULT GETDATE(),
    ModifiedDate DATETIME2(7) DEFAULT GETDATE(),

    -- Foreign keys
    CONSTRAINT FK_Products_CategoryID
        FOREIGN KEY (CategoryID) REFERENCES Inventory.Categories(CategoryID),

    -- Constraints
    CONSTRAINT UK_Products_SKU UNIQUE (ProductSKU),
    CONSTRAINT CK_Products_UnitPrice CHECK (UnitPrice > 0),
    CONSTRAINT CK_Products_CostPrice CHECK (CostPrice >= 0),
    CONSTRAINT CK_Products_Weight CHECK (Weight > 0)
);

CREATE TABLE Inventory.ProductInventory (
    ProductID INT PRIMARY KEY,
    QuantityOnHand INT NOT NULL DEFAULT 0,
    QuantityReserved INT NOT NULL DEFAULT 0,
    ReorderLevel INT NOT NULL DEFAULT 10,
    MaxStockLevel INT NOT NULL DEFAULT 1000,
    LastRestockDate DATETIME2(7),
    LastModified DATETIME2(7) DEFAULT GETDATE(),

    -- Foreign key
    CONSTRAINT FK_ProductInventory_ProductID
        FOREIGN KEY (ProductID) REFERENCES Inventory.Products(ProductID)
        ON DELETE CASCADE,

    -- Constraints
    CONSTRAINT CK_ProductInventory_Quantities
        CHECK (QuantityOnHand >= 0 AND QuantityReserved >= 0),
    CONSTRAINT CK_ProductInventory_ReorderLevel
        CHECK (ReorderLevel > 0 AND MaxStockLevel > ReorderLevel)
);

-- Sales and order management
CREATE TABLE Sales.Orders (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    OrderNumber NVARCHAR(20) NOT NULL DEFAULT NEXT VALUE FOR Sales.OrderNumberSequence,
    CustomerID INT NOT NULL,
    OrderDate DATETIME2(7) DEFAULT GETDATE(),
    RequiredDate DATETIME2(7),
    ShippedDate DATETIME2(7),
    OrderStatus NVARCHAR(20) NOT NULL DEFAULT 'Pending',
    BillingAddressID INT,
    ShippingAddressID INT,
    SubTotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    TaxAmount DECIMAL(10,2) NOT NULL DEFAULT 0,
    ShippingAmount DECIMAL(10,2) NOT NULL DEFAULT 0,
    TotalAmount AS (SubTotal + TaxAmount + ShippingAmount) PERSISTED,
    PaymentStatus NVARCHAR(20) DEFAULT 'Pending',
    PaymentMethod NVARCHAR(50),
    TrackingNumber NVARCHAR(100),
    Notes NVARCHAR(500),
    CreatedBy NVARCHAR(100) DEFAULT SYSTEM_USER,
    CreatedDate DATETIME2(7) DEFAULT GETDATE(),
    ModifiedDate DATETIME2(7) DEFAULT GETDATE(),

    -- Foreign keys
    CONSTRAINT FK_Orders_CustomerID
        FOREIGN KEY (CustomerID) REFERENCES Customer.Customers(CustomerID),
    CONSTRAINT FK_Orders_BillingAddressID
        FOREIGN KEY (BillingAddressID) REFERENCES Customer.Addresses(AddressID),
    CONSTRAINT FK_Orders_ShippingAddressID
        FOREIGN KEY (ShippingAddressID) REFERENCES Customer.Addresses(AddressID),

    -- Constraints
    CONSTRAINT UK_Orders_OrderNumber UNIQUE (OrderNumber),
    CONSTRAINT CK_Orders_OrderStatus
        CHECK (OrderStatus IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
    CONSTRAINT CK_Orders_PaymentStatus
        CHECK (PaymentStatus IN ('Pending', 'Authorized', 'Paid', 'Refunded', 'Failed')),
    CONSTRAINT CK_Orders_Amounts
        CHECK (SubTotal >= 0 AND TaxAmount >= 0 AND ShippingAmount >= 0)
);

CREATE TABLE Sales.OrderItems (
    OrderItemID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10,2) NOT NULL,
    Discount DECIMAL(5,2) DEFAULT 0,
    LineTotal AS (Quantity * UnitPrice * (1 - Discount/100)) PERSISTED,

    -- Foreign keys
    CONSTRAINT FK_OrderItems_OrderID
        FOREIGN KEY (OrderID) REFERENCES Sales.Orders(OrderID)
        ON DELETE CASCADE,
    CONSTRAINT FK_OrderItems_ProductID
        FOREIGN KEY (ProductID) REFERENCES Inventory.Products(ProductID),

    -- Constraints
    CONSTRAINT UK_OrderItems_Order_Product UNIQUE (OrderID, ProductID),
    CONSTRAINT CK_OrderItems_Quantity CHECK (Quantity > 0),
    CONSTRAINT CK_OrderItems_UnitPrice CHECK (UnitPrice > 0),
    CONSTRAINT CK_OrderItems_Discount CHECK (Discount >= 0 AND Discount <= 100)
);

-- Audit tables for tracking changes
CREATE TABLE Audit.CustomerAudit (
    AuditID INT IDENTITY(1,1) PRIMARY KEY,
    CustomerID INT NOT NULL,
    Action NVARCHAR(10) NOT NULL, -- INSERT, UPDATE, DELETE
    OldValues NVARCHAR(MAX), -- JSON format
    NewValues NVARCHAR(MAX), -- JSON format
    ChangedBy NVARCHAR(100) DEFAULT SYSTEM_USER,
    ChangeDate DATETIME2(7) DEFAULT GETDATE(),

    CONSTRAINT CK_CustomerAudit_Action
        CHECK (Action IN ('INSERT', 'UPDATE', 'DELETE'))
);

CREATE TABLE Audit.OrderAudit (
    AuditID INT IDENTITY(1,1) PRIMARY KEY,
    OrderID INT NOT NULL,
    Action NVARCHAR(10) NOT NULL,
    OldValues NVARCHAR(MAX),
    NewValues NVARCHAR(MAX),
    ChangedBy NVARCHAR(100) DEFAULT SYSTEM_USER,
    ChangeDate DATETIME2(7) DEFAULT GETDATE(),

    CONSTRAINT CK_OrderAudit_Action
        CHECK (Action IN ('INSERT', 'UPDATE', 'DELETE'))
);
```

### Indexes for Optimal Performance

```sql
-- Customer table indexes
CREATE NONCLUSTERED INDEX IX_Customers_Email
ON Customer.Customers (Email);

CREATE NONCLUSTERED INDEX IX_Customers_LastName_FirstName
ON Customer.Customers (LastName, FirstName);

CREATE NONCLUSTERED INDEX IX_Customers_CreatedDate
ON Customer.Customers (CreatedDate)
WHERE IsActive = 1;

-- Address table indexes
CREATE NONCLUSTERED INDEX IX_Addresses_CustomerID
ON Customer.Addresses (CustomerID)
INCLUDE (AddressType, IsDefault);

CREATE NONCLUSTERED INDEX IX_Addresses_ZipCode
ON Customer.Addresses (ZipCode, City, State);

-- Product table indexes
CREATE NONCLUSTERED INDEX IX_Products_CategoryID
ON Inventory.Products (CategoryID)
INCLUDE (ProductName, UnitPrice, IsActive);

CREATE NONCLUSTERED INDEX IX_Products_Name
ON Inventory.Products (ProductName)
WHERE IsActive = 1;

CREATE NONCLUSTERED INDEX IX_Products_Price_Range
ON Inventory.Products (UnitPrice, CategoryID)
INCLUDE (ProductName, ProductSKU);

-- Order table indexes (partitioned by date)
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID_OrderDate
ON Sales.Orders (CustomerID, OrderDate DESC)
INCLUDE (OrderStatus, TotalAmount);

CREATE NONCLUSTERED INDEX IX_Orders_OrderDate_Status
ON Sales.Orders (OrderDate, OrderStatus)
INCLUDE (CustomerID, TotalAmount);

CREATE NONCLUSTERED INDEX IX_Orders_OrderNumber
ON Sales.Orders (OrderNumber)
INCLUDE (CustomerID, OrderDate, OrderStatus);

-- Order items indexes
CREATE NONCLUSTERED INDEX IX_OrderItems_ProductID
ON Sales.OrderItems (ProductID)
INCLUDE (OrderID, Quantity, UnitPrice);

CREATE NONCLUSTERED INDEX IX_OrderItems_OrderID
ON Sales.OrderItems (OrderID)
INCLUDE (ProductID, Quantity, LineTotal);

-- Audit table indexes
CREATE NONCLUSTERED INDEX IX_CustomerAudit_CustomerID_Date
ON Audit.CustomerAudit (CustomerID, ChangeDate DESC);

CREATE NONCLUSTERED INDEX IX_OrderAudit_OrderID_Date
ON Audit.OrderAudit (OrderID, ChangeDate DESC);
```

## 2. Complex Query Examples

### Advanced Reporting Queries

```sql
-- Customer Lifetime Value Analysis
WITH CustomerMetrics AS (
    SELECT
        c.CustomerID,
        c.FirstName + ' ' + c.LastName as CustomerName,
        c.Email,
        c.CreatedDate as CustomerSince,
        COUNT(DISTINCT o.OrderID) as TotalOrders,
        SUM(o.TotalAmount) as TotalSpent,
        AVG(o.TotalAmount) as AvgOrderValue,
        MIN(o.OrderDate) as FirstOrderDate,
        MAX(o.OrderDate) as LastOrderDate,
        DATEDIFF(DAY, MIN(o.OrderDate), MAX(o.OrderDate)) as CustomerLifespanDays,
        -- Recency, Frequency, Monetary calculation
        DATEDIFF(DAY, MAX(o.OrderDate), GETDATE()) as DaysSinceLastOrder,
        CASE
            WHEN COUNT(DISTINCT o.OrderID) >= 10 THEN 'High'
            WHEN COUNT(DISTINCT o.OrderID) >= 5 THEN 'Medium'
            ELSE 'Low'
        END as FrequencySegment,
        CASE
            WHEN SUM(o.TotalAmount) >= 5000 THEN 'High'
            WHEN SUM(o.TotalAmount) >= 1000 THEN 'Medium'
            ELSE 'Low'
        END as MonetarySegment
    FROM Customer.Customers c
    LEFT JOIN Sales.Orders o ON c.CustomerID = o.CustomerID
    WHERE c.IsActive = 1
    GROUP BY c.CustomerID, c.FirstName, c.LastName, c.Email, c.CreatedDate
),
CustomerSegmentation AS (
    SELECT *,
        CASE
            WHEN DaysSinceLastOrder <= 30 AND FrequencySegment = 'High' AND MonetarySegment = 'High' THEN 'VIP Champions'
            WHEN DaysSinceLastOrder <= 30 AND FrequencySegment = 'High' THEN 'Loyal Customers'
            WHEN DaysSinceLastOrder <= 60 AND MonetarySegment = 'High' THEN 'Big Spenders'
            WHEN DaysSinceLastOrder <= 90 THEN 'Potential Loyalists'
            WHEN DaysSinceLastOrder <= 180 THEN 'At Risk'
            WHEN DaysSinceLastOrder > 180 THEN 'Lost Customers'
            ELSE 'New Customers'
        END as CustomerSegment,
        -- Calculate percentile ranks
        PERCENT_RANK() OVER (ORDER BY TotalSpent) as MonetaryPercentile,
        PERCENT_RANK() OVER (ORDER BY TotalOrders) as FrequencyPercentile,
        -- Running totals
        SUM(TotalSpent) OVER (ORDER BY TotalSpent DESC) as RunningRevenueTotal
    FROM CustomerMetrics
)
SELECT
    CustomerSegment,
    COUNT(*) as CustomerCount,
    AVG(TotalSpent) as AvgLifetimeValue,
    SUM(TotalSpent) as TotalRevenue,
    AVG(TotalOrders) as AvgOrders,
    AVG(AvgOrderValue) as AvgOrderValue,
    AVG(CAST(DaysSinceLastOrder as FLOAT)) as AvgDaysSinceLastOrder
FROM CustomerSegmentation
GROUP BY CustomerSegment
ORDER BY TotalRevenue DESC;

-- Product Performance Analysis with Advanced Metrics
WITH ProductSales AS (
    SELECT
        p.ProductID,
        p.ProductName,
        p.ProductSKU,
        c.CategoryName,
        p.UnitPrice,
        p.CostPrice,
        pi.QuantityOnHand,
        -- Sales metrics
        COUNT(DISTINCT oi.OrderID) as OrderCount,
        SUM(oi.Quantity) as TotalQuantitySold,
        SUM(oi.LineTotal) as TotalRevenue,
        SUM(oi.Quantity * p.CostPrice) as TotalCost,
        AVG(oi.Quantity) as AvgQuantityPerOrder,
        -- Calculate profit margins
        (SUM(oi.LineTotal) - SUM(oi.Quantity * p.CostPrice)) as TotalProfit,
        ((SUM(oi.LineTotal) - SUM(oi.Quantity * p.CostPrice)) / SUM(oi.LineTotal)) * 100 as ProfitMargin,
        -- Time-based analysis
        MIN(o.OrderDate) as FirstSaleDate,
        MAX(o.OrderDate) as LastSaleDate,
        DATEDIFF(DAY, MIN(o.OrderDate), MAX(o.OrderDate)) as SalesPeriodDays
    FROM Inventory.Products p
    LEFT JOIN Inventory.Categories c ON p.CategoryID = c.CategoryID
    LEFT JOIN Inventory.ProductInventory pi ON p.ProductID = pi.ProductID
    LEFT JOIN Sales.OrderItems oi ON p.ProductID = oi.ProductID
    LEFT JOIN Sales.Orders o ON oi.OrderID = o.OrderID
    WHERE p.IsActive = 1
    GROUP BY p.ProductID, p.ProductName, p.ProductSKU, c.CategoryName,
             p.UnitPrice, p.CostPrice, pi.QuantityOnHand
),
ProductRanking AS (
    SELECT *,
        -- Revenue ranking
        RANK() OVER (ORDER BY TotalRevenue DESC) as RevenueRank,
        DENSE_RANK() OVER (PARTITION BY CategoryName ORDER BY TotalRevenue DESC) as CategoryRevenueRank,
        -- Quantity ranking
        RANK() OVER (ORDER BY TotalQuantitySold DESC) as QuantityRank,
        -- Profit ranking
        RANK() OVER (ORDER BY TotalProfit DESC) as ProfitRank,
        -- Calculate ABC classification
        CASE
            WHEN PERCENT_RANK() OVER (ORDER BY TotalRevenue DESC) <= 0.2 THEN 'A'
            WHEN PERCENT_RANK() OVER (ORDER BY TotalRevenue DESC) <= 0.5 THEN 'B'
            ELSE 'C'
        END as ABCClassification,
        -- Inventory turnover ratio
        CASE
            WHEN pi.QuantityOnHand > 0 THEN TotalQuantitySold / NULLIF(pi.QuantityOnHand, 0)
            ELSE NULL
        END as InventoryTurnoverRatio
    FROM ProductSales ps
    JOIN Inventory.ProductInventory pi ON ps.ProductID = pi.ProductID
)
SELECT
    ProductName,
    CategoryName,
    ABCClassification,
    FORMAT(TotalRevenue, 'C', 'en-US') as Revenue,
    TotalQuantitySold,
    FORMAT(TotalProfit, 'C', 'en-US') as Profit,
    FORMAT(ProfitMargin, 'N2') + '%' as ProfitMargin,
    RevenueRank,
    CategoryRevenueRank,
    QuantityOnHand,
    FORMAT(InventoryTurnoverRatio, 'N2') as TurnoverRatio,
    CASE
        WHEN InventoryTurnoverRatio > 12 THEN 'Fast Moving'
        WHEN InventoryTurnoverRatio > 4 THEN 'Medium Moving'
        WHEN InventoryTurnoverRatio > 1 THEN 'Slow Moving'
        ELSE 'Non Moving'
    END as MovementCategory
FROM ProductRanking
WHERE TotalQuantitySold > 0
ORDER BY TotalRevenue DESC;

-- Monthly Sales Trend Analysis with Forecasting
WITH MonthlySales AS (
    SELECT
        YEAR(OrderDate) as SalesYear,
        MONTH(OrderDate) as SalesMonth,
        DATEFROMPARTS(YEAR(OrderDate), MONTH(OrderDate), 1) as MonthYear,
        COUNT(DISTINCT OrderID) as OrderCount,
        COUNT(DISTINCT CustomerID) as UniqueCustomers,
        SUM(TotalAmount) as MonthlyRevenue,
        AVG(TotalAmount) as AvgOrderValue,
        SUM(SUM(TotalAmount)) OVER (
            ORDER BY YEAR(OrderDate), MONTH(OrderDate)
            ROWS UNBOUNDED PRECEDING
        ) as CumulativeRevenue
    FROM Sales.Orders
    WHERE OrderStatus NOT IN ('Cancelled')
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
),
SalesTrends AS (
    SELECT *,
        -- Previous period comparisons
        LAG(MonthlyRevenue, 1) OVER (ORDER BY SalesYear, SalesMonth) as PreviousMonthRevenue,
        LAG(MonthlyRevenue, 12) OVER (ORDER BY SalesYear, SalesMonth) as SameMonthLastYear,
        -- Growth calculations
        (MonthlyRevenue - LAG(MonthlyRevenue, 1) OVER (ORDER BY SalesYear, SalesMonth)) /
            NULLIF(LAG(MonthlyRevenue, 1) OVER (ORDER BY SalesYear, SalesMonth), 0) * 100 as MonthOverMonthGrowth,
        (MonthlyRevenue - LAG(MonthlyRevenue, 12) OVER (ORDER BY SalesYear, SalesMonth)) /
            NULLIF(LAG(MonthlyRevenue, 12) OVER (ORDER BY SalesYear, SalesMonth), 0) * 100 as YearOverYearGrowth,
        -- Moving averages
        AVG(MonthlyRevenue) OVER (
            ORDER BY SalesYear, SalesMonth
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ) as ThreeMonthMovingAvg,
        AVG(MonthlyRevenue) OVER (
            ORDER BY SalesYear, SalesMonth
            ROWS BETWEEN 11 PRECEDING AND CURRENT ROW
        ) as TwelveMonthMovingAvg,
        -- Seasonality index
        MonthlyRevenue / AVG(MonthlyRevenue) OVER () as SeasonalityIndex
    FROM MonthlySales
)
SELECT
    FORMAT(MonthYear, 'MMM yyyy') as Month,
    FORMAT(MonthlyRevenue, 'C0') as Revenue,
    OrderCount,
    UniqueCustomers,
    FORMAT(AvgOrderValue, 'C') as AvgOrderValue,
    FORMAT(MonthOverMonthGrowth, '+#.##;-#.##;0') + '%' as MoMGrowth,
    FORMAT(YearOverYearGrowth, '+#.##;-#.##;0') + '%' as YoYGrowth,
    FORMAT(ThreeMonthMovingAvg, 'C0') as ThreeMonthAvg,
    FORMAT(SeasonalityIndex, 'N2') as SeasonalityIndex,
    FORMAT(CumulativeRevenue, 'C0') as CumulativeRevenue,
    -- Trend indicators
    CASE
        WHEN MonthOverMonthGrowth > 10 THEN '📈 Strong Growth'
        WHEN MonthOverMonthGrowth > 0 THEN '📊 Growth'
        WHEN MonthOverMonthGrowth > -5 THEN '📉 Slight Decline'
        ELSE '🔻 Decline'
    END as TrendIndicator
FROM SalesTrends
ORDER BY SalesYear DESC, SalesMonth DESC;
```

### Customer Cohort Analysis

```sql
-- Customer Cohort Retention Analysis
WITH CustomerCohorts AS (
    -- Identify customer's first purchase month (cohort)
    SELECT
        CustomerID,
        DATEFROMPARTS(YEAR(MIN(OrderDate)), MONTH(MIN(OrderDate)), 1) as CohortMonth
    FROM Sales.Orders
    WHERE OrderStatus NOT IN ('Cancelled')
    GROUP BY CustomerID
),
CustomerOrders AS (
    -- Get all customer orders with their cohort information
    SELECT
        o.CustomerID,
        o.OrderDate,
        o.TotalAmount,
        cc.CohortMonth,
        DATEDIFF(MONTH, cc.CohortMonth,
            DATEFROMPARTS(YEAR(o.OrderDate), MONTH(o.OrderDate), 1)) as PeriodNumber
    FROM Sales.Orders o
    JOIN CustomerCohorts cc ON o.CustomerID = cc.CustomerID
    WHERE o.OrderStatus NOT IN ('Cancelled')
),
CohortData AS (
    SELECT
        CohortMonth,
        PeriodNumber,
        COUNT(DISTINCT CustomerID) as CustomersInPeriod,
        SUM(TotalAmount) as RevenueInPeriod,
        AVG(TotalAmount) as AvgOrderValue
    FROM CustomerOrders
    GROUP BY CohortMonth, PeriodNumber
),
CohortSizes AS (
    SELECT
        CohortMonth,
        COUNT(DISTINCT CustomerID) as CohortSize
    FROM CustomerCohorts
    GROUP BY CohortMonth
)
SELECT
    FORMAT(cd.CohortMonth, 'MMM yyyy') as CohortMonth,
    cs.CohortSize,
    cd.PeriodNumber,
    cd.CustomersInPeriod,
    FORMAT(cd.CustomersInPeriod * 100.0 / cs.CohortSize, 'N1') + '%' as RetentionRate,
    FORMAT(cd.RevenueInPeriod, 'C0') as Revenue,
    FORMAT(cd.AvgOrderValue, 'C') as AvgOrderValue,
    -- Calculate cumulative metrics
    SUM(cd.RevenueInPeriod) OVER (
        PARTITION BY cd.CohortMonth
        ORDER BY cd.PeriodNumber
        ROWS UNBOUNDED PRECEDING
    ) as CumulativeRevenue
FROM CohortData cd
JOIN CohortSizes cs ON cd.CohortMonth = cs.CohortMonth
WHERE cd.PeriodNumber <= 12 -- Focus on first 12 months
ORDER BY cd.CohortMonth DESC, cd.PeriodNumber;

-- Pivot the cohort data for better visualization
WITH CohortRetention AS (
    SELECT
        CohortMonth,
        PeriodNumber,
        CustomersInPeriod * 100.0 / CohortSize as RetentionRate
    FROM CohortData cd
    JOIN CohortSizes cs ON cd.CohortMonth = cs.CohortMonth
    WHERE PeriodNumber <= 11
)
SELECT
    FORMAT(CohortMonth, 'MMM yyyy') as CohortMonth,
    FORMAT([0], 'N1') + '%' as Month0,
    FORMAT([1], 'N1') + '%' as Month1,
    FORMAT([2], 'N1') + '%' as Month2,
    FORMAT([3], 'N1') + '%' as Month3,
    FORMAT([4], 'N1') + '%' as Month4,
    FORMAT([5], 'N1') + '%' as Month5,
    FORMAT([6], 'N1') + '%' as Month6,
    FORMAT([7], 'N1') + '%' as Month7,
    FORMAT([8], 'N1') + '%' as Month8,
    FORMAT([9], 'N1') + '%' as Month9,
    FORMAT([10], 'N1') + '%' as Month10,
    FORMAT([11], 'N1') + '%' as Month11
FROM CohortRetention
PIVOT (
    AVG(RetentionRate) FOR PeriodNumber IN ([0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10],[11])
) as PivotedCohort
ORDER BY CohortMonth DESC;
```

## 3. Stored Procedures and Functions

### Order Management System Procedures

```sql
-- Comprehensive Order Processing Stored Procedure
CREATE PROCEDURE Sales.ProcessNewOrder
    @CustomerID INT,
    @BillingAddressID INT = NULL,
    @ShippingAddressID INT = NULL,
    @PaymentMethod NVARCHAR(50) = 'Credit Card',
    @OrderItems Sales.OrderItemsTableType READONLY, -- Custom table type
    @Notes NVARCHAR(500) = NULL,
    @OrderID INT OUTPUT,
    @OrderNumber NVARCHAR(20) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;
    DECLARE @SubTotal DECIMAL(12,2) = 0;
    DECLARE @TaxRate DECIMAL(5,4) = 0.0875; -- 8.75%
    DECLARE @ShippingRate DECIMAL(10,2) = 9.99;
    DECLARE @TaxAmount DECIMAL(10,2) = 0;
    DECLARE @ShippingAmount DECIMAL(10,2) = 0;

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Validate customer exists and is active
        IF NOT EXISTS (SELECT 1 FROM Customer.Customers WHERE CustomerID = @CustomerID AND IsActive = 1)
        BEGIN
            RAISERROR('Invalid or inactive customer ID: %d', 16, 1, @CustomerID);
        END

        -- Validate order items
        IF NOT EXISTS (SELECT 1 FROM @OrderItems)
        BEGIN
            RAISERROR('Order must contain at least one item', 16, 1);
        END

        -- Validate product availability and calculate subtotal
        SELECT @SubTotal = SUM(oi.Quantity * p.UnitPrice)
        FROM @OrderItems oi
        JOIN Inventory.Products p ON oi.ProductID = p.ProductID
        JOIN Inventory.ProductInventory pi ON p.ProductID = pi.ProductID
        WHERE p.IsActive = 1
        AND (pi.QuantityOnHand - pi.QuantityReserved) >= oi.Quantity;

        -- Check if all items are available
        IF EXISTS (
            SELECT 1 FROM @OrderItems oi
            JOIN Inventory.Products p ON oi.ProductID = p.ProductID
            JOIN Inventory.ProductInventory pi ON p.ProductID = pi.ProductID
            WHERE p.IsActive = 0 OR (pi.QuantityOnHand - pi.QuantityReserved) < oi.Quantity
        )
        BEGIN
            RAISERROR('One or more items are not available in sufficient quantity', 16, 1);
        END

        -- Calculate tax and shipping
        SET @TaxAmount = @SubTotal * @TaxRate;
        SET @ShippingAmount = CASE WHEN @SubTotal >= 50 THEN 0 ELSE @ShippingRate END;

        -- Set default addresses if not provided
        IF @BillingAddressID IS NULL
        BEGIN
            SELECT TOP 1 @BillingAddressID = AddressID
            FROM Customer.Addresses
            WHERE CustomerID = @CustomerID AND AddressType = 'Billing' AND IsDefault = 1;
        END

        IF @ShippingAddressID IS NULL
        BEGIN
            SELECT TOP 1 @ShippingAddressID = AddressID
            FROM Customer.Addresses
            WHERE CustomerID = @CustomerID AND AddressType = 'Shipping' AND IsDefault = 1;
        END

        -- Create the order
        INSERT INTO Sales.Orders (
            CustomerID, BillingAddressID, ShippingAddressID,
            SubTotal, TaxAmount, ShippingAmount, PaymentMethod, Notes
        )
        VALUES (
            @CustomerID, @BillingAddressID, @ShippingAddressID,
            @SubTotal, @TaxAmount, @ShippingAmount, @PaymentMethod, @Notes
        );

        SET @OrderID = SCOPE_IDENTITY();

        -- Get the generated order number
        SELECT @OrderNumber = OrderNumber
        FROM Sales.Orders
        WHERE OrderID = @OrderID;

        -- Insert order items
        INSERT INTO Sales.OrderItems (OrderID, ProductID, Quantity, UnitPrice)
        SELECT @OrderID, oi.ProductID, oi.Quantity, p.UnitPrice
        FROM @OrderItems oi
        JOIN Inventory.Products p ON oi.ProductID = p.ProductID;

        -- Reserve inventory
        UPDATE pi
        SET QuantityReserved = QuantityReserved + oi.Quantity,
            LastModified = GETDATE()
        FROM Inventory.ProductInventory pi
        JOIN @OrderItems oi ON pi.ProductID = oi.ProductID;

        -- Log the order creation
        INSERT INTO Audit.OrderAudit (OrderID, Action, NewValues)
        VALUES (@OrderID, 'INSERT',
                JSON_OBJECT('OrderNumber', @OrderNumber, 'CustomerID', @CustomerID,
                           'TotalAmount', @SubTotal + @TaxAmount + @ShippingAmount));

        COMMIT TRANSACTION;

        -- Return success message
        PRINT 'Order created successfully. Order Number: ' + @OrderNumber;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT @ErrorMessage = ERROR_MESSAGE(),
               @ErrorSeverity = ERROR_SEVERITY(),
               @ErrorState = ERROR_STATE();

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;

-- Update Order Status Procedure
CREATE PROCEDURE Sales.UpdateOrderStatus
    @OrderID INT,
    @NewStatus NVARCHAR(20),
    @TrackingNumber NVARCHAR(100) = NULL,
    @Notes NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @CurrentStatus NVARCHAR(20);
    DECLARE @CustomerID INT;
    DECLARE @OrderNumber NVARCHAR(20);
    DECLARE @OldValues NVARCHAR(MAX);
    DECLARE @NewValues NVARCHAR(MAX);

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Get current order information
        SELECT @CurrentStatus = OrderStatus,
               @CustomerID = CustomerID,
               @OrderNumber = OrderNumber
        FROM Sales.Orders
        WHERE OrderID = @OrderID;

        -- Validate order exists
        IF @CurrentStatus IS NULL
        BEGIN
            RAISERROR('Order ID %d does not exist', 16, 1, @OrderID);
        END

        -- Validate status transition
        IF @CurrentStatus = 'Cancelled'
        BEGIN
            RAISERROR('Cannot update status of cancelled order', 16, 1);
        END

        -- Prepare audit data
        SELECT @OldValues = JSON_OBJECT('OrderStatus', @CurrentStatus);
        SELECT @NewValues = JSON_OBJECT('OrderStatus', @NewStatus,
                                       'TrackingNumber', @TrackingNumber);

        -- Update order status
        UPDATE Sales.Orders
        SET OrderStatus = @NewStatus,
            TrackingNumber = ISNULL(@TrackingNumber, TrackingNumber),
            ShippedDate = CASE WHEN @NewStatus = 'Shipped' THEN GETDATE() ELSE ShippedDate END,
            ModifiedDate = GETDATE(),
            Notes = ISNULL(@Notes, Notes)
        WHERE OrderID = @OrderID;

        -- Handle inventory based on status change
        IF @NewStatus = 'Cancelled'
        BEGIN
            -- Release reserved inventory
            UPDATE pi
            SET QuantityReserved = QuantityReserved - oi.Quantity,
                LastModified = GETDATE()
            FROM Inventory.ProductInventory pi
            JOIN Sales.OrderItems oi ON pi.ProductID = oi.ProductID
            WHERE oi.OrderID = @OrderID;
        END
        ELSE IF @NewStatus = 'Shipped'
        BEGIN
            -- Reduce actual inventory
            UPDATE pi
            SET QuantityOnHand = QuantityOnHand - oi.Quantity,
                QuantityReserved = QuantityReserved - oi.Quantity,
                LastModified = GETDATE()
            FROM Inventory.ProductInventory pi
            JOIN Sales.OrderItems oi ON pi.ProductID = oi.ProductID
            WHERE oi.OrderID = @OrderID;
        END

        -- Log the status change
        INSERT INTO Audit.OrderAudit (OrderID, Action, OldValues, NewValues)
        VALUES (@OrderID, 'UPDATE', @OldValues, @NewValues);

        COMMIT TRANSACTION;

        PRINT 'Order ' + @OrderNumber + ' status updated to: ' + @NewStatus;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();

        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
```

### Advanced Functions for Business Logic

```sql
-- Customer Scoring Function
CREATE FUNCTION Customer.fn_CalculateCustomerScore(@CustomerID INT)
RETURNS DECIMAL(5,2)
AS
BEGIN
    DECLARE @Score DECIMAL(5,2) = 0;
    DECLARE @TotalOrders INT;
    DECLARE @TotalSpent DECIMAL(12,2);
    DECLARE @AvgOrderValue DECIMAL(10,2);
    DECLARE @DaysSinceLastOrder INT;
    DECLARE @CustomerAgeMonths INT;

    -- Get customer metrics
    SELECT
        @TotalOrders = COUNT(OrderID),
        @TotalSpent = SUM(TotalAmount),
        @AvgOrderValue = AVG(TotalAmount),
        @DaysSinceLastOrder = DATEDIFF(DAY, MAX(OrderDate), GETDATE())
    FROM Sales.Orders
    WHERE CustomerID = @CustomerID AND OrderStatus NOT IN ('Cancelled');

    -- Get customer age
    SELECT @CustomerAgeMonths = DATEDIFF(MONTH, CreatedDate, GETDATE())
    FROM Customer.Customers
    WHERE CustomerID = @CustomerID;

    -- Calculate score components
    -- Frequency Score (0-30 points)
    SET @Score = @Score + CASE
        WHEN @TotalOrders >= 20 THEN 30
        WHEN @TotalOrders >= 10 THEN 25
        WHEN @TotalOrders >= 5 THEN 20
        WHEN @TotalOrders >= 2 THEN 15
        WHEN @TotalOrders >= 1 THEN 10
        ELSE 0
    END;

    -- Monetary Score (0-40 points)
    SET @Score = @Score + CASE
        WHEN @TotalSpent >= 5000 THEN 40
        WHEN @TotalSpent >= 2000 THEN 35
        WHEN @TotalSpent >= 1000 THEN 30
        WHEN @TotalSpent >= 500 THEN 25
        WHEN @TotalSpent >= 100 THEN 20
        ELSE 0
    END;

    -- Recency Score (0-20 points)
    SET @Score = @Score + CASE
        WHEN @DaysSinceLastOrder <= 30 THEN 20
        WHEN @DaysSinceLastOrder <= 60 THEN 15
        WHEN @DaysSinceLastOrder <= 90 THEN 10
        WHEN @DaysSinceLastOrder <= 180 THEN 5
        ELSE 0
    END;

    -- Loyalty Score (0-10 points)
    SET @Score = @Score + CASE
        WHEN @CustomerAgeMonths >= 24 THEN 10
        WHEN @CustomerAgeMonths >= 12 THEN 8
        WHEN @CustomerAgeMonths >= 6 THEN 6
        WHEN @CustomerAgeMonths >= 3 THEN 4
        ELSE 2
    END;

    RETURN @Score;
END;

-- Product Recommendation Function
CREATE FUNCTION Inventory.fn_GetProductRecommendations(@CustomerID INT, @TopN INT = 5)
RETURNS TABLE
AS
RETURN (
    WITH CustomerPurchases AS (
        -- Get customer's purchase history
        SELECT DISTINCT p.CategoryID, oi.ProductID
        FROM Sales.Orders o
        JOIN Sales.OrderItems oi ON o.OrderID = oi.OrderID
        JOIN Inventory.Products p ON oi.ProductID = p.ProductID
        WHERE o.CustomerID = @CustomerID
        AND o.OrderStatus NOT IN ('Cancelled')
    ),
    CategoryPreferences AS (
        -- Identify preferred categories
        SELECT CategoryID, COUNT(*) as PurchaseCount
        FROM CustomerPurchases
        GROUP BY CategoryID
    ),
    SimilarCustomers AS (
        -- Find customers with similar purchase patterns
        SELECT o2.CustomerID, COUNT(*) as CommonProducts
        FROM CustomerPurchases cp
        JOIN Sales.OrderItems oi2 ON cp.ProductID = oi2.ProductID
        JOIN Sales.Orders o2 ON oi2.OrderID = o2.OrderID
        WHERE o2.CustomerID != @CustomerID
        AND o2.OrderStatus NOT IN ('Cancelled')
        GROUP BY o2.CustomerID
        HAVING COUNT(*) >= 2 -- At least 2 common products
    ),
    RecommendedProducts AS (
        -- Products bought by similar customers but not by target customer
        SELECT
            p.ProductID,
            p.ProductName,
            p.UnitPrice,
            COUNT(DISTINCT sc.CustomerID) as BoughtBySimilarCustomers,
            AVG(oi.LineTotal) as AvgRevenue
        FROM SimilarCustomers sc
        JOIN Sales.Orders o ON sc.CustomerID = o.CustomerID
        JOIN Sales.OrderItems oi ON o.OrderID = oi.OrderID
        JOIN Inventory.Products p ON oi.ProductID = p.ProductID
        WHERE p.IsActive = 1
        AND p.ProductID NOT IN (SELECT ProductID FROM CustomerPurchases)
        AND o.OrderStatus NOT IN ('Cancelled')
        GROUP BY p.ProductID, p.ProductName, p.UnitPrice
    )
    SELECT TOP (@TopN)
        ProductID,
        ProductName,
        UnitPrice,
        BoughtBySimilarCustomers,
        AvgRevenue,
        RANK() OVER (ORDER BY BoughtBySimilarCustomers DESC, AvgRevenue DESC) as RecommendationRank
    FROM RecommendedProducts
    ORDER BY BoughtBySimilarCustomers DESC, AvgRevenue DESC
);

-- Inventory Management Function
CREATE FUNCTION Inventory.fn_GetLowStockAlert(@ReorderThresholdMultiplier DECIMAL(3,2) = 1.0)
RETURNS TABLE
AS
RETURN (
    SELECT
        p.ProductID,
        p.ProductName,
        p.ProductSKU,
        pi.QuantityOnHand,
        pi.QuantityReserved,
        pi.ReorderLevel * @ReorderThresholdMultiplier as AdjustedReorderLevel,
        pi.MaxStockLevel,
        -- Calculate suggested order quantity
        CASE
            WHEN pi.QuantityOnHand <= (pi.ReorderLevel * @ReorderThresholdMultiplier)
            THEN pi.MaxStockLevel - pi.QuantityOnHand
            ELSE 0
        END as SuggestedOrderQuantity,
        -- Calculate days of supply based on average daily sales
        CASE
            WHEN ISNULL(sales_data.AvgDailySales, 0) > 0
            THEN pi.QuantityOnHand / sales_data.AvgDailySales
            ELSE 999
        END as DaysOfSupply,
        sales_data.AvgDailySales,
        -- Risk level
        CASE
            WHEN pi.QuantityOnHand <= (pi.ReorderLevel * 0.5) THEN 'CRITICAL'
            WHEN pi.QuantityOnHand <= pi.ReorderLevel THEN 'LOW'
            WHEN pi.QuantityOnHand <= (pi.ReorderLevel * 1.5) THEN 'WATCH'
            ELSE 'OK'
        END as StockStatus
    FROM Inventory.Products p
    JOIN Inventory.ProductInventory pi ON p.ProductID = pi.ProductID
    LEFT JOIN (
        SELECT
            oi.ProductID,
            AVG(CAST(oi.Quantity as DECIMAL(10,2))) as AvgDailySales
        FROM Sales.OrderItems oi
        JOIN Sales.Orders o ON oi.OrderID = o.OrderID
        WHERE o.OrderDate >= DATEADD(DAY, -30, GETDATE())
        AND o.OrderStatus NOT IN ('Cancelled')
        GROUP BY oi.ProductID
    ) sales_data ON p.ProductID = sales_data.ProductID
    WHERE p.IsActive = 1
    AND pi.QuantityOnHand <= (pi.ReorderLevel * @ReorderThresholdMultiplier)
);
```

---

# TL;DR Summary

## 🚀 Quick Reference Tables

### SQL Commands Comparison Matrix

| Command      | Purpose          | Affects Structure | Affects Data | Rollback | Performance |
| ------------ | ---------------- | ----------------- | ------------ | -------- | ----------- |
| **SELECT**   | Query data       | ❌                | ❌           | N/A      | Fast        |
| **INSERT**   | Add rows         | ❌                | ✅           | ✅       | Medium      |
| **UPDATE**   | Modify rows      | ❌                | ✅           | ✅       | Medium      |
| **DELETE**   | Remove rows      | ❌                | ✅           | ✅       | Medium      |
| **TRUNCATE** | Clear table      | ❌                | ✅           | ❌       | Fast        |
| **DROP**     | Remove object    | ✅                | ✅           | ✅       | Fast        |
| **ALTER**    | Modify structure | ✅                | ❌           | ✅       | Varies      |

### JOIN Types Quick Reference

| JOIN Type      | Description               | Use Case                      | NULL Handling             |
| -------------- | ------------------------- | ----------------------------- | ------------------------- |
| **INNER**      | Only matching rows        | Find related data             | Excludes NULLs            |
| **LEFT**       | All from left + matches   | Include all primary records   | Shows NULLs for unmatched |
| **RIGHT**      | All from right + matches  | Include all secondary records | Shows NULLs for unmatched |
| **FULL OUTER** | All rows from both tables | Complete data comparison      | Shows NULLs for unmatched |
| **CROSS**      | Cartesian product         | Generate combinations         | N/A                       |
| **SELF**       | Table joined to itself    | Hierarchical data             | Depends on join type      |

### Window Functions Cheat Sheet

| Function         | Purpose              | Syntax Pattern                                           | Example Use Case           |
| ---------------- | -------------------- | -------------------------------------------------------- | -------------------------- |
| **ROW_NUMBER()** | Sequential numbering | `ROW_NUMBER() OVER (ORDER BY col)`                       | Pagination                 |
| **RANK()**       | Ranking with gaps    | `RANK() OVER (ORDER BY col DESC)`                        | Competition standings      |
| **DENSE_RANK()** | Ranking without gaps | `DENSE_RANK() OVER (ORDER BY col DESC)`                  | Grade rankings             |
| **LAG()**        | Previous row value   | `LAG(col, 1) OVER (ORDER BY date)`                       | Compare to previous period |
| **LEAD()**       | Next row value       | `LEAD(col, 1) OVER (ORDER BY date)`                      | Compare to next period     |
| **SUM() OVER**   | Running total        | `SUM(col) OVER (ORDER BY date ROWS UNBOUNDED PRECEDING)` | Cumulative sales           |

### Index Types Comparison

| Index Type        | Storage                  | Performance                        | Use Case                            | Limitations           |
| ----------------- | ------------------------ | ---------------------------------- | ----------------------------------- | --------------------- |
| **Clustered**     | Physical order           | Best for range queries             | Primary key, date ranges            | One per table         |
| **Non-Clustered** | Separate structure       | Good for exact matches             | Foreign keys, search columns        | 999 per table         |
| **Composite**     | Multiple columns         | Efficient for multi-column queries | WHERE clauses with AND              | Order matters         |
| **Covering**      | Includes non-key columns | Eliminates key lookups             | Frequently accessed columns         | Increased storage     |
| **Filtered**      | Subset of data           | Smaller, more efficient            | Partial data (e.g., active records) | Limited applicability |
| **Columnstore**   | Columnar storage         | Excellent for analytics            | Data warehousing, aggregations      | Limited DML support   |

### Azure SQL Database Service Tiers

| Tier                  | Compute Model | Max Database Size | Use Case            | Key Features                        |
| --------------------- | ------------- | ----------------- | ------------------- | ----------------------------------- |
| **Basic**             | DTU           | 2 GB              | Development/Testing | Low cost, limited performance       |
| **Standard**          | DTU           | 1 TB              | General workloads   | Balanced performance                |
| **Premium**           | DTU           | 4 TB              | Mission-critical    | High performance, advanced features |
| **General Purpose**   | vCore         | 4 TB              | Most workloads      | Balanced compute/memory             |
| **Business Critical** | vCore         | 4 TB              | Low latency         | In-memory OLTP, read replicas       |
| **Hyperscale**        | vCore         | 100 TB            | Large databases     | Rapid scaling, multiple replicas    |

## 📊 Best Practices Checklist

### ✅ Database Design Best Practices

- [ ] **Normalize to 3NF** minimum to eliminate data redundancy
- [ ] **Use appropriate data types** (INT vs BIGINT, VARCHAR vs NVARCHAR)
- [ ] **Implement proper constraints** (CHECK, FOREIGN KEY, UNIQUE)
- [ ] **Design for scalability** with partitioning strategies
- [ ] **Use surrogate keys** for primary keys when appropriate
- [ ] **Implement audit trails** for sensitive data changes
- [ ] **Plan for data archival** and retention policies
- [ ] **Consider temporal tables** for historical data tracking

### ✅ Query Optimization Checklist

- [ ] **Avoid SELECT \*** - specify only needed columns
- [ ] **Use proper WHERE clauses** with indexed columns
- [ ] **Utilize EXISTS** instead of IN for subqueries when appropriate
- [ ] **Implement proper JOIN order** (smallest tables first)
- [ ] **Use UNION ALL** instead of UNION when duplicates are acceptable
- [ ] **Avoid functions in WHERE clauses** on indexed columns
- [ ] **Use parameterized queries** to prevent SQL injection
- [ ] **Analyze execution plans** regularly for expensive operations

### ✅ Index Strategy Checklist

- [ ] **Create indexes on foreign keys** for JOIN performance
- [ ] **Use composite indexes** for multi-column WHERE clauses
- [ ] **Implement covering indexes** for frequently accessed queries
- [ ] **Monitor index fragmentation** and rebuild when necessary
- [ ] **Remove unused indexes** to improve write performance
- [ ] **Use filtered indexes** for partial data scenarios
- [ ] **Consider columnstore indexes** for analytical workloads
- [ ] **Update statistics regularly** for optimal query plans

### ✅ Azure SQL Database Security Checklist

- [ ] **Enable Azure AD authentication** for centralized identity management
- [ ] **Implement Row-Level Security** for multi-tenant scenarios
- [ ] **Use Dynamic Data Masking** for sensitive data protection
- [ ] **Configure Always Encrypted** for highly sensitive data
- [ ] **Enable auditing** for compliance and monitoring
- [ ] **Set up firewall rules** appropriately
- [ ] **Use Managed Identity** for application connections
- [ ] **Implement Transparent Data Encryption** for data at rest

### ✅ Performance Monitoring Checklist

- [ ] **Enable Query Store** for performance insights
- [ ] **Set up Azure Monitor alerts** for key metrics
- [ ] **Monitor wait statistics** for resource bottlenecks
- [ ] **Track blocking and deadlocks** regularly
- [ ] **Use Intelligent Insights** for automated performance analysis
- [ ] **Review top resource-consuming queries** monthly
- [ ] **Monitor DTU/vCore utilization** and scale accordingly
- [ ] **Implement automatic tuning** recommendations

## 🎯 Common Interview Scenarios & Quick Answers

### Scenario 1: "Find the second highest salary"

```sql
-- Using ROW_NUMBER()
SELECT Salary FROM (
    SELECT Salary, ROW_NUMBER() OVER (ORDER BY Salary DESC) as rn
    FROM Employees
) ranked WHERE rn = 2;

-- Using OFFSET-FETCH
SELECT DISTINCT Salary FROM Employees
ORDER BY Salary DESC
OFFSET 1 ROWS FETCH NEXT 1 ROWS ONLY;
```

### Scenario 2: "Delete duplicate records"

```sql
-- Using ROW_NUMBER()
WITH DuplicateCTE AS (
    SELECT *, ROW_NUMBER() OVER (
        PARTITION BY Email ORDER BY ID
    ) as rn FROM Customers
)
DELETE FROM DuplicateCTE WHERE rn > 1;
```

### Scenario 3: "Find employees with no manager"

```sql
-- Self JOIN approach
SELECT e1.* FROM Employees e1
LEFT JOIN Employees e2 ON e1.ManagerID = e2.EmployeeID
WHERE e2.EmployeeID IS NULL AND e1.ManagerID IS NOT NULL;
```

### Scenario 4: "Calculate running total"

```sql
SELECT OrderDate, Amount,
    SUM(Amount) OVER (ORDER BY OrderDate ROWS UNBOUNDED PRECEDING) as RunningTotal
FROM Orders;
```

### Scenario 5: "Find gaps in sequential numbers"

```sql
WITH NumberSeries AS (
    SELECT OrderID, ROW_NUMBER() OVER (ORDER BY OrderID) as Expected
    FROM Orders
)
SELECT Expected + 1 as MissingNumber
FROM NumberSeries ns1
WHERE NOT EXISTS (
    SELECT 1 FROM NumberSeries ns2
    WHERE ns2.Expected = ns1.Expected + 1
);
```

## 📋 Pre-Interview Quick Review (15 minutes)

### 🔥 Must-Know Concepts (5 mins)

- **ACID Properties**: Atomicity, Consistency, Isolation, Durability
- **Normalization**: 1NF (atomic values), 2NF (no partial deps), 3NF (no transitive deps)
- **JOIN Types**: INNER (matches only), LEFT (all left + matches), FULL OUTER (all records)
- **Index Types**: Clustered (physical order), Non-clustered (logical order)
- **Window Functions**: ROW_NUMBER(), RANK(), LAG(), SUM() OVER()

### ⚡ Quick Query Patterns (5 mins)

```sql
-- Top N records
SELECT TOP 10 * FROM Table ORDER BY Column DESC;

-- Pagination
SELECT * FROM Table ORDER BY ID OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;

-- Conditional aggregation
SELECT SUM(CASE WHEN Status = 'Active' THEN Amount ELSE 0 END) FROM Orders;

-- Ranking within groups
SELECT *, RANK() OVER (PARTITION BY Category ORDER BY Price DESC) FROM Products;

-- Date calculations
SELECT DATEADD(MONTH, -1, GETDATE()) as LastMonth,
       DATEDIFF(DAY, StartDate, EndDate) as DaysDifference;
```

### 🚨 Common Pitfalls to Avoid (5 mins)

- **SELECT \*** in production queries
- **Missing WHERE clause** in UPDATE/DELETE
- **Not handling NULL values** in comparisons
- **Inefficient subqueries** instead of JOINs
- **Missing transaction handling** in stored procedures
- **Ignoring execution plans** for performance issues
- **Hardcoded values** instead of parameters
- **Not considering concurrency** in multi-user environments

## 🏆 Azure SQL Database Specific Features

### Key Differentiators for Interviews

- **Elastic Pools**: Share resources across multiple databases
- **Geo-Replication**: Active geo-replication for disaster recovery
- **Automatic Tuning**: AI-powered performance optimization
- **Query Store**: Built-in query performance monitoring
- **Intelligent Insights**: Automated performance diagnostics
- **Serverless Compute**: Pay-per-use compute tier
- **Hyperscale**: Support for databases up to 100TB
- **Advanced Threat Protection**: Built-in security monitoring

### T-SQL Extensions & Features

- **JSON Support**: JSON_VALUE(), JSON_QUERY(), FOR JSON PATH
- **Temporal Tables**: System-versioned tables for historical data
- **Row-Level Security**: Automatic row filtering based on user context
- **Dynamic Data Masking**: Real-time data obfuscation
- **Always Encrypted**: Client-side encryption for sensitive data
- **In-Memory OLTP**: Memory-optimized tables and procedures
- **Columnstore Indexes**: Optimized for analytical workloads
- **Graph Database**: NODE and EDGE tables for relationship data

## 💡 Final Interview Tips

### 🎯 What Interviewers Look For

1. **Problem-solving approach**: How you break down complex queries
2. **Performance awareness**: Understanding of indexes and execution plans
3. **Best practices knowledge**: Proper coding standards and conventions
4. **Azure-specific expertise**: Cloud-native features and capabilities
5. **Real-world experience**: Practical scenarios and troubleshooting skills

### 🗣️ Communication Strategy

- **Think out loud**: Explain your reasoning process
- **Ask clarifying questions**: Understand requirements before coding
- **Start simple**: Build complex queries step by step
- **Explain trade-offs**: Discuss performance implications
- **Mention alternatives**: Show breadth of knowledge

### ⏰ Time Management

- **Listen carefully** (2 minutes): Understand the problem
- **Plan approach** (3 minutes): Outline solution strategy
- **Write code** (10-15 minutes): Implement solution
- **Test & optimize** (5 minutes): Review and improve
- **Discuss alternatives** (2-3 minutes): Show additional knowledge

---

**🎉 You're Ready!** This comprehensive guide covers everything you need to ace your SQL interview for an Azure Cloud FullStack Developer role. Review the TL;DR section before your interview, practice the code samples, and remember to demonstrate both technical expertise and problem-solving skills.

**Good luck! 🚀**
