import React from 'react'
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
        <section className='bg-brand-light py-16 px-6 md:px-10'>
            <div className="max-w-6xl mx-auto bg-brand-dark rounded-4xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between text-center md:text-left shadow-2xl overflow-hidden relative bg-linear">
                
                {/* Subtle background glow inside the dark card */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-light/5 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 mb-10 md:mb-0 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-brand-light mb-4 leading-tight">
                        Ready to land your next job?
                    </h2>
                    <p className="text-lg md:text-xl text-brand-muted font-medium">
                        Your AI-powered resume is just one click away. Build it now, completely free.
                    </p>
                </div>
                
                <div className="relative z-10 flex-shrink-0">
                    <Link to="/app" className="inline-block px-10 py-4 bg-white hover:bg-brand-light text-brand-dark rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CallToAction
