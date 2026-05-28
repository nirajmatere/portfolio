import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  User,
  Mail,
  Phone,
  MapPin,
  Download,
  Sun,
  Moon,
  ExternalLink,
  Menu,
  MessageSquare,
  Share2,
  Code,
  Send,
  Link,
  X,
  ChevronRight,
  Database,
  Cpu
} from 'lucide-react'
import AIChatModal from './AIChatModal'
import './App.css'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const copyResumeLink = () => {
    navigator.clipboard.writeText(contactInfo.resumeDrive)
    alert('Resume link copied to clipboard!')
  }

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'skills', name: 'Skills' },
    { id: 'education', name: 'Education' },
    { id: 'contact', name: 'Contact' },
  ]

  const experiences = [
    {
      company: 'SMS DataTech',
      role: 'Software Engineer',
      period: 'Oct. 2024 – Present',
      location: 'Tokyo, Japan',
      points: [
        'Architected a Distributed Monitoring Pipeline: Re-engineered a single server monitoring system into a horizontally scalable architecture.',
        'Dynamic Load Management: Implemented task queuing to estimate compute load, automatically launching servers to process 4,000 URLs in under 30 minutes, a 13x increase in throughput.',
        'Custom Scheduling Engine: Developed a granular scheduling feature for automated data ingestion.',
        'Token-Based Billing Integration: Transitioned the platform to a pay-per-use model.',
        'Automated Alerting System: Built a notification engine for user lifecycle events and pipeline failures.',
        'Intelligent Summarization: Integrated LLMs to automatically summarize scraped web content.',
        'Semantic Data Filtering: Developed an AI-powered search filter using natural language prompts.'
      ]
    },
    {
      company: 'SMS DataTech',
      role: 'Software Engineering Intern',
      period: 'July 2023 – June 2024',
      location: 'Tokyo, Japan',
      points: [
        'Optimized backend processing, reducing monitoring time for 100 URLs from 1 hour to 18 minutes.',
        'Improved website preview functionality, reducing load time from 50s to under 10s.',
        'Developed an NLP-based competitor discovery system with cosine similarity ranking.',
        'Led a small development team through design and delivery of an intelligence system.'
      ]
    }
  ]

  const skills = [
    { category: 'Programming', icon: <Code />, items: ['Python', 'PHP', 'C++', 'SQL', 'HTML', 'CSS'] },
    { category: 'Backend & APIs', icon: <Globe />, items: ['FastAPI', 'Asyncio', 'Aiohttp', 'REST APIs', 'React.js', 'Full-Stack Feature Development'] },
    { category: 'AI Tech', icon: <Database />, items: ['RAG Pipelines', 'LLM APIs (Gemini, OpenAI)', 'NLP', 'Pandas', 'NumPy'] },
    { category: 'Engineering', icon: <Cpu />, items: ['System Design', 'API Design', 'Asynchronous Processing', 'Caching', 'Rate Limiting', 'Authentication', 'Authorization', 'Performance Optimization'] },
    { category: 'Tools & Others', icon: <Share2 />, items: ['Git', 'Selenium', 'linux', 'BeautifulSoup', 'Software Engineering Lifecycle', 'Agile'] },
    { category: 'Databases & Cloud', icon: <Database />, items: ['MySQL', 'PostgreSQL', 'Database Design', 'AWS', 'Deployment', 'NoSQL'] }
  ]

  const projects = [
    {
      title: 'ProExamAI - AI Powered Test Platform',
      description: 'Designed, developed, and maintained an end-to-end mock test platform with AI-generated hints, analysis, and realistic simulations.',
      tags: ['React.js', 'Python', 'FastAPI', 'AI/LLM'],
      link: ['https://proexamai.com/']
    },
    {
      title: 'CricMarshall 2',
      description: 'Built a retrieval-augmented generation system in Python using FAISS for context-aware cricket analytics integrated with Gemini and OpenAI APIs.',
      tags: ['Python', 'FAISS', 'Gemini', 'OpenAI', 'RAG'],
      github: 'https://github.com/nirajmatere/CricMarshall_2/'
    },
    {
      title: 'Cross-Domain Recommendation System',
      description: 'Implemented a user-layered recommendation engine for books and movies across domains using cosine similarity and processed large datasets with pandas/numpy.',
      tags: ['Python', 'Pandas', 'Numpy', 'Recommendation Engine', 'Cosine Similarity'],
      github: 'https://github.com/nirajmatere/Cross-Domain-Recommendation-system-Movies-and-Books'
    },
    {
      title: 'CricMarshall',
      description: 'Developed a voice-based assistant for cricket-related queries using NLP techniques such as NER and POS tagging.',
      tags: ['Python', 'NLP', 'NER', 'POS Tagging', 'Voice Assistant'],
      github: 'https://github.com/nirajmatere/CricMarshall'
    }
  ]

  const contactInfo = {
    emails: ['nirajmatere2112@gmail.com', 'nirajm2112@gmail.com'],
    phones: ['+81-7085550995', '+91-9096654721'],
    location: 'Tokyo, Japan',
    linkedin: 'https://linkedin.com/in/niraj-matere',
    github: 'https://github.com/nirajmatere',
    resumeDrive: 'https://drive.google.com/file/d/1yMlYkOjzZ1mazLctd0zwwUiLjOsBO_qn/view?usp=sharing'
  }

  return (
    <div className="portfolio">
      <nav className="navbar">
        <div className="container nav-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="logo"
          >
            NIRAJ VALU MATERE
          </motion.div>

          <div className="nav-links desktop">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}>{s.name}</a>
            ))}
            <button onClick={() => setIsAIChatOpen(true)} className="nav-ai-btn">
              <MessageSquare size={16} /> Ask AI
            </button>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <div className="mobile-controls">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
          >
             {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setIsMenuOpen(false)}>
                {s.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsAIChatOpen(true)
                setIsMenuOpen(false)
              }} 
              className="nav-ai-btn mobile"
            >
              <MessageSquare size={18} /> Ask AI about Niraj
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                Building <span className="highlight">Backend</span> Systems
              </h1>
              <p className="hero-subtitle">
                Software Engineer with 2+ years of experience in end-to-end product development,
                AI-driven applications, and high-performance backend architectures.
              </p>
              <div className="hero-info">
                <div className="info-item"><MapPin size={18} /> {contactInfo.location}</div>
                <div className="info-item"><Mail size={18} /> {contactInfo.emails[0]}</div>
              </div>
              <div className="hero-cta">
                <button onClick={() => setIsAIChatOpen(true)} className="btn btn-primary">
                  <MessageSquare size={18} style={{ marginRight: '8px' }} /> Ask AI about Niraj
                </button>
                <button onClick={() => setIsResumeOpen(true)} className="btn btn-outline">
                  <Download size={18} style={{ marginRight: '8px' }} /> View Resume
                </button>
              </div>
              <div className="social-links-named">
                <a href={contactInfo.github} target="_blank" rel="noreferrer"><Globe /> <span>GitHub</span></a>
                <a href={contactInfo.linkedin} target="_blank" rel="noreferrer"><User /> <span>LinkedIn</span></a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="container">
            <h2>Professional Summary</h2>
            <p className="summary-text">
              Experienced in designing, building, deploying, and maintaining full-stack product features
              across frontend, backend, databases, and cloud environments. Proven ability to develop
              scalable Python services, RAG pipelines, and LLM-powered workflows, with a strong focus
              on product ownership and continuous improvement.
            </p>
            <div className="visa-badge">
              <MapPin size={16} /> Based in Japan | Valid VISA till 2029
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section">
          <div className="container">
            <h2>Experience</h2>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  transition={{ duration: 0.5 }}
                  className="experience-card"
                >
                  <div className="exp-header">
                    <h3>{exp.role}</h3>
                    <div className="exp-period">{exp.period}</div>
                  </div>
                  <div className="exp-company">{exp.company} | {exp.location}</div>
                  <ul className="exp-points">
                    {exp.points.map((p, i) => (
                      <li key={i}><ChevronRight size={14} className="bullet" /> {p}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <h2>Projects</h2>
            <div className="project-grid">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="project-card"
                >
                  {index === 0 && <div className="project-badge">Featured Project</div>}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => <span key={i}>{tag}</span>)}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                        GitHub <Link size={16} />
                      </a>
                    )}
                    {project.link && project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                        Live <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="container">
            <h2>Skills</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="skill-category"
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <h4>{skill.category}</h4>
                  <div className="skill-list">
                    {skill.items.map((item, i) => (
                      <span key={i} className="skill-item">{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="education-section">
          <div className="container">
            <h2>Education</h2>
            <div className="education-card">
              <h3>Bachelor of Technology – Computer Science and Engineering</h3>
              <p>Indian Institute of Information Technology (IIIT), Nagpur, India</p>
              <div className="edu-meta">
                <span>CGPA: 9.01</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <h2>Contact Me</h2>
            <div className="contact-layout">
              <div className="contact-info">
                <h3>Get in touch</h3>
                <p>I'm actively looking for new opportunities and can join immediately. Message me on LinkedIn for faster responses.</p>
                <div className="info-list">
                  {contactInfo.emails.map(email => (
                    <div key={email} className="info-item"><Mail /> {email}</div>
                  ))}
                  {contactInfo.phones.map(phone => (
                    <div key={phone} className="info-item"><Phone /> {phone}</div>
                  ))}
                  <div className="info-item"><MapPin /> {contactInfo.location}</div>
                </div>
              </div>
              <div className="contact-social-big">
                <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="contact-social-card">
                  <User size={32} />
                  <span>LinkedIn Profile</span>
                  <p>Message me on LinkedIn</p>
                </a>
                <a href={contactInfo.github} target="_blank" rel="noreferrer" className="contact-social-card">
                  <Globe size={32} />
                  <span>GitHub Profile</span>
                  <p>Check my repositories</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} NIRAJ VALU MATERE. Built with React & Vite.</p>
        </div>
      </footer>

      {/* Modals */}
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />

      <AnimatePresence>
        {isResumeOpen && (
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
              className="resume-modal"
            >
              <div className="modal-header">
                <h3>Niraj's Resume</h3>
                <div className="modal-actions">
                  <button onClick={copyResumeLink} className="btn-icon" title="Copy Link">
                    <Share2 size={20} />
                  </button>
                  <a href="/Niraj_Resume.pdf" download className="btn-icon" title="Download">
                    <Download size={20} />
                  </a>
                  <button onClick={() => setIsResumeOpen(false)} className="btn-icon">
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="resume-content">
                <iframe
                  src="/Niraj_Resume.pdf"
                  title="Niraj Resume"
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
