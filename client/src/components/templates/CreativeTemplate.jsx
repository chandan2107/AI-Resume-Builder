import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor }) => {

const formatDate = (dateStr) => {
 if (!dateStr) return "";
 const [year, month] = dateStr.split("-");
 return new Date(year, month - 1).toLocaleDateString("en-US", {
  year: "numeric",
  month: "short"
 });
};

return (
<div className="max-w-4xl mx-auto bg-white p-8">

<header className="mb-8">
<h1 className="text-4xl font-bold" style={{color:accentColor}}>
{data.personal_info?.full_name}
</h1>

<div className="flex flex-wrap gap-4 text-sm mt-2">
<span>{data.personal_info?.email}</span>
<span>{data.personal_info?.phone}</span>
<span>{data.personal_info?.location}</span>
</div>
</header>

{data.professional_summary && (
<section className="mb-6">
<h2 className="text-lg font-bold mb-2" style={{color:accentColor}}>About</h2>
<p>{data.professional_summary}</p>
</section>
)}

{/* Experience */}
{data.experience?.length > 0 && (
<section className="mb-6">
<h2 className="text-lg font-bold mb-3" style={{color:accentColor}}>Experience</h2>

{data.experience.map((exp,index)=>(
<div key={index} className="mb-3">
<h3 className="font-semibold">{exp.position}</h3>
<p>{exp.company}</p>
<p className="text-sm">{exp.description}</p>
</div>
))}
</section>
)}

{/* Projects */}
{data.project?.length > 0 && (
<section className="mb-6">
<h2 className="text-lg font-bold mb-2" style={{color:accentColor}}>Projects</h2>

{data.project.map((proj,index)=>(
<div key={index}>
<h3 className="font-semibold">{proj.name}</h3>
<p>{proj.description}</p>
</div>
))}
</section>
)}

{/* Education */}
{data.education?.length > 0 && (
<section className="mb-6">
<h2 className="text-lg font-bold mb-2" style={{color:accentColor}}>Education</h2>

{data.education.map((edu,index)=>(
<div key={index}>
<h3 className="font-semibold">{edu.degree}</h3>
<p>{edu.institution}</p>
</div>
))}
</section>
)}

{/* Skills */}
{data.skills?.length > 0 && (
<section>
<h2 className="text-lg font-bold mb-2" style={{color:accentColor}}>Skills</h2>

<div className="flex flex-wrap gap-2">
{data.skills.map((skill,index)=>(
<span key={index} className="border px-3 py-1 rounded">
{skill}
</span>
))}
</div>
</section>
)}

</div>
);
};

export default CreativeTemplate;