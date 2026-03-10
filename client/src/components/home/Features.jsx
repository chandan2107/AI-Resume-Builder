import React from 'react'
import {SlidersHorizontal, Sparkles, CheckCircle} from "lucide-react"

const Features = () => {
  const featuresData = [
        {
            icon: <Sparkles className="size-6 text-brand-dark group-hover:text-brand-light transition-colors duration-100"/>,
            title: "AI-Powered Resumes",
            description: "Create professional, role-specific resumes in minutes using artificial intelligence tailored to your career.",
        },
        {
            icon: <CheckCircle className="size-6 text-brand-dark group-hover:text-brand-light transition-colors duration-100" />,
            title: "ATS-Friendly Formats",
            description: "Structured to perfectly pass applicant tracking systems and impress modern recruiters.",
        },
        {
            icon: <SlidersHorizontal className="size-6 text-brand-dark group-hover:text-brand-light transition-colors duration-100" />,
            title: "Full Control & Flexibility",
            description: "Easily edit content, layout, and style nuances to exactly match your career goals.",
        }
    ];

    return (
        <section id="features" className="bg-brand-light py-10 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-dark/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-brand-dark/10 bg-white text-brand-dark font-semibold text-sm shadow-sm mb-6 uppercase tracking-wider">
                        Core Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-dark/80 mb-6">
                        Built entirely for <span className="text-brand-dark">Job Seekers</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed">
                        Precision AI-powered tools designed specifically to help you create stunning resumes that get noticed fast.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    {featuresData.map((feature, index) => (
                        <div key={index} className="group relative">
                            {/* Hover glow effect */}
                            <div className="absolute -inset-px bg-gradient-to-b from-brand-dark/20 to-brand-dark/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                            
                            <div className="relative h-full p-8 rounded-2xl border border-brand-dark/10 bg-white hover:border-brand-dark/30 shadow-sm hover:shadow-xl hover:shadow-brand-dark/5 transition-all duration-300 flex flex-col items-start translate-y-0 group-hover:-translate-y-1">
                                <div className="p-3 inline-block rounded-xl bg-brand-dark/5 mb-6 group-hover:bg-brand-dark/70 transition-colors duration-300 ">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-brand-muted leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
