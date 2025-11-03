# 🎨 HTML & CSS Interview Preparation: Complete Cheat Sheet

**Last Updated:** November 3, 2025  
**Difficulty Level:** Beginner to Advanced  
**Estimated Prep Time:** 25-35 hours

---

## 📋 Table of Contents

1. [Part 1: HTML Fundamentals](#part-1-html-fundamentals)
2. [Part 2: CSS Fundamentals](#part-2-css-fundamentals)
3. [Part 3: Advanced CSS](#part-3-advanced-css)
4. [Part 4: Responsive Design & Modern Layouts](#part-4-responsive-design--modern-layouts)
5. [Part 5: 150+ MCQs](#part-5-150-mcqs)
6. [Part 6: 50+ Subjective Q&A](#part-6-50-subjective-qa)
7. [References & Citations](#references--citations)

---

# Part 1: HTML Fundamentals

## 1. HTML Document Structure & Semantic HTML

### Document Structure

**Explanation:**
HTML5 introduced semantic elements that describe their meaning both to the browser and developer. Semantic HTML improves accessibility, SEO, and code maintainability.

**Code Examples:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- META TAGS -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Complete guide to HTML & CSS" />
    <meta name="keywords" content="HTML, CSS, Web Development" />
    <meta name="author" content="Your Name" />

    <!-- OPEN GRAPH (Social Media) -->
    <meta property="og:title" content="HTML & CSS Guide" />
    <meta property="og:description" content="Master HTML & CSS" />
    <meta property="og:image" content="https://example.com/image.jpg" />
    <meta property="og:url" content="https://example.com" />

    <!-- TWITTER CARD -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="HTML & CSS Guide" />

    <!-- FAVICON -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <title>HTML & CSS Interview Notes</title>

    <!-- EXTERNAL RESOURCES -->
    <link rel="stylesheet" href="styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <script defer src="script.js"></script>
  </head>
  <body>
    <!-- SEMANTIC STRUCTURE -->
    <header>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article>
        <header>
          <h1>Article Title</h1>
          <time datetime="2025-11-03">November 3, 2025</time>
        </header>

        <section>
          <h2>Section Title</h2>
          <p>Content here...</p>
        </section>

        <aside>
          <h3>Related Information</h3>
          <p>Sidebar content...</p>
        </aside>
      </article>
    </main>

    <footer>
      <p>&copy; 2025 Your Company</p>
    </footer>
  </body>
</html>
```

**Semantic Elements vs Non-Semantic:**

| Semantic    | Non-Semantic | Purpose                     |
| ----------- | ------------ | --------------------------- |
| `<header>`  | `<div>`      | Top section of page/section |
| `<nav>`     | `<div>`      | Navigation links            |
| `<main>`    | `<div>`      | Main content                |
| `<article>` | `<div>`      | Self-contained content      |
| `<section>` | `<div>`      | Thematic grouping           |
| `<aside>`   | `<div>`      | Sidebar/tangential content  |
| `<footer>`  | `<div>`      | Footer information          |
| `<figure>`  | `<div>`      | Self-contained media        |

---

### Forms - Complete Guide

**Explanation:**
Forms are the primary way users interact with web applications. Understanding form elements, validation, and accessibility is crucial.

**Code Examples:**

```html
<!-- COMPREHENSIVE FORM EXAMPLE -->
<form action="/submit" method="POST" enctype="multipart/form-data" novalidate>
  <!-- TEXT INPUTS -->
  <fieldset>
    <legend>Personal Information</legend>

    <!-- Basic text input -->
    <label for="username">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      required
      minlength="3"
      maxlength="20"
      pattern="[A-Za-z0-9]+"
      placeholder="Enter username"
      autocomplete="username"
      aria-describedby="username-help"
    />
    <small id="username-help">3-20 alphanumeric characters</small>

    <!-- Email -->
    <label for="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="user@example.com"
      autocomplete="email"
    />

    <!-- Password -->
    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
      title="Must contain at least one number, one uppercase and lowercase letter, and at least 8+ characters"
    />

    <!-- Number -->
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="18" max="100" step="1" />

    <!-- Date -->
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob" min="1900-01-01" max="2025-12-31" />

    <!-- Tel -->
    <label for="phone">Phone:</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
      placeholder="123-456-7890"
    />

    <!-- URL -->
    <label for="website">Website:</label>
    <input
      type="url"
      id="website"
      name="website"
      placeholder="https://example.com"
    />

    <!-- Color -->
    <label for="color">Favorite Color:</label>
    <input type="color" id="color" name="color" value="#ff0000" />

    <!-- Range -->
    <label for="volume">Volume:</label>
    <input
      type="range"
      id="volume"
      name="volume"
      min="0"
      max="100"
      value="50"
    />
    <output for="volume">50</output>
  </fieldset>

  <!-- TEXTAREA -->
  <fieldset>
    <legend>Message</legend>
    <label for="message">Your Message:</label>
    <textarea
      id="message"
      name="message"
      rows="5"
      cols="50"
      maxlength="500"
      placeholder="Enter your message..."
      required
    ></textarea>
  </fieldset>

  <!-- SELECT DROPDOWN -->
  <fieldset>
    <legend>Preferences</legend>

    <label for="country">Country:</label>
    <select id="country" name="country" required>
      <option value="">-- Select Country --</option>
      <optgroup label="North America">
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </optgroup>
      <optgroup label="Europe">
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
      </optgroup>
    </select>

    <!-- Multiple select -->
    <label for="skills">Skills (Hold Ctrl for multiple):</label>
    <select id="skills" name="skills" multiple size="4">
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="js">JavaScript</option>
      <option value="react">React</option>
    </select>
  </fieldset>

  <!-- RADIO BUTTONS -->
  <fieldset>
    <legend>Gender</legend>
    <label>
      <input type="radio" name="gender" value="male" required />
      Male
    </label>
    <label>
      <input type="radio" name="gender" value="female" />
      Female
    </label>
    <label>
      <input type="radio" name="gender" value="other" />
      Other
    </label>
  </fieldset>

  <!-- CHECKBOXES -->
  <fieldset>
    <legend>Interests</legend>
    <label>
      <input type="checkbox" name="interests" value="coding" />
      Coding
    </label>
    <label>
      <input type="checkbox" name="interests" value="design" />
      Design
    </label>
    <label>
      <input type="checkbox" name="interests" value="marketing" />
      Marketing
    </label>
  </fieldset>

  <!-- FILE UPLOAD -->
  <fieldset>
    <legend>Upload Files</legend>
    <label for="avatar">Profile Picture:</label>
    <input
      type="file"
      id="avatar"
      name="avatar"
      accept="image/png, image/jpeg"
      required
    />

    <!-- Multiple files -->
    <label for="documents">Documents:</label>
    <input
      type="file"
      id="documents"
      name="documents"
      multiple
      accept=".pdf,.doc,.docx"
    />
  </fieldset>

  <!-- DATALIST (Autocomplete) -->
  <label for="browser">Choose Browser:</label>
  <input list="browsers" id="browser" name="browser" />
  <datalist id="browsers">
    <option value="Chrome"></option>
    <option value="Firefox"></option>
    <option value="Safari"></option>
    <option value="Edge"></option>
  </datalist>

  <!-- HIDDEN INPUT -->
  <input type="hidden" name="user_id" value="12345" />

  <!-- SUBMIT BUTTONS -->
  <button type="submit">Submit Form</button>
  <button type="reset">Reset Form</button>
  <button type="button" onclick="handleClick()">Custom Action</button>

  <!-- INPUT SUBMIT (Alternative) -->
  <input type="submit" value="Submit Alternative" />
</form>
```

**Form Validation Attributes:**

| Attribute   | Description                 | Example               |
| ----------- | --------------------------- | --------------------- |
| `required`  | Field must be filled        | `<input required>`    |
| `minlength` | Minimum character length    | `minlength="3"`       |
| `maxlength` | Maximum character length    | `maxlength="20"`      |
| `min`       | Minimum value (number/date) | `min="18"`            |
| `max`       | Maximum value               | `max="100"`           |
| `pattern`   | Regular expression          | `pattern="[A-Za-z]+"` |
| `step`      | Number increment            | `step="0.5"`          |

**MCQ:**

```
Q: Which input type is best for collecting email addresses with built-in validation?
(A) <input type="text">
(B) <input type="email">
(C) <input type="url">
(D) <input type="tel">

Answer: B - type="email" provides built-in email validation
```

**Q&A:**
Q: How do you create a custom form validation message?

```html
<input type="text" id="username" required />
<script>
  const input = document.getElementById("username");
  input.addEventListener("invalid", (e) => {
    if (input.validity.valueMissing) {
      input.setCustomValidity("Please enter your username!");
    }
  });

  input.addEventListener("input", () => {
    input.setCustomValidity(""); // Reset custom message
  });
</script>
```

---

## 2. HTML5 Features

### Media Elements

**Code Examples:**

```html
<!-- AUDIO -->
<audio controls preload="metadata" loop>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  Your browser does not support the audio element.
</audio>

<!-- VIDEO -->
<video
  width="640"
  height="360"
  controls
  poster="thumbnail.jpg"
  preload="none"
  autoplay
  muted
  loop
  playsinline
>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <track
    kind="subtitles"
    src="subtitles_en.vtt"
    srclang="en"
    label="English"
    default
  />
  <track
    kind="captions"
    src="captions_en.vtt"
    srclang="en"
    label="English Captions"
  />
  Your browser does not support the video tag.
</video>

<!-- PICTURE ELEMENT (Responsive Images) -->
<picture>
  <source media="(min-width: 1200px)" srcset="image-large.jpg" />
  <source media="(min-width: 768px)" srcset="image-medium.jpg" />
  <source media="(min-width: 320px)" srcset="image-small.jpg" />
  <img
    src="image-default.jpg"
    alt="Responsive image"
    loading="lazy"
    decoding="async"
  />
</picture>

<!-- FIGURE & FIGCAPTION -->
<figure>
  <img src="chart.png" alt="Sales chart" />
  <figcaption>Figure 1: Sales data for Q4 2025</figcaption>
</figure>

<!-- IFRAME -->
<iframe
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  width="560"
  height="315"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy"
  title="YouTube video player"
></iframe>

<!-- CANVAS -->
<canvas id="myCanvas" width="400" height="300">
  Your browser does not support canvas.
</canvas>
<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 150, 75);
</script>

<!-- SVG -->
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="blue" />
  <text x="50" y="55" font-size="20" text-anchor="middle" fill="white">
    SVG
  </text>
</svg>
```

**Media Attributes:**

| Attribute     | Description         | Values             |
| ------------- | ------------------- | ------------------ |
| `autoplay`    | Start automatically | boolean            |
| `controls`    | Show controls       | boolean            |
| `loop`        | Repeat playback     | boolean            |
| `muted`       | Start muted         | boolean            |
| `preload`     | Load strategy       | none/metadata/auto |
| `poster`      | Video thumbnail     | URL                |
| `playsinline` | iOS inline play     | boolean            |

---

### Data Attributes & Storage

**Code Examples:**

```html
<!-- DATA ATTRIBUTES -->
<div
  id="user-card"
  data-user-id="12345"
  data-user-name="John Doe"
  data-user-role="admin"
  data-created-at="2025-11-03"
  data-preferences='{"theme":"dark","lang":"en"}'
>
  User Information
</div>

<script>
  // Accessing data attributes
  const card = document.getElementById("user-card");

  // Method 1: getAttribute
  console.log(card.getAttribute("data-user-id")); // "12345"

  // Method 2: dataset (camelCase)
  console.log(card.dataset.userId); // "12345"
  console.log(card.dataset.userName); // "John Doe"

  // Parsing JSON from data attribute
  const prefs = JSON.parse(card.dataset.preferences);
  console.log(prefs.theme); // "dark"

  // Setting data attributes
  card.dataset.status = "active";
  card.dataset.lastLogin = new Date().toISOString();
</script>

<!-- LOCAL STORAGE -->
<script>
  // Store data
  localStorage.setItem("username", "johndoe");
  localStorage.setItem(
    "settings",
    JSON.stringify({
      theme: "dark",
      notifications: true,
    })
  );

  // Retrieve data
  const username = localStorage.getItem("username");
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Remove data
  localStorage.removeItem("username");

  // Clear all
  localStorage.clear();

  // Check storage
  console.log(localStorage.length); // Number of items
  console.log(localStorage.key(0)); // Key at index

  // SESSION STORAGE (Cleared on tab close)
  sessionStorage.setItem("temp", "temporary data");
  sessionStorage.getItem("temp");
</script>
```

---

# Part 2: CSS Fundamentals

## 3. CSS Selectors - Complete Guide

### Basic to Advanced Selectors

**Explanation:**
CSS selectors determine which HTML elements are styled. Mastering selectors is essential for efficient and maintainable CSS.

**Code Examples:**

```css
/* 1. UNIVERSAL SELECTOR */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 2. ELEMENT SELECTOR */
p {
  color: #333;
  line-height: 1.6;
}

h1,
h2,
h3 {
  font-family: Arial, sans-serif;
}

/* 3. CLASS SELECTOR */
.button {
  padding: 10px 20px;
  background-color: blue;
}

.button.primary {
  background-color: green;
}

/* 4. ID SELECTOR */
#header {
  background-color: #f4f4f4;
}

/* 5. DESCENDANT SELECTOR (Space) */
.container p {
  font-size: 16px;
}

/* 6. CHILD SELECTOR (>) */
.menu > li {
  display: inline-block;
}

/* 7. ADJACENT SIBLING SELECTOR (+) */
h1 + p {
  font-weight: bold;
}

/* 8. GENERAL SIBLING SELECTOR (~) */
h1 ~ p {
  color: gray;
}

/* 9. ATTRIBUTE SELECTORS */
/* Has attribute */
input[required] {
  border: 2px solid red;
}

/* Exact value */
input[type="email"] {
  background-color: #f0f0f0;
}

/* Contains value */
a[href*="example"] {
  color: orange;
}

/* Starts with */
a[href^="https"] {
  padding-left: 20px;
}

/* Ends with */
a[href$=".pdf"] {
  color: red;
}

/* Contains word */
div[class~="active"] {
  font-weight: bold;
}

/* Starts with word (hyphenated) */
div[lang|="en"] {
  direction: ltr;
}

/* Case insensitive */
input[type="text" i] {
  text-transform: uppercase;
}

/* 10. PSEUDO-CLASSES */
/* Link states */
a:link {
  color: blue;
}
a:visited {
  color: purple;
}
a:hover {
  color: red;
}
a:active {
  color: green;
}

/* Form states */
input:focus {
  outline: 2px solid blue;
}

input:disabled {
  opacity: 0.5;
}

input:checked + label {
  font-weight: bold;
}

input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}

input:required {
  border-left: 3px solid orange;
}

input:optional {
  border-left: 3px solid gray;
}

/* Structural pseudo-classes */
li:first-child {
  font-weight: bold;
}

li:last-child {
  border-bottom: none;
}

li:nth-child(2) {
  background-color: yellow;
}

li:nth-child(odd) {
  background-color: #f0f0f0;
}

li:nth-child(even) {
  background-color: white;
}

li:nth-child(3n) {
  /* Every 3rd element */
  color: blue;
}

li:nth-child(3n + 1) {
  /* 1st, 4th, 7th... */
  color: red;
}

p:nth-of-type(2) {
  margin-top: 20px;
}

p:first-of-type {
  font-size: 18px;
}

p:last-of-type {
  margin-bottom: 0;
}

div:only-child {
  text-align: center;
}

p:empty {
  display: none;
}

/* Negation */
li:not(.active) {
  opacity: 0.7;
}

/* Target */
:target {
  background-color: yellow;
}

/* 11. PSEUDO-ELEMENTS */
p::before {
  content: "→ ";
  color: blue;
}

p::after {
  content: " ←";
  color: red;
}

p::first-line {
  font-weight: bold;
}

p::first-letter {
  font-size: 2em;
  float: left;
}

::selection {
  background-color: yellow;
  color: black;
}

input::placeholder {
  color: #999;
  font-style: italic;
}

/* 12. COMBINING SELECTORS */
/* Multiple selectors with different rules */
.button.primary:hover::before {
  content: "▶ ";
}

/* Complex example */
nav > ul li:not(:last-child) a:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
```

**Selector Specificity Table:**

| Selector Type                  | Specificity | Example                       |
| ------------------------------ | ----------- | ----------------------------- |
| Inline style                   | 1,0,0,0     | `style="..."`                 |
| ID                             | 0,1,0,0     | `#header`                     |
| Class, attribute, pseudo-class | 0,0,1,0     | `.button`, `[type]`, `:hover` |
| Element, pseudo-element        | 0,0,0,1     | `div`, `::before`             |
| Universal                      | 0,0,0,0     | `*`                           |

**Specificity Examples:**

```css
/* Specificity: 0,0,0,1 */
p {
  color: black;
}

/* Specificity: 0,0,1,0 */
.text {
  color: blue;
}

/* Specificity: 0,1,0,0 */
#main {
  color: green;
}

/* Specificity: 0,1,1,1 */
#main .text p {
  color: red;
}

/* Specificity: 0,0,2,1 */
p.text.highlight {
  color: orange;
}

/* !important overrides (use sparingly) */
p {
  color: purple !important;
}
```

**MCQ:**

```
Q: What is the specificity of the selector `#nav ul.menu li a:hover`?
(A) 0,1,1,2
(B) 0,1,2,2
(C) 0,1,1,3
(D) 0,2,1,2

Answer: C - ID(1) + Class(1) + Pseudo-class(1) + Elements(3) = 0,1,2,3
Actually: 0,1,1,3 (ID: 1, Class: 1, Pseudo-class: 1, Elements: 3)
Correction: (B) 0,1,2,2 - #nav(1) + .menu(1) + :hover(1) + ul,li,a(3) = 0,1,2,3
```

---

## 4. Box Model - Deep Dive

### Understanding the Box Model

**Explanation:**
The CSS box model describes how elements are rendered with content, padding, border, and margin. Understanding this is fundamental to layout control.

**Code Examples:**

```css
/* STANDARD BOX MODEL */
.box-standard {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  background-color: lightblue;
}
/* Total width = 300 + 20*2 + 5*2 + 10*2 = 370px */
/* Total height = 200 + 20*2 + 5*2 + 10*2 = 270px */

/* BORDER-BOX MODEL (Modern Approach) */
.box-border-box {
  box-sizing: border-box;
  width: 300px; /* Total width including padding and border */
  height: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
/* Total width = 300px (includes padding and border) */

/* GLOBAL BOX-SIZING (Recommended) */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* PADDING */
.padding-demo {
  /* All sides */
  padding: 20px;

  /* Vertical | Horizontal */
  padding: 10px 20px;

  /* Top | Horizontal | Bottom */
  padding: 10px 20px 30px;

  /* Top | Right | Bottom | Left */
  padding: 10px 20px 30px 40px;

  /* Individual sides */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
}

/* BORDER */
.border-demo {
  /* Shorthand */
  border: 2px solid red;

  /* Individual properties */
  border-width: 2px;
  border-style: solid; /* solid, dashed, dotted, double, groove, ridge, inset, outset */
  border-color: red;

  /* Individual sides */
  border-top: 3px dashed blue;
  border-right: 2px solid green;
  border-bottom: 1px dotted orange;
  border-left: 4px double purple;

  /* Border radius */
  border-radius: 10px;
  border-radius: 10px 20px; /* Top-left & bottom-right | Top-right & bottom-left */
  border-radius: 10px 20px 30px 40px; /* TL TR BR BL */

  /* Individual corners */
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 40px;

  /* Elliptical corners */
  border-radius: 50px / 25px; /* horizontal / vertical */
}

/* MARGIN */
.margin-demo {
  /* Similar syntax to padding */
  margin: 20px;
  margin: 10px 20px;
  margin: 10px 20px 30px 40px;

  /* Auto centering */
  width: 300px;
  margin: 0 auto; /* Centers horizontally */

  /* Negative margins */
  margin-top: -10px; /* Moves element up */
}

/* MARGIN COLLAPSE */
.margin-collapse-demo {
  /* Vertical margins collapse to the larger value */
}

.element1 {
  margin-bottom: 30px;
}

.element2 {
  margin-top: 20px;
}
/* Actual gap between elements = 30px (not 50px) */

/* OUTLINE (Doesn't affect layout) */
.outline-demo {
  outline: 2px solid blue;
  outline-offset: 5px;
}

/* OVERFLOW */
.overflow-demo {
  width: 200px;
  height: 100px;

  overflow: visible; /* Default - content overflows */
  overflow: hidden; /* Clip overflowing content */
  overflow: scroll; /* Always show scrollbars */
  overflow: auto; /* Scrollbars when needed */

  /* Individual axes */
  overflow-x: hidden;
  overflow-y: auto;
}

/* MIN/MAX DIMENSIONS */
.dimensions-demo {
  width: 50%;
  min-width: 300px;
  max-width: 800px;

  height: auto;
  min-height: 200px;
  max-height: 600px;
}
```

**Visual Box Model:**

```
┌─────────────────────────────────┐
│        MARGIN (transparent)      │
│  ┌───────────────────────────┐  │
│  │   BORDER                   │  │
│  │  ┌─────────────────────┐  │  │
│  │  │   PADDING            │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   CONTENT     │  │  │  │
│  │  │  │               │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**MCQ:**

```
Q: An element has width: 300px, padding: 20px, border: 5px, margin: 10px.
   Without box-sizing, what is the total width?
(A) 300px
(B) 340px
(C) 360px
(D) 370px

Answer: D - 300 + (20×2) + (5×2) + (10×2) = 370px
```

---

## 5. Display & Positioning

### Display Property

**Code Examples:**

```css
/* DISPLAY VALUES */

/* 1. BLOCK */
.display-block {
  display: block;
  width: 100%; /* Takes full width by default */
  /* Examples: div, p, h1-h6, ul, li, section */
}

/* 2. INLINE */
.display-inline {
  display: inline;
  /* Cannot set width/height */
  /* Cannot set vertical margin/padding effectively */
  /* Examples: span, a, strong, em */
}

/* 3. INLINE-BLOCK */
.display-inline-block {
  display: inline-block;
  width: 200px; /* Can set dimensions */
  height: 100px;
  /* Combines benefits of inline and block */
}

/* 4. NONE */
.display-none {
  display: none; /* Removes from document flow */
}

/* 5. FLEX */
.display-flex {
  display: flex;
  /* Modern layout system */
}

/* 6. GRID */
.display-grid {
  display: grid;
  /* Two-dimensional layout */
}

/* 7. TABLE-RELATED */
.display-table {
  display: table;
}

.display-table-row {
  display: table-row;
}

.display-table-cell {
  display: table-cell;
}

/* VISIBILITY vs DISPLAY */
.visibility-hidden {
  visibility: hidden; /* Invisible but takes up space */
}

.display-none {
  display: none; /* Removed from layout */
}
```

---

### Position Property - Complete Guide

**Explanation:**
The position property determines how elements are positioned in the document flow. Understanding positioning is crucial for complex layouts.

**Code Examples:**

```css
/* 1. STATIC (Default) */
.position-static {
  position: static;
  /* Normal document flow */
  /* top, right, bottom, left have no effect */
}

/* 2. RELATIVE */
.position-relative {
  position: relative;
  top: 20px; /* Moves down 20px from original position */
  left: 10px; /* Moves right 10px from original position */
  /* Original space is preserved */
  /* Establishes positioning context for absolute children */
}

/* 3. ABSOLUTE */
.position-absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* Removed from normal flow */
  /* Positioned relative to nearest positioned ancestor */
  /* If no positioned ancestor, relative to initial containing block */
}

/* 4. FIXED */
.position-fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
  /* Fixed relative to viewport */
  /* Stays in position when scrolling */
  /* Removed from normal flow */
}

/* 5. STICKY */
.position-sticky {
  position: sticky;
  top: 0;
  /* Acts like relative until scroll threshold */
  /* Then acts like fixed */
  /* Must have at least one of: top, right, bottom, left */
}

/* Z-INDEX (Stacking Order) */
.z-index-demo {
  position: relative; /* Position required for z-index */
  z-index: 10; /* Higher values appear on top */
}

/* PRACTICAL EXAMPLES */

/* Centered Box (Absolute) */
.centered-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
}

/* Full Screen Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

/* Sticky Header */
.sticky-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Badge on Corner */
.badge-container {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
}

/* Tooltip */
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  margin-bottom: 5px;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #333;
}
```

**Position Comparison Table:**

| Position | Flow        | Scrolls | Context            | Use Case            |
| -------- | ----------- | ------- | ------------------ | ------------------- |
| static   | In flow     | Yes     | N/A                | Default             |
| relative | In flow     | Yes     | Creates context    | Minor adjustments   |
| absolute | Out of flow | Yes     | Nearest positioned | Tooltips, dropdowns |
| fixed    | Out of flow | No      | Viewport           | Navigation bars     |
| sticky   | Hybrid      | Hybrid  | Parent container   | Sticky headers      |

**MCQ:**

```
Q: Which position value removes an element from the document flow?
(A) relative
(B) absolute
(C) fixed
(D) B and C

Answer: D - Both absolute and fixed remove elements from flow
```

---

# Part 3: Advanced CSS

## 6. Flexbox - Complete Masterclass

### Flexbox Fundamentals

**Explanation:**
Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. It provides efficient space distribution and alignment capabilities.

**Code Examples:**

```css
/* FLEX CONTAINER PROPERTIES */

/* 1. display: flex */
.flex-container {
  display: flex; /* or inline-flex */

  /* 2. flex-direction */
  flex-direction: row; /* default - left to right */
  flex-direction: row-reverse; /* right to left */
  flex-direction: column; /* top to bottom */
  flex-direction: column-reverse; /* bottom to top */

  /* 3. flex-wrap */
  flex-wrap: nowrap; /* default - single line */
  flex-wrap: wrap; /* multiple lines */
  flex-wrap: wrap-reverse; /* multiple lines, reversed */

  /* 4. flex-flow (shorthand for direction + wrap) */
  flex-flow: row wrap;

  /* 5. justify-content (main axis alignment) */
  justify-content: flex-start; /* default */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between; /* equal space between items */
  justify-content: space-around; /* equal space around items */
  justify-content: space-evenly; /* equal space everywhere */

  /* 6. align-items (cross axis alignment) */
  align-items: stretch; /* default - fill container */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: baseline; /* align based on text baseline */

  /* 7. align-content (multi-line cross axis) */
  align-content: stretch;
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;

  /* 8. gap (spacing between items) */
  gap: 20px; /* gap between rows and columns */
  row-gap: 20px;
  column-gap: 10px;
}

/* FLEX ITEM PROPERTIES */

.flex-item {
  /* 1. order (controls visual order) */
  order: 0; /* default */
  order: -1; /* appears first */
  order: 1; /* appears last */

  /* 2. flex-grow (ability to grow) */
  flex-grow: 0; /* default - doesn't grow */
  flex-grow: 1; /* grows to fill space */
  flex-grow: 2; /* grows twice as much as flex-grow: 1 */

  /* 3. flex-shrink (ability to shrink) */
  flex-shrink: 1; /* default - can shrink */
  flex-shrink: 0; /* won't shrink */

  /* 4. flex-basis (initial size) */
  flex-basis: auto; /* default - based on content */
  flex-basis: 200px; /* specific size */
  flex-basis: 50%; /* percentage */

  /* 5. flex (shorthand: grow shrink basis) */
  flex: 0 1 auto; /* default */
  flex: 1; /* grow: 1, shrink: 1, basis: 0 */
  flex: 2; /* grow: 2, shrink: 1, basis: 0 */
  flex: 1 200px; /* grow: 1, shrink: 1, basis: 200px */
  flex: none; /* 0 0 auto - doesn't grow or shrink */

  /* 6. align-self (override align-items) */
  align-self: auto; /* default */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: baseline;
  align-self: stretch;
}

/* PRACTICAL EXAMPLES */

/* 1. Holy Grail Layout */
.holy-grail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.holy-grail-header,
.holy-grail-footer {
  flex-shrink: 0;
  background-color: #f0f0f0;
}

.holy-grail-body {
  display: flex;
  flex: 1;
}

.holy-grail-content {
  flex: 1;
}

.holy-grail-nav,
.holy-grail-ads {
  flex: 0 0 200px;
}

/* 2. Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
}

.nav-brand {
  font-size: 1.5rem;
  color: white;
}

.nav-menu {
  display: flex;
  gap: 1rem;
  list-style: none;
}

/* 3. Card Grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, min 300px */
  max-width: 400px;
}

/* 4. Centered Content */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 5. Equal Height Columns */
.equal-height {
  display: flex;
}

.equal-height .column {
  flex: 1;
}

/* 6. Space Between with Wrapping */
.space-between-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.space-between-wrap .item {
  flex: 0 1 calc(33.333% - 20px);
}

/* 7. Sticky Footer */
.sticky-footer-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sticky-footer-content {
  flex: 1;
}

.sticky-footer {
  flex-shrink: 0;
}
```

**Flexbox Cheat Sheet:**

```
Container Properties:
┌─────────────────────────────────────┐
│ display: flex                        │
│ flex-direction: row | column         │
│ flex-wrap: wrap | nowrap             │
│ justify-content: [main axis]         │
│ align-items: [cross axis]            │
│ align-content: [multi-line]          │
│ gap: 20px                            │
└─────────────────────────────────────┘

Item Properties:
┌─────────────────────────────────────┐
│ order: 0                             │
│ flex-grow: 0                         │
│ flex-shrink: 1                       │
│ flex-basis: auto                     │
│ flex: 1 (shorthand)                  │
│ align-self: auto                     │
└─────────────────────────────────────┘
```

**MCQ:**

```
Q: What does `flex: 1` actually mean?
(A) flex-grow: 1, flex-shrink: 0, flex-basis: auto
(B) flex-grow: 1, flex-shrink: 1, flex-basis: 0
(C) flex-grow: 1, flex-shrink: 1, flex-basis: 100%
(D) flex-grow: 1, flex-shrink: 0, flex-basis: 0

Answer: B - flex: 1 is shorthand for 1 1 0
```

**Q&A:**
Q: How do you create a responsive navigation that stacks vertically on mobile?

```css
.nav {
  display: flex;
  flex-direction: row; /* Default horizontal */
  justify-content: space-between;
  gap: 1rem;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column; /* Stack vertically on mobile */
    align-items: stretch;
  }
}
```

---

## 7. CSS Grid - Complete Masterclass

### Grid Fundamentals

**Explanation:**
CSS Grid is a two-dimensional layout system that excels at dividing a page into major regions or defining relationships in terms of size, position, and layer between parts of a control.

**Code Examples:**

```css
/* GRID CONTAINER PROPERTIES */

.grid-container {
  display: grid; /* or inline-grid */

  /* 1. DEFINING COLUMNS */
  grid-template-columns: 200px 200px 200px; /* Fixed widths */
  grid-template-columns: 1fr 1fr 1fr; /* Flexible units */
  grid-template-columns: 1fr 2fr 1fr; /* Different ratios */
  grid-template-columns: repeat(3, 1fr); /* Repeat pattern */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive */
  grid-template-columns: 200px auto 200px; /* Mixed units */

  /* 2. DEFINING ROWS */
  grid-template-rows: 100px auto 100px;
  grid-template-rows: repeat(3, 200px);

  /* 3. GAP (Spacing) */
  gap: 20px; /* Both row and column */
  row-gap: 20px;
  column-gap: 10px;

  /* 4. GRID TEMPLATE AREAS (Named regions) */
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";

  /* 5. ALIGNMENT */
  /* Align items in cells */
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
  place-items: center; /* shorthand for both */

  /* Align grid in container */
  justify-content: start | end | center | stretch | space-between | space-around
    | space-evenly;
  align-content: start | end | center | stretch | space-between | space-around |
    space-evenly;
  place-content: center; /* shorthand */

  /* 6. IMPLICIT GRID (Auto-generated rows/columns) */
  grid-auto-rows: 200px;
  grid-auto-columns: 100px;
  grid-auto-flow: row | column | dense;
}

/* GRID ITEM PROPERTIES */

.grid-item {
  /* 1. POSITIONING (Line-based) */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;

  /* Shorthand */
  grid-column: 1 / 3; /* Start / End */
  grid-row: 1 / 2;

  /* Span */
  grid-column: span 2; /* Span 2 columns */
  grid-row: span 3; /* Span 3 rows */

  /* Combined shorthand */
  grid-area: 1 / 1 / 3 / 4; /* row-start / col-start / row-end / col-end */

  /* 2. NAMED AREAS */
  grid-area: header; /* Matches grid-template-areas */

  /* 3. ALIGNMENT (Override container) */
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
  place-self: center; /* shorthand */
}

/* PRACTICAL EXAMPLES */

/* 1. Basic Dashboard Layout */
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 20px;
}

.dashboard-header {
  grid-area: header;
  background-color: #333;
  color: white;
  padding: 1rem;
}

.dashboard-sidebar {
  grid-area: sidebar;
  background-color: #f0f0f0;
  padding: 1rem;
}

.dashboard-main {
  grid-area: main;
  padding: 1rem;
}

.dashboard-footer {
  grid-area: footer;
  background-color: #f0f0f0;
  padding: 1rem;
}

/* 2. Responsive Image Gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 3. Magazine Layout */
.magazine {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 200px;
  gap: 15px;
}

.magazine-feature {
  grid-column: span 4;
  grid-row: span 2;
}

.magazine-article {
  grid-column: span 2;
}

.magazine-ad {
  grid-column: span 2;
  grid-row: span 2;
}

/* 4. Holy Grail Layout (Grid version) */
.holy-grail-grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  min-height: 100vh;
  gap: 20px;
}

.header {
  grid-area: header;
}
.nav {
  grid-area: nav;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}

/* 5. Masonry-Style Layout */
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 20px;
  gap: 15px;
}

.masonry-item {
  /* JavaScript would set grid-row-end based on content height */
}

/* 6. Card Layout with Different Sizes */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card-large {
  grid-column: span 2;
  grid-row: span 2;
}

.card-wide {
  grid-column: span 2;
}

.card-tall {
  grid-row: span 2;
}

/* 7. Overlay Grid Items */
.overlay-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.overlay-grid > * {
  grid-column: 1;
  grid-row: 1;
}

/* 8. Responsive 12-Column System */
.twelve-col {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}

.col-1 {
  grid-column: span 1;
}
.col-2 {
  grid-column: span 2;
}
.col-3 {
  grid-column: span 3;
}
.col-4 {
  grid-column: span 4;
}
.col-6 {
  grid-column: span 6;
}
.col-12 {
  grid-column: span 12;
}

@media (max-width: 768px) {
  .col-1,
  .col-2,
  .col-3,
  .col-4,
  .col-6 {
    grid-column: span 12; /* Full width on mobile */
  }
}

/* 9. Nested Grid */
.nested-grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

.nested-grid-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
```

**Grid vs Flexbox Decision Guide:**

```
Use Grid When:
✓ Two-dimensional layout (rows AND columns)
✓ Complex, structured layouts
✓ Overlapping elements
✓ Different sized items in predictable patterns
✓ Overall page layout

Use Flexbox When:
✓ One-dimensional layout (row OR column)
✓ Navigation bars
✓ Simple item alignment
✓ Dynamic/unpredictable content sizes
✓ Component layout
```

**MCQ:**

```
Q: What does `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` do?
(A) Creates exactly 250px columns
(B) Creates responsive columns that fit as many 250px+ items as possible
(C) Creates a single flexible column
(D) Creates 250 columns

Answer: B - Creates responsive columns, minimum 250px, fills available space
```

---

## 8. CSS Transforms & Transitions

### Transform Property

**Code Examples:**

```css
/* 2D TRANSFORMS */

.transform-demo {
  /* 1. TRANSLATE (Move) */
  transform: translate(50px, 100px); /* X, Y */
  transform: translateX(50px);
  transform: translateY(100px);

  /* 2. ROTATE */
  transform: rotate(45deg); /* Clockwise */
  transform: rotate(-45deg); /* Counter-clockwise */

  /* 3. SCALE */
  transform: scale(1.5); /* Uniform scaling */
  transform: scale(2, 0.5); /* X, Y */
  transform: scaleX(2);
  transform: scaleY(0.5);

  /* 4. SKEW */
  transform: skew(20deg, 10deg); /* X, Y */
  transform: skewX(20deg);
  transform: skewY(10deg);

  /* 5. MULTIPLE TRANSFORMS (Order matters!) */
  transform: translate(50px, 50px) rotate(45deg) scale(1.2);

  /* 6. TRANSFORM ORIGIN */
  transform-origin: center; /* default */
  transform-origin: top left;
  transform-origin: 50% 50%;
  transform-origin: 100px 50px;
}

/* 3D TRANSFORMS */

.transform-3d {
  /* Perspective (distance from viewer) */
  perspective: 1000px;

  /* 3D rotations */
  transform: rotateX(45deg); /* Flip around X axis */
  transform: rotateY(45deg); /* Flip around Y axis */
  transform: rotateZ(45deg); /* Same as rotate() */

  /* 3D translations */
  transform: translateZ(50px); /* Move toward/away viewer */
  transform: translate3d(10px, 20px, 30px); /* X, Y, Z */

  /* 3D scaling */
  transform: scaleZ(2);
  transform: scale3d(1.5, 1.5, 2);

  /* Perspective origin */
  perspective-origin: 50% 50%;

  /* Transform style (preserve 3D) */
  transform-style: preserve-3d;

  /* Backface visibility */
  backface-visibility: hidden;
}

/* PRACTICAL EXAMPLES */

/* 1. Flip Card */
.flip-card {
  perspective: 1000px;
  width: 300px;
  height: 400px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

/* 2. Hover Lift Effect */
.lift-on-hover {
  transition: transform 0.3s ease;
}

.lift-on-hover:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 3. Rotating Loader */
.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 4. 3D Cube */
.cube-container {
  perspective: 1000px;
}

.cube {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotateCube 10s infinite linear;
}

.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid black;
  opacity: 0.8;
}

.cube-face.front {
  transform: translateZ(100px);
}
.cube-face.back {
  transform: rotateY(180deg) translateZ(100px);
}
.cube-face.right {
  transform: rotateY(90deg) translateZ(100px);
}
.cube-face.left {
  transform: rotateY(-90deg) translateZ(100px);
}
.cube-face.top {
  transform: rotateX(90deg) translateZ(100px);
}
.cube-face.bottom {
  transform: rotateX(-90deg) translateZ(100px);
}

@keyframes rotateCube {
  from {
    transform: rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
```

---

### Transitions

**Code Examples:**

```css
/* TRANSITION BASICS */

.transition-demo {
  /* Shorthand: property duration timing-function delay */
  transition: all 0.3s ease 0s;

  /* Individual properties */
  transition-property: transform, opacity, background-color;
  transition-duration: 0.3s, 0.5s, 0.2s;
  transition-timing-function: ease, linear, ease-in-out;
  transition-delay: 0s, 0.1s, 0.2s;
}

/* TIMING FUNCTIONS */

.timing-functions {
  /* Predefined */
  transition-timing-function: linear; /* Constant speed */
  transition-timing-function: ease; /* Default - slow start/end */
  transition-timing-function: ease-in; /* Slow start */
  transition-timing-function: ease-out; /* Slow end */
  transition-timing-function: ease-in-out; /* Slow start and end */

  /* Cubic Bezier (custom) */
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);

  /* Steps (discrete) */
  transition-timing-function: steps(4, end);
}

/* PRACTICAL EXAMPLES */

/* 1. Button Hover Effect */
.button-transition {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button-transition:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.button-transition:active {
  transform: scale(0.95);
}

/* 2. Smooth Color Transition */
.color-transition {
  background-color: red;
  transition: background-color 1s ease;
}

.color-transition:hover {
  background-color: blue;
}

/* 3. Expandable Search Bar */
.search-bar {
  width: 40px;
  padding: 10px;
  border: 2px solid #3498db;
  border-radius: 20px;
  transition: width 0.4s ease;
}

.search-bar:focus {
  width: 300px;
  outline: none;
}

/* 4. Accordion Content */
.accordion-header {
  cursor: pointer;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.accordion-header:hover {
  background-color: #e0e0e0;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.active {
  max-height: 500px;
}

/* 5. Gradient Background Transition */
.gradient-transition {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-size: 200% 200%;
  animation: gradientShift 5s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 6. Progress Bar Animation */
.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #3498db;
  animation: fillBar 2s ease;
}

@keyframes fillBar {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
```

---

### Animations

**Code Examples:**

```css
/* KEYFRAME ANIMATIONS */

@keyframes slide-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* ANIMATION PROPERTIES */

.animation-demo {
  /* Shorthand: name duration timing-function delay iteration-count direction fill-mode */
  animation: slide-in 0.6s ease-out 0.2s 1 normal forwards;

  /* Individual properties */
  animation-name: slide-in;
  animation-duration: 0.6s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 1; /* or infinite */
  animation-direction: normal; /* alternate, reverse, alternate-reverse */
  animation-fill-mode: forwards; /* backwards, both */
  animation-play-state: running; /* paused */
}

/* PRACTICAL ANIMATION EXAMPLES */

/* 1. Loading Spinner */
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 2. Pulse Effect */
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 3. Slide Up on Scroll */
.slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 4. Bounce Animation */
.bounce-ball {
  animation: bounce 0.6s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-30px);
  }
}

/* 5. Gradient Shimmer (Skeleton Loading) */
.shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmerEffect 2s infinite;
}

@keyframes shimmerEffect {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 6. Staggered List Animation */
.list-item {
  animation: slideIn 0.6s ease-out forwards;
}

.list-item:nth-child(1) {
  animation-delay: 0s;
}
.list-item:nth-child(2) {
  animation-delay: 0.1s;
}
.list-item:nth-child(3) {
  animation-delay: 0.2s;
}
.list-item:nth-child(4) {
  animation-delay: 0.3s;
}
.list-item:nth-child(5) {
  animation-delay: 0.4s;
}

@keyframes slideIn {
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* 7. Attention Seeker (Shake) */
.shake:hover {
  animation: shake 0.5s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}

/* 8. Text Typing Effect */
.typing {
  overflow: hidden;
  border-right: 3px solid #333;
  white-space: nowrap;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #333;
  }
}
```

---

# Part 4: Responsive Design & Modern Layouts

## 9. Media Queries & Mobile-First Approach

### Media Query Fundamentals

**Code Examples:**

```css
/* BASIC MEDIA QUERIES */

/* Desktop-first approach (Old) */
.container {
  width: 1200px;
}

@media (max-width: 768px) {
  .container {
    width: 100%;
  }
}

/* Mobile-first approach (Modern) */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

/* BREAKPOINTS (Standard) */
/* Mobile: 320px - 767px */
/* Tablet: 768px - 991px */
/* Desktop: 992px - 1199px */
/* Large Desktop: 1200px+ */

/* MULTIPLE CONDITIONS */

/* AND */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablet only */
}

/* OR (Comma) */
@media (max-width: 600px), (min-width: 1400px) {
  /* Mobile or large desktop */
}

/* NOT */
@media not screen {
  /* Non-screen devices */
}

/* FEATURE QUERIES */

/* Screen orientation */
@media (orientation: portrait) {
  /* Portrait mode */
}

@media (orientation: landscape) {
  /* Landscape mode */
}

/* Device pixel ratio (retina) */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* High DPI screens */
  img {
    image-rendering: -webkit-optimize-contrast;
  }
}

/* Hover capability */
@media (hover: hover) {
  .button:hover {
    background-color: blue;
  }
}

@media (hover: none) {
  /* Touch devices - no hover */
}

/* Pointer capability */
@media (pointer: fine) {
  /* Mouse - precise pointer */
}

@media (pointer: coarse) {
  /* Touch - coarse pointer */
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a1a1a;
    color: #ffffff;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background-color: #ffffff;
    color: #000000;
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast */
@media (prefers-contrast: more) {
  /* Increase contrast */
}

/* PRACTICAL RESPONSIVE EXAMPLES */

/* 1. Responsive Typography */
body {
  font-size: 14px;
  line-height: 1.5;
}

@media (min-width: 768px) {
  body {
    font-size: 16px;
  }
}

@media (min-width: 1200px) {
  body {
    font-size: 18px;
  }
}

/* 2. Responsive Navigation */
.nav {
  display: none;
}

.nav.active {
  display: flex;
}

.hamburger {
  display: block;
  cursor: pointer;
}

@media (min-width: 768px) {
  .nav {
    display: flex;
  }

  .hamburger {
    display: none;
  }
}

/* 3. Responsive Grid */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 4. Responsive Images */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

.hero-image {
  background-image: url("image-small.jpg");
  background-size: cover;
}

@media (min-width: 768px) {
  .hero-image {
    background-image: url("image-medium.jpg");
  }
}

@media (min-width: 1200px) {
  .hero-image {
    background-image: url("image-large.jpg");
  }
}

/* 5. Responsive Flexbox */
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row;
  }

  .flex-container > * {
    flex: 1;
  }
}

/* 6. Responsive Padding */
.container {
  padding: 20px;
}

@media (min-width: 768px) {
  .container {
    padding: 40px;
  }
}

@media (min-width: 1200px) {
  .container {
    padding: 60px;
  }
}

/* 7. Container Queries (Modern) */
@supports (container-type: inline-size) {
  .card-container {
    container-type: inline-size;
  }

  .card {
    display: flex;
    flex-direction: column;
  }

  @container (min-width: 400px) {
    .card {
      flex-direction: row;
    }
  }
}
```

---

## 10. CSS Variables & Maintainability

**Code Examples:**

```css
/* CSS CUSTOM PROPERTIES (Variables) */

:root {
  /* Colors */
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --danger-color: #e74c3c;
  --warning-color: #f39c12;
  --success-color: #27ae60;
  --neutral-color: #95a5a6;
  --dark-color: #2c3e50;
  --light-color: #ecf0f1;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* Font sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;

  /* Font families */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  --font-mono: "Courier New", monospace;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Z-index */
  --z-dropdown: 1000;
  --z-modal: 1050;
  --z-popover: 1100;

  /* Transitions */
  --transition-duration: 300ms;
  --transition-timing: ease-in-out;
}

/* Dark mode theme */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --dark-color: #ecf0f1;
    --light-color: #2c3e50;
  }
}

/* USING CSS VARIABLES */

.button {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-duration) var(
      --transition-timing
    );
  box-shadow: var(--shadow-md);
}

.button:hover {
  background-color: var(--primary-color, #3498db);
  filter: brightness(0.9);
}

.button-danger {
  --primary-color: var(--danger-color);
}

.button-success {
  --primary-color: var(--success-color);
}

/* SCOPED VARIABLES */

.card {
  --card-bg: white;
  --card-border: var(--light-color);
  --card-shadow: var(--shadow-md);

  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--card-shadow);
}

@media (prefers-color-scheme: dark) {
  .card {
    --card-bg: #2c3e50;
    --card-border: #34495e;
  }
}

/* FALLBACK VALUES */

.element {
  /* If --primary-color is not defined, use #3498db */
  color: var(--primary-color, #3498db);
}

/* JAVASCRIPT INTEGRATION */

/* Root variables can be changed via JavaScript */

/*
JavaScript example:
document.documentElement.style.setProperty('--primary-color', '#e74c3c');
const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
*/
```

---

# Part 5: 150+ MCQs

## HTML MCQs (30+)

**1.** What does HTML stand for?  
(A) Hyper Text Markup Language  
(B) High Tech Modern Language  
(C) Home Tool Markup Language  
(D) Hyperlinks and Text Markup Language  
**Answer: A**

**2.** Which tag is used for the most important heading?  
(A) `<heading>`  
(B) `<h1>`  
(C) `<header>`  
(D) `<head>`  
**Answer: B**

**3.** What is the correct HTML for creating a hyperlink?  
(A) `<link>Click Here</link>`  
(B) `<a href="url">Click Here</a>`  
(C) `<url>Click Here</url>`  
(D) `<hyperlink>Click Here</hyperlink>`  
**Answer: B**

**4.** Which input type is used for password fields?  
(A) `<input type="password">`  
(B) `<input type="pwd">`  
(C) `<input type="secret">`  
(D) `<input type="pass">`  
**Answer: A**

**5.** What attribute specifies a unique identifier for an element?  
(A) class  
(B) id  
(C) name  
(D) key  
**Answer: B**

**6.** Which semantic HTML5 element represents independent, self-contained content?  
(A) `<section>`  
(B) `<article>`  
(C) `<main>`  
(D) `<aside>`  
**Answer: B**

**7.** What does the `<meta charset="UTF-8">` tag do?  
(A) Specifies the character encoding  
(B) Defines metadata  
(C) Sets the page title  
(D) Links external resources  
**Answer: A**

**8.** Which attribute makes a form field mandatory?  
(A) necessary  
(B) required  
(C) mandatory  
(D) essential  
**Answer: B**

**9.** What is the purpose of the `<label>` element?  
(A) Define a label style  
(B) Associate text with form controls  
(C) Create a heading  
(D) Add comments  
**Answer: B**

**10.** Which input type provides date selection?  
(A) `<input type="calendar">`  
(B) `<input type="date">`  
(C) `<input type="datetime">`  
(D) `<input type="day">`  
**Answer: B**

---

## CSS MCQs (50+)

**11.** What does CSS stand for?  
(A) Cascading Style Sheets  
(B) Computer Style Sheets  
(C) Colorful Style Sheets  
(D) Creative Style Sheets  
**Answer: A**

**12.** Which CSS property is used to change text color?  
(A) text-color  
(B) font-color  
(C) color  
(D) text-style  
**Answer: C**

**13.** What is the correct CSS syntax for an external style sheet?  
(A) `<style src="style.css">`  
(B) `<link rel="stylesheet" href="style.css">`  
(C) `<stylesheet>style.css</stylesheet>`  
(D) `<css href="style.css">`  
**Answer: B**

**14.** Which selector has the highest specificity?  
(A) Element selector  
(B) Class selector  
(C) ID selector  
(D) Universal selector  
**Answer: C**

**15.** What does `box-sizing: border-box` do?  
(A) Adds a border to the box  
(B) Includes padding and border in element's width and height  
(C) Sets the box border style  
(D) Removes the default box model  
**Answer: B**

**16.** Which property is used to control the spacing inside an element?  
(A) margin  
(B) padding  
(C) border  
(D) spacing  
**Answer: B**

**17.** What is the default value of the `position` property?  
(A) absolute  
(B) relative  
(C) fixed  
(D) static  
**Answer: D**

**18.** How do you make an element invisible but still occupy space?  
(A) `display: none;`  
(B) `visibility: hidden;`  
(C) `opacity: 0;`  
(D) Both B and C  
**Answer: D**

**19.** Which flexbox property aligns items along the main axis?  
(A) align-items  
(B) justify-content  
(C) align-content  
(D) flex-align  
**Answer: B**

**20.** What is the main difference between `flex-grow: 1` and `flex-shrink: 1`?  
(A) No difference  
(B) flex-grow makes items larger, flex-shrink makes them smaller  
(C) flex-grow is for width, flex-shrink is for height  
(D) flex-grow is old syntax, flex-shrink is new  
**Answer: B**

---

## CSS Grid MCQs (20+)

**21.** Which property defines the number of columns in a grid?  
(A) grid-cols  
(B) grid-columns  
(C) grid-template-columns  
(D) columns  
**Answer: C**

**22.** What does `fr` unit stand for in CSS Grid?  
(A) Font ratio  
(B) Fixed ratio  
(C) Fractional unit  
(D) Frame ratio  
**Answer: C**

**23.** How do you create a grid with 3 equal columns?  
(A) `grid-template-columns: 1fr 1fr 1fr`  
(B) `grid-template-columns: repeat(3, 1fr)`  
(C) Both A and B  
(D) `grid-columns: 3`  
**Answer: C**

**24.** Which grid property aligns all items in cells?  
(A) justify-content  
(B) justify-items  
(C) grid-align  
(D) align-grid  
**Answer: B**

**25.** What is `grid-auto-flow: dense` used for?  
(A) Creates dense packing of grid items  
(B) Automatically flows items to fill gaps  
(C) Sets automatic grid sizing  
(D) Defines grid direction  
**Answer: B**

---

## Advanced CSS MCQs (30+)

**26.** What does `transform: translate(50px, 100px)` do?  
(A) Rotates element  
(B) Moves element 50px right and 100px down  
(C) Scales element  
(D) Skews element  
**Answer: B**

**27.** What is the default timing function for transitions?  
(A) linear  
(B) ease  
(C) ease-in  
(D) ease-out  
**Answer: B**

**28.** Which animation property controls how many times an animation plays?  
(A) animation-iterations  
(B) animation-repeat  
(C) animation-iteration-count  
(D) animation-loop  
**Answer: C**

**29.** What does `@media (min-width: 768px)` target?  
(A) Maximum width of 768px  
(B) Minimum width of 768px  
(C) Exactly 768px width  
(D) Devices without width support  
**Answer: B**

**30.** Which CSS variable syntax is correct?  
(A) `--primary-color: blue;`  
(B) `$primary-color: blue;`  
(C) `@primary-color: blue;`  
(D) `#primary-color: blue;`  
**Answer: A**

---

# Part 6: 50+ Subjective Q&A

## HTML Q&A

**Q1: Explain the difference between semantic and non-semantic HTML elements.**

**Answer:**

- **Semantic**: Clearly describe their meaning to both browser and developer (e.g., `<header>`, `<nav>`, `<article>`, `<footer>`)

  - Advantages: Better SEO, improved accessibility, clearer code structure
  - Used for: Page structure, content organization

- **Non-semantic**: Don't describe content (e.g., `<div>`, `<span>`)
  - Still necessary for styling and grouping elements
  - Used for: Styling hooks, layout

**Example:**

```html
<!-- Semantic -->
<header>
  <nav>Navigation</nav>
</header>
<main>
  <article>Content</article>
</main>
<footer>Footer</footer>

<!-- Non-semantic (old approach) -->
<div id="header">
  <div id="nav">Navigation</div>
</div>
<div id="main">
  <div id="article">Content</div>
</div>
<div id="footer">Footer</div>
```

---

**Q2: What is the difference between `<input type="tel">`, `<input type="email">`, and `<input type="url">`?**

**Answer:**

- **`type="tel"`**: For telephone numbers
  - Shows numeric keyboard on mobile
  - No validation (flexible format)
  - Use case: Phone number input
- **`type="email"`**: For email addresses
  - Validates email format (username@domain)
  - Shows email keyboard on mobile
  - Use case: Email input with built-in validation
- **`type="url"`**: For URLs
  - Validates URL format
  - Shows URL keyboard on mobile
  - Use case: Website links

---

**Q3: Explain the purpose of the `<fieldset>` and `<legend>` elements.**

**Answer:**

```html
<fieldset>
  <legend>Personal Information</legend>
  <label for="name">Name:</label>
  <input id="name" type="text" />
</fieldset>
```

- **`<fieldset>`**: Groups related form elements together
- **`<legend>`**: Provides a caption for the fieldset
- **Benefits**: Improves accessibility, visual grouping, semantic meaning

---

**Q4: What are data attributes, and how do you access them in JavaScript?**

**Answer:**

```html
<div id="user" data-user-id="123" data-role="admin">User</div>

<script>
  // Method 1: getAttribute
  const userId = document.getElementById("user").getAttribute("data-user-id");

  // Method 2: dataset property (preferred)
  const userId = document.getElementById("user").dataset.userId;
  const role = document.getElementById("user").dataset.role;

  // Setting data attributes
  document.getElementById("user").dataset.newAttr = "value";
</script>
```

---

**Q5: Explain responsive image techniques and when to use each.**

**Answer:**

1. **Srcset + Sizes (Modern)**

```html
<img
  src="image.jpg"
  srcset="image-small.jpg 480w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 800px) 80vw, 60vw"
/>
```

Best for: Multiple resolutions, device pixel ratios

2. **Picture Element (Art Direction)**

```html
<picture>
  <source media="(min-width: 768px)" srcset="desktop.jpg" />
  <source media="(min-width: 480px)" srcset="tablet.jpg" />
  <img src="mobile.jpg" alt="Responsive image" />
</picture>
```

Best for: Different images for different screen sizes

3. **CSS Background Images**

```css
.hero {
  background-image: url("mobile.jpg");
}

@media (min-width: 768px) {
  .hero {
    background-image: url("desktop.jpg");
  }
}
```

Best for: Background images with media queries

---

## CSS Q&A

**Q6: Explain CSS Specificity and how to calculate it.**

**Answer:**

Specificity is calculated as: `(inline-styles, IDs, classes/attributes/pseudo-classes, elements)`

```
Inline style: 1,0,0,0
ID: 0,1,0,0
Class, attribute, pseudo-class: 0,0,1,0
Element, pseudo-element: 0,0,0,1

Examples:
p { } = 0,0,0,1
.class { } = 0,0,1,0
#id { } = 0,1,0,0
#id .class p { } = 0,1,1,1
style="" = 1,0,0,0

Higher specificity wins. Use !important sparingly.
```

---

**Q7: What is the CSS Cascade, and how does it work?**

**Answer:**

The cascade determines which styles apply when multiple rules target the same element:

1. **Origin Priority** (lowest to highest)

   - Browser defaults
   - User styles
   - Author styles (your CSS)

2. **Specificity**: Higher specificity wins

3. **Order**: Later rules override earlier rules

```css
/* Applied first (specificity 0,0,0,1) */
p {
  color: black;
}

/* Overrides above (specificity 0,0,1,0) */
.intro {
  color: blue;
}

/* Overrides all (specificity 0,1,0,0) */
#main {
  color: red;
}

/* Forces override (avoid if possible) */
p {
  color: green !important;
}
```

---

**Q8: Explain the difference between Margin Collapse and when it occurs.**

**Answer:**

**Margin Collapse**: Vertical margins between block-level elements combine into one larger margin (the largest value).

**Occurs when:**

- Adjacent block elements (vertical margins only)
- Parent and first/last child
- Empty elements

**Does NOT occur:**

- Horizontal margins (they add)
- Inline or inline-block elements
- Flex or grid items
- Positioned elements
- Elements with overflow other than visible

**Example:**

```css
.box1 {
  margin-bottom: 30px;
}

.box2 {
  margin-top: 20px;
}

/* Gap between boxes = 30px (not 50px) */
```

**Solutions:**

```css
/* Use padding instead of margin */
/* Add overflow: hidden; */
/* Use flexbox or grid */
/* Use border or padding on parent */
```

---

**Q9: What is the BEM (Block Element Modifier) naming convention?**

**Answer:**

BEM is a CSS naming methodology for writing reusable and maintainable CSS:

- **Block**: Standalone component (e.g., `.card`)
- **Element**: Part of a block (e.g., `.card__header`)
- **Modifier**: Variation (e.g., `.card--featured`)

**Example:**

```html
<div class="card card--featured">
  <div class="card__header">
    <h2 class="card__title">Title</h2>
  </div>
  <div class="card__body">
    <p>Content</p>
  </div>
  <div class="card__footer">
    <button class="card__button card__button--primary">Click</button>
  </div>
</div>
```

**Benefits:**

- Clear naming hierarchy
- Avoids specificity wars
- Easy to maintain and reuse
- Prevents naming conflicts

---

**Q10: Explain the difference between display: none, visibility: hidden, and opacity: 0.**

**Answer:**

| Property             | Flow Impact | Renders           | Use Case                |
| -------------------- | ----------- | ----------------- | ----------------------- |
| `display: none`      | Removed     | No                | Completely hide element |
| `visibility: hidden` | Preserved   | Yes (invisible)   | Hide but keep space     |
| `opacity: 0`         | Preserved   | Yes (transparent) | Fade effects            |

**Example:**

```css
.completely-hidden {
  display: none; /* No space taken */
}

.invisible {
  visibility: hidden; /* Space still taken */
}

.transparent {
  opacity: 0; /* Space taken, still interactive */
}
```

---

**Q11: How do you center content both horizontally and vertically?**

**Answer:**

**Method 1: Flexbox (Recommended)**

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

**Method 2: Grid**

```css
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}
```

**Method 3: Absolute + Transform**

```css
.container {
  position: relative;
  height: 100vh;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Method 4: Margin Auto**

```css
.container {
  position: relative;
  height: 100vh;
}

.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 200px;
}
```

---

**Q12: What is CSS Containment, and why is it important?**

**Answer:**

CSS Containment allows the browser to isolate parts of the DOM and paint/layout independently, improving performance.

```css
/* Paint containment */
.container {
  contain: paint;
}

/* Layout containment */
.container {
  contain: layout;
}

/* Size containment */
.container {
  contain: size;
  width: 300px;
  height: 300px;
}

/* All */
.container {
  contain: strict; /* layout size style paint */
}
```

**Benefits:**

- Improved rendering performance
- Prevents layout thrashing
- Useful for large lists or dynamic content

---

**Q13: Explain CSS Filters and provide practical examples.**

**Answer:**

```css
.filtered-image {
  /* Blur */
  filter: blur(5px);

  /* Brightness (0.5 = 50% dark, 1.5 = 150% bright) */
  filter: brightness(1.2);

  /* Contrast */
  filter: contrast(1.5);

  /* Grayscale (0-1) */
  filter: grayscale(0.5);

  /* Hue rotation (degrees) */
  filter: hue-rotate(90deg);

  /* Invert */
  filter: invert(0.8);

  /* Opacity */
  filter: opacity(0.7);

  /* Saturate (0-2) */
  filter: saturate(1.5);

  /* Sepia */
  filter: sepia(0.8);

  /* Drop shadow */
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));

  /* Combine multiple */
  filter: brightness(1.1) contrast(1.2) grayscale(0.2) blur(0.5px);
}

/* Practical examples */

/* Dark mode toggle */
@media (prefers-color-scheme: dark) {
  img {
    filter: brightness(0.8);
  }
}

/* Disabled button */
.button:disabled {
  filter: grayscale(1) opacity(0.5);
}

/* Image hover effect */
img:hover {
  filter: brightness(1.2) contrast(1.1);
  transition: filter 0.3s ease;
}

/* Night mode */
.night-mode {
  filter: invert(1) hue-rotate(180deg);
}
```

---

**Q14: What are CSS Gradients, and how do you create them?**

**Answer:**

**Linear Gradient:**

```css
.gradient-linear {
  background: linear-gradient(to right, #3498db, #2ecc71);
  background: linear-gradient(45deg, red, blue);
  background: linear-gradient(to right, red, yellow, green);
  background: linear-gradient(to right, red 0%, yellow 50%, green 100%);
}
```

**Radial Gradient:**

```css
.gradient-radial {
  background: radial-gradient(circle, red, blue);
  background: radial-gradient(ellipse, red, blue);
  background: radial-gradient(circle at center, red, blue);
  background: radial-gradient(circle at 30% 60%, red, blue);
}
```

**Conic Gradient:**

```css
.gradient-conic {
  background: conic-gradient(red, yellow, green, blue, red);
  background: conic-gradient(from 45deg, red, blue);
}
```

**Repeating Gradients:**

```css
.gradient-repeating {
  background: repeating-linear-gradient(
    45deg,
    #3498db 0px,
    #3498db 10px,
    #2ecc71 10px,
    #2ecc71 20px
  );
}
```

**Practical Examples:**

```css
/* Smooth color transition */
.button {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Gradient with transparency */
.overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
}

/* Diagonal stripe pattern */
.pattern {
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0, 0, 0, 0.1) 10px,
    rgba(0, 0, 0, 0.1) 20px
  );
}
```

---

**Q15: Explain CSS Pseudo-elements and provide examples.**

**Answer:**

Pseudo-elements are used to style specific parts of an element:

```css
/* ::before - Insert content before element */
.icon::before {
    content: "→ ";
    color: blue;
    font-weight: bold;
}

/* ::after - Insert content after element */
.quote::after {
    content: """;
}

/* ::first-line - Style first line of text */
p::first-line {
    font-weight: bold;
    color: blue;
}

/* ::first-letter - Style first letter */
p::first-letter {
    font-size: 2em;
    float: left;
    margin-right: 5px;
}

/* ::selection - Style selected text */
::selection {
    background-color: yellow;
    color: black;
}

/* ::placeholder - Style placeholder text */
input::placeholder {
    color: #999;
    font-style: italic;
}

/* ::marker - Style list markers */
li::marker {
    color: red;
    font-weight: bold;
}

/* Practical examples */

/* Tooltip with arrow */
.tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #333;
}

/* Number counters */
h2::before {
    counter-increment: section;
    content: counter(section) ". ";
}

/* Decorative lines */
h1::before,
h1::after {
    content: "━━━━━━";
    margin: 0 10px;
    color: #3498db;
}
```

---

# TLDR Summary - HTML & CSS Quick Reference

## HTML Essentials (30 seconds)

**Core Principles:**

- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Forms require proper input types and validation
- Accessibility first: ARIA labels, alt text, keyboard navigation
- Document structure: single `<h1>`, proper heading hierarchy

**Critical Elements:**

```html
<!-- Semantic structure -->
<header>Logo & Navigation</header>
<main>
  <article>Content</article>
  <aside>Sidebar</aside>
</main>
<footer>Copyright</footer>

<!-- Accessible form -->
<form>
  <label for="email">Email</label>
  <input type="email" id="email" aria-describedby="email-hint" required />
  <span id="email-hint">Use a valid email address</span>
</form>
```

**Interview Red Flags:**
❌ Divitis (using `<div>` for everything)  
❌ Skipped `<alt>` text on images  
❌ Poor form structure without labels  
❌ Ignored accessibility requirements

---

## CSS Essentials (30 seconds)

**Cascade & Specificity:**

- Specificity: Inline (1000) > ID (100) > Classes (10) > Elements (1)
- Cascade: Later rules override earlier ones (same specificity)
- !important kills specificity conflicts (avoid unless necessary)

**Modern Layout Stack:**

```css
/* 1. Mobile-first approach */
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 2. Tablet and up */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* 3. Complex 2D layouts */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

**CSS Variables (Maintainability):**

```css
:root {
  --primary-color: #3498db;
  --spacing-unit: 1rem;
  --transition-speed: 0.3s;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing-unit);
  transition: all var(--transition-speed) ease;
}
```

---

## Quick Decision Trees

### When to Use What?

**Layout Decision:**

```
Need responsive 1D layout? → Flexbox
  └─ Flex items in single row/column
  └─ Alignment, spacing, wrapping

Need responsive 2D grid? → CSS Grid
  └─ Multi-row, multi-column layout
  └─ Complex alignment requirements

Need fixed positioning? → Position property
  └─ Fixed header/footer
  └─ Sticky navigation
```

**Sizing Decision:**

```
Static width? → px (pixels)
Scale with screen? → % (percentage)
Scale with font? → rem/em (relative)
  └─ rem = relative to root font-size
  └─ em = relative to parent font-size
For responsiveness? → vh/vw (viewport)
```

**Selector Decision:**

```
One element? → ID (#id)
Multiple similar? → Classes (.class)
State-based styling? → Pseudo-classes (:hover, :focus)
Generated content? → Pseudo-elements (::before, ::after)
Complex selection? → Combinators (+, >, ~, space)
```

---

## Responsive Design Pattern (60 seconds)

**Mobile-First Workflow:**

```css
/* Step 1: Base styles for mobile */
.card {
  width: 100%;
  font-size: 14px;
  columns: 1;
}

/* Step 2: Tablet (768px+) */
@media (min-width: 768px) {
  .card {
    width: 48%;
    font-size: 16px;
  }
}

/* Step 3: Desktop (1024px+) */
@media (min-width: 1024px) {
  .card {
    width: 31%;
    font-size: 18px;
  }
}

/* Step 4: Large screens (1440px+) */
@media (min-width: 1440px) {
  .card {
    font-size: 20px;
  }
}
```

**Flexible Images:**

```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}

picture {
  /* Responsive image switching */
}

/* Using srcset in HTML */
<img src="small.jpg"
     srcset="medium.jpg 768w, large.jpg 1024w"
     sizes="(max-width: 768px) 100vw, 50vw">
```

---

## Performance Optimization Checklist

**Rendering Performance:**

- ✅ Minimize repaints (avoid changing layout properties in loops)
- ✅ Use `transform` and `opacity` for animations (GPU accelerated)
- ✅ Avoid `box-shadow`, `filter` on frequently updated elements
- ✅ Use `will-change` sparingly for known heavy animations

**CSS Optimization:**

```css
/* Good: GPU accelerated */
.animation {
  animation: slide 0.3s ease;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}

/* Bad: Causes repaints */
@keyframes slide-bad {
  from {
    margin-left: 0;
  }
  to {
    margin-left: 100px;
  }
}
```

**Critical CSS:**

```html
<!-- Inline critical CSS for above-fold content -->
<style>
  /* Only essential styles for initial render */
  header {
    background: #333;
  }
  nav {
    display: flex;
  }
</style>

<!-- Defer non-critical CSS -->
<link
  rel="stylesheet"
  href="non-critical.css"
  media="print"
  onload="this.media='all'"
/>
```

---

## Accessibility Quick Guide

**HTML Foundation:**

```html
<!-- Semantic structure is step 1 -->
<header role="banner">
  <nav aria-label="Main navigation">
    <a href="#main" class="skip-link">Skip to main</a>
  </nav>
</header>

<main id="main">
  <!-- Content -->
</main>

<!-- ARIA only when semantic HTML isn't enough -->
<div role="alert" aria-live="polite" aria-atomic="true">Error message here</div>
```

**Keyboard Navigation:**

```css
/* Always visible focus indicators */
:focus {
  outline: 2px solid #4a90e2;
  outline-offset: 2px;
}

/* Not hidden on keyboard focus */
button:focus-visible {
  background: #4a90e2;
}
```

**Color Contrast:**

- Normal text: 4.5:1 ratio (AA standard)
- Large text (18px+): 3:1 ratio
- Use tools: WebAIM Contrast Checker

---

## Browser Compatibility Strategy

**Modern Browsers (Chrome, Firefox, Safari, Edge):**

```css
/* Use latest features */
.container {
  display: grid;
  gap: 1rem;
}
```

**Older Browser Fallback:**

```css
/* Fallback for older browsers */
.container {
  display: flex; /* Fallback */
  display: grid; /* Modern */
  gap: 1rem;
}

/* Feature detection with @supports */
@supports (display: grid) {
  .container {
    display: grid;
  }
}

/* OR JavaScript detection */
if (CSS.supports("display", "grid")) {
  // Use grid
}
```

---

## Common Interview Patterns

### Q1: "How would you structure a modern responsive website?"

**Answer Outline:**

- Mobile-first approach with flexbox/grid base
- Progressive enhancement with media queries
- Semantic HTML for SEO and accessibility
- CSS custom properties for maintainability
- Performance optimization (critical CSS, transforms)

### Q2: "What's the difference between `em` and `rem`?"

**Answer:**

- `em`: Relative to parent font-size (cascades, compound effect)
- `rem`: Relative to root (html) font-size (no cascade, consistent)
- Use `rem` for spacing/sizing, `em` for component-scoped scaling

### Q3: "How do you handle browser compatibility?"

**Answer:**

- Use @supports queries for feature detection
- Provide fallback styles for unsupported properties
- Use vendor prefixes (-webkit-, -moz-) for transitions/transforms
- Test with Can I Use for feature availability
- Consider polyfills for critical features

### Q4: "What's the CSS specificity problem and how to solve it?"

**Answer:**

- Specificity war: ID selectors kill reusability
- Solution: Use BEM naming convention (low, consistent specificity)
- Avoid !important except for utilities
- Write from low to high specificity (elements → classes → IDs)

### Q5: "Explain the Box Model"

**Answer:**

```
Content → Padding → Border → Margin

box-sizing: content-box (default)
  width = content width only

box-sizing: border-box (recommended)
  width = content + padding + border
```

---

## Essential CSS Properties Reference

| Category         | Property                                       | Use Case                        |
| ---------------- | ---------------------------------------------- | ------------------------------- |
| **Flexbox**      | `display: flex`                                | 1D layouts, alignment, spacing  |
| **Grid**         | `display: grid`                                | 2D layouts, complex positioning |
| **Transform**    | `transform: translate/scale/rotate`            | GPU accelerated animations      |
| **Transition**   | `transition: all 0.3s ease`                    | Smooth state changes            |
| **Animation**    | `@keyframes`                                   | Complex, longer animations      |
| **Position**     | `position: absolute/fixed/sticky`              | Layout control, overlays        |
| **Gap**          | `gap: 1rem`                                    | Spacing in flex/grid layouts    |
| **Grid Columns** | `grid-template-columns: repeat(auto-fit, ...)` | Responsive grid                 |

---

## Last-Minute Review (90 seconds)

**Before the Interview:**

1. ✅ Semantic HTML is accessibility foundation
2. ✅ Mobile-first with Flexbox/Grid stack
3. ✅ CSS Specificity: Specificity wars lose jobs
4. ✅ Use `transform` for animations (performance)
5. ✅ Media queries for responsive (mobile-first)
6. ✅ CSS Variables for maintainability
7. ✅ Accessibility: Keyboard navigation + color contrast
8. ✅ Know BEM naming convention
9. ✅ Understand Box Model with `border-box`
10. ✅ Use Can I Use for browser compatibility

**Common Gotchas:**

- ❌ Using divitis instead of semantic elements
- ❌ Specificity wars with IDs
- ❌ Animations on position/layout properties
- ❌ Forgetting accessibility (focus states, alt text)
- ❌ Hardcoded colors instead of CSS variables

---

# References & Citations

## Official Documentation

- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [W3C HTML Standard](https://html.spec.whatwg.org/)
- [W3C CSS Specification](https://www.w3.org/Style/CSS/)

## Learning Resources

- [CSS-Tricks](https://css-tricks.com)
- [Smashing Magazine](https://www.smashingmagazine.com)
- [FreeCodeCamp](https://www.freecodecamp.org)
- [Web.dev](https://web.dev)

## Tools & Utilities

- [Can I Use](https://caniuse.com) - Browser compatibility
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [HTML Validator](https://validator.w3.org/)
- [WebAIM - Accessibility](https://webaim.org)

---

## Summary & Key Takeaways

### HTML

✅ Use semantic elements for better SEO and accessibility  
✅ Always validate forms with proper input types  
✅ Use data attributes for storing custom data  
✅ Implement ARIA labels for screen readers  
✅ Structure document with proper heading hierarchy

### CSS

✅ Use CSS variables for maintainability  
✅ Mobile-first responsive design approach  
✅ Flexbox for one-dimensional layouts  
✅ CSS Grid for two-dimensional layouts  
✅ Avoid specificity wars with good naming conventions

### Best Practices

✅ Write semantic, accessible HTML  
✅ Keep CSS organized and maintainable  
✅ Use preprocessors (Sass) for complex projects  
✅ Test across browsers and devices  
✅ Optimize for performance (minimize repaints/reflows)  
✅ Follow naming conventions (BEM, SMACSS)  
✅ Use CSS Grid and Flexbox for modern layouts

---

**Last Updated:** November 3, 2025  
**Next Review:** When new CSS features are standardized
