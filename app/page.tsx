import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B4E8FE] via-[#FFFFFF] to-[#FCE6AA]">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center">
          <Link href="/" className="text-[#6B7280] text-2xl font-bold flex items-center gap-2">
            <Image 
              src="/logo.png"
              alt="Querido Dios Logo"
              width={32}
              height={32}
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
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-black"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl"> */}
          {/* Left side with illustration */}
          <div className="w-full md:w-1/2 flex items-center">
            <div className="relative w-full h-[50vh]">
              <Image 
                src="/man.png"
                alt="Person sitting illustration"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right side with content */}
          <div className="w-full md:w-1/2 p-6 space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Lorem ipsum dolor sit amet
            </h1>

            {/* Search bar */}
            <form className="relative" action="/search">
              <input
                type="text"
                name="q"
                placeholder="¿Cómo te sientes hoy?"
                className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent"
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

            {/* Action button */}
            <Link 
              href="/get-started"
              className="inline-block w-full md:w-auto px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white rounded-full font-medium text-center"
            >
              Empezar
            </Link>
          </div>
        {/* </div> */}
      </main>
    </div>
  )
}