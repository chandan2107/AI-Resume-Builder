import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const PremiumTemplate = ({ data, accentColor }) => {

const formatDate = (dateStr) => {
 if (!dateStr) return "";
 const [year, month] = dateStr.split("-");
 return new Date(year, month - 1).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short"
 });
};

return (
<div className="max-w-4xl mx-auto bg-white shadow-lg">

{/* Top Header */}
<div className="p-8 text-white" style={{backgroundColor:accentColor}}>

<h1 className="text-3xl font-bold">
{data.personal_info?.full_name || "Your Name"}
</h1>

<div className="flex flex-wrap gap-4 text-sm mt-3">

{data.personal_info?.email && <span>{data.personal_info.email}</span>}
{data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
{data.personal_info?.location && <span>{data.personal_info.location}</span>}

</div>

</div>

<div className="p-8 text-gray-800">

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

<h2 className="text-xl font-semibold mb-4" style={{color:accentColor}}>
Experience
</h2>

{data.experience.map((exp,index)=>(
<div key={index} className="mb-4">

<h3 className="font-semibold">{exp.position}</h3>
<p className="text-gray-700">{exp.company}</p>

<p className="text-sm text-gray-500">
{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
</p>

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
<p className="text-sm">{proj.description}</p>
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
<h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
<p>{edu.institution}</p>
<p className="text-sm text-gray-500">{formatDate(edu.graduation_date)}</p>
</div>
))}

</section>
)}

{/* Skills */}
{data.skills?.length > 0 && (
<section>

<h2 className="text-xl font-semibold mb-3" style={{color:accentColor}}>
Skills
</h2>

<div className="flex flex-wrap gap-3">

{data.skills.map((skill,index)=>(
<span key={index} className="px-3 py-1 bg-gray-100 rounded text-sm">
{skill}
</span>
))}

</div>

</section>
)}

</div>

</div>
);
};

export default PremiumTemplate;