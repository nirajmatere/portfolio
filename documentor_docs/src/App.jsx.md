# Technical Documentation: `src/App.jsx`

## Overview

The `src/App.jsx` file serves as the main application component for a personal portfolio web application. Built with React, Framer Motion, and `react-i18next`, it provides an interactive, responsive, and internationalized portfolio showcase for Niraj Valu Matere.

Key functionality included in this file:
- **Theme Switching**: Toggles between light and dark themes with state persistence via `localStorage`.
- **Internationalization (i18n)**: Language toggle supporting English (`en`) and Japanese (`jp`).
- **Responsive Navigation**: Desktop navigation bar and a animated mobile overlay menu.
- **Dynamic Content Rendering**: Renders structured data for work experiences, projects, technical skills, education, and contact information.
- **Interactive Modals**: Controls state for an AI Chat Modal (`AIChatModal`) and an embedded PDF Resume Viewer Modal.
- **Animations**: Uses Framer Motion for entry animations, hover effects, timeline transitions, and modal exit/entry states.

---

## Dependencies & Imports

### External Dependencies
* **React** (`useState`, `useEffect`): Manages local component states and side effects.
* **framer-motion** (`motion`, `AnimatePresence`): Handles smooth transition animations, hover effects, scroll triggers, and enter/exit states for modals.
* **lucide-react**: Provides SVG icons (`Globe`, `User`, `Mail`, `Phone`, `MapPin`, `Download`, `Sun`, `Moon`, `ExternalLink`, `Menu`, `MessageSquare`, `Share2`, `Code`, `Send`, `Link`, `X`, `ChevronRight`, `Database`, `Cpu`).
* **react-i18next** (`useTranslation`): Standard translation hook for internationalization.

### Internal Dependencies
* **`AIChatModal`** (`./AIChatModal`): A modal component used for interacting with an AI assistant.
* **`./App.css`**: Component styling stylesheet.

---

## Components

### 1. `LanguageToggle()`

A helper sub-component responsible for toggling the current application language between English and Japanese.

* **Hook**: Uses `useTranslation()` to access the `i18n` instance.
* **Logic (`toggleLanguage`)**: Checks `i18n.language`. If it is currently `'en'`, it changes to `'jp'`, otherwise switches back to `'en'`.
* **Output**: Renders a HTML `<button>` containing the `Globe` icon and a text label displaying `'JP'` or `'EN'`.

---

### 2. `App()` (Default Export)

The primary component orchestrating the application layout, logic, data definitions, and sub-components.

#### State Variables

| State Variable | Type | Initial Value | Description |
| :--- | :--- | :--- | :--- |
| `theme` | `string` | `localStorage.getItem('theme') \|\| 'light'` | Tracks the current theme (`'light'` or `'dark'`). |
| `isMenuOpen` | `boolean` | `false` | Controls mobile dropdown menu open/closed state. |
| `isAIChatOpen` | `boolean` | `false` | Controls visibility of the `AIChatModal`. |
| `isResumeOpen` | `boolean` | `false` | Controls visibility of the Resume Modal overlay. |

#### Side Effects (`useEffect`)
* Syncs `theme` state changes to:
  1. HTML root attribute: `document.documentElement.setAttribute('data-theme', theme)`
  2. Local Storage: `localStorage.setItem('theme', theme)`

#### Handler Functions
* **`toggleTheme()`**: Swaps `theme` between `'light'` and `'dark'`.
* **`copyResumeLink()`**: Copies `contactInfo.resumeDrive` link to clipboard using `navigator.clipboard.writeText()` and fires an `alert`.

---

## Static Data Structures

Inside `App()`, local data structures format and translate content:

### 1. `sections`
An array of objects mapping navigation section IDs to translated string names:
* `hero`, `about`, `experience`, `projects`, `skills`, `education`, `contact`.

### 2. `experiences`
An array of objects representing work experience entries:
* **Properties**: `company`, `role`, `period`, `location`, `points` (array of localized achievement bullet points).

### 3. `skills`
An array of skill categories containing:
* `category`: Localized category title.
* `icon`: Corresponding Lucide icon component (`Code`, `Globe`, `Database`, `Cpu`, `Share2`).
* `items`: Array of string skill names (e.g., Python, FastAPI, RAG Pipelines, System Design, Git, MySQL).

### 4. `projects`
An array of project showcase objects:
* **Properties**: `title`, `description`, `tags` (array of technology names), `github` URL (optional), and `link` URL (optional).

### 5. `contactInfo`
An object holding personal contact details:
* `emails`: Array of email address strings.
* `phones`: Array of phone number strings.
* `location`: String location (`'Tokyo, Japan'`).
* `linkedin`, `github`, `resumeDrive`: External URLs.

---

## Rendered JSX Structure

```
<div className="portfolio">
  ├── <nav className="navbar"> (Desktop links, Theme Toggle, Language Toggle, AI Chat button)
  ├── <AnimatePresence> (Mobile dropdown menu)
  ├── <main>
  │    ├── <section id="hero"> (Title, Subtitle, Contact Snippet, CTAs, Social links)
  │    ├── <section id="about"> (Summary text, Visa status badge)
  │    ├── <section id="experience"> (Timeline of work experience cards)
  │    ├── <section id="projects"> (Grid of project cards with tags & links)
  │    ├── <section id="skills"> (Grid of skill category cards)
  │    ├── <section id="education"> (Degree, college, CGPA)
  │    └── <section id="contact"> (Get in touch details, clickable profile cards)
  ├── <footer className="footer"> (Dynamic copyright year)
  ├── <AIChatModal /> (Controlled by isAIChatOpen)
  └── <AnimatePresence> (Resume PDF iframe Modal, controlled by isResumeOpen)
```

### Detailed Section Breakdowns

#### Navbar (`<nav>`)
- Displays the logo (`NIRAJ VALU MATERE`).
- Includes anchor links scrolling to specific section IDs (`#hero`, `#about`, etc.).
- Includes buttons to toggle theme, toggle language, open AI chat, and trigger mobile navigation controls (`Menu`/`X` icon).

#### Hero Section (`#hero`)
- Uses Framer Motion fade/slide animations.
- Displays full name titles, summary location, main CTAs ("Ask AI" and "View Resume"), and social links.

#### About Section (`#about`)
- Displays summary text translated via `t('about.summary')` and visa status via `t('about.visaBadge')`.

#### Experience Section (`#experience`)
- Maps through `experiences`.
- Uses `whileInView` animations to animate experience cards into view from left or right based on their array index (`index % 2 === 0`).

#### Projects Section (`#projects`)
- Displays a grid of project cards with hover elevation (`whileHover={{ y: -10 }}`).
- Renders a "Featured" badge on the first project card (`index === 0`).
- Provides external links to GitHub repositories or live links if present.

#### Skills Section (`#skills`)
- Renders categories using Framer Motion hover scaling (`whileHover={{ scale: 1.05 }}`).
- Displays icons alongside skill tag items.

#### Education Section (`#education`)
- Renders degree details, institution, and CGPA through translation keys.

#### Contact Section (`#contact`)
- Renders multiple contact emails, phone numbers, location, and large profile cards linking to LinkedIn and GitHub profiles.

#### Footer (`<footer>`)
- Uses `new Date().getFullYear()` to dynamically present the copyright year alongside localized footer copy.

#### Resume Modal
- Rendered inside `AnimatePresence`.
- Displays an embedded PDF viewer using an `<iframe>` referencing `/Niraj_Resume.pdf`.
- Provides controls to copy the Google Drive link, download `/Niraj_Resume.pdf` directly, or close the modal window.