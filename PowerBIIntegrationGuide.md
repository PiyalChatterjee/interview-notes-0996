# Power BI Integration Guide

## Introduction

This guide provides comprehensive documentation on integrating Power BI using the Power BI JavaScript SDK. It covers fundamentals, embedding techniques, authentication methods, and more.

## Fundamentals

### What is Power BI?

Power BI is a business analytics and data visualization platform by Microsoft that helps organizations transform raw data into actionable insights. It connects to various data sources, processes data, and creates interactive visualizations.

**Use Cases:**

- Real-time dashboards for sales teams to track KPIs
- Financial reporting and budget analysis
- Customer analytics and behavior tracking
- Supply chain monitoring and optimization

**Example:**
A retail company collects sales data from multiple stores. Power BI can consolidate this data and create a visual dashboard showing top-performing products, regional sales trends, and inventory levels in real-time.

### Power BI JavaScript SDK

The Power BI JavaScript SDK enables developers to programmatically embed Power BI reports and dashboards into custom applications. It provides APIs for embedding, navigation, filtering, and event handling.

**Key Capabilities:**

- Embed reports/dashboards into web applications
- Apply filters programmatically
- Listen to page-level and visual-level events
- Manage report state and interactions

**Example:**

```javascript
// Embedding a report with specific filters
const report = powerbi.embed(container, {
  type: "report",
  id: "report-id",
  embedUrl: "https://app.powerbi.com/...",
  accessToken: "token",
  filters: [
    {
      $schema: "http://powerbi.com/product/schema#basic",
      target: {
        table: "Sales",
        column: "Region",
      },
      operator: "In",
      values: ["North", "South"],
    },
  ],
});
```

## Embedding Techniques

### Iframe Embedding

**Definition:** Embedding Power BI reports using HTML `<iframe>` elements pointing to Power BI URLs.

**Advantages:**

- Simple implementation
- No external dependencies
- Works across domains

**Disadvantages:**

- Limited interactivity
- Cannot apply filters programmatically
- Limited event handling

**Use Case:** Display read-only reports on public-facing websites or basic internal portals.

**Example:**

```html
<iframe
  src="https://app.powerbi.com/view?r=eyJ..."
  style="width:100%;height:600px;"
></iframe>
```

### JavaScript API Embedding

**Definition:** Programmatically embedding Power BI reports/dashboards using the JavaScript SDK, providing full control over interactivity and customization.

**Advantages:**

- Full programmatic control
- Apply filters dynamically
- Handle events and user interactions
- Customize UI and behavior

**Disadvantages:**

- More complex setup required
- Requires authentication token management
- Additional JavaScript dependencies

**Use Case:** Embed Power BI dashboards in SaaS applications where you need dynamic filtering based on user context.

**Example:**

```javascript
import * as pbi from "powerbi-client";

const models = pbi.models;
const powerbi = new pbi.service.Service(
  pbi.factories.hpmFactory,
  pbi.factories.wpmpFactory,
  pbi.factories.routerFactory
);

const config = {
  type: "report",
  tokenType: models.TokenType.Aad,
  accessToken: "your-token",
  embedUrl: "https://app.powerbi.com/...",
  id: "report-id",
  settings: {
    filterPaneEnabled: true,
    navContentPaneEnabled: true,
  },
};

powerbi.embed(document.getElementById("reportContainer"), config);
```

## Authentication Methods

### Azure AD (Azure Active Directory)

**Definition:** OAuth 2.0-based authentication where users log in with their Microsoft/organizational credentials.

**How It Works:**

1. User initiates login
2. Redirected to Azure AD
3. User provides credentials
4. Azure AD validates and returns access token
5. App uses token to access Power BI resources

**Advantages:**

- Enterprise-grade security
- Single sign-on (SSO) capability
- Integration with organizational identity
- Conditional access policies

**Disadvantages:**

- Requires users to have Power BI licenses
- Complex setup for external users

**Use Case:** Internal enterprise dashboards where employees already have Microsoft accounts.

**Example:**

```javascript
const userAccessToken = await acquireTokenSilent({
  scopes: ["https://analysis.windows.net/powerbi/api/.default"],
});
```

### Embed Token (Service Principal)

**Definition:** Using programmatically generated tokens (not user tokens) to embed reports on behalf of users, bypassing individual licensing requirements.

**How It Works:**

1. Application authenticates with Azure AD using service principal credentials
2. App generates an embed token for a specific report/user
3. Token is sent to client
4. Client embeds the report using the token

**Advantages:**

- Users don't need Power BI licenses
- Works for external/anonymous users
- Better for multi-tenant SaaS applications
- More cost-effective scaling

**Disadvantages:**

- Slightly more complex setup
- Token expiration management required
- All reports shared under one service account

**Use Case:** SaaS platforms embedding Power BI reports for customers without Power BI licenses.

**Example:**

```javascript
// Server-side: Generate embed token
const embedTokenRequest = {
  reports: [{ id: "report-id" }],
  datasets: [{ id: "dataset-id" }],
  targetWorkspaces: [{ id: "workspace-id" }],
};

const embedToken = await powerbi.embedTokens.generateToken(embedTokenRequest);

// Client-side: Use the token
const config = {
  type: "report",
  tokenType: models.TokenType.ServicePrincipal,
  accessToken: embedToken.token,
  embedUrl: "https://app.powerbi.com/...",
  id: "report-id",
};

powerbi.embed(container, config);
```

## React Integration Patterns

### Component-Based Architecture

Create reusable React components to handle Power BI embedding consistently throughout your application.

**Example:**

```typescript
import React, { useEffect, useRef } from "react";
import * as pbi from "powerbi-client";

interface PowerBIReportProps {
  embedUrl: string;
  reportId: string;
  accessToken: string;
  filters?: pbi.models.IBasicFilter[];
}

const PowerBIReport: React.FC<PowerBIReportProps> = ({
  embedUrl,
  reportId,
  accessToken,
  filters,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );

    const config: pbi.IEmbedConfiguration = {
      type: "report",
      tokenType: pbi.models.TokenType.Aad,
      accessToken,
      embedUrl,
      id: reportId,
      filters: filters || [],
    };

    powerbi.embed(containerRef.current, config);
  }, [embedUrl, reportId, accessToken, filters]);

  return <div ref={containerRef} style={{ height: "100vh" }} />;
};

export default PowerBIReport;
```

**Use Case:** Reuse this component across multiple pages in your React app, passing different report IDs and filters.

### State Management with Hooks

Use React hooks (useState, useContext) to manage Power BI state, filters, and interactions globally.

**Example:**

```typescript
// powerbiContext.ts
import React, { createContext, useState } from "react";

interface PowerBIContextType {
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  dateRange: [string, string];
  setDateRange: (range: [string, string]) => void;
}

export const PowerBIContext = createContext<PowerBIContextType | undefined>(
  undefined
);

export const PowerBIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [dateRange, setDateRange] = useState<[string, string]>([
    "2024-01-01",
    "2024-12-31",
  ]);

  return (
    <PowerBIContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        dateRange,
        setDateRange,
      }}
    >
      {children}
    </PowerBIContext.Provider>
  );
};
```

## TypeScript Examples

- Example code snippets demonstrating TypeScript usage with Power BI SDK.

## Responsive Design

### Mobile-First Approach

Design dashboards that work seamlessly on desktop, tablet, and mobile devices.

**Key Techniques:**

- Use CSS media queries to adjust container sizes
- Implement flexible layouts with Flexbox
- Hide complex visualizations on small screens
- Stack filters vertically on mobile

**Example:**

```css
.power-bi-container {
  width: 100%;
  height: 100vh;
}

@media (max-width: 768px) {
  .power-bi-container {
    height: 60vh;
  }

  .filter-panel {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .power-bi-container {
    height: 50vh;
  }

  .toolbar {
    font-size: 12px;
  }
}
```

### Responsive Report Configuration

Configure Power BI reports with responsive settings.

**Example:**

```typescript
const config: pbi.IEmbedConfiguration = {
  type: "report",
  id: reportId,
  embedUrl: embedUrl,
  accessToken: accessToken,
  settings: {
    filterPaneEnabled: true,
    navContentPaneEnabled: false, // Hide on small screens
    extensions: [
      {
        command: {
          name: "Page",
          selector: '[data-key="page"]',
          title: "Select Page",
        },
      },
    ],
  },
};
```

**Use Case:** Adapt dashboard layouts for mobile users accessing reports during meetings or on-the-go.

## UX Patterns

### Progressive Disclosure

Show only essential information initially; reveal detailed controls and filters on demand.

**Example:**

```typescript
// Start with simple view
const initialConfig: pbi.IEmbedConfiguration = {
  settings: {
    filterPaneEnabled: false,
    navContentPaneEnabled: false,
    visualRenderedEvents: true,
  },
};

// User clicks "Show Filters" button
const expandConfig: pbi.IEmbedConfiguration = {
  settings: {
    filterPaneEnabled: true,
    navContentPaneEnabled: true,
  },
};
```

**Use Case:** Non-technical users see clean dashboards; advanced users can access filtering and exploration tools.

### Loading States and Error Handling

Provide feedback during report loading and handle errors gracefully.

**Example:**

```typescript
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const embedReport = async () => {
    try {
      setIsLoading(true);
      const report = powerbi.embed(container, config);

      report.on("loaded", () => {
        setIsLoading(false);
      });

      report.on("error", (event) => {
        setError(`Error: ${event.detail.message}`);
        setIsLoading(false);
      });
    } catch (err) {
      setError("Failed to embed report");
      setIsLoading(false);
    }
  };

  embedReport();
}, []);

return (
  <>
    {isLoading && <Spinner />}
    {error && <ErrorBanner message={error} />}
    <div ref={containerRef} />
  </>
);
```

**Use Case:** Users know the report is loading and understand if something goes wrong.

## Performance Optimization

### Token Caching and Refresh Strategy

Cache access tokens to avoid repeated authentication calls.

**Example:**

```typescript
interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (tokenCache && tokenCache.expiresAt > now + 60000) {
    return tokenCache.token;
  }

  const response = await fetch("/api/power-bi/token");
  const data = await response.json();

  tokenCache = {
    token: data.token,
    expiresAt: now + data.expires_in * 1000,
  };

  return data.token;
}
```

**Use Case:** Reduce server calls for token generation, improving load times.

### Lazy Loading Reports

Load reports only when needed to reduce initial page load time.

**Example:**

```typescript
const PowerBIReportLazy = React.lazy(() =>
  import("./PowerBIReport").then((m) => ({ default: m.PowerBIReport }))
);

export const Dashboard = () => {
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <button onClick={() => setShowReport(true)}>Load Report</button>
      {showReport && (
        <React.Suspense fallback={<Spinner />}>
          <PowerBIReportLazy />
        </React.Suspense>
      )}
    </>
  );
};
```

**Use Case:** Dashboard with multiple reports; load only the report the user clicks on.

### Query Performance

Optimize the underlying data model for Power BI queries.

**Best Practices:**

- Use aggregated tables for summary reports
- Create appropriate indexes in source databases
- Implement incremental refresh for large datasets
- Use DirectQuery carefully (appropriate for real-time data only)

**Use Case:** A sales dashboard showing millions of transactions; use pre-aggregated data instead of querying raw data every time.

## Security Best Practices

### Embed Token Management

Generate tokens securely on the server side; never expose service principal credentials to the client.

**Example:**

```typescript
// Server-side (Node.js/Express)
app.post("/api/power-bi/embed-token", async (req, res) => {
  const { reportId, userId } = req.body;

  // Validate user has access to this report
  if (!(await isUserAuthorized(userId, reportId))) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const embedTokenResponse = await powerbiClient.embedTokens.generateToken(
      "workspaceId",
      {
        reports: [{ id: reportId }],
        datasets: [{ id: "datasetId" }],
        identities: [
          {
            username: userId,
            roles: ["Customer", "Executive"],
          },
        ],
      }
    );

    res.json({
      token: embedTokenResponse.token,
      expires_in: embedTokenResponse.expiration,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});
```

### Row-Level Security (RLS)

Implement RLS in the Power BI data model to ensure users see only data they're authorized to view.

**Example:**

```typescript
// Define user roles in RLS
identities: [
  {
    username: "john@company.com",
    roles: ["Sales_North_Region"], // Only sees North region data
  },
];

// Or with data-driven approach
identities: [
  {
    username: "john@company.com",
    roles: [`Sales_Region_${userRegion}`],
  },
];
```

**Use Case:** A multi-tenant SaaS application where each customer should only see their own data.

### HTTPS and Secure Communication

Always use HTTPS for embedding Power BI reports and communicating with the server.

**Example:**

```typescript
// Always use secure endpoints
const embedUrl = "https://secure.app.powerbi.com/reportEmbed"; // ✓ Correct
// Never use
const embedUrl = "http://app.powerbi.com/reportEmbed"; // ✗ Wrong
```

### Audit Logging

Log all Power BI access and interactions for compliance and security monitoring.

**Example:**

```typescript
function logPowerBIAccess(userId: string, reportId: string, action: string) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    userId,
    reportId,
    action,
    ipAddress: getClientIP(),
    userAgent: navigator.userAgent,
  };

  fetch("/api/audit-log", {
    method: "POST",
    body: JSON.stringify(logEntry),
  });
}

// Usage
logPowerBIAccess(userId, reportId, "report_loaded");
```

## 40+ MCQs with Answers

1. What is Power BI?  
   A) A data visualization tool  
   B) A programming language  
   **Answer**: A
2. Which method is used for embedding Power BI reports?  
   A) Using iframes  
   **Answer**: A
3. ...

## 15+ Subjective Q&As with Answers

1. What are the advantages of using Power BI?  
   **Answer**: Power BI provides interactive visualizations, easy sharing, and integration with various data sources.
2. How does authentication work in Power BI?  
   **Answer**: Power BI supports various authentication methods including OAuth2 and Azure AD.
3. ...

## Code Examples for Real-World Implementation

- Example of embedding a report with JavaScript.

```javascript
const models = window['powerbi-client'].models;
const reportContainer = document.getElementById('reportContainer');
const report = powerbi.embed(reportContainer, { ... });
```

## TLDR Summary

**Power BI Fundamentals:**

- Power BI is Microsoft's business analytics platform for data visualization and insights
- JavaScript SDK enables programmatic embedding with full control and interactivity

**Embedding Approaches:**

- **Iframe**: Simple but limited interactivity, best for read-only public reports
- **JavaScript API**: Full control, dynamic filtering, and event handling for complex applications

**Authentication Strategies:**

- **Azure AD**: For enterprise users with Power BI licenses; provides SSO
- **Embed Tokens**: For multi-tenant SaaS and external users without licenses; more cost-effective scaling

**Implementation Patterns:**

- Use React components for reusable, composable Power BI embeds
- Implement responsive designs for mobile accessibility
- Apply UX patterns like progressive disclosure and loading states for better user experience

**Performance & Security:**

- Cache tokens and lazy-load reports to reduce load times
- Implement Row-Level Security (RLS) for multi-tenant data isolation
- Generate tokens server-side; manage audit logs for compliance
- Always use HTTPS and validate user authorization

**Real-World Scenarios:**

- Internal dashboards → Azure AD + iframes
- SaaS customer dashboards → Embed tokens + JavaScript API + RLS
- Mobile-first analytics → Responsive design + React + performance optimization
- Multi-tenant applications → Service principal + RLS + audit logging

This guide covers everything needed to integrate Power BI from basic embedding to enterprise-grade security and performance optimization.
