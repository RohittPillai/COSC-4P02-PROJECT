'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Header from '../_components/Header'
import Footer from '../_components/Footer'
import Link from 'next/link'

declare global {
  interface Window {
    AgentInitializer?: {
      init: (options: any) => void
    }
  }
}

export default function AboutUs() {
  const cursorControls = useAnimation()
  const [aiTriggered, setAiTriggered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Cursor Animation Loop
  useEffect(() => {
    let isMounted = true

    const loop = async () => {
      while (isMounted) {
        setAiTriggered(false)
        setIsClicking(false)
        await new Promise(res => setTimeout(res, 500))

        const button = buttonRef.current
        if (!button || !isMounted) break

        const x = button.offsetLeft + button.offsetWidth / 2 - 8
        const y = button.offsetTop + button.offsetHeight / 2 - 8

        await cursorControls.start({ x, y: y + 60, opacity: 1, transition: { duration: 0.3 } })
        await cursorControls.start({ x, y, transition: { duration: 0.5, ease: 'easeInOut' } })

        setIsClicking(true)
        await new Promise(res => setTimeout(res, 180))
        setAiTriggered(true)
        setIsClicking(false)

        await new Promise(res => setTimeout(res, 2000))
        await cursorControls.start({ opacity: 0, transition: { duration: 0.3 } })
        await new Promise(res => setTimeout(res, 1000))
      }
    }

    loop()

    return () => {
      isMounted = false
    }
  }, [])

  // Chatbot cleanup
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const agent = document.getElementById('JotformAgent-01954e62666e790e93a05f107990fb5bc6b7')
      const closeBtn = agent?.querySelector('[aria-label="Close"]') as HTMLElement
      if (closeBtn) {
        closeBtn.onclick = () => agent?.remove()
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      const agentRoot = document.getElementById('JotformAgent-01954e62666e790e93a05f107990fb5bc6b7')
      if (agentRoot) agentRoot.remove()
    }
  }, [])

  const handleStartChat = () => {
    if (typeof window !== 'undefined' && window.AgentInitializer) {
      window.AgentInitializer.init({
        agentRenderURL: 'https://agent.jotform.com/01954e62666e790e93a05f107990fb5bc6b7',
        rootId: 'JotformAgent-01954e62666e790e93a05f107990fb5bc6b7',
        formID: '01954e62666e790e93a05f107990fb5bc6b7',
        queryParams: ['skipWelcome=1', 'maximizable=1'],
        domain: 'https://www.jotform.com',
        isDraggable: false,
        background: '#0F53B4',
        buttonBackgroundColor: '#0F53B4',
        buttonIconColor: '#FFFFFF',
        customizations: {
          greeting: 'Yes',
          greetingMessage: 'Hi! How can I assist you?',
          pulse: 'Yes',
          position: 'right'
        }
      })
    }
  }

  return (
    <div
      className="flex flex-col min-h-screen text-gray-900 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        backgroundColor: '#eff6ff'
      }}
    >
     
    
      <Header />

      {/* Hero */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 min-h-[50vh] flex items-center justify-center z-10">
        <div className="w-full max-w-4xl rounded-3xl bg-white/30 backdrop-blur-xl border border-white/40 shadow px-10 py-14 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400">
            About Us
          </h1>
          
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-6xl mx-auto px-6 pt-8 pb-20 text-center z-10">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Why Choose <span className="text-blue-600">ResumeX?</span></h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Built for modern job seekers, powered by AI and designed for real results.
        </p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: '🤖', title: 'AI Suggestions', desc: 'Real-time improvements for every resume.' },
            { icon: '🎨', title: 'Templates', desc: 'Modern, ATS-optimized formats recruiters love.' },
            { icon: '📄', title: 'PDF Export', desc: 'Export ready-to-share resumes in one click.' }
          ].map(({ icon, title, desc }, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow border text-left">
              <div className="text-3xl">{icon}</div>
              <div className="text-lg font-semibold mt-2">{title}</div>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Resume Enhancer */}
      <section className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 items-center gap-12 z-10 relative">
        <div className="relative w-full flex justify-center">
          <div className="resume-card relative w-[360px] h-[480px] bg-white rounded-xl border border-gray-300 shadow-2xl p-6 text-left">
            <h3 className="text-lg font-semibold text-gray-900">Alex Johnson</h3>
            <p className="text-sm text-gray-500 mb-3">Software Engineer</p>
            <div className="p-3 bg-gray-100 rounded text-sm text-gray-700 min-h-[60px] transition-all duration-500">
              {aiTriggered
                ? 'Innovative developer creating AI-powered tools that drive measurable results.'
                : 'Aspiring software developer passionate about building impactful tools.'}
            </div>
            <motion.button
              ref={buttonRef}
              animate={{
                backgroundColor: isClicking ? '#facc15' : '#fde68a',
                scale: isClicking ? 0.95 : 1
              }}
              className="mt-3 w-full px-6 py-2 text-sm text-yellow-900 font-semibold rounded shadow-sm transition cursor-pointer"
            >
              ✨ Improve Summary with AI
            </motion.button>
          </div>

          {/* Cursor */}
          <motion.div
            animate={cursorControls}
            initial={{ opacity: 0 }}
            className="absolute z-50"
            style={{
              width: 16,
              height: 16,
              borderLeft: '16px solid black',
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              transform: 'rotate(-45deg)',
              pointerEvents: 'none'
            }}
          />
        </div>

        <div className="text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            How ResumeX AI Enhances Your Resume
          </h2>
          <ul className="space-y-3 text-gray-700 text-base">
            <li>• Transforms summaries into compelling statements</li>
            <li>• Identifies keywords and suggests improvements</li>
            <li>• Analyzes job descriptions for tailoring</li>
            <li>• Enhances readability and structure</li>
          </ul>
          <Link href="/pricing" passHref>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
              Subscribe to Pro
            </button>
          </Link>
        </div>
      </section>

      {/* Gemini */}
      <section className="text-center pt-6 pb-16 px-4 z-10">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 flex items-center justify-center gap-3 mb-3">
          Powered by
          <img src="/gemini-logo.png" alt="Gemini Logo" className="h-10 md:h-10 object-contain -mt-3" />
        </h3>
        <p className="max-w-2xl mx-auto text-gray-700 text-base md:text-lg">
          ResumeX leverages Google Gemini to provide intelligent, real-time resume suggestions and improvements.
        </p>
      </section>

      {/* Let's Connect */}
      <section className="text-center pt-16 pb-24 px-4 z-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Let’s Connect</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
          Whether you have questions, feedback, or just need help — we’re here for you.
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-3">✉️</div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-gray-600 mb-2">Drop us an email anytime.</p>
            <a href="mailto:support@resumex.com" className="text-blue-600 font-medium underline hover:text-blue-800 transition">
              support@resumex.com
            </a>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-3">🤖</div>
            <h3 className="text-xl font-bold mb-2">Chat with AI</h3>
            <p className="text-gray-600 mb-4 max-w-sm">
              Start a real-time conversation with our AI assistant.
            </p>
            <button
              onClick={handleStartChat}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
            >
              Start Chat
            </button>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="text-center pt-12 pb-20 px-4 z-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Meet the Team</h2>
        <p className="text-gray-600 mb-8">We’re the people behind ResumeX.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            'Jenny Dobariya',
            'Rohit Pillai',
            'Mahim Minhazul',
            'Neeti Pandya',
            'Harsh Kapoor',
            'Priyanshu Vora'
          ].map((name, idx) => (
            <div
              key={idx}
              className="bg-white text-gray-900 font-semibold text-lg py-5 px-6 rounded-xl border shadow hover:shadow-xl transition"
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
