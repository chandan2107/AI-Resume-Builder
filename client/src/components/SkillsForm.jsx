import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({data,onChange}) => {

    const [newSkill, setNewSkill] = useState("")

    const addSkill=()=>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data,newSkill.trim()])
            setNewSkill("")
        }
    }

    const removeSkill=(indexToRemove)=>{
        onChange(data.filter((_,index)=>index!==indexToRemove))
    }

    const handleKeyPress=(e)=>{
        if(e.key==="Enter"){
            e.preventDefault();
            addSkill();
        }
    }


  return (
  <div className="space-y-6">
    {/* Header */}
    <div className="space-y-1">
      <h3 className="text-lg font-semibold text-brand-dark">
        Skills
      </h3>
      <p className="text-sm text-brand-dark">
        Add your technical and soft skils
      </p>
    </div>

    {/* Input Section */}
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Enter a skill (e.g., JavaScript, Project Management)"
        className="flex-1 bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none "
        onChange={(e) => setNewSkill(e.target.value)}
        value={newSkill}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={addSkill}
        disabled={!newSkill.trim}
        className="flex items-center gap-1 px-4 py-2 rounded-md bg-brand-dark text-brand-light shadow-md text-sm font-medium hover:bg-brand-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus className="size-4" />
        Add
      </button>
    </div>

    {/* Skills List */}
    {data.length > 0 ? (
      <div className="flex flex-wrap gap-3">
        {data.map((skill, index) => (
          <span
            key={index}
            className="flex items-center  gap-2 bg-brand-dark/30 text-brand-dark text-sm px-3 py-1 rounded-2xl "
          >
            {skill}
            <button
              onClick={() => removeSkill(index)}
              className="text-brand-dark hover:text-brand-dark transition"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    ) : (
      <div className="border border-dashed border-brand-dark/60 rounded-lg p-6 flex flex-col items-center text-center text-brand-dark">
        <Sparkles className="size-6 mb-2" />
        <p className="font-medium">No skills added yet.</p>
        <p className="text-sm text-brand-dark">
          Add your technical and soft skills above.
        </p>
      </div>
    )}

    {/* Tip Section */}
    <div className="bg-brand-dark/20 border border-brand-dark/40 rounded-lg p-4 text-sm text-brand-dark">
      <p>
        <strong className="text-brand-dark">Tip:</strong> Add 8–12 relevent skills.
        Include both technical skills (programming languages, tools) and soft skills
        (leadership, communication).
      </p>
    </div>
  </div>
)
}

export default SkillsForm
