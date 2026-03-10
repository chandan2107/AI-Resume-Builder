import React, { useState } from "react";
import { Check, Palette } from 'lucide-react'

const ColorPicker = ({selectedColor,onChange}) => {
  const colors = [
  { name: "Navy Blue", value: "#1E3A8A" },
  { name: "Royal Blue", value: "#2563EB" },
  { name: "Sky Blue", value: "#0EA5E9" },
  { name: "Teal", value: "#0F766E" },

  { name: "Emerald", value: "#10B981" },
  { name: "Green", value: "#22C55E" },
  { name: "Lime", value: "#84CC16" },
  { name: "Olive", value: "#6B8E23" },

  { name: "Indigo", value: "#4F46E5" },
  { name: "Purple", value: "#9333EA" },
  { name: "Violet", value: "#7C3AED" },

  { name: "Magenta", value: "#C026D3" },
  { name: "Pink", value: "#EC4899" },
  { name: "Rose", value: "#F43F5E" },

  { name: "Red", value: "#EF4444" },
  { name: "Coral", value: "#FB7185" },

  { name: "Orange", value: "#F97316" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Yellow", value: "#EAB308" },

  { name: "Brown", value: "#92400E" },
  { name: "Chocolate", value: "#7C2D12" },

  { name: "Slate", value: "#475569" },
  { name: "Gray", value: "#6B7280" },
  { name: "Charcoal", value: "#374151" }
];

  const [isOpen, setIsOpen] = useState(false)
  return (
  <div className="relative">
    <button 
      onClick={()=>setIsOpen(!isOpen)} 
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-light border border-brand-dark/40 text-brand-dark hover:bg-brand-dark hover:text-brand-light transition shadow-sm"
    >
      <Palette size={16} />
      <span className="max-sm:hidden font-medium text-sm">Accent</span>
    </button>

    {isOpen && (
      <div className="absolute mt-3 w-72 rounded-xl bg-brand-light border border-brand-dark/40 shadow-2xl p-4 grid grid-cols-4 gap-4 z-50">
        {colors.map((color)=>(
          <div
            key={color.value}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={()=>{
                onChange(color.value)
                setIsOpen(false)
            }}
          >
            <div 
              className="relative w-12 h-12 rounded-full border-2 border-brand-dark/10 group-hover:scale-110 transition-transform duration-200 flex items-center justify-center"
              style={{backgroundColor:color.value}}
            >
              {selectedColor===color.value && (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-light/30 rounded-full">
                  <Check className="w-5 h-5 text-brand-dark" />
                </div>
              )}
            </div>

            <p className="text-xs text-brand-dark group-hover:text-brand-dark transition">
              {color.name}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
)
};

export default ColorPicker;
