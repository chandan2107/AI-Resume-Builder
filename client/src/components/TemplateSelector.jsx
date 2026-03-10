import { Check, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({selectedTemplate,onChange}) => {
    const [isOpen, setIsOpen] = useState(false)

    const templates = [
    {
        id:"classic",
        name:"Classic",
        preview:"A clean, traditional resume format with clear sections and professional typography"
    },
    {
        id:"modern",
        name:"Modern",
        preview:"Sleek design with strategic use of color and modern font choices"
    },
    {
        id:"minimal",
        name:"Minimal",
        preview:"Ultra-clean design that puts your content front and center"
    },
    {
        id:"minimal-image",
        name:"Minimal Image",
        preview:"Minimal design with a single image and clean typography"
    },
    {
        id:"modern-sidebar",
        name:"Modern Sidebar",
        preview:"Professional two-column layout with a colored sidebar for contact details and skills"
    },
    {
        id:"minimal-clean",
        name:"Minimal Clean",
        preview:"Simple ATS-friendly resume with minimal styling and clear typography"
    },
    {
        id:"harvard",
        name:"Harvard",
        preview:"Classic academic resume format widely used in universities and research roles"
    },
    {
        id:"creative",
        name:"Creative",
        preview:"Stylish layout perfect for designers and creative professionals"
    },
    {
        id:"professional",
        name:"Professional",
        preview:"Structured corporate resume layout ideal for business and tech roles"
    },
    {
        id:"timeline",
        name:"Timeline",
        preview:"Modern vertical timeline layout highlighting career progression"
    },
    {
 id:"corporate",
 name:"Corporate",
 preview:"Professional corporate resume layout inspired by Resume.io"
},
{
 id:"premium",
 name:"Premium",
 preview:"Modern premium resume with bold header like Zety templates"
}
]
  return (
  <div className="relative">
    <button 
      onClick={()=>setIsOpen(!isOpen)}
      className="flex items-center gap-2 rounded-md bg-brand-light border border-brand-dark/40 px-4 py-2 text-brand-dark hover:bg-brand-dark hover:text-brand-light transition shadow-sm"
    >
      <Layout size={14} /> 
      <span className="max-sm:hidden font-medium text-sm  ">Template</span>
    </button>

    {isOpen && (
      <div className="absolute mt-3 w-80 sm:w-116 max-h-100 overflow-y-auto rounded-xl bg-brand-light border border-brand-dark/40 shadow-2xl z-50 p-3 grid grid-cols-2 gap-3 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-brand-dark/20 [&::-webkit-scrollbar-thumb]:rounded-full">
        {templates.map((template)=>(
          <div
            key={template.id}
            onClick={()=>{
              onChange(template.id)
              setIsOpen(false)
            }}
            className={`relative cursor-pointer rounded-lg border border-brand-dark/60 p-3 transition
              ${
                selectedTemplate===template.id
                  ? "border-brand-dark bg-brand-dark/10"
                  : "border-brand-dark hover:border-brand-dark hover:bg-brand-light"
              }
            `}
          >
            {selectedTemplate===template.id && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 rounded-full bg-brand-dark flex items-center justify-center">
                  <Check className="w-3 h-3 text-brand-dark" />
                </div>
              </div>
            )} 

            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-brand-dark">
                {template.name}
              </h4>
              <div className="text-xs text-brand-dark border border-dashed border-brand-dark/40 rounded-md p-2 bg-brand-light">
                {template.preview}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)
}

export default TemplateSelector
