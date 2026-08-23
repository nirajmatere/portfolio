# Technical Documentation: `AIChatModal.jsx`

## 1. Overview

The `AIChatModal.jsx` file exports a React functional component (`AIChatModal`) that renders an interactive AI-powered chat interface in a modal window. The modal acts as an AI representative for Niraj Valu Matere, enabling recruiters and visitors to ask questions regarding his professional background, projects, skills, and availability.

The component interfaces directly with Google's Gemini API (using fallback dynamic model/key rotation), handles markdown rendering, supports internationalization via `react-i18next`, and utilizes `framer-motion` for transition animations.

---

## 2. Dependencies

| Package | Used Component / Function | Purpose |
| :--- | :--- | :--- |
| `react` | `useState`, `useRef`, `useEffect` | Managing internal component states, DOM reference for scrolling, and side-effects. |
| `framer-motion` | `motion`, `AnimatePresence` | Handles entrance, exit, and scaling animations for the modal overlay and window. |
| `lucide-react` | `Send`, `X`, `User`, `MessageSquare`, `Loader2`, `Maximize2`, `Minimize2` | Icon components for the user interface controls and avatars. |
| `react-markdown` | `ReactMarkdown` | Parses and renders markdown text within AI and user message bubbles. |
| `react-i18next` | `useTranslation` | Provides internationalization context (`t` function) for UI strings and error messages. |

---

## 3. Module Constants

### 3.1 `GEMINI_KEYS`
An array of API keys loaded from Vite environment variables:
* `import.meta.env.VITE_GEMINI_KEY_1`
* `import.meta.env.VITE_GEMINI_KEY_2`
* `import.meta.env.VITE_GEMINI_KEY_3`

### 3.2 `FREE_MODELS`
An array listing candidate Gemini API model names used sequentially during API dispatch:
* `'gemini-3-flash-live'`
* `'gemini-3-flash-preview'`
* `'gemini-2.5-flash'`
* `'gemini-2.5-flash-audio'`
* `'gemma-4-31b'`
* `'gemma-4-26b'`
* `'gemini-1.5-flash'`
* `'gemini-1.5-flash-8b'`

### 3.3 `RESUME_CONTEXT`
A static string containing Niraj Valu Matere's professional summary, detailed work experience, technical skills, education, links, location/visa details, and project details. This is fed directly into the prompt to supply context to the LLM.

### 3.4 `SYSTEM_PROMPT`
A set of 14 system instructions directing the behavior of the AI model. It enforces rules such as limiting context strictly to Niraj's profile, maintaining appropriate tone, handling missing skills positively, providing contact/resume links, and adapting to the prompt's language.

---

## 4. Component Interface (Props)

`AIChatModal` accepts the following React props:

| Prop | Type | Description |
| :--- | :--- | :--- |
| `isOpen` | `boolean` | Controls whether the modal overlay is rendered and visible. |
| `onClose` | `function` | Callback function executed when the user clicks the close (`X`) button. |

---

## 5. State Management & Hooks

| Hook/State | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `t` | `Function` | `useTranslation()` | Translation function to localize UI texts. |
| `messages` | `Array<Object>` | `[{ role: 'ai', content: t('chat.initialMessage') }]` | Stores message objects of structure `{ role: 'ai' \| 'user', content: string }`. |
| `input` | `string` | `''` | Controls text input element's controlled value. |
| `isLoading` | `boolean` | `false` | Tracks whether an active Gemini API call is in progress. |
| `isFullScreen` | `boolean` | `false` | Toggles full-screen layout mode for the modal container. |
| `messagesEndRef` | `React.RefObject` | `useRef(null)` | References a dummy element at the bottom of the chat list to manage auto-scrolling. |

---

## 6. Key Functions & Logic

### 6.1 `scrollToBottom()`
Smoothly scrolls the chat message container to the position of `messagesEndRef`. Triggered automatically via a `useEffect` hook whenever the `messages` state array updates.

```javascript
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
}
```

### 6.2 `callGemini(userPrompt, modelIndex = 0, keyIndex = 0)`
An asynchronous, recursive function responsible for executing API requests to Google Generative Language REST endpoints. It contains fallback mechanisms across available models and keys.

#### Execution Flow:
1. **Model Index Exhaustion Check**: If `modelIndex >= FREE_MODELS.length`, it attempts to increment `keyIndex` and reset `modelIndex` to `0`. If `keyIndex` exceeds available keys in `GEMINI_KEYS`, it throws an error: `'All models and keys failed'`.
2. **Endpoint Request**: Performs a `POST` request to `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`.
3. **Payload Construction**: Combines `SYSTEM_PROMPT`, `RESUME_CONTEXT`, and `userPrompt` into a single text part.
4. **Fallback Handling**:
   * If the HTTP response yields an `error` field in JSON, recursive fallback triggers with `modelIndex + 1`.
   * If the payload lacks expected candidate structure (`data.candidates[0].content`), recursive fallback triggers with `modelIndex + 1`.
   * Catch block captures fetch failures and recursively retries with `modelIndex + 1`.
5. **Success**: Returns the extracted response text string from `data.candidates[0].content.parts[0].text`.

### 6.3 `handleSubmit(e)`
Form submission handler for sending user input.

#### Execution Steps:
1. Calls `e.preventDefault()`.
2. Guards against submission if `input` is empty/whitespace or if `isLoading` is true.
3. Appends user message object (`{ role: 'user', content: input }`) to `messages`.
4. Resets `input` state to `''` and sets `isLoading` to `true`.
5. Calls `callGemini(input)` inside a `try...catch` block.
   * **On Success**: Appends `{ role: 'ai', content: aiResponse }` to `messages`.
   * **On Failure**: Appends `{ role: 'ai', content: t('chat.error') }` to `messages`.
6. Sets `isLoading` to `false`.

---

## 7. JSX Element Structure

The element hierarchy rendered by `AIChatModal` when `isOpen` is `true`:

* `<AnimatePresence>`
  * `<motion.div className="modal-overlay">` — Background overlay element with fade animations (`opacity: 0` to `opacity: 1`).
    * `<motion.div className={`chat-modal ${isFullScreen ? 'fullscreen' : ''}`}>` — Main modal container with scale/slide animations.
      * **Header (`.chat-header`)**:
        * Icon (`MessageSquare`), Title (`t('chat.header')`), and Badge (`t('chat.badge')`).
        * Action buttons: Toggle Fullscreen (`Maximize2` / `Minimize2`) and Close (`X` triggering `onClose`).
      * **Message List (`.chat-messages`)**:
        * Maps over `messages` array:
          * Render avatar: `<MessageSquare>` for `ai`, `<User>` for `user`.
          * Render content inside `<ReactMarkdown>` (overrides anchor `<a>` tags to render with `target="_blank" rel="noopener noreferrer"`).
        * Displays loading state indicator when `isLoading` is true (spinning `<Loader2>` icon and localized text).
        * Anchor element `<div ref={messagesEndRef} />` for auto-scrolling.
      * **Input Form (`.chat-input`)**:
        * Text `<input>` bound to `input` state, disabled during `isLoading`.
        * Submit `<button>` containing `<Send>` icon, disabled when `isLoading` is true or input is empty.