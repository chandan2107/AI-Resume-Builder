import { Github, Linkedin, Mail } from 'lucide-react';
import React from 'react'

const Footer = () => {
  return (
        <>
            
            
            <footer id="contact" className="flex flex-col items-center justify-center w-full py-16 bg-brand-dark text-brand-light mt-auto ">
                
                <h2 className="text-3xl font-semibold text-brand-light">BuildMyCV<span className="text-brand-muted font-bold">.AI</span></h2>
                <p className="mt-4 text-center text-brand-muted text-sm font-medium">Copyright © {new Date().getFullYear()} Chandan Naik. All rights reserved.</p>
                <div className="flex items-center gap-6 mt-6">
                    <a href="#" className="p-2 rounded-full bg-brand-light/10 text-brand-light hover:bg-brand-light hover:text-brand-dark transition-all duration-300">
                        <Linkedin size={20}/>
                    </a>
                    <a href="#" className="p-2 rounded-full bg-brand-light/10 text-brand-light hover:bg-brand-light hover:text-brand-dark transition-all duration-300">
                        <Mail size={20}/>
                    </a>
                    <a href="#" className="p-2 rounded-full bg-brand-light/10 text-brand-light hover:bg-brand-light hover:text-brand-dark transition-all duration-300">
                        <Github size={20} />
                    </a>
                </div>
            </footer>
        </>
    );
}

export default Footer
