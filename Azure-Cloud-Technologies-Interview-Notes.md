# 🌩️ Azure Cloud Technologies Interview Preparation: Azure Cloud FullStack Developer

**Last Updated:** November 19, 2025  
**Target Role:** Azure Cloud FullStack Developer  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 40-50 hours

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Core Concepts](#core-concepts)
3. [Q&A Section](#qa-section)
4. [Code Samples](#code-samples)
5. [TL;DR Summary](#tldr-summary)

---

# Introduction

## Overview of Microsoft Azure

Microsoft Azure is a comprehensive cloud computing platform offering over 200 products and services for building, deploying, and managing applications through Microsoft-managed data centers globally. As an Azure Cloud FullStack Developer, understanding Azure's breadth of services is crucial for:

- **Modern Application Development**: Building scalable web applications, APIs, and microservices
- **Serverless Architecture**: Implementing event-driven, scalable solutions with Azure Functions
- **Container Orchestration**: Deploying and managing containerized applications with AKS
- **Data Management**: Leveraging various database and storage services for different use cases
- **DevOps Integration**: Implementing CI/CD pipelines with Azure DevOps and GitHub Actions
- **Cloud-Native Solutions**: Utilizing Platform-as-a-Service (PaaS) offerings for rapid development
- **Enterprise Integration**: Connecting on-premises and cloud resources in hybrid scenarios

## Importance for FullStack Developers

Azure proficiency enables FullStack developers to:

1. **Build End-to-End Solutions**: From frontend (Azure CDN, Storage Static Websites) to backend (App Service, Functions) to data (SQL, Cosmos DB)
2. **Implement Modern Architectures**: Microservices, serverless, event-driven patterns
3. **Ensure Security**: Azure AD, Key Vault, Managed Identities, RBAC
4. **Optimize Costs**: Right-sizing resources, reserved instances, auto-scaling
5. **Scale Applications**: Load balancers, auto-scaling, global distribution
6. **Monitor & Debug**: Application Insights, Log Analytics, diagnostics
7. **Automate Operations**: Infrastructure as Code, CI/CD pipelines

## Key Areas to Focus for Interviews

### 1. **Cloud Fundamentals**
- Cloud service models (IaaS, PaaS, SaaS)
- Cloud deployment models (Public, Private, Hybrid)
- Azure global infrastructure (regions, availability zones)
- Azure account hierarchy (subscriptions, resource groups, resources)

### 2. **Compute Services**
- Azure App Service (Web Apps, API Apps)
- Azure Functions (serverless computing)
- Azure Kubernetes Service (AKS)
- Azure Container Instances
- Virtual Machines and Scale Sets

### 3. **Storage Solutions**
- Azure Blob Storage (unstructured data)
- Azure Queue Storage (messaging)
- Azure Table Storage (NoSQL)
- Azure File Storage (file shares)
- Azure Disk Storage (VM disks)

### 4. **Database Services**
- Azure SQL Database (relational)
- Azure Cosmos DB (multi-model NoSQL)
- Azure Database for PostgreSQL/MySQL
- Azure Synapse Analytics (data warehousing)

### 5. **Networking**
- Virtual Networks (VNet)
- Network Security Groups (NSG)
- Load Balancer & Application Gateway
- Azure Front Door & Traffic Manager
- VNet Peering and VPN Gateway

### 6. **Identity & Security**
- Azure Active Directory (Azure AD)
- Managed Identities
- Azure Key Vault
- Role-Based Access Control (RBAC)
- Azure Security Center

### 7. **Integration Services**
- Azure API Management
- Azure Service Bus
- Azure Event Grid
- Azure Event Hubs
- Azure Logic Apps

### 8. **DevOps & Monitoring**
- Azure DevOps (Pipelines, Repos, Boards)
- GitHub Actions for Azure
- Application Insights
- Azure Monitor & Log Analytics
- Infrastructure as Code (ARM, Bicep, Terraform)

---

# Core Concepts

## 1. Azure Fundamentals

### Cloud Service Models

#### **IaaS (Infrastructure as a Service)**
- Provides virtualized computing resources
- Examples: Virtual Machines, Virtual Networks, Storage
- **Use Case**: Lift-and-shift migrations, full control over infrastructure
- **Responsibility**: Customer manages OS, middleware, runtime, data, applications

#### **PaaS (Platform as a Service)**
- Provides platform for application development
- Examples: App Service, SQL Database, Azure Functions
- **Use Case**: Focus on application development, not infrastructure management
- **Responsibility**: Microsoft manages infrastructure, OS, runtime; customer manages applications and data

#### **SaaS (Software as a Service)**
- Provides ready-to-use software applications
- Examples: Microsoft 365, Dynamics 365
- **Use Case**: End-user applications
- **Responsibility**: Microsoft manages everything; customer uses the application

### Azure Account Structure

```
Management Group (Optional)
  └── Subscription(s)
        └── Resource Group(s)
              └── Resource(s)
```

- **Management Group**: Organize multiple subscriptions
- **Subscription**: Billing boundary, contains resource groups
- **Resource Group**: Logical container for resources
- **Resource**: Individual Azure service instance

### Azure Regions and Availability Zones

- **Region**: Geographic area with one or more data centers (60+ regions worldwide)
- **Availability Zone**: Physically separate locations within a region (minimum 3 zones in enabled regions)
- **Region Pairs**: Two regions paired for disaster recovery (500+ miles apart)

**Benefits:**
- High availability (99.99% SLA with availability zones)
- Disaster recovery (geo-redundancy)
- Compliance (data residency requirements)

---

## 2. Compute Services

### Azure App Service

Platform-as-a-Service for hosting web applications, REST APIs, and mobile backends.

**Key Features:**
- Multiple language support (.NET, Java, Node.js, Python, PHP)
- Built-in auto-scaling
- Deployment slots (staging, production)
- Easy CI/CD integration
- Built-in authentication and authorization
- Custom domains and SSL certificates

**Pricing Tiers:**
- **Free/Shared**: Development and testing
- **Basic**: Low traffic apps, no auto-scale
- **Standard**: Production workloads, auto-scale, deployment slots
- **Premium**: Enhanced performance, VNet integration
- **Isolated**: Dedicated environment, maximum scale

**When to Use:**
- Web applications and APIs
- Containerized web apps
- Need built-in DevOps capabilities
- Require minimal infrastructure management

### Azure Functions

Serverless compute service for event-driven execution.

**Key Features:**
- Pay only for execution time
- Automatic scaling
- Multiple trigger types (HTTP, Timer, Queue, Event Grid, etc.)
- Supports multiple languages (C#, JavaScript, Python, Java, PowerShell)
- Durable Functions for stateful workflows

**Hosting Plans:**
- **Consumption Plan**: Pay-per-execution, auto-scale
- **Premium Plan**: Pre-warmed instances, VNet connectivity
- **Dedicated (App Service) Plan**: Run on existing App Service plan

**When to Use:**
- Event-driven processing
- Scheduled tasks
- Microservices with independent scaling
- Cost-sensitive scenarios (pay only for execution)

### Azure Kubernetes Service (AKS)

Managed Kubernetes container orchestration service.

**Key Features:**
- Managed control plane (free)
- Integrated with Azure services (ACR, Monitor, AAD)
- Auto-scaling (Horizontal Pod Autoscaler, Cluster Autoscaler)
- Azure Dev Spaces for development
- Support for Windows and Linux containers

**When to Use:**
- Complex microservices architectures
- Need container orchestration
- Multi-cloud or hybrid scenarios
- Advanced deployment strategies (blue-green, canary)

### Azure Container Instances (ACI)

Serverless container execution without orchestration.

**Key Features:**
- Fast startup (seconds)
- Per-second billing
- Custom CPU and memory
- Persistent storage with Azure Files
- Container groups (multiple containers, shared resources)

**When to Use:**
- Simple container workloads
- Batch processing
- CI/CD build agents
- Don't need full Kubernetes features

### Comparison: App Service vs Functions vs AKS vs ACI

| Feature | App Service | Azure Functions | AKS | ACI |
|---------|-------------|-----------------|-----|-----|
| **Abstraction Level** | PaaS | Serverless | Container Orchestration | Serverless Containers |
| **Scaling** | Manual/Auto | Automatic | Manual/Auto | Manual |
| **Pricing** | Per instance | Per execution | Per node | Per second |
| **Best For** | Web apps, APIs | Event-driven | Complex microservices | Simple containers |
| **Management** | Low | Very Low | Medium | Low |
| **Cold Start** | No | Yes (Consumption) | No | No |

---

## 3. Storage Services

### Azure Blob Storage

Object storage for unstructured data (documents, images, videos, backups).

**Storage Tiers:**
- **Hot**: Frequently accessed data
- **Cool**: Infrequently accessed (stored 30+ days)
- **Archive**: Rarely accessed (stored 180+ days, retrieval latency in hours)

**Blob Types:**
- **Block Blobs**: Text and binary data (up to 190.7 TiB)
- **Append Blobs**: Optimized for append operations (logs)
- **Page Blobs**: Random access (VM disks, up to 8 TiB)

**When to Use:**
- Document storage
- Streaming media
- Backup and disaster recovery
- Data lake storage
- Static website hosting

### Azure Queue Storage

Message queue for asynchronous communication between components.

**Key Features:**
- Store millions of messages (up to 64 KB each)
- Accessible via HTTP/HTTPS
- At-least-once delivery
- Time-to-live for messages
- Visibility timeout for processing

**When to Use:**
- Decoupling application components
- Work distribution across workers
- Building resilient applications
- Simple messaging needs

### Azure Table Storage

NoSQL key-value store for semi-structured data.

**Key Features:**
- Schema-less design
- Partition key + Row key for access
- Fast lookups
- Cost-effective for large datasets
- OData protocol support

**When to Use:**
- Storing structured, non-relational data
- Applications requiring flexible data schema
- Web applications needing large datasets
- Cost-sensitive NoSQL scenarios

### Azure File Storage

Fully managed file shares using SMB and NFS protocols.

**Key Features:**
- Cloud or on-premises access
- SMB 3.0 and NFS 4.1 support
- Shared access across VMs
- Snapshot support
- Integration with Azure File Sync

**When to Use:**
- Lift-and-shift applications using file shares
- Shared application settings/configuration
- Development tools and debugging
- Replace on-premises file servers

---

## 4. Database Services

### Azure SQL Database

Fully managed relational database service based on SQL Server.

**Deployment Options:**
- **Single Database**: Isolated database with dedicated resources
- **Elastic Pool**: Share resources across multiple databases
- **Managed Instance**: Near 100% compatibility with on-premises SQL Server

**Purchasing Models:**
- **DTU (Database Transaction Unit)**: Bundled measure of compute, storage, I/O
- **vCore**: Choose compute, memory, and storage independently

**Key Features:**
- Automatic backups and point-in-time restore
- Built-in high availability (99.99% SLA)
- Auto-tuning and performance recommendations
- Advanced threat protection
- Geo-replication for disaster recovery

**When to Use:**
- Relational data with ACID transactions
- Existing SQL Server applications
- Need for complex queries and joins
- Business intelligence and reporting

### Azure Cosmos DB

Globally distributed, multi-model NoSQL database.

**API Support:**
- Core (SQL) API
- MongoDB API
- Cassandra API
- Gremlin (graph) API
- Table API

**Key Features:**
- Turnkey global distribution (multi-region writes)
- Single-digit millisecond latency (99th percentile)
- Five consistency levels (strong, bounded staleness, session, consistent prefix, eventual)
- Automatic and instant scaling
- Comprehensive SLAs (99.999% read availability)

**Consistency Levels:**
1. **Strong**: Linearizability guarantee
2. **Bounded Staleness**: Reads lag by bounded time or operations
3. **Session**: Consistent within a client session
4. **Consistent Prefix**: Reads never see out-of-order writes
5. **Eventual**: Weakest consistency, highest availability

**When to Use:**
- Global-scale applications
- Low-latency requirements
- Multiple data models
- IoT and real-time analytics
- Gaming leaderboards and user profiles

### Azure Database for PostgreSQL/MySQL

Fully managed PostgreSQL and MySQL databases.

**Deployment Options:**
- **Single Server**: Simple provisioning and management
- **Flexible Server**: More control over database management
- **Hyperscale (PostgreSQL only)**: Horizontal scaling for large datasets

**When to Use:**
- Open-source database preference
- Existing PostgreSQL/MySQL applications
- Need for specific PostgreSQL/MySQL features
- Cost-effective relational database

---

## 5. Networking

### Virtual Network (VNet)

Fundamental building block for private networks in Azure.

**Key Concepts:**
- **Address Space**: CIDR notation (e.g., 10.0.0.0/16)
- **Subnets**: Segment VNet into smaller networks
- **DNS**: Azure-provided or custom DNS servers
- **Service Endpoints**: Secure access to Azure services
- **Private Endpoints**: Private IP access to Azure services

**When to Use:**
- Isolate and secure Azure resources
- Connect Azure resources to each other
- Connect to on-premises networks
- Filter network traffic

### Network Security Groups (NSG)

Contains security rules to allow or deny network traffic.

**Rule Components:**
- **Priority**: 100-4096 (lower number = higher priority)
- **Source/Destination**: IP address, CIDR, service tag, application security group
- **Protocol**: TCP, UDP, ICMP, Any
- **Port Range**: Single port or range
- **Action**: Allow or Deny

**Default Rules:**
- Allow VNet inbound/outbound
- Allow Azure Load Balancer inbound
- Deny all other inbound
- Allow outbound to internet

**When to Use:**
- Control traffic to/from subnets
- Control traffic to/from VMs
- Implement defense in depth

### Azure Load Balancer

Layer 4 (TCP/UDP) load balancer for high availability.

**SKUs:**
- **Basic**: Free, limited features
- **Standard**: Production workloads, availability zones, more backends

**Key Features:**
- Public and internal load balancers
- Port forwarding
- Health probes
- Outbound rules
- High availability (99.99% SLA for Standard)

**When to Use:**
- Distribute traffic across VMs
- High availability for applications
- Port forwarding scenarios
- Need Layer 4 load balancing

### Azure Application Gateway

Layer 7 (HTTP/HTTPS) load balancer with web application firewall.

**Key Features:**
- URL-based routing
- SSL/TLS termination
- Web Application Firewall (WAF)
- Session affinity
- Autoscaling
- Multi-site hosting

**When to Use:**
- Web application load balancing
- Need URL-based routing
- Require WAF capabilities
- SSL offloading
- Cookie-based session affinity

### Azure Traffic Manager

DNS-based traffic load balancer for global routing.

**Routing Methods:**
- **Priority**: Primary and backup configuration
- **Weighted**: Distribute traffic by weights
- **Performance**: Route to closest endpoint
- **Geographic**: Route based on user location
- **MultiValue**: Return multiple healthy endpoints
- **Subnet**: Route based on source IP subnet

**When to Use:**
- Global load balancing
- Disaster recovery
- A/B testing across regions
- Hybrid cloud scenarios

### Azure Front Door

Global, scalable entry point using Microsoft's global edge network.

**Key Features:**
- Anycast protocol for routing
- SSL/TLS offloading
- URL-based routing
- Web Application Firewall
- Caching at edge
- Custom domains

**When to Use:**
- Global web applications
- Need edge caching
- Require advanced routing
- DDoS protection
- Low latency globally

---

## 6. Azure Active Directory

Enterprise identity platform for authentication and authorization.

### Key Concepts

**Tenants**: Instance of Azure AD representing an organization

**Users and Groups**:
- Users: Individual identities
- Groups: Collection of users for access management
- Security Groups: Access management
- Microsoft 365 Groups: Collaboration

**Applications**:
- App Registrations: Custom applications
- Enterprise Applications: Pre-integrated apps

**Service Principals**: Identity for applications/services

### Authentication Methods

1. **Password**: Basic authentication
2. **Multi-Factor Authentication (MFA)**: Additional verification
3. **Conditional Access**: Context-based access policies
4. **Passwordless**: FIDO2, Microsoft Authenticator, Windows Hello

### Authorization with RBAC

**Built-in Roles:**
- Owner: Full access including RBAC
- Contributor: Full access except RBAC
- Reader: Read-only access
- Custom Roles: Tailored permissions

**Scope Levels:**
- Management Group
- Subscription
- Resource Group
- Resource

### Managed Identities

Eliminate need for credentials in code.

**Types:**
- **System-Assigned**: Tied to resource lifecycle
- **User-Assigned**: Standalone resource, shared across resources

**When to Use:**
- Access Azure Key Vault
- Connect to Azure SQL
- Access Storage Accounts
- Call Azure APIs

### Azure AD B2C (Business to Consumer)

Customer identity and access management.

**Features:**
- Social identity providers (Google, Facebook, etc.)
- Custom policies
- User self-service
- MFA support
- Branded experience

### Azure AD B2B (Business to Business)

Collaboration with external users.

**Features:**
- Guest user access
- No additional Azure AD required for guests
- Conditional access for B2B users
- Cross-tenant access

---

## 7. Azure API Management

Full lifecycle API management platform.

### Key Components

**API Gateway**:
- Request routing
- Policy enforcement
- Response transformation
- Caching
- Authentication

**Management Plane**:
- API design and definition
- Policy configuration
- Analytics
- User management

**Developer Portal**:
- API documentation
- Try-it console
- API key management
- Self-service subscription

### Policies

Applied at different scopes: Global, Product, API, Operation

**Policy Sections:**
```xml
<policies>
    <inbound>
        <!-- Applied on request -->
    </inbound>
    <backend>
        <!-- Before calling backend -->
    </backend>
    <outbound>
        <!-- Applied on response -->
    </outbound>
    <on-error>
        <!-- Error handling -->
    </on-error>
</policies>
```

**Common Policies:**
- Rate limiting and quotas
- CORS enablement
- JWT validation
- Request/response transformation
- Caching
- Mock responses

### When to Use API Management

- Exposing internal APIs externally
- API monetization
- API versioning and lifecycle management
- Security and throttling
- Developer portal for API consumers
- Analytics and monitoring

---

## 8. Messaging Services

### Azure Service Bus

Enterprise message broker with queues and topics.

**Queues (Point-to-Point)**:
- FIFO messaging
- Single consumer
- At-least-once delivery
- Message sessions for ordering

**Topics/Subscriptions (Publish-Subscribe)**:
- Multiple subscribers
- Message filtering
- Broadcast scenarios

**Key Features:**
- Dead-letter queues
- Scheduled messages
- Message deferral
- Duplicate detection
- Transactions
- Auto-forwarding

**When to Use:**
- Enterprise messaging requirements
- Need for transactions
- Message ordering important
- Complex routing scenarios

### Azure Event Grid

Event routing service for reactive programming.

**Key Concepts:**
- **Events**: What happened
- **Event Sources**: Where event originated (Storage, Resource Group, etc.)
- **Topics**: Endpoints for events
- **Event Subscriptions**: Route events to handlers
- **Event Handlers**: Process events (Functions, Logic Apps, Webhooks, etc.)

**Features:**
- Built-in events from Azure services
- Custom topics for application events
- Event filtering
- Automatic retry
- Dead-letter support
- High throughput (10M events/sec)

**When to Use:**
- React to state changes
- Serverless architectures
- Event-driven applications
- IoT event processing

### Azure Event Hubs

Big data streaming platform and event ingestion service.

**Key Features:**
- Millions of events per second
- Capture events to Blob/Data Lake
- Kafka protocol support
- Partition-based streaming
- Consumer groups
- Auto-inflate (auto-scale)

**Use Cases:**
- Telemetry and data streaming
- Log aggregation
- Real-time analytics
- IoT device data ingestion

**When to Use:**
- High-volume event streaming
- Real-time processing
- Time-series data
- Integration with Apache Kafka

### Storage Queues vs Service Bus vs Event Grid vs Event Hubs

| Feature | Storage Queue | Service Bus | Event Grid | Event Hubs |
|---------|---------------|-------------|------------|------------|
| **Purpose** | Simple queuing | Enterprise messaging | Event routing | Big data streaming |
| **Max Message Size** | 64 KB | 256 KB (1 MB Premium) | 1 MB | 1 MB |
| **Throughput** | Medium | High | Very High | Very High |
| **Ordering** | Best effort | Yes (sessions) | No | Yes (partition) |
| **Duplicate Detection** | No | Yes | No | No |
| **Pricing** | Very Low | Medium | Per event | Per throughput unit |
| **Best For** | Simple scenarios | Enterprise apps | Event-driven | Streaming data |

---

## 9. Monitoring and Application Insights

### Azure Monitor

Comprehensive solution for collecting, analyzing, and acting on telemetry.

**Components:**
- **Metrics**: Numerical time-series data
- **Logs**: Text-based records in Log Analytics
- **Alerts**: Notifications based on conditions
- **Dashboards**: Visual representation
- **Workbooks**: Interactive reports

### Application Insights

Application Performance Management (APM) service.

**Features:**
- **Request tracking**: Monitor incoming requests
- **Dependency tracking**: External calls (SQL, HTTP, etc.)
- **Exceptions**: Automatic exception capture
- **Page views**: Frontend telemetry
- **Custom events**: Application-specific tracking
- **Live metrics**: Real-time monitoring
- **Availability tests**: Synthetic monitoring

**Telemetry Types:**
```csharp
// Requests
telemetry.TrackRequest(name, startTime, duration, responseCode, success);

// Dependencies
telemetry.TrackDependency(type, target, name, data, startTime, duration, success);

// Events
telemetry.TrackEvent("UserLogin", properties);

// Metrics
telemetry.TrackMetric("QueueLength", queueLength);

// Exceptions
telemetry.TrackException(exception);

// Traces
telemetry.TrackTrace("Debug message", SeverityLevel.Information);
```

### Log Analytics

Query and analyze log data using Kusto Query Language (KQL).

**Common Queries:**
```kql
// Errors in last 24 hours
traces
| where timestamp > ago(24h)
| where severityLevel >= 3
| summarize count() by cloud_RoleName

// Slow requests
requests
| where duration > 1000
| order by duration desc
| take 10

// Dependency failures
dependencies
| where success == false
| summarize count() by name
```

### Azure Alerts

Proactive notifications based on metrics and logs.

**Alert Types:**
- **Metric Alerts**: Based on metric thresholds
- **Log Alerts**: Based on log query results
- **Activity Log Alerts**: Based on Azure resource operations

**Action Groups:**
- Email/SMS/Voice
- Azure Function
- Logic App
- Webhook
- ITSM connector
- Automation Runbook

---

## 10. Azure DevOps and CI/CD

### Azure DevOps Services

**Azure Repos**: Git repositories for source control

**Azure Pipelines**: CI/CD platform
- YAML-based pipelines
- Classic pipelines (UI-based)
- Multi-stage pipelines
- Deployment gates and approvals
- Support for multiple platforms

**Azure Boards**: Agile planning tools
- Work items
- Backlogs
- Sprints
- Kanban boards

**Azure Artifacts**: Package management
- NuGet
- npm
- Maven
- Python
- Universal packages

**Azure Test Plans**: Manual and exploratory testing

### Sample Azure Pipeline (YAML)

```yaml
trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  buildConfiguration: 'Release'
  azureSubscription: 'Azure-Connection'

stages:
- stage: Build
  jobs:
  - job: BuildJob
    steps:
    - task: UseDotNet@2
      inputs:
        version: '6.x'
    
    - task: DotNetCoreCLI@2
      displayName: 'Restore packages'
      inputs:
        command: 'restore'
        projects: '**/*.csproj'
    
    - task: DotNetCoreCLI@2
      displayName: 'Build'
      inputs:
        command: 'build'
        arguments: '--configuration $(buildConfiguration)'
    
    - task: DotNetCoreCLI@2
      displayName: 'Run tests'
      inputs:
        command: 'test'
        arguments: '--configuration $(buildConfiguration) --collect:"XPlat Code Coverage"'
    
    - task: DotNetCoreCLI@2
      displayName: 'Publish'
      inputs:
        command: 'publish'
        publishWebProjects: true
        arguments: '--configuration $(buildConfiguration) --output $(Build.ArtifactStagingDirectory)'
    
    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: '$(Build.ArtifactStagingDirectory)'
        artifactName: 'drop'

- stage: Deploy
  dependsOn: Build
  condition: succeeded()
  jobs:
  - deployment: DeployWeb
    environment: 'Production'
    strategy:
      runOnce:
        deploy:
          steps:
          - task: AzureWebApp@1
            inputs:
              azureSubscription: '$(azureSubscription)'
              appType: 'webApp'
              appName: 'my-web-app'
              package: '$(Pipeline.Workspace)/drop/**/*.zip'
```

### GitHub Actions for Azure

```yaml
name: Deploy to Azure

on:
  push:
    branches: [ main ]
  workflow_dispatch:

env:
  AZURE_WEBAPP_NAME: my-app
  DOTNET_VERSION: '6.0.x'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup .NET
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: ${{ env.DOTNET_VERSION }}
    
    - name: Restore dependencies
      run: dotnet restore
    
    - name: Build
      run: dotnet build --configuration Release --no-restore
    
    - name: Test
      run: dotnet test --no-build --verbosity normal
    
    - name: Publish
      run: dotnet publish -c Release -o ./publish
    
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ./publish
```

---

## 11. Infrastructure as Code

### ARM Templates (Azure Resource Manager)

JSON-based templates for declarative infrastructure.

**Template Structure:**
```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {},
  "variables": {},
  "resources": [],
  "outputs": {}
}
```

**When to Use:**
- Native Azure IaC
- Complex nested deployments
- Need for linked templates
- Azure-only infrastructure

### Bicep

Domain-specific language (DSL) for deploying Azure resources.

**Example:**
```bicep
param location string = resourceGroup().location
param appServicePlanName string
param webAppName string

resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'S1'
    capacity: 1
  }
  kind: 'linux'
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|6.0'
    }
  }
}

output webAppUrl string = webApp.properties.defaultHostName
```

**Advantages:**
- Simpler syntax than ARM templates
- Better IDE support
- Transpiles to ARM templates
- Type safety

### Terraform for Azure

Multi-cloud IaC tool supporting Azure.

**Example:**
```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "example" {
  name     = "example-resources"
  location = "East US"
}

resource "azurerm_app_service_plan" "example" {
  name                = "example-appserviceplan"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_app_service" "example" {
  name                = "example-app-service"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
  app_service_plan_id = azurerm_app_service_plan.example.id

  site_config {
    dotnet_framework_version = "v6.0"
  }
}
```

**When to Use Terraform:**
- Multi-cloud infrastructure
- Existing Terraform knowledge
- Large open-source module ecosystem
- State management features

---

## 12. Security and Compliance

### Azure Key Vault

Secure storage for secrets, keys, and certificates.

**Types of Secrets:**
- **Secrets**: Connection strings, passwords, API keys
- **Keys**: Cryptographic keys for encryption
- **Certificates**: SSL/TLS certificates

**Access Methods:**
- Azure portal
- Azure CLI/PowerShell
- SDKs (C#, Python, Java, etc.)
- REST API

**Best Practices:**
- Use Managed Identities for access
- Enable soft-delete and purge protection
- Use separate Key Vaults per environment
- Implement RBAC with least privilege
- Enable logging and monitoring

### Role-Based Access Control (RBAC)

**Principle of Least Privilege**: Grant minimum permissions needed

**Assignment Components:**
- **Security Principal**: Who (user, group, service principal, managed identity)
- **Role Definition**: What (set of permissions)
- **Scope**: Where (management group, subscription, resource group, resource)

**Custom Roles:**
```json
{
  "Name": "Custom App Deployer",
  "Description": "Can deploy web apps but not delete",
  "Actions": [
    "Microsoft.Web/sites/read",
    "Microsoft.Web/sites/write",
    "Microsoft.Web/sites/restart/action"
  ],
  "NotActions": [
    "Microsoft.Web/sites/delete"
  ],
  "AssignableScopes": [
    "/subscriptions/{subscription-id}/resourceGroups/{resource-group}"
  ]
}
```

### Azure Security Center / Microsoft Defender for Cloud

Unified security management and advanced threat protection.

**Features:**
- Security posture management
- Threat protection
- Regulatory compliance dashboard
- Security recommendations
- Just-in-time VM access
- Adaptive application controls

### Azure Policy

Governance tool for enforcing organizational standards.

**Policy Effects:**
- **Deny**: Prevent resource creation/update
- **Audit**: Log non-compliant resources
- **Append**: Add properties to resources
- **AuditIfNotExists**: Audit if related resource doesn't exist
- **DeployIfNotExists**: Auto-deploy related resources
- **Disabled**: Turn off policy

**Example Policy:**
```json
{
  "policyRule": {
    "if": {
      "allOf": [
        {
          "field": "type",
          "equals": "Microsoft.Storage/storageAccounts"
        },
        {
          "field": "Microsoft.Storage/storageAccounts/supportsHttpsTrafficOnly",
          "notEquals": "true"
        }
      ]
    },
    "then": {
      "effect": "deny"
    }
  }
}
```

---

## 13. Cost Management and Optimization

### Cost Management Tools

**Azure Cost Management + Billing:**
- Cost analysis
- Budgets and alerts
- Cost allocation by tags
- Recommendations
- Exports for external analysis

**Azure Advisor:**
- Cost recommendations
- Performance recommendations
- Security recommendations
- Reliability recommendations
- Operational excellence recommendations

### Cost Optimization Strategies

1. **Right-Sizing Resources**
   - Monitor resource utilization
   - Downsize over-provisioned resources
   - Use Azure Advisor recommendations

2. **Reserved Instances**
   - 1-year or 3-year commitment
   - Up to 72% savings vs pay-as-you-go
   - Available for VMs, SQL Database, Cosmos DB, etc.

3. **Azure Hybrid Benefit**
   - Use existing Windows Server/SQL Server licenses
   - Up to 85% cost savings
   - Applies to VMs, AKS, SQL Database

4. **Auto-Scaling**
   - Scale in during low usage
   - Scale out during peak usage
   - Minimize idle resources

5. **Storage Optimization**
   - Use appropriate storage tier (Hot, Cool, Archive)
   - Lifecycle management policies
   - Delete unused snapshots and disks

6. **Spot VMs**
   - Utilize spare Azure capacity
   - Up to 90% discount
   - Suitable for interruptible workloads

7. **Azure Dev/Test Pricing**
   - Special pricing for dev/test environments
   - Lower rates for VMs
   - Free Azure DevOps

### Tagging Strategy

```powershell
# Tag resources for cost allocation
New-AzTag -ResourceId $resourceId -Tag @{
    Environment="Production"
    CostCenter="Engineering"
    Project="WebApp"
    Owner="john@company.com"
}
```

---

## 14. High Availability and Disaster Recovery

### High Availability Strategies

**Availability Zones:**
- Deploy across multiple zones in a region
- 99.99% SLA
- Protection against datacenter failures

**Availability Sets:**
- Logical grouping of VMs
- Update domains and fault domains
- 99.95% SLA
- Protection against planned/unplanned maintenance

**Load Balancing:**
- Distribute traffic across healthy instances
- Automatic failover
- Health probes

**Auto-Scaling:**
- Maintain availability during traffic spikes
- Scale based on metrics or schedule

### Disaster Recovery Strategies

**RTO (Recovery Time Objective):** Maximum acceptable downtime

**RPO (Recovery Point Objective):** Maximum acceptable data loss

**Strategies:**

1. **Backup and Restore** (High RTO/RPO)
   - Azure Backup service
   - Lowest cost
   - Suitable for non-critical applications

2. **Pilot Light** (Medium RTO/RPO)
   - Core services running in DR region
   - Scale up during failover
   - Moderate cost

3. **Warm Standby** (Low RTO/RPO)
   - Scaled-down version running in DR region
   - Quick scale-up during failover
   - Higher cost

4. **Hot Standby / Active-Active** (Lowest RTO/RPO)
   - Full production capacity in multiple regions
   - Traffic Manager for routing
   - Highest cost

### Azure Site Recovery (ASR)

Disaster recovery as a service for VMs and physical servers.

**Features:**
- Replicate VMs to Azure or secondary datacenter
- Orchestrated failover
- Application-consistent snapshots
- Failback capabilities
- Recovery plans with automation

### Geo-Redundancy

**Storage Geo-Redundancy:**
- **LRS**: Locally Redundant Storage (3 copies in single datacenter)
- **ZRS**: Zone Redundant Storage (3 copies across availability zones)
- **GRS**: Geo-Redundant Storage (6 copies, 3 in secondary region)
- **GZRS**: Geo-Zone-Redundant Storage (ZRS + GRS)

**Database Geo-Replication:**
- SQL Database: Active geo-replication, auto-failover groups
- Cosmos DB: Multi-region writes, automatic failover

---

## 15. Scaling Strategies

### Vertical Scaling (Scale Up/Down)

Increase or decrease resource capacity.

**Advantages:**
- Simple implementation
- No application changes
- Works for stateful applications

**Disadvantages:**
- Downtime for some resources
- Upper limits on resource size
- More expensive for large scales

**When to Use:**
- Database scaling
- Legacy applications
- Stateful workloads

### Horizontal Scaling (Scale Out/In)

Add or remove resource instances.

**Advantages:**
- Virtually unlimited scaling
- Better fault tolerance
- Can be more cost-effective

**Disadvantages:**
- Requires application design (stateless)
- More complex management
- Need load balancing

**When to Use:**
- Web applications
- Microservices
- Stateless APIs

### Auto-Scaling

Automatic scaling based on metrics or schedules.

**Metric-Based Scaling:**
```csharp
// App Service auto-scale rule
{
  "metricTrigger": {
    "metricName": "CpuPercentage",
    "metricResourceId": "/subscriptions/.../Microsoft.Web/serverfarms/plan",
    "timeGrain": "PT1M",
    "statistic": "Average",
    "timeWindow": "PT10M",
    "timeAggregation": "Average",
    "operator": "GreaterThan",
    "threshold": 70
  },
  "scaleAction": {
    "direction": "Increase",
    "type": "ChangeCount",
    "value": "1",
    "cooldown": "PT5M"
  }
}
```

**Schedule-Based Scaling:**
- Scale up before known peak times
- Scale down during off-hours
- Weekend vs weekday patterns

**Scaling Limits:**
- Set minimum instance count (avoid cold starts)
- Set maximum instance count (control costs)
- Consider scale-in policies (which instances to remove)

### Azure Services Auto-Scaling Capabilities

| Service | Auto-Scale Support | Scaling Type |
|---------|-------------------|--------------|
| App Service | Yes | Horizontal |
| Azure Functions (Consumption) | Automatic | Horizontal |
| AKS | Yes | Horizontal (HPA, CA) |
| VM Scale Sets | Yes | Horizontal |
| SQL Database | Yes (serverless) | Vertical + Horizontal |
| Cosmos DB | Yes (autoscale) | Vertical |


---

# Q&A Section

## Azure Fundamentals

### Q1: What is Microsoft Azure and what are its key benefits?

**Answer:**

Microsoft Azure is a comprehensive cloud computing platform and infrastructure created by Microsoft for building, deploying, and managing applications and services through Microsoft-managed data centers.

**Key Benefits:**
1. **Scalability**: Scale resources up or down based on demand
2. **Global Reach**: 60+ regions worldwide with 200+ data centers
3. **High Availability**: 99.99% SLA for many services with availability zones
4. **Cost-Effectiveness**: Pay-only-for-what-you-use model, no upfront investment
5. **Security**: Multi-layered security across physical datacenters, infrastructure, and operations
6. **Compliance**: Largest compliance portfolio in the industry (90+ compliance offerings)
7. **Hybrid Capabilities**: Seamless integration between on-premises and cloud
8. **Innovation**: Access to cutting-edge technologies (AI, ML, IoT, etc.)

---

### Q2: Explain the difference between IaaS, PaaS, and SaaS with Azure examples.

**Answer:**

**IaaS (Infrastructure as a Service)**
- **Definition**: Provides virtualized computing resources over the internet
- **Azure Examples**: Virtual Machines, Virtual Networks, Azure Storage
- **Responsibility**: Customer manages OS, middleware, runtime, data, applications
- **Use Case**: Lift-and-shift migrations, testing/development environments
- **Advantages**: Maximum control and flexibility
- **Disadvantages**: More management overhead

**PaaS (Platform as a Service)**
- **Definition**: Provides platform allowing customers to develop, run, and manage applications
- **Azure Examples**: Azure App Service, Azure SQL Database, Azure Functions
- **Responsibility**: Microsoft manages infrastructure, OS, runtime; customer manages applications and data
- **Use Case**: Application development without infrastructure management
- **Advantages**: Faster development, built-in features, auto-scaling
- **Disadvantages**: Less control over infrastructure

**SaaS (Software as a Service)**
- **Definition**: Delivers software applications over the internet on a subscription basis
- **Azure Examples**: Microsoft 365, Dynamics 365, Azure DevOps
- **Responsibility**: Microsoft manages everything; customer uses the application
- **Use Case**: Ready-to-use business applications
- **Advantages**: No installation or maintenance, immediate availability
- **Disadvantages**: Limited customization

**Comparison Example:**
- **IaaS**: Rent a VM and install SQL Server yourself
- **PaaS**: Use Azure SQL Database (managed)
- **SaaS**: Use Dynamics 365 CRM

---

### Q3: What are Azure regions, availability zones, and region pairs?

**Answer:**

**Azure Regions:**
- Geographic areas containing one or more data centers
- 60+ regions worldwide
- Choose regions based on: proximity to users, compliance requirements, feature availability
- Example: East US, West Europe, Southeast Asia

**Availability Zones:**
- Physically separate locations within an Azure region
- Minimum of 3 zones in enabled regions
- Each zone has independent power, cooling, and networking
- Connected through high-speed, private fiber-optic networks
- **SLA**: 99.99% uptime when using 2+ zones
- **Use Case**: Protect applications from datacenter failures

**Region Pairs:**
- Each Azure region is paired with another region within the same geography
- Minimum 300 miles separation between region pairs
- **Purpose**: Disaster recovery and business continuity
- Updates are rolled out sequentially to paired regions
- Data replication options (GRS, GZRS) use region pairs
- Example pairs: East US & West US, North Europe & West Europe

**Implementation:**
```csharp
// Deploy VM across availability zones
var vm = new VirtualMachine
{
    Location = "eastus",
    Zones = new List<string> { "1", "2", "3" } // Deploy to all 3 zones
};
```

---

### Q4: Explain the Azure account hierarchy (Management Groups, Subscriptions, Resource Groups, Resources).

**Answer:**

```
Management Group (Optional)
  └── Subscription(s)
        └── Resource Group(s)
              └── Resource(s)
```

**Management Groups:**
- Container for managing access, policy, and compliance across multiple subscriptions
- Hierarchy depth up to 6 levels
- Apply policies and RBAC at management group level
- **Use Case**: Large enterprises with multiple subscriptions

**Subscriptions:**
- Logical container for resources
- **Billing boundary**: Separate bills generated per subscription
- **Access control boundary**: Different RBAC policies per subscription
- Types: Free, Pay-As-You-Go, Enterprise Agreement, CSP
- **Use Case**: Separate environments (dev, test, prod) or departments

**Resource Groups:**
- Logical container for related resources
- Resources in a group share same lifecycle
- Resources can only exist in one resource group
- Can contain resources from multiple regions
- Apply tags, RBAC, and policies at resource group level
- **Use Case**: Group resources for an application or project

**Resources:**
- Individual Azure services (VMs, databases, storage accounts, etc.)
- Deployed within a resource group
- Have unique resource IDs

**Best Practices:**
- Use management groups for governance at scale
- Separate subscriptions for different environments or business units
- Use resource groups to organize resources by application or lifecycle
- Apply consistent naming conventions and tags

---

## Compute Services

### Q5: When should you use Azure App Service vs Azure Functions vs AKS?

**Answer:**

**Use Azure App Service when:**
- Building web applications or REST APIs
- Need continuous uptime (no cold starts)
- Require built-in CI/CD and staging slots
- Want easy SSL, custom domains, and auto-scaling
- Application doesn't need complex orchestration
- Example: E-commerce website, corporate portal, RESTful API

**Use Azure Functions when:**
- Event-driven, short-running tasks (< 10 minutes)
- Sporadic or unpredictable workload
- Want to pay only for execution time
- Need automatic scaling to zero
- Responding to events (HTTP requests, queue messages, timers)
- Example: Image processing on upload, scheduled cleanup tasks, webhook handlers

**Use Azure Kubernetes Service (AKS) when:**
- Complex microservices architecture
- Need container orchestration
- Require advanced deployment strategies (blue-green, canary)
- Multiple containerized applications with dependencies
- Need portability across cloud providers
- Example: Large-scale e-commerce platform, microservices-based SaaS application

**Decision Matrix:**

| Criteria | App Service | Functions | AKS |
|----------|-------------|-----------|-----|
| **Complexity** | Medium | Low | High |
| **Management** | Low | Very Low | Medium |
| **Cold Start** | No | Yes (Consumption) | No |
| **Cost (Low Traffic)** | Medium | Very Low | High |
| **Best For** | Always-on apps | Event-driven | Complex architectures |
| **Scaling** | Horizontal/Vertical | Automatic | Highly customizable |

**Example Scenario:**
- **Frontend**: App Service (React SPA)
- **API**: App Service (ASP.NET Core API)
- **Background Processing**: Azure Functions (Queue-triggered)
- **Microservices**: AKS (if truly needed)

---

### Q6: What are the different Azure Functions hosting plans and when to use each?

**Answer:**

**1. Consumption Plan (Serverless)**

**Characteristics:**
- Pay only for execution time
- Automatic scaling (scale to zero)
- Timeout: 5 minutes (configurable up to 10 minutes)
- Memory: 1.5 GB
- Cold start possible

**When to Use:**
- Sporadic or unpredictable workload
- Cost is primary concern
- Can tolerate cold starts
- Short-running functions

**Pricing:** Per execution + execution time

**2. Premium Plan**

**Characteristics:**
- Pre-warmed instances (no cold starts)
- VNet connectivity
- Unlimited execution duration
- More CPU and memory options
- Supports larger instances

**When to Use:**
- Need to avoid cold starts
- Long-running functions
- Require VNet integration
- Need more CPU/memory
- Continuous or near-continuous workload

**Pricing:** Per second based on vCPU and memory

**3. Dedicated (App Service) Plan**

**Characteristics:**
- Run on existing App Service plan
- Predictable pricing
- Can run continuously
- Share resources with other App Service apps

**When to Use:**
- Already have under-utilized App Service plan
- Need predictable costs
- Want Functions and Web Apps on same plan
- Require specific VM sizes or features

**Pricing:** Same as App Service plan

**Comparison:**

```csharp
// Example: Choose plan based on requirements

// Consumption - Infrequent image processing
[FunctionName("ProcessImage")]
public async Task Run(
    [BlobTrigger("uploads/{name}")] Stream image)
{
    // Runs only when image uploaded
    await ProcessImageAsync(image);
}

// Premium - API with consistent traffic
[FunctionName("CriticalApi")]
public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequest req)
{
    // No cold start, VNet access
    return new OkObjectResult(await GetDataAsync());
}

// Dedicated - Part of larger app ecosystem
[FunctionName("BackgroundJob")]
public async Task Run(
    [TimerTrigger("0 */5 * * * *")] TimerInfo timer)
{
    // Runs on existing App Service Plan
    await PerformMaintenanceAsync();
}
```

---

## Storage and Database

### Q7: What are the different Azure storage services and their use cases?

**Answer:**

**1. Blob Storage (Object Storage)**

**Use Cases:**
- Document storage (PDFs, images, videos)
- Serving static content (websites, files)
- Streaming video and audio
- Backup and disaster recovery
- Data lakes for analytics

**Tiers:**
- Hot: Frequently accessed data
- Cool: Infrequently accessed (30+ days)
- Archive: Rarely accessed (180+ days)

**Example:**
```csharp
// Upload blob
BlobClient blobClient = containerClient.GetBlobClient("document.pdf");
await blobClient.UploadAsync(fileStream);
```

**2. Queue Storage (Message Queue)**

**Use Cases:**
- Decouple application components
- Asynchronous work distribution
- Build resilient applications
- Processing pipelines

**Characteristics:**
- Message size: Up to 64 KB
- At-least-once delivery
- FIFO (best effort)

**Example:**
```csharp
// Send message
QueueClient queueClient = new QueueClient(connectionString, "orders");
await queueClient.SendMessageAsync("Order #12345");
```

**3. Table Storage (NoSQL Key-Value)**

**Use Cases:**
- Storing structured, non-relational data
- Web applications needing large datasets
- Address books, device information
- Flexible schema requirements

**Characteristics:**
- Schema-less
- Partition key + Row key
- Cost-effective

**Example:**
```csharp
// Insert entity
TableEntity entity = new TableEntity("partition1", "row1")
{
    { "Name", "John" },
    { "Age", 30 }
};
await tableClient.AddEntityAsync(entity);
```

**4. File Storage (SMB File Shares)**

**Use Cases:**
- Lift-and-shift applications
- Shared application settings
- Development and debugging tools
- Replace on-premises file servers

**Characteristics:**
- SMB 3.0 protocol
- Mountable by Windows, Linux, macOS
- Concurrent access

**Example:**
```bash
# Mount Azure File Share on Linux
sudo mount -t cifs //<storage-account>.file.core.windows.net/<share> /mnt/azure   -o username=<storage-account>,password=<key>
```

**5. Disk Storage (VM Disks)**

**Use Cases:**
- Operating system disks for VMs
- Data disks for databases
- High-performance workloads

**Types:**
- Ultra Disk: Sub-millisecond latency
- Premium SSD: Production workloads
- Standard SSD: Dev/test
- Standard HDD: Infrequent access

---

### Q8: Compare Azure SQL Database vs Azure Cosmos DB. When to use each?

**Answer:**

**Azure SQL Database**

**Type:** Relational database (SQL Server-based)

**When to Use:**
- Relational data with complex relationships
- ACID transactions required
- Complex queries and joins
- Existing SQL Server applications
- Business intelligence and reporting
- Strong consistency required

**Advantages:**
- Familiar T-SQL syntax
- ACID compliance
- Excellent tooling support
- Advanced query capabilities
- Built-in intelligence and tuning

**Limitations:**
- Single-region writes (by default)
- Higher latency for global applications
- Vertical scaling for single database

**Example:**
```csharp
// Azure SQL Database query
using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();
var command = new SqlCommand(
    "SELECT * FROM Orders WHERE CustomerId = @id", connection);
command.Parameters.AddWithValue("@id", customerId);
var reader = await command.ExecuteReaderAsync();
```

**Azure Cosmos DB**

**Type:** Multi-model NoSQL database

**When to Use:**
- Global distribution required
- Low latency requirements (single-digit ms)
- Flexible schema
- Massive scale (millions of requests/sec)
- IoT and real-time analytics
- Gaming leaderboards
- Can tolerate eventual consistency

**Advantages:**
- Turnkey global distribution
- Single-digit millisecond latency
- Automatic scaling
- Multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table)
- Five consistency levels
- 99.999% read availability

**Limitations:**
- More expensive than SQL Database
- Complex queries less efficient
- No joins (denormalization required)

**Example:**
```csharp
// Cosmos DB query
var container = cosmosClient.GetContainer("database", "container");
var query = container.GetItemQueryIterator<Order>(
    "SELECT * FROM c WHERE c.customerId = @id",
    new QueryRequestOptions { MaxItemCount = 100 });

while (query.HasMoreResults)
{
    var response = await query.ReadNextAsync();
    foreach (var item in response)
    {
        // Process item
    }
}
```

**Decision Matrix:**

| Requirement | SQL Database | Cosmos DB |
|-------------|--------------|-----------|
| **Global Distribution** | Limited | Excellent |
| **Latency** | Medium | Very Low |
| **Transactions** | Full ACID | ACID within partition |
| **Query Complexity** | Very High | Medium |
| **Schema** | Fixed | Flexible |
| **Scaling** | Vertical + Horizontal | Automatic |
| **Cost (Small Scale)** | Lower | Higher |
| **Consistency** | Strong | 5 levels |

**Real-World Example:**
- **E-commerce**: Use SQL Database for order processing, Cosmos DB for product catalog and user sessions
- **Social Media**: Cosmos DB for user profiles and feeds, SQL Database for analytics

---

## Networking

### Q9: Explain VNet, subnets, and Network Security Groups (NSG).

**Answer:**

**Virtual Network (VNet)**

**Definition:** Fundamental building block for private networks in Azure. Enables Azure resources to securely communicate with each other, the internet, and on-premises networks.

**Key Concepts:**
- Address space: Define IP range (e.g., 10.0.0.0/16)
- Isolated and secure by default
- Can span availability zones
- Free (no charge for VNets)

**Example:**
```bash
# Create VNet using Azure CLI
az network vnet create   --resource-group myResourceGroup   --name myVNet   --address-prefix 10.0.0.0/16   --subnet-name mySubnet   --subnet-prefix 10.0.1.0/24
```

**Subnets**

**Definition:** Segment VNet into smaller networks for organization and security.

**Characteristics:**
- Divide VNet address space
- Can apply NSG and route tables per subnet
- Resources in same VNet can communicate across subnets
- Cannot span VNets

**Common Pattern:**
```
VNet: 10.0.0.0/16
  ├── Frontend Subnet: 10.0.1.0/24 (Web tier)
  ├── Backend Subnet: 10.0.2.0/24 (App tier)
  ├── Database Subnet: 10.0.3.0/24 (Data tier)
  └── Management Subnet: 10.0.4.0/24 (Admin access)
```

**Network Security Groups (NSG)**

**Definition:** Contains security rules to filter network traffic to and from Azure resources in a VNet.

**Components:**
- **Priority**: 100-4096 (lower = higher priority)
- **Source/Destination**: IP, CIDR, Service Tag, ASG
- **Port**: Single or range
- **Protocol**: TCP, UDP, ICMP, Any
- **Action**: Allow or Deny

**Example Rules:**
```json
// Allow HTTPS from internet
{
  "name": "Allow-HTTPS",
  "priority": 100,
  "direction": "Inbound",
  "access": "Allow",
  "protocol": "Tcp",
  "sourceAddressPrefix": "*",
  "sourcePortRange": "*",
  "destinationAddressPrefix": "*",
  "destinationPortRange": "443"
}

// Deny all other inbound
{
  "name": "Deny-All-Inbound",
  "priority": 4096,
  "direction": "Inbound",
  "access": "Deny",
  "protocol": "*",
  "sourceAddressPrefix": "*",
  "sourcePortRange": "*",
  "destinationAddressPrefix": "*",
  "destinationPortRange": "*"
}
```

**Application:**
```csharp
// Create NSG rule with Azure SDK
var rule = new SecurityRuleCreateOrUpdateContent()
{
    Priority = 100,
    Direction = SecurityRuleDirection.Inbound,
    Access = SecurityRuleAccess.Allow,
    Protocol = SecurityRuleProtocol.Tcp,
    SourceAddressPrefix = "*",
    SourcePortRange = "*",
    DestinationAddressPrefix = "*",
    DestinationPortRange = "443"
};
```

**Best Practices:**
1. Use service tags instead of IP addresses when possible
2. Implement defense in depth (NSGs at subnet and NIC levels)
3. Document all custom rules
4. Use Application Security Groups for grouping resources
5. Regularly review and audit NSG rules

---

### Q10: What's the difference between Azure Load Balancer, Application Gateway, Traffic Manager, and Front Door?

**Answer:**

**Azure Load Balancer (Layer 4)**

**Type:** TCP/UDP load balancer

**Characteristics:**
- Regional service
- Layer 4 (transport layer)
- High performance (millions of requests/sec)
- Internal and public load balancers
- Health probes
- Port forwarding

**When to Use:**
- Distribute traffic to VMs in same region
- Load balance non-HTTP traffic
- Need highest performance
- Simple load balancing requirements

**Example:**
```bash
# Create public load balancer
az network lb create   --resource-group myRG   --name myLoadBalancer   --sku Standard   --public-ip-address myPublicIP   --frontend-ip-name myFrontEnd   --backend-pool-name myBackEndPool
```

**Azure Application Gateway (Layer 7)**

**Type:** HTTP/HTTPS load balancer

**Characteristics:**
- Regional service
- Layer 7 (application layer)
- URL-based routing
- SSL/TLS termination
- Web Application Firewall (WAF)
- Session affinity
- Multi-site hosting

**When to Use:**
- Web application load balancing
- Need URL-based routing
- Require WAF capabilities
- SSL offloading
- Cookie-based session affinity

**Example:**
```json
// URL-based routing
{
  "urlPathMaps": [{
    "name": "pathMap",
    "defaultBackendAddressPool": "defaultPool",
    "pathRules": [
      { "paths": ["/api/*"], "backendAddressPool": "apiPool" },
      { "paths": ["/images/*"], "backendAddressPool": "imagePool" }
    ]
  }]
}
```

**Azure Traffic Manager (DNS-based)**

**Type:** DNS-based global load balancer

**Characteristics:**
- Global service
- DNS-level routing
- Multiple routing methods (Priority, Performance, Geographic, Weighted)
- Endpoint monitoring
- Works with any internet-facing service

**When to Use:**
- Global load balancing
- Disaster recovery across regions
- Route based on user location
- A/B testing across regions

**Example:**
```bash
# Create Traffic Manager profile
az network traffic-manager profile create   --resource-group myRG   --name myTMProfile   --routing-method Performance   --unique-dns-name mytmprofile
```

**Azure Front Door (Global Layer 7)**

**Type:** Global HTTP/HTTPS load balancer and CDN

**Characteristics:**
- Global service
- Layer 7 (application layer)
- Anycast protocol
- SSL/TLS offloading
- URL-based routing
- WAF capabilities
- Caching at edge
- Split TCP connections

**When to Use:**
- Global web applications
- Need edge caching
- Require advanced routing
- Global WAF deployment
- Low latency worldwide

**Comparison Matrix:**

| Feature | Load Balancer | App Gateway | Traffic Manager | Front Door |
|---------|---------------|-------------|-----------------|------------|
| **Scope** | Regional | Regional | Global | Global |
| **Layer** | 4 (TCP/UDP) | 7 (HTTP/HTTPS) | DNS | 7 (HTTP/HTTPS) |
| **Protocol** | Any | HTTP/HTTPS | Any | HTTP/HTTPS |
| **Routing** | Hash-based | URL/path | DNS-based | URL/path + geo |
| **SSL Offload** | No | Yes | N/A | Yes |
| **WAF** | No | Yes | No | Yes |
| **Caching** | No | No | No | Yes |
| **Best For** | VM traffic | Web apps | DR/geo-routing | Global web apps |

**Real-World Architecture:**
```
Internet
  ↓
Front Door (Global entry point, WAF, caching)
  ↓
Region 1: Application Gateway → Web VMs
Region 2: Application Gateway → Web VMs
  ↓
Internal Load Balancer → Backend VMs
```

---

## Security and Identity

### Q11: What are Managed Identities and how do they work?

**Answer:**

**Definition:** Managed Identities eliminate the need for developers to manage credentials by providing an automatically managed identity in Azure AD for applications to use when connecting to resources that support Azure AD authentication.

**Types:**

**1. System-Assigned Managed Identity**

**Characteristics:**
- Created as part of Azure resource
- Lifecycle tied to resource
- Deleted when resource is deleted
- One identity per resource
- Cannot be shared across resources

**Use Case:** Simple scenarios where identity is tied to single resource

**Example:**
```bash
# Enable system-assigned identity on VM
az vm identity assign   --resource-group myRG   --name myVM
```

**2. User-Assigned Managed Identity**

**Characteristics:**
- Standalone Azure resource
- Independent lifecycle
- Can be shared across multiple resources
- Persists after resource deletion

**Use Case:** Multiple resources need same identity or identity needs to persist

**Example:**
```bash
# Create user-assigned identity
az identity create   --resource-group myRG   --name myUserAssignedIdentity

# Assign to VM
az vm identity assign   --resource-group myRG   --name myVM   --identities myUserAssignedIdentity
```

**How It Works:**

1. **Enable Managed Identity** on Azure resource (VM, App Service, Function, etc.)
2. **Azure AD creates service principal** for the resource
3. **Grant permissions** to the identity (RBAC, Key Vault access policy, etc.)
4. **Application requests token** from Azure Instance Metadata Service (IMDS)
5. **Azure AD returns access token**
6. **Application uses token** to access Azure resources

**Code Examples:**

**Accessing Key Vault:**
```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

// No credentials needed - uses Managed Identity
var client = new SecretClient(
    new Uri("https://myvault.vault.azure.net"),
    new DefaultAzureCredential());

KeyVaultSecret secret = await client.GetSecretAsync("MySecret");
Console.WriteLine($"Secret value: {secret.Value}");
```

**Accessing Azure SQL Database:**
```csharp
using Azure.Identity;
using Microsoft.Data.SqlClient;

// Connection string without password
string connectionString = 
    "Server=myserver.database.windows.net;Database=mydb;";

using var connection = new SqlConnection(connectionString);
// Get token for SQL Database
var credential = new DefaultAzureCredential();
var token = await credential.GetTokenAsync(
    new TokenRequestContext(new[] { "https://database.windows.net/.default" }));

connection.AccessToken = token.Token;
await connection.OpenAsync();
```

**Accessing Storage Account:**
```csharp
using Azure.Identity;
using Azure.Storage.Blobs;

// No storage key needed
var blobServiceClient = new BlobServiceClient(
    new Uri("https://mystorage.blob.core.windows.net"),
    new DefaultAzureCredential());

BlobContainerClient containerClient = 
    blobServiceClient.GetBlobContainerClient("mycontainer");
```

**Benefits:**
1. **No credentials in code**: Eliminates secrets management
2. **Automatic rotation**: Azure handles credential rotation
3. **RBAC integration**: Use Azure's permission model
4. **Secure**: Credentials never exposed
5. **Simple**: Minimal code changes

**Best Practices:**
- Use system-assigned for single-resource scenarios
- Use user-assigned for multi-resource or shared scenarios
- Grant least privilege (minimal permissions required)
- Use DefaultAzureCredential for development flexibility
- Monitor identity usage with Azure AD logs

---

### Q12: Explain Azure Key Vault and how to use it securely.

**Answer:**

**Azure Key Vault Overview:**

Cloud service for securely storing and accessing secrets, keys, and certificates.

**What You Can Store:**

**1. Secrets**: Connection strings, passwords, API keys, certificates (as secrets)
```csharp
// Store secret
await secretClient.SetSecretAsync("DatabasePassword", "P@ssw0rd123");
```

**2. Keys**: Cryptographic keys for encryption
- RSA keys (2048, 3072, 4096 bit)
- EC keys (P-256, P-384, P-521, P-256K)
- Hardware Security Module (HSM) backed keys

```csharp
// Create key
var rsaKeyOptions = new CreateRsaKeyOptions("MyRsaKey")
{
    KeySize = 2048,
    ExpiresOn = DateTimeOffset.Now.AddYears(1)
};
await keyClient.CreateRsaKeyAsync(rsaKeyOptions);
```

**3. Certificates**: SSL/TLS certificates
```csharp
// Import certificate
var certificate = new X509Certificate2("certificate.pfx", "password");
await certificateClient.ImportCertificateAsync("MyCertificate", certificate);
```

**Security Features:**

**1. Access Control**
- **RBAC**: Role-Based Access Control (recommended)
- **Access Policies**: Legacy method, Key Vault-specific permissions

```bash
# Grant secret read permission using RBAC
az role assignment create   --role "Key Vault Secrets User"   --assignee <user-or-managed-identity>   --scope /subscriptions/<sub-id>/resourceGroups/<rg>/providers/Microsoft.KeyVault/vaults/<vault-name>
```

**2. Network Security**
- **Firewall rules**: Restrict access to specific IP ranges
- **Private Endpoints**: Access through VNet
- **Service Endpoints**: Secure access from VNet

```bash
# Enable firewall and restrict access
az keyvault network-rule add   --name myKeyVault   --ip-address "203.0.113.0/24"
```

**3. Monitoring and Auditing**
- **Diagnostic logs**: Track all Key Vault operations
- **Azure Monitor**: Alerts on unusual activity
- **Azure Sentinel**: Advanced threat detection

**4. Data Protection**
- **Soft-delete**: Retain deleted vaults and secrets (7-90 days)
- **Purge protection**: Prevent permanent deletion during retention period
- **Backup/Restore**: Backup critical secrets

```bash
# Enable soft-delete and purge protection
az keyvault create   --name myKeyVault   --resource-group myRG   --enable-soft-delete true   --enable-purge-protection true
```

**Using Key Vault in Applications:**

**Best Practice with Managed Identity:**
```csharp
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

// Use Managed Identity (no credentials in code)
var client = new SecretClient(
    new Uri("https://myvault.vault.azure.net"),
    new DefaultAzureCredential());

// Retrieve secret
KeyVaultSecret secret = await client.GetSecretAsync("ConnectionString");
string connectionString = secret.Value;
```

**ASP.NET Core Integration:**
```csharp
// Program.cs or Startup.cs
var builder = WebApplication.CreateBuilder(args);

// Add Key Vault to configuration
builder.Configuration.AddAzureKeyVault(
    new Uri("https://myvault.vault.azure.net"),
    new DefaultAzureCredential());

// Now use secrets like regular configuration
var dbConnection = builder.Configuration["ConnectionStrings:Database"];
```

**Azure Functions Integration:**
```csharp
// Use Key Vault reference in app settings
// Format: @Microsoft.KeyVault(SecretUri=https://myvault.vault.azure.net/secrets/MySecret)

public class MyFunction
{
    public MyFunction()
    {
        // Automatically injected from Key Vault
        var secret = Environment.GetEnvironmentVariable("MySecret");
    }
}
```

**Best Practices:**

1. **Use Managed Identities**: Never store Key Vault credentials in code
2. **Separate Vaults**: Different vaults for dev, test, prod
3. **Enable Soft-Delete**: Protect against accidental deletion
4. **Enable Purge Protection**: For production environments
5. **Implement RBAC**: Use role-based access over access policies
6. **Monitor Access**: Enable diagnostic logging
7. **Rotate Secrets**: Implement secret rotation policies
8. **Network Restrictions**: Use private endpoints or firewall rules
9. **Least Privilege**: Grant minimum required permissions
10. **Version Secrets**: Keep multiple versions for rollback

**Common Pitfalls to Avoid:**
- Storing Key Vault URIs as secrets
- Using access keys instead of Managed Identity
- Not enabling soft-delete
- Granting overly broad permissions
- Not monitoring access logs
- Hardcoding vault names (use configuration)

**Real-World Example:**
```csharp
public class SecureDataService
{
    private readonly SecretClient _secretClient;
    private readonly ILogger _logger;
    
    public SecureDataService(ILogger<SecureDataService> logger)
    {
        // Use Managed Identity
        _secretClient = new SecretClient(
            new Uri("https://myvault.vault.azure.net"),
            new DefaultAzureCredential());
        _logger = logger;
    }
    
    public async Task<string> GetDatabaseConnectionAsync()
    {
        try
        {
            var secret = await _secretClient.GetSecretAsync("DatabaseConnection");
            _logger.LogInformation("Retrieved database connection from Key Vault");
            return secret.Value.Value;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve secret from Key Vault");
            throw;
        }
    }
}
```

---

## Messaging and Integration

### Q13: Compare Azure Service Bus, Event Grid, and Event Hubs. When to use each?

**Answer:**

**Azure Service Bus (Enterprise Messaging)**

**Type:** Message broker for enterprise applications

**Characteristics:**
- Queues (point-to-point) and Topics (pub-sub)
- Message size up to 256 KB (1 MB in Premium)
- FIFO guarantee with sessions
- Dead-letter queues
- Scheduled messages
- Transactions
- Duplicate detection

**When to Use:**
- Enterprise messaging between applications
- Need guaranteed message ordering
- Transactions required
- High-value messages that must not be lost
- Complex routing scenarios

**Example:**
```csharp
// Send message to Service Bus queue
var client = new ServiceBusClient(connectionString);
var sender = client.CreateSender("orders");

var message = new ServiceBusMessage(JsonSerializer.Serialize(new Order
{
    OrderId = 12345,
    Amount = 99.99m
}));

await sender.SendMessageAsync(message);
```

**Azure Event Grid (Event Routing)**

**Type:** Event routing service for reactive programming

**Characteristics:**
- Publish-subscribe model
- Event size up to 1 MB
- High throughput (10M events/sec)
- Push model (calls webhooks)
- Built-in events from Azure services
- Event filtering
- No message ordering guarantee

**When to Use:**
- React to state changes in Azure resources
- Serverless event-driven architectures
- Loosely coupled microservices
- Broadcasting events to multiple subscribers
- Real-time notifications

**Example:**
```csharp
// Publish custom event
var client = new EventGridPublisherClient(
    new Uri("https://mytopic.region.eventgrid.azure.net/api/events"),
    new AzureKeyCredential(key));

var @event = new EventGridEvent(
    subject: "orders/new",
    eventType: "OrderCreated",
    dataVersion: "1.0",
    data: new { OrderId = 12345, Amount = 99.99m });

await client.SendEventAsync(@event);
```

**Azure Event Hubs (Big Data Streaming)**

**Type:** Big data streaming platform

**Characteristics:**
- Millions of events per second
- Message size up to 1 MB
- Partition-based streaming
- Event retention (1-7 days, 90 days in Premium)
- Kafka protocol support
- Capture to Blob Storage/Data Lake
- Consumer groups

**When to Use:**
- Telemetry and log streaming
- Real-time analytics
- Time-series data
- IoT device data ingestion
- Clickstream analysis

**Example:**
```csharp
// Send events to Event Hub
var producer = new EventHubProducerClient(connectionString, eventHubName);

var batch = await producer.CreateBatchAsync();
batch.TryAdd(new EventData(Encoding.UTF8.GetBytes(
    JsonSerializer.Serialize(new { Temperature = 72.5, Timestamp = DateTime.UtcNow }))));

await producer.SendAsync(batch);
```

**Comparison Matrix:**

| Feature | Service Bus | Event Grid | Event Hubs |
|---------|-------------|------------|------------|
| **Purpose** | Enterprise messaging | Event routing | Data streaming |
| **Pattern** | Queue/Topic | Pub-Sub | Stream processing |
| **Message Size** | 256 KB - 1 MB | 1 MB | 1 MB |
| **Throughput** | Thousands/sec | Millions/sec | Millions/sec |
| **Ordering** | Yes (sessions) | No | Yes (partition) |
| **Retention** | Configurable | N/A (push) | 1-90 days |
| **Delivery** | Pull | Push | Pull |
| **Transactions** | Yes | No | No |
| **Duplicate Detection** | Yes | No | No |
| **Best For** | Critical messages | Event reactions | High-volume streaming |
| **Cost** | Medium | Per event | Per throughput unit |

**Decision Flow:**

```
Need guaranteed message ordering and transactions?
  └─ YES → Service Bus
  └─ NO  → Next question

Need to react to Azure resource state changes?
  └─ YES → Event Grid
  └─ NO  → Next question

Processing millions of events per second?
  └─ YES → Event Hubs
  └─ NO  → Next question

Simple async communication between components?
  └─ YES → Storage Queue or Service Bus
```

**Real-World Architecture:**

```csharp
// Example: E-commerce order processing

// 1. Order created - use Event Grid to notify multiple systems
await eventGridClient.SendEventAsync(new EventGridEvent(
    subject: "orders/created",
    eventType: "OrderCreated",
    data: order));

// 2. Order processing - use Service Bus for reliable processing
await serviceBusClient.CreateSender("order-processing")
    .SendMessageAsync(new ServiceBusMessage(JsonSerializer.Serialize(order)));

// 3. Analytics - stream click events to Event Hubs
await eventHubProducer.SendAsync(new EventData(
    Encoding.UTF8.GetBytes(JsonSerializer.Serialize(clickEvent))));
```

**When to Use Multiple Services:**
- **Event Grid**: Trigger initial reactions to events
- **Service Bus**: Queue critical business transactions
- **Event Hubs**: Stream telemetry and analytics data

---

## Monitoring and DevOps

### Q14: How do you implement Application Insights in an ASP.NET Core application?

**Answer:**

**Application Insights Overview:**
Application Performance Management (APM) service for monitoring live applications, detecting performance anomalies, and diagnosing issues.

**Implementation Steps:**

**1. Install NuGet Package**
```bash
dotnet add package Microsoft.ApplicationInsights.AspNetCore
```

**2. Configure in Program.cs (.NET 6+)**
```csharp
using Microsoft.ApplicationInsights.AspNetCore.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add Application Insights telemetry
builder.Services.AddApplicationInsightsTelemetry(new ApplicationInsightsServiceOptions
{
    ConnectionString = builder.Configuration["ApplicationInsights:ConnectionString"],
    EnableAdaptiveSampling = true,
    EnablePerformanceCounterCollectionModule = true
});

builder.Services.AddControllers();

var app = builder.Build();
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
```

**3. Configuration (appsettings.json)**
```json
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://region.in.applicationinsights.azure.com/"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "ApplicationInsights": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  }
}
```

**4. Custom Telemetry Tracking**

**Track Custom Events:**
```csharp
public class OrderController : ControllerBase
{
    private readonly TelemetryClient _telemetryClient;
    
    public OrderController(TelemetryClient telemetryClient)
    {
        _telemetryClient = telemetryClient;
    }
    
    [HttpPost]
    public async Task<IActionResult> CreateOrder(Order order)
    {
        // Track custom event
        _telemetryClient.TrackEvent("OrderCreated", new Dictionary<string, string>
        {
            { "OrderId", order.Id.ToString() },
            { "Amount", order.TotalAmount.ToString() },
            { "CustomerId", order.CustomerId.ToString() }
        });
        
        // Track custom metric
        _telemetryClient.TrackMetric("OrderValue", order.TotalAmount);
        
        await _orderService.CreateAsync(order);
        return Ok(order);
    }
}
```

**Track Dependencies:**
```csharp
public class ExternalApiService
{
    private readonly TelemetryClient _telemetryClient;
    private readonly HttpClient _httpClient;
    
    public async Task<string> CallExternalApiAsync(string endpoint)
    {
        var startTime = DateTime.UtcNow;
        var timer = System.Diagnostics.Stopwatch.StartNew();
        
        try
        {
            var response = await _httpClient.GetStringAsync(endpoint);
            
            // Track successful dependency
            _telemetryClient.TrackDependency(
                "HTTP",
                endpoint,
                "GET",
                startTime,
                timer.Elapsed,
                success: true);
            
            return response;
        }
        catch (Exception ex)
        {
            // Track failed dependency
            _telemetryClient.TrackDependency(
                "HTTP",
                endpoint,
                "GET",
                startTime,
                timer.Elapsed,
                success: false);
            
            _telemetryClient.TrackException(ex);
            throw;
        }
    }
}
```

**Track Exceptions with Context:**
```csharp
try
{
    await ProcessOrderAsync(order);
}
catch (Exception ex)
{
    var properties = new Dictionary<string, string>
    {
        { "OrderId", order.Id.ToString() },
        { "UserId", User.Identity.Name }
    };
    
    var metrics = new Dictionary<string, double>
    {
        { "OrderAmount", order.TotalAmount }
    };
    
    _telemetryClient.TrackException(ex, properties, metrics);
    throw;
}
```

**5. Custom Telemetry Initializer**
```csharp
public class CustomTelemetryInitializer : ITelemetryInitializer
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    
    public CustomTelemetryInitializer(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    
    public void Initialize(ITelemetry telemetry)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext != null)
        {
            // Add custom properties to all telemetry
            telemetry.Context.GlobalProperties["TenantId"] = 
                httpContext.User.FindFirst("TenantId")?.Value ?? "Unknown";
            
            telemetry.Context.GlobalProperties["Environment"] = 
                Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        }
    }
}

// Register in Program.cs
builder.Services.AddSingleton<ITelemetryInitializer, CustomTelemetryInitializer>();
```

**6. Logging Integration**
```csharp
public class ProductService
{
    private readonly ILogger<ProductService> _logger;
    
    public ProductService(ILogger<ProductService> logger)
    {
        _logger = logger;
    }
    
    public async Task<Product> GetProductAsync(int id)
    {
        _logger.LogInformation("Fetching product {ProductId}", id);
        
        try
        {
            var product = await _repository.GetAsync(id);
            
            if (product == null)
            {
                _logger.LogWarning("Product {ProductId} not found", id);
                return null;
            }
            
            return product;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching product {ProductId}", id);
            throw;
        }
    }
}
```

**7. Filtering Telemetry**
```csharp
public class FilterHealthCheckTelemetryProcessor : ITelemetryProcessor
{
    private ITelemetryProcessor Next { get; set; }

    public FilterHealthCheckTelemetryProcessor(ITelemetryProcessor next)
    {
        Next = next;
    }

    public void Process(ITelemetry item)
    {
        // Filter out health check requests
        if (item is RequestTelemetry request && 
            request.Url.AbsolutePath.Contains("/health"))
        {
            return; // Don't send to Application Insights
        }

        Next.Process(item);
    }
}

// Register in Program.cs
builder.Services.AddApplicationInsightsTelemetryProcessor<FilterHealthCheckTelemetryProcessor>();
```

**8. Querying Telemetry (KQL)**
```kql
// Failed requests in last 24 hours
requests
| where timestamp > ago(24h)
| where success == false
| summarize count() by resultCode, name
| order by count_ desc

// Slow requests
requests
| where timestamp > ago(1h)
| where duration > 1000
| project timestamp, name, duration, resultCode
| order by duration desc

// Custom events
customEvents
| where timestamp > ago(24h)
| where name == "OrderCreated"
| extend OrderId = tostring(customDimensions.OrderId)
| extend Amount = todouble(customDimensions.Amount)
| summarize count(), avg(Amount) by bin(timestamp, 1h)
```

**Best Practices:**
1. **Use connection string** instead of instrumentation key
2. **Enable adaptive sampling** to control data volume
3. **Add custom properties** for better filtering
4. **Track business metrics** in addition to technical metrics
5. **Set up alerts** for critical failures
6. **Use telemetry processors** to filter unnecessary data
7. **Implement custom initializers** for common properties
8. **Monitor dependencies** (databases, APIs, etc.)
9. **Use structured logging** with log levels
10. **Create dashboards** in Azure portal for key metrics

---

### Q15: Explain Infrastructure as Code options in Azure (ARM, Bicep, Terraform).

**Answer:**

**Overview:**
Infrastructure as Code (IaC) allows you to manage infrastructure through code rather than manual processes, enabling version control, repeatability, and automation.

**1. ARM Templates (Azure Resource Manager)**

**Type:** Native Azure IaC using JSON

**Structure:**
```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "storageAccountName": {
      "type": "string",
      "metadata": {
        "description": "Name of the storage account"
      }
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]"
    }
  },
  "variables": {
    "storageAccountSku": "Standard_LRS"
  },
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2021-09-01",
      "name": "[parameters('storageAccountName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "[variables('storageAccountSku')]"
      },
      "kind": "StorageV2",
      "properties": {
        "supportsHttpsTrafficOnly": true,
        "minimumTlsVersion": "TLS1_2"
      }
    }
  ],
  "outputs": {
    "storageAccountId": {
      "type": "string",
      "value": "[resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName'))]"
    }
  }
}
```

**Deployment:**
```bash
az deployment group create   --resource-group myResourceGroup   --template-file azuredeploy.json   --parameters storageAccountName=mystorageaccount
```

**Pros:**
- Native Azure support
- Complete feature coverage
- Extensive documentation
- Template validation

**Cons:**
- Verbose JSON syntax
- Complex expressions
- Steep learning curve
- Difficult to read/maintain

**When to Use:**
- Azure-only infrastructure
- Need complete Azure API coverage
- Existing ARM template investments
- Azure DevOps integration

---

**2. Bicep**

**Type:** Domain-specific language (DSL) for Azure

**Structure:**
```bicep
@description('Name of the storage account')
param storageAccountName string

@description('Location for resources')
param location string = resourceGroup().location

@allowed([
  'Standard_LRS'
  'Standard_GRS'
  'Standard_ZRS'
])
param storageSku string = 'Standard_LRS'

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: storageSku
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
    accessTier: 'Hot'
  }
}

output storageAccountId string = storageAccount.id
output primaryEndpoints object = storageAccount.properties.primaryEndpoints
```

**Modules (Reusability):**
```bicep
// storage.bicep module
param name string
param location string

resource storage 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: name
  location: location
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}

output id string = storage.id

// main.bicep
module storageModule 'storage.bicep' = {
  name: 'storageDeployment'
  params: {
    name: 'mystorageacct'
    location: 'eastus'
  }
}
```

**Deployment:**
```bash
az deployment group create   --resource-group myResourceGroup   --template-file main.bicep   --parameters storageAccountName=mystorageaccount
```

**Pros:**
- Cleaner syntax than ARM
- Type safety and IntelliSense
- Transpiles to ARM templates
- Better error messages
- Module support for reusability

**Cons:**
- Newer technology (less community resources)
- Azure-specific (not multi-cloud)
- Still evolving

**When to Use:**
- Azure-only infrastructure
- Want simpler syntax than ARM
- Starting new projects
- Need better tooling support

---

**3. Terraform**

**Type:** Multi-cloud IaC tool

**Structure:**
```hcl
# Configure Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstatestorage"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

# Variables
variable "environment" {
  type    = string
  default = "production"
}

variable "location" {
  type    = string
  default = "East US"
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "rg-${var.environment}"
  location = var.location
  
  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Storage Account
resource "azurerm_storage_account" "main" {
  name                     = "storage${var.environment}"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  
  tags = azurerm_resource_group.main.tags
}

# App Service Plan
resource "azurerm_service_plan" "main" {
  name                = "plan-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "B1"
}

# App Service
resource "azurerm_linux_web_app" "main" {
  name                = "app-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id
  
  site_config {
    always_on = true
    
    application_stack {
      dotnet_version = "6.0"
    }
  }
  
  app_settings = {
    "STORAGE_CONNECTION" = azurerm_storage_account.main.primary_connection_string
  }
}

# Outputs
output "app_service_url" {
  value = "https://${azurerm_linux_web_app.main.default_hostname}"
}

output "storage_account_name" {
  value = azurerm_storage_account.main.name
}
```

**Modules (Reusability):**
```hcl
# modules/web-app/main.tf
variable "name" {}
variable "resource_group_name" {}
variable "location" {}
variable "app_service_plan_id" {}

resource "azurerm_linux_web_app" "this" {
  name                = var.name
  resource_group_name = var.resource_group_name
  location            = var.location
  service_plan_id     = var.app_service_plan_id
  
  site_config {
    always_on = true
  }
}

output "url" {
  value = azurerm_linux_web_app.this.default_hostname
}

# main.tf
module "web_app" {
  source              = "./modules/web-app"
  name                = "my-web-app"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  app_service_plan_id = azurerm_service_plan.main.id
}
```

**Commands:**
```bash
# Initialize
terraform init

# Plan (preview changes)
terraform plan

# Apply (create/update resources)
terraform apply

# Destroy (delete resources)
terraform destroy

# Format code
terraform fmt

# Validate configuration
terraform validate
```

**Pros:**
- Multi-cloud support (Azure, AWS, GCP)
- Mature ecosystem
- State management
- Large community
- Extensive module library
- Plan/preview before apply
- Excellent dependency management

**Cons:**
- State file management complexity
- Learning curve
- May lag behind new Azure features
- State file security concerns

**When to Use:**
- Multi-cloud environment
- Existing Terraform expertise
- Need mature tooling
- Want extensive module ecosystem
- State management important

---

**Comparison Matrix:**

| Feature | ARM Templates | Bicep | Terraform |
|---------|--------------|-------|-----------|
| **Syntax** | JSON | DSL | HCL |
| **Cloud Support** | Azure only | Azure only | Multi-cloud |
| **Learning Curve** | Steep | Moderate | Moderate |
| **Readability** | Low | High | High |
| **State Management** | Azure-managed | Azure-managed | Self-managed |
| **Module/Reusability** | Limited | Good | Excellent |
| **Tooling** | Good | Excellent | Excellent |
| **Community** | Large | Growing | Very Large |
| **Azure Feature Coverage** | Complete | Complete | Good (may lag) |
| **Preview Changes** | What-if | What-if | Plan |

**Real-World Recommendation:**

**Use Bicep if:**
- Azure-only environment
- Want best Azure integration
- Starting fresh
- Team knows Azure well

**Use Terraform if:**
- Multi-cloud strategy
- Existing Terraform knowledge
- Need mature state management
- Want extensive module library

**Use ARM Templates if:**
- Legacy codebase to maintain
- Need 100% Azure API coverage immediately
- Heavy Azure DevOps integration

**Best Practices (All Tools):**
1. **Version control**: Store IaC in Git
2. **Modularize**: Create reusable components
3. **Environment separation**: Separate configs for dev/test/prod
4. **Secrets management**: Never hardcode secrets, use Key Vault
5. **CI/CD integration**: Automate deployments
6. **Code review**: Treat IaC like application code
7. **Documentation**: Document architecture decisions
8. **Testing**: Validate templates before deployment
9. **Tagging**: Consistent resource tagging
10. **Cost estimation**: Review costs before applying changes


---

# Code Samples

## 1. Azure Functions

### HTTP Trigger Function (C#)

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;

public static class OrderHttpTrigger
{
    [FunctionName("CreateOrder")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "orders")] HttpRequest req,
        [Queue("order-processing")] IAsyncCollector<Order> orderQueue,
        ILogger log)
    {
        log.LogInformation("Processing order creation request");

        // Read and parse request body
        string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
        var order = JsonConvert.DeserializeObject<Order>(requestBody);

        // Validate
        if (order == null || string.IsNullOrEmpty(order.CustomerId))
        {
            return new BadRequestObjectResult("Invalid order data");
        }

        // Generate order ID
        order.Id = Guid.NewGuid().ToString();
        order.CreatedAt = DateTime.UtcNow;
        order.Status = "Pending";

        // Add to queue for processing
        await orderQueue.AddAsync(order);

        log.LogInformation($"Order {order.Id} created successfully");

        return new OkObjectResult(order);
    }
}

public class Order
{
    public string Id { get; set; }
    public string CustomerId { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; }
}
```

### Queue Trigger Function (C#)

```csharp
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

public static class OrderQueueTrigger
{
    [FunctionName("ProcessOrder")]
    public static async Task Run(
        [QueueTrigger("order-processing")] Order order,
        [CosmosDB(
            databaseName: "OrdersDB",
            collectionName: "Orders",
            ConnectionStringSetting = "CosmosDBConnection")] IAsyncCollector<Order> ordersOut,
        [SendGrid(ApiKey = "SendGridApiKey")] IAsyncCollector<SendGridMessage> messageCollector,
        ILogger log)
    {
        log.LogInformation($"Processing order {order.Id}");

        try
        {
            // Process order logic
            await ProcessOrderAsync(order);
            order.Status = "Processed";

            // Save to Cosmos DB
            await ordersOut.AddAsync(order);

            // Send confirmation email
            var message = new SendGridMessage();
            message.SetSubject($"Order {order.Id} Confirmed");
            message.AddContent("text/plain", $"Your order has been processed successfully.");
            await messageCollector.AddAsync(message);

            log.LogInformation($"Order {order.Id} processed successfully");
        }
        catch (Exception ex)
        {
            log.LogError(ex, $"Error processing order {order.Id}");
            throw; // Will move message to poison queue after retries
        }
    }

    private static Task ProcessOrderAsync(Order order)
    {
        // Business logic here
        return Task.CompletedTask;
    }
}
```

### Timer Trigger Function (C#)

```csharp
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

public static class CleanupTimerTrigger
{
    // Runs every day at 2 AM UTC
    [FunctionName("DailyCleanup")]
    public static async Task Run(
        [TimerTrigger("0 0 2 * * *")] TimerInfo myTimer,
        [Blob("logs", FileAccess.ReadWrite)] CloudBlobContainer logsContainer,
        ILogger log)
    {
        log.LogInformation($"Daily cleanup started at: {DateTime.UtcNow}");

        try
        {
            // Delete old log files
            var cutoffDate = DateTime.UtcNow.AddDays(-30);
            await foreach (var blob in logsContainer.GetBlobsAsync())
            {
                if (blob.Properties.CreatedOn < cutoffDate)
                {
                    await logsContainer.GetBlobClient(blob.Name).DeleteAsync();
                    log.LogInformation($"Deleted old log: {blob.Name}");
                }
            }

            log.LogInformation("Daily cleanup completed successfully");
        }
        catch (Exception ex)
        {
            log.LogError(ex, "Error during daily cleanup");
            throw;
        }
    }
}
```

---

## 2. Azure Storage Operations

### Blob Storage Client (C#)

```csharp
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.IO;
using System.Threading.Tasks;

public class BlobStorageService
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly string _containerName;

    public BlobStorageService(string connectionString, string containerName)
    {
        _blobServiceClient = new BlobServiceClient(connectionString);
        _containerName = containerName;
    }

    // Upload a file
    public async Task<string> UploadFileAsync(string fileName, Stream fileStream)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        await containerClient.CreateIfNotExistsAsync();

        var blobClient = containerClient.GetBlobClient(fileName);
        
        // Set metadata and content type
        var blobHttpHeaders = new BlobHttpHeaders
        {
            ContentType = "application/pdf"
        };

        await blobClient.UploadAsync(fileStream, new BlobUploadOptions
        {
            HttpHeaders = blobHttpHeaders,
            Metadata = new Dictionary<string, string>
            {
                { "UploadedBy", "System" },
                { "UploadedAt", DateTime.UtcNow.ToString("O") }
            }
        });

        return blobClient.Uri.ToString();
    }

    // Download a file
    public async Task<Stream> DownloadFileAsync(string fileName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        var blobClient = containerClient.GetBlobClient(fileName);

        var response = await blobClient.DownloadAsync();
        return response.Value.Content;
    }

    // List blobs with pagination
    public async Task<List<string>> ListBlobsAsync(string prefix = null)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        var blobs = new List<string>();

        await foreach (var blobItem in containerClient.GetBlobsAsync(prefix: prefix))
        {
            blobs.Add(blobItem.Name);
        }

        return blobs;
    }

    // Delete a blob
    public async Task<bool> DeleteFileAsync(string fileName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        var blobClient = containerClient.GetBlobClient(fileName);

        return await blobClient.DeleteIfExistsAsync();
    }

    // Generate SAS URL for temporary access
    public Uri GenerateSasUrl(string fileName, TimeSpan validity)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(_containerName);
        var blobClient = containerClient.GetBlobClient(fileName);

        var sasBuilder = new BlobSasBuilder
        {
            BlobContainerName = _containerName,
            BlobName = fileName,
            Resource = "b",
            StartsOn = DateTimeOffset.UtcNow,
            ExpiresOn = DateTimeOffset.UtcNow.Add(validity)
        };

        sasBuilder.SetPermissions(BlobSasPermissions.Read);

        return blobClient.GenerateSasUri(sasBuilder);
    }
}
```

### Queue Storage Client (C#)

```csharp
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;
using System.Text.Json;
using System.Threading.Tasks;

public class QueueStorageService
{
    private readonly QueueClient _queueClient;

    public QueueStorageService(string connectionString, string queueName)
    {
        _queueClient = new QueueClient(connectionString, queueName);
        _queueClient.CreateIfNotExists();
    }

    // Send message
    public async Task SendMessageAsync<T>(T message)
    {
        var json = JsonSerializer.Serialize(message);
        await _queueClient.SendMessageAsync(json);
    }

    // Receive and process messages
    public async Task<List<QueueMessage>> ReceiveMessagesAsync(int maxMessages = 10)
    {
        var messages = await _queueClient.ReceiveMessagesAsync(maxMessages);
        return messages.Value.ToList();
    }

    // Delete message after processing
    public async Task DeleteMessageAsync(string messageId, string popReceipt)
    {
        await _queueClient.DeleteMessageAsync(messageId, popReceipt);
    }

    // Peek messages without removing
    public async Task<List<PeekedMessage>> PeekMessagesAsync(int maxMessages = 10)
    {
        var messages = await _queueClient.PeekMessagesAsync(maxMessages);
        return messages.Value.ToList();
    }
}
```

---

## 3. Database Operations

### Azure SQL Database (C#)

```csharp
using Microsoft.Data.SqlClient;
using System.Data;
using System.Threading.Tasks;

public class SqlDatabaseService
{
    private readonly string _connectionString;

    public SqlDatabaseService(string connectionString)
    {
        _connectionString = connectionString;
    }

    // Query with parameters
    public async Task<List<Product>> GetProductsByCategoryAsync(int categoryId)
    {
        var products = new List<Product>();

        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        using var command = new SqlCommand(
            "SELECT Id, Name, Price, CategoryId FROM Products WHERE CategoryId = @CategoryId",
            connection);
        
        command.Parameters.AddWithValue("@CategoryId", categoryId);

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            products.Add(new Product
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Price = reader.GetDecimal(2),
                CategoryId = reader.GetInt32(3)
            });
        }

        return products;
    }

    // Insert with transaction
    public async Task<int> CreateOrderWithItemsAsync(Order order, List<OrderItem> items)
    {
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        using var transaction = connection.BeginTransaction();
        try
        {
            // Insert order
            using var orderCommand = new SqlCommand(
                "INSERT INTO Orders (CustomerId, TotalAmount, CreatedAt) OUTPUT INSERTED.Id VALUES (@CustomerId, @TotalAmount, @CreatedAt)",
                connection, transaction);

            orderCommand.Parameters.AddWithValue("@CustomerId", order.CustomerId);
            orderCommand.Parameters.AddWithValue("@TotalAmount", order.TotalAmount);
            orderCommand.Parameters.AddWithValue("@CreatedAt", DateTime.UtcNow);

            var orderId = (int)await orderCommand.ExecuteScalarAsync();

            // Insert order items
            foreach (var item in items)
            {
                using var itemCommand = new SqlCommand(
                    "INSERT INTO OrderItems (OrderId, ProductId, Quantity, Price) VALUES (@OrderId, @ProductId, @Quantity, @Price)",
                    connection, transaction);

                itemCommand.Parameters.AddWithValue("@OrderId", orderId);
                itemCommand.Parameters.AddWithValue("@ProductId", item.ProductId);
                itemCommand.Parameters.AddWithValue("@Quantity", item.Quantity);
                itemCommand.Parameters.AddWithValue("@Price", item.Price);

                await itemCommand.ExecuteNonQueryAsync();
            }

            await transaction.CommitAsync();
            return orderId;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    // Stored procedure execution
    public async Task<List<SalesReport>> GetSalesReportAsync(DateTime startDate, DateTime endDate)
    {
        var reports = new List<SalesReport>();

        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        using var command = new SqlCommand("sp_GetSalesReport", connection)
        {
            CommandType = CommandType.StoredProcedure
        };

        command.Parameters.AddWithValue("@StartDate", startDate);
        command.Parameters.AddWithValue("@EndDate", endDate);

        using var reader = await command.ExecuteReaderAsync();
        while (await reader.ReadAsync())
        {
            reports.Add(new SalesReport
            {
                ProductName = reader.GetString(0),
                TotalQuantity = reader.GetInt32(1),
                TotalRevenue = reader.GetDecimal(2)
            });
        }

        return reports;
    }
}
```

### Cosmos DB Client (C#)

```csharp
using Microsoft.Azure.Cosmos;
using System.Net;
using System.Threading.Tasks;

public class CosmosDbService
{
    private readonly Container _container;

    public CosmosDbService(string connectionString, string databaseName, string containerName)
    {
        var client = new CosmosClient(connectionString);
        _container = client.GetContainer(databaseName, containerName);
    }

    // Create item
    public async Task<UserProfile> CreateUserProfileAsync(UserProfile profile)
    {
        var response = await _container.CreateItemAsync(
            profile,
            new PartitionKey(profile.UserId));

        return response.Resource;
    }

    // Read item by ID and partition key
    public async Task<UserProfile> GetUserProfileAsync(string userId)
    {
        try
        {
            var response = await _container.ReadItemAsync<UserProfile>(
                userId,
                new PartitionKey(userId));

            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    // Query items
    public async Task<List<UserProfile>> GetUsersByCountryAsync(string country)
    {
        var query = new QueryDefinition(
            "SELECT * FROM c WHERE c.country = @country")
            .WithParameter("@country", country);

        var iterator = _container.GetItemQueryIterator<UserProfile>(query);
        var results = new List<UserProfile>();

        while (iterator.HasMoreResults)
        {
            var response = await iterator.ReadNextAsync();
            results.AddRange(response);
        }

        return results;
    }

    // Update item
    public async Task<UserProfile> UpdateUserProfileAsync(UserProfile profile)
    {
        var response = await _container.UpsertItemAsync(
            profile,
            new PartitionKey(profile.UserId));

        return response.Resource;
    }

    // Delete item
    public async Task DeleteUserProfileAsync(string userId)
    {
        await _container.DeleteItemAsync<UserProfile>(
            userId,
            new PartitionKey(userId));
    }

    // Batch operations (transactional)
    public async Task<bool> BatchUpdateUserDataAsync(string userId, List<OrderHistory> orders)
    {
        var batch = _container.CreateTransactionalBatch(new PartitionKey(userId));

        // Add multiple operations
        foreach (var order in orders)
        {
            batch.CreateItem(order);
        }

        var response = await batch.ExecuteAsync();
        return response.IsSuccessStatusCode;
    }

    // Change feed processor for real-time updates
    public async Task StartChangeFeedProcessorAsync()
    {
        var leaseContainer = _container.Database.GetContainer("leases");

        var changeFeedProcessor = _container.GetChangeFeedProcessorBuilder<UserProfile>(
            "userProfileProcessor",
            async (IReadOnlyCollection<UserProfile> changes, CancellationToken cancellationToken) =>
            {
                foreach (var profile in changes)
                {
                    // Process each change
                    Console.WriteLine($"User {profile.UserId} updated");
                }
            })
            .WithInstanceName("consumerInstance")
            .WithLeaseContainer(leaseContainer)
            .Build();

        await changeFeedProcessor.StartAsync();
    }
}

public class UserProfile
{
    [JsonProperty("id")]
    public string UserId { get; set; }
    
    public string Name { get; set; }
    public string Email { get; set; }
    public string Country { get; set; }
    public DateTime CreatedAt { get; set; }
}
```

---

## 4. Service Bus Messaging

```csharp
using Azure.Messaging.ServiceBus;
using System.Text.Json;
using System.Threading.Tasks;

public class ServiceBusService
{
    private readonly ServiceBusClient _client;
    private readonly string _queueName;

    public ServiceBusService(string connectionString, string queueName)
    {
        _client = new ServiceBusClient(connectionString);
        _queueName = queueName;
    }

    // Send message
    public async Task SendMessageAsync<T>(T messageBody)
    {
        var sender = _client.CreateSender(_queueName);
        
        var message = new ServiceBusMessage(JsonSerializer.Serialize(messageBody))
        {
            ContentType = "application/json",
            MessageId = Guid.NewGuid().ToString(),
            SessionId = "session1" // For FIFO ordering
        };

        // Add custom properties
        message.ApplicationProperties.Add("Priority", "High");
        message.ApplicationProperties.Add("Source", "OrderService");

        await sender.SendMessageAsync(message);
    }

    // Send batch of messages
    public async Task SendBatchMessagesAsync<T>(List<T> messages)
    {
        var sender = _client.CreateSender(_queueName);
        
        using var messageBatch = await sender.CreateMessageBatchAsync();

        foreach (var messageBody in messages)
        {
            var message = new ServiceBusMessage(JsonSerializer.Serialize(messageBody));
            
            if (!messageBatch.TryAddMessage(message))
            {
                // Batch is full, send it
                await sender.SendMessagesAsync(messageBatch);
                messageBatch.Dispose();
                
                // Create new batch and add current message
                var newBatch = await sender.CreateMessageBatchAsync();
                newBatch.TryAddMessage(message);
            }
        }

        // Send remaining messages
        if (messageBatch.Count > 0)
        {
            await sender.SendMessagesAsync(messageBatch);
        }
    }

    // Receive and process messages
    public async Task ReceiveMessagesAsync()
    {
        var processor = _client.CreateProcessor(_queueName, new ServiceBusProcessorOptions
        {
            MaxConcurrentCalls = 5,
            AutoCompleteMessages = false
        });

        processor.ProcessMessageAsync += async args =>
        {
            try
            {
                var body = args.Message.Body.ToString();
                var order = JsonSerializer.Deserialize<Order>(body);

                // Process message
                Console.WriteLine($"Processing order: {order.Id}");

                // Complete the message
                await args.CompleteMessageAsync(args.Message);
            }
            catch (Exception ex)
            {
                // Move to dead-letter queue
                await args.DeadLetterMessageAsync(args.Message, "ProcessingError", ex.Message);
            }
        };

        processor.ProcessErrorAsync += args =>
        {
            Console.WriteLine($"Error: {args.Exception.Message}");
            return Task.CompletedTask;
        };

        await processor.StartProcessingAsync();
    }

    // Schedule message for future delivery
    public async Task ScheduleMessageAsync<T>(T messageBody, DateTimeOffset scheduleTime)
    {
        var sender = _client.CreateSender(_queueName);
        var message = new ServiceBusMessage(JsonSerializer.Serialize(messageBody));

        await sender.ScheduleMessageAsync(message, scheduleTime);
    }
}
```

---

## 5. Application Insights Integration

```csharp
using Microsoft.ApplicationInsights;
using Microsoft.ApplicationInsights.DataContracts;
using System.Diagnostics;
using System.Threading.Tasks;

public class TelemetryService
{
    private readonly TelemetryClient _telemetryClient;

    public TelemetryService(TelemetryClient telemetryClient)
    {
        _telemetryClient = telemetryClient;
    }

    // Track custom event
    public void TrackOrderPlaced(Order order)
    {
        var properties = new Dictionary<string, string>
        {
            { "OrderId", order.Id },
            { "CustomerId", order.CustomerId },
            { "PaymentMethod", order.PaymentMethod }
        };

        var metrics = new Dictionary<string, double>
        {
            { "OrderAmount", (double)order.TotalAmount },
            { "ItemCount", order.Items.Count }
        };

        _telemetryClient.TrackEvent("OrderPlaced", properties, metrics);
    }

    // Track dependency (external API call)
    public async Task<T> TrackDependencyAsync<T>(
        string dependencyName,
        Func<Task<T>> operation)
    {
        var stopwatch = Stopwatch.StartNew();
        var startTime = DateTimeOffset.UtcNow;
        bool success = false;

        try
        {
            var result = await operation();
            success = true;
            return result;
        }
        catch (Exception ex)
        {
            _telemetryClient.TrackException(ex);
            throw;
        }
        finally
        {
            stopwatch.Stop();
            _telemetryClient.TrackDependency(
                "HTTP",
                dependencyName,
                "GET",
                startTime,
                stopwatch.Elapsed,
                success);
        }
    }

    // Track metric
    public void TrackQueueLength(int length)
    {
        _telemetryClient.TrackMetric("QueueLength", length);
    }

    // Track custom metric over time
    public void TrackProcessingTime(TimeSpan duration, string operationType)
    {
        var metric = _telemetryClient.GetMetric("ProcessingTime", "OperationType");
        metric.TrackValue(duration.TotalMilliseconds, operationType);
    }

    // Track page view (for web apps)
    public void TrackPageView(string pageName, Dictionary<string, string> properties = null)
    {
        var pageView = new PageViewTelemetry(pageName)
        {
            Url = new Uri($"https://myapp.com/{pageName}")
        };

        if (properties != null)
        {
            foreach (var prop in properties)
            {
                pageView.Properties.Add(prop.Key, prop.Value);
            }
        }

        _telemetryClient.TrackPageView(pageView);
    }

    // Ensure telemetry is sent before app shutdown
    public void Flush()
    {
        _telemetryClient.FlushAsync(CancellationToken.None).Wait();
    }
}
```

---

## 6. Azure CLI Scripts

### Resource Deployment Script

```bash
#!/bin/bash

# Variables
RESOURCE_GROUP="myapp-rg"
LOCATION="eastus"
APP_SERVICE_PLAN="myapp-plan"
WEB_APP_NAME="myapp-web"
STORAGE_ACCOUNT="myappstorage"
SQL_SERVER="myapp-sql-server"
SQL_DATABASE="myapp-db"
SQL_ADMIN_USER="sqladmin"
SQL_ADMIN_PASSWORD="P@ssw0rd123!"

# Create resource group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION

# Create storage account
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --kind StorageV2 \
  --min-tls-version TLS1_2

# Create App Service Plan
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --name $WEB_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --runtime "DOTNET|6.0"

# Enable system-assigned managed identity
az webapp identity assign \
  --name $WEB_APP_NAME \
  --resource-group $RESOURCE_GROUP

# Configure app settings
az webapp config appsettings set \
  --name $WEB_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    StorageAccountName=$STORAGE_ACCOUNT \
    ASPNETCORE_ENVIRONMENT="Production"

# Create SQL Server
az sql server create \
  --name $SQL_SERVER \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --admin-user $SQL_ADMIN_USER \
  --admin-password $SQL_ADMIN_PASSWORD

# Configure SQL Server firewall to allow Azure services
az sql server firewall-rule create \
  --server $SQL_SERVER \
  --resource-group $RESOURCE_GROUP \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Create SQL Database
az sql db create \
  --name $SQL_DATABASE \
  --server $SQL_SERVER \
  --resource-group $RESOURCE_GROUP \
  --service-objective S0

# Deploy application
az webapp deployment source config-zip \
  --name $WEB_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --src ./app.zip

echo "Deployment completed successfully!"
echo "Web App URL: https://${WEB_APP_NAME}.azurewebsites.net"
```

---

## 7. PowerShell Scripts

### Azure Resource Management

```powershell
# Connect to Azure
Connect-AzAccount

# Variables
$resourceGroup = "myapp-rg"
$location = "East US"
$storageAccountName = "myappstorage"
$webAppName = "myapp-web"

# Create Resource Group
New-AzResourceGroup -Name $resourceGroup -Location $location

# Create Storage Account
$storageAccount = New-AzStorageAccount `
    -ResourceGroupName $resourceGroup `
    -Name $storageAccountName `
    -Location $location `
    -SkuName Standard_LRS `
    -Kind StorageV2 `
    -MinimumTlsVersion TLS1_2

# Get storage account key
$storageKey = (Get-AzStorageAccountKey `
    -ResourceGroupName $resourceGroup `
    -Name $storageAccountName)[0].Value

# Create storage context
$ctx = New-AzStorageContext `
    -StorageAccountName $storageAccountName `
    -StorageAccountKey $storageKey

# Create blob container
New-AzStorageContainer `
    -Name "uploads" `
    -Context $ctx `
    -Permission Off

# Upload file to blob
Set-AzStorageBlobContent `
    -File "./localfile.txt" `
    -Container "uploads" `
    -Blob "remotefile.txt" `
    -Context $ctx

# List all blobs
Get-AzStorageBlob -Container "uploads" -Context $ctx

# Create App Service Plan
$appServicePlan = New-AzAppServicePlan `
    -ResourceGroupName $resourceGroup `
    -Name "$webAppName-plan" `
    -Location $location `
    -Tier Standard `
    -NumberofWorkers 1 `
    -WorkerSize Small

# Create Web App
$webApp = New-AzWebApp `
    -ResourceGroupName $resourceGroup `
    -Name $webAppName `
    -Location $location `
    -AppServicePlan $appServicePlan.Id

# Configure app settings
$appSettings = @{
    "ASPNETCORE_ENVIRONMENT" = "Production"
    "StorageConnectionString" = "DefaultEndpointsProtocol=https;AccountName=$storageAccountName;AccountKey=$storageKey"
}

Set-AzWebApp `
    -ResourceGroupName $resourceGroup `
    -Name $webAppName `
    -AppSettings $appSettings

Write-Host "Deployment completed!"
Write-Host "Web App URL: https://$webAppName.azurewebsites.net"
```

---

## 8. Terraform Configuration

```hcl
# main.tf
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Variables
variable "environment" {
  type    = string
  default = "production"
}

variable "location" {
  type    = string
  default = "East US"
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = "rg-${var.environment}"
  location = var.location

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Storage Account
resource "azurerm_storage_account" "main" {
  name                     = "storage${var.environment}"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"

  tags = azurerm_resource_group.main.tags
}

# App Service Plan
resource "azurerm_service_plan" "main" {
  name                = "plan-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "B1"
}

# App Service
resource "azurerm_linux_web_app" "main" {
  name                = "app-${var.environment}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id

  site_config {
    always_on = true

    application_stack {
      dotnet_version = "6.0"
    }
  }

  app_settings = {
    "STORAGE_CONNECTION" = azurerm_storage_account.main.primary_connection_string
  }

  identity {
    type = "SystemAssigned"
  }

  tags = azurerm_resource_group.main.tags
}

# SQL Server
resource "azurerm_mssql_server" "main" {
  name                         = "sql-${var.environment}"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = "sqladmin"
  administrator_login_password = "P@ssw0rd123!"
  
  minimum_tls_version = "1.2"

  tags = azurerm_resource_group.main.tags
}

# SQL Database
resource "azurerm_mssql_database" "main" {
  name      = "db-${var.environment}"
  server_id = azurerm_mssql_server.main.id
  sku_name  = "S0"

  tags = azurerm_resource_group.main.tags
}

# Outputs
output "web_app_url" {
  value = "https://${azurerm_linux_web_app.main.default_hostname}"
}

output "storage_account_name" {
  value = azurerm_storage_account.main.name
}
```


---

# TL;DR Summary

## 🎯 Quick Reference

### Must-Know Concepts for Interviews

#### 1. **Cloud Fundamentals**

**Service Models:**
- **IaaS**: Virtual Machines, Virtual Networks → Full control
- **PaaS**: App Service, SQL Database → Focus on code
- **SaaS**: Microsoft 365 → Ready to use

**Azure Hierarchy:**
```
Management Group → Subscription → Resource Group → Resource
```

**Regions & Availability:**
- **Regions**: 60+ worldwide
- **Availability Zones**: 3+ per enabled region (99.99% SLA)
- **Region Pairs**: Disaster recovery across 500+ miles

---

#### 2. **Compute Services Comparison**

| Service | Use When | Pricing | Scaling |
|---------|----------|---------|---------|
| **App Service** | Always-on web apps | Per instance | Auto/Manual |
| **Functions** | Event-driven tasks | Per execution | Automatic |
| **AKS** | Complex microservices | Per node | HPA/CA |
| **Container Instances** | Simple containers | Per second | Manual |

**Decision Tree:**
```
Need containers? 
  ├─ Complex orchestration? → AKS
  └─ Simple workload? → ACI

Web app or API?
  ├─ Always running? → App Service
  └─ Event-driven? → Functions
```

---

#### 3. **Storage Services**

| Service | Type | Use Case | Max Size |
|---------|------|----------|----------|
| **Blob** | Object | Documents, media, backups | 190 TiB |
| **Queue** | Message | Async communication | 64 KB/msg |
| **Table** | NoSQL | Flexible schema data | 1 MB/entity |
| **File** | SMB/NFS | File shares | 100 TiB |

**Blob Tiers:**
- **Hot**: Frequent access, higher storage cost, lower access cost
- **Cool**: Infrequent access (30+ days), lower storage cost
- **Archive**: Rare access (180+ days), lowest cost, hours to retrieve

---

#### 4. **Database Selection**

| Database | Type | Use When | Global Scale |
|----------|------|----------|--------------|
| **SQL Database** | Relational | Complex queries, ACID | Limited |
| **Cosmos DB** | NoSQL | Global apps, low latency | Excellent |
| **PostgreSQL/MySQL** | Relational | Open-source preference | Limited |

**Cosmos DB Consistency Levels:**
1. **Strong**: Linearizable (highest consistency, highest latency)
2. **Bounded Staleness**: Max lag by time/operations
3. **Session**: Consistent within session (default)
4. **Consistent Prefix**: No out-of-order reads
5. **Eventual**: Lowest consistency, lowest latency

---

#### 5. **Networking Essentials**

**VNet Concepts:**
```
VNet (10.0.0.0/16)
  ├─ Subnet 1 (10.0.1.0/24) - Web Tier
  ├─ Subnet 2 (10.0.2.0/24) - App Tier
  └─ Subnet 3 (10.0.3.0/24) - Data Tier
```

**NSG Rules:**
- Priority: 100-4096 (lower = higher priority)
- Default: Allow VNet, Allow Load Balancer, Deny All Inbound

**Load Balancing:**
- **Load Balancer**: Layer 4 (TCP/UDP), Regional
- **Application Gateway**: Layer 7 (HTTP/HTTPS), Regional, WAF
- **Traffic Manager**: DNS-based, Global
- **Front Door**: Layer 7, Global, CDN

---

#### 6. **Messaging Services**

| Service | Pattern | Ordering | Throughput | Best For |
|---------|---------|----------|------------|----------|
| **Storage Queue** | FIFO | Best effort | Medium | Simple queuing |
| **Service Bus** | Queue/Topic | Yes | High | Enterprise messaging |
| **Event Grid** | Pub-Sub | No | Very High | Event reactions |
| **Event Hubs** | Streaming | Yes | Very High | Big data streaming |

**When to Use:**
- **Service Bus**: Critical messages, transactions, ordering required
- **Event Grid**: React to Azure events, serverless architectures
- **Event Hubs**: Telemetry, logs, IoT data streams
- **Storage Queue**: Simple async communication

---

#### 7. **Azure Active Directory**

**Authentication Methods:**
- Password + MFA
- Passwordless (FIDO2, Microsoft Authenticator)
- Conditional Access

**Built-in RBAC Roles:**
- **Owner**: Full access + RBAC management
- **Contributor**: Full access except RBAC
- **Reader**: Read-only access

**Managed Identities:**
```csharp
// No credentials needed!
var client = new SecretClient(
    new Uri("https://myvault.vault.azure.net"),
    new DefaultAzureCredential());
```

- **System-Assigned**: Tied to resource lifecycle
- **User-Assigned**: Shared across resources

---

#### 8. **Security Best Practices**

**Key Vault:**
- Store secrets, keys, certificates
- Use Managed Identities for access
- Enable soft-delete and purge protection
- Separate vaults per environment

**RBAC:**
- Apply least privilege principle
- Use built-in roles when possible
- Assign at appropriate scope
- Regular access reviews

**Network Security:**
- Use NSGs for traffic filtering
- Implement defense in depth
- Use Private Endpoints for Azure services
- Enable DDoS protection for public IPs

---

#### 9. **Monitoring & Application Insights**

**Key Metrics to Monitor:**
- **Requests**: Response time, failure rate
- **Dependencies**: External call performance
- **Exceptions**: Error rates and types
- **Availability**: Uptime percentage
- **Custom Events**: Business metrics

**KQL Essentials:**
```kql
// Failed requests
requests | where success == false

// Slow queries
dependencies | where duration > 1000

// Custom events
customEvents | where name == "OrderPlaced"
```

**Alerting:**
- Metric Alerts: Threshold-based
- Log Alerts: Query-based
- Action Groups: Email, SMS, Functions, Webhooks

---

#### 10. **DevOps & CI/CD**

**Azure DevOps Components:**
- **Repos**: Git repositories
- **Pipelines**: CI/CD automation
- **Boards**: Agile planning
- **Artifacts**: Package management
- **Test Plans**: Testing tools

**Pipeline Stages:**
```yaml
Build → Test → Publish → Deploy
```

**Deployment Strategies:**
- **Blue-Green**: Two identical environments
- **Canary**: Gradual rollout
- **Rolling**: Sequential updates
- **Deployment Slots**: App Service staging

---

#### 11. **Infrastructure as Code**

| Tool | Scope | Syntax | State |
|------|-------|--------|-------|
| **ARM** | Azure | JSON | Azure-managed |
| **Bicep** | Azure | DSL | Azure-managed |
| **Terraform** | Multi-cloud | HCL | Self-managed |

**Bicep Example:**
```bicep
resource storage 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: 'mystorageaccount'
  location: 'eastus'
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
}
```

---

#### 12. **Cost Optimization**

**Strategies:**
1. **Right-Sizing**: Match resources to actual usage
2. **Reserved Instances**: 1-3 year commitment (up to 72% savings)
3. **Azure Hybrid Benefit**: Use existing licenses (up to 85% savings)
4. **Auto-Scaling**: Scale in during low usage
5. **Storage Tiers**: Use Cool/Archive for infrequent data
6. **Spot VMs**: Use spare capacity (up to 90% discount)
7. **Dev/Test Pricing**: Special pricing for non-prod

**Cost Management Tools:**
- Azure Cost Management + Billing
- Azure Advisor recommendations
- Budget alerts
- Resource tagging for allocation

---

#### 13. **High Availability & Disaster Recovery**

**HA Strategies:**
- **Availability Zones**: 99.99% SLA
- **Availability Sets**: 99.95% SLA
- **Load Balancing**: Distribute traffic
- **Auto-Scaling**: Handle traffic spikes

**DR Strategies (RTO/RPO):**
1. **Backup & Restore**: High RTO/RPO, lowest cost
2. **Pilot Light**: Medium RTO/RPO, moderate cost
3. **Warm Standby**: Low RTO/RPO, higher cost
4. **Hot Standby**: Lowest RTO/RPO, highest cost

**Storage Redundancy:**
- **LRS**: 3 copies in one datacenter
- **ZRS**: 3 copies across availability zones
- **GRS**: 6 copies (3 local + 3 in paired region)
- **GZRS**: ZRS + GRS

---

#### 14. **Scaling Strategies**

**Vertical Scaling (Scale Up/Down):**
- Increase/decrease resource size
- Simpler, may require downtime
- Good for: Databases, legacy apps

**Horizontal Scaling (Scale Out/In):**
- Add/remove instances
- Better availability, requires stateless design
- Good for: Web apps, APIs, microservices

**Auto-Scaling Rules:**
```json
{
  "metric": "CpuPercentage",
  "threshold": 70,
  "action": "Increase",
  "cooldown": "PT5M"
}
```

---

### Common Interview Questions - Quick Answers

**Q: When to use App Service vs Functions vs AKS?**
- **App Service**: Always-on web apps/APIs
- **Functions**: Event-driven, short-running tasks
- **AKS**: Complex microservices with orchestration

**Q: SQL Database vs Cosmos DB?**
- **SQL**: Relational, complex queries, ACID
- **Cosmos DB**: Global scale, low latency, flexible schema

**Q: Service Bus vs Event Grid vs Event Hubs?**
- **Service Bus**: Enterprise messaging, ordering
- **Event Grid**: Event reactions, serverless
- **Event Hubs**: Big data streaming

**Q: How to secure secrets?**
- Use Azure Key Vault
- Access via Managed Identity
- Never hardcode in application

**Q: How to achieve 99.99% availability?**
- Deploy across Availability Zones
- Use Load Balancer with health probes
- Implement auto-scaling
- Design for failure

**Q: How to optimize costs?**
- Right-size resources
- Use Reserved Instances
- Implement auto-scaling
- Use appropriate storage tiers
- Enable Azure Hybrid Benefit

**Q: ARM vs Bicep vs Terraform?**
- **Bicep**: Azure-only, simpler syntax, recommended for new projects
- **Terraform**: Multi-cloud, mature ecosystem, state management
- **ARM**: Legacy, complete Azure API coverage

**Q: How does Managed Identity work?**
1. Enable on Azure resource
2. Azure AD creates service principal
3. Grant permissions (RBAC)
4. App requests token from IMDS
5. Use token to access Azure services

---

### Architecture Patterns

**Three-Tier Web Application:**
```
Users → Front Door (CDN) → Application Gateway (WAF)
  → Web App (Frontend) → App Service (API)
  → SQL Database / Cosmos DB
```

**Microservices on AKS:**
```
API Management → AKS (Ingress Controller)
  → Service Mesh → Microservices
  → Azure SQL / Cosmos DB / Redis Cache
  → Service Bus (async communication)
```

**Serverless Event-Driven:**
```
Event Source → Event Grid → Azure Function
  → Cosmos DB / Service Bus
  → Application Insights (monitoring)
```

**Hybrid Cloud:**
```
On-Premises → VPN Gateway / ExpressRoute
  → Azure VNet → Azure Services
  → Azure AD (identity)
  → Azure Backup (DR)
```

---

### Key Takeaways for Interviews

✅ **Understand service selection criteria** - Know when to use each service
✅ **Know pricing models** - Per instance, per execution, per throughput
✅ **Security first** - Managed Identity, Key Vault, RBAC, NSG
✅ **Design for scale** - Auto-scaling, load balancing, stateless design
✅ **Monitor everything** - Application Insights, alerts, dashboards
✅ **Automate deployments** - IaC, CI/CD pipelines
✅ **Cost optimization** - Reserved instances, right-sizing, auto-scaling
✅ **High availability** - Availability zones, region pairs, redundancy
✅ **Know the trade-offs** - Consistency vs availability, cost vs performance

---

### Common Pitfalls to Avoid

❌ Hardcoding connection strings and secrets
❌ Not implementing retry logic for transient failures
❌ Ignoring cost monitoring and budget alerts
❌ Over-provisioning resources
❌ Not using Managed Identities
❌ Single region deployments for critical apps
❌ Not implementing proper monitoring and alerting
❌ Storing sensitive data without encryption
❌ Not using Infrastructure as Code
❌ Ignoring security best practices (NSG, WAF, DDoS)

---

### Azure Services Cheat Sheet

**Compute:**
- App Service, Functions, AKS, Container Instances, VMs

**Storage:**
- Blob, Queue, Table, File, Disk

**Database:**
- SQL Database, Cosmos DB, PostgreSQL, MySQL

**Networking:**
- VNet, NSG, Load Balancer, Application Gateway, Traffic Manager, Front Door

**Identity:**
- Azure AD, Managed Identities

**Security:**
- Key Vault, Security Center, Azure Policy

**Integration:**
- API Management, Service Bus, Event Grid, Event Hubs, Logic Apps

**Monitoring:**
- Application Insights, Monitor, Log Analytics

**DevOps:**
- Azure DevOps, GitHub Actions

**IaC:**
- ARM Templates, Bicep, Terraform

---

## Interview Preparation Checklist

- [ ] Understand IaaS vs PaaS vs SaaS with examples
- [ ] Know when to use App Service vs Functions vs AKS
- [ ] Understand Azure storage options and use cases
- [ ] Compare SQL Database vs Cosmos DB
- [ ] Explain VNet, subnets, and NSG
- [ ] Understand load balancing options
- [ ] Know Azure AD authentication and authorization
- [ ] Explain Managed Identities and their benefits
- [ ] Understand Azure Key Vault best practices
- [ ] Compare messaging services (Service Bus, Event Grid, Event Hubs)
- [ ] Know Application Insights features
- [ ] Understand CI/CD with Azure DevOps or GitHub Actions
- [ ] Know IaC options (ARM, Bicep, Terraform)
- [ ] Understand RBAC and security best practices
- [ ] Know cost optimization strategies
- [ ] Understand HA and DR strategies
- [ ] Explain auto-scaling concepts
- [ ] Be able to design a three-tier application on Azure
- [ ] Understand hybrid cloud scenarios
- [ ] Know Azure compliance and governance tools

---

**Good luck with your Azure Cloud FullStack Developer interview! 🚀**

---

**Document Version:** 1.0  
**Last Updated:** November 19, 2025  
**Maintained by:** Interview Preparation Team

