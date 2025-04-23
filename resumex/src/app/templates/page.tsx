'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '../_components/Header'
import Footer from '../_components/Footer'
import { useState, useEffect } from 'react'

const resumes = [
  '/template1.webp',
  '/template2.avif',
  '/template3.jpeg',
  '/template4.png',
  '/template5.avif',
]

const templates = [
  {
    id: 'template1',
    image: '/templates1.png',
    name: 'Modern Clean Resume',
    description: 'A simple, modern, and easy-to-read resume template for professionals.',
  },
  {
    id: 'template2',
    image: '/templates2.png',
    name: 'Creative Professional Resume',
    description: 'A stylish template with a unique design, perfect for creatives.',
  },
  {
    id: 'template3',
    image: '/templates3.png',
    name: 'Executive Resume',
    description: 'A bold, professional resume template ideal for executives.',
  },
]

export default function TemplatesPlaceholder() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % resumes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-b from-blue-100 to-white">
        <Header />

        {/* Heading */}
        <div className="mt-20 px-8 md:px-16 fade-zoom">
          <h1 className="text-6xl font-extrabold tracking-wide text-transparent bg-clip-text gradient-text leading-tight">
            RESUME <br /> TEMPLATES
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 font-light">
            Choose a{' '}
            <span className="font-normal text-black">professionally designed resume template</span>
            <br />
            and create your standout resume in minutes.{' '}
            <span className="font-normal text-black">Easy to edit,</span>
            <br />
            <span className="font-normal text-black">fully customizable,</span> and optimized for success.
          </p>
        </div>

        {/* Templates */}
        <div className="flex flex-wrap justify-center gap-12 px-6 md:px-16 mt-10 mb-20">
          {templates.map(template => (
            <Link key={template.id} href={`/free-resume?template=${template.id}`} className="block">
              <ResumeCard {...template} />
            </Link>
          ))}
        </div>

        {/* Floating animation resumes */}
        <div className="hidden lg:block absolute top-20 right-10 w-56 h-72 flex justify-center items-center overflow-hidden shadow-lg">
          {resumes.map((resume, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
                index === currentIndex ? 'fade-zoom-in' : 'fade-out'
              }`}
            >
              <Image
                src={resume}
                alt={`Resume Template ${index + 1}`}
                width={220}
                height={280}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          ))}
        </div>

        <Footer />
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .gradient-text {
          background-image: linear-gradient(to right, black, blue, purple, black);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientAnimation 6s linear infinite;
        }

        @keyframes fadeZoomIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .fade-zoom-in {
          animation: fadeZoomIn 1.5s ease-in-out forwards;
          z-index: 2;
        }

        .fade-out {
          animation: fadeOut 1.5s ease-in-out forwards;
          z-index: 1;
        }
      `}</style>
    </>
  )
}

// Template Card Component
function ResumeCard({
  image,
  name,
  description,
}: {
  image: string
  name: string
  description: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative w-[400px] h-[650px] flex flex-col items-center justify-start transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 w-full h-full border border-gray-200 rounded-xl shadow-lg backdrop-blur-lg transition duration-300 ${
          isHovered
            ? 'bg-gradient-to-r from-blue-400/40 to-purple-500/40 scale-105 shadow-2xl'
            : 'bg-white/20'
        }`}
      />
      <div className="relative z-10 w-[340px] h-[450px] flex justify-center items-center mt-6">
        <Image
          src={image}
          alt={name}
          width={340}
          height={450}
          className={`rounded-lg shadow-lg transition duration-300 ${
            isHovered ? 'brightness-110 scale-105' : ''
          }`}
        />
        {/* Button overlay (now blue) */}
        <div
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
            isHovered ? 'opacity-100 scale-110' : 'opacity-0'
          }`}
        >
          <button className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            Customize This Template
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="relative z-10 text-center p-4 w-[340px] mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1 text-sm">{description}</p>
      </div>
    </div>
  )
}
