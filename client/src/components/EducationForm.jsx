import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const EducationForm = ({data,onChange}) => {

    const addEducation=()=>{
        const newEducation={
            institution:"",
            degree:"",
            field:"",
            graduation_date:"",
            gpa:""
            
        }

        onChange([...data,newEducation])
    }

    const removeEducation=(index)=>{
        const updated=data.filter((_,i)=>i!==index)
        onChange(updated)
    }

    const updateEducation=(index,field,value)=>{
        const updated=[...data]
        updated[index]={...updated[index],[field]:value}
        onChange(updated)
    }
  return (
    <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-brand-dark">
          Education
        </h3>
        <p className="text-sm text-brand-dark">
          Add your Education Details
        </p>
      </div>

      <button
        onClick={addEducation}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-dark text-brand-light shadow-md font-medium hover:bg-brand-dark transition shadow-sm cursor-pointer"
      >
        <Plus className="size-4" />
        Add Education
      </button>
    </div>

    {/* Empty State */}
    {data.length === 0 ? (
      <div className="border border-dashed border-brand-dark/60 rounded-lg p-8 flex flex-col items-center text-center text-brand-dark">
        <GraduationCap className="size-8 mb-2" />
        <p className="font-medium">No education added here</p>
        <p className="text-sm text-brand-dark">
          Click "Add Education" to get started.
        </p>
      </div>
    ) : (
      <div className="space-y-6">
        {data.map((education, index) => (
          <div
            key={index}
            className="rounded-xl border border-brand-dark/40 bg-brand-light p-6 space-y-4 shadow-md"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-brand-dark font-semibold">
                Education #{index + 1}
              </h4>
              <button
                onClick={() => removeEducation(index)}
                className="text-brand-dark hover:text-red-600 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={education.institution || ""}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                type="text"
                placeholder="Institution name"
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none  focus:outline-none"
              />

              <input
                value={education.degree || ""}
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
                type="text"
                placeholder="Degree (e.g., Bachelor's, Masters)"
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none  focus:outline-none"
              />

              <input
                value={education.field || ""}
                onChange={(e) =>
                  updateEducation(index, "field", e.target.value)
                }
                type="text"
                placeholder='Field of study'
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none  "
                
              />

              <input
                value={education.graduation_date || ""}
                onChange={(e) =>
                  updateEducation(index, "graduation_date", e.target.value)
                }
                type="month"
                style={{ colorScheme: "dark" }}
                
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark disabled:opacity-50"
                
              />

              <input
                value={education.gpa || ""}
                onChange={(e) =>
                  updateEducation(index, "gpa", e.target.value)
                }
                type="text"
                placeholder='GPA (optional)'
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark disabled:opacity-50"
                
              />
            </div>

            
            
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default EducationForm
