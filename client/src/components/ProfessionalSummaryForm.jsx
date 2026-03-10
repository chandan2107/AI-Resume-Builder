import { Loader2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from "react-hot-toast";
const ProfessionalSummaryForm = ({data,onChange,setResumeData}) => {

  const {token}=useSelector((state)=>state.auth)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt=`enhance my professional summary for "${data}"`
      const response =await api.post("/api/ai/enhance-pro-sum",{userContent:prompt},{headers:{Authorization:token}})
      setResumeData(prev=>({...prev,professional_summary:response.data.enhancedContent}))
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    finally{
      setIsGenerating(false)
    }
  }

  return (
  <div className="space-y-5">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-brand-dark">
          Professional Summary
        </h3>
        <p className="text-sm text-brand-dark">
          Add summary for your resume here
        </p>
      </div>

      <button
      disabled={isGenerating} 
      onClick={generateSummary}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-dark text-brand-light shadow-md font-medium hover:bg-brand-dark transition shadow-sm">
        {isGenerating ? (<Loader2 className='size-4 animate-spin'/>):(
          <Sparkles className="size-4" />
        )}
        {isGenerating ? "Enhancing...":"AI Enhance"}
      </button>
    </div>

    <div className="space-y-2">
      <textarea
        value={data || ""}
        onChange={(e)=>onChange(e.target.value)}
        rows={7}
        className="w-full rounded-lg bg-brand-light border border-brand-dark/40 px-4 py-3 text-brand-dark placeholder-gray-500 focus:outline-none  transition resize-none"
        placeholder="Results-driven professional with hands-on experience in delivering efficient solutions, strong problem-solving skills, and a passion for continuous learning."
      />
      <p className="text-xs text-brand-dark">
        Write 2–4 concise lines highlighting your experience, key skills, and career goals.
      </p>
    </div>
  </div>
)
}

export default ProfessionalSummaryForm
