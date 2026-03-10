import { Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectForm = ({data,onChange}) => {

    const addProject=()=>{
        const newProject={
            name:"",
            type:"",
            description:"",
            
            
        }

        onChange([...data,newProject])
    }

    const removeProject=(index)=>{
        const updated=data.filter((_,i)=>i!==index)
        onChange(updated)
    }

    const updateProject=(index,field,value)=>{
        const updated=[...data]
        updated[index]={...updated[index],[field]:value}
        onChange(updated)
    }
  return (
    <div >
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-brand-dark">
          Projects
        </h3>
        <p className="text-sm text-brand-dark">
          Add your Projects
        </p>
      </div>

      <button
        onClick={addProject}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-dark text-brand-light shadow-md font-medium hover:bg-brand-dark transition shadow-sm"
      >
        <Plus className="size-4" />
        Add Project
      </button>
    </div>

    {/* Empty State */}
    
      <div className="space-y-6 mt-4">
        {data.map((project, index) => (
          <div
            key={index}
            className="rounded-xl border border-brand-dark/40 bg-brand-light p-6 space-y-4 shadow-md"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h4 className="text-brand-dark font-semibold">
                Project #{index + 1}
              </h4>
              <button
                onClick={() => removeProject(index)}
                className="text-brand-dark hover:text-red-600 transition"
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <input
                value={project.name || ""}
                onChange={(e) =>
                  updateProject(index, "name", e.target.value)
                }
                type="text"
                placeholder="Project name"
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none "
              />

              <input
                value={project.type || ""}
                onChange={(e) =>
                  updateProject(index, "type", e.target.value)
                }
                type="text"
                placeholder="Project Type"
                className="bg-brand-light border border-brand-dark/40 rounded-md px-3 py-2 text-sm text-brand-dark focus:outline-none "
              />

              <textarea
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                type="text"
                rows={4}
                
                placeholder="Describe your project..."
                className="w-full rounded-lg bg-brand-light border border-brand-dark/40 px-4 py-3 text-brand-dark placeholder-gray-500 focus:outline-none    transition resize-none"
              />

              
            </div>

            
            
          </div>
        ))}
      </div>
    
  </div>
  )
}

export default ProjectForm
