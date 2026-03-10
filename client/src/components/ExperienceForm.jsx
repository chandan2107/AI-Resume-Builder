import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ExperienceForm = ({data,onChange}) => {

  const {token}=useSelector((state)=>state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)


    const addExperience=()=>{
        const newExperience={
            company:"",
            position:"",
            start_date:"",
            end_date:"",
            description:"",
            is_current:false
        }

        onChange([...data,newExperience])
    }

    const removeExperience=(index)=>{
        const updated=data.filter((_,i)=>i!==index)
        onChange(updated)
    }

    const updateExperience=(index,field,value)=>{
        const updated=[...data]
        updated[index]={...updated[index],[field]:value}
        onChange(updated)
    }

    const generateDescription=async(index)=>{
      setGeneratingIndex(index)
      const experience=data[index]
      const prompt=`enhance this job description  ${experience.description}  for the position of ${experience.position} at ${experience.company}.`

      try {
        const {data} =await api.post("api/ai/enhance-job-desc",{userContent:prompt},{headers:{Authorization:token}})
        updateExperience(index,"description",data.enhancedContent)
      } catch (error) {
        toast.error(error.message)
      }
      finally{
        setGeneratingIndex(-1)
      }
    }

  return (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-brand-dark">
          Professional Experience
        </h3>
        <p className="text-sm text-brand-dark">
          Add your job Expereience
        </p>
      </div>

      <button
        onClick={addExperience}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-dark text-brand-light shadow-md font-medium hover:bg-brand-dark transition shadow-sm cursor-pointer"
      >
        <Plus className="size-4" />
        Add Experience
      </button>
    </div>

    {/* Empty State */}
    {data.length === 0 ? (
      <div className="border border-dashed border-brand-dark/60 rounded-lg p-8 flex flex-col items-center text-center text-brand-dark">
        <Briefcase className="size-8 mb-2" />
        <p className="font-medium">No work experience added here</p>
        <p className="text-sm text-brand-dark">
          Click "Add Expereience" to get started.
        </p>
      </div>
    ) : (
      <div className="space-y-6">
        {data.map((experience, index) => (
          <div
            key={index}
            className="rounded-xl border border-brand-dark/40 bg-brand-light p-6 space-y-4 shadow-md"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-brand-dark font-semibold">
                Experience #{index + 1}
              </h4>
              <button
                onClick={() => removeExperience(index)}
                className="text-brand-dark hover:text-red-600 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={experience.company || ""}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                type="text"
                placeholder="Company name"
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none "
              />

              <input
                value={experience.position || ""}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                type="text"
                placeholder="Job Title"
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none "
              />

              <input
                value={experience.start_date || ""}
                onChange={(e) =>
                  updateExperience(index, "start_date", e.target.value)
                }
                type="month"
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none  "
                style={{ colorScheme: "dark" }}
              />

              <input
                value={experience.end_date || ""}
                onChange={(e) =>
                  updateExperience(index, "end_date", e.target.value)
                }
                type="month"
                disabled={experience.is_current}
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark disabled:opacity-50 focus:outline-none"
                style={{ colorScheme: "dark" }}
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-2 text-sm text-brand-dark cursor-pointer">
              <input
                type="checkbox"
                checked={experience.is_current || false}
                onChange={(e) => {
                  updateExperience(
                    index,
                    "is_current",
                    e.target.checked ? true : false
                  )
                }}
                className="accent-brand-dark cursor-pointer "
              />
              <span>Currently working here</span>
            </label>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-brand-dark">
                  Job Description
                </label>
                <button
                onClick={()=>generateDescription(index)}
                disabled={generatingIndex===index || !experience.position || !experience.company}
                 className="flex items-center gap-1 text-sm  text-brand-dark text-brand-dark transition cursor-pointer">
                  {generatingIndex===index ? (<Loader2 className='w-4 h-4 animate-spin'/>):(
                    <Sparkles className="size-4" />
                  )}
                  {generatingIndex===index ? "Generating...":"Enhance with AI"}
                  
                </button>
              </div>

              <textarea
                rows={4}
                value={experience.description || ""}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="w-full bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-dark resize-none"
                placeholder="Describe your key responsibilities and achievements"
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)
}

export default ExperienceForm
