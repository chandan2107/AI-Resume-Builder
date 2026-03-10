import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({data,onChange,removeBackground,setRemoveBackground}) => {

  const handleChange=(field,value)=>{
    onChange({...data,[field]:value})
  }

  const fileds=[
    {key:"full_name",label:"Full Name",icon:User,type:"text",required:true},
    {key:"email",label:"Email Address",icon:Mail,type:"email",required:true},
    {key:"phone",label:"Phone Number",icon:Phone,type:"tel"},
    {key:"location",label:"Location",icon:MapPin,type:"text"},
    {key:"profession",label:"Profession",icon:BriefcaseBusiness,type:"text"},
    {key:"linkedin",label:"LinkedIn Profile",icon:Linkedin,type:"url"},
    {key:"website",label:"personal Website",icon:Globe,type:"url"}

  ]
  
  return (
  <div className="space-y-5">
    <h3 className="text-xl font-semibold text-brand-dark">
      Personal Information
    </h3>
    <p className="text-sm text-brand-dark">
      Get started with personal information
    </p>

    <div className="flex items-center gap-4">
      <label className="cursor-pointer">
        {data.image ? ( 
          <img
            src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
            alt="user-image"
            className="w-20 h-20 p-0.5 rounded-full object-cover border-1 border-brand-dark/70 shadow-md"
          /> 
        ) : (
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-brand-dark flex flex-col items-center justify-center text-brand-dark text-center gap-1 hover:bg-brand-dark/10 transition">
            <User className="w-6 h-6 " />
            <span className="text-xs leading-tight ">Upload<br />image
        </span>
            
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e)=>{handleChange("image",e.target.files[0])}}
        />
      </label>

      {typeof data.image === "object" && (
        <div className="flex items-center gap-3 bg-brand-light border border-brand-dark/20 rounded-2xl px-3 py-2 text-brand-dark">
          <p className="text-sm text-brand-dark/80">Remove background</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={()=>{
                setRemoveBackground(prev=>!prev)
              }}
              checked={removeBackground}
            />
            <div className="w-9 h-5 bg-brand-dark/40 peer-focus:outline-none rounded-full peer peer-checked:bg-brand-dark transition"></div>
            <span className="absolute left-1.5 top-1 w-3 h-3 bg-brand-light rounded-full transition peer-checked:translate-x-3"></span>
          </label>
        </div>
      )}
      
    </div>

    {fileds.map((field)=>{
      const Icon = field.icon
      return(
        <div key={field.key} className="space-y-1">
          <label className="flex items-center gap-2 text-sm text-brand-dark">
            <Icon className="size-4 text-brand-dark" />
            {field.label}
            {field.required && <span className="text-brand-dark">*</span>}
          </label>
          <input
            type={field.type}
            value={data[field.key] || ""}
            onChange={(e)=>handleChange(field.key,e.target.value)}
            className="w-full rounded-md bg-brand-light border border-brand-dark/40 px-3 py-2 text-brand-dark placeholder-gray-500 focus:outline-none transition"
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            required={field.required}
          />
        </div>
      )
    })}
  </div>
)
}

export default PersonalInfoForm
