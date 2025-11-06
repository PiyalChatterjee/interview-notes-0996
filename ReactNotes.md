# ⚛️ React.js Interview Preparation: Complete Cheat Sheet

**Last Updated:** October 31, 2025  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 20-30 hours

---

## 📋 Table of Contents

1. [Part 1: React Fundamentals](#part-1-react-fundamentals)
2. [Part 2: Advanced Patterns](#part-2-advanced-patterns)
3. [Part 3: React Hooks](#part-3-react-hooks)
4. [Part 4: Performance Optimization](#part-4-performance-optimization)
5. [Part 5: Routing & State Management](#part-5-routing--state-management)
6. [Part 6: Testing React](#part-6-testing-react)
7. [Part 7: 30+ MCQs](#part-7-30-mcqs)
8. [Part 8: 10+ Subjective Q&A](#part-8-10-subjective-qa)
9. [Real-Life Scenario-Based Questions](#-real-life-scenario-based-questions)
10. [TLDR Summary](#tldr-summary)

---

# Part 1: React Fundamentals

## 1. Components, JSX & Props

### Explanation:

- **Components**: Reusable UI building blocks that encapsulate their own logic and rendering. Can be class-based (ES6 classes) or function-based (simpler, modern approach).
- **JSX**: JavaScript XML syntax extension that allows writing HTML-like syntax in JavaScript. Gets transpiled to React.createElement() calls.
- **Props**: Immutable data passed from parent to child components. Used for component communication and configuration.

### Deep Dive - JSX and Virtual DOM:

JSX is syntactic sugar that makes React components readable. Under the hood:

```jsx
// JSX
const element = <h1 className="greeting">Hello, {name}!</h1>;

// Transpiles to:
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, ",
  name,
  "!"
);

// Creates Virtual DOM object:
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: ["Hello, ", name, "!"],
  },
};
```

**Virtual DOM Benefits:**

- Efficient diff algorithm (reconciliation)
- Batch updates for better performance
- Cross-browser compatibility
- Predictable updates

### Component Examples:

```jsx
// Function Component with Props Destructuring
function Greeting({ name, age, isOnline = false }) {
  return (
    <div className={`user ${isOnline ? "online" : "offline"}`}>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <span>{isOnline ? "🟢 Online" : "🔴 Offline"}</span>
    </div>
  );
}

// Class Component with PropTypes
import PropTypes from "prop-types";

class UserProfile extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    onEdit: PropTypes.func,
  };

  static defaultProps = {
    onEdit: () => {},
  };

  render() {
    const { user, onEdit } = this.props;
    return (
      <div className="user-profile">
        <img src={user.avatar} alt={`${user.name} avatar`} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => onEdit(user.id)}>Edit Profile</button>
      </div>
    );
  }
}

// Props drilling example (problem)
function App() {
  const user = { name: "Alice", theme: "dark" };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navigation user={user} />;
}

function Navigation({ user }) {
  return <UserMenu user={user} />;
}

function UserMenu({ user }) {
  return <div className={user.theme}>Welcome, {user.name}</div>;
}

// Better solution with Context (coming later)
```

### JSX Advanced Patterns:

```jsx
// Conditional Rendering
function StatusMessage({ isLoading, error, data }) {
  return (
    <div>
      {isLoading && <Spinner />}
      {error && <ErrorMessage error={error} />}
      {data && <DataDisplay data={data} />}
      {!isLoading && !error && !data && <EmptyState />}
    </div>
  );
}

// Lists and Keys
function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Important: unique, stable keys
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </ul>
  );
}

// Fragments to avoid wrapper divs
function UserInfo({ user }) {
  return (
    <React.Fragment>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </React.Fragment>
  );
  // Or shorthand syntax:
  // return (
  //   <>
  //     <h1>{user.name}</h1>
  //     <p>{user.email}</p>
  //   </>
  // );
}

// Dynamic components
function DynamicComponent({ type, ...props }) {
  const ComponentMap = {
    button: Button,
    input: Input,
    select: Select,
  };

  const Component = ComponentMap[type];
  return Component ? <Component {...props} /> : null;
}
```

---

## 2. State, Lifecycle & Event Handling

### State Management:

- **State**: Local component data that can change over time and triggers re-renders
- **setState**: Method to update state in class components (asynchronous and batched)
- **State updates**: Should be treated as immutable - never mutate state directly

### Component Lifecycle (Class Components):

```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
    };
    // Bind methods (or use arrow functions)
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  // 1. MOUNTING PHASE
  static getDerivedStateFromProps(props, state) {
    // Rarely used - updates state based on props changes
    if (props.userId !== state.prevUserId) {
      return {
        prevUserId: props.userId,
        user: null,
        loading: true,
      };
    }
    return null;
  }

  componentDidMount() {
    // Best place for API calls, subscriptions, timers
    this.fetchUser(this.props.userId);
    this.timer = setInterval(this.checkOnlineStatus, 30000);
  }

  // 2. UPDATING PHASE
  shouldComponentUpdate(nextProps, nextState) {
    // Performance optimization - return false to prevent re-render
    return (
      nextProps.userId !== this.props.userId ||
      nextState.user !== this.state.user
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // Respond to prop/state changes
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }

  // 3. UNMOUNTING PHASE
  componentWillUnmount() {
    // Cleanup: clear timers, cancel requests, remove listeners
    clearInterval(this.timer);
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  // 4. ERROR HANDLING
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    // Log to error reporting service
  }

  // Custom methods
  fetchUser = async (userId) => {
    try {
      this.setState({ loading: true, error: null });
      this.abortController = new AbortController();

      const response = await fetch(`/api/users/${userId}`, {
        signal: this.abortController.signal,
      });

      if (!response.ok) throw new Error("Failed to fetch user");

      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      if (error.name !== "AbortError") {
        this.setState({ error: error.message, loading: false });
      }
    }
  };

  handleRefresh = () => {
    this.fetchUser(this.props.userId);
  };

  render() {
    const { user, loading, error, hasError } = this.state;

    if (hasError) {
      return <ErrorBoundary error={error} />;
    }

    if (loading) return <LoadingSpinner />;
    if (error)
      return <ErrorMessage error={error} onRetry={this.handleRefresh} />;
    if (!user) return <div>No user found</div>;

    return (
      <div className="user-profile">
        <img src={user.avatar} alt="User avatar" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <button onClick={this.handleRefresh}>Refresh</button>
      </div>
    );
  }
}
```

### Event Handling in React:

React uses **SyntheticEvent** - a wrapper around native events for cross-browser compatibility.

```jsx
function EventHandlingExamples() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Form event handling
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form submitted:", formData);

    // Access native event if needed
    console.log("Native event:", e.nativeEvent);
  };

  // Mouse events
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      setFormData({ name: "", email: "", message: "" });
    }
  };

  // Event delegation example
  const handleButtonClick = (e) => {
    const action = e.target.dataset.action;
    switch (action) {
      case "save":
        console.log("Saving...");
        break;
      case "cancel":
        console.log("Cancelling...");
        break;
      case "delete":
        if (confirm("Are you sure?")) {
          console.log("Deleting...");
        }
        break;
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <p>
        Mouse: ({mousePosition.x}, {mousePosition.y})
      </p>

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Message"
        />

        <div onClick={handleButtonClick}>
          <button type="submit" data-action="save">
            Save
          </button>
          <button type="button" data-action="cancel">
            Cancel
          </button>
          <button type="button" data-action="delete">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

// Event performance optimization
function OptimizedEventHandling({ items, onItemClick }) {
  // Instead of creating new function for each item
  const handleItemClick = useCallback(
    (e) => {
      const itemId = e.target.closest("[data-item-id]")?.dataset.itemId;
      if (itemId) {
        onItemClick(itemId);
      }
    },
    [onItemClick]
  );

  return (
    <div onClick={handleItemClick}>
      {items.map((item) => (
        <div key={item.id} data-item-id={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

### State Update Patterns:

```jsx
class StateExamples extends React.Component {
  state = {
    count: 0,
    user: { name: "Alice", preferences: { theme: "dark" } },
    todos: [],
  };

  // Functional setState for calculations
  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  // Multiple state updates are batched
  handleMultipleUpdates = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 }); // Both will be batched
    console.log(this.state.count); // Still old value - setState is async
  };

  // Nested state updates (immutable)
  updateUserTheme = (newTheme) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        preferences: {
          ...prevState.user.preferences,
          theme: newTheme,
        },
      },
    }));
  };

  // Array state updates
  addTodo = (text) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, { id: Date.now(), text, completed: false }],
    }));
  };

  toggleTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  deleteTodo = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  };

  render() {
    return (
      <div>
        <Counter count={this.state.count} onIncrement={this.incrementCount} />
        <TodoList
          todos={this.state.todos}
          onAdd={this.addTodo}
          onToggle={this.toggleTodo}
          onDelete={this.deleteTodo}
        />
      </div>
    );
  }
}
```

---

# Part 2: Advanced Patterns

## 1. Higher Order Components (HOCs)

### Explanation:

HOCs are functions that take a component and return a new enhanced component. They're used for code reuse, logic abstraction, and cross-cutting concerns.

**Common Use Cases:**

- Authentication checks
- Logging and analytics
- Data fetching
- Loading states
- Error handling

### Code Examples:

```jsx
// Basic HOC pattern
function withLogger(WrappedComponent) {
  return function WithLoggerComponent(props) {
    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted with props:`, props);
      return () => console.log(`${WrappedComponent.name} unmounted`);
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// Authentication HOC
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <LoadingSpinner />;

    if (!user) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// Data fetching HOC
function withData(url, propName = "data") {
  return function (WrappedComponent) {
    return function WithDataComponent(props) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        async function fetchData() {
          try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch");
            const result = await response.json();
            setData(result);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }, [url]);

      const enhancedProps = {
        ...props,
        [propName]: data,
        [`${propName}Loading`]: loading,
        [`${propName}Error`]: error,
      };

      return <WrappedComponent {...enhancedProps} />;
    };
  };
}

// Advanced HOC with configuration
function withLoadingState(loadingProps = {}) {
  return function (WrappedComponent) {
    return function WithLoadingStateComponent(props) {
      const { isLoading, loadingText = "Loading...", ...otherProps } = props;

      if (isLoading) {
        return (
          <div className="loading-container" {...loadingProps}>
            <Spinner />
            <p>{loadingText}</p>
          </div>
        );
      }

      return <WrappedComponent {...otherProps} />;
    };
  };
}

// Multiple HOCs composition
const enhance = compose(
  withAuth,
  withData("/api/user-profile", "profile"),
  withLoadingState({ className: "profile-loading" }),
  withLogger
);

const EnhancedProfile = enhance(UserProfile);

// Usage examples
const LoggedButton = withLogger(Button);
const AuthenticatedDashboard = withAuth(Dashboard);
const UserListWithData = withData("/api/users", "users")(UserList);

// HOC with render props pattern
function withToggle(WrappedComponent) {
  return function WithToggleComponent(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
      <WrappedComponent
        {...props}
        isOpen={isOpen}
        toggle={toggle}
        open={open}
        close={close}
      />
    );
  };
}

// Dropdown component using HOC
const DropdownMenu = withToggle(({ isOpen, toggle, items }) => (
  <div className="dropdown">
    <button onClick={toggle}>Menu</button>
    {isOpen && (
      <ul className="dropdown-menu">
        {items.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    )}
  </div>
));
```

## 2. Render Props Pattern

### Explanation:

Render props is a technique where a component receives a function as a prop that returns React elements. This pattern allows sharing code between components using a prop whose value is a function.

### Code Examples:

```jsx
// Basic render prop component
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  return <div onMouseMove={handleMouseMove}>{render(position)}</div>;
}

// Usage with render prop
function App() {
  return (
    <Mouse
      render={({ x, y }) => (
        <h1>
          Mouse position: ({x}, {y})
        </h1>
      )}
    />
  );
}

// Alternative: children as function
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}>
      {children(position)}
    </div>
  );
}

// Usage with children as function
<MouseTracker>{({ x, y }) => <Cat x={x} y={y} />}</MouseTracker>;

// Data fetcher with render props
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return children({ data, loading, error });
}

// Usage
function UserList() {
  return (
    <DataFetcher url="/api/users">
      {({ data, loading, error }) => {
        if (loading) return <LoadingSpinner />;
        if (error) return <ErrorMessage error={error} />;
        if (!data) return <div>No data</div>;

        return (
          <ul>
            {data.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}

// Complex render prop: Form validation
function FormValidator({ children, validationRules }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return "";

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return "";
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const isValid = Object.values(errors).every((error) => !error);

  return children({
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
  });
}

// Usage
function LoginForm() {
  const validationRules = {
    email: [
      (value) => (!value ? "Email is required" : ""),
      (value) => (!/\S+@\S+\.\S+/.test(value) ? "Email is invalid" : ""),
    ],
    password: [
      (value) => (!value ? "Password is required" : ""),
      (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : "",
    ],
  };

  return (
    <FormValidator validationRules={validationRules}>
      {({ values, errors, touched, isValid, handleChange, handleBlur }) => (
        <form>
          <input
            type="email"
            value={values.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="Email"
          />
          {touched.email && errors.email && (
            <span className="error">{errors.email}</span>
          )}

          <input
            type="password"
            value={values.password || ""}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            placeholder="Password"
          />
          {touched.password && errors.password && (
            <span className="error">{errors.password}</span>
          )}

          <button type="submit" disabled={!isValid}>
            Login
          </button>
        </form>
      )}
    </FormValidator>
  );
}
```

## 3. Compound Components Pattern

### Explanation:

Compound components work together to form a complete UI. The parent component manages state and provides context, while child components access the context to render appropriately.

```jsx
// Tabs compound component
const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={`tab ${activeTab === index ? "active" : ""}`}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ index, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === index ? (
    <div className="tab-panel">{children}</div>
  ) : null;
}

// Add static properties for better API
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.List>
        <Tabs.Tab index={0}>Home</Tabs.Tab>
        <Tabs.Tab index={1}>About</Tabs.Tab>
        <Tabs.Tab index={2}>Contact</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panels>
        <Tabs.Panel index={0}>
          <h2>Home Content</h2>
        </Tabs.Panel>
        <Tabs.Panel index={1}>
          <h2>About Content</h2>
        </Tabs.Panel>
        <Tabs.Panel index={2}>
          <h2>Contact Content</h2>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}
```

## 4. Controlled vs Uncontrolled Components

### Controlled Components:

Components where form data is handled by React state.

```jsx
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    newsletter: false,
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
        />
        Subscribe to newsletter
      </label>

      <textarea
        name="comments"
        value={formData.comments}
        onChange={handleChange}
        placeholder="Comments"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Uncontrolled Components:

Components where form data is handled by the DOM itself, accessed via refs.

```jsx
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const countryRef = useRef();
  const newsletterRef = useRef();
  const commentsRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      country: countryRef.current.value,
      newsletter: newsletterRef.current.checked,
      comments: commentsRef.current.value,
    };

    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" defaultValue="" placeholder="Name" />

      <input ref={emailRef} type="email" defaultValue="" placeholder="Email" />

      <select ref={countryRef} defaultValue="">
        <option value="">Select Country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>

      <label>
        <input ref={newsletterRef} type="checkbox" defaultChecked={false} />
        Subscribe to newsletter
      </label>

      <textarea ref={commentsRef} defaultValue="" placeholder="Comments" />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### Hybrid Approach:

```jsx
// Custom hook for form handling
function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const validate = useCallback(
    (validationRules) => {
      const newErrors = {};
      Object.keys(validationRules).forEach((field) => {
        const rule = validationRules[field];
        const error = rule(values[field]);
        if (error) newErrors[field] = error;
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [values]
  );

  return { values, errors, handleChange, reset, validate };
}

// Usage
function SmartForm() {
  const { values, errors, handleChange, reset, validate } = useForm({
    name: "",
    email: "",
    age: "",
  });

  const validationRules = {
    name: (value) => (!value ? "Name is required" : ""),
    email: (value) => (!/\S+@\S+\.\S+/.test(value) ? "Invalid email" : ""),
    age: (value) => (isNaN(value) || value < 18 ? "Must be 18 or older" : ""),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(validationRules)) {
      console.log("Valid form:", values);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        name="age"
        type="number"
        value={values.age}
        onChange={handleChange}
        placeholder="Age"
      />
      {errors.age && <span className="error">{errors.age}</span>}

      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}
```

---

# Part 3: React Hooks Deep Dive

## 1. useState & useEffect - Advanced Patterns

### useState Advanced:

```jsx
// Lazy initial state - expensive calculations
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    // Only runs on initial render
    return computeExpensiveValue();
  });

  // Functional updates for state based on previous state
  const [count, setCount] = useState(0);

  const incrementTwice = () => {
    setCount((prev) => prev + 1); // Correct way
    setCount((prev) => prev + 1); // Both will execute
  };

  // Object state updates
  const [user, setUser] = useState({ name: "", email: "", preferences: {} });

  const updateUserName = (name) => {
    setUser((prev) => ({ ...prev, name }));
  };

  const updatePreference = (key, value) => {
    setUser((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }));
  };

  // Array state management
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}
```

### useEffect Advanced Patterns:

```jsx
function DataFetchingComponent({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Basic data fetching
  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");

        const userData = await response.json();

        if (!cancelled) {
          setUser(userData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true; // Cleanup flag
    };
  }, [userId]);

  // Multiple effects for separation of concerns
  useEffect(() => {
    // Document title update
    document.title = user ? `Profile - ${user.name}` : "Profile";
  }, [user]);

  useEffect(() => {
    // Analytics tracking
    if (user) {
      analytics.track("User Profile Viewed", { userId: user.id });
    }
  }, [user]);

  useEffect(() => {
    // Subscription effect
    const subscription = websocket.subscribe(`user-${userId}`, (data) => {
      setUser((prev) => ({ ...prev, ...data }));
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  // Interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Poll for updates every 30 seconds
      if (userId) {
        fetch(`/api/users/${userId}/status`)
          .then((res) => res.json())
          .then((status) => setUser((prev) => ({ ...prev, status })));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <div>No user found</div>;

  return <UserProfile user={user} />;
}

// Custom hook for data fetching
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
```

## 2. useContext - Complete Guide

### Context Creation and Usage:

```jsx
// Theme Context
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const contextValue = {
    theme,
    fontSize,
    toggleTheme,
    setFontSize,
    colors:
      theme === "light"
        ? { bg: "#fff", text: "#000" }
        : { bg: "#000", text: "#fff" },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using theme
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// User Context with authentication
const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem("authToken");
    if (token) {
      validateToken(token)
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const { user, token } = await response.json();

      localStorage.setItem("authToken", token);
      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Multiple contexts composition
function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

// Component using multiple contexts
function Header() {
  const { user, logout } = useContext(UserContext);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header header--${theme}`}>
      <h1>My App</h1>
      <div className="header-actions">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
        {user && (
          <div className="user-menu">
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
```

### ⚠️ Context API Pitfalls & Solutions

#### Pitfall 1: Unnecessary Re-renders (Most Common)

**Problem:**

```jsx
// ❌ ANTI-PATTERN: All consumers re-render when ANY value changes
function BadProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  // Value object is recreated on every render
  // Even if just user changed, theme consumers also re-render!
  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    setNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Component consuming only theme still re-renders when user changes
function ThemeToggle() {
  const { theme, setTheme } = useContext(AppContext); // Re-renders on ANY change
  return <button onClick={() => setTheme("dark")}>Toggle</button>;
}
```

**Solution 1: Split Contexts by Change Frequency**

```jsx
// ✅ SOLUTION: Separate contexts by update frequency
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function AppProviders({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  // Each context has its own Provider
  // Theme consumers only re-render when theme changes
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <NotificationContext.Provider
          value={{ notifications, setNotifications }}
        >
          {children}
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// ✅ Now only theme changes trigger theme consumer re-renders
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme("dark")}>Toggle</button>;
}
```

**Solution 2: Memoize Context Value**

```jsx
// ✅ SOLUTION: Use useMemo to prevent unnecessary recreations
import { useMemo, useCallback } from "react";

function OptimizedProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  // Memoize the value object - only recreate when dependencies change
  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// ✅ Use useCallback for stable function references
function AdvancedProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    theme: "light",
    notifications: [],
  });

  const updateUser = useCallback((user) => {
    setState((prev) => ({ ...prev, user }));
  }, []);

  const updateTheme = useCallback((theme) => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  const value = useMemo(
    () => ({
      user: state.user,
      updateUser,
      theme: state.theme,
      updateTheme,
    }),
    [state.user, state.theme, updateUser, updateTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
```

#### Pitfall 2: Context Value Object Recreation

**Problem:**

```jsx
// ❌ ANTI-PATTERN: Inline objects recreated every render
function BadProvider({ children }) {
  const [user, setUser] = useState(null);

  // NEW object every render, even if user didn't change!
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// All consumers re-render because {} !== {} (object reference changed)
```

**Solution:**

```jsx
// ✅ SOLUTION: Memoize the context value
function GoodProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

#### Pitfall 3: Using Context for Frequently Changing State

**Problem:**

```jsx
// ❌ ANTI-PATTERN: Using context for high-frequency updates
function FormProvider({ children }) {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  // User types → state updates → all consumers re-render
  // Typing in input field causes 60+ re-renders per second!
  // If this context is used in 100s of form fields, performance tanks

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
}
```

**Solution:**

```jsx
// ✅ SOLUTION: Use local state for frequently changing data
function Form() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Local state - only this component re-renders
  // Use context only to submit/share final data
  const { saveFormData } = useFormContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    saveFormData(formData); // Only share when needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
}
```

#### Pitfall 4: Not Splitting Dispatchers and Data

**Problem:**

```jsx
// ❌ ANTI-PATTERN: Mixed data and setters in single context
function BadProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  // Even if consumer only calls setTheme,
  // it still re-renders when user changes
  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}
```

**Solution:**

```jsx
// ✅ SOLUTION: Separate data from dispatchers
const UserDataContext = createContext();
const UserDispatchContext = createContext();
const ThemeDataContext = createContext();
const ThemeDispatchContext = createContext();

function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  return (
    <UserDataContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        <ThemeDataContext.Provider value={theme}>
          <ThemeDispatchContext.Provider value={setTheme}>
            {children}
          </ThemeDispatchContext.Provider>
        </ThemeDataContext.Provider>
      </UserDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

// Component only re-renders when using data it subscribes to
function ThemeToggle() {
  const theme = useContext(ThemeDataContext);
  const setTheme = useContext(ThemeDispatchContext);
  // Only re-renders when theme changes
  return <button onClick={() => setTheme("dark")}>Toggle</button>;
}
```

#### Pitfall 5: Missing Provider Checks

**Problem:**

```jsx
// ❌ ANTI-PATTERN: No check if context provider exists
function useAuth() {
  return useContext(AuthContext); // Crashes if outside provider!
}

// App renders UserProfile without AuthProvider
function App() {
  return <UserProfile />; // Error: Cannot read property 'user' of undefined
}
```

**Solution:**

```jsx
// ✅ SOLUTION: Always validate context in custom hooks
function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider. " +
        "Did you forget to wrap your app with <AuthProvider>?"
    );
  }

  return context;
}

// ✅ Even better: Create a wrapper component
function withAuthProvider(Component) {
  return function ProtectedComponent(props) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    );
  };
}

const ProtectedApp = withAuthProvider(App);
```

#### Pitfall 6: Context as Replacement for State Management

**Problem:**

```jsx
// ❌ ANTI-PATTERN: Using context for complex app state
// When you have:
// - 100+ state variables
// - Complex update logic
// - Multiple interdependent states
// - Need for time-travel debugging

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Simple context can't handle this well
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
```

**Solution:**

```jsx
// ✅ SOLUTION: Use Redux, Zustand, or Recoil for complex state
// Context is for sharing simple, static data
// Redux is for complex, interconnected state

// Use context for:
// - Theme, Language, Notifications
// - User authentication (relatively stable)

// Use Redux/Zustand for:
// - Complex business logic
// - Multiple interconnected states
// - Need for debugging/devtools
// - Large scale applications

// Example: Use both together
function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
```

#### Pitfall 7: Memory Leaks with Listeners

**Problem:**

```jsx
// ❌ ANTI-PATTERN: Not cleaning up event listeners
function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
      setNotifications((prev) => [...prev, event.data]);
    };

    // Subscribe but never unsubscribe!
    window.addEventListener("message", handleMessage);

    // Missing cleanup - listener stays in memory
  }, []);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
}
```

**Solution:**

```jsx
// ✅ SOLUTION: Always clean up in useEffect
function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
      setNotifications((prev) => [...prev, event.data]);
    };

    window.addEventListener("message", handleMessage);

    // Cleanup function
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
}
```

### Summary of Context Pitfalls:

| Pitfall                    | Impact        | Solution                              |
| -------------------------- | ------------- | ------------------------------------- |
| **No Value Memoization**   | Re-renders    | Use `useMemo` for context value       |
| **Single Mixed Context**   | Re-renders    | Split contexts by change frequency    |
| **High-frequency Updates** | Performance   | Use local state + context for sharing |
| **Data & Setters Mixed**   | Re-renders    | Separate data and dispatch contexts   |
| **Missing Provider Check** | Runtime error | Validate context in custom hooks      |
| **Complex State Logic**    | Maintenance   | Use Redux/Zustand instead             |
| **No Cleanup**             | Memory leaks  | Clean up listeners in useEffect       |

```

```

## 3. useReducer - Advanced State Management

### Basic useReducer:

```jsx
// Action types
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset",
  SET_COUNT: "set_count",
};

function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + (action.payload || 1) };
    case ACTIONS.DECREMENT:
      return { count: state.count - (action.payload || 1) };
    case ACTIONS.RESET:
      return { count: 0 };
    case ACTIONS.SET_COUNT:
      return { count: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+1</button>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT, payload: 5 })}>
        +5
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-1</button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>Reset</button>
    </div>
  );
}
```

### Complex useReducer - Todo App:

```jsx
const TODO_ACTIONS = {
  ADD_TODO: "add_todo",
  TOGGLE_TODO: "toggle_todo",
  DELETE_TODO: "delete_todo",
  EDIT_TODO: "edit_todo",
  SET_FILTER: "set_filter",
  CLEAR_COMPLETED: "clear_completed",
  LOAD_TODOS: "load_todos",
};

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };

    case TODO_ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case TODO_ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TODO_ACTIONS.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case TODO_ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case TODO_ACTIONS.LOAD_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: FILTERS.ALL,
    loading: true,
  });

  // Load todos on mount
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((todos) =>
        dispatch({ type: TODO_ACTIONS.LOAD_TODOS, payload: todos })
      );
  }, []);

  // Computed values
  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case FILTERS.ACTIVE:
        return !todo.completed;
      case FILTERS.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const activeCount = state.todos.filter((todo) => !todo.completed).length;
  const completedCount = state.todos.filter((todo) => todo.completed).length;

  const addTodo = (text) => {
    if (text.trim()) {
      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: text.trim() });
    }
  };

  return (
    <div className="todo-app">
      <TodoInput onAdd={addTodo} />

      <div className="todo-stats">
        <span>{activeCount} active</span>
        <span>{completedCount} completed</span>
      </div>

      <TodoFilters
        currentFilter={state.filter}
        onFilterChange={(filter) =>
          dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: filter })
        }
      />

      <TodoList
        todos={filteredTodos}
        onToggle={(id) =>
          dispatch({ type: TODO_ACTIONS.TOGGLE_TODO, payload: id })
        }
        onDelete={(id) =>
          dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: id })
        }
        onEdit={(id, text) =>
          dispatch({ type: TODO_ACTIONS.EDIT_TODO, payload: { id, text } })
        }
      />

      {completedCount > 0 && (
        <button
          onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED })}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}
```

## 4. useMemo & useCallback - Performance Optimization

### useMemo Examples:

```jsx
function ExpensiveList({ items, filter, sortBy }) {
  // Expensive filtering and sorting
  const processedItems = useMemo(() => {
    console.log("Processing items..."); // Only runs when dependencies change

    return items
      .filter((item) =>
        filter ? item.name.toLowerCase().includes(filter.toLowerCase()) : true
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "date":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "price":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [items, filter, sortBy]);

  // Expensive calculation
  const statistics = useMemo(() => {
    return {
      total: processedItems.length,
      averagePrice:
        processedItems.reduce((sum, item) => sum + item.price, 0) /
        processedItems.length,
      categories: [...new Set(processedItems.map((item) => item.category))],
    };
  }, [processedItems]);

  return (
    <div>
      <div className="stats">
        <p>Total: {statistics.total}</p>
        <p>Average Price: ${statistics.averagePrice.toFixed(2)}</p>
        <p>Categories: {statistics.categories.join(", ")}</p>
      </div>

      <ul>
        {processedItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### useCallback Examples:

```jsx
function TodoList({ todos }) {
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Memoized callbacks to prevent child re-renders
  const handleToggle = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // No dependencies needed if using functional update

  const handleDelete = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleEdit = useCallback((id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setEditingId(null);
  }, []);

  // Complex callback with dependencies
  const handleBulkAction = useCallback((action) => {
    switch (action) {
      case "complete-all":
        setTodos((prev) => prev.map((todo) => ({ ...todo, completed: true })));
        break;
      case "delete-completed":
        setTodos((prev) => prev.filter((todo) => !todo.completed));
        break;
      case "reset":
        setTodos([]);
        break;
    }
  }, []); // Dependencies handled by functional updates

  // Memoized filter function
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case "active":
          return !todo.completed;
        case "completed":
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <div>
      <FilterBar
        currentFilter={filter}
        onFilterChange={setFilter}
        onBulkAction={handleBulkAction}
      />

      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onStartEdit={setEditingId}
        />
      ))}
    </div>
  );
}

// Memoized child component
const TodoItem = React.memo(
  ({ todo, isEditing, onToggle, onDelete, onEdit, onStartEdit }) => {
    const [editText, setEditText] = useState(todo.text);

    useEffect(() => {
      setEditText(todo.text);
    }, [todo.text]);

    const handleSubmit = (e) => {
      e.preventDefault();
      onEdit(todo.id, editText);
    };

    if (isEditing) {
      return (
        <form onSubmit={handleSubmit}>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => onStartEdit(null)}>
            Cancel
          </button>
        </form>
      );
    }

    return (
      <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span onDoubleClick={() => onStartEdit(todo.id)}>{todo.text}</span>
        <button onClick={() => onDelete(todo.id)}>Delete</button>
      </div>
    );
  }
);
```

## 5. Custom Hooks - Reusable Logic

### Common Custom Hooks:

```jsx
// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

// useToggle hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}

// useDebounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// useFetch hook
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// useWindowSize hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// useInterval hook
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// useForm hook
function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setValues((prev) => ({ ...prev, [name]: newValue }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate field on blur
      if (validationRules[name]) {
        const error = validationRules[name](values[name]);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [values, validationRules]
  );

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](values[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationRules]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}

// Usage examples
function App() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isMenuOpen, toggleMenu] = useToggle(false);
  const { width, height } = useWindowSize();

  const { values, errors, handleChange, handleBlur, validate, reset } = useForm(
    { name: "", email: "" },
    {
      name: (value) => (!value ? "Name is required" : ""),
      email: (value) => (!/\S+@\S+\.\S+/.test(value) ? "Email is invalid" : ""),
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form is valid:", values);
    }
  };

  return (
    <div className={`app theme-${theme}`}>
      <p>
        Window size: {width} x {height}
      </p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <button onClick={toggleMenu}>{isMenuOpen ? "Close" : "Open"} Menu</button>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <button type="submit">Submit</button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </form>
    </div>
  );
}
```

---

# Part 4: Performance Optimization & Advanced Concepts

## 1. React.memo, useMemo, useCallback - Deep Dive

### React.memo Advanced:

```jsx
// Basic React.memo
const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
  config,
}) {
  // Only re-renders if props actually change
  return (
    <div>
      {data.map((item) => (
        <ComplexItem key={item.id} item={item} config={config} />
      ))}
    </div>
  );
});

// React.memo with custom comparison
const UserCard = React.memo(
  function UserCard({ user, onEdit, theme }) {
    return (
      <div className={`user-card theme-${theme}`}>
        <img src={user.avatar} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={() => onEdit(user.id)}>Edit</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function - return true if equal (no re-render needed)
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.email === nextProps.user.email &&
      prevProps.user.avatar === nextProps.user.avatar &&
      prevProps.theme === nextProps.theme
      // Note: onEdit is excluded from comparison as it should be memoized
    );
  }
);

// Performance anti-pattern
function App() {
  const [count, setCount] = useState(0);

  // BAD: Creates new object on every render
  const badConfig = { theme: "dark", mode: "advanced" };

  // BAD: Creates new function on every render
  const badHandler = () => console.log("clicked");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* This will re-render unnecessarily */}
      <ExpensiveComponent data={[]} config={badConfig} onClick={badHandler} />
    </div>
  );
}

// Performance optimized version
function App() {
  const [count, setCount] = useState(0);

  // GOOD: Memoized object
  const config = useMemo(() => ({ theme: "dark", mode: "advanced" }), []);

  // GOOD: Memoized function
  const handleClick = useCallback(() => console.log("clicked"), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      {/* This won't re-render unless necessary */}
      <ExpensiveComponent data={[]} config={config} onClick={handleClick} />
    </div>
  );
}
```

### Advanced Memoization Patterns:

```jsx
// Selector pattern with useMemo
function ProductList({ products, filters, sortBy }) {
  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category && product.category !== filters.category)
        return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.inStock && !product.inStock) return false;
      return true;
    });
  }, [products, filters]);

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Memoize statistics
  const stats = useMemo(
    () => ({
      total: sortedProducts.length,
      averagePrice:
        sortedProducts.reduce((sum, p) => sum + p.price, 0) /
        sortedProducts.length,
      categories: [...new Set(sortedProducts.map((p) => p.category))],
      priceRange: {
        min: Math.min(...sortedProducts.map((p) => p.price)),
        max: Math.max(...sortedProducts.map((p) => p.price)),
      },
    }),
    [sortedProducts]
  );

  return (
    <div>
      <ProductStats stats={stats} />
      <ProductGrid products={sortedProducts} />
    </div>
  );
}

// Factory function for memoized callbacks
function useStableCallback(callback, deps) {
  const ref = useRef();

  return useCallback((...args) => {
    ref.current = callback;
    return ref.current(...args);
  }, deps);
}

// Complex form with optimized re-renders
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
    category: "general",
  });

  // Memoized field updater
  const updateField = useCallback(
    (field) => (value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  // Memoized validation
  const validation = useMemo(() => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.includes("@")) errors.email = "Invalid email";
    if (!formData.message.trim()) errors.message = "Message is required";

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  }, [formData]);

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validation.isValid) return;

      try {
        await submitForm(formData);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          priority: "medium",
          category: "general",
        });
      } catch (error) {
        console.error("Submit failed:", error);
      }
    },
    [formData, validation.isValid]
  );

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        value={formData.name}
        onChange={updateField("name")}
        error={validation.errors.name}
        placeholder="Name"
      />
      <TextInput
        value={formData.email}
        onChange={updateField("email")}
        error={validation.errors.email}
        placeholder="Email"
        type="email"
      />
      <SelectInput
        value={formData.priority}
        onChange={updateField("priority")}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
      />
      <TextAreaInput
        value={formData.message}
        onChange={updateField("message")}
        error={validation.errors.message}
        placeholder="Message"
      />
      <button type="submit" disabled={!validation.isValid}>
        Send Message
      </button>
    </form>
  );
}

// Memoized form field components
const TextInput = React.memo(({ value, onChange, error, ...props }) => (
  <div className="form-field">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={error ? "error" : ""}
      {...props}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
));

const SelectInput = React.memo(({ value, onChange, options, ...props }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));
```

## 2. Error Boundaries & Error Handling

### Error Boundary Implementation:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service
    if (typeof this.props.onError === "function") {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.state.errorInfo);
      }

      // Default error UI
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>We're sorry, but something unexpected happened.</p>
          {process.env.NODE_ENV === "development" && (
            <details style={{ whiteSpace: "pre-wrap" }}>
              <summary>Error Details (Development Only)</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary (React 17+)
function useErrorHandler() {
  const [error, setError] = useState(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error, errorInfo) => {
    setError({ error, errorInfo });

    // Log to error service
    console.error("Error captured:", error, errorInfo);
  }, []);

  useEffect(() => {
    if (error) {
      // Report error to monitoring service
      reportError(error.error, error.errorInfo);
    }
  }, [error]);

  return { error, resetError, captureError };
}

// Custom error boundary hook
function withErrorBoundary(Component, errorFallback) {
  return function WrappedComponent(props) {
    const { error, resetError, captureError } = useErrorHandler();

    if (error) {
      return errorFallback ? (
        errorFallback(error, resetError)
      ) : (
        <DefaultErrorFallback error={error} resetError={resetError} />
      );
    }

    return (
      <ErrorBoundary onError={captureError}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Usage examples
function App() {
  const handleError = (error, errorInfo) => {
    // Send to error reporting service
    errorReportingService.captureException(error, {
      extra: errorInfo,
      tags: { component: "App" },
    });
  };

  return (
    <ErrorBoundary
      onError={handleError}
      fallback={(error, errorInfo) => (
        <div className="app-error">
          <h1>Application Error</h1>
          <p>
            We've encountered an unexpected error. Our team has been notified.
          </p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}
    >
      <Header />
      <main>
        <ErrorBoundary fallback={() => <div>Could not load sidebar</div>}>
          <Sidebar />
        </ErrorBoundary>

        <ErrorBoundary fallback={() => <div>Could not load main content</div>}>
          <MainContent />
        </ErrorBoundary>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}

// Async error handling
function AsyncErrorExample() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/data");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err);

      // Report async errors
      errorReportingService.captureException(err, {
        tags: { type: "async-fetch" },
        extra: { url: "/api/data" },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={fetchData} />;
  if (!data) return <div>No data available</div>;

  return <DataDisplay data={data} />;
}
```

## 3. Portals & Advanced Patterns

### React Portals:

```jsx
// Modal using Portal
function Modal({ children, isOpen, onClose }) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

// Tooltip using Portal
function Tooltip({ children, content, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef();
  const tooltipRef = useRef();

  const showTooltip = useCallback((e) => {
    const rect = e.target.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    setTooltipPosition({
      x: rect.left + scrollX + rect.width / 2,
      y: rect.top + scrollY,
    });
    setIsVisible(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
      </span>

      {isVisible &&
        ReactDOM.createPortal(
          <div
            ref={tooltipRef}
            className={`tooltip tooltip--${position}`}
            style={{
              position: "absolute",
              left: tooltipPosition.x,
              top:
                position === "top"
                  ? tooltipPosition.y - 10
                  : tooltipPosition.y + 30,
              transform: "translateX(-50%)",
              zIndex: 9999,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

// Dropdown using Portal (avoids z-index issues)
function Dropdown({ trigger, children, placement = "bottom-start" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      // Calculate position
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + window.scrollX,
        y: rect.bottom + window.scrollY,
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <div ref={triggerRef} onClick={toggleDropdown}>
        {trigger}
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className="dropdown-portal"
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              zIndex: 9999,
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}

// Notification system using Portal
const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      type: "info",
      duration: 5000,
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success: (message) => addNotification({ type: "success", message }),
    error: (message) =>
      addNotification({ type: "error", message, duration: 0 }),
    warning: (message) => addNotification({ type: "warning", message }),
    info: (message) => addNotification({ type: "info", message }),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

function NotificationContainer({ notifications, onRemove }) {
  if (notifications.length === 0) return null;

  return ReactDOM.createPortal(
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onRemove={() => onRemove(notification.id)}
        />
      ))}
    </div>,
    document.body
  );
}

// Hook for using notifications
function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}
```

## 4. Concurrent Features (React 18+)

### Suspense and Lazy Loading:

```jsx
// Lazy loading components
const LazyDashboard = lazy(() => import("./Dashboard"));
const LazyProfile = lazy(() => import("./Profile"));
const LazySettings = lazy(() => import("./Settings"));

// Code splitting by route
function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<DashboardSkeleton />}>
                <LazyDashboard />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<ProfileSkeleton />}>
                <LazyProfile />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<SettingsSkeleton />}>
                <LazySettings />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Data fetching with Suspense
function UserProfile({ userId }) {
  // This will suspend until data is loaded
  const user = useSuspenseQuery(["user", userId], () => fetchUser(userId));

  return (
    <div className="user-profile">
      <img src={user.avatar} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Nested Suspense boundaries
function Dashboard() {
  return (
    <div className="dashboard">
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCards />
      </Suspense>

      <div className="dashboard-content">
        <Suspense fallback={<ChartSkeleton />}>
          <AnalyticsChart />
        </Suspense>

        <Suspense fallback={<RecentActivitySkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
}

// Transitions (React 18)
function SearchResults() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);

    // Mark state updates as non-urgent
    startTransition(() => {
      // This expensive operation won't block the input
      setResults(performExpensiveSearch(newQuery));
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />

      {isPending && <div className="search-pending">Searching...</div>}

      <ResultsList results={results} />
    </div>
  );
}

// useDeferredValue for expensive operations
function ProductList({ searchQuery }) {
  const deferredQuery = useDeferredValue(searchQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Expensive search operation
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
    setResults(filtered);
  }, [deferredQuery]);

  return (
    <div>
      {searchQuery !== deferredQuery && (
        <div className="search-stale">Updating results...</div>
      )}
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

# Part 5: Routing & State Management

## 1. React Router v6 Example

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 2. Redux (State Management)

```jsx
import { createStore } from "redux";
const reducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    default:
      return state;
  }
};
const store = createStore(reducer);
```

---

# Part 6: Testing React Applications

## 1. Unit Testing with Jest & React Testing Library

### Component Testing Patterns:

```jsx
// UserCard.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserCard } from "./UserCard";

describe("UserCard", () => {
  const mockUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg",
    isActive: true,
  };

  const mockProps = {
    user: mockUser,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    onToggleStatus: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders user information correctly", () => {
    render(<UserCard {...mockProps} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe")).toHaveAttribute(
      "src",
      mockUser.avatar
    );
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("calls onEdit when edit button is clicked", async () => {
    const user = userEvent.setup();
    render(<UserCard {...mockProps} />);

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);

    expect(mockProps.onEdit).toHaveBeenCalledWith(mockUser.id);
    expect(mockProps.onEdit).toHaveBeenCalledTimes(1);
  });

  test("shows confirmation dialog when delete is clicked", async () => {
    const user = userEvent.setup();
    render(<UserCard {...mockProps} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(
      screen.getByText(/are you sure you want to delete/i)
    ).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    await user.click(confirmButton);

    expect(mockProps.onDelete).toHaveBeenCalledWith(mockUser.id);
  });

  test("toggles user status", async () => {
    const user = userEvent.setup();
    render(<UserCard {...mockProps} />);

    const toggleButton = screen.getByRole("button", { name: /toggle status/i });
    await user.click(toggleButton);

    expect(mockProps.onToggleStatus).toHaveBeenCalledWith(mockUser.id, false);
  });

  test("handles loading state", () => {
    render(<UserCard {...mockProps} isLoading={true} />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  test("handles error state", () => {
    const errorMessage = "Failed to load user";
    render(<UserCard {...mockProps} error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});

// Hook testing
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  test("initializes with default value", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test("initializes with custom value", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  test("increments count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("decrements count", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  test("resets count", () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });
});

// Async hook testing
import { useApi } from "./useApi";

describe("useApi", () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch;
    jest.clearAllMocks();
  });

  test("fetches data successfully", async () => {
    const mockData = { id: 1, name: "Test" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const { result } = renderHook(() => useApi("/api/test"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test("handles fetch error", async () => {
    const errorMessage = "Network error";
    mockFetch.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => useApi("/api/test"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(errorMessage);
  });
});
```

### Testing Context and State Management:

```jsx
// Context testing
import { render, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";

function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

function renderWithTheme(ui, { theme = "light" } = {}) {
  return render(<ThemeProvider defaultTheme={theme}>{ui}</ThemeProvider>);
}

describe("ThemeProvider", () => {
  test("provides default theme", () => {
    renderWithTheme(<TestComponent />);

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");
  });

  test("toggles theme", async () => {
    const user = userEvent.setup();
    renderWithTheme(<TestComponent />);

    expect(screen.getByTestId("current-theme")).toHaveTextContent("light");

    await user.click(screen.getByText("Toggle Theme"));

    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });
});

// Redux testing
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { TodoList } from "./TodoList";
import { todoReducer } from "./todoReducer";

function renderWithRedux(
  ui,
  { initialState = {}, store = createStore(todoReducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe("TodoList with Redux", () => {
  test("renders todos from store", () => {
    const initialState = {
      todos: [
        { id: 1, text: "Learn React", completed: false },
        { id: 2, text: "Write tests", completed: true },
      ],
    };

    renderWithRedux(<TodoList />, { initialState });

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  test("dispatches action when todo is added", async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<TodoList />);

    const input = screen.getByPlaceholderText("Add todo");
    const addButton = screen.getByText("Add");

    await user.type(input, "New todo");
    await user.click(addButton);

    const state = store.getState();
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0].text).toBe("New todo");
  });
});
```

## 2. Integration Testing

### Testing Component Integration:

```jsx
// UserManagement.integration.test.js
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { UserManagement } from "./UserManagement";

// Mock service worker for API calls
const server = setupServer(
  rest.get("/api/users", (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: "John Doe", email: "john@example.com", isActive: true },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          isActive: false,
        },
      ])
    );
  }),

  rest.post("/api/users", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 3, ...req.body }));
  }),

  rest.put("/api/users/:id", (req, res, ctx) => {
    return res(ctx.json({ id: req.params.id, ...req.body }));
  }),

  rest.delete("/api/users/:id", (req, res, ctx) => {
    return res(ctx.status(204));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("UserManagement Integration", () => {
  test("loads and displays users on mount", async () => {
    render(<UserManagement />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  test("creates new user through form submission", async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Fill and submit form
    await user.click(screen.getByText("Add User"));

    await user.type(screen.getByLabelText("Name"), "Bob Johnson");
    await user.type(screen.getByLabelText("Email"), "bob@example.com");
    await user.click(screen.getByRole("button", { name: "Save" }));

    // Verify new user appears
    await waitFor(() => {
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });
  });

  test("edits existing user", async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Click edit on first user
    const editButtons = screen.getAllByText("Edit");
    await user.click(editButtons[0]);

    // Update name
    const nameInput = screen.getByDisplayValue("John Doe");
    await user.clear(nameInput);
    await user.type(nameInput, "John Updated");

    await user.click(screen.getByRole("button", { name: "Save" }));

    // Verify update
    await waitFor(() => {
      expect(screen.getByText("John Updated")).toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  test("deletes user with confirmation", async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Click delete on first user
    const deleteButtons = screen.getAllByText("Delete");
    await user.click(deleteButtons[0]);

    // Confirm deletion
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Confirm" }));

    // Verify user is removed
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  test("handles API errors gracefully", async () => {
    // Mock API error
    server.use(
      rest.get("/api/users", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: "Server error" }));
      })
    );

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });
  });

  test("filters users by search term", async () => {
    const user = userEvent.setup();
    render(<UserManagement />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Search for "John"
    const searchInput = screen.getByPlaceholderText("Search users...");
    await user.type(searchInput, "John");

    // Verify filtering
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();

    // Clear search
    await user.clear(searchInput);

    // Verify all users shown again
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});
```

## 3. E2E Testing with Cypress

### Cypress Test Examples:

```javascript
// cypress/integration/user-management.spec.js
describe("User Management E2E", () => {
  beforeEach(() => {
    cy.visit("/users");
    cy.intercept("GET", "/api/users", { fixture: "users.json" }).as("getUsers");
  });

  it("should load and display users", () => {
    cy.wait("@getUsers");
    cy.get("[data-testid=user-card]").should("have.length", 2);
    cy.contains("John Doe").should("be.visible");
    cy.contains("Jane Smith").should("be.visible");
  });

  it("should create new user", () => {
    cy.intercept("POST", "/api/users", {
      statusCode: 201,
      body: { id: 3, name: "Bob Johnson", email: "bob@example.com" },
    }).as("createUser");

    cy.get("[data-testid=add-user-btn]").click();
    cy.get("[data-testid=user-form]").should("be.visible");

    cy.get("input[name=name]").type("Bob Johnson");
    cy.get("input[name=email]").type("bob@example.com");
    cy.get("[type=submit]").click();

    cy.wait("@createUser");
    cy.contains("Bob Johnson").should("be.visible");
  });

  it("should edit existing user", () => {
    cy.intercept("PUT", "/api/users/1", {
      body: { id: 1, name: "John Updated", email: "john.updated@example.com" },
    }).as("updateUser");

    cy.get("[data-testid=user-card]")
      .first()
      .within(() => {
        cy.get("[data-testid=edit-btn]").click();
      });

    cy.get("input[name=name]").clear().type("John Updated");
    cy.get("[type=submit]").click();

    cy.wait("@updateUser");
    cy.contains("John Updated").should("be.visible");
  });

  it("should delete user", () => {
    cy.intercept("DELETE", "/api/users/1", { statusCode: 204 }).as(
      "deleteUser"
    );

    cy.get("[data-testid=user-card]")
      .first()
      .within(() => {
        cy.get("[data-testid=delete-btn]").click();
      });

    cy.get("[data-testid=confirm-modal]").should("be.visible");
    cy.get("[data-testid=confirm-btn]").click();

    cy.wait("@deleteUser");
    cy.contains("John Doe").should("not.exist");
  });

  it("should search users", () => {
    cy.wait("@getUsers");

    cy.get("[data-testid=search-input]").type("John");
    cy.get("[data-testid=user-card]").should("have.length", 1);
    cy.contains("John Doe").should("be.visible");
    cy.contains("Jane Smith").should("not.exist");

    cy.get("[data-testid=search-input]").clear();
    cy.get("[data-testid=user-card]").should("have.length", 2);
  });

  it("should handle network errors", () => {
    cy.intercept("GET", "/api/users", { statusCode: 500 }).as("getUsersError");

    cy.visit("/users");
    cy.wait("@getUsersError");

    cy.contains("Error loading users").should("be.visible");
    cy.get("[data-testid=retry-btn]").should("be.visible");
  });
});

// Custom commands
// cypress/support/commands.js
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(password);
  cy.get("[type=submit]").click();
  cy.url().should("include", "/dashboard");
});

Cypress.Commands.add("createUser", (userData) => {
  cy.intercept("POST", "/api/users", {
    statusCode: 201,
    body: { id: Date.now(), ...userData },
  }).as("createUser");

  cy.get("[data-testid=add-user-btn]").click();
  cy.get("input[name=name]").type(userData.name);
  cy.get("input[name=email]").type(userData.email);
  cy.get("[type=submit]").click();
  cy.wait("@createUser");
});

// Usage
describe("User Workflows", () => {
  beforeEach(() => {
    cy.login("admin@example.com", "password");
  });

  it("should complete user creation workflow", () => {
    cy.visit("/users");
    cy.createUser({ name: "Test User", email: "test@example.com" });
    cy.contains("Test User").should("be.visible");
  });
});
```

## 4. Performance Testing

### Testing Performance Metrics:

```jsx
// Performance testing utilities
export function measureComponentRenderTime(Component, props = {}) {
  const start = performance.now();
  render(<Component {...props} />);
  const end = performance.now();
  return end - start;
}

export function measureMemoryUsage(callback) {
  const startMemory = performance.memory.usedJSHeapSize;
  callback();
  const endMemory = performance.memory.usedJSHeapSize;
  return endMemory - startMemory;
}

// Performance tests
describe("Component Performance", () => {
  test("should render large list efficiently", () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random(),
    }));

    const renderTime = measureComponentRenderTime(VirtualizedList, { items });

    // Should render within 100ms
    expect(renderTime).toBeLessThan(100);
  });

  test("should not cause memory leaks", () => {
    const { unmount } = render(<ComplexComponent />);

    const memoryBefore = performance.memory.usedJSHeapSize;
    unmount();

    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }

    const memoryAfter = performance.memory.usedJSHeapSize;
    const memoryDifference = memoryAfter - memoryBefore;

    // Memory usage should not increase significantly
    expect(memoryDifference).toBeLessThan(1024 * 1024); // 1MB
  });

  test("should optimize re-renders with React.memo", () => {
    const mockFn = jest.fn();
    const MemoizedComponent = React.memo(({ value, onChange }) => {
      mockFn();
      return <input value={value} onChange={onChange} />;
    });

    const { rerender } = render(
      <MemoizedComponent value="test" onChange={() => {}} />
    );

    // Re-render with same props
    rerender(<MemoizedComponent value="test" onChange={() => {}} />);

    // Should only render once due to memoization
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```

---

# Part 7: 30+ MCQs

1. What is the purpose of React's virtual DOM?

   - (A) To update the UI directly
   - (B) To optimize DOM updates by computing diffs
   - (C) To store component state
   - (D) To manage routing
   - **Answer:** B

2. Which hook would you use for side effects in functional components?

   - (A) useRef
   - (B) useEffect
   - (C) useState
   - (D) useMemo
   - **Answer:** B

3. What does the dependency array in useEffect control?

   - (A) Which state to update
   - (B) When the effect runs
   - (C) The initial render
   - (D) The return value
   - **Answer:** B

4. What is the output of this code?

```jsx
const [count, setCount] = useState(0);
useEffect(() => setCount(5), []);
console.log(count);
```

- (A) 0
- (B) 5
- (C) undefined
- (D) Error
- **Answer:** 0 (useEffect runs after render; console.log is called before update)

5. Which statement about props is correct?

   - (A) Props are mutable
   - (B) Props are read-only
   - (C) Props can only be used in class components
   - (D) Props must be strings
   - **Answer:** B

6. What is the correct way to prevent a component from re-rendering?

   - (A) Use React.memo
   - (B) Use setState(null)
   - (C) Use componentWillUnmount
   - (D) Use useEffect
   - **Answer:** A

7. What does useReducer return?

   - (A) State and dispatch function
   - (B) State and props
   - (C) State and effect
   - (D) Props and reducer
   - **Answer:** A

8. In React Router v6, how do you access route params?

   - (A) useHistory
   - (B) useParams
   - (C) useLocation
   - (D) useRouteMatch
   - **Answer:** B

9. What is a controlled component?

   - (A) React component managing its own state
   - (B) Form element whose value is managed by React state
   - (C) Component with lifecycle methods
   - (D) Component using Redux
   - **Answer:** B

10. How do you test a React component for rendering specific text?

- (A) screen.getByRole
- (B) screen.getByText
- (C) screen.getByLabelText
- (D) screen.getByValue
- **Answer:** B

11. Which lifecycle method is called once after the first render in class components?

- (A) componentDidMount
- (B) componentWillUnmount
- (C) componentDidUpdate
- (D) shouldComponentUpdate
- **Answer:** A

12. What is the purpose of keys in React lists?

- (A) To style the items
- (B) To identify items for efficient re-rendering
- (C) To pass data to children
- (D) To trigger useEffect
- **Answer:** B

13. Can you call hooks inside loops or conditions?

- (A) Yes
- (B) No
- **Answer:** B

14. What is the initial value of a useRef hook?

- (A) undefined
- (B) null
- (C) The value passed to useRef
- (D) 0
- **Answer:** C

15. Which of these is NOT a valid way to create a React component?

- (A) Function Component
- (B) Class Component
- (C) Arrow Function Component
- (D) Object Literal
- **Answer:** D

16. What does React.Fragment do?

- (A) Creates a new DOM node
- (B) Groups children without adding extra nodes
- (C) Adds a wrapper div
- (D) None of the above
- **Answer:** B

17. What is React.StrictMode used for?

- (A) Strict typing
- (B) Highlighting potential problems in the app
- (C) Performance profiling
- (D) Preventing re-rendering
- **Answer:** B

18. How do you pass data from a child to a parent?

- (A) Using props
- (B) Using state
- (C) Using callback functions
- (D) Using context
- **Answer:** C

19. What is the return value of setState in class components?

- (A) Updated state
- (B) Promise
- (C) Undefined
- (D) Function
- **Answer:** C

20. What is useCallback mainly used for?

- (A) Memoizing expensive values
- (B) Memoizing functions to avoid unnecessary re-renders
- (C) Fetching data
- (D) Creating refs
- **Answer:** B

21. What is the output of `{true && <div>Hello</div>}` in JSX?

- (A) false
- (B) null
- (C) <div>Hello</div>
- (D) undefined
- **Answer:** C

22. What is the main benefit of React.memo?

- (A) Memoizes function outputs
- (B) Prevents re-render if props don't change
- (C) Memoizes state
- (D) None
- **Answer:** B

23. Which hook would you use for an uncontrolled input?

- (A) useState
- (B) useRef
- (C) useEffect
- (D) useReducer
- **Answer:** B

24. When would you use useLayoutEffect instead of useEffect?

- (A) For side effects that must run after paint
- (B) For side effects that must run before paint
- (C) For data fetching
- (D) For API calls
- **Answer:** B

25. What happens if you update state in render()?

- (A) Infinite loop
- (B) Error
- (C) One update
- (D) No effect
- **Answer:** A

26. How do you avoid prop drilling?

- (A) Use context
- (B) Use local state
- (C) Use Redux
- (D) Both A and C
- **Answer:** D

27. What is a custom hook?

- (A) Built-in hook
- (B) Function using hooks to share logic
- (C) Lifecycle method
- (D) Redux action
- **Answer:** B

28. Can you call setState with the same value?

- (A) Yes, will always re-render
- (B) Yes, but React may bail out re-render
- (C) No
- (D) Only in class components
- **Answer:** B

29. What does the useImperativeHandle hook do?

- (A) Expose custom values to parent via ref
- (B) Memoize values
- (C) Create refs
- (D) Run effects
- **Answer:** A

30. What is the difference between default export and named export?

- (A) No difference
- (B) Only one default export per file, many named exports
- (C) You must use curly braces with default exports
- (D) Named exports are imported with 'default'
- **Answer:** B

---

# Part 8: 10+ Subjective Q&A

1. Explain the difference between class components and function components in React.

**Answer:**

Class and function components are two ways to create React components. Function components are now the modern standard with React Hooks, while class components were the original way and are still valid but less commonly used.

### Key Differences:

#### Class Components:

```jsx
// ✅ Class component example
class GreetingClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: this.props.name,
    };
  }

  // Lifecycle method
  componentDidMount() {
    console.log("Component mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated");
  }

  componentWillUnmount() {
    console.log("Component unmounting");
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}
```

#### Function Components:

```jsx
// ✅ Function component example
function GreetingFunction({ name }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted or updated");
    return () => console.log("Component unmounting");
  }, []);

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Or with arrow function
const GreetingArrow = ({ name }) => {
  const [count, setCount] = useState(0);
  // ...
};
```

### Comparison Table:

| Feature            | Class Component             | Function Component |
| ------------------ | --------------------------- | ------------------ |
| **Syntax**         | ES6 class                   | Regular function   |
| **State**          | this.state, this.setState() | useState hook      |
| **Lifecycle**      | componentDidMount, etc.     | useEffect hook     |
| **Props access**   | this.props                  | function parameter |
| **Context**        | this.context                | useContext hook    |
| **Refs**           | this.ref                    | useRef hook        |
| **Performance**    | Slightly heavier            | Lighter            |
| **Learning curve** | Steeper                     | Easier             |
| **Modern usage**   | ~5%                         | ~95%               |

### State Management Comparison:

```jsx
// Class Component State
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      name: "Counter",
    };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>
          {this.state.name}: {this.state.count}
        </p>
        <button onClick={this.incrementCount}>+1</button>
      </div>
    );
  }
}

// Function Component State (with hooks)
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Counter");

  return (
    <div>
      <p>
        {name}: {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### Lifecycle Methods vs Hooks:

```jsx
// Class Component Lifecycle
class DataFetcher extends React.Component {
  componentDidMount() {
    // Runs once after component mounts
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // Runs after every render
    if (prevProps.id !== this.props.id) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    // Cleanup before unmount
    this.abortController?.abort();
  }

  fetchData = () => {
    // fetch logic
  };

  render() {
    return <div>Data</div>;
  }
}

// Function Component with Hooks
function DataFetcher({ id }) {
  useEffect(() => {
    // Runs after mount and when id changes
    const fetchData = async () => {
      // fetch logic
    };
    fetchData();

    // Cleanup function
    return () => {
      abortController?.abort();
    };
  }, [id]); // Dependency array

  return <div>Data</div>;
}
```

### When to Use Each:

```jsx
// ✅ USE FUNCTION COMPONENTS:
// - New projects
// - Most applications
// - With React Hooks
// - When simpler code is preferred

// ✅ USE CLASS COMPONENTS:
// - Legacy projects
// - Complex lifecycle logic (rare)
// - Error boundaries (must be class)
// - Team preference in existing codebase

// ❌ DON'T:
// - Mix both in same component unnecessarily
// - Use class components for new code
// - Avoid hooks just to use class components
```

### Advanced: Error Boundaries (Class Only):

```jsx
// Error boundaries MUST be class components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }
    return this.props.children;
  }
}

// Note: Function component alternative coming with React 18+
// but currently error boundaries require class components
```

---

2. What are hooks in React? Name at least three and describe their use.

**Answer:**

Hooks are functions that let you "hook into" React features in functional components. They allow you to use state, lifecycle methods, context, and other features without writing class components. Introduced in React 16.8, hooks have become the modern standard for React development.

### useState - State Management:

```jsx
// ✅ Basic state hook
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

// ✅ Multiple state variables
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </form>
  );
}

// ✅ Complex state with object
function UserProfile() {
  const [user, setUser] = useState({
    name: "John",
    age: 30,
    email: "john@example.com",
  });

  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };

  return <div>{user.name}</div>;
}

// ✅ Lazy initialization
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    // This function runs only once on mount
    return expensiveCalculation();
  });

  return <div>{data}</div>;
}
```

### useEffect - Side Effects:

```jsx
// ✅ Run effect after every render
function WindowSize() {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }); // No dependency array - runs after every render

  return <p>Window width: {size}</p>;
}

// ✅ Run effect only once (mount/unmount)
function DataFetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/data");
      setData(await response.json());
    };
    fetchData();

    return () => {
      // Cleanup on unmount
    };
  }, []); // Empty dependency array - runs only once

  return <div>{data}</div>;
}

// ✅ Run effect when specific dependencies change
function DataById({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/data/${id}`);
      setData(await response.json());
    };
    fetchData();
  }, [id]); // Runs when id changes

  return <div>{data}</div>;
}
```

### useContext - Access Context:

```jsx
// ✅ Create context
const ThemeContext = React.createContext("light");

// Provider component
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <MainContent />
    </ThemeContext.Provider>
  );
}

// Consumer component using hook
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
}
```

### useReducer - Complex State:

```jsx
// ✅ Reducer pattern for complex state
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      };
    default:
      return state;
  }
}

function TodoApp() {
  const initialState = { todos: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: "ADD_TODO",
            payload: { id: Date.now(), text: "New task", done: false },
          })
        }
      >
        Add Todo
      </button>
      {state.todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button
            onClick={() =>
              dispatch({
                type: "DELETE_TODO",
                payload: todo.id,
              })
            }
          >
            Delete
          </button>
        </li>
      ))}
    </div>
  );
}
```

### useMemo - Memoize Values:

```jsx
// ✅ Memoize expensive computations
function ExpensiveList({ items, multiplier }) {
  const result = useMemo(() => {
    // This computation only runs when items or multiplier changes
    return items.map((item) => item * multiplier);
  }, [items, multiplier]);

  return <div>{result}</div>;
}

// Without useMemo (recalculates every render):
function BadList({ items, multiplier }) {
  const result = items.map((item) => item * multiplier);
  return <div>{result}</div>;
}
```

### useCallback - Memoize Functions:

```jsx
// ✅ Memoize callback function
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // Function is memoized

  return <Child onClick={handleClick} />;
}

// Without useCallback (new function every render):
function BadParent() {
  const handleClick = () => console.log("Clicked!");
  return <Child onClick={handleClick} />; // New function each render
}
```

### useRef - Direct DOM Access:

```jsx
// ✅ Access DOM element directly
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

// ✅ Store mutable value that doesn't cause re-render
function Stopwatch() {
  const intervalRef = useRef(null);
  const [time, setTime] = useState(0);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>{time}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Custom Hooks:

```jsx
// ✅ Create reusable hook
function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    reset: () => setValue(initialValue),
  };
}

// Usage:
function LoginForm() {
  const nameInput = useFormInput("");
  const emailInput = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameInput.value, emailInput.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...nameInput.bind} />
      <input {...emailInput.bind} />
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ Data fetching custom hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        setData(await response.json());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage:
function UsersList() {
  const { data: users, loading, error } = useFetch("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Summary of Common Hooks:

| Hook            | Purpose                 | Example                 |
| --------------- | ----------------------- | ----------------------- |
| **useState**    | Manage component state  | Count, form fields      |
| **useEffect**   | Side effects, lifecycle | Data fetching, cleanup  |
| **useContext**  | Access context values   | Theme, auth state       |
| **useReducer**  | Complex state logic     | Todo list, forms        |
| **useMemo**     | Memoize values          | Expensive computations  |
| **useCallback** | Memoize functions       | Callback props          |
| **useRef**      | Direct DOM access       | Input focus, timers     |
| **Custom**      | Reusable logic          | Form handling, fetching |

---

3. How does React's reconciliation algorithm work?

**Answer:**

React's reconciliation (also known as "diffing") is the process React uses to determine what has changed in the component tree and update the DOM efficiently. It's a core mechanism that makes React performant.

### Key Principles:

1. **Virtual DOM Comparison**: React compares the new virtual DOM tree with the previous one to identify changes
2. **Element Type Comparison**: If elements have different types, React treats them as completely different subtrees
3. **Key-based Matching**: When elements have keys, React uses them to match elements across renders
4. **Component State Preservation**: React preserves component state when reconciling

### Reconciliation Algorithm (React 16+):

React uses the **Fiber Architecture** for reconciliation:

#### Step 1: Render Phase (Non-blocking)

```jsx
// Render phase - breaks work into small units (fibers)
// Can be paused, aborted, or reused
function App() {
  const [count, setCount] = useState(0);
  return <Counter count={count} />;
}

// React processes this in small chunks:
// 1. Render App component
// 2. Render Counter component
// 3. Render h1, button, etc.
```

#### Step 2: Commit Phase (Synchronous)

```jsx
// Commit phase - applies changes to DOM (cannot be interrupted)
// Updates are batched together for efficiency
// Lifecycle methods and effects run here
```

### Reconciliation Rules:

#### Rule 1: Different Element Types

```jsx
// BEFORE
<div>
  <Input />
</div>

// AFTER (type changed)
<section>
  <Input />
</section>

// Result: Old tree is destroyed, new tree is created
// Input component state is reset (unmount + remount)
```

#### Rule 2: Same Element Type with Keys

```jsx
function TodoList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // WITH KEY - React matches by key
        <li key={item.id}>{item.text}</li>

        // WITHOUT KEY - React matches by position
        // <li>{item.text}</li>  // DON'T DO THIS
      ))}
    </ul>
  );
}

// With keys:
// Before: <li key="1">Learn React</li> <li key="2">Learn Node</li>
// After:  <li key="2">Learn Node</li> <li key="1">Learn React</li>
// Result: DOM elements are reordered correctly

// Without keys:
// Result: Content is reordered (but DOM elements stay in place - incorrect!)
```

#### Rule 3: Props Change

```jsx
function Greeting({ name, theme }) {
  return <h1 style={{ color: theme }}>Hello {name}</h1>;
}

// Same component, props changed
// Result: Props are updated, component re-renders, DOM is updated
```

### Reconciliation Process - Detailed Example:

```jsx
// Initial render
function App() {
  return (
    <div>
      <Header title="My App" />
      <List items={["a", "b"]} />
    </div>
  );
}

// Virtual DOM (initial):
// div
//   Header(title="My App")
//   List(items=['a', 'b'])

// After state change:
function App() {
  return (
    <div>
      <Header title="My App" />
      <List items={["a", "b", "c"]} /> // Changed
    </div>
  );
}

// Reconciliation steps:
// 1. Compare div with div (same) - skip
// 2. Compare Header props (same title) - skip
// 3. Compare List props (items changed) - UPDATE needed
// 4. List component re-renders
// 5. New items in list create new <li> elements
// 6. Only new items are added to DOM

// Result: Minimal DOM updates
```

### Example with Component Reconciliation:

```jsx
// Parent component
function Parent({ type }) {
  if (type === "user") {
    return <UserProfile />;
  }
  return <AdminProfile />;
}

// Render 1: type='user'
// Virtual tree: Parent -> UserProfile -> DOM

// Render 2: type='admin'
// Virtual tree: Parent -> AdminProfile -> DOM

// Reconciliation:
// Same Parent component
// But child component type changed (UserProfile -> AdminProfile)
// Result:
// - UserProfile is unmounted (state lost, cleanup runs)
// - AdminProfile is mounted (new instance created)
// - DOM elements are replaced
```

### Reconciliation with Lists and Keys:

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build App" },
  ]);

  const addTodo = () => {
    setTodos([
      { id: 3, text: "Deploy" },
      ...todos, // New item added at beginning
    ]);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li>
      {todo.text}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
    </li>
  );
}

// WITHOUT keys (using index):
// Before:  [<TodoItem(1)>, <TodoItem(2)>]
// After:   [<TodoItem(3)>, <TodoItem(1)>, <TodoItem(2)>]
// Reconciliation:
// - Position 0: Old TodoItem(1) props updated to show Todo(3)
// - Position 1: Old TodoItem(2) props updated to show Todo(1)
// - Position 2: New TodoItem created for Todo(2)
// PROBLEM: State (isEditing) of first item is still "edit mode" but now shows Todo(3)!

// WITH keys:
// Before:  [<TodoItem key="1">, <TodoItem key="2">]
// After:   [<TodoItem key="3">, <TodoItem key="1">, <TodoItem key="2">]
// Reconciliation:
// - Key "3" (new): Create new TodoItem instance
// - Key "1": Reuse TodoItem instance, update props
// - Key "2": Reuse TodoItem instance, update props
// - Reorder DOM elements correctly
// CORRECT: Each TodoItem keeps its state and position
```

### Why Keys Matter - Advanced Example:

```jsx
function InputList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // BAD: Using index as key
        <li key={index}>
          <input type="text" defaultValue={item} />
        </li>
      ))}
    </ul>
  );
}

// Scenario:
// Initial: items=['Apple', 'Banana']
// User types in first input: 'Apple Pizza'
// Renders: items=['Orange', 'Apple', 'Banana']  // Item inserted at start

// Without key (using index):
// Old:  [<input key="0" value="Apple">, <input key="1" value="Banana">]
// New:  [<input key="0" value="Orange">, <input key="1" value="Apple">, <input key="2" value="Banana">]
// Issue: key="0" now shows Orange in position 0, but input still shows "Apple Pizza" (state mismatch!)

// With key (using item.id):
// Old:  [<input key="a1" />, <input key="b2" />]  // User typed in a1's input
// New:  [<input key="o3" />, <input key="a1" />, <input key="b2" />]
// Correct: key="a1" moves to position 1, keeps its input value "Apple Pizza"
```

### Performance Implications:

```jsx
// Good reconciliation practices:
function OptimizedList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {" "}
          // Stable, unique identifier
          <TodoItem item={item} />
        </li>
      ))}
    </ul>
  );
}

// Avoid these patterns:
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {" "}
          // BAD: Changes if list reordered
          {item}
        </li>
      ))}
    </ul>
  );
}

// Avoid:
function AnotherBadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={Math.random()}>
          {" "}
          // BAD: Different on every render
          {item}
        </li>
      ))}
    </ul>
  );
}
```

### Summary of Reconciliation:

| Aspect                 | Details                                                                        |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Type Comparison**    | Different element types = full tree replacement                                |
| **Props/State**        | Changes trigger re-render of affected subtree                                  |
| **Keys**               | Enable React to identify which items have changed, been added, or been removed |
| **Performance**        | Only changed elements are updated in the DOM                                   |
| **Component State**    | Preserved during reconciliation if component identity is maintained            |
| **Fiber Architecture** | Breaks work into small, interruptible units for better performance             |

---

4. Describe the purpose of keys in lists and why they are important.

**Answer:**

Keys are special string attributes you need to include when creating lists of elements in React. They help React identify which items have changed, been added, or been removed. Keys are crucial for maintaining component state, performance, and correct list behavior.

### Purpose of Keys:

1. **Item Identification**: Help React identify which items in a list correspond between renders
2. **State Preservation**: Ensure component state stays with the correct item when list reorders
3. **Performance**: Enable React to reuse DOM nodes instead of recreating them
4. **Predictable Behavior**: Prevent input values and component state from getting mixed up

### Why Keys Are Important - Visual Comparison:

#### Without Keys (Index):

```jsx
function BadList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // ❌ DON'T: Using index as key
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Scenario: User edits first item, then new item is added at start
// Initial:  [Apple, Banana]
// Rendered: [<li key="0">Apple</li>, <li key="1">Banana</li>]

// State: input[0] = "Apple Pizza" (user edited it)

// New list: [Orange, Apple, Banana]
// Rendered: [<li key="0">Orange</li>, <li key="1">Apple</li>, <li key="2">Banana</li>]

// Problem: li key="0" now shows "Orange" but component state shows "Apple Pizza"!
```

#### With Proper Keys:

```jsx
function GoodList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // ✅ DO: Using unique, stable identifier
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Same scenario:
// Initial:  [{id: 1, name: 'Apple'}, {id: 2, name: 'Banana'}]
// Rendered: [<li key="1">Apple</li>, <li key="2">Banana</li>]

// State: component[id=1] = "Apple Pizza" (user edited it)

// New list: [{id: 3, name: 'Orange'}, {id: 1, name: 'Apple'}, {id: 2, name: 'Banana'}]
// Rendered: [<li key="3">Orange</li>, <li key="1">Apple</li>, <li key="2">Banana</li>]

// Correct: key="1" still has user's edit "Apple Pizza" preserved!
```

### Example with Input Fields (Shows the Real Problem):

```jsx
function TodoListBad() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build App" },
  ]);

  const addTodo = () => {
    setTodos([
      { id: Date.now(), text: "New Todo" },
      ...todos, // Add at beginning
    ]);
  };

  return (
    <>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((item, index) => (
          // ❌ BAD: Using index as key
          <li key={index}>
            <input type="text" defaultValue={item.text} />
          </li>
        ))}
      </ul>
    </>
  );
}

// User interaction:
// 1. List renders: [Learn React, Build App]
// 2. User types in first input: "Learn React Advanced"
// 3. User clicks Add Todo
// 4. New list: [New Todo, Learn React, Build App]
//
// Expected: New item at top, first item still shows "Learn React Advanced"
// Actual: New item at top, but input shows "Learn React Advanced" (wrong data!)
```

#### Fixed Version with Keys:

```jsx
function TodoListGood() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build App" },
  ]);

  const addTodo = () => {
    setTodos([
      { id: Date.now(), text: "New Todo" },
      ...todos, // Add at beginning
    ]);
  };

  return (
    <>
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((item) => (
          // ✅ GOOD: Using stable, unique identifier
          <li key={item.id}>
            <input type="text" defaultValue={item.text} />
          </li>
        ))}
      </ul>
    </>
  );
}

// Same user interaction:
// 1. List renders: [Learn React, Build App]
// 2. User types in first input: "Learn React Advanced"
// 3. User clicks Add Todo
// 4. New list: [New Todo, Learn React, Build App]
//
// Result: Correct! First item still shows "Learn React Advanced"
```

### Another Problem: Component State with Checkboxes:

```jsx
function ItemWithCheckbox({ item }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <li>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      {item}
    </li>
  );
}

function ListWithoutKeys() {
  const [items, setItems] = useState(["A", "B", "C"]);

  const moveToStart = () => {
    setItems(["X", ...items.slice(0, -1)]); // Move last item to start
  };

  return (
    <>
      <button onClick={moveToStart}>Move</button>
      <ul>
        {items.map((item, index) => (
          // ❌ BAD: Using index as key
          <li key={index}>
            <ItemWithCheckbox item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

// Scenario:
// 1. Initial: [A, B, C] - all unchecked
// 2. User checks first item (A)
// 3. User clicks Move -> [X, A, B]
// 4. Expected: X unchecked, A checked, B unchecked
// 5. Actual: X CHECKED (state moved to position 0)! ❌

// With proper keys:
function ListWithKeys() {
  const [items, setItems] = useState([
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" },
  ]);

  const moveToStart = () => {
    setItems([{ id: 99, name: "X" }, ...items.slice(0, -1)]);
  };

  return (
    <>
      <button onClick={moveToStart}>Move</button>
      <ul>
        {items.map((item) => (
          // ✅ GOOD: Using item.id as key
          <li key={item.id}>
            <ItemWithCheckbox item={item.name} />
          </li>
        ))}
      </ul>
    </>
  );
}

// Same scenario:
// Result: Correct! X unchecked, A checked, B unchecked ✅
```

### Best Practices for Keys:

```jsx
// ✅ GOOD: Use unique identifiers
function GoodExample1({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ GOOD: Use database IDs
function GoodExample2({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.userId}>{user.name}</li>
      ))}
    </ul>
  );
}

// ✅ ACCEPTABLE: If items have no ID and never reorder
function StaticList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // Only acceptable if list never filters, sorts, or reorders
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// ❌ BAD: Using index as key in dynamic lists
function BadExample1({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // BAD if items are filtered, sorted, or added/removed
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// ❌ BAD: Using random values
function BadExample2({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // BAD: Key changes on every render
        <li key={Math.random()}>{item}</li>
      ))}
    </ul>
  );
}

// ❌ BAD: Using Math.random() or uuid()
function BadExample3({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // BAD: New key on every render
        <li key={uuid()}>{item}</li>
      ))}
    </ul>
  );
}
```

### Key Characteristics (Must Have):

| Requirement    | Explanation                                     |
| -------------- | ----------------------------------------------- |
| **Unique**     | Should be unique among siblings (not globally)  |
| **Stable**     | Should not change between renders for same item |
| **Consistent** | Same item should always have same key           |
| **Non-random** | Should not use Math.random() or uuid()          |
| **Meaningful** | Should relate to item identity (ID, slug, etc.) |

### Real-World Example - E-commerce Product List:

```jsx
function ProductList({ products, filter, sortBy }) {
  const [selectedProducts, setSelectedProducts] = useState({});

  // User adds to cart, then filters/sorts list
  // Products should stay selected

  return (
    <>
      <FilterBar onFilterChange={...} />
      <SortBar onSortChange={...} />
      <ul>
        {products.map(product => (
          // ✅ GOOD: Product SKU is stable identifier
          <li key={product.sku}>
            <ProductCard
              product={product}
              isSelected={selectedProducts[product.sku]}
              onSelect={(selected) =>
                setSelectedProducts(prev => ({
                  ...prev,
                  [product.sku]: selected
                }))
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}

// If using index as key:
// 1. User selects products at positions 0, 2, 5
// 2. User filters list (some items removed)
// 3. New items now at positions 0, 2, 5 are selected (wrong items!)
//
// With product.sku as key:
// 1. User selects products
// 2. User filters list
// 3. Same products remain selected (correct!)
```

### Performance Impact:

```jsx
// Without Keys: React can't identify items
// - Creates new DOM nodes for "new" items
// - Destroys DOM nodes for "removed" items
// - Loses component state for reordered items
// - Loses focus, input values, etc.

// With Keys: React identifies items
// - Reuses existing DOM nodes
// - Preserves component state
// - Moves DOM nodes to new positions
// - Preserves focus, input values, etc.
// - Better performance overall
```

### Summary:

Keys are essential for:

- ✅ Preserving component state in lists
- ✅ Maintaining input/focus across re-renders
- ✅ Ensuring correct reconciliation behavior
- ✅ Improving performance (DOM reuse)
- ✅ Preventing bugs in dynamic lists

Always use a stable, unique identifier (like item ID) as a key, never use index or random values unless you're certain the list is static and never reorders.

---

5. What is context in React? Give an example use case.

**Answer:**

Context is a feature in React that allows you to pass data through the component tree without having to pass props down manually at every level. It provides a way to share data that can be considered "global" for a tree of React components, eliminating the need for prop drilling.

### The Problem: Prop Drilling

```jsx
// Without Context - Prop Drilling Problem
function App() {
  const user = { name: "John", role: "admin" };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Nav user={user} />;
}

function Nav({ user }) {
  return <Menu user={user} />;
}

function Menu({ user }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return (
    <h1>
      {user.name} ({user.role})
    </h1>
  );
}

// Problem: user prop must pass through every component layer
// even though Header, Nav, Menu don't use it
```

### The Solution: Context API

```jsx
// With Context - No Prop Drilling
import { createContext, useContext } from "react";

// Step 1: Create context
const UserContext = createContext();

// Step 2: Create provider component
function App() {
  const user = { name: "John", role: "admin" };
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

// Step 3: Use context in any descendant component
function UserProfile() {
  const user = useContext(UserContext);
  return (
    <h1>
      {user.name} ({user.role})
    </h1>
  );
}

// Components in between don't need to pass props anymore!
function Header() {
  return <Nav />;
}

function Nav() {
  return <Menu />;
}

function Menu() {
  return <UserProfile />;
}
```

### Creating and Using Context - Complete Example:

```jsx
import { createContext, useContext, useState } from "react";

// 1. Create the context
const ThemeContext = createContext();

// 2. Create a provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. Create a custom hook for easy access
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// 4. Use in components
function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: isDark ? "#333" : "#fff",
        color: isDark ? "#fff" : "#000",
        padding: "20px",
      }}
    >
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Header />
    </div>
  );
}

function Header() {
  const { isDark } = useTheme();
  return (
    <header style={{ borderBottom: `2px solid ${isDark ? "#fff" : "#000"}` }}>
      <h2>Header Component</h2>
      <Nav />
    </header>
  );
}

function Nav() {
  return <Navigation />;
}

function Navigation() {
  const { theme } = useTheme();
  return <p>Theme Context is available here too! Current: {theme}</p>;
}
```

### Real-World Example: Authentication Context

```jsx
import { createContext, useContext, useState, useCallback } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const signup = useCallback(async (email, password, name) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) throw new Error("Signup failed");

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook for using auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Usage in components
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

function UserHeader() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <header>Please log in</header>;
  }

  return (
    <header>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <UserHeader />
      <LoginPage />
    </AuthProvider>
  );
}
```

### Multiple Contexts Example:

```jsx
// App with multiple contexts
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <LanguageProvider>
            <MainApp />
          </LanguageProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Composing multiple providers
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AppProviders>
      <MainApp />
    </AppProviders>
  );
}

// Using multiple contexts in a component
function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { showNotification } = useNotifications();

  return (
    <div>
      <h1>{user.name}'s Dashboard</h1>
      <p>
        Theme: {theme}, Language: {language}
      </p>
      <button onClick={() => showNotification("Welcome!")}>
        Show Notification
      </button>
    </div>
  );
}
```

### Common Use Cases for Context:

| Use Case            | Example                                |
| ------------------- | -------------------------------------- |
| **Theme/Styling**   | Dark mode, light mode, color schemes   |
| **Authentication**  | Current user, login state, permissions |
| **Localization**    | Language selection, translations       |
| **Notifications**   | Toast messages, alerts, modals         |
| **Global Settings** | User preferences, app configuration    |
| **UI State**        | Sidebar open/close, modal visibility   |
| **Authorization**   | User roles, permissions, access levels |

### Context vs Props vs Redux:

```jsx
// Props: Direct parent-child communication
<Parent userName="John">
  <Child /> {/* Can't access directly */}
</Parent>;

// Context: Skip intermediate components
const UserContext = createContext();
// Available to all descendants without prop drilling

// Redux: Complex app-wide state management
// For very large apps with complex state logic
```

### Best Practices:

- ✅ Create custom hooks (useTheme, useAuth) for easy access
- ✅ Use useMemo to prevent unnecessary re-renders
- ✅ Split contexts by concern/frequency of updates
- ✅ Always check for null in custom hooks
- ✅ Use context for relatively static or infrequently changing data
- ❌ Don't use context for frequently changing state (use useState + props or Redux)
- ❌ Don't put too much data in a single context (split into multiple)
- ❌ Don't overuse context for simple prop drilling (1-2 levels is fine)

### Summary:

Context API is perfect for:

- ✅ Eliminating prop drilling
- ✅ Sharing configuration/settings
- ✅ Authentication/Authorization
- ✅ Theme selection
- ✅ Language/Localization
- ✅ Global UI state (modals, notifications)

Context is NOT ideal for:

- ❌ Frequently changing data (use useState + Redux)
- ❌ Complex state logic (use Redux/Zustand)
- ❌ Large amounts of data (will cause performance issues)

---

6. Compare Redux and Context API for state management.

**Answer:**

Redux and Context API are both state management solutions for React, but they serve different purposes and have distinct advantages and disadvantages. Redux is a more robust, predictable solution for complex apps, while Context API is simpler and built-in for basic needs.

### High-Level Comparison:

| Feature                   | Redux                                | Context API                             |
| ------------------------- | ------------------------------------ | --------------------------------------- |
| **Complexity**            | Complex setup, steep learning curve  | Simple, minimal setup                   |
| **Boilerplate**           | High (actions, reducers, middleware) | Low (just Provider + Hook)              |
| **Performance**           | Optimized, granular subscriptions    | All consumers re-render on value change |
| **DevTools**              | Excellent Redux DevTools             | No built-in debugging                   |
| **Middleware**            | Yes (async actions, logging)         | No, must handle separately              |
| **Scalability**           | Excellent for large apps             | Good for small to medium apps           |
| **Bundle Size**           | ~40KB (gzipped)                      | 0KB (built-in)                          |
| **Time Travel Debugging** | Yes                                  | No                                      |
| **Learning Curve**        | Steep                                | Gentle                                  |
| **Best For**              | Complex apps, large teams            | Simple state, configuration             |

### Redux: Complete Example

```jsx
import { createStore, combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";

// 1. Define action types
const ACTIONS = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  TOGGLE_TODO: "TOGGLE_TODO",
  SET_FILTER: "SET_FILTER",
};

// 2. Define reducers
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case ACTIONS.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case ACTIONS.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

const filterReducer = (state = "ALL", action) => {
  switch (action.type) {
    case ACTIONS.SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

// 3. Create store
const store = createStore(
  combineReducers({
    todos: todosReducer,
    filter: filterReducer,
  })
);

// 4. Define action creators
const addTodo = (text) => ({
  type: ACTIONS.ADD_TODO,
  payload: text,
});

const removeTodo = (id) => ({
  type: ACTIONS.REMOVE_TODO,
  payload: id,
});

const toggleTodo = (id) => ({
  type: ACTIONS.TOGGLE_TODO,
  payload: id,
});

const setFilter = (filter) => ({
  type: ACTIONS.SET_FILTER,
  payload: filter,
});

// 5. Use in components
function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") return !todo.completed;
    if (filter === "COMPLETED") return todo.completed;
    return true;
  });

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => dispatch(setFilter("ALL"))}>All</button>
        <button onClick={() => dispatch(setFilter("ACTIVE"))}>Active</button>
        <button onClick={() => dispatch(setFilter("COMPLETED"))}>
          Completed
        </button>
      </div>
    </div>
  );
}

// 6. Wrap with Provider
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}
```

### Redux Middleware for Async Actions (Redux Thunk):

```jsx
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Middleware to handle async operations
const todosReducer = (state = { items: [], loading: false }, action) => {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_TODOS_SUCCESS":
      return { items: action.payload, loading: false };
    case "FETCH_TODOS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const store = createStore(todosReducer, applyMiddleware(thunk));

// Action creator that returns a function (thunk)
const fetchTodos = () => async (dispatch) => {
  dispatch({ type: "FETCH_TODOS_REQUEST" });
  try {
    const response = await fetch("/api/todos");
    const data = await response.json();
    dispatch({
      type: "FETCH_TODOS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_TODOS_ERROR",
      payload: error.message,
    });
  }
};

// Usage in component
function TodoList() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

### Context API: Same Example

```jsx
import { createContext, useContext, useReducer, useState } from "react";

// 1. Create context
const TodoContext = createContext();

// 2. Define reducer
const todosReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

// 3. Create provider component
function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [filter, setFilter] = useState("ALL");

  return (
    <TodoContext.Provider value={{ todos, dispatch, filter, setFilter }}>
      {children}
    </TodoContext.Provider>
  );
}

// 4. Create custom hook
function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within TodoProvider");
  }
  return context;
}

// 5. Use in components
function TodoApp() {
  const { todos, dispatch, filter, setFilter } = useTodos();
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", payload: input });
      setInput("");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ACTIVE") return !todo.completed;
    if (filter === "COMPLETED") return todo.completed;
    return true;
  });

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: "TOGGLE_TODO", payload: todo.id })
              }
            />
            {todo.text}
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_TODO", payload: todo.id })
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => setFilter("ALL")}>All</button>
        <button onClick={() => setFilter("ACTIVE")}>Active</button>
        <button onClick={() => setFilter("COMPLETED")}>Completed</button>
      </div>
    </div>
  );
}

// 6. Use provider in app
function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}
```

### Async with Context API:

```jsx
function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todosReducer, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      dispatch({ type: "SET_TODOS", payload: data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{ todos, dispatch, loading, error, fetchTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
}
```

### Detailed Comparison Table:

| Aspect                 | Redux                                  | Context API                            |
| ---------------------- | -------------------------------------- | -------------------------------------- |
| **Setup Time**         | 30+ lines                              | 10-15 lines                            |
| **State Update Flow**  | Action → Reducer → Store → Subscribers | useReducer → Context Value → Consumers |
| **Debugging**          | Redux DevTools with time travel        | console.log, React DevTools            |
| **Async Handling**     | Middleware (Redux Thunk, Saga)         | useEffect + custom logic               |
| **Performance**        | Fine-grained, selector-based           | All consumers re-render                |
| **Middleware Support** | Yes (logging, analytics, etc.)         | No                                     |
| **Testing**            | Easy (pure functions)                  | Medium (need custom hooks)             |
| **Community**          | Large ecosystem, mature                | Smaller, growing                       |
| **Bundle Impact**      | +40KB                                  | 0KB (built-in)                         |
| **Type Safety**        | Good with TypeScript                   | Good with TypeScript                   |

### When to Use Redux:

✅ Use Redux when:

- Large, complex applications with lots of state
- Multiple components need same state
- Frequent state updates
- Team needs predictable state changes
- Need time travel debugging
- Complex async operations
- Middleware needs (logging, analytics)
- Large team coordination needed

### When to Use Context API:

✅ Use Context API when:

- Small to medium apps
- Relatively static state (theme, auth, locale)
- Simple state updates
- Limited number of consumers
- Want minimal setup/dependencies
- Don't need advanced debugging
- Simple async operations (useEffect)
- Want to avoid extra dependencies

### Real-World Architecture Decision:

```jsx
// Small App: Use Context API
function SmallApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Large App: Use Redux + Context
function LargeApp() {
  return (
    <Provider store={reduxStore}>
      {" "}
      {/* Complex state */}
      <ThemeProvider>
        {" "}
        {/* Simple configuration */}
        <AuthProvider>
          {" "}
          {/* Simple authentication */}
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
```

### Performance Optimization Strategies:

Redux approach:

```jsx
// Selectors prevent unnecessary re-renders
const selectActiveTodos = (state) => state.todos.filter((t) => !t.completed);

function TodoList() {
  const activeTodos = useSelector(selectActiveTodos);
  // Only re-renders if activeTodos actually changed
}
```

Context API approach:

```jsx
// Split contexts to prevent cascading re-renders
const TodosContext = createContext();
const FilterContext = createContext();

// Components only subscribe to what they need
function FilterButtons() {
  const { filter, setFilter } = useContext(FilterContext);
  // Only re-renders if filter changes
}

function TodoList() {
  const { todos } = useContext(TodosContext);
  // Only re-renders if todos change
}
```

### Alternative: Modern Solutions

```jsx
// Zustand (lightweight Redux alternative)
import create from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text }],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));

// Usage: Simpler than Redux, more powerful than Context
function TodoApp() {
  const { todos, addTodo, removeTodo } = useTodoStore();
  // ...
}

// Recoil (Facebook's state management)
// Jotai (Primitive and flexible state management)
// Valtio (Simple proxy-based state)
```

### Summary Decision Matrix:

```
Choose Redux if:
├─ App has complex state with many interactions
├─ Need predictable, traceable state changes
├─ Need middleware for logging, analytics
├─ Large team needs consistency
├─ Need time-travel debugging
└─ App will grow significantly

Choose Context API if:
├─ App is small to medium
├─ State is relatively static
├─ Only a few components need state
├─ Don't want extra dependencies
├─ Want to keep setup minimal
└─ Simple async operations

Choose Zustand/Recoil if:
├─ Want Redux power with less boilerplate
├─ Need more control than Context
├─ Want modern, minimal solutions
├─ Building with Next.js or modern stack
└─ Team is experienced with state management
```

---

7. How do you optimize performance in large React applications?

**Answer:**

Performance optimization in React applications involves multiple strategies across different layers: rendering, state management, bundling, and runtime. The goal is to reduce Time to Interactive (TTI), minimize bundle size, and ensure smooth 60fps interactions.

### Key Performance Metrics:

```jsx
// Measuring Performance
// Core Web Vitals:
// 1. LCP (Largest Contentful Paint) - < 2.5s
// 2. FID (First Input Delay) - < 100ms
// 3. CLS (Cumulative Layout Shift) - < 0.1

import { getCLS, getFID, getLCP } from "web-vitals";

getCLS(console.log); // Layout shift
getFID(console.log); // Input responsiveness
getLCP(console.log); // Content visibility
```

### 1. Component Memoization (Prevent Unnecessary Re-renders)

```jsx
// ❌ BAD: Child re-renders on every parent render
function Parent() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild /> {/* Re-renders even though props didn't change */}
    </div>
  );
}

function ExpensiveChild() {
  console.log("ExpensiveChild rendered");
  return <div>{/* Complex calculations */}</div>;
}

// ✅ GOOD: Memoize to prevent unnecessary re-renders
const ExpensiveChild = React.memo(() => {
  console.log("ExpensiveChild rendered");
  return <div>{/* Complex calculations */}</div>;
});

// ✅ BETTER: Memoize with custom comparison
const UserCard = React.memo(
  ({ user, onEdit }) => <div>{user.name}</div>,
  (prevProps, nextProps) => {
    // Return true if props are equal (no re-render needed)
    return prevProps.user.id === nextProps.user.id;
  }
);
```

### 2. useMemo for Expensive Computations

```jsx
// ❌ BAD: Expensive calculation on every render
function ProductList({ products, filters, sortBy }) {
  // This calculation runs on every render!
  const filteredProducts = products
    .filter((p) => filters.includes(p.category))
    .sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <ul>
      {filteredProducts.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

// ✅ GOOD: Memoize expensive computation
function ProductList({ products, filters, sortBy }) {
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => filters.includes(p.category))
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, filters, sortBy]); // Only recalculate when dependencies change

  return (
    <ul>
      {filteredProducts.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

### 3. useCallback for Function Memoization

```jsx
// ❌ BAD: New function on every render causes child re-renders
function Parent() {
  const [count, setCount] = useState(0);

  const handleEdit = (id) => {
    // New function instance on every render
    console.log("Edit:", id);
  };

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <UserList onEdit={handleEdit} />
    </>
  );
}

function UserList({ onEdit }) {
  // If onEdit is a new function every render, this component re-renders
  return <div>{/* ... */}</div>;
}

// ✅ GOOD: Memoize function with useCallback
function Parent() {
  const [count, setCount] = useState(0);

  const handleEdit = useCallback((id) => {
    console.log("Edit:", id);
  }, []); // Memoized function, only created once

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <UserList onEdit={handleEdit} />
    </>
  );
}

// Wrap UserList with React.memo
const UserList = React.memo(({ onEdit }) => {
  // Now won't re-render unless onEdit reference changes
  return <div>{/* ... */}</div>;
});
```

### 4. Code Splitting and Lazy Loading

```jsx
import { lazy, Suspense } from "react";

// ❌ BAD: Load all routes upfront
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';

// ✅ GOOD: Lazy load routes
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Each route is only loaded when accessed
// Reduces initial bundle size significantly
```

### 5. Virtual Scrolling for Large Lists

```jsx
import { FixedSizeList } from "react-window";

// ❌ BAD: Render all 10,000 items
function VeryLongList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ GOOD: Only render visible items
function OptimizedList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {({ index, style }) => <div style={style}>{items[index].name}</div>}
    </FixedSizeList>
  );
}

// Only renders ~17 visible items instead of 10,000!
```

### 6. Image Optimization

```jsx
// ❌ BAD: Load full resolution images
function Gallery({ images }) {
  return (
    <div>
      {images.map(img => (
        <img key={img.id} src={img.fullUrl} alt={img.alt} />
      ))}
    </div>
  );
}

// ✅ GOOD: Lazy load and use responsive images
function OptimizedGallery({ images }) {
  return (
    <div>
      {images.map(img => (
        <img
          key={img.id}
          src={img.thumbUrl} {/* Load thumbnail initially */}
          loading="lazy" {/* Native lazy loading */}
          srcSet={`
            ${img.smallUrl} 480w,
            ${img.mediumUrl} 800w,
            ${img.largeUrl} 1200w
          `}
          sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
          alt={img.alt}
        />
      ))}
    </div>
  );
}

// ✅ EVEN BETTER: Use modern image formats
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="description" loading="lazy" />
</picture>
```

### 7. Bundle Size Analysis

```jsx
// Analyze bundle size
// In package.json:
{
  "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  }
}

// ✅ GOOD: Remove unused dependencies
// npm install --save-dev webpack-bundle-analyzer

// ✅ Tree shaking - Only import what you need
// BAD: import _ from 'lodash';
// GOOD: import { debounce } from 'lodash-es';

// ✅ Dynamic imports
// BAD: import moment from 'moment';
// GOOD: const moment = await import('moment-tiny');
```

### 8. State Management Optimization

```jsx
// ❌ BAD: All consumers re-render on any state change
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);

  // Recreated on every render!
  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    setNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ✅ GOOD: Split contexts by change frequency
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({ user, setUser }), [user]);

  const [theme, setTheme] = useState("light");
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  const [notifications, setNotifications] = useState([]);
  const notifValue = useMemo(
    () => ({ notifications, setNotifications }),
    [notifications]
  );

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        <NotificationContext.Provider value={notifValue}>
          {children}
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Theme-only components only re-render when theme changes
```

### 9. Debouncing and Throttling

```jsx
// ❌ BAD: API call on every keystroke
function SearchUsers({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value); // Called 100+ times while typing!
  };

  return <input onChange={handleChange} placeholder="Search..." />;
}

// ✅ GOOD: Debounce the search
import { useCallback } from "react";

function SearchUsers({ onSearch }) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value); // Only called after user stops typing
    }, 300),
    [onSearch]
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <input value={query} onChange={handleChange} placeholder="Search..." />
  );
}

// Debounce implementation
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
```

### 10. useTransition for Non-blocking Updates (React 18)

```jsx
// ❌ BAD: Large list updates block input
function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    // This expensive operation blocks the input
    setResults(performExpensiveSearch(newQuery));
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      <ResultsList results={results} />
    </div>
  );
}

// ✅ GOOD: useTransition keeps input responsive
function SearchResults() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newQuery) => {
    setQuery(newQuery);

    // Mark state update as non-urgent
    startTransition(() => {
      setResults(performExpensiveSearch(newQuery));
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
      />
      {isPending && <div>Loading...</div>}
      <ResultsList results={results} />
    </div>
  );
}
```

### 11. useDeferredValue for Expensive Rendering

```jsx
// ✅ GOOD: Defer expensive list updates
function ProductList({ searchQuery }) {
  const deferredQuery = useDeferredValue(searchQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Expensive filtering
    const filtered = allProducts.filter((p) =>
      p.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
    setResults(filtered);
  }, [deferredQuery]);

  return (
    <div>
      {searchQuery !== deferredQuery && (
        <div className="stale">Updating...</div>
      )}
      <ul>
        {results.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 12. Profiling with React DevTools

```jsx
// Use React Profiler API to measure performance
import { Profiler } from "react";

function App() {
  const onRenderCallback = (
    id, // component identifier
    phase, // "mount" or "update"
    actualDuration, // time spent rendering
    baseDuration, // estimated render time without memoization
    startTime, // timestamp when React started rendering
    commitTime // timestamp when React committed updates
  ) => {
    console.log(`${id} (${phase}) took ${actualDuration}ms`);
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <YourApp />
    </Profiler>
  );
}
```

### Performance Optimization Checklist:

| Optimization                | Impact    | Difficulty |
| --------------------------- | --------- | ---------- |
| React.memo                  | High      | Low        |
| useMemo for selectors       | High      | Low        |
| useCallback                 | High      | Low        |
| Code splitting/Lazy loading | Very High | Medium     |
| Virtual scrolling           | Very High | Medium     |
| Bundle analysis             | High      | Low        |
| Image optimization          | Very High | Low        |
| State splitting             | Medium    | Medium     |
| Debouncing/Throttling       | High      | Low        |
| useTransition (React 18)    | High      | Medium     |
| Server-side rendering       | Very High | High       |
| Database query optimization | Very High | High       |

### Complete Optimization Example:

```jsx
import React, {
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useState,
  useTransition,
} from "react";
import { FixedSizeList } from "react-window";

// Lazy load heavy components
const Analytics = lazy(() => import("./Analytics"));

const UserItem = React.memo(({ user, onSelect }) => (
  <div onClick={() => onSelect(user.id)}>{user.name}</div>
));

function OptimizedUserApp() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Memoize expensive filter
  const filteredUsers = useMemo(() => {
    return allUsers.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Memoize callback
  const handleSelect = useCallback((id) => {
    startTransition(() => {
      setSelectedId(id);
    });
  }, []);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />

      {/* Virtual scrolling for large lists */}
      <FixedSizeList
        height={400}
        itemCount={filteredUsers.length}
        itemSize={35}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style}>
            <UserItem user={filteredUsers[index]} onSelect={handleSelect} />
          </div>
        )}
      </FixedSizeList>

      {/* Lazy load heavy component */}
      <Suspense fallback={<div>Loading analytics...</div>}>
        <Analytics userId={selectedId} />
      </Suspense>
    </div>
  );
}

export default OptimizedUserApp;
```

### Tools and Resources:

```jsx
// Performance monitoring tools
// 1. React Profiler (built-in DevTools)
// 2. Chrome DevTools Performance tab
// 3. Lighthouse
// 4. Web Vitals
// 5. Sentry for error tracking

// Bundle analysis
// - webpack-bundle-analyzer
// - source-map-explorer
// - bundle-phobia (check package sizes)

// Performance libraries
// - react-window (virtual scrolling)
// - react-lazyload (lazy loading)
// - lodash-es (tree-shakeable utilities)
// - dayjs (smaller date library than moment)
```

### Summary: Performance Strategy

1. **Measure First**: Use profilers to identify bottlenecks
2. **Optimize Components**: React.memo, useMemo, useCallback
3. **Split Code**: Lazy load and code split routes
4. **Optimize Assets**: Images, fonts, CSS
5. **Improve Data**: Query optimization, pagination
6. **Monitor**: Set up performance monitoring
7. **Test**: Measure impact of optimizations

---

---

8. Describe the controlled vs uncontrolled components pattern.

**Answer:**

Controlled and uncontrolled components are two different patterns for handling form data in React. A **controlled component** has its value managed by React state, while an **uncontrolled component** manages its own value in the DOM.

### Controlled Components

In controlled components, React state is the "single source of truth" for form input values. The component re-renders on every input change.

```jsx
// ✅ CONTROLLED COMPONENT
function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    // Process form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name} {/* Controlled by state */}
        onChange={(e) => setName(e.target.value)} {/* Update state */}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Flow:
// 1. User types "John" in name input
// 2. onChange event fires
// 3. setName("John") updates state
// 4. Component re-renders with value="John"
// 5. Input displays "John"
```

### Uncontrolled Components

In uncontrolled components, the form input manages its own internal state in the DOM. React doesn't control the value. You use refs to access the value when needed.

```jsx
// ✅ UNCONTROLLED COMPONENT
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Access values directly from DOM
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={nameRef}
        placeholder="Name"
        defaultValue="" {/* Use defaultValue instead of value */}
      />
      <input
        type="email"
        ref={emailRef}
        placeholder="Email"
        defaultValue=""
      />
      <textarea
        ref={messageRef}
        placeholder="Message"
        defaultValue=""
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Flow:
// 1. User types "John" in name input
// 2. DOM input value updates directly (React doesn't manage this)
// 3. No state update, no re-render
// 4. On submit, we read value from DOM via ref
```

### Detailed Comparison:

| Aspect              | Controlled            | Uncontrolled                 |
| ------------------- | --------------------- | ---------------------------- |
| **Data Source**     | React state           | DOM                          |
| **Value Access**    | Via state variable    | Via ref.current.value        |
| **Re-renders**      | On every keystroke    | None (unless form submits)   |
| **Default Value**   | Set with `value` prop | Set with `defaultValue` prop |
| **Validation**      | Real-time in onChange | On submit                    |
| **Component Reset** | `setState()`          | `ref.current.value = ''`     |
| **Single Value**    | Easy                  | Easy                         |
| **Multiple Fields** | Verbose               | Simple                       |
| **Complex Logic**   | Easy                  | Harder                       |

### Controlled Component - Real-World Example:

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    subscribe: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Real-time validation
    validateField(name, type === "checkbox" ? checked : value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "firstName":
        if (!value.trim()) {
          newErrors.firstName = "First name is required";
        } else {
          delete newErrors.firstName;
        }
        break;
      case "email":
        if (!value.includes("@")) {
          newErrors.email = "Invalid email";
        } else {
          delete newErrors.email;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      // Send to API
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        {errors.firstName && (
          <span style={{ color: "red" }}>{errors.firstName}</span>
        )}
      </div>

      <div>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
        />
      </div>

      <div>
        <input
          type="checkbox"
          name="subscribe"
          checked={formData.subscribe}
          onChange={handleChange}
        />
        <label>Subscribe to newsletter</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

// Benefits:
// ✅ Real-time validation feedback
// ✅ Clear error messages
// ✅ Disable submit button until form is valid
// ✅ Track form changes
// ✅ Conditional field rendering
```

### Uncontrolled Component - File Upload Example:

```jsx
function FileUpload() {
  const fileRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = fileRef.current.files[0];
    if (file) {
      console.log("Uploading:", file.name, file.size);
      // Upload file
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileRef} />
      <button type="submit">Upload</button>
    </form>
  );
}

// Why uncontrolled for file input?
// - File inputs can't be controlled in React
// - Value can only be read, not set
// - Always use refs with file inputs
```

### Hybrid Approach - Using React-Hook-Form:

```jsx
import { useForm } from "react-hook-form";

function HybridForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const watchedName = watch("name"); // Optionally watch specific field

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+/,
            message: "Invalid email",
          },
        })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <textarea {...register("message")} placeholder="Message" />

      <button type="submit">Submit</button>
    </form>
  );
}

// Benefits:
// ✅ Minimal re-renders (uncontrolled by default)
// ✅ Built-in validation
// ✅ Easy error handling
// ✅ Good performance
```

### When to Use Each Pattern:

#### Use Controlled Components When:

```jsx
✅ Need real-time validation
✅ Need to disable submit button conditionally
✅ Need to dynamically change field values
✅ Need to show validation errors immediately
✅ Need conditional rendering based on input
✅ Working with complex forms with interdependent fields

// Example: Disabling submit until form is valid
function ControlledFormWithValidation() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const isValid = formData.email.includes('@') && formData.password.length >= 8;

  return (
    <form>
      <input
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
          validateEmail(e.target.value);
        }}
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
          validatePassword(e.target.value);
        }}
      />
      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
}
```

#### Use Uncontrolled Components When:

```jsx
✅ Integrating with non-React code (jQuery plugins, etc.)
✅ File input handling
✅ Simple forms with minimal validation
✅ Want to avoid re-renders
✅ Working with native form elements
✅ Performance is critical (many form fields)

// Example: Integrating with non-React library
function IntegratedForm() {
  const formRef = useRef();

  useEffect(() => {
    // Initialize non-React form plugin
    jQueryPlugin(formRef.current);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    // Process with non-React library
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="field1" />
      <input name="field2" />
      <button>Submit</button>
    </form>
  );
}
```

### Accessing Individual Form Values:

```jsx
// CONTROLLED: Direct from state
function ControlledExample() {
  const [email, setEmail] = useState("");

  // Email is always available in state
  console.log(email); // Current value
}

// UNCONTROLLED: From ref
function UncontrolledExample() {
  const emailRef = useRef();

  // Email is only available when needed
  const handleSubmit = () => {
    console.log(emailRef.current.value); // Access on demand
  };
}
```

### Best Practice: Custom Hook for Controlled Forms:

```jsx
function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  return {
    bind: {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    value,
    reset: () => setValue(initialValue),
  };
}

// Usage:
function MyForm() {
  const name = useFormInput("");
  const email = useFormInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name.value, email.value);
    name.reset();
    email.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...name.bind} placeholder="Name" />
      <input {...email.bind} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Summary Comparison:

| Scenario                     | Best Pattern |
| ---------------------------- | ------------ |
| Complex form with validation | Controlled   |
| File input                   | Uncontrolled |
| Simple contact form          | Controlled   |
| Integrating third-party lib  | Uncontrolled |
| Real-time search             | Controlled   |
| High-performance form        | Uncontrolled |
| Dynamic field generation     | Controlled   |
| Form inside modal            | Controlled   |

### Key Takeaways:

- ✅ **Controlled**: React manages input value via state
- ✅ **Uncontrolled**: DOM manages input value, access via refs
- ✅ **Controlled** is more React-like and recommended for most cases
- ✅ **Uncontrolled** is useful for file inputs and performance
- ✅ Modern libraries like React-Hook-Form offer best of both
- ✅ Choose based on your form complexity and performance needs

---

---

9. What are Higher Order Components? Provide a practical example.

**Answer:**

A Higher Order Component (HOC) is an advanced pattern for reusing component logic. It's a function that takes a component and returns a new enhanced component with additional functionality. HOCs wrap components to provide cross-cutting concerns like authentication, theme, data fetching, etc.

### Definition and Concept:

```jsx
// HOC Pattern: A function that takes a component and returns a new component
const EnhancedComponent = higherOrderComponent(OriginalComponent);

// Basic HOC Structure:
function withSomething(WrappedComponent) {
  // Return a new component
  return function WithSomethingComponent(props) {
    // Add additional logic here
    return <WrappedComponent {...props} />;
  };
}
```

### Simple HOC Example - Theme Provider:

```jsx
// ✅ Simple HOC that provides theme
function withTheme(WrappedComponent) {
  return function WithThemeComponent(props) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
      <div
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        <WrappedComponent {...props} theme={theme} toggleTheme={toggleTheme} />
      </div>
    );
  };
}

// Usage:
function MyComponent({ theme, toggleTheme }) {
  return (
    <div>
      <h1>Current Theme: {theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

const EnhancedComponent = withTheme(MyComponent);

// In App:
<EnhancedComponent />;
```

### Real-World HOC Example - Authentication:

```jsx
// ✅ HOC for protecting routes that require authentication
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check if user is authenticated
      const checkAuth = async () => {
        try {
          const response = await fetch("/api/me");
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error("Auth check failed:", error);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <div>Please log in to access this page</div>;
    }

    // User is authenticated, render the wrapped component
    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage:
function Dashboard({ user }) {
  return <h1>Welcome, {user.name}!</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);

// In App:
<ProtectedDashboard />; // Shows Dashboard only if authenticated
```

### Advanced HOC Example - Data Fetching:

```jsx
// ✅ HOC that handles data fetching
function withDataFetching(url) {
  return function WithDataFetching(WrappedComponent) {
    return function DataFetchingComponent(props) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch");
            const result = await response.json();
            setData(result);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, [url]);

      return (
        <WrappedComponent
          {...props}
          data={data}
          loading={loading}
          error={error}
        />
      );
    };
  };
}

// Usage:
function UserList({ data, loading, error }) {
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

const UserListWithData = withDataFetching("/api/users")(UserList);

// In App:
<UserListWithData />;
```

### HOC for Props Transformation:

```jsx
// ✅ HOC that transforms props
function withFormattedDate(WrappedComponent) {
  return function WithFormattedDate(props) {
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return <WrappedComponent {...props} formatDate={formatDate} />;
  };
}

function ArticleList({ articles, formatDate }) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <h3>{article.title}</h3>
          <p>Published: {formatDate(article.publishedAt)}</p>
        </li>
      ))}
    </ul>
  );
}

const ArticleListWithDates = withFormattedDate(ArticleList);
```

### Composing Multiple HOCs:

```jsx
// ✅ Combining multiple HOCs
function ComposedComponent() {
  // Without composition (hard to read):
  // const Enhanced = withTheme(withAuth(withLogging(MyComponent)));

  // With composition helper:
  const compose =
    (...fns) =>
    (x) =>
      fns.reduceRight((v, f) => f(v), x);

  const Enhanced = compose(withTheme, withAuth, withLogging)(MyComponent);

  return <Enhanced />;
}

// Or using pipe (left-to-right):
function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x);
}

const Enhanced = pipe(withLogging, withAuth, withTheme)(MyComponent);
```

### Complete Practical HOC - Redux Connection:

```jsx
// ✅ Redux connect as HOC (before hooks)
function connect(mapStateToProps, mapDispatchToProps) {
  return function ConnectComponent(WrappedComponent) {
    return function ConnectedComponent(props) {
      const state = useSelector(mapStateToProps);
      const dispatch = useDispatch();
      const actions = useMemo(() => mapDispatchToProps(dispatch), [dispatch]);

      return <WrappedComponent {...props} {...state} {...actions} />;
    };
  };
}

// Usage:
function TodoList({ todos, addTodo, removeTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default connect(
  (state) => ({ todos: state.todos }),
  (dispatch) => ({
    addTodo: (text) => dispatch(addTodo(text)),
    removeTodo: (id) => dispatch(removeTodo(id)),
  })
)(TodoList);
```

### HOC for Logger/Analytics:

```jsx
// ✅ HOC for tracking component lifecycle
function withLogger(WrappedComponent) {
  return function WithLoggerComponent(props) {
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
      console.log(`${WrappedComponent.name} mounted`);
      return () => {
        console.log(`${WrappedComponent.name} unmounted`);
      };
    }, []);

    useEffect(() => {
      console.log(`${WrappedComponent.name} rendered ${renderCount + 1} times`);
      setRenderCount((prev) => prev + 1);
    });

    return <WrappedComponent {...props} />;
  };
}

// Usage:
const LoggedComponent = withLogger(MyComponent);
// Will log every time component mounts, unmounts, or re-renders
```

### HOC for Ref Forwarding:

```jsx
// ⚠️ Problem: HOCs lose refs by default
function withForwardRef(WrappedComponent) {
  return React.forwardRef((props, ref) => (
    <WrappedComponent {...props} forwardedRef={ref} />
  ));
}

// Usage:
const Input = React.forwardRef(({ forwardedRef, ...props }, ref) => (
  <input ref={ref} {...props} />
));

const InputWithLogging = withForwardRef(Input);

function App() {
  const inputRef = useRef();

  return (
    <>
      <InputWithLogging ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </>
  );
}
```

### HOC Best Practices:

```jsx
// ✅ DO: Display name for debugging
function withSubscription(WrappedComponent) {
  function WithSubscription(props) {
    // ...
    return <WrappedComponent {...props} />;
  }

  WithSubscription.displayName = `WithSubscription(${getDisplayName(
    WrappedComponent
  )})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

// ✅ DO: Copy static methods
import hoistNonReactStatics from "hoist-non-react-statics";

function enhance(WrappedComponent) {
  class Enhance extends React.Component {
    /* ... */
  }
  hoistNonReactStatics(Enhance, WrappedComponent);
  return Enhance;
}

// ✅ DO: Provide proper prop passing
function withExample(WrappedComponent) {
  const WithExample = (props) => {
    const { example, ...rest } = props;
    return <WrappedComponent {...rest} example={example} />;
  };
  return WithExample;
}

// ❌ DON'T: Create HOCs inside render
function render() {
  const Enhanced = withExample(MyComponent); // New component every render!
  return <Enhanced />;
}

// ✅ DO: Create HOCs outside render
const Enhanced = withExample(MyComponent);

function App() {
  return <Enhanced />;
}
```

### HOC vs Hooks vs Render Props:

| Pattern          | Use Case       | Pros                  | Cons                           |
| ---------------- | -------------- | --------------------- | ------------------------------ |
| **HOC**          | Reusable logic | Reusable, composable  | Wrapper hell, prop naming      |
| **Hooks**        | Reusable logic | Clean, simple, modern | Need class component migration |
| **Render Props** | Logic sharing  | Flexible, explicit    | Callback complexity            |

```jsx
// Same logic in different patterns:

// HOC Pattern:
const WithData = withDataFetching(UserList);

// Hook Pattern (Modern):
function UserList() {
  const { data, loading } = useDataFetching("/api/users");
  // ...
}

// Render Props Pattern:
<DataFetching url="/api/users">
  {({ data, loading }) => <UserList data={data} loading={loading} />}
</DataFetching>;
```

### When to Use HOCs:

```jsx
✅ Use HOCs when:
- Need to reuse stateful logic across multiple components
- Building libraries or component frameworks
- Working with class components (before hooks)
- Need to wrap components (styling, layout)
- Intercepting props or rendering

❌ Don't use HOCs when:
- Can use hooks instead (modern React)
- Only need simple prop passing
- Building new projects (use hooks)
- Need to avoid wrapper component nesting
```

### Modern Alternative - Custom Hooks:

```jsx
// Instead of HOC, use custom hook (recommended for modern React)
function useDataFetching(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage: Much cleaner!
function UserList() {
  const { data, loading, error } = useDataFetching("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Summary:

HOCs are a powerful pattern for:

- ✅ Reusing component logic
- ✅ Abstracting state management
- ✅ Code reuse and composition
- ✅ Cross-cutting concerns

However, **Custom Hooks are the modern approach** and should be preferred for new React applications. HOCs are still useful when:

- Working with class components
- Building component libraries
- Need strict component wrapping

---

10. How do you handle asynchronous data fetching in React components?

**Answer:**

Handling asynchronous data fetching in React is a common requirement. The standard approach uses the `useEffect` hook to fetch data when a component mounts or when dependencies change. Here are the various methods and best practices.

### Basic Data Fetching with useEffect and useState:

```jsx
// ✅ Basic pattern for fetching data
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [userId]); // Re-fetch when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### Using AbortController for Cancelable Requests:

```jsx
// ✅ Modern approach using AbortController
function SearchUsers({ query }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const abortController = new AbortController();

    const searchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${query}`, {
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();
        setResults(data);
        setError(null);
      } catch (err) {
        // AbortError is thrown when request is canceled
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    searchUsers();

    // Cleanup: cancel request if component unmounts or query changes
    return () => abortController.abort();
  }, [query]);

  if (loading) return <div>Searching...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {results.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Custom Hook for Data Fetching:

```jsx
// ✅ Reusable custom hook for fetching
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url, options]);

  return { data, loading, error };
}

// Usage:
function PostList() {
  const { data: posts, loading, error } = useFetch("/api/posts");

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Fetching with Loading States and Debouncing:

```jsx
// ✅ Search with debouncing to reduce API calls
function useFetchWithDebounce(query, delay = 300) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timerId = setTimeout(async () => {
      const abortController = new AbortController();

      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${query}`, {
          signal: abortController.signal,
        });

        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();
        setResults(data);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timerId);
  }, [query, delay]);

  return { results, loading, error };
}

// Usage:
function SearchWithDebounce() {
  const [query, setQuery] = useState("");
  const { results, loading } = useFetchWithDebounce(query);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Fetching with Pagination:

```jsx
// ✅ Pagination pattern
function UserListWithPagination() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users?page=${page}&limit=10`);
        const data = await response.json();

        if (page === 1) {
          setUsers(data.items);
        } else {
          setUsers((prev) => [...prev, ...data.items]);
        }

        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {hasMore && <button onClick={handleLoadMore}>Load More</button>}
    </div>
  );
}
```

### Infinite Scroll with Intersection Observer:

```jsx
// ✅ Infinite scroll using Intersection Observer
function InfiniteScrollList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/items?page=${page}`);
        const data = await response.json();

        setItems((prev) => [...prev, ...data.items]);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page]);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div ref={observerTarget} style={{ height: "20px" }}>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}
```

### Fetching Multiple Resources in Parallel:

```jsx
// ✅ Promise.all for parallel requests
function UserWithPostsAndComments({ userId }) {
  const [data, setData] = useState({
    user: null,
    posts: [],
    comments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch all three in parallel
        const [userRes, postsRes, commentsRes] = await Promise.all([
          fetch(`/api/users/${userId}`),
          fetch(`/api/users/${userId}/posts`),
          fetch(`/api/users/${userId}/comments`),
        ]);

        // Check all responses
        if (!userRes.ok || !postsRes.ok || !commentsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse all responses
        const [user, posts, comments] = await Promise.all([
          userRes.json(),
          postsRes.json(),
          commentsRes.json(),
        ]);

        setData({ user, posts, comments });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{data.user.name}</h1>
      <h2>Posts ({data.posts.length})</h2>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <h2>Comments ({data.comments.length})</h2>
    </div>
  );
}
```

### Error Handling and Retry Logic:

```jsx
// ✅ Advanced error handling with retry
function useFetchWithRetry(url, maxRetries = 3) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let retryCount = 0;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retry attempt ${retryCount}/${maxRetries}`);

          // Exponential backoff: wait 2^retryCount seconds
          setTimeout(fetchData, Math.pow(2, retryCount) * 1000);
        } else {
          setError(err.message);
        }
      } finally {
        if (retryCount === 0 || retryCount >= maxRetries) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [url, maxRetries]);

  return { data, loading, error };
}
```

### Using React Query for Advanced Data Fetching:

```jsx
// ✅ Modern approach with React Query (recommended for production)
import { useQuery } from "@tanstack/react-query";

function UserProfile({ userId }) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: (attemptIndex) => Math.pow(2, attemptIndex) * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

// Using useQueries for multiple queries:
function UserDashboard({ userIds }) {
  const queries = useQueries({
    queries: userIds.map((id) => ({
      queryKey: ["user", id],
      queryFn: () => fetch(`/api/users/${id}`).then((r) => r.json()),
    })),
  });

  return (
    <ul>
      {queries.map((query) => (
        <li key={query.data?.id}>
          {query.isLoading ? "Loading..." : query.data?.name}
        </li>
      ))}
    </ul>
  );
}
```

### Using SWR (Stale-While-Revalidate):

```jsx
// ✅ Alternative lightweight library: SWR
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function UserProfile({ userId }) {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}
```

### Common Patterns and Anti-Patterns:

```jsx
// ❌ DON'T: Fetch without cleanup (memory leak)
function BadComponent() {
  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then((data) => {
        setState(data); // May update unmounted component
      });
  }, []);
}

// ✅ DO: Always cleanup
function GoodComponent() {
  useEffect(() => {
    let isMounted = true;

    fetch("/api/data")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) setState(data);
      });

    return () => {
      isMounted = false;
    };
  }, []);
}

// ❌ DON'T: Fetch on every render
function BadComponent({ userId }) {
  const [user, setUser] = useState(null);

  fetch(`/api/users/${userId}`)
    .then((r) => r.json())
    .then(setUser);

  return <div>{user?.name}</div>;
}

// ✅ DO: Use useEffect with dependencies
function GoodComponent({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((r) => r.json())
      .then(setUser);
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

### Best Practices Summary:

| Practice                | Why                          | Example                          |
| ----------------------- | ---------------------------- | -------------------------------- |
| **Use AbortController** | Cancel requests on unmount   | `signal: abortController.signal` |
| **Debounce searches**   | Reduce API calls             | `setTimeout` with delay          |
| **Parallel requests**   | Better performance           | `Promise.all`                    |
| **Error handling**      | Graceful degradation         | Try-catch with user feedback     |
| **Retry logic**         | Handle transient failures    | Exponential backoff              |
| **Use React Query**     | Caching, deduplication, sync | Production applications          |
| **Clean up effects**    | Prevent memory leaks         | Return cleanup function          |
| **Check isMounted**     | Prevent state on unmounted   | Flag in useEffect                |

### Recommended Approach for Modern React:

For production applications, use **React Query** or **SWR** instead of manual `useEffect`. They handle:

- Automatic caching and revalidation
- Request deduplication
- Background refetching
- Error handling and retries
- Loading and error states
- Garbage collection

---

11. Explain the use of error boundaries in React and when to use them.

**Answer:**

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. They implement lifecycle methods `getDerivedStateFromError()` and `componentDidCatch()` to handle errors gracefully.

### What are Error Boundaries?

Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them. However, they do NOT catch:

- Event handler errors (use try-catch instead)
- Asynchronous code (use .catch() or try-catch in async/await)
- Server-side rendering errors
- Errors in the error boundary itself

### Basic Error Boundary Implementation:

```jsx
// ✅ Simple error boundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state when an error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error to console or error reporting service
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error);
    console.error("Error Info:", errorInfo);

    // Send to error logging service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", border: "1px solid red" }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage:
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### Error Boundary with Custom UI and Recovery:

```jsx
// ✅ Error boundary with better UX
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState((prev) => ({ errorCount: prev.errorCount + 1 }));

    // Log to error reporting service
    console.error("Error Details:", {
      error: error.toString(),
      stack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fee",
            border: "2px solid #c33",
            borderRadius: "4px",
            margin: "20px",
          }}
        >
          <h2>⚠️ Oops! Something went wrong</h2>
          <details style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>
            {this.state.error?.toString()}
            <br />
            {this.state.errorCount > 2 && (
              <p style={{ color: "#c33", marginTop: "10px" }}>
                This error has occurred multiple times. Please refresh the page.
              </p>
            )}
          </details>
          <button
            onClick={this.handleReset}
            style={{ marginTop: "10px", padding: "10px 20px" }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Error Boundary with Error Logging Service:

```jsx
// ✅ Error boundary integrated with error logging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorId: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate unique error ID for user to report
    const errorId = `ERR-${Date.now()}-${Math.random()}`;

    // Send to error tracking service (Sentry, etc.)
    this.logErrorToService({
      errorId,
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });

    this.setState({ errorId });
  }

  logErrorToService = async (errorData) => {
    try {
      // Example with Sentry
      // Sentry.captureException(error, { contexts: { react: errorData } });

      // Or custom API call
      await fetch("/api/errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(errorData),
      });
    } catch (err) {
      console.error("Failed to log error:", err);
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>😞 Something went wrong</h1>
          <p>We've been notified and will look into it.</p>
          <p style={{ color: "#666", fontSize: "12px" }}>
            Error ID: <code>{this.state.errorId}</code>
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Multiple Error Boundaries for Granular Error Handling:

```jsx
// ✅ Separate error boundaries for different sections
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error in {this.props.name}</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div>
      <Header />

      <ErrorBoundary name="Sidebar">
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary name="Main Content">
        <MainContent />
      </ErrorBoundary>

      <ErrorBoundary name="Comments">
        <Comments />
      </ErrorBoundary>
    </div>
  );
}

// If Comments component crashes, only Comments section shows error
// Rest of the app continues to work
```

### Error Boundary with Retry Logic:

```jsx
// ✅ Error boundary with retry mechanism
class RetryErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
      maxRetries: 3,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  handleRetry = () => {
    const { retryCount, maxRetries } = this.state;

    if (retryCount < maxRetries) {
      this.setState((prev) => ({
        hasError: false,
        retryCount: prev.retryCount + 1,
      }));
    } else {
      console.error("Max retries reached");
    }
  };

  render() {
    const { hasError, retryCount, maxRetries } = this.state;

    if (hasError) {
      return (
        <div style={{ padding: "20px" }}>
          <h2>Something went wrong</h2>
          <p>
            Retry attempt: {retryCount}/{maxRetries}
          </p>
          {retryCount < maxRetries ? (
            <button onClick={this.handleRetry}>Retry</button>
          ) : (
            <p>Maximum retries reached. Please contact support.</p>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Error Boundary with Error Recovery Boundaries:

```jsx
// ✅ Nested error boundaries for recovery at different levels
class TopLevelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Top level error:", error);
  }

  render() {
    if (this.state.hasError) {
      return <div>Fatal application error. Please refresh.</div>;
    }
    return this.props.children;
  }
}

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>This section encountered an error.</div>;
    }
    return this.props.children;
  }
}

// Usage:
function App() {
  return (
    <TopLevelErrorBoundary>
      <Header />
      <SectionErrorBoundary>
        <MainContent />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <Sidebar />
      </SectionErrorBoundary>
    </TopLevelErrorBoundary>
  );
}
```

### What Errors Does Error Boundary Catch?

```jsx
// ✅ Errors that ARE caught by error boundaries:

// 1. Render errors
function BadRender() {
  const arr = null;
  return <div>{arr.map((x) => x)}</div>; // Error: Cannot read property 'map' of null
}

// 2. Lifecycle method errors
class BadLifecycle extends React.Component {
  componentDidMount() {
    throw new Error("Error in lifecycle");
  }
  render() {
    return <div>Component</div>;
  }
}

// 3. Constructor errors
class BadConstructor extends React.Component {
  constructor(props) {
    super(props);
    throw new Error("Error in constructor");
  }
  render() {
    return <div>Component</div>;
  }
}

// ❌ Errors that are NOT caught by error boundaries:

// 1. Event handler errors (use try-catch instead)
function BadEventHandler() {
  const handleClick = () => {
    throw new Error("Error in event handler");
  };
  return <button onClick={handleClick}>Click me</button>;
}

// ✅ Correct way to handle event handler errors:
function GoodEventHandler() {
  const handleClick = () => {
    try {
      // Code that might throw
    } catch (error) {
      console.error("Event handler error:", error);
    }
  };
  return <button onClick={handleClick}>Click me</button>;
}

// 2. Async errors (use .catch() or try-catch in async)
function BadAsync() {
  const fetchData = () => {
    fetch("/api/data").then((data) => {
      throw new Error("Async error"); // Not caught by error boundary
    });
  };
  return <button onClick={fetchData}>Fetch</button>;
}

// ✅ Correct way:
function GoodAsync() {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return <button onClick={fetchData}>Fetch</button>;
}

// 3. Server-side rendering errors
// Error boundaries don't work on server (use try-catch instead)

// 4. Errors in the error boundary itself
// Error boundary can't catch errors in itself
```

### Error Boundary with Detailed Error Info:

```jsx
// ✅ Error boundary with stack trace display
class DetailedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  toggleDetails = () => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            margin: "20px",
          }}
        >
          <h2>⚠️ Error Occurred</h2>
          <p>{this.state.error?.toString()}</p>

          <button onClick={this.toggleDetails} style={{ marginTop: "10px" }}>
            {this.state.showDetails ? "Hide" : "Show"} Details
          </button>

          {this.state.showDetails && (
            <pre
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                marginTop: "10px",
                overflow: "auto",
                fontSize: "12px",
              }}
            >
              {this.state.errorInfo?.componentStack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Error Boundary Pattern Comparison:

| Aspect                           | Error Boundary        | Try-Catch                     | .catch() |
| -------------------------------- | --------------------- | ----------------------------- | -------- |
| **Catches render errors**        | ✅ Yes                | ❌ No                         | ❌ No    |
| **Catches lifecycle errors**     | ✅ Yes                | ❌ No                         | ❌ No    |
| **Catches event handler errors** | ❌ No                 | ✅ Yes                        | ❌ No    |
| **Catches async errors**         | ❌ No                 | ❌ No (unless in async/await) | ✅ Yes   |
| **Component type**               | Class only            | Any                           | Any      |
| **Best for**                     | Component tree errors | Sync operations               | Promises |

### When to Use Error Boundaries:

```jsx
// ✅ Use error boundaries for:

// 1. Protecting entire application
<ErrorBoundary>
  <App />
</ErrorBoundary>

// 2. Protecting major sections
<ErrorBoundary name="Dashboard">
  <Dashboard />
</ErrorBoundary>

// 3. Protecting third-party components
<ErrorBoundary name="ExternalWidget">
  <ThirdPartyWidget />
</ErrorBoundary>

// 4. Route-level protection
<ErrorBoundary name="Route">
  <Route path="/users" element={<UserList />} />
</ErrorBoundary>

// ❌ Don't use error boundaries for:

// 1. Event handler errors (use try-catch)
button.addEventListener('click', () => {
  try {
    // code
  } catch (error) {
    // handle
  }
});

// 2. Async operations (use .catch() or try-catch)
fetch('/api/data')
  .catch(error => console.error('Fetch failed:', error));

// 3. Timers/callbacks (use try-catch inside)
setTimeout(() => {
  try {
    // code
  } catch (error) {
    // handle
  }
}, 1000);
```

### Best Practices for Error Boundaries:

```jsx
// ✅ DO: Use multiple error boundaries at different levels
<ErrorBoundary name="App">
  <Header />
  <ErrorBoundary name="MainContent">
    <MainContent />
  </ErrorBoundary>
  <ErrorBoundary name="Sidebar">
    <Sidebar />
  </ErrorBoundary>
</ErrorBoundary>

// ✅ DO: Provide user-friendly error messages
if (this.state.hasError) {
  return <div>Something went wrong. Our team has been notified.</div>;
}

// ✅ DO: Log errors to monitoring service
componentDidCatch(error, errorInfo) {
  logErrorToService(error, errorInfo);
}

// ✅ DO: Provide recovery options
<button onClick={this.handleReset}>Try Again</button>

// ❌ DON'T: Use error boundaries for expected errors
// Don't treat validation errors as boundary errors

// ❌ DON'T: Catch all errors without context
// Provide specific error messages and recovery options

// ❌ DON'T: Wrap every component in error boundary
// Use selectively for important sections
```

### Error Boundary vs useErrorHandler Hook (React 18+):

```jsx
// ✅ Class component approach (traditional)
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>;
    }
    return this.props.children;
  }
}

// ✅ Hook-based approach (with custom hook)
function useErrorHandler() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      setError(event.error);
    };

    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return null;
}

// Note: React 18+ may provide useErrorHandler hook
// Currently, error boundaries require class components
```

### Summary:

Error boundaries are essential for building resilient React applications by:

- ✅ Catching and handling render errors
- ✅ Preventing entire app crashes
- ✅ Providing fallback UI
- ✅ Enabling error logging and monitoring
- ✅ Improving user experience

Use them strategically at application, route, and section levels to create a robust error handling strategy.

---

12. Describe React's event handling system.

**Answer:**

React uses a synthetic event system that wraps the browser's native events. React attaches event listeners to the root of the component tree and delegates events to appropriate components using event delegation, providing a cross-browser consistent API and performance optimizations.

### React's Synthetic Event System:

```jsx
// ✅ React events are camelCased attributes
function EventDemo() {
  const handleClick = (e) => {
    console.log("Clicked!");
    console.log("Event object:", e); // SyntheticEvent object
  };

  return <button onClick={handleClick}>Click me</button>;
}

// Native vs React event names:
// Native: onclick, onchange, onsubmit
// React: onClick, onChange, onSubmit (camelCase)

// Common events:
// onClick, onChange, onSubmit, onFocus, onBlur
// onMouseEnter, onMouseLeave, onMouseOver, onMouseOut
// onKeyDown, onKeyUp, onKeyPress
// onTouchStart, onTouchEnd, onTouchMove
// onScroll, onWheel
```

### Event Handler Binding in Class Components:

```jsx
// ✅ Method 1: Bind in constructor
class ClickCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    // Bind the method to preserve 'this' context
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>Clicks: {this.state.count}</button>
    );
  }
}

// ✅ Method 2: Class field arrow function (modern)
class ClickCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <button onClick={this.handleClick}>Clicks: {this.state.count}</button>
    );
  }
}

// ❌ Method 3: Arrow function in render (creates new function every render)
class ClickCounter extends React.Component {
  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    // Creates new function every render - less efficient
    return <button onClick={() => this.handleClick()}>Click</button>;
  }
}

// Best practice: Use class field arrow function or bind in constructor
```

### Event Handling in Function Components:

```jsx
// ✅ Function components (simplest approach with hooks)
function EventDemo() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  // Arrow function automatically binds 'this'
  return <button onClick={handleClick}>Clicks: {count}</button>;
}

// ✅ Inline event handlers (fine for simple cases)
function SimpleButton() {
  return <button onClick={() => console.log("Clicked!")}>Click me</button>;
}

// ✅ Event handler with parameters
function List() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    setSelected(id);
  };

  return (
    <ul>
      {[1, 2, 3].map((id) => (
        <li key={id}>
          <button onClick={() => handleSelect(id)}>Item {id}</button>
        </li>
      ))}
    </ul>
  );
}
```

### Event Object and SyntheticEvent:

```jsx
// ✅ React SyntheticEvent object
function EventInfo() {
  const handleChange = (e) => {
    // e is a SyntheticEvent wrapper around native event
    console.log("Type:", e.type); // 'change'
    console.log("Target value:", e.target.value); // Current value
    console.log("Native event:", e.nativeEvent); // Access underlying DOM event

    // Common properties:
    console.log("e.target"); // The element that triggered event
    console.log("e.currentTarget"); // The element with event listener
    console.log("e.bubbles"); // Whether event bubbles
    console.log("e.cancelable"); // Whether event is cancelable
  };

  return <input onChange={handleChange} />;
}

// ✅ Different event types
function MultipleEvents() {
  const handleClick = (e) => {
    console.log("Clicked element:", e.target.tagName);
  };

  const handleKeyPress = (e) => {
    console.log("Key pressed:", e.key);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form submitted");
  };

  return (
    <>
      <button onClick={handleClick}>Click me</button>
      <input onKeyPress={handleKeyPress} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
```

### Event Delegation and Bubbling:

```jsx
// ✅ Event delegation (React's default)
function EventDelegation() {
  const handleClick = (e) => {
    console.log("Clicked on:", e.target.textContent);
  };

  return (
    <ul onClick={handleClick}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  );
}

// ✅ Preventing event bubbling
function StopPropagation() {
  const handleParentClick = () => {
    console.log("Parent clicked");
  };

  const handleChildClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to parent
    console.log("Child clicked");
  };

  return (
    <div
      onClick={handleParentClick}
      style={{ padding: "20px", border: "1px solid black" }}
    >
      Parent
      <button onClick={handleChildClick}>Child Button</button>
    </div>
  );
}

// ✅ Preventing default behavior
function PreventDefault() {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form submitted without reload");
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevent navigation
    console.log("Link clicked but not navigated");
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <button type="submit">Submit</button>
      </form>
      <a href="https://example.com" onClick={handleLinkClick}>
        Don't navigate
      </a>
    </>
  );
}

// ✅ Event capturing
function EventCapturing() {
  const handleCaptureClick = (e) => {
    console.log("Capture phase");
    e.stopPropagation(); // Can stop in capture phase
  };

  // onClickCapture uses capture phase instead of bubbling
  return <div onClickCapture={handleCaptureClick}>Click here</div>;
}
```

### Mouse and Touch Events:

```jsx
// ✅ Mouse events
function MouseEvents() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    console.log("Mouse entered");
  };

  const handleMouseLeave = () => {
    console.log("Mouse left");
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "100px", height: "100px", backgroundColor: "lightblue" }}
    >
      Position: {position.x}, {position.y}
    </div>
  );
}

// ✅ Touch events
function TouchEvents() {
  const [touches, setTouches] = useState(0);

  const handleTouchStart = (e) => {
    console.log("Number of touches:", e.touches.length);
    setTouches(e.touches.length);
  };

  const handleTouchEnd = () => {
    console.log("Touch ended");
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ width: "200px", height: "200px", backgroundColor: "lightgreen" }}
    >
      Touches: {touches}
    </div>
  );
}

// ✅ Scroll events
function ScrollEvents() {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      onScroll={handleScroll}
      style={{ width: "100%", height: "200px", overflow: "auto" }}
    >
      <p>Scroll position: {scrollTop}px</p>
      <div style={{ height: "1000px" }}>Content</div>
    </div>
  );
}
```

### Keyboard Events:

```jsx
// ✅ Keyboard event handling
function KeyboardEvents() {
  const [key, setKey] = useState("");
  const [code, setCode] = useState("");

  const handleKeyDown = (e) => {
    setKey(e.key); // Character or special key name
    setCode(e.code); // Physical key location
    console.log("Key:", e.key, "Code:", e.code);
  };

  const handleKeyPress = (e) => {
    // Note: onKeyPress is deprecated, use onKeyDown instead
    console.log("Character code:", e.charCode);
  };

  return (
    <div>
      <input onKeyDown={handleKeyDown} placeholder="Press a key" />
      <p>Last key: {key}</p>
      <p>Last code: {code}</p>
    </div>
  );
}

// ✅ Detecting specific keys
function SpecificKeyDetection() {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter pressed");
    }
    if (e.key === "Escape") {
      console.log("Escape pressed");
    }
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      console.log("Save shortcut");
    }
  };

  return <input onKeyDown={handleKeyDown} placeholder="Try Ctrl+S" />;
}

// ✅ Form events
function FormEvents() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkbox: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
        />
        Agree
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Event Performance Optimization:

```jsx
// ❌ Creating new function every render (performance issue)
function BadPerformance() {
  const handleClick = () => console.log("Clicked");

  return (
    <div>
      {[...Array(1000)].map((_, i) => (
        // New function created for each item!
        <button key={i} onClick={() => handleClick()}>
          Button {i}
        </button>
      ))}
    </div>
  );
}

// ✅ Use event delegation with single handler
function GoodPerformance() {
  const handleClick = (e) => {
    if (e.target.matches("button")) {
      console.log("Button clicked:", e.target.textContent);
    }
  };

  return (
    <div onClick={handleClick}>
      {[...Array(1000)].map((_, i) => (
        <button key={i}>Button {i}</button>
      ))}
    </div>
  );
}

// ✅ Use useCallback for complex handlers
function OptimizedList({ items, onItemClick }) {
  const handleItemClick = useCallback(
    (id) => {
      onItemClick(id);
    },
    [onItemClick]
  );

  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onClick={handleItemClick} />
      ))}
    </ul>
  );
}

function ListItem({ item, onClick }) {
  const handleClick = useCallback(() => {
    onClick(item.id);
  }, [item.id, onClick]);

  return <li onClick={handleClick}>{item.name}</li>;
}
```

### Event Handler Error Handling:

```jsx
// ✅ Error handling in event handlers
function SafeEventHandler() {
  const handleClick = (e) => {
    try {
      // Code that might throw
      console.log(e.target.value);
    } catch (error) {
      console.error("Event handler error:", error);
    }
  };

  return <button onClick={handleClick}>Click me</button>;
}

// ✅ Error handling in async event handlers
function AsyncEventHandler() {
  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/data");
      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      console.error("Async handler error:", error);
    }
  };

  return <button onClick={handleClick}>Load Data</button>;
}
```

### Event Listener Management with useEffect:

```jsx
// ✅ Adding and removing event listeners
function WindowEvents() {
  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized");
    };

    const handleKeyDown = (e) => {
      console.log("Key pressed:", e.key);
    };

    // Add event listeners
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup: Remove listeners on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div>Open browser console</div>;
}

// ✅ Managing event listeners with options
function EventOptions() {
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      console.log("Wheel event");
    };

    // Use { passive: false } to allow preventDefault() in wheel event
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel, { passive: false });
    };
  }, []);

  return <div>Try to scroll</div>;
}
```

### React Event System vs Native DOM:

| Aspect            | React Events                  | Native DOM          |
| ----------------- | ----------------------------- | ------------------- |
| **Naming**        | camelCase (onClick)           | lowercase (onclick) |
| **Binding**       | this binding required (class) | no binding needed   |
| **Event object**  | SyntheticEvent wrapper        | Native Event        |
| **Delegation**    | At root level                 | Manual setup        |
| **Persistence**   | Limited in older React        | Full persistence    |
| **Performance**   | Optimized                     | Variable            |
| **Cross-browser** | Consistent API                | Varies              |

### Summary of React Event System:

```jsx
// ✅ Key concepts:

// 1. Events are camelCased
<button onClick={handleClick}>Click</button>;

// 2. Event object is SyntheticEvent
const handleChange = (e) => {
  console.log(e.type, e.target.value);
};

// 3. Event delegation at root
// Single listener at root, delegates to components

// 4. PreventDefault and stopPropagation
const handleSubmit = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

// 5. Proper binding in class components
this.handleClick = this.handleClick.bind(this);

// 6. Arrow functions for easy binding in class
handleClick = () => {
  /* code */
};

// 7. Function components use hooks
const handleClick = useCallback(() => {
  /* code */
}, []);
```

// 7. Function components use hooks
const handleClick = useCallback(() => {
/_ code _/
}, []);

````

---

13. What are portals in React and when would you use them?

**Answer:**

Portals provide a way to render React components into a different part of the DOM tree, outside of the parent component's hierarchy. They are useful for modals, tooltips, dropdowns, and other components that need to visually "escape" their parent's CSS overflow/z-index constraints.

### Understanding Portals:

```jsx
// ✅ Basic portal concept
// Render component into a different DOM element

import { createPortal } from 'react-dom';

function MyComponent() {
  // Render this element into a different DOM node (outside parent)
  return createPortal(
    <div>I'm rendered in a different part of the DOM</div>,
    document.getElementById('portal-root')
  );
}

// In HTML:
// <div id="root"></div>
// <div id="portal-root"></div>  <!-- Portal renders here -->

// Normal render:    <div id="root"><MyComponent /></div>
// Portal renders:   <div id="portal-root"><div>...</div></div>
````

### Simple Modal with Portal:

```jsx
// ✅ Modal component using portal
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          zIndex: 1001,
        }}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body // Render at body level, not inside parent
  );
}

// Usage:
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>This is rendered in a portal at document.body</p>
      </Modal>

      <p>This content is underneath the modal</p>
    </div>
  );
}
```

### Portal for Tooltip:

```jsx
// ✅ Tooltip using portal to escape parent overflow constraints
function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 10,
        left: rect.left + rect.width / 2 - 50,
      });
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "help", textDecoration: "underline" }}
      >
        {children}
      </span>

      {isVisible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              backgroundColor: "#333",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              zIndex: 2000,
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
}

// Usage:
<Tooltip text="This is a helpful tooltip">Hover over me</Tooltip>;
```

### Portal for Dropdown Menu:

```jsx
// ✅ Dropdown menu that escapes parent constraints
function DropdownMenu({ trigger, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const handleToggle = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5,
        left: rect.left,
      });
    }
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    console.log("Selected:", option);
    setIsOpen(false);
  };

  return (
    <>
      <button ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </button>

      {isOpen &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              zIndex: 2000,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option)}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderBottom:
                    index < options.length - 1 ? "1px solid #eee" : "none",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#f5f5f5")
                }
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                {option}
              </div>
            ))}
          </div>,
          document.body
        )}

      {isOpen &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1999,
            }}
            onClick={() => setIsOpen(false)}
          />,
          document.body
        )}
    </>
  );
}

// Usage:
<DropdownMenu trigger="Menu" options={["Option 1", "Option 2", "Option 3"]} />;
```

### Portal with Multiple Targets:

```jsx
// ✅ Portal rendering to different targets
function MultiTargetPortals() {
  return (
    <div>
      {/* Render into modal container */}
      {createPortal(
        <div style={{ color: "blue" }}>In Modal Portal</div>,
        document.getElementById("modal-root")
      )}

      {/* Render into notification container */}
      {createPortal(
        <div style={{ color: "green" }}>In Notification Portal</div>,
        document.getElementById("notification-root")
      )}

      {/* Render into tooltip container */}
      {createPortal(
        <div style={{ color: "red" }}>In Tooltip Portal</div>,
        document.getElementById("tooltip-root")
      )}
    </div>
  );
}

// HTML structure:
// <div id="root"></div>
// <div id="modal-root"></div>
// <div id="notification-root"></div>
// <div id="tooltip-root"></div>
```

### Portal for Alert/Notification System:

```jsx
// ✅ Toast notification system using portal
const NotificationContext = React.createContext();

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 3000);

    return id;
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}

      {createPortal(
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 3000,
          }}
        >
          {notifications.map((notif) => (
            <div
              key={notif.id}
              style={{
                backgroundColor: notif.type === "error" ? "#f88" : "#8f8",
                color: "white",
                padding: "15px 20px",
                borderRadius: "4px",
                marginBottom: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              {notif.message}
              <button
                onClick={() => removeNotification(notif.id)}
                style={{
                  marginLeft: "10px",
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  );
}

// Custom hook
function useNotification() {
  return useContext(NotificationContext);
}

// Usage:
function MyComponent() {
  const { addNotification } = useNotification();

  return (
    <div>
      <button onClick={() => addNotification("Success!", "success")}>
        Show Success
      </button>
      <button onClick={() => addNotification("Error occurred", "error")}>
        Show Error
      </button>
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <MyComponent />
    </NotificationProvider>
  );
}
```

### Portal and Event Handling:

```jsx
// ✅ Event bubbling through portals
function ParentWithPortal() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((count) => count + 1);
  };

  return (
    <div
      onClick={handleClick}
      style={{ padding: "20px", border: "1px solid black" }}
    >
      <p>Click count: {clickCount}</p>

      {/* Events bubble to parent even though DOM is different! */}
      {createPortal(<button>Click me (portal button)</button>, document.body)}
    </div>
  );
}

// Clicking the portal button still triggers parent's onClick
// Event bubbling works through React tree, not DOM tree
```

### Advanced Portal with Stacking:

```jsx
// ✅ Multiple modals with proper z-index stacking
function ModalManager() {
  const [modals, setModals] = useState([]);

  const openModal = (content) => {
    const id = Date.now();
    setModals((prev) => [...prev, { id, content }]);
    return id;
  };

  const closeModal = (id) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div>
      <button onClick={() => openModal("Modal 1")}>Open Modal 1</button>
      <button onClick={() => openModal("Modal 2")}>Open Modal 2</button>

      {modals.map((modal, index) => (
        <div key={modal.id}>
          {createPortal(
            <>
              {/* Backdrop */}
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1000 + index * 100,
                }}
                onClick={() => closeModal(modal.id)}
              />
              {/* Modal */}
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  zIndex: 1001 + index * 100,
                }}
              >
                <h2>{modal.content}</h2>
                <button onClick={() => closeModal(modal.id)}>Close</button>
              </div>
            </>,
            document.body
          )}
        </div>
      ))}
    </div>
  );
}
```

### Portal vs Regular Rendering:

| Aspect             | Portal                      | Regular                   |
| ------------------ | --------------------------- | ------------------------- |
| **DOM location**   | Different part of tree      | Under parent              |
| **CSS overflow**   | Escapes parent overflow     | Constrained by parent     |
| **z-index**        | Separate stacking context   | Subject to parent z-index |
| **Event bubbling** | Through React tree          | Through DOM tree          |
| **Performance**    | Minimal impact              | Normal                    |
| **Use cases**      | Modals, tooltips, dropdowns | Regular content           |

### When to Use Portals:

```jsx
// ✅ USE PORTALS FOR:

// 1. Modals (escape overflow)
<Modal>{content}</Modal>

// 2. Dropdowns (escape overflow, avoid z-index issues)
<DropdownMenu>{options}</DropdownMenu>

// 3. Tooltips (position fixed, escape overflow)
<Tooltip>{text}</Tooltip>

// 4. Alerts and notifications (always visible)
<NotificationCenter>{notifications}</NotificationCenter>

// 5. Popovers (escape positioning context)
<Popover>{content}</Popover>

// ❌ DON'T USE PORTALS FOR:

// Regular content that should be part of document flow
<div>{content}</div>

// Components that rely on parent styling
<StyledWrapper>{content}</StyledWrapper>

// Content that should be affected by parent overflow
<OverflowContainer>{content}</OverflowContainer>
```

### Portal Best Practices:

```jsx
// ✅ DO: Clean up portals
function ModalWithCleanup({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal">{/* content */}</div>,
    document.body
  );
}

// ✅ DO: Ensure portal target exists
function SafePortal({ children, target }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(!!document.getElementById(target));
  }, [target]);

  if (!isMounted) return null;

  return createPortal(children, document.getElementById(target));
}

// ✅ DO: Handle events properly
const handleBackdropClick = (e) => {
  if (e.target === e.currentTarget) {
    onClose();
  }
};

// ❌ DON'T: Create portal target dynamically
// Portal target should be created in HTML beforehand

// ❌ DON'T: Forget to handle keyboard events
// Add escape key handling for modals
```

### Portal with React 18 Transitions:

```jsx
// ✅ Using portals with Suspense and transitions
function ModalWithTransition({ isOpen, onClose }) {
  const [isPending, startTransition] = useTransition();

  const handleClose = () => {
    startTransition(() => {
      onClose();
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modal Title</h2>
        <p>Content here</p>
        <button onClick={handleClose} disabled={isPending}>
          {isPending ? "Closing..." : "Close"}
        </button>
      </div>
    </div>,
    document.body
  );
}
```

### Summary:

Portals allow React components to:

- ✅ Render into different DOM locations
- ✅ Escape CSS overflow constraints
- ✅ Avoid z-index stacking issues
- ✅ Create modals, tooltips, and dropdowns
- ✅ Maintain React tree for event bubbling
- ✅ Improve component reusability

Use portals strategically for UI elements that need to visually escape their parent components.

- ✅ Create modals, tooltips, and dropdowns
- ✅ Maintain React tree for event bubbling
- ✅ Improve component reusability

Use portals strategically for UI elements that need to visually escape their parent components.

---

14. How does server-side rendering (SSR) work in React?

**Answer:**

Server-Side Rendering (SSR) is the process of rendering React components on the server and sending HTML to the client, rather than having the browser do all the rendering. This improves performance, SEO, and user experience. The most common SSR frameworks are **Next.js**, **Remix**, and **Express + React**.

### Basic SSR Concept:

```jsx
// Traditional Client-Side Rendering (CSR):
// 1. Server sends empty HTML + JavaScript
// 2. Browser downloads and executes JavaScript
// 3. React renders components in browser
// 4. Page becomes interactive

// Server-Side Rendering (SSR):
// 1. Server renders React to HTML string
// 2. Server sends fully rendered HTML to client
// 3. Browser displays HTML immediately (fast first paint)
// 4. JavaScript hydrates the page to make it interactive

// Diagram:
// CSR:  [HTML (empty)] → [JS loads] → [React renders] → [Interactive]
// SSR:  [HTML (full)] → [Display] → [JS hydrates] → [Interactive]
```

### SSR with Express and React:

```jsx
// ✅ Basic SSR server setup
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files (for client-side JavaScript)
app.use(express.static("public"));

// SSR route
app.get("/", (req, res) => {
  // Render React component to HTML string
  const html = renderToString(<App />);

  // Send complete HTML to client
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>React SSR App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Client-side hydration:
// The bundle.js contains React that hydrates the existing HTML
import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(document.getElementById("root"), <App />);
```

### SSR with Next.js:

```jsx
// ✅ Next.js SSR (most popular, recommended)
// pages/index.js

export default function Home({ data }) {
  return (
    <div>
      <h1>Welcome to SSR with Next.js</h1>
      <p>Data from server: {data}</p>
    </div>
  );
}

// getServerSideProps runs on server for every request
export async function getServerSideProps(context) {
  // Fetch data on server
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  return {
    props: {
      data: data
    }
  };
}

// pages/users/[id].js (dynamic routes)
export default function UserPage({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const response = await fetch(`https://api.example.com/users/${params.id}`);
  const user = await response.json();

  return {
    props: { user },
    revalidate: 60 // ISR: revalidate every 60 seconds
  };
}
```

### Static Generation (SSG) vs SSR:

```jsx
// ✅ Static Generation (SSG) - getStaticProps
// Builds HTML at build time, reuses for all requests (fastest)

export default function Blog({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  // Runs at build time only
  const response = await fetch("https://api.example.com/posts");
  const posts = await response.json();

  return {
    props: { posts },
    revalidate: 3600, // Regenerate page every hour (ISR)
  };
}

// ✅ Incremental Static Regeneration (ISR)
// Rebuild static pages on-demand after they're deployed

export async function getStaticProps() {
  return {
    props: { data: "..." },
    revalidate: 60, // Regenerate at most once per 60 seconds
  };
}

// ✅ getStaticPaths for dynamic routes
export async function getStaticPaths() {
  const response = await fetch("https://api.example.com/posts");
  const posts = await response.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // Generate missing pages on-demand
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await response.json();

  return {
    props: { post },
    revalidate: 60,
  };
}
```

### SSR vs CSR vs SSG Comparison:

| Aspect                  | SSR             | CSR            | SSG              |
| ----------------------- | --------------- | -------------- | ---------------- |
| **Rendering**           | Server          | Browser        | Build time       |
| **Time to First Paint** | Fast            | Slow           | Fastest          |
| **Initial HTML**        | Full            | Empty          | Full             |
| **Data Freshness**      | Every request   | Real-time      | Per revalidation |
| **API Calls**           | Server-side     | Client-side    | Build-time       |
| **SEO**                 | ✅ Great        | ⚠️ OK          | ✅ Best          |
| **Interactivity**       | After hydration | Immediate      | After hydration  |
| **Server Load**         | High            | Low            | Low              |
| **Use Cases**           | Dynamic content | Real-time apps | Static content   |

### Hydration in SSR:

```jsx
// ✅ Understanding hydration
// Server renders: <button>Count: 0</button>
// Client JavaScript (bundle.js) executes:
// React reuses existing DOM and attaches event listeners

import { hydrateRoot } from "react-dom/client";
import App from "./App";

// hydrateRoot attaches React to existing HTML
hydrateRoot(document.getElementById("root"), <App />);

// ❌ Mismatch warning example:
// If server renders: <button>Count: 0</button>
// But client state initializes to: count = 5
// React throws hydration mismatch warning

// ✅ Avoid mismatches:
function Counter() {
  const [count, setCount] = useState(0); // Same as server
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark when client is ready
  }, []);

  // Only render dynamic content after mount
  if (!isMounted) {
    return <button>Count: {count}</button>;
  }

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### Data Fetching in SSR:

```jsx
// ✅ Next.js getServerSideProps with error handling
export default function DataPage({ data, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const response = await fetch("https://api.example.com/data", {
      headers: {
        // Pass cookies to API
        Cookie: context.req.headers.cookie || "",
      },
    });

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    return {
      props: { data },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
      revalidate: 5, // Retry sooner on error
    };
  }
}

// ✅ Access query parameters and context
export async function getServerSideProps(context) {
  const { query, params, req, res } = context;

  // Query parameters: /page?id=123
  const id = query.id;

  // Dynamic route params: /posts/[id]
  const postId = params.id;

  // Request and response objects
  const userAgent = req.headers["user-agent"];

  return {
    props: { id, postId, userAgent },
  };
}
```

### Remix SSR Framework:

```jsx
// ✅ Remix SSR example
// routes/index.jsx

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
  // Server-side function - only runs on server
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();

  return json({ data });
}

export default function Index() {
  // Client component
  const { data } = useLoaderData();

  return (
    <div>
      <h1>Remix SSR</h1>
      <p>Data: {data}</p>
    </div>
  );
}

// ✅ Form actions in Remix
export async function action({ request }) {
  if (request.method === 'POST') {
    const formData = await request.formData();
    const name = formData.get('name');

    // Server-side processing
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      body: JSON.stringify({ name })
    });

    return redirect('/success');
  }
}

export default function Form() {
  return (
    <form method="post">
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Performance Benefits of SSR:

```jsx
// ✅ SSR Performance Benefits

// 1. Faster First Contentful Paint (FCP)
// With CSR: Wait for JavaScript to download and execute
// With SSR: HTML is sent immediately with content

// 2. Better SEO
// Search engines see full HTML content on first request
// Meta tags, content visible to crawlers

// 3. Better Performance on Slow Networks
// Full HTML sent at once
// No need to wait for JavaScript bundle

// 4. Server-side computation
// Heavy computations done on server
// Client receives final HTML, not intermediate state

// 5. Access to server-only resources
// Database queries, secrets, secure APIs
// All handled on server, not exposed to client
```

### SSR Challenges:

```jsx
// ❌ Hydration mismatches

// Problem: Timestamp renders differently on server vs client
function Timestamp() {
  const now = new Date().getTime();
  return <div>{now}</div>;
}

// Server renders: <div>1699012345000</div>
// Client renders: <div>1699012345001</div> (different!)
// React throws warning

// ✅ Solution: Check if mounted
function Timestamp() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading...</div>; // Match server
  }

  return <div>{new Date().getTime()}</div>;
}

// ❌ Browser APIs not available on server
const width = window.innerWidth; // Error: window is undefined

// ✅ Solution: Check if browser environment
function ResponsiveComponent() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return <div>Width: {width}</div>;
}

// ❌ Cannot use local storage on server
localStorage.setItem("key", "value"); // Error

// ✅ Solution: Only in useEffect
useEffect(() => {
  const saved = localStorage.getItem("key");
  // ...
}, []);
```

### SSR with Data Dehydration/Rehydration:

```jsx
// ✅ Pass server state to client

// Server-side: Collect data and embed in HTML
export async function getServerSideProps() {
  const data = await fetchData();

  return {
    props: { data },
  };
}

// Client-side: Initial state from props
function App({ data: initialData }) {
  const [data, setData] = useState(initialData);

  // Component uses server data immediately
  return <div>{data}</div>;
}

// ✅ Dehydration pattern (advanced)
// Server prepares Redux store state
const preloadedState = {
  users: [],
  posts: [],
};

// Embedded in HTML:
// <script>window.__INITIAL_STATE__ = {...}</script>

// Client rehydrates store
const store = createStore(rootReducer, window.__INITIAL_STATE__);
```

### SEO with SSR:

```jsx
// ✅ Meta tags for SSR
export default function Article({ article }) {
  return (
    <div>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.imageUrl} />
      </Head>

      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
}

// Server renders full page with meta tags
// Search engines see optimized content
```

### Summary of SSR:

```jsx
// ✅ Benefits:
// - Faster initial page load
// - Better SEO
// - Works with slow networks
// - Server-side computations
// - Access to databases and secrets

// ❌ Challenges:
// - Hydration mismatches
// - Cannot use browser APIs on server
// - Higher server load
// - More complex deployment

// 📊 When to use:
// - Public websites (blogs, docs)
// - E-commerce sites (SEO critical)
// - Content-heavy applications
// - Multi-device support important

// ⚡ When to use CSR instead:
// - Internal dashboards
// - Real-time applications
// - User-specific content
// - Heavy client-side interactions

// 🎯 Best practice:
// - Use Next.js or Remix
// - Combine SSR + SSG + ISR
// - Optimize images and assets
// - Monitor Core Web Vitals
```

---

15. What is the difference between useEffect and useLayoutEffect?

**Answer:**

`useEffect` and `useLayoutEffect` are both React hooks for handling side effects, but they differ in **timing of execution** and **when they block the browser**. Understanding these differences is crucial for preventing visual glitches and performance issues.

### Core Difference: Timing of Execution:

```jsx
// Execution order:
// 1. React renders component
// 2. Browser paints (displays to screen)
// 3. useEffect callback runs (async)

// vs

// 1. React renders component
// 2. useLayoutEffect callback runs (blocking)
// 3. Browser paints (displays to screen)

// Visual timeline:
// useEffect:        [Render] → [Paint] → [Effect]
// useLayoutEffect:  [Render] → [Effect] → [Paint]

function Timeline() {
  console.log("1. Render");

  useLayoutEffect(() => {
    console.log("2. useLayoutEffect runs (blocks paint)");
  }, []);

  useEffect(() => {
    console.log("3. useEffect runs (after paint)");
  }, []);

  return <div>Check console</div>;
}

// Console output:
// 1. Render
// 2. useLayoutEffect runs (blocks paint)
// 3. useEffect runs (after paint)
```

### useEffect vs useLayoutEffect Comparison:

| Aspect               | useEffect           | useLayoutEffect     |
| -------------------- | ------------------- | ------------------- |
| **Timing**           | After paint (async) | Before paint (sync) |
| **Blocks rendering** | No                  | Yes                 |
| **Performance**      | Better              | Slower              |
| **DOM access**       | ✅ Can access       | ✅ Can access       |
| **Use cases**        | Most cases          | DOM measurements    |
| **Cleanup**          | Both support        | Both support        |
| **Server-side**      | OK                  | ❌ Breaks SSR       |

### Basic useEffect (Most Common):

```jsx
// ✅ useEffect (use this in 99% of cases)
function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // This runs after the component paints
    const fetchData = async () => {
      const response = await fetch("/api/data");
      const result = await response.json();
      setData(result); // Causes re-render after paint
    };

    fetchData();
  }, []); // Run once on mount

  return <div>{data ? `Loaded: ${data}` : "Loading..."}</div>;
}

// Sequence:
// 1. Render and show "Loading..."
// 2. Browser paints "Loading..."
// 3. useEffect runs, fetches data
// 4. setData causes re-render
// 5. Browser paints updated content
```

### useLayoutEffect for Measurements:

```jsx
// ✅ useLayoutEffect for DOM measurements
function PositionedElement() {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    // This runs BEFORE paint
    // Access DOM measurements synchronously
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
      });
    }
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Positioned element
    </div>
  );
}

// Why useLayoutEffect here:
// If we used useEffect:
// 1. Render with default position (0, 0) - visual glitch!
// 2. Browser paints element at wrong position
// 3. useEffect runs, measures, updates state
// 4. Re-render with correct position

// With useLayoutEffect:
// 1. Render (not painted yet)
// 2. useLayoutEffect measures and updates position
// 3. Browser paints with CORRECT position - no glitch!
```

### Practical Examples: When to Use Each:

```jsx
// ❌ WRONG: useLayoutEffect for data fetching
function BadExample() {
  const [data, setData] = useState(null);

  useLayoutEffect(() => {
    // This blocks rendering!
    fetch("/api/data")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return <div>{data}</div>;
}

// ✅ RIGHT: useEffect for data fetching
function GoodExample() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Doesn't block rendering
    fetch("/api/data")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return <div>{data}</div>;
}

// ❌ WRONG: useEffect for DOM measurements
function BadMeasurement() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    // Causes visual glitch!
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div ref={ref} style={{ width: "200px", padding: `${width}px` }}>
      Content (width calculated after paint)
    </div>
  );
}

// ✅ RIGHT: useLayoutEffect for measurements
function GoodMeasurement() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    // No visual glitch
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div ref={ref} style={{ width: "200px", padding: `${width}px` }}>
      Content (width calculated before paint)
    </div>
  );
}
```

### useLayoutEffect for Animation Setup:

```jsx
// ✅ useLayoutEffect for animation initialization
function AnimatedBox() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    // Set up initial state for animation before paint
    const element = ref.current;
    element.style.opacity = "0";
    element.style.transform = "translateY(10px)";

    // Schedule animation after layout is ready
    setTimeout(() => {
      element.style.transition = "opacity 0.3s, transform 0.3s";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 0);
  }, []);

  return <div ref={ref}>Animated content</div>;
}

// Why useLayoutEffect:
// Browser paints after setup but before animation starts
// Result: smooth animation from frame 0, no flicker
```

### useLayoutEffect with Cleanup:

```jsx
// ✅ useLayoutEffect with cleanup
function ResizeListener() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Measure immediately before paint
    updateDimensions();

    // Listen for resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div>
      {dimensions.width} x {dimensions.height}
    </div>
  );
}
```

### Performance Comparison:

```jsx
// ❌ BAD: useLayoutEffect blocks rendering
function SlowComponent() {
  useLayoutEffect(() => {
    // This blocks the browser
    const sum = Array(1000000)
      .fill(0)
      .reduce((a, b) => a + b, 0);
    console.log(sum);
  }, []);

  return <div>Content</div>;
}

// ✅ GOOD: useEffect doesn't block
function FastComponent() {
  useEffect(() => {
    // This doesn't block the browser
    const sum = Array(1000000)
      .fill(0)
      .reduce((a, b) => a + b, 0);
    console.log(sum);
  }, []);

  return <div>Content</div>;
}

// Performance impact:
// useLayoutEffect: Renders appear slower
// useEffect: Renders appear responsive, calculation happens later
```

### useLayoutEffect and SSR:

```jsx
// ❌ PROBLEM: useLayoutEffect breaks SSR
function BadSSRComponent() {
  useLayoutEffect(() => {
    // This throws error on server!
    console.log(window.innerWidth);
  }, []);

  return <div>Content</div>;
}

// Error on server:
// ReferenceError: window is not defined

// ✅ SOLUTION: Use useEffect instead
function GoodSSRComponent() {
  useEffect(() => {
    // This runs only in browser
    console.log(window.innerWidth);
  }, []);

  return <div>Content</div>;
}

// ✅ SOLUTION: Guard useLayoutEffect
function SafeSSRComponent() {
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.innerWidth);
    }
  }, []);

  return <div>Content</div>;
}
```

### Visual Glitch Demonstration:

```jsx
// ❌ Visual glitch with wrong hook
function GlitchyComponent() {
  const [color, setColor] = useState("red");
  const ref = useRef(null);

  // WRONG: Using useEffect for styling
  useEffect(() => {
    // Happens AFTER paint
    if (ref.current) {
      ref.current.style.backgroundColor = "blue";
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: color, width: "100px", height: "100px" }}
    >
      {/* Visual glitch: Renders RED first, then turns BLUE */}
    </div>
  );
}

// ✅ No glitch with correct hook
function SmoothComponent() {
  const [color, setColor] = useState("red");
  const ref = useRef(null);

  // RIGHT: Using useLayoutEffect for styling
  useLayoutEffect(() => {
    // Happens BEFORE paint
    if (ref.current) {
      ref.current.style.backgroundColor = "blue";
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: color, width: "100px", height: "100px" }}
    >
      {/* No glitch: Renders BLUE immediately */}
    </div>
  );
}
```

### Decision Tree:

```jsx
// When to use which hook:

// useEffect (default - use this 99% of the time):
// ✅ Data fetching
// ✅ Subscriptions
// ✅ Logging
// ✅ Timers and intervals
// ✅ Event listeners (window, document)
// ✅ Analytics

// useLayoutEffect (special cases):
// ✅ DOM measurements (offsetWidth, getBoundingClientRect)
// ✅ Element positioning based on measurements
// ✅ Animation setup/initialization
// ✅ Synchronous DOM manipulations
// ✅ Preventing visual glitches from measurements

// NEVER use useLayoutEffect for:
// ❌ API calls
// ❌ Heavy computations
// ❌ SSR applications
// ❌ Performance-sensitive code
```

### Common Patterns:

```jsx
// ✅ Pattern 1: Measure then position
function MeasureAndPosition() {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref.current) {
      setOffsetLeft(ref.current.offsetLeft);
    }
  }, []);

  return (
    <div ref={ref} style={{ marginLeft: `${offsetLeft}px` }}>
      Content
    </div>
  );
}

// ✅ Pattern 2: Data fetch then render
function FetchThenRender() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/data")
      .then((r) => r.json())
      .then(setData);
  }, []);

  return <div>{data?.content}</div>;
}

// ✅ Pattern 3: Setup animation
function SetupAnimation() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    el.style.opacity = "0";

    // Force layout
    el.offsetHeight;

    el.style.transition = "opacity 0.3s";
    el.style.opacity = "1";
  }, []);

  return <div ref={ref}>Animated</div>;
}

// ✅ Pattern 4: Cleanup
function WithCleanup() {
  useLayoutEffect(() => {
    const handler = () => console.log("resize");
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return <div>Component</div>;
}
```

### Summary Table:

| Feature           | useEffect               | useLayoutEffect           |
| ----------------- | ----------------------- | ------------------------- |
| **Run timing**    | After browser paint     | Before browser paint      |
| **Blocking**      | Non-blocking            | Blocking                  |
| **DOM access**    | Yes                     | Yes                       |
| **State updates** | Yes                     | Yes                       |
| **Cleanup**       | Yes                     | Yes                       |
| **SSR safe**      | ✅ Yes                  | ❌ No                     |
| **Performance**   | Better                  | Worse                     |
| **Common use**    | 99% of cases            | 1% of cases               |
| **Good for**      | Data, events, analytics | Measurements, positioning |
| **Bad for**       | Measurements            | Data fetching, SSR        |

### Final Recommendations:

```jsx
// 🎯 ALWAYS start with useEffect
// Only switch to useLayoutEffect if you see:
// 1. Visual glitches (flashing, repositioning)
// 2. DOM measurements needed before paint
// 3. Animation setup issues

// 🚨 NEVER use useLayoutEffect for:
// - Data fetching (use useEffect)
// - Heavy computations (use useEffect)
// - SSR applications (use useEffect)

// 💡 Remember:
// useEffect = Async (after paint) = Good for most things
// useLayoutEffect = Sync (before paint) = Only when needed

// Profile with React DevTools:
// If useLayoutEffect > 1ms, consider if useEffect works
// Most measurement code can be optimized to useEffect
```

---

## 🎯 Real-Life Scenario-Based Questions

### Scenario 1: Context API Performance Issue in E-Commerce App

**Scenario:**
You're building an e-commerce app with Context API. You created an AppContext that holds:

- User authentication state (rarely changes)
- Shopping cart (updates on every add/remove)
- Product filters (updates frequently during search)
- Theme preference (rarely changes)

You notice that when a user adds an item to the cart, ALL components re-render, causing performance issues. The product list component re-renders unnecessarily, even though it's not displaying cart data.

**Problem:**

- All consumers re-render on any state change
- Shopping cart updates cause entire app re-render
- Product filtering causes performance lag

**Interview Question:**
"How would you restructure this Context to avoid unnecessary re-renders?"

**Solution Approach:**

```jsx
// ❌ BEFORE: Single context with mixed data
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({});
  const [theme, setTheme] = useState("light");

  // All consumers re-render when ANY state changes
  const value = {
    user,
    setUser,
    cart,
    setCart,
    filters,
    setFilters,
    theme,
    setTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ✅ AFTER: Separate contexts by update frequency
const UserContext = createContext();
const CartContext = createContext();
const FilterContext = createContext();
const ThemeContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({});
  const [theme, setTheme] = useState("light");

  const userValue = useMemo(() => ({ user, setUser }), [user]);
  const cartValue = useMemo(() => ({ cart, setCart }), [cart]);
  const filterValue = useMemo(() => ({ filters, setFilters }), [filters]);
  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <UserContext.Provider value={userValue}>
      <CartContext.Provider value={cartValue}>
        <FilterContext.Provider value={filterValue}>
          <ThemeContext.Provider value={themeValue}>
            {children}
          </ThemeContext.Provider>
        </FilterContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

// ProductList only re-renders when filters change, not when cart updates
function ProductList() {
  const { filters } = useContext(FilterContext);
  // Only re-renders when filters change ✅
  return <div>Products...</div>;
}
```

**Key Takeaway:** Split contexts by update frequency to minimize unnecessary re-renders.

---

### Scenario 2: Authentication Context in Multi-Tab Application

**Scenario:**
Your app allows users to log in. User opens your app in two browser tabs. In Tab 1, the user logs out. You expect Tab 2 to also show the logged-out state, but it doesn't sync. Tab 2 still shows the user as logged in.

**Problem:**

- Context is per app instance, not synced across browser tabs
- localStorage changes aren't automatically reflected in context
- User sees inconsistent state across tabs

**Interview Question:**
"How would you keep authentication state in sync across browser tabs?"

**Solution Approach:**

```jsx
// ✅ SOLUTION: Use storage events to sync across tabs
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
          setIsAuthenticated(true);
        } else {
          // User logged out in another tab
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = async (credentials) => {
    const userData = await api.login(credentials);
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    // This triggers storage event in other tabs automatically
  };

  const value = { user, isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
```

**Key Takeaway:** Use storage events (storage API) to sync context across browser tabs.

---

### Scenario 3: Form Context with Nested Components

**Scenario:**
You have a multi-step form with nested components:

- FormContainer (holds form state)
  - PersonalInfoStep (updates name, email)
  - AddressStep (updates address)
  - ReviewStep (displays all data)

You want to use Context to avoid prop drilling 5 levels deep. But now when user types in PersonalInfoStep, AddressStep also re-renders (even though it's not visible yet).

**Problem:**

- Form context value changes frequently (on every keystroke)
- All form steps re-render on any field change
- Performance degrades with many form fields

**Interview Question:**
"How would you optimize this form context to prevent unnecessary re-renders of non-visible steps?"

**Solution Approach:**

```jsx
// ✅ SOLUTION 1: Separate data and dispatch contexts
const FormDataContext = createContext();
const FormDispatchContext = createContext();

function FormProvider({ children }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
  });

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Data context - consumers of this re-render on data change
  const dataValue = useMemo(() => ({ ...formData }), [formData]);

  // Dispatch context - stable function reference
  const dispatchValue = useMemo(() => ({ updateField }), [updateField]);

  return (
    <FormDataContext.Provider value={dataValue}>
      <FormDispatchContext.Provider value={dispatchValue}>
        {children}
      </FormDispatchContext.Provider>
    </FormDataContext.Provider>
  );
}

// ReviewStep only subscribes to data
function ReviewStep() {
  const data = useContext(FormDataContext); // Re-renders on data change
  return <div>Review: {data.name}</div>;
}

// PersonalInfoStep only needs dispatch
function PersonalInfoStep() {
  const { updateField } = useContext(FormDispatchContext); // Never re-renders from data updates
  return (
    <input
      onChange={(e) => updateField("name", e.target.value)}
      placeholder="Name"
    />
  );
}

// ✅ SOLUTION 2: Use reducer pattern for batch updates
const FormContext = createContext();

function FormProvider({ children }) {
  const initialState = { name: "", email: "", address: "", city: "" };

  const formReducer = useCallback((state, action) => {
    switch (action.type) {
      case "UPDATE_FIELD":
        return { ...state, [action.field]: action.value };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }, []);

  const [formData, dispatch] = useReducer(formReducer, initialState);

  // Memoize to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      formData,
      updateField: (field, value) => {
        dispatch({ type: "UPDATE_FIELD", field, value });
      },
      reset: () => dispatch({ type: "RESET" }),
    }),
    [formData]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
```

**Key Takeaway:** Use separate dispatch context for stable function references and reduce data context re-renders.

---

### Scenario 4: Theme Context with LocalStorage Persistence

**Scenario:**
You implement a theme switcher using Context. User changes theme to dark mode. The page refreshes and theme reverts to light mode because context is reset on page reload.

**Problem:**

- Context state is lost on page refresh
- User preference not persisted
- Poor user experience

**Interview Question:**
"How would you persist theme preference and restore it after page refresh?"

**Solution Approach:**

```jsx
// ✅ SOLUTION: Persist theme to localStorage and restore on mount
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // Initialize from localStorage
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    // Also update document root for global CSS
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// CSS to respond to theme attribute
// :root[data-theme="dark"] { --bg-color: #333; }
// :root[data-theme="light"] { --bg-color: #fff; }
```

**Key Takeaway:** Combine useState with useEffect and localStorage for persistent theme management.

---

### Scenario 5: Accessing Context Outside React Components

**Scenario:**
You have a logging utility that needs to access the current user from AuthContext to log which user performed an action. But logging utility is a plain JavaScript file, not a React component, so you can't use useContext.

**Problem:**

- Can't use hooks outside React components
- useContext() only works in components
- Need context value in utility functions

**Interview Question:**
"How would you access context values from non-component code?"

**Solution Approach:**

```jsx
// ✅ SOLUTION 1: Create a ref-based context subscriber
const AuthContext = createContext();
let currentAuthContext = null;

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Update ref whenever user changes
    currentAuthContext = { user, setUser };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Utility file - can access current context
export function logAction(action) {
  if (currentAuthContext?.user) {
    console.log(`${currentAuthContext.user.name} performed: ${action}`);
  } else {
    console.log(`Anonymous user performed: ${action}`);
  }
}

// ✅ SOLUTION 2: Use context subscription pattern
class ContextSubscriber {
  static subscribers = {};

  static subscribe(contextName, callback) {
    if (!this.subscribers[contextName]) {
      this.subscribers[contextName] = [];
    }
    this.subscribers[contextName].push(callback);

    return () => {
      this.subscribers[contextName] = this.subscribers[contextName].filter(
        (cb) => cb !== callback
      );
    };
  }

  static notify(contextName, value) {
    if (this.subscribers[contextName]) {
      this.subscribers[contextName].forEach((cb) => cb(value));
    }
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Notify all subscribers when user changes
    ContextSubscriber.notify("auth", { user, setUser });
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Utility can subscribe
export function setupLogging() {
  ContextSubscriber.subscribe("auth", ({ user }) => {
    window.currentUser = user;
  });
}
```

**Key Takeaway:** For non-component code, use a ref or subscriber pattern to access context values.

---

### Scenario 6: Dynamic Context Creation

**Scenario:**
Your app supports multiple workspaces. Each workspace has its own context for workspace settings, team members, etc. You can't create context ahead of time because workspaces are dynamic.

**Problem:**

- Can't know all contexts in advance
- Need to create contexts dynamically per workspace
- How to efficiently manage multiple contexts?

**Interview Question:**
"How would you handle dynamic context creation for multiple workspaces?"

**Solution Approach:**

```jsx
// ✅ SOLUTION: Context factory pattern
const workspaceContexts = {}; // Cache for created contexts

function getWorkspaceContext(workspaceId) {
  if (!workspaceContexts[workspaceId]) {
    workspaceContexts[workspaceId] = createContext();
  }
  return workspaceContexts[workspaceId];
}

function WorkspaceProvider({ workspaceId, children }) {
  const [settings, setSettings] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch workspace data
    fetchWorkspace(workspaceId).then((data) => {
      setSettings(data.settings);
      setMembers(data.members);
    });
  }, [workspaceId]);

  const WorkspaceContext = getWorkspaceContext(workspaceId);
  const value = useMemo(() => ({ settings, members }), [settings, members]);

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

function useWorkspace(workspaceId) {
  const WorkspaceContext = getWorkspaceContext(workspaceId);
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      `Workspace ${workspaceId} not found. Ensure it's wrapped in WorkspaceProvider.`
    );
  }

  return context;
}

// Usage
function WorkspaceSettings() {
  const workspaceId = useParams().workspaceId;
  const { settings } = useWorkspace(workspaceId);

  return <div>Settings: {settings.name}</div>;
}
```

**Key Takeaway:** Use a factory pattern with caching to manage multiple dynamic contexts.

---

# TLDR Summary

## Core Concepts

- **JSX**: JavaScript XML syntax that transpiles to React.createElement() calls, allowing HTML-like syntax in JavaScript with embedded expressions using {}
- **Virtual DOM**: In-memory representation of real DOM that enables efficient reconciliation algorithm for optimal updates
- **Components**: Reusable UI building blocks (function components preferred) that encapsulate logic and rendering
- **Props**: Read-only data passed from parent to child components for communication
- **State**: Mutable data that triggers re-renders when changed (managed with useState hook)

## Component Patterns

- **Controlled Components**: Form inputs controlled by React state with value and onChange props
- **Uncontrolled Components**: Form inputs managed by DOM with refs for direct access
- **Higher-Order Components (HOCs)**: Functions that take a component and return enhanced component
- **Render Props**: Technique for sharing code using props whose value is a function
- **Compound Components**: Parent-child components that work together (like React.cloneElement patterns)

## React Hooks (Essential)

- **useState**: Manages local component state with state value and setter function
- **useEffect**: Handles side effects, lifecycle events, and cleanup with dependency arrays
- **useContext**: Consumes context values without Context.Consumer wrapper
- **useReducer**: Manages complex state logic with reducer pattern (action dispatching)
- **useMemo**: Memoizes expensive computations to prevent unnecessary recalculations
- **useCallback**: Memoizes functions to prevent unnecessary re-renders of child components
- **useRef**: Creates mutable refs for DOM access or storing values across renders
- **Custom Hooks**: Reusable stateful logic extracted into functions starting with "use"

## Performance Optimization

- **React.memo**: Prevents re-renders when props haven't changed (with optional custom comparison)
- **useMemo**: Optimizes expensive calculations and object/array creations
- **useCallback**: Prevents function recreations that cause child re-renders
- **Code Splitting**: Dynamic imports with React.lazy() and Suspense for bundle optimization
- **Virtualization**: Render only visible items in large lists for memory efficiency

## Advanced Concepts

- **Error Boundaries**: Class components that catch JavaScript errors in component tree
- **Portals**: Render children into different DOM node (modals, tooltips, overlays)
- **Context API**: Share data across component tree without prop drilling
- **Suspense**: Handle async operations with loading states (data fetching, code splitting)
- **Concurrent Features (React 18)**: useTransition and useDeferredValue for non-blocking updates

## State Management

- **Local State**: Component-level state with useState and useReducer
- **Context**: App-level state for theme, auth, language without external libraries
- **Redux**: Predictable state container with actions, reducers, and single store
- **Zustand/Jotai**: Lightweight alternatives to Redux for global state management

## Event Handling

- **SyntheticEvent**: Cross-browser wrapper around native events with consistent API
- **Event Delegation**: React uses single event listener on document root for performance
- **Prevent Default**: Use e.preventDefault() and e.stopPropagation() for control

## Lifecycle & Effects

- **Mount**: Component initialization (useEffect with empty dependency array)
- **Update**: Re-renders triggered by state/props changes (useEffect with dependencies)
- **Unmount**: Cleanup phase (useEffect return function for cleanup)
- **Dependency Arrays**: Control when effects run ([deps] vs [] vs no array)

## Testing Strategies

- **Unit Testing**: Test individual components with React Testing Library and Jest
- **Integration Testing**: Test component interactions and data flow
- **E2E Testing**: Full user workflows with Cypress or Playwright
- **Mock Service Worker**: API mocking for reliable testing environments

## Common Patterns

- **Container/Presentational**: Separate data logic from UI rendering
- **Render Props**: Share logic through function props
- **Compound Components**: Multiple components working together as single unit
- **Data Fetching**: Async operations with loading, error, and success states
- **Form Handling**: Controlled inputs with validation and submission logic

## Best Practices

- Use functional components and hooks over class components
- Keep components small and single-purpose
- Extract custom hooks for reusable stateful logic
- Memoize expensive operations and functions appropriately
- Use TypeScript for better developer experience and fewer bugs
- Implement proper error boundaries for graceful error handling
- Test behavior, not implementation details
- Optimize bundle size with code splitting and tree shaking

---

**📚 This comprehensive React.js guide covers fundamental to advanced concepts with practical examples and interview-focused explanations. Practice the code examples and understand the patterns to excel in React interviews!**
