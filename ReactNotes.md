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
9. [TLDR Summary](#tldr-summary)

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

2. What are hooks in React? Name at least three and describe their use.

3. How does React's reconciliation algorithm work?

4. Describe the purpose of keys in lists and why they are important.

5. What is context in React? Give an example use case.

6. Compare Redux and Context API for state management.

7. How do you optimize performance in large React applications?

8. Describe the controlled vs uncontrolled components pattern.

9. What are Higher Order Components? Provide a practical example.

10. How do you handle asynchronous data fetching in React components?

11. Explain the use of error boundaries in React and when to use them.

12. Describe React's event handling system.

13. What are portals in React and when would you use them?

14. How does server-side rendering (SSR) work in React?

15. What is the difference between useEffect and useLayoutEffect?

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
