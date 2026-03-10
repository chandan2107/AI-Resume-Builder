import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const HarvardTemplate = ({ data, accentColor }) => {

const formatDate = (dateStr) => {
 if (!dateStr) return "";
 const [year, month] = dateStr.split("-");
 return new Date(year, month - 1).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short"
 });
};

return (
<div className="max-w-3xl mx-auto p-10 bg-white text-gray-900">

<h1 className="text-3xl font-bold text-center">
{data.personal_info?.full_name}
</h1>

<div className="text-center text-sm text-gray-600 mb-6">
{data.personal_info?.email} | {data.personal_info?.phone} | {data.personal_info?.location}
</div>

{/* Summary */}
{data.professional_summary && (
<section className="mb-6">
<h2 className="font-bold border-b mb-2">Summary</h2>
<p>{data.professional_summary}</p>
</section>
)}

{/* Experience */}
{data.experience?.length > 0 && (
<section className="mb-6">
<h2 className="font-bold border-b mb-2">Experience</h2>

{data.experience.map((exp,index)=>(
<div key={index} className="mb-3">
<div className="flex justify-between">
<h3 className="font-semibold">{exp.position}</h3>
<span>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
</div>

<p>{exp.company}</p>
<p className="text-sm whitespace-pre-line">{exp.description}</p>
</div>
))}
</section>
)}

{/* Projects */}
{data.project?.length > 0 && (
<section className="mb-6">
<h2 className="font-bold border-b mb-2">Projects</h2>

{data.project.map((proj,index)=>(
<div key={index}>
<h3 className="font-semibold">{proj.name}</h3>
<p className="text-sm">{proj.description}</p>
</div>
))}
</section>
)}

{/* Education */}
{data.education?.length > 0 && (
<section className="mb-6">
<h2 className="font-bold border-b mb-2">Education</h2>

{data.education.map((edu,index)=>(
<div key={index}>
<h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
<p>{edu.institution}</p>
<p className="text-sm">{formatDate(edu.graduation_date)}</p>
</div>
))}
</section>
)}

{/* Skills */}
{data.skills?.length > 0 && (
<section>
<h2 className="font-bold border-b mb-2">Skills</h2>

<div className="flex flex-wrap gap-3">
{data.skills.map((skill,index)=>(
<span key={index}>• {skill}</span>
))}
</div>
</section>
)}

</div>
);
};

export default HarvardTemplate;