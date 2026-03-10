import React from 'react'
import { FileText, Sparkles, Download } from "lucide-react";

const HowItWorks = () => {
     const howItWorksData = [
  {
    icon: <FileText className=" size-6 text-brand-dark group-hover:text-brand-light transition-colors duration-100" />,
    step: "Step 1",
    title: "Add your details",
    description:
      "Enter your experience, skills, and job role — no formatting needed.",
  },
  {
    icon: <Sparkles className="size-6 text-brand-dark group-hover:text-brand-light transition-colors duration-100" />,
    step: "Step 2",
    title: "AI builds your resume",
    description:
      "Our AI generates professional, ATS-optimized content tailored to your role.",
  },
  {
    icon: <Download className="size-6 text-brand-dark group-hover:text-brand-light transition-colors duration-100" />,
    step: "Step 3",
    title: "Customize & download",
    description:
      "Edit content, choose a template, and download your resume instantly.",
  },
];
  return (
    <section id="how-it-works" className="bg-brand-light py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-dark/5 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-dark/10 bg-white text-brand-dark font-semibold text-sm shadow-sm mb-6 uppercase tracking-wider">
                How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-dark/80 mb-6">
                Build your Resume in <br /><span className=" text-brand-dark">  Three Simple Steps</span>
            </h2>
            <p className="text-lg text-brand-muted leading-relaxed">
                From raw details to a job-ready resume in minutes. We handle the formatting, you focus on your career.
            </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {howItWorksData.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white border border-brand-dark/10 shadow-sm hover:shadow-lg hover:shadow-brand-dark/2 hover:-translate-y-1 transition-all duration-300"
            >
              
              
              <div className="p-3 inline-block rounded-xl bg-brand-dark/5 mb-6 group-hover:bg-brand-dark transition-colors duration-300">
                  {item.icon}
              </div>

              <p className="text-sm font-bold text-brand-muted uppercase tracking-wider mb-2">
                {item.step}
              </p>

              <h3 className="text-xl font-bold text-brand-dark mb-3">
                {item.title}
              </h3>

              <p className="text-brand-muted leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks
