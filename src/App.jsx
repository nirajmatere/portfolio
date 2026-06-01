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
import { useTranslation } from 'react-i18next'
import AIChatModal from './AIChatModal'
import './App.css'

function LanguageToggle() {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'jp' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={toggleLanguage} className="theme-toggle lang-toggle" title="Switch Language">
      <Globe size={20} />
      <span style={{ fontSize: '12px', fontWeight: 'bold', marginLeft: '4px' }}>
        {i18n.language === 'en' ? 'JP' : 'EN'}
      </span>
    </button>
  );
}

function App() {
  const { t, i18n } = useTranslation()
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
    { id: 'hero', name: t('nav.home') },
    { id: 'about', name: t('nav.about') },
    { id: 'experience', name: t('nav.experience') },
    { id: 'projects', name: t('nav.projects') },
    { id: 'skills', name: t('nav.skills') },
    { id: 'education', name: t('nav.education') },
    { id: 'contact', name: t('nav.contact') },
  ]

  const experiences = [
    {
      company: t('experience.company.smsDatatech'),
      role: t('experience.roles.softwareEngineer'),
      period: 'Oct. 2024 – Present',
      location: t('experience.locations.tokyo'),
      points: [
        t('experience.points.architected'),
        t('experience.points.dynamicLoad'),
        t('experience.points.customScheduling'),
        t('experience.points.tokenBilling'),
        t('experience.points.automatedAlerting'),
        t('experience.points.summarization'),
        t('experience.points.semanticFiltering')
      ]
    },
    {
      company: t('experience.company.smsDatatech'),
      role: t('experience.roles.intern'),
      period: 'July 2023 – June 2024',
      location: t('experience.locations.tokyo'),
      points: [
        t('experience.points.optimizedBackend'),
        t('experience.points.improvedPreview'),
        t('experience.points.competitorDiscovery'),
        t('experience.points.ledTeam')
      ]
    }
  ]

  const skills = [
    { category: t('skills.categories.programming'), icon: <Code />, items: ['Python', 'PHP', 'C++', 'SQL', 'HTML', 'CSS'] },
    { category: t('skills.categories.backend'), icon: <Globe />, items: ['FastAPI', 'Asyncio', 'Aiohttp', 'REST APIs', 'React.js', 'Full-Stack Feature Development'] },
    { category: t('skills.categories.ai'), icon: <Database />, items: ['RAG Pipelines', 'LLM APIs (Gemini, OpenAI)', 'NLP', 'Pandas', 'NumPy'] },
    { category: t('skills.categories.engineering'), icon: <Cpu />, items: ['System Design', 'API Design', 'Asynchronous Processing', 'Caching', 'Rate Limiting', 'Authentication', 'Authorization', 'Performance Optimization'] },
    { category: t('skills.categories.tools'), icon: <Share2 />, items: ['Git', 'Selenium', 'linux', 'BeautifulSoup', 'Software Engineering Lifecycle', 'Agile'] },
    { category: t('skills.categories.databases'), icon: <Database />, items: ['MySQL', 'PostgreSQL', 'Database Design', 'AWS', 'Deployment', 'NoSQL'] }
  ]

  const projects = [
    {
      title: t('projects.items.proExamAI.title'),
      description: t('projects.items.proExamAI.description'),
      tags: ['React.js', 'Python', 'FastAPI', 'AI/LLM'],
      link: ['https://proexamai.com/']
    },
    {
      title: t('projects.items.cricMarshall2.title'),
      description: t('projects.items.cricMarshall2.description'),
      tags: ['Python', 'FAISS', 'Gemini', 'OpenAI', 'RAG'],
      github: 'https://github.com/nirajmatere/CricMarshall_2/'
    },
    {
      title: t('projects.items.recommendation.title'),
      description: t('projects.items.recommendation.description'),
      tags: ['Python', 'Pandas', 'Numpy', 'Recommendation Engine', 'Cosine Similarity'],
      github: 'https://github.com/nirajmatere/Cross-Domain-Recommendation-system-Movies-and-Books'
    },
    {
      title: t('projects.items.cricMarshall1.title'),
      description: t('projects.items.cricMarshall1.description'),
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
              <MessageSquare size={16} /> {t('nav.askAI')}
            </button>
            <LanguageToggle />
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <div className="mobile-controls">
            <LanguageToggle />
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
              <MessageSquare size={18} /> {t('nav.askAI')}
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
                {t('hero.titlePrefix')}<span className="highlight">{t('hero.highlight')}</span>{t('hero.titleSuffix')}
              </h1>
              <p className="hero-subtitle">
                {t('hero.subtitle')}
              </p>
              <div className="hero-info">
                <div className="info-item"><MapPin size={18} /> {contactInfo.location}</div>
                <div className="info-item"><Mail size={18} /> {contactInfo.emails[0]}</div>
              </div>
              <div className="hero-cta">
                <button onClick={() => setIsAIChatOpen(true)} className="btn btn-primary">
                  <MessageSquare size={18} style={{ marginRight: '8px' }} /> {t('hero.askAI')}
                </button>
                <button onClick={() => setIsResumeOpen(true)} className="btn btn-outline">
                  <Download size={18} style={{ marginRight: '8px' }} /> {t('hero.viewResume')}
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
            <h2>{t('about.title')}</h2>
            <p className="summary-text">
              {t('about.summary')}
            </p>
            <div className="visa-badge">
              <MapPin size={16} /> {t('about.visaBadge')}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="experience-section">
          <div className="container">
            <h2>{t('experience.title')}</h2>
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
            <h2>{t('projects.title')}</h2>
            <div className="project-grid">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="project-card"
                >
                  {index === 0 && <div className="project-badge">{t('projects.featured')}</div>}
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
            <h2>{t('skills.title')}</h2>
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
            <h2>{t('education.title')}</h2>
            <div className="education-card">
              <h3>{t('education.degree')}</h3>
              <p>{t('education.college')}</p>
              <div className="edu-meta">
                <span>{t('education.cgpa')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="container">
            <h2>{t('contact.title')}</h2>
            <div className="contact-layout">
              <div className="contact-info">
                <h3>{t('contact.getInTouch')}</h3>
                <p>{t('contact.subtitle')}</p>
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
                  <span>{t('contact.linkedinProfile')}</span>
                  <p>{t('contact.linkedinMsg')}</p>
                </a>
                <a href={contactInfo.github} target="_blank" rel="noreferrer" className="contact-social-card">
                  <Globe size={32} />
                  <span>{t('contact.githubProfile')}</span>
                  <p>{t('contact.githubMsg')}</p>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
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
                <h3>{t('chat.resumeTitle')}</h3>
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
