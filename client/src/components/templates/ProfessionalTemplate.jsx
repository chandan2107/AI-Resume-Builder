import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {

const formatDate = (dateStr) => {
 if (!dateStr) return "";
 const [year, month] = dateStr.split("-");
 return new Date(year, month - 1).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short"
 });
};

return (
<div className="max-w-5xl mx-auto grid grid-cols-3 bg-white shadow-lg">

{/* Sidebar */}
<div className="col-span-1 p-6 bg-gray-100">

<h1 className="text-2xl font-bold mb-4">
{data.personal_info?.full_name || "Your Name"}
</h1>

<div className="space-y-2 text-sm text-gray-700">

{data.personal_info?.email && (
<div className="flex gap-2">
<Mail className="size-4"/>
<span>{data.personal_info.email}</span>
</div>
)}

{data.personal_info?.phone && (
<div className="flex gap-2">
<Phone className="size-4"/>
<span>{data.personal_info.phone}</span>
</div>
)}

{data.personal_info?.location && (
<div className="flex gap-2">
<MapPin className="size-4"/>
<span>{data.personal_info.location}</span>
</div>
)}

{data.personal_info?.linkedin && (
<div className="flex gap-2 break-all">
<Linkedin className="size-4"/>
<span>{data.personal_info.linkedin}</span>
</div>
)}

{data.personal_info?.website && (
<div className="flex gap-2 break-all">
<Globe className="size-4"/>
<span>{data.personal_info.website}</span>
</div>
)}

</div>

{/* Skills */}
{data.skills?.length > 0 && (
<div className="mt-8">
<h2 className="font-semibold mb-2" style={{color:accentColor}}>
Skills
</h2>

<div className="space-y-1">
{data.skills.map((skill,index)=>(
<p key={index}>• {skill}</p>
))}
</div>
</div>
)}

</div>

{/* Main Content */}
<div className="col-span-2 p-8 text-gray-800">

{/* Summary */}
{data.professional_summary && (
<section className="mb-6">
<h2 className="text-xl font-semibold mb-2" style={{color:accentColor}}>
Professional Summary
</h2>

<p>{data.professional_summary}</p>
</section>
)}

{/* Experience */}
{data.experience?.length > 0 && (
<section className="mb-6">

<h2 className="text-xl font-semibold mb-3" style={{color:accentColor}}>
Experience
</h2>

{data.experience.map((exp,index)=>(
<div key={index} className="mb-4">

<div className="flex justify-between">
<h3 className="font-semibold">{exp.position}</h3>

<span className="text-sm text-gray-500">
{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
</span>
</div>

<p className="text-gray-700">{exp.company}</p>

<p className="text-sm whitespace-pre-line">{exp.description}</p>

</div>
))}

</section>
)}

{/* Projects */}
{data.project?.length > 0 && (
<section className="mb-6">

<h2 className="text-xl font-semibold mb-3" style={{color:accentColor}}>
Projects
</h2>

{data.project.map((proj,index)=>(
<div key={index} className="mb-3">
<h3 className="font-semibold">{proj.name}</h3>
<p className="text-sm text-gray-700">{proj.description}</p>
</div>
))}

</section>
)}

{/* Education */}
{data.education?.length > 0 && (
<section className="mb-6">

<h2 className="text-xl font-semibold mb-3" style={{color:accentColor}}>
Education
</h2>

{data.education.map((edu,index)=>(
<div key={index} className="mb-3">

<h3 className="font-semibold">
{edu.degree} {edu.field && `in ${edu.field}`}
</h3>

<p>{edu.institution}</p>

<p className="text-sm text-gray-500">
{formatDate(edu.graduation_date)}
</p>

</div>
))}

</section>
)}

</div>

</div>
);
};

export default ProfessionalTemplate;