'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [inputText, setInputText] = useState<string>('')
  const [randomImage, setRandomImage] = useState<string>('man1.png')
  const router = useRouter();

  useEffect(() => {
    const imageNumber = Math.floor(Math.random() * 3) + 1; // For man1.png, man2.png, man3.png
    setRandomImage(`man${imageNumber}.png`);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/desktop?text=${encodeURIComponent(inputText)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B4E8FE] via-[#FFFFFF] to-[#FCE6AA]">
      {/* Navigation */}
      <nav className="flex w-[100vw] justify-between items-center md:p-4 pt-4 absolute">
        <div className="flex items-center">
          <Link href="/" className="text-[#6B7280] text-md font-bold flex items-center gap-4 ml-8 md:ml-16">
            <Image 
              src="/logo.png"
              alt="Querido Dios Logo"
              width={43}
              height={40}
              className="object-contain"
            />
            Querido Dios
          </Link>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="px-4 py-2 text-gray-500 hover:text-gray-900"
          >
            Log in
          </Link>
          <Link 
            href="/signup"
            className="px-4 py-2 rounded-md border border-black hover:border-gray-600 hover:text-gray-600 text-black mr-8 md:mr-16"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <main className="flex min-h-screen">
        {/* Image section - hidden on mobile */}
        <div className="hidden md:flex w-[40%] items-center">
          <div className="relative w-full h-[55%]">
            <Image 
              src={`/${randomImage}`}
              alt="Person sitting illustration"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </div>

        {/* Content section - centered on mobile */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-0">
          <div className="max-w-md w-full">
            <h1 className="text-[2.75rem] text-center font-bold text-gray-900 font-poppins">
              Lorem ipsum dolor sit amet
            </h1>

            <form className="relative mt-8" onSubmit={handleSubmit}>
              <input
                type="text"
                name="q"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="¿Cómo te sientes hoy?"
                className="w-full px-6 py-4 rounded-2xl border border-gray-200 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 text-[#1E255E]"
              />
              <button 
                type="submit"
                className="absolute right-5 top-1/2 transform -translate-y-1/2"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <div className="flex justify-center mt-8">
              <Link 
                href={`/desktop?text=${encodeURIComponent(inputText)}`}
                className="inline-block w-full md:w-[35%] px-8 py-4 bg-[#FE875C] text-white rounded-full font-medium text-center shadow-[0_5px_10px_0px_rgba(0,0,0,0.15)]"
              >
                Empezar
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
