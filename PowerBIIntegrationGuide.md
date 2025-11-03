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
   C) A database management system  
   D) A cloud storage service  
   **Answer**: A

2. Which method is used for embedding Power BI reports?  
   A) Using iframes  
   B) Using JavaScript API  
   C) Both A and B  
   D) Only REST API  
   **Answer**: C

3. What is the Power BI JavaScript SDK used for?  
   A) Server-side data processing  
   B) Programmatic embedding and report interaction  
   C) Mobile app development  
   D) Database design  
   **Answer**: B

4. Which authentication method requires users to have Power BI licenses?  
   A) Embed tokens  
   B) Azure AD  
   C) Service Principal  
   D) Anonymous access  
   **Answer**: B

5. What is an embed token in Power BI?  
   A) A permanent access token  
   B) A programmatically generated token for embedding reports  
   C) A user's password  
   D) A database connection string  
   **Answer**: B

6. What does RLS stand for in Power BI?  
   A) Report Level Security  
   B) Row-Level Security  
   C) Real-time Live Streaming  
   D) Remote Login Service  
   **Answer**: B

7. Which approach is best for multi-tenant SaaS applications?  
   A) Iframe embedding with Azure AD  
   B) Service Principal with embed tokens  
   C) Direct Power BI URL sharing  
   D) Email-based report distribution  
   **Answer**: B

8. What is the main advantage of lazy loading reports?  
   A) Reduced security  
   B) Faster initial page load  
   C) More complex code  
   D) Automatic caching  
   **Answer**: B

9. When should you use DirectQuery in Power BI?  
   A) Always, for best performance  
   B) For small datasets only  
   C) For real-time data requirements  
   D) Never, use Import instead  
   **Answer**: C

10. What is token caching used for?  
    A) Storing user passwords  
    B) Reducing authentication server calls  
    C) Increasing security  
    D) Improving database connections  
    **Answer**: B

11. Which setting hides the filter pane in Power BI embed?  
    A) `navContentPaneEnabled: false`  
    B) `filterPaneEnabled: false`  
    C) `paneEnabled: false`  
    D) `hideFilters: true`  
    **Answer**: B

12. What is the purpose of Row-Level Security (RLS) in Power BI?  
    A) To improve report performance  
    B) To encrypt data  
    C) To ensure users see only authorized data  
    D) To reduce file size  
    **Answer**: C

13. Which HTTP protocol should always be used for Power BI embedding?  
    A) HTTP  
    B) FTP  
    C) HTTPS  
    D) WebSocket  
    **Answer**: C

14. What does SSO stand for?  
    A) Single Sign-Off  
    B) Single Sign-On  
    C) Simple Sign-Over  
    D) Secure Storage Online  
    **Answer**: B

15. Which React hook is best for managing Power BI state?  
    A) useState  
    B) useContext  
    C) useMemo  
    D) useReducer  
    **Answer**: B

16. What is the first step in embedding a Power BI report programmatically?  
    A) Create an iframe  
    B) Obtain an access token  
    C) Register the application  
    D) Create a React component  
    **Answer**: B

17. How long are Power BI embed tokens valid for?  
    A) 5 minutes  
    B) 1 hour  
    C) 24 hours  
    D) Indefinitely  
    **Answer**: B

18. Which service generates embed tokens?  
    A) Azure Storage  
    B) Azure AD  
    C) Power BI Admin API  
    D) Microsoft Graph  
    **Answer**: C

19. What is the main disadvantage of iframe embedding?  
    A) Poor performance  
    B) Limited interactivity and filtering  
    C) Security vulnerabilities  
    D) Mobile incompatibility  
    **Answer**: B

20. Which React pattern is recommended for Power BI components?  
    A) Class components only  
    B) Functional components with hooks  
    C) Higher-order components  
    D) Render props  
    **Answer**: B

21. What should be stored server-side and never exposed to the client?  
    A) Report IDs  
    B) Service principal credentials  
    C) Workspace IDs  
    D) User email addresses  
    **Answer**: B

22. How can you apply filters to a Power BI report programmatically?  
    A) Using the UI filter panel  
    B) Using the JavaScript API with filter objects  
    C) Modifying the Power BI service directly  
    D) Cannot be done programmatically  
    **Answer**: B

23. What is the purpose of audit logging in Power BI?  
    A) To track performance metrics  
    B) To log all access and interactions for compliance  
    C) To improve query speed  
    D) To reduce storage costs  
    **Answer**: B

24. Which component should be used for embedding Power BI in React?  
    A) `<iframe>`  
    B) `<PowerBIReport>` custom component  
    C) `<div>` only  
    D) `<embed>`  
    **Answer**: B

25. What is progressive disclosure in UX?  
    A) Revealing source code progressively  
    B) Showing all information initially  
    C) Revealing detailed controls on demand  
    D) Gradually reducing page size  
    **Answer**: C

26. How should you handle Power BI errors in React?  
    A) Ignore them  
    B) Display error banner to user  
    C) Log to console only  
    D) Refresh the page automatically  
    **Answer**: B

27. What is the benefit of using CSS media queries for Power BI?  
    A) Improve data security  
    B) Make reports responsive to different screen sizes  
    C) Increase performance  
    D) Enhance authentication  
    **Answer**: B

28. Which approach reduces Power BI licensing costs for external users?  
    A) Azure AD authentication  
    B) Embed tokens with Service Principal  
    C) Direct Power BI access  
    D) No-code approach  
    **Answer**: B

29. What is the role of `React.lazy()` with Power BI?  
    A) To enable offline mode  
    B) To lazy-load reports for better initial load time  
    C) To cache reports permanently  
    D) To disable interactivity  
    **Answer**: B

30. How should sensitive data be handled when embedding Power BI?  
    A) Send via URL parameters  
    B) Store in localStorage  
    C) Validate on server-side and generate secure tokens  
    D) Display in console logs  
    **Answer**: C

31. What is the main use case for iframe embedding?  
    A) Interactive SaaS dashboards  
    B) Real-time multi-tenant applications  
    C) Read-only reports for public websites  
    D) Complex filtering scenarios  
    **Answer**: C

32. Which authentication method supports conditional access policies?  
    A) Embed tokens  
    B) Anonymous access  
    C) Azure AD  
    D) Service Principal only  
    **Answer**: C

33. What should be checked before embedding a report?  
    A) Server time  
    B) User authorization  
    C) Browser cookies  
    D) DNS records  
    **Answer**: B

34. How can you optimize initial page load with Power BI?  
    A) Use larger datasets  
    B) Implement token caching and lazy loading  
    C) Increase network latency  
    D) Use older SDK versions  
    **Answer**: B

35. What is the purpose of `identities` in embed token generation?  
    A) To identify the server  
    B) To map users to RLS roles  
    C) To track licensing  
    D) To enable encryption  
    **Answer**: B

36. Which setting controls the navigation pane visibility?  
    A) `filterPaneEnabled`  
    B) `navContentPaneEnabled`  
    C) `paneVisible`  
    D) `navigationEnabled`  
    **Answer**: B

37. What is the recommended frequency for token refresh?  
    A) Every 5 seconds  
    B) Every 30 minutes  
    C) Before expiration (typically 1 hour)  
    D) Never refresh  
    **Answer**: C

38. How should you validate user permissions before embedding reports?  
    A) Trust client-side validation  
    B) Check permissions on server-side  
    C) Use Power BI admin portal only  
    D) No validation needed  
    **Answer**: B

39. What is the advantage of aggregated tables in Power BI?  
    A) Reduce security  
    B) Improve query performance  
    C) Decrease accuracy  
    D) Increase file size  
    **Answer**: B

40. Which approach is best for enterprise internal dashboards?  
    A) Embed tokens for everyone  
    B) Share Power BI links directly  
    C) Azure AD with direct Power BI access  
    D) Anonymous iframe embedding  
    **Answer**: C

---

## 15+ Subjective Q&As with Answers

1. **What are the advantages of using Power BI?**  
   **Answer**: Power BI offers several key advantages:

   - **Interactive visualizations**: Creates compelling, interactive dashboards and reports
   - **Easy data integration**: Connects to 200+ data sources seamlessly
   - **Real-time insights**: Enables live dashboards with automatic data refresh
   - **Sharing and collaboration**: Easy sharing with colleagues and stakeholders
   - **Mobile accessibility**: Access reports on any device with responsive design
   - **Cost-effective**: Competitive pricing with various licensing options
   - **Enterprise-grade security**: Built-in security, encryption, and compliance features
   - **Power Query**: Powerful ETL capabilities for data transformation

2. **How does authentication work in Power BI?**  
   **Answer**: Power BI supports multiple authentication methods:

   **Azure AD (Azure Active Directory):**

   - OAuth 2.0-based authentication
   - Users log in with organizational credentials
   - Supports Single Sign-On (SSO)
   - Enables conditional access policies
   - Best for enterprise users who have Power BI licenses

   **Embed Tokens (Service Principal):**

   - Application authenticates with Azure AD using service principal
   - App generates programmatic tokens
   - Users don't need individual licenses
   - Better for multi-tenant SaaS applications
   - Tokens expire after 1 hour

   **Process Flow:**

   1. User initiates access
   2. Authentication method validates identity
   3. Access token or embed token is generated
   4. Token is used to access Power BI resources
   5. Token is verified on each request

3. **What is the difference between iframe embedding and JavaScript API embedding?**  
   **Answer**:

   **Iframe Embedding:**

   - Uses HTML iframe element pointing to Power BI URL
   - **Pros**: Simple implementation, no external dependencies, works across domains
   - **Cons**: Limited interactivity, cannot apply filters programmatically, limited event handling
   - **Use case**: Read-only reports for public websites

   **JavaScript API Embedding:**

   - Uses Power BI JavaScript SDK for programmatic control
   - **Pros**: Full control over interactivity, dynamic filtering, event handling, customization
   - **Cons**: More complex setup, requires token management, additional dependencies
   - **Use case**: SaaS applications with dynamic filtering and user-specific data

   **Comparison Table:**

   - Complexity: Iframe (simple) vs API (complex)
   - Interactivity: Iframe (limited) vs API (full)
   - Filtering: Iframe (pre-built) vs API (programmatic)
   - Performance: Both similar

4. **How do you implement Row-Level Security (RLS) in Power BI?**  
   **Answer**: Row-Level Security ensures users see only authorized data:

   **Steps:**

   1. Define RLS roles in Power BI Desktop
   2. Create DAX formulas to filter rows based on role
   3. Assign users to roles
   4. Include role information in embed tokens

   **Example:**

   ```
   Create role "Sales_North" with DAX filter:
   [Region] = "North"

   Include in token:
   identities: [{
     username: "john@company.com",
     roles: ["Sales_North"]
   }]
   ```

   **Best practices:**

   - Define roles based on organizational structure
   - Test RLS thoroughly before production
   - Monitor role assignments for compliance
   - Use dynamic RLS for large organizations

5. **What is the best approach for embedding Power BI in a React application?**  
   **Answer**: Best practices for React Power BI integration:

   **1. Create reusable components:**

   - Build custom `<PowerBIReport>` component wrapping SDK
   - Accept embedUrl, reportId, accessToken as props
   - Handle loading and error states

   **2. Use React hooks:**

   - `useState` for loading/error states
   - `useEffect` for initialization and cleanup
   - `useContext` for global Power BI configuration

   **3. Implement token management:**

   - Fetch token from server API
   - Cache tokens to avoid repeated calls
   - Refresh before expiration

   **4. Error handling:**

   - Listen to Power BI "error" events
   - Display user-friendly error messages
   - Log errors for debugging

   **5. Performance optimization:**

   - Lazy load reports with `React.lazy()`
   - Memoize components with `React.memo()`
   - Implement token caching

6. **What security measures should be implemented when embedding Power BI?**  
   **Answer**: Essential security measures:

   **1. Token Management:**

   - Generate tokens on server-side only
   - Never expose service principal credentials
   - Implement token expiration (1 hour)
   - Refresh tokens before expiration

   **2. HTTPS Only:**

   - Always use secure HTTPS connections
   - Never use HTTP for production

   **3. Authorization:**

   - Validate user permissions server-side
   - Implement Row-Level Security for data isolation
   - Check licensing and access rights

   **4. Audit Logging:**

   - Log all Power BI access attempts
   - Track user actions and report views
   - Monitor for suspicious activity
   - Maintain compliance records

   **5. Data Protection:**

   - Use encryption for sensitive data
   - Implement conditional access policies
   - Set up data loss prevention (DLP)

   **6. Network Security:**

   - Restrict IP ranges if possible
   - Use VPN for internal access
   - Implement web application firewall (WAF)

7. **How do you optimize Power BI performance in a web application?**  
   **Answer**: Performance optimization strategies:

   **1. Token Caching:**

   - Cache access tokens to reduce server calls
   - Refresh only before expiration
   - Save 50-70% server load

   **2. Lazy Loading:**

   - Load reports only when user requests them
   - Use React.lazy() for code splitting
   - Reduces initial page load time by 30-40%

   **3. Data Model Optimization:**

   - Use aggregated/summary tables for dashboards
   - Create appropriate indexes
   - Implement incremental refresh for large datasets

   **4. Query Performance:**

   - Use DirectQuery only for real-time data
   - Use Import mode for better performance
   - Optimize DAX formulas

   **5. Network Optimization:**

   - Compress responses with gzip
   - Implement CDN for static assets
   - Optimize image sizes

   **6. Client-side Optimization:**

   - Implement pagination for large datasets
   - Cache filter results
   - Minimize DOM re-renders

8. **What is progressive disclosure in Power BI UX?**  
   **Answer**: Progressive disclosure reveals information gradually to improve user experience:

   **Concept:**

   - Show essential information initially
   - Reveal advanced features on demand
   - Reduce cognitive load for casual users
   - Enable power users to access advanced controls

   **Implementation:**

   - Hide filter pane by default: `filterPaneEnabled: false`
   - Hide navigation pane: `navContentPaneEnabled: false`
   - Show "Show Filters" button
   - Toggle visibility on button click

   **Benefits:**

   - Cleaner interface for basic users
   - Advanced controls available for experts
   - Improved user satisfaction
   - Reduced training requirements

   **Example UX Flow:**

   1. User sees clean dashboard with main visualization
   2. User clicks "Show Filters" button
   3. Advanced filter panel appears
   4. User applies filters and explores data

9. **How do you handle loading states and errors in Power BI embedding?**  
   **Answer**: Proper error handling improves user experience:

   **Loading States:**

   - Show spinner while report loads
   - Display loading message
   - Disable interactions during load

   **Error Handling:**

   - Listen to "error" events from Power BI SDK
   - Display user-friendly error messages
   - Log detailed errors for debugging
   - Provide recovery options

   **Implementation:**

   ```
   1. Show loading spinner on mount
   2. Listen to "loaded" event → hide spinner
   3. Listen to "error" event → show error message
   4. Provide "Retry" button
   5. Log errors with timestamp and user info
   ```

   **Error Types:**

   - Network errors → Retry or offline mode
   - Authentication errors → Re-authenticate
   - Permission errors → Contact admin
   - Configuration errors → Check setup

10. **What are the key differences between Power BI Service and Power BI Desktop?**  
    **Answer**: Understanding these products is essential:

    **Power BI Desktop:**

    - Standalone application for Windows
    - Used for creating and designing reports
    - Connects to data sources
    - Creates data models
    - Designs visualizations
    - Not for sharing/publishing

    **Power BI Service (Online):**

    - Cloud-based platform
    - Used for sharing and collaboration
    - Publish reports from Desktop to Service
    - Create dashboards
    - Share with team members
    - Set up automatic data refresh
    - Manage security and licensing

    **Power BI Mobile:**

    - Mobile app for iOS/Android
    - View reports and dashboards
    - Mobile-optimized interface
    - Offline viewing capability

    **Typical Workflow:**

    1. Desktop: Connect to data, design report
    2. Publish to Service
    3. Service: Share, set security, refresh
    4. Mobile: Access on the go

11. **How do you implement Row-Level Security for a multi-tenant SaaS application?**  
    **Answer**: Multi-tenant RLS strategy:

    **Architecture:**

    - Single Power BI workspace for all customers
    - Service Principal generates tokens
    - RLS roles per customer
    - Dynamic role assignment

    **Implementation Steps:**

    1. Create RLS roles in Power BI Desktop:

       - Role "Customer_A"
       - Role "Customer_B"
       - DAX filters: `[CustomerID] = "A"`

    2. Generate tokens with user identity:
       ```
       identities: [{
         username: "user@customerA.com",
         roles: ["Customer_A"]
       }]
       ```

    **Advantages:**

    - Cost-effective (one Power BI premium capacity)
    - Scalable for many customers
    - Data isolation guaranteed
    - Consistent experience across customers

12. **What are the best practices for Power BI project structure?**  
    **Answer**: Organizing Power BI effectively:

    **Workspace Organization:**

    - Create separate workspaces for dev/test/prod
    - One workspace per major business area
    - Organize by department or function

    **Report Organization:**

    - Group related reports in workspaces
    - Use consistent naming conventions
    - Document report purpose and dependencies

    **Data Model Best Practices:**

    - Create star schema (fact + dimensions)
    - Hide technical columns from users
    - Use relationships appropriately
    - Create user-friendly column names

    **Refresh Strategy:**

    - Production data: refresh during off-peak hours
    - Development: refresh less frequently
    - Use incremental refresh for large datasets
    - Monitor refresh performance

    **Governance:**

    - Control who can create reports
    - Set naming standards
    - Document all calculations
    - Maintain data dictionary

13. **How do you troubleshoot Power BI embedding issues?**  
    **Answer**: Common troubleshooting steps:

    **Token Issues:**

    - Verify token generation succeeds
    - Check token expiration
    - Ensure workspace/report IDs are correct
    - Validate token permissions

    **Embedding Issues:**

    - Check browser console for errors
    - Verify container element exists and is visible
    - Ensure SDK is properly loaded
    - Check CORS settings for iframe

    **Authentication Issues:**

    - Verify Azure AD credentials
    - Check service principal permissions
    - Validate user roles and licenses
    - Test with different accounts

    **Data Issues:**

    - Verify data source connectivity
    - Check data refresh status
    - Validate RLS configuration
    - Monitor query performance

    **Tools for Debugging:**

    - Browser DevTools (Network, Console)
    - Power BI Admin Portal
    - Azure AD audit logs
    - Application Insights

14. **What metrics should be monitored for Power BI performance?**  
    **Answer**: Key performance indicators:

    **User Experience:**

    - Page load time (target: <2 seconds)
    - Report rendering time (target: <3 seconds)
    - Filter application time (target: <1 second)
    - Time to first interaction

    **Infrastructure:**

    - Premium capacity usage (target: <70%)
    - Query execution time
    - Data refresh duration
    - Concurrent user limit

    **Business Metrics:**

    - User adoption rate
    - Report usage frequency
    - Active users per day
    - Feature usage patterns

    **Security & Compliance:**

    - Failed authentication attempts
    - Unauthorized access attempts
    - Token refresh rate
    - Audit log events

    **Monitoring Tools:**

    - Power BI Admin Portal
    - Application Insights
    - Azure Monitor
    - Custom dashboards

15. **What is the future roadmap of Power BI and key upcoming features?**  
    **Answer**: Evolution of Power BI platform:

    **Recent Innovations:**

    - Power BI with Copilot (AI-powered insights)
    - Paginated reports for formatted output
    - Real-time dashboards
    - Dataflows for self-service ETL
    - Composite models

    **Upcoming Focus Areas:**

    - Enhanced AI/ML capabilities
    - Better mobile experience
    - Improved performance and scalability
    - Expanded data source support
    - Advanced security and governance
    - Better developer experiences and APIs

    **Industry Trends:**

    - Shift to embedded analytics
    - Increased demand for real-time insights
    - Integration with other Microsoft services
    - Expansion of no-code/low-code solutions
    - Focus on data governance and compliance

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
