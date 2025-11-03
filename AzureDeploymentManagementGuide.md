# 🚀 Azure Deployment & Management Guide

## Comprehensive Notes for Building, Deploying & Managing Production-Ready Applications on Azure

**Last Updated:** November 2, 2025  
**Difficulty Level:** Intermediate to Advanced  
**Estimated Prep Time:** 25-35 hours  
**Use Case:** Full-stack development with React, TypeScript, and Power BI dashboard embedding on Azure

---

## 📋 Table of Contents

1. [Introduction & Architecture Overview](#introduction--architecture-overview)
2. [Part 1: Azure Fundamentals](#part-1-azure-fundamentals)
3. [Part 2: Azure App Services](#part-2-azure-app-services)
4. [Part 3: Azure Functions](#part-3-azure-functions)
5. [Part 4: Azure AD (Entra ID) Authentication](#part-4-azure-ad-entra-id-authentication)
6. [Part 5: Networking & Security](#part-5-networking--security)
7. [Part 6: Monitoring & Performance](#part-6-monitoring--performance)
8. [Part 7: CI/CD & DevOps](#part-7-cicd--devops)
9. [Part 8: Real-World Implementation Patterns](#part-8-real-world-implementation-patterns)
10. [Part 9: Best Practices & Scaling](#part-9-best-practices--scaling)
11. [MCQs & Subjective Q&A](#mcqs--subjective-qa)
12. [TLDR Summary](#tldr-summary)

---

# Introduction & Architecture Overview

## Problem Statement

You need to build and deploy a responsive web application that:

- Embeds Power BI dashboards using JavaScript SDK
- Authenticates users securely with Azure AD
- Scales efficiently for multiple teams and users
- Maintains performance and reliability 24/7
- Ensures data security and compliance

## Recommended Azure Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Users (Web Browser)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTPS
                    ┌────────▼────────┐
                    │  Azure App      │
                    │  Services       │
                    │  (React SPA +   │
                    │   Node.js API)  │
                    └────────┬────────┘
         ┌──────────────────┼──────────────────┐
         │                  │                  │
         │                  │                  │
    ┌────▼────┐      ┌─────▼─────┐     ┌─────▼──────┐
    │ Azure AD │      │   Azure   │     │    Azure   │
    │ (Entra   │      │ Functions │     │   SQL DB/  │
    │  ID)     │      │           │     │   Cosmos   │
    └──────────┘      │ (Token    │     └────────────┘
                      │  Gen,     │
                      │  Data     │
                      │  Process) │
                      └───────────┘
                            │
                      ┌─────▼─────┐
                      │  Power BI  │
                      │  REST API  │
                      └────────────┘
```

**Key Components:**

1. **Frontend**: React SPA served by Azure App Services
2. **Backend**: Node.js API in Azure App Services
3. **Authentication**: Azure AD (Entra ID) for secure login
4. **Serverless**: Azure Functions for token generation and data processing
5. **Database**: Azure SQL Database or Cosmos DB for data persistence
6. **Monitoring**: Application Insights for observability

---

# Part 1: Azure Fundamentals

## 1.1 Azure Core Concepts

### What is Azure?

Microsoft Azure is a comprehensive cloud platform providing Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS) solutions. It enables organizations to build, deploy, and manage applications globally.

**Key Azure Advantages for Our Use Case:**

- **Global Infrastructure**: Data centers in 60+ regions
- **Enterprise Integration**: Seamless Active Directory integration
- **Scalability**: Auto-scale resources based on demand
- **Security**: Compliance with GDPR, HIPAA, ISO 27001, SOC 2
- **Cost Efficiency**: Pay-as-you-go model; free tier available for development

### Azure Subscription & Resource Groups

**Subscription**: A billing container and organizational unit for Azure resources.

```
Azure Account
  └── Subscription (e.g., "Production", "Development")
        └── Resource Groups (e.g., "PowerBI-App-RG", "Database-RG")
              ├── App Service (Frontend + API)
              ├── Azure Functions
              ├── Azure SQL Database
              ├── Key Vault
              └── Application Insights
```

**Resource Group**: Logical container for resources deployed together for easier management, billing, and access control.

**Example Azure Resource Hierarchy:**

```bash
# Subscription: prod-subscription-001
# └── Resource Group: powerbi-app-rg (Region: East US)
#     ├── App Service: powerbi-app-prod (contains frontend + backend)
#     ├── App Service Plan: powerbi-plan-prod (Standard S1)
#     ├── Function App: powerbi-functions-prod
#     ├── SQL Database: powerbi-sqldb-prod
#     ├── Key Vault: powerbi-vault-prod
#     ├── Application Insights: powerbi-insights-prod
#     └── Virtual Network: powerbi-vnet-prod
```

### Azure Regions & Availability Zones

**Regions**: Geographic areas with multiple data centers.

**Availability Zones**: Multiple isolated data centers within a region for high availability.

**Best Practice**: Deploy to at least 2 regions for disaster recovery.

```typescript
// Example: Primary in East US, Backup in West Europe
const primaryRegion = "eastus"; // USA East Coast
const backupRegion = "westeurope"; // Europe
```

---

## 1.2 Azure Portal & CLI

### Azure Portal (GUI)

The web-based interface for managing Azure resources.

**Access**: https://portal.azure.com

**Common Tasks:**

- Create and manage resources
- View billing and usage
- Monitor application health
- Configure security policies

### Azure CLI (Command Line)

Command-line tool for managing Azure resources programmatically.

**Installation:**

```bash
# Windows PowerShell
choco install azure-cli

# macOS
brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

**Basic Commands:**

```bash
# Login to Azure
az login

# Set default subscription
az account set --subscription "Production"

# Create resource group
az group create --name powerbi-app-rg --location eastus

# List all resources
az resource list --resource-group powerbi-app-rg

# Delete a resource
az group delete --name powerbi-app-rg --yes
```

### Azure Resource Manager (ARM) Templates & Bicep

Infrastructure-as-Code approach for defining Azure resources.

**Bicep Example** (Modern, recommended):

```bicep
// main.bicep
param environment string = 'dev'
param location string = resourceGroup().location

var appServicePlanName = 'powerbi-plan-${environment}'
var appServiceName = 'powerbi-app-${environment}'

resource appServicePlan 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: appServicePlanName
  location: location
  sku: {
    name: 'S1'
    capacity: 1
  }
  kind: 'linux'
}

resource appService 'Microsoft.Web/sites@2021-02-01' = {
  name: appServiceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
      appSettings: [
        {
          name: 'NODE_ENV'
          value: environment
        }
        {
          name: 'AZURE_AD_CLIENT_ID'
          value: 'your-client-id'
        }
      ]
    }
  }
}

output appServiceUrl string = appService.properties.defaultHostName
```

**Deploy Bicep:**

```bash
# Validate
az bicep build main.bicep

# Deploy
az deployment group create \
  --resource-group powerbi-app-rg \
  --template-file main.bicep \
  --parameters environment=prod
```

---

# Part 2: Azure App Services

## 2.1 What is Azure App Services?

Azure App Services is a fully managed Platform-as-a-Service (PaaS) for building and hosting web apps, mobile backends, and RESTful APIs.

**Supported Runtimes:**

- Node.js
- .NET
- Python
- Java
- Ruby
- PHP

**Ideal For:**

- Web applications (React, Angular, Vue)
- REST APIs (Express, FastAPI, Spring Boot)
- Mobile backends
- Microservices

### Advantages:

✅ No infrastructure management  
✅ Built-in auto-scaling  
✅ Continuous deployment via Git  
✅ Custom domain support  
✅ SSL/TLS certificates (free)  
✅ Application health checks

### Disadvantages:

❌ Less control than IaaS  
❌ Cold starts for long-idle apps  
❌ Limited to specific runtimes

---

## 2.2 Setting Up Azure App Services

### Step 1: Create App Service Plan

An App Service Plan defines the compute resources (CPU, memory, region) and pricing tier.

**Compute Resources by SKU Tier:**

| SKU            | vCPU   | Memory  | Storage | Max Instances | Use Case     | Price    |
| -------------- | ------ | ------- | ------- | ------------- | ------------ | -------- |
| F1 (Free)      | Shared | 1 GB    | 1 GB    | 1             | Dev/Test     | Free     |
| B1 (Basic)     | 1      | 1.75 GB | 10 GB   | 3             | Small apps   | $0.01/hr |
| B2 (Basic)     | 2      | 3.5 GB  | 10 GB   | 3             | Medium apps  | $0.03/hr |
| S1 (Standard)  | 1      | 1.75 GB | 50 GB   | 10            | Production   | $0.10/hr |
| S2 (Standard)  | 2      | 3.5 GB  | 50 GB   | 10            | High traffic | $0.20/hr |
| S3 (Standard)  | 4      | 7 GB    | 50 GB   | 10            | Very high    | $0.40/hr |
| P1V2 (Premium) | 1      | 3.5 GB  | 250 GB  | 20            | Enterprise   | $0.30/hr |
| P2V2 (Premium) | 2      | 7 GB    | 250 GB  | 20            | Enterprise   | $0.60/hr |

**Key Differences:**

1. **Tier Class** (F/B/S/P):

   - **F**: Shared infrastructure, limited
   - **B**: Basic for simple apps
   - **S**: Standard, production ready
   - **P**: Premium, enterprise features

2. **Features**:

   - **F/B**: No auto-scaling, limited deployments
   - **S**: Auto-scaling, custom domains
   - **P**: Auto-scaling, VNet integration, staging slots

3. **Infrastructure**:
   - **Free**: Multi-tenant, shared resources
   - **B/S/P**: Dedicated VM instances

**Decision Guide:**

```
Is it production?
  ├─ NO → F1 (Free) ✓
  └─ YES → How much traffic?
       ├─ < 100 req/sec → B1 or S1 ✓
       ├─ 100-500 req/sec → S2 or S3 ✓
       └─ > 500 req/sec → P1V2+ ✓ (or multiple S3 instances)
```

**Scaling Strategy Examples:**

```
Scenario 1: Growing SaaS App
Month 1: F1 (free tier, testing)
  ↓
Month 2-3: B1 (small user base)
  ↓
Month 4-6: S1 (production, growing users)
  ↓
Month 7+: S2/S3 with auto-scaling (scale horizontally)

Scenario 2: Enterprise Application
Start with: P1V2 (dedicated infrastructure)
Auto-scale: 2-10 instances based on CPU/memory
Monitor: Application Insights for bottlenecks
Optimize: Move to S2/S3 if not fully utilized
```

```bash
# Create App Service Plan with monitoring for future scaling
az appservice plan create \
  --name powerbi-plan-prod \
  --resource-group powerbi-app-rg \
  --sku S1 \
  --is-linux \
  --number-of-workers 2

# Later: Upgrade to S2 when CPU consistently > 70%
az appservice plan update \
  --name powerbi-plan-prod \
  --resource-group powerbi-app-rg \
  --sku S2

# Set up auto-scaling to handle spikes
az monitor autoscale create \
  --resource-group powerbi-app-rg \
  --resource-name powerbi-plan-prod \
  --resource-type "Microsoft.Web/serverfarms" \
  --min-count 2 \
  --max-count 10 \
  --count 2
```

### Step 2: Create Web App

```bash
az webapp create \
  --resource-group powerbi-app-rg \
  --plan powerbi-plan-prod \
  --name powerbi-app-prod \
  --runtime "NODE:18-lts"
```

### Step 3: Configure Application Settings

Store configuration in Azure instead of hardcoding.

```bash
# Via CLI
az webapp config appsettings set \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod \
  --settings \
    NODE_ENV=production \
    AZURE_AD_TENANT_ID=your-tenant-id \
    AZURE_AD_CLIENT_ID=your-client-id \
    POWERBI_WORKSPACE_ID=your-workspace-id

# Retrieve settings
az webapp config appsettings list \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod
```

**Best Practice**: Store sensitive data (API keys, secrets) in Azure Key Vault, not as app settings.

### Step 4: Deploy Application

#### Option A: Deploy from Local Git

```bash
# Initialize local git repository
git init
git add .
git commit -m "Initial commit"

# Setup deployment
az webapp deployment user set \
  --user-name "your-username" \
  --password "your-password"

# Get Git URL
git remote add azure https://your-username@powerbi-app-prod.scm.azurewebsites.net/powerbi-app-prod.git

# Deploy
git push azure main
```

#### Option B: Deploy from GitHub (Recommended)

```bash
az webapp deployment github-actions add \
  --repo-url https://github.com/your-org/powerbi-app \
  --branch main \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod
```

This creates a GitHub Actions workflow automatically.

#### Option C: Deploy from Zip File

```bash
# Create deployment package
zip -r deploy.zip . -x "node_modules/*" ".git/*"

# Deploy
az webapp deployment source config-zip \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod \
  --src-path deploy.zip
```

---

## 2.3 Configuring Node.js App on Azure App Services

### Dockerfile for Containerization (Optional)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

CMD ["node", "server.js"]
```

### Startup Command

Configure how Azure starts your Node.js app:

```bash
# Via CLI
az webapp config set \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod \
  --startup-file "node server.js"

# Or in Azure Portal: Configuration → Startup Command
```

### Application Code Example

```typescript
// server.ts - Express backend
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint (Azure App Services)
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// API endpoint for Power BI token generation
app.post("/api/power-bi/embed-token", async (req: Request, res: Response) => {
  try {
    const { reportId, userId } = req.body;

    // Validate user authorization
    if (!isUserAuthorized(userId, reportId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Generate embed token via Azure Function
    const token = await generateEmbedToken(reportId, userId);

    res.json({
      token: token.token,
      expiration: token.expiration,
    });
  } catch (error) {
    console.error("Token generation failed:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

// Static file serving (React SPA)
app.use(express.static("public"));

// Fallback to index.html for SPA routing
app.get("*", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function isUserAuthorized(
  userId: string,
  reportId: string
): Promise<boolean> {
  // Implement authorization logic
  return true;
}

async function generateEmbedToken(
  reportId: string,
  userId: string
): Promise<any> {
  // Call Azure Function to generate token
  const response = await fetch(
    `${process.env.AZURE_FUNCTIONS_URL}/generate-token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId, userId }),
    }
  );
  return response.json();
}
```

---

## 2.4 Auto-Scaling & Performance

### Configure Auto-Scale

```bash
# Create auto-scale rule
az monitor autoscale create \
  --resource-group powerbi-app-rg \
  --resource-name powerbi-plan-prod \
  --resource-type "Microsoft.Web/serverfarms" \
  --min-count 2 \
  --max-count 10 \
  --count 2
```

**Example Auto-Scale Metrics:**

```bash
# Scale out when CPU > 70%
az monitor autoscale rule create \
  --autoscale-name powerbi-autoscale \
  --resource-group powerbi-app-rg \
  --condition "Percentage CPU > 70 avg 5m 2 times" \
  --scale out 2

# Scale in when CPU < 30%
az monitor autoscale rule create \
  --autoscale-name powerbi-autoscale \
  --resource-group powerbi-app-rg \
  --condition "Percentage CPU < 30 avg 5m 1 times" \
  --scale in 1
```

### Performance Tuning

**1. Enable Compression:**

```typescript
import compression from "compression";
app.use(compression());
```

**2. Implement Caching:**

```typescript
// HTTP caching headers
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=3600"); // 1 hour
  next();
});
```

**3. Use Content Delivery Network (CDN):**

```bash
# Create Azure CDN
az cdn profile create \
  --resource-group powerbi-app-rg \
  --name powerbi-cdn \
  --sku Standard_Microsoft

az cdn endpoint create \
  --resource-group powerbi-app-rg \
  --profile-name powerbi-cdn \
  --name powerbi-cdn-endpoint \
  --origin powerbi-app-prod.azurewebsites.net
```

---

# Part 3: Azure Functions

## 3.1 What are Azure Functions?

Azure Functions is a serverless compute service that lets you run code in response to events without managing infrastructure.

**Key Characteristics:**

- **Pay-per-execution**: Only pay for compute time used
- **Event-driven**: Triggered by HTTP requests, timers, messages, etc.
- **Stateless**: Each invocation is independent
- **Scalable**: Automatically handles thousands of concurrent requests
- **Quick cold starts**: Usually < 1 second

### Triggers & Bindings

**Triggers**: Events that invoke the function. Each function has exactly ONE trigger.

**Bindings**: Connections to Azure resources for reading input or writing output. Optional, can have multiple.

#### Common Triggers

| Trigger          | Activation             | Use Case                        |
| ---------------- | ---------------------- | ------------------------------- |
| **HTTP**         | HTTP request           | REST APIs, webhooks             |
| **Timer**        | Schedule (cron)        | Background jobs, cleanup        |
| **Queue**        | Message in Azure Queue | Async processing                |
| **Service Bus**  | Message in Service Bus | Enterprise messaging            |
| **Blob Storage** | File created/updated   | Image processing, file triggers |
| **Cosmos DB**    | Document change        | Real-time data sync             |
| **Event Grid**   | Event published        | Event-driven architecture       |

#### Common Bindings

| Binding           | Type         | Use Case               |
| ----------------- | ------------ | ---------------------- |
| **Blob Storage**  | Input/Output | Read/write files       |
| **Queue Storage** | Output       | Queue messages         |
| **Cosmos DB**     | Input/Output | Read/write database    |
| **Table Storage** | Input/Output | NoSQL table operations |
| **Service Bus**   | Output       | Send messages          |
| **HTTP**          | Output       | Send HTTP response     |
| **SQL Database**  | Input/Output | SQL queries            |

#### Trigger & Binding Examples

**Example 1: HTTP Trigger + Blob Storage Input Binding**

```typescript
// Read a file from Blob Storage when HTTP request comes in
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
  inputBlob: string // Input binding from Blob Storage
): Promise<void> {
  context.log("Function triggered by HTTP request");

  // inputBlob contains the file content automatically!
  const fileContent = inputBlob;

  context.res = {
    status: 200,
    body: `File content: ${fileContent}`,
  };
};

export default httpTrigger;
```

**function.json:**

```json
{
  "scriptFile": "dist/index.js",
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req"
    },
    {
      "name": "inputBlob",
      "type": "blob",
      "path": "input-container/{id}.txt",
      "connection": "AzureWebJobsStorage",
      "direction": "in"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```

**Example 2: Timer Trigger + Queue Output Binding**

```typescript
// Run every 5 minutes and send message to queue
import { AzureFunction, Context } from "@azure/functions";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  context.log("Timer trigger executed");

  // Output binding: automatically sends to Service Bus
  context.bindings.outputQueue = JSON.stringify({
    message: "Scheduled job executed",
    timestamp: new Date(),
  });
};

export default timerTrigger;
```

**function.json:**

```json
{
  "scriptFile": "dist/index.js",
  "bindings": [
    {
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 */5 * * * *"
    },
    {
      "name": "outputQueue",
      "type": "queue",
      "direction": "out",
      "queueName": "job-queue",
      "connection": "AzureWebJobsStorage"
    }
  ]
}
```

**Example 3: Queue Trigger + Cosmos DB Output Binding**

```typescript
// Process message from queue and save to database
import { AzureFunction, Context } from "@azure/functions";

interface QueueMessage {
  reportId: string;
  userId: string;
}

interface Document {
  id: string;
  reportId: string;
  userId: string;
  timestamp: string;
}

const queueTrigger: AzureFunction = async function (
  context: Context,
  queueItem: QueueMessage
): Promise<void> {
  context.log("Processing queue message:", queueItem);

  // Output binding: automatically saves to Cosmos DB
  const document: Document = {
    id: `${queueItem.userId}-${queueItem.reportId}`,
    reportId: queueItem.reportId,
    userId: queueItem.userId,
    timestamp: new Date().toISOString(),
  };

  context.bindings.outputDocument = document;

  context.log("Document saved to Cosmos DB");
};

export default queueTrigger;
```

**function.json:**

```json
{
  "scriptFile": "dist/index.js",
  "bindings": [
    {
      "name": "queueItem",
      "type": "queueTrigger",
      "direction": "in",
      "queueName": "job-queue",
      "connection": "AzureWebJobsStorage"
    },
    {
      "name": "outputDocument",
      "type": "cosmosDB",
      "direction": "out",
      "databaseName": "PowerBIDB",
      "collectionName": "Reports",
      "connectionStringSetting": "CosmosDBConnection"
    }
  ]
}
```

**Example 4: Blob Storage Trigger + Blob Output Binding (Image Resize)**

```typescript
// When image uploaded, create thumbnail
import { AzureFunction, Context } from "@azure/functions";

const blobTrigger: AzureFunction = async function (
  context: Context,
  myBlob: Buffer // Input: the uploaded file
): Promise<void> {
  context.log("Processing image:", context.bindingData.name);

  // Simulate image resizing
  const thumbnail = resizeImage(myBlob);

  // Output binding: save thumbnail to another container
  context.bindings.outputBlob = thumbnail;

  context.log("Thumbnail created and saved");
};

export default blobTrigger;

function resizeImage(buffer: Buffer): Buffer {
  // Image processing logic using sharp, jimp, etc.
  return buffer;
}
```

**function.json:**

```json
{
  "scriptFile": "dist/index.js",
  "bindings": [
    {
      "name": "myBlob",
      "type": "blobTrigger",
      "direction": "in",
      "path": "uploads/{name}",
      "connection": "AzureWebJobsStorage"
    },
    {
      "name": "outputBlob",
      "type": "blob",
      "direction": "out",
      "path": "thumbnails/{name}",
      "connection": "AzureWebJobsStorage"
    }
  ]
}
```

#### Binding Patterns

**Pattern 1: Fan-Out (One input, multiple outputs)**

```
Queue message → Function → Split into 3 outputs
                 ├─ Save to Cosmos DB
                 ├─ Send email via SendGrid
                 └─ Log to Application Insights
```

**Pattern 2: Fan-In (Multiple inputs, one output)**

```
Timer trigger → Fetch from 3 sources
  ├─ SQL Database
  ├─ API endpoint
  └─ Blob Storage
  └─ Aggregate → Send to Dashboard
```

**Pattern 3: Pipeline (Chain of functions)**

```
HTTP request → Function 1 (validate) → Queue
              → Function 2 (process) → Cosmos DB
              → Function 3 (notify) → Email
```

```typescript
// HTTP Trigger + Queue Output Binding
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const { reportId, userId } = req.body;

  // Output: Send to queue for async processing
  context.bindings.outputQueue = {
    reportId,
    userId,
    createdAt: new Date(),
  };

  context.res = {
    status: 202, // Accepted
    body: "Request queued for processing",
  };
};

export default httpTrigger;
```

---

## 3.2 Implementing Azure Functions for Power BI Token Generation

### Scenario: Generate Embed Tokens Securely

```typescript
// generate-token/index.ts
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { PowerBIClient } from "powerbi-api-typescript-client";
import { PublicClientApplication } from "@azure/msal-node";
import { ClientSecretCredential } from "@azure/identity";

const generateToken: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const { reportId, userId, roles } = req.body;

    // Validate inputs
    if (!reportId || !userId) {
      context.res = {
        status: 400,
        body: JSON.stringify({ error: "reportId and userId are required" }),
      };
      return;
    }

    // Authenticate with Azure AD using Service Principal
    const credential = new ClientSecretCredential(
      process.env.AZURE_TENANT_ID,
      process.env.AZURE_CLIENT_ID,
      process.env.AZURE_CLIENT_SECRET
    );

    // Create Power BI client
    const powerbiClient = new PowerBIClient(credential);

    // Generate embed token
    const embedTokenRequest = {
      reports: [{ id: reportId }],
      datasets: [{ id: process.env.POWERBI_DATASET_ID }],
      identities: [
        {
          username: userId,
          roles: roles || ["DefaultRole"],
        },
      ],
    };

    const tokenResponse = await powerbiClient.embedTokens.generateToken(
      process.env.POWERBI_WORKSPACE_ID,
      embedTokenRequest
    );

    // Log for audit trail
    context.log.info(
      `Generated embed token for user: ${userId}, report: ${reportId}`
    );

    context.res = {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: tokenResponse.token,
        expiration: tokenResponse.expiration,
        embedUrl: process.env.POWERBI_EMBED_URL,
      }),
    };
  } catch (error) {
    context.log.error("Token generation failed:", error);

    context.res = {
      status: 500,
      body: JSON.stringify({
        error: "Failed to generate embed token",
      }),
    };
  }
};

export default generateToken;
```

### function.json Configuration

```json
{
  "scriptFile": "dist/generate-token/index.js",
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["post"],
      "route": "generate-token"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "$return"
    }
  ]
}
```

### Deploy Azure Function

```bash
# Create Function App
az functionapp create \
  --resource-group powerbi-app-rg \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 18 \
  --functions-version 4 \
  --name powerbi-functions-prod \
  --storage-account mystorageaccount

# Deploy function code
func azure functionapp publish powerbi-functions-prod

# Set application settings
az functionapp config appsettings set \
  --name powerbi-functions-prod \
  --resource-group powerbi-app-rg \
  --settings \
    AZURE_TENANT_ID=your-tenant-id \
    AZURE_CLIENT_ID=your-client-id \
    AZURE_CLIENT_SECRET=your-client-secret \
    POWERBI_WORKSPACE_ID=your-workspace-id \
    POWERBI_DATASET_ID=your-dataset-id
```

### Function App Bindings

**Timer Trigger** (Scheduled cleanup):

```typescript
// cleanup-expired-tokens/index.ts
import { AzureFunction, Context } from "@azure/functions";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  if (myTimer.IsPastDue) {
    context.log("Timer function is running late!");
  }

  // Cleanup logic: Delete expired tokens from database
  await cleanupExpiredTokens();

  context.log(`Timer trigger function executed at ${new Date().toISOString()}`);
};

export default timerTrigger;

async function cleanupExpiredTokens() {
  // Implementation
}
```

**function.json:**

```json
{
  "scriptFile": "dist/cleanup-expired-tokens/index.js",
  "bindings": [
    {
      "name": "myTimer",
      "type": "timerTrigger",
      "direction": "in",
      "schedule": "0 0 * * * *"
    }
  ]
}
```

---

# Part 4: Azure AD (Entra ID) Authentication

## 4.1 Azure AD Fundamentals

Azure Active Directory (now called Microsoft Entra ID) is Microsoft's cloud-based identity and access management service.

**Key Concepts:**

- **Tenant**: Organization's Azure AD instance
- **Users**: Individual accounts or service principals
- **Applications**: Registered apps that access Azure AD resources
- **Roles**: Permissions assigned to users (RBAC - Role-Based Access Control)

### Registration Process

**Step 1: Register Application in Azure AD**

```bash
az ad app create \
  --display-name "PowerBI Dashboard App" \
  --sign-in-audience AzureADMultipleOrgs \
  --web-redirect-uris "https://powerbi-app-prod.azurewebsites.net/auth/callback"
```

**Step 2: Create Service Principal**

```bash
az ad sp create --id <app-id>
```

**Step 3: Create Client Secret**

```bash
az ad app credential create \
  --id <app-id> \
  --display-name "PowerBI App Secret" \
  --years 2
```

---

## 4.2 Implementing Azure AD Authentication in React

### Frontend: React Component

```typescript
// src/pages/Login.tsx
import React, { useEffect } from "react";
import {
  PublicClientApplication,
  EventType,
  AuthenticationResult,
} from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const pca = new PublicClientApplication(msalConfig);

// Register callback for successful login
pca.addEventCallback((event: any) => {
  if (
    event.eventType === EventType.LOGIN_SUCCESS ||
    event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
  ) {
    const payload = event.payload as AuthenticationResult;
    console.log("Login successful", payload.account);
  }
});

export function LoginComponent() {
  const { instance, inProgress } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup({
        scopes: ["openid", "profile", "email"],
        prompt: "select_account",
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <button onClick={handleLogin} disabled={inProgress !== "none"}>
      {inProgress === "login" ? "Logging in..." : "Login with Microsoft"}
    </button>
  );
}

export function App() {
  return (
    <MsalProvider instance={pca}>
      <LoginComponent />
    </MsalProvider>
  );
}
```

### Backend: Token Validation

```typescript
// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/v2.0/keys`,
});

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Decode token header to get key ID
    const decoded: any = jwt.decode(token, { complete: true });

    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Get signing key
    const key = await client.getSigningKey(decoded.header.kid);
    const signingKey = key.getPublicKey();

    // Verify token
    const verified = jwt.verify(token, signingKey, {
      algorithms: ["RS256"],
      audience: process.env.AZURE_CLIENT_ID,
      issuer: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,
    });

    req.user = verified;
    next();
  } catch (error) {
    console.error("Token validation failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Usage in routes
app.get("/api/user/profile", authMiddleware, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});
---

## 4.4 Managed Identity (Service Principal Alternative)

Managed Identity provides automatic credential management for Azure services to authenticate with other Azure resources without storing secrets in code.

### Why Managed Identity?

**Traditional Approach (Problematic):**
```

App Service → Hard-coded client secret → Key Vault
↓
└─ Secret still needs to be stored/rotated
└─ If secret leaked, attacker has access
└─ Multiple secrets to manage across environments

```

**Managed Identity Approach (Better):**
```

App Service → Managed Identity → Azure AD token → Key Vault
↓
└─ No secrets in code or environment variables
└─ Azure handles credential rotation automatically
└─ Scoped permissions (RBAC)
└─ Audit trail of access

````

### Two Types of Managed Identity

| Type | Scope | Best For |
|------|-------|----------|
| **System-Assigned** | Single resource | Simple one-to-one auth (App Service to DB) |
| **User-Assigned** | Multiple resources | Complex multi-service scenarios |

### Enable System-Assigned Managed Identity

```bash
# Enable on App Service
az webapp identity assign \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod

# Enable on Function App
az functionapp identity assign \
  --resource-group powerbi-app-rg \
  --name powerbi-functions-prod

# Get the principal ID
PRINCIPAL_ID=$(az webapp identity show \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod \
  --query principalId --output tsv)

echo $PRINCIPAL_ID  # e.g., 12345678-abcd-1234-efgh-ijklmnopqrst
````

### Grant Managed Identity Permissions (RBAC)

```bash
# Get the Key Vault resource ID
VAULT_ID=$(az keyvault show \
  --name powerbi-vault-prod \
  --resource-group powerbi-app-rg \
  --query id --output tsv)

# Grant "Key Vault Secrets User" role to the App Service
az role assignment create \
  --assignee $PRINCIPAL_ID \
  --role "Key Vault Secrets User" \
  --scope $VAULT_ID

# Grant "Cosmos DB Account Reader Role"
COSMOS_ID=$(az cosmosdb show \
  --name powerbi-cosmos \
  --resource-group powerbi-app-rg \
  --query id --output tsv)

az role assignment create \
  --assignee $PRINCIPAL_ID \
  --role "Cosmos DB Account Reader Role" \
  --scope $COSMOS_ID
```

### Use Managed Identity in Code

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";
import { CosmosClient } from "@azure/cosmos";

// Automatically uses Managed Identity to authenticate
const credential = new DefaultAzureCredential();

// Access Key Vault
const secretClient = new SecretClient(
  "https://powerbi-vault-prod.vault.azure.net/",
  credential
);

const dbPassword = await secretClient.getSecret("db-password");

// Access Cosmos DB
const cosmosClient = new CosmosClient({
  endpoint: "https://powerbi-cosmos.documents.azure.com:443/",
  aadCredentials: credential,
});

const database = cosmosClient.database("PowerBIDB");
```

**No secrets needed!** The `DefaultAzureCredential` automatically:

1. Detects Managed Identity is enabled
2. Requests Azure AD token using Managed Identity
3. Uses token to authenticate requests
4. Refreshes token automatically when expired

### User-Assigned Managed Identity (Advanced)

For scenarios where multiple resources share the same identity:

```bash
# Create user-assigned identity
IDENTITY_ID=$(az identity create \
  --resource-group powerbi-app-rg \
  --name shared-identity \
  --query id --output tsv)

# Assign to App Service
az webapp identity assign \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod \
  --identities $IDENTITY_ID

# Assign to Function App
az functionapp identity assign \
  --resource-group powerbi-app-rg \
  --name powerbi-functions-prod \
  --identities $IDENTITY_ID

# Now both services use the same permissions!
```

### Managed Identity vs Service Principal

| Feature                 | Managed Identity          | Service Principal                    |
| ----------------------- | ------------------------- | ------------------------------------ |
| **Secret Management**   | Automatic (no secrets)    | Manual rotation required             |
| **Scope**               | Single resource or shared | Any resource                         |
| **Setup**               | One CLI command           | Requires credential setup            |
| **Credential Exposure** | Zero risk                 | Secret storage risk                  |
| **Cost**                | Free                      | Free                                 |
| **Audit Trail**         | Built-in                  | May need configuration               |
| **Best For**            | Azure-to-Azure auth       | External services, complex scenarios |

### Real-World Scenarios

**Scenario 1: App Service → Key Vault → Cosmos DB**

```
1. Enable Managed Identity on App Service
2. Grant "Key Vault Secrets User" role to Managed Identity
3. In app code: Use DefaultAzureCredential to access Key Vault
4. Retrieve Cosmos DB connection string from Key Vault
5. Connect to Cosmos DB
6. All done! No secrets in code or config.
```

**Scenario 2: Multi-Service Access Pattern**

```
Shared User-Assigned Identity
  ├─ App Service → uses identity → Auth to Cosmos DB
  ├─ Function App → uses identity → Auth to SQL Database
  └─ Logic App → uses identity → Auth to Storage Account

All services authenticate with same permissions!
```

### Define Roles in Azure AD

```bash
# Add app role
az ad app permission add \
  --id <app-id> \
  --api-permissions \
    "https://graph.microsoft.com/Directory.Read.All=Role"
```

### Assign Users to Roles

```bash
az role assignment create \
  --assignee <user-principal-id> \
  --role "PowerBI Dashboard Admin" \
  --scope <resource-id>
```

### Check Roles in Application

```typescript
// src/utils/authUtils.ts
export function hasRole(user: any, role: string): boolean {
  const appRoles = user.roles || [];
  return appRoles.includes(role);
}

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!hasRole(req.user, role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

// Usage
app.delete(
  "/api/reports/:id",
  authMiddleware,
  requireRole("Admin"),
  async (req, res) => {
    // Delete report logic
  }
);
```

---

# Part 5: Networking & Security

## 5.1 Virtual Networks (VNets)

Isolate Azure resources and control traffic flow. A VNet is your private network space in Azure where you can deploy resources and control communication between them.

### Key VNet Concepts

**CIDR Notation**: Address space for your network

- `10.0.0.0/16` = 65,536 IP addresses (10.0.0.0 to 10.0.255.255)
- `10.0.1.0/24` = 256 IP addresses (10.0.1.0 to 10.0.1.255)

**Subnets**: Divide VNet into smaller networks for better organization

- `app-subnet` (10.0.1.0/24): For App Services
- `db-subnet` (10.0.2.0/24): For Databases
- `functions-subnet` (10.0.3.0/24): For Azure Functions

### Create VNet with Multiple Subnets

```bash
# Create VNet
az network vnet create \
  --resource-group powerbi-app-rg \
  --name powerbi-vnet \
  --address-prefix 10.0.0.0/16

# Add application subnet
az network vnet subnet create \
  --resource-group powerbi-app-rg \
  --vnet-name powerbi-vnet \
  --name app-subnet \
  --address-prefix 10.0.1.0/24

# Add database subnet (private, restricted access)
az network vnet subnet create \
  --resource-group powerbi-app-rg \
  --vnet-name powerbi-vnet \
  --name db-subnet \
  --address-prefix 10.0.2.0/24

# Add functions subnet
az network vnet subnet create \
  --resource-group powerbi-app-rg \
  --vnet-name powerbi-vnet \
  --name functions-subnet \
  --address-prefix 10.0.3.0/24
```

### Network Diagram

```
┌────────────────────────────────────────────────────────┐
│         powerbi-vnet (10.0.0.0/16)                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │   app-subnet (10.0.1.0/24) - Public facing      │  │
│  │   ┌──────────────────────────────────────────┐  │  │
│  │   │  App Service (10.0.1.4)                 │  │  │
│  │   │  Inbound: HTTP/HTTPS (0.0.0.0/0)        │  │  │
│  │   └──────────────────────────────────────────┘  │  │
│  └────────────────────┬─────────────────────────────┘  │
│                       │ (VNet peering)                  │
│  ┌────────────────────▼─────────────────────────────┐  │
│  │  db-subnet (10.0.2.0/24) - Private             │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │  SQL Database (10.0.2.5)                │  │  │
│  │  │  Only accessible from app-subnet        │  │  │
│  │  │  Inbound: SQL port 1433 (10.0.1.0/24)  │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  functions-subnet (10.0.3.0/24)                 │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │  Azure Functions (10.0.3.5)             │  │  │
│  │  │  Call APIs from app-subnet              │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### VNet Peering (Connecting Multiple VNets)

When you have multiple environments, connect VNets via peering:

```bash
# Peer two VNets in same region
az network vnet peering create \
  --resource-group powerbi-app-rg \
  --vnet-name powerbi-vnet \
  --name peer-to-dev-vnet \
  --remote-vnet /subscriptions/{sub-id}/resourceGroups/powerbi-dev-rg/providers/Microsoft.Network/virtualNetworks/powerbi-dev-vnet \
  --allow-vnet-access

# Create reverse peering
az network vnet peering create \
  --resource-group powerbi-dev-rg \
  --vnet-name powerbi-dev-vnet \
  --name peer-to-prod-vnet \
  --remote-vnet /subscriptions/{sub-id}/resourceGroups/powerbi-app-rg/providers/Microsoft.Network/virtualNetworks/powerbi-vnet \
  --allow-vnet-access
```

### Use Cases for VNets

| Scenario               | Implementation                                 |
| ---------------------- | ---------------------------------------------- |
| **Multi-tier app**     | Separate subnets for web, API, database layers |
| **Dev/Prod isolation** | Different VNets per environment, no peering    |
| **Disaster recovery**  | VNets in different regions, geo-redundant      |
| **Hybrid cloud**       | VNet-to-On-premises VPN gateway                |
| **Microservices**      | Each service in isolated subnet with NSG rules |

**Example: Microservices Architecture**

```
powerbi-vnet (10.0.0.0/16)
  ├─ gateway-subnet (10.0.0.0/24) → API Gateway
  ├─ auth-subnet (10.0.1.0/24) → Auth Service
  ├─ reporting-subnet (10.0.2.0/24) → Reporting Service
  ├─ payments-subnet (10.0.3.0/24) → Payments Service
  └─ database-subnet (10.0.4.0/24) → Database (no internet access)

Traffic flow:
Internet → API Gateway → Auth Service → Reporting Service → Database
                              ↓
                        No direct internet access to services
                        Each service validates requests
```

---

## 5.2 Network Security Groups (NSGs)

Firewall rules for controlling inbound and outbound traffic to/from Azure resources. NSGs work at the subnet or network interface level.

### NSG Fundamentals

**Priority**: Rules are evaluated in order (lower number = higher priority)

- Priority range: 100 - 4096
- Default rules (65000+): Can't be deleted, only overridden
- First matching rule is applied

**Direction**:

- **Inbound**: Incoming traffic to resources
- **Outbound**: Traffic leaving resources

**Action**: Allow or Deny

### Rule Evaluation Order

```
NSG Rule Evaluation:
1. Check priority 100 rule
2. Check priority 110 rule
3. Check priority 120 rule
   ├─ MATCH? → Apply action (Allow/Deny) and STOP
   └─ NO MATCH → Continue to next rule
4. Check default rules (65000+)
   └─ If no match → ALLOW (default behavior)
```

### Create NSG with Comprehensive Rules

```bash
# Create NSG
az network nsg create \
  --resource-group powerbi-app-rg \
  --name powerbi-nsg

# Rule 1: Allow HTTPS from Internet (Priority 100)
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name powerbi-nsg \
  --name AllowHTTPS \
  --priority 100 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes "*" \
  --destination-port-ranges 443

# Rule 2: Allow HTTP and redirect to HTTPS (Priority 110)
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name powerbi-nsg \
  --name AllowHTTP \
  --priority 110 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes "*" \
  --destination-port-ranges 80

# Rule 3: Allow internal communication (Priority 120)
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name powerbi-nsg \
  --name AllowInternalVNet \
  --priority 120 \
  --direction Inbound \
  --access Allow \
  --protocol "*" \
  --source-address-prefixes "10.0.0.0/16" \
  --destination-address-prefixes "*"

# Rule 4: Deny SSH (Priority 200 - explicit deny)
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name powerbi-nsg \
  --name DenySSH \
  --priority 200 \
  --direction Inbound \
  --access Deny \
  --protocol Tcp \
  --source-address-prefixes "*" \
  --destination-port-ranges 22

# Rule 5: Deny RDP (Priority 210 - explicit deny)
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name powerbi-nsg \
  --name DenyRDP \
  --priority 210 \
  --direction Inbound \
  --access Deny \
  --protocol Tcp \
  --source-address-prefixes "*" \
  --destination-port-ranges 3389

# Outbound: Allow all (default)
# az network nsg rule create \
#   --resource-group powerbi-app-rg \
#   --nsg-name powerbi-nsg \
#   --name AllowOutbound \
#   --priority 100 \
#   --direction Outbound \
#   --access Allow \
#   --protocol "*" \
#   --source-address-prefixes "*" \
#   --destination-address-prefixes "*"
```

### NSG Rule Examples by Scenario

**Scenario 1: Block Specific IP**

```bash
# Block a malicious IP from accessing your app
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name powerbi-nsg \
  --name BlockMaliciousIP \
  --priority 105 \
  --direction Inbound \
  --access Deny \
  --protocol "*" \
  --source-address-prefixes "203.0.113.45" \
  --destination-port-ranges "*"
```

**Scenario 2: Allow Database Access from App Subnet Only**

```bash
# Create separate NSG for database subnet
az network nsg create \
  --resource-group powerbi-app-rg \
  --name db-nsg

# Allow SQL traffic only from app-subnet
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name db-nsg \
  --name AllowSQLFromApp \
  --priority 100 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --source-address-prefixes "10.0.1.0/24" \
  --destination-port-ranges 1433

# Deny all other inbound traffic
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name db-nsg \
  --name DenyAllInbound \
  --priority 4096 \
  --direction Inbound \
  --access Deny \
  --protocol "*" \
  --source-address-prefixes "*" \
  --destination-port-ranges "*"
```

**Scenario 3: Multi-Environment Access**

```bash
# Allow on-premises access via VPN
az network nsg rule create \
  --resource-group powerbi-app-rg \
  --nsg-name powerbi-nsg \
  --name AllowVPN \
  --priority 130 \
  --direction Inbound \
  --access Allow \
  --protocol "*" \
  --source-address-prefixes "203.0.113.0/24" \
  --destination-address-prefixes "*"
```

### NSG vs Azure Firewall

| Feature      | NSG                 | Azure Firewall              |
| ------------ | ------------------- | --------------------------- |
| **Scope**    | Subnet/NIC level    | Hub/Spoke network           |
| **Stateful** | Yes (bidirectional) | Yes (bidirectional)         |
| **Features** | Basic rules         | Advanced threat protection  |
| **Cost**     | Low (per NSG)       | Higher (per hour)           |
| **Use Case** | Simple rules        | Complex enterprise policies |
| **Example**  | Allow port 443      | Block malware, advanced DLP |

**When to use NSG**: Simple projects, subnet-level control  
**When to use Firewall**: Enterprise hub-and-spoke, IDS/IPS needed

### Assign NSG to Subnet

```bash
# Associate NSG with subnet
az network vnet subnet update \
  --resource-group powerbi-app-rg \
  --vnet-name powerbi-vnet \
  --name app-subnet \
  --network-security-group powerbi-nsg
```

---

## 5.3 Azure Key Vault

Secure storage for secrets, keys, and certificates.

### Create Key Vault

```bash
az keyvault create \
  --resource-group powerbi-app-rg \
  --name powerbi-vault-prod \
  --location eastus
```

### Store Secrets

```bash
# Add secret
az keyvault secret set \
  --vault-name powerbi-vault-prod \
  --name "AZURE-AD-CLIENT-SECRET" \
  --value "your-secret-value"

# Retrieve secret
az keyvault secret show \
  --vault-name powerbi-vault-prod \
  --name "AZURE-AD-CLIENT-SECRET"
```

### Access Secrets in App

```typescript
import { SecretClient, KeyVaultSecret } from "@azure/keyvault-secrets";
import { DefaultAzureCredential } from "@azure/identity";

const credential = new DefaultAzureCredential();
const client = new SecretClient(
  "https://powerbi-vault-prod.vault.azure.net/",
  credential
);

async function getSecret(secretName: string): Promise<string> {
  const secret: KeyVaultSecret = await client.getSecret(secretName);
  return secret.value || "";
}

// Usage
const clientSecret = await getSecret("AZURE-AD-CLIENT-SECRET");
```

---

## 5.4 SSL/TLS Certificates

### Create or Import Certificate

```bash
# Use free Azure App Services certificate
az webapp config ssl bind \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod \
  --certificate-thumbprint <thumbprint>

# Or use Azure Managed Certificates
az webapp config ssl upload \
  --resource-group powerbi-app-rg \
  --name powerbi-app-prod \
  --certificate-file cert.pfx \
  --certificate-password password
```

### Enforce HTTPS

```typescript
// Express middleware
app.use((req, res, next) => {
  if (req.header("x-forwarded-proto") !== "https") {
    res.redirect(`https://${req.header("host")}${req.url}`);
  } else {
    next();
  }
});
```

---

# Part 6: Monitoring & Performance

## 6.1 Application Insights

Real-time monitoring and diagnostics for your application.

### Create Application Insights

```bash
az monitor app-insights component create \
  --app powerbi-insights-prod \
  --location eastus \
  --resource-group powerbi-app-rg \
  --application-type web
```

### Integrate with Application

```typescript
import appInsights from "applicationinsights";

appInsights
  .setup(process.env.APPINSIGHTS_INSTRUMENTATION_KEY)
  .setAutoCollectConsole(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectRequests(true)
  .start();

const client = appInsights.defaultClient;

// Track custom event
client.trackEvent({
  name: "PowerBITokenGenerated",
  properties: {
    userId: userId,
    reportId: reportId,
  },
});

// Track metric
client.trackMetric({
  name: "TokenGenerationTime",
  value: duration, // milliseconds
});
```

## 6.2 Log Analytics

Query and analyze logs from Application Insights.

### KQL Queries

```kusto
// Query request failures
requests
| where success == false
| project timestamp, name, resultCode, duration

// Query custom events
customEvents
| where name == "PowerBITokenGenerated"
| summarize count() by tostring(customDimensions.userId)

// Query performance metrics
performanceCounters
| where name contains "CPU"
| summarize avg(value) by bin(timestamp, 5m)
```

## 6.3 Alerts & Action Groups

Set up notifications for critical issues.

```bash
# Create alert rule
az monitor metrics alert create \
  --name "High CPU Alert" \
  --resource-group powerbi-app-rg \
  --scopes /subscriptions/xxx/resourceGroups/powerbi-app-rg/providers/Microsoft.Web/serverfarms/powerbi-plan-prod \
  --condition "avg Percentage CPU > 80" \
  --description "Alert when CPU usage exceeds 80%"
```

---

# Part 7: CI/CD & DevOps

## 7.1 GitHub Actions Workflow

Automate build, test, and deployment pipeline.

### Workflow File

```yaml
# .github/workflows/deploy.yml
name: Deploy to Azure

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Run linter
        run: npm run lint

      - name: Deploy to Azure App Services
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: azure/webapps-deploy@v2
        with:
          app-name: "powerbi-app-prod"
          publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
          package: "./build"

      - name: Log deployment
        run: echo "✅ Deployment successful"
```

### Azure Publish Profile Setup

```bash
# Get publish profile
az webapp deployment list-publishing-profiles \
  --name powerbi-app-prod \
  --resource-group powerbi-app-rg \
  --xml
```

Add to GitHub Secrets as `AZURE_PUBLISH_PROFILE`.

---

# Part 8: Real-World Implementation Patterns

## 8.1 Complete End-to-End Architecture

```typescript
// Full stack implementation
// Architecture: React SPA → Express API → Azure Functions → Power BI

// ============ Frontend (React) ============
// src/components/PowerBIDashboard.tsx
import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import * as pbi from "powerbi-client";

interface PowerBIDashboardProps {
  reportId: string;
}

export const PowerBIDashboard: React.FC<PowerBIDashboardProps> = ({
  reportId,
}) => {
  const { accounts } = useMsal();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const embedReport = async () => {
      try {
        setIsLoading(true);

        // Get embed token from backend
        const response = await fetch("/api/power-bi/embed-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reportId,
            userId: accounts[0]?.homeAccountId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get embed token");
        }

        const { token, embedUrl } = await response.json();

        // Embed report
        const powerbi = new pbi.service.Service(
          pbi.factories.hpmFactory,
          pbi.factories.wpmpFactory,
          pbi.factories.routerFactory
        );

        powerbi.embed(containerRef.current!, {
          type: "report",
          tokenType: pbi.models.TokenType.Aad,
          accessToken: token,
          embedUrl,
          id: reportId,
          settings: {
            filterPaneEnabled: true,
            navContentPaneEnabled: true,
          },
        });

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to embed report");
        setIsLoading(false);
      }
    };

    if (accounts.length > 0) {
      embedReport();
    }
  }, [reportId, accounts]);

  return (
    <div style={{ height: "100vh" }}>
      {isLoading && <div>Loading dashboard...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

// ============ Backend (Express) ============
// src/routes/powerbi.ts
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/embed-token", authMiddleware, async (req: any, res) => {
  try {
    const { reportId } = req.body;
    const userId = req.user.preferred_username;

    // Call Azure Function to generate token
    const tokenResponse = await fetch(
      `${process.env.AZURE_FUNCTIONS_URL}/generate-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          userId,
          roles: req.user.roles,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Token generation failed");
    }

    const tokenData = await tokenResponse.json();

    res.json(tokenData);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate embed token" });
  }
});

export default router;

// ============ Azure Function (Serverless) ============
// src/functions/generate-token/index.ts
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { PowerBIClient } from "powerbi-api-typescript-client";
import { ClientSecretCredential } from "@azure/identity";

const generateToken: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  try {
    const { reportId, userId } = req.body;

    const credential = new ClientSecretCredential(
      process.env.AZURE_TENANT_ID!,
      process.env.AZURE_CLIENT_ID!,
      process.env.AZURE_CLIENT_SECRET!
    );

    const client = new PowerBIClient(credential);

    const tokenResponse = await client.embedTokens.generateToken(
      process.env.POWERBI_WORKSPACE_ID!,
      {
        reports: [{ id: reportId }],
        datasets: [{ id: process.env.POWERBI_DATASET_ID! }],
        identities: [
          {
            username: userId,
            roles: ["DefaultRole"],
          },
        ],
      }
    );

    context.res = {
      status: 200,
      body: JSON.stringify({
        token: tokenResponse.token,
        embedUrl: process.env.POWERBI_EMBED_URL,
      }),
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: JSON.stringify({ error: "Token generation failed" }),
    };
  }
};

export default generateToken;
```

---

# Part 9: Best Practices & Scaling

## 9.1 Best Practices Checklist

### Security

- ✅ Never store secrets in code; use Azure Key Vault
- ✅ Implement Azure AD authentication for all endpoints
- ✅ Use HTTPS only; redirect HTTP to HTTPS
- ✅ Enable firewall rules (NSGs) to restrict traffic
- ✅ Regularly rotate service principal credentials
- ✅ Implement logging and monitoring with Application Insights
- ✅ Use Managed Identity for service-to-service communication

### Performance

- ✅ Implement caching (HTTP headers, Redis, CDN)
- ✅ Use auto-scaling based on metrics
- ✅ Minimize database queries; use aggregations
- ✅ Compress responses with gzip/brotli
- ✅ Use CDN for static assets
- ✅ Lazy-load components and reports
- ✅ Monitor and optimize cold starts for Functions

### Availability

- ✅ Deploy to multiple regions for disaster recovery
- ✅ Use health checks and auto-healing
- ✅ Implement graceful degradation
- ✅ Set up alerts for critical issues
- ✅ Use Azure Traffic Manager for geo-routing

### Cost Optimization

- ✅ Use consumption-based plans for Functions (pay-per-execution)
- ✅ Right-size App Service plans
- ✅ Implement data retention policies
- ✅ Use Azure Reserved Instances for predictable workloads
- ✅ Monitor spending with Azure Cost Management

---

## 9.2 Scaling Strategies

### Horizontal Scaling (Multiple Instances)

```bash
# Scale out App Service Plan
az appservice plan update \
  --name powerbi-plan-prod \
  --resource-group powerbi-app-rg \
  --number-of-workers 5
```

### Vertical Scaling (Larger Instance)

```bash
# Upgrade App Service Plan SKU
az appservice plan update \
  --name powerbi-plan-prod \
  --resource-group powerbi-app-rg \
  --sku P1V2
```

### Database Scaling

```bash
# Scale Azure SQL Database
az sql db update \
  --server powerbi-sqlserver \
  --name powerbi-db \
  --resource-group powerbi-app-rg \
  --edition Standard \
  --capacity 200 # DTU capacity
```

---

# MCQs & Subjective Q&A

## 30+ Multiple Choice Questions

### 1. What is the primary advantage of using Azure App Services over virtual machines?

A) Lower cost  
B) No infrastructure management required  
C) Better performance  
D) More control over OS

**Answer**: B - App Services is PaaS and abstracts away infrastructure management.

### 2. Which Azure service is best for running code in response to events without managing servers?

A) Azure Virtual Machines  
B) Azure App Services  
C) Azure Functions  
D) Azure Logic Apps

**Answer**: C - Azure Functions is serverless and event-driven.

### 3. What is the default authentication method for Power BI embedding in a SaaS application?

A) Azure AD  
B) Embed Tokens with Service Principal  
C) API Key  
D) OAuth 2.0

**Answer**: B - Service Principal with embed tokens bypasses licensing requirements.

### 4. Which tool is used to store sensitive data like API keys and database passwords?

A) App Settings  
B) Azure Key Vault  
C) Application Insights  
D) Configuration files

**Answer**: B - Key Vault provides secure storage with access control.

### 5. What does RBAC stand for in Azure?

A) Resource-Based Access Control  
B) Role-Based Access Control  
C) Request-Based Authentication Control  
D) Resource Authorization Control

**Answer**: B - RBAC allows fine-grained access control based on roles.

### 6. Which Azure service provides real-time monitoring and diagnostics?

A) Azure Monitor  
B) Application Insights  
C) Log Analytics  
D) All of the above

**Answer**: D - All three are used together for comprehensive monitoring.

### 7. What is a Virtual Network (VNet) used for?

A) Connecting physical networks  
B) Isolating Azure resources and controlling traffic  
C) Storing virtual data  
D) Monitoring network performance

**Answer**: B - VNets provide network isolation and security.

### 8. Which CI/CD tool can automatically deploy to Azure App Services from GitHub?

A) Jenkins  
B) GitLab CI  
C) GitHub Actions  
D) Travis CI

**Answer**: C - GitHub Actions integrates natively with GitHub repos.

### 9. What is cold start in Azure Functions?

A) Starting the function during cold weather  
B) Initial delay when a function is invoked after inactivity  
C) Stopping a function temporarily  
D) Error in function initialization

**Answer**: B - Cold starts occur when the runtime needs to initialize.

### 10. Which authentication method is recommended for enterprise applications with existing Azure AD?

A) API Keys  
B) Service Principal  
C) Azure AD  
D) OAuth 1.0

**Answer**: C - Azure AD provides SSO and enterprise integration.

---

## Subjective Q&A (10+ Questions)

### 1. Explain the difference between Azure App Services and Azure Functions. When would you use each?

**Answer:**

**Azure App Services:**

- Continuous running application
- Better for: Web apps, APIs, microservices
- Costs: Fixed per plan
- Cold starts: None
- State management: Possible

**Azure Functions:**

- Event-driven, serverless
- Better for: Token generation, scheduled tasks, data processing
- Costs: Pay-per-execution
- Cold starts: 1-3 seconds initially
- State management: Stateless by design

**Decision Criteria:**

- Always running → App Services
- Occasional tasks → Functions
- High traffic API → App Services (better performance)
- Unpredictable load → Functions (auto-scales faster, cheaper)

---

### 2. How would you implement security for a Power BI embedded application with multiple users?

**Answer:**

1. **Authentication**: Use Azure AD for user login
2. **Authorization**: Assign roles (Admin, Viewer, Editor)
3. **Token Generation**: Use Azure Functions to generate embed tokens server-side
4. **Row-Level Security (RLS)**: Configure in Power BI data model to show user-specific data
5. **Network Security**: Use NSGs and VNets to restrict traffic
6. **Secrets Management**: Store service principal credentials in Key Vault
7. **Audit Logging**: Log all access to Power BI reports
8. **HTTPS Only**: Enforce encryption for all communications

---

### 3. Describe a complete CI/CD pipeline for deploying a React + Node.js app to Azure.

**Answer:**

```
Code Push → GitHub
    ↓
GitHub Actions Triggered
    ├─ Checkout code
    ├─ Install dependencies
    ├─ Run tests
    ├─ Run linter
    ├─ Build React app (npm run build)
    ├─ Build Docker image (optional)
    └─ Deploy to Azure App Services
         ├─ Run database migrations
         ├─ Set environment variables
         ├─ Health check
         └─ Switch traffic to new instance

Monitoring:
    ├─ Application Insights logs
    ├─ Alerts if deployment fails
    └─ Automatic rollback if needed
```

---

### 4. How would you implement disaster recovery for a mission-critical application on Azure?

**Answer:**

1. **Multi-Region Deployment**:

   - Primary region: East US
   - Secondary region: West Europe
   - Database replication (geo-redundant)

2. **Load Balancing**: Azure Traffic Manager for failover

3. **Backup Strategy**:

   - Database backups every 6 hours
   - Store in geo-redundant storage (GRS)
   - Test restores regularly

4. **Monitoring**: Alerts for region failures

5. **RTO/RPO targets**:
   - RTO (Recovery Time Objective): < 30 minutes
   - RPO (Recovery Point Objective): < 1 hour

---

### 5. Explain Row-Level Security (RLS) in Power BI and how it protects multi-tenant data.

**Answer:**

RLS ensures users see only data they're authorized to view. Example:

```typescript
// User from Region A
identities: [
  {
    username: "user-region-a@company.com",
    roles: ["Sales_RegionA"],
  },
];

// User from Region B
identities: [
  {
    username: "user-region-b@company.com",
    roles: ["Sales_RegionB"],
  },
];
```

Power BI data model enforces:

```
Sales data filtered WHERE RegionA IN ['RegionA']
Sales data filtered WHERE RegionB IN ['RegionB']
```

Benefits:

- Single Power BI report for all users
- Each sees only their data
- Transparent to end-users
- Enterprise security standard

---

# TLDR Summary

## Key Takeaways

### Azure Fundamentals

- **Azure**: Cloud platform with global infrastructure
- **Resource Groups**: Logical containers for related resources
- **Regions & Zones**: Distribute apps for high availability

### App Services

- **PaaS offering** for continuous applications
- **Auto-scaling**: Handle traffic spikes automatically
- **Built-in CI/CD**: Deploy from GitHub seamlessly
- **Custom domains & SSL**: Free certificates included
- **SKU Selection**: F/B/S/P tiers with different resource limits and features
- **Scaling Strategy**: Start small (B1/S1), upgrade based on traffic metrics

### Azure Functions

- **Serverless**: Pay only for execution time
- **Event-driven**: Triggered by HTTP, timers, messages, storage events
- **Triggers & Bindings**: Declarative way to connect services
  - **One Trigger** per function (activation event)
  - **Multiple Bindings** for input/output to resources
  - **Examples**: HTTP trigger + Blob input binding, Queue trigger + Cosmos DB output
- **Patterns**: Fan-out (1 input → N outputs), Fan-in (N inputs → 1 output), Pipeline chains
- **Ideal for**: Token generation, background tasks, event processing

### Azure AD & Managed Identity

- **Enterprise Authentication**: SSO for organizational users
- **OAuth 2.0 Protocol**: Industry-standard secure authentication
- **RBAC**: Fine-grained role-based access control
- **Managed Identity**: Zero-secret authentication for Azure-to-Azure service communication
  - **System-Assigned**: Single resource identity
  - **User-Assigned**: Shared identity across multiple resources
  - **Benefits**: Automatic credential rotation, no secrets in code, full audit trail
- **When to use Managed Identity**: App Service → Database, Function App → Key Vault

### Networking & Security

- **VNets**: Isolate resources, control traffic between subnets
  - **Subnets**: Divide VNet for multi-tier apps (app-subnet, db-subnet, functions-subnet)
  - **CIDR Notation**: 10.0.1.0/24 = 256 IPs, 10.0.0.0/16 = 65,536 IPs
  - **VNet Peering**: Connect multiple VNets with controlled communication
  - **Use Cases**: Multi-tier apps, multi-environment deployments, microservices
- **NSGs (Network Security Groups)**: Firewall rules at subnet/NIC level
  - **Priority**: Lower number = higher priority (100-4096 range)
  - **Direction**: Inbound (incoming) or Outbound (outgoing)
  - **Rules**: Allow/Deny by protocol, port, and source/destination
  - **Examples**: Allow HTTPS from internet (443), Block SSH (22), Database access only from app subnet
  - **vs Azure Firewall**: NSG for simple rules, Firewall for advanced threat protection
- **Key Vault**: Secure secret storage with RBAC access
- **HTTPS Only**: Encrypt all communication

### Monitoring

- **Application Insights**: Real-time diagnostics and performance tracking
- **Alerts**: Notify on critical issues (high CPU, failed requests)
- **Log Analytics**: Query and analyze logs with KQL language
- **Cost Management**: Track and optimize spending
- **Metrics to Monitor**: CPU usage, memory, request duration, error rates

### DevOps & Scaling

- **GitHub Actions**: Automate build/test/deploy workflow
- **Horizontal Scaling**: Multiple instances for load distribution
- **Vertical Scaling**: Larger instance types for more resources
- **Multi-region**: Disaster recovery & geographic failover
- **Auto-scaling Rules**: Scale out on high CPU, scale in on low CPU

### Security Best Practices

1. **Never hardcode secrets** → Use Key Vault or Managed Identity
2. **Use Managed Identity** for Azure service-to-service authentication (zero secrets)
3. **Implement comprehensive logging** → Application Insights + Log Analytics
4. **Auto-scale based on metrics** → Prevent performance degradation
5. **Network isolation** → VNets with NSGs by function (app, database, functions)
6. **Encrypt everything** → HTTPS, TLS for data in transit
7. **Monitor costs regularly** → Avoid unexpected bills
8. **Backup data** → Geo-redundant storage, regular restore tests
9. **RBAC granularity** → Users/services have minimum required permissions
10. **Audit trail** → Log all authentication, authorization, and sensitive operations

---

## Your Implementation Roadmap

### Week 1: Foundation

- Set up Azure subscription and resource groups
- Create App Service Plan and deploy frontend + API
- Create VNet with subnets (app, database)
- Configure NSG rules (allow HTTPS, deny SSH)
- Register application in Azure AD

### Week 2: Authentication & Identity

- Implement Azure AD login in React frontend
- Enable Managed Identity on App Service
- Connect to Key Vault using Managed Identity (no secrets!)
- Set up token validation in backend
- Implement RBAC for users

### Week 3: Serverless & Functions

- Create Azure Functions for Power BI token generation
- Configure HTTP trigger + authentication
- Add Blob Storage trigger for background jobs
- Set up Timer trigger for cleanup tasks
- Deploy and test function code

### Week 4: Power BI Integration

- Create Power BI workspace and dataset
- Implement embed token generation (secure server-side)
- Configure Row-Level Security (RLS) for multi-tenant
- Embed reports in React component
- Test with multiple users

### Week 5: Monitoring & Alerts

- Enable Application Insights
- Set up alerts for high CPU, failed requests
- Create Log Analytics queries
- Configure email notifications
- Set up dashboard for team monitoring

### Week 6: DevOps & Deployment

- Create GitHub Actions CI/CD pipeline
- Automate tests and linting
- Set up staging environment for testing
- Configure auto-deployment to production
- Set up rollback procedures

### Week 7: Advanced (Optional)

- Multi-region deployment for disaster recovery
- Azure Traffic Manager for geo-failover
- Database replication and backups
- Performance load testing
- Security audit and penetration testing

---

## Common Questions & Troubleshooting

### Q: Why should I use Managed Identity over Service Principal?

**A**: Managed Identity = zero secrets, automatic rotation, built-in audit trail. Use it whenever possible for Azure-to-Azure authentication.

### Q: When should I scale vertically vs horizontally?

**A**:

- **Vertical** (larger instance): When you need specific resources (GPU, high memory)
- **Horizontal** (multiple instances): When you need better reliability and load distribution (preferred)

### Q: How do I reduce cold starts in Azure Functions?

**A**: Use Premium or Dedicated plans instead of Consumption. Or keep function warm with timer triggers. Or use Application Insights to identify bottlenecks.

### Q: What's the difference between VNet and NSG?

**A**: **VNet** = logical network boundary (10.0.0.0/16), **NSG** = firewall rules for that network. You need both for proper security.

### Q: How do I ensure my app is highly available?

**A**: Multi-region deployment + auto-scaling + health checks + database replication + disaster recovery testing.

---

## Additional Resources

- **Azure Docs**: https://docs.microsoft.com/azure
- **Azure Best Practices**: https://docs.microsoft.com/azure/architecture/guide/design-principles
- **Power BI SDK**: https://github.com/Microsoft/PowerBI-JavaScript
- **Azure CLI Docs**: https://docs.microsoft.com/cli/azure
- **MSAL Authentication**: https://github.com/AzureAD/microsoft-authentication-library-js
- **Managed Identity**: https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources
- **NSG Rules**: https://docs.microsoft.com/azure/virtual-network/network-security-groups-overview
- **Azure Samples**: https://github.com/Azure-Samples

---

**Last Updated**: November 2, 2025  
**Next Update**: When Azure services introduce new features or best practices change
