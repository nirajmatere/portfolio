import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, User, MessageSquare, Loader2, Maximize2, Minimize2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const GEMINI_KEYS = [
  import.meta.env.VITE_GEMINI_KEY_1,
  import.meta.env.VITE_GEMINI_KEY_2,
  import.meta.env.VITE_GEMINI_KEY_3
]

const FREE_MODELS = [
  'gemini-3-flash-live',
  'gemini-3-flash-preview',
  'gemini-2.5-flash',
  'gemini-2.5-flash-audio',
  'gemma-4-31b',
  'gemma-4-26b',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b'
]

const RESUME_CONTEXT = `
NIRAJ VALU MATERE
Backend Engineer, Python, API, AI Automation, System Design
Location: Tokyo, Japan (Valid Visa till 2029)
Contact: nirajmatere2112@gmail.com | +81-7085550995 | +91-9096654721
LinkedIn: linkedin.com/in/niraj-matere
GitHub: github.com/nirajmatere

Professional Summary:
Software Engineer with over 2 years of experience in end-to-end product development, backend systems, and AI-driven applications. Experienced in designing, building, deploying, and maintaining full-stack product features. Developed scalable Python services, RAG pipelines, and LLM-powered workflows. Focus on product ownership and continuous improvement.

Skills:
- Programming: Python, PHP, C++, SQL, HTML, CSS, JavaScript
- Frameworks/APIs: FastAPI, Asyncio, Aiohttp, REST APIs, React.js
- System Design: API design, Distributed Monitoring Pipeline, Dynamic Load Management, Custom Scheduling Engine, Token-Based Billing Integration, Asynchronous Processing, Caching, Rate Limiting, Authentication & Authorization, Performance Optimization.
- AI & Data: RAG pipelines, FAISS, LLM APIs (Gemini, OpenAI), NLP, Cosine Similarity, Text Summarization, NER, POS Tagging.
- Tools: Git, Selenium, BeautifulSoup, Pandas, NumPy.
- Core Competencies: Software Engineering Fundamentals, Analytical Skills.

Experience:
- SMS DataTech (Software Engineer | Tokyo, Japan | Oct 2024 - Present):
  * Architected Distributed Monitoring Pipeline (horizontally scalable).
  * Dynamic Load Management (4,000 URLs in <30 mins, 13x throughput).
  * Custom Scheduling Engine.
  * Token-Based Billing Integration.
  * AI-powered search filters and intelligent summarization using LLMs.
- SMS DataTech (Software Engineering Intern | Tokyo, Japan | July 2023 - June 2024):
  * Optimized backend processing (1 hour -> 18 mins for 100 URLs).
  * Improved website preview functionality.
  * Developed NLP-based competitor discovery system.

Education:
- B.Tech in Computer Science and Engineering, IIIT Nagpur (CGPA: 9.01).

Personal Projects:
- ProExamAI: End-to-end AI Powered Test Platform.
- CricMarshall 2: RAG system for cricket analytics using FAISS, Gemini, and OpenAI.
- Cross-Domain Recommendation System: Books and Movies recommendation engine.
- CricMarshall: Voice-based cricket assistant using NLP.

Other Info:
- Currently based in Tokyo, Japan with a valid visa till 2029.
- Open to work in Japan and remote opportunities.
- Actively looking for new opportunities and can join immediately.
- Language: Business level English. Currently cannot speak Japanese but is a fast learner.
- If lacking a specific skill, portray as a quick learner and a better candidate due to strong fundamentals.
`

const SYSTEM_PROMPT = `
You are an AI assistant representing Niraj Valu Matere. Your goal is to help recruiters and viewers understand Niraj's skills, experience, and potential.
Follow these rules strictly:
1. ONLY answer questions related to Niraj Valu Matere, his projects, skills, and background.
2. If asked about general knowledge, other people, or topics unrelated to Niraj, politely decline and state that you are specifically designed to assist with information about Niraj's professional profile.
3. Language: Respond in the same language as the user's prompt (e.g., if asked in Japanese, respond in Japanese). If the user specifically asks to change the language, follow their request.
4. Use the provided Resume Context to answer questions.
5. If Niraj has experience or knowledge, state it truthfully and confidently.
6. If Niraj lacks a specific skill or experience, portray him as a highly capable learner and a better candidate who can acquire that knowledge rapidly. Always frame Niraj as "the better candidate".
7. Location/Visa: Currently in Tokyo, valid visa till 2029.
8. Languages: Business level English. Currently cannot speak Japanese (is a learner).
9. Availability: Actively looking, can join immediately. Open to Japan and Remote.
10. Salary Expectations: Open to negotiation based on role/responsibilities. Suggest discussing personally on LinkedIn: https://linkedin.com/in/niraj-matere
11. If asked for a resume, provide the link: https://drive.google.com/file/d/1yMlYkOjzZ1mazLctd0zwwUiLjOsBO_qn/view?usp=sharing
12. If asked for role alignment, analyze the prompt (and JD if provided) against the resume and explain why Niraj is an excellent fit.
13. Keep the tone professional yet approachable.
14. This chat is private; only the user can see it.
`

import { useTranslation } from 'react-i18next'

export default function AIChatModal({ isOpen, onClose }) {
  const { t } = useTranslation()
  const [messages, setMessages] = useState([
    { role: 'ai', content: t('chat.initialMessage') }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const callGemini = async (userPrompt, modelIndex = 0, keyIndex = 0) => {
    if (modelIndex >= FREE_MODELS.length) {
      if (keyIndex + 1 < GEMINI_KEYS.length) {
        return callGemini(userPrompt, 0, keyIndex + 1)
      }
      throw new Error('All models and keys failed')
    }

    const model = FREE_MODELS[modelIndex]
    const key = GEMINI_KEYS[keyIndex]

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `System Instructions: ${SYSTEM_PROMPT}\n\nUser Context: ${RESUME_CONTEXT}\n\nUser Question: ${userPrompt}` }]
          }]
        })
      })

      const data = await response.json()
      if (data.error) {
        return callGemini(userPrompt, modelIndex + 1, keyIndex)
      }

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        return callGemini(userPrompt, modelIndex + 1, keyIndex)
      }

      return data.candidates[0].content.parts[0].text
    } catch (error) {
      return callGemini(userPrompt, modelIndex + 1, keyIndex)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const aiResponse = await callGemini(input)
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: t('chat.error') }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className={`chat-modal ${isFullScreen ? 'fullscreen' : ''}`}
          >
            <div className="chat-header">
              <div className="chat-header-info">
                <MessageSquare size={20} className="header-icon" />
                <div>
                  <h3>{t('chat.header')}</h3>
                  <span className="private-badge">{t('chat.badge')}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button onClick={() => setIsFullScreen(!isFullScreen)} className="modal-action-btn" title={isFullScreen ? "Minimize" : "Maximize"}>
                  {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button onClick={onClose} className="close-btn"><X size={20} /></button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  <div className="avatar">
                    {msg.role === 'ai' ? <MessageSquare size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-content">
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a {...props} target="_blank" rel="noopener noreferrer" />
                        )
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message ai">
                  <div className="avatar"><Loader2 size={16} className="animate-spin text-blue-500" /></div>
                  <div className="message-content">{t('chat.generating')}</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
