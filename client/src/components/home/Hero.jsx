import React from "react";
import {Link } from 'react-router-dom'
import { ChevronRight, FileUser, Video } from 'lucide-react';
import { useSelector } from "react-redux";

const Hero = () => {
  const {user}= useSelector(state=>state.auth)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <>
      

      
      {/* Background container with realistic subtle gradient mapping the "Light" color */}
      <section className="relative flex flex-col items-center bg-brand-light text-brand-dark text-sm pb-23 overflow-hidden">
        
        {/* Subtle top decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-dark/5 blur-[120px] rounded-full pointer-events-none"></div>
      
        <nav className="z-50 mt-3 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 bg-brand-light/70 backdrop-blur-md border-b border-brand-dark/10 sticky top-0">
          <div className="flex w-27 justify-between items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-brand-dark">BuildMyCV<span className="text-brand-muted font-black">.AI</span></h2>
          </div>

          <div className="hidden md:flex items-center gap-8 px-8 py-2.5 rounded-full  border border-brand-dark/10 bg-white/50 backdrop-blur-sm shadow-sm font-medium ">
              <a href="#" className="text-sm text-brand-dark hover:text-brand-dark transition-colors">Home</a>
              <a href="#features" className="text-sm text-brand-dark hover:text-brand-dark transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-brand-dark hover:text-brand-dark transition-colors">How It works</a>
              <a href="#contact" className="text-sm text-brand-dark hover:text-brand-dark transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to='/app?state=login' className="px-6 py-2.5 text-brand-dark border border-brand-dark/30 font-medium hover:bg-brand-dark hover:text-brand-light transition-colors rounded-full" hidden={user}>
              Sign In
            </Link>
            <Link to='/app?state=login' className="bg-brand-dark hover:bg-brand-dark-hover transition-colors px-6 py-2.5 text-brand-light font-medium rounded-full shadow-md shadow-brand-dark/20 cursor-pointer" hidden={user}>
              Get Started
            </Link>
            <Link to='/app' className="bg-brand-dark hover:bg-brand-dark-hover transition-colors px-6 py-2.5 text-brand-light font-medium rounded-full shadow-lg shadow-brand-dark/20 cursor-pointer" hidden={!user}>
              Go to Dashboard
            </Link>
          </div>
              
          <button id="open-menu" onClick={() => setMobileOpen(true)} className="md:hidden active:scale-90 transition text-brand-dark" aria-label='Open menu'>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
          </button>
        </nav>

        {/* --------Mobile Navbar ------------ */}
        <div id="mobile-navLinks" aria-hidden={!mobileOpen} className={`fixed inset-0 z-[100] bg-brand-light/95 backdrop-blur-xl flex flex-col items-center justify-center text-xl font-medium gap-8 md:hidden transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <a href="#" className="text-brand-dark" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="#features" className="text-brand-dark" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-brand-dark" onClick={() => setMobileOpen(false)}>How It Works</a>
          <a href="#contact" className="text-brand-dark" onClick={() => setMobileOpen(false)}>Contact</a>
          <div className="flex flex-col gap-4 mt-8 w-full px-12">
             <Link to='/app?state=login' onClick={() => setMobileOpen(false)} className="w-full py-3 text-center border border-brand-dark/20 text-brand-dark rounded-full" hidden={user}>Sign In</Link>
             <Link to='/app?state=login' onClick={() => setMobileOpen(false)} className="w-full py-3 text-center bg-brand-dark text-brand-light rounded-full" hidden={user}>Get Started</Link>
          </div>
          <button id="close-menu" onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 p-2 text-brand-muted hover:text-brand-dark transition-colors rounded-full bg-brand-dark/5" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Badge */}
        <a href="" className="group flex items-center gap-2 rounded-full border border-brand-dark/15 bg-white shadow-sm p-1.5 pr-4 mt-28 hover:shadow-md transition-all duration-300">
          <span className="bg-brand-dark text-brand-light text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </span>
          <div className="flex items-center text-brand-dark font-medium text-sm group-hover:text-brand-muted transition-colors">
            <span>AI Feature added</span>
            <ChevronRight size={16} className="ml-1"/>
          </div>
        </a>

        <h1 className="text-center text-5xl md:text-7xl mt-8 font-black tracking-tight text-brand-dark max-w-5xl px-4 leading-[1.1]">
          Land your dream job with <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark via-brand-muted to-brand-dark">
            AI-powered resumes
          </span>
        </h1>
        <p className="text-center text-lg md:text-xl text-brand-muted max-w-2xl mt-6 px-4 font-medium leading-relaxed">
          Create premium, ATS-friendly resumes that open doors to new opportunities in minutes, not hours.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
  <Link
    to="app"
    className="group relative bg-brand-dark hover:bg-brand-dark-hover text-brand-light font-medium rounded-full px-8 py-3.5 shadow-lg shadow-brand-dark/20 w-full sm:w-auto text-center text-base transition-all duration-300 transform hover:scale-105"
  >
    <span className="flex items-center justify-center gap-2">
      Build Your Resume
      
      <span className="transform transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </span>

    {/* glow effect */}
    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 bg-white blur-md transition duration-300"></span>
  </Link>
</div>

        {/* Decorative divider fading into background */}
        <div className='w-full max-w-4xl h-0.5 mt-20 bg-gradient-to-r from-transparent via-brand-dark/80 to-transparent'></div>

      </section>
    </>
  )
};

export default Hero;
