import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CorporateTemplate = ({ data, accentColor }) => {

const formatDate = (dateStr) => {
 if (!dateStr) return "";
 const [year, month] = dateStr.split("-");
 return new Date(year, month - 1).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short"
 });
};

return (
<div className="max-w-4xl mx-auto bg-white p-8 text-gray-800">

{/* Header */}
<header className="mb-8">

<h1 className="text-3xl font-bold" style={{color:accentColor}}>
{data.personal_info?.full_name || "Your Name"}
</h1>

<div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">

{data.personal_info?.email && (
<span className="flex items-center gap-1">
<Mail className="size-4"/>
{data.personal_info.email}
</span>
)}

{data.personal_info?.phone && (
<span className="flex items-center gap-1">
<Phone className="size-4"/>
{data.personal_info.phone}
</span>
)}

{data.personal_info?.location && (
<span className="flex items-center gap-1">
<MapPin className="size-4"/>
{data.personal_info.location}
</span>
)}

{data.personal_info?.linkedin && (
<span className="flex items-center gap-1 break-all">
<Linkedin className="size-4"/>
{data.personal_info.linkedin}
</span>
)}

{data.personal_info?.website && (
<span className="flex items-center gap-1 break-all">
<Globe className="size-4"/>
{data.personal_info.website}
</span>
)}

</div>

</header>

{/* Summary */}
{data.professional_summary && (
<section className="mb-6">
<h2 className="text-lg font-semibold mb-2 border-b pb-1" style={{borderColor:accentColor}}>
Professional Summary
</h2>

<p>{data.professional_summary}</p>
</section>
)}

{/* Experience */}
{data.experience?.length > 0 && (
<section className="mb-6">

<h2 className="text-lg font-semibold mb-3 border-b pb-1" style={{borderColor:accentColor}}>
Experience
</h2>

{data.experience.map((exp,index)=>(
<div key={index} className="mb-4">

<div className="flex justify-between">

<div>
<h3 className="font-semibold">{exp.position}</h3>
<p className="text-gray-700">{exp.company}</p>
</div>

<span className="text-sm text-gray-500">
{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
</span>

</div>

<p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>

</div>
))}

</section>
)}

{/* Projects */}
{data.project?.length > 0 && (
<section className="mb-6">

<h2 className="text-lg font-semibold mb-3 border-b pb-1" style={{borderColor:accentColor}}>
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

<h2 className="text-lg font-semibold mb-3 border-b pb-1" style={{borderColor:accentColor}}>
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

{/* Skills */}
{data.skills?.length > 0 && (
<section>

<h2 className="text-lg font-semibold mb-3 border-b pb-1" style={{borderColor:accentColor}}>
Skills
</h2>

<div className="flex flex-wrap gap-2">

{data.skills.map((skill,index)=>(
<span key={index} className="px-3 py-1 border rounded text-sm">
{skill}
</span>
))}

</div>

</section>
)}

</div>
);
};

export default CorporateTemplate;