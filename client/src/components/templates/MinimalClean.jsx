import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const MinimalClean = ({ data, accentColor }) => {

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

      <h1 className="text-3xl font-bold mb-3">
        {data.personal_info?.full_name || "Your Name"}
      </h1>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
        {data.personal_info?.email && (
          <span className="flex items-center gap-1">
            <Mail className="size-4" />
            {data.personal_info.email}
          </span>
        )}

        {data.personal_info?.phone && (
          <span className="flex items-center gap-1">
            <Phone className="size-4" />
            {data.personal_info.phone}
          </span>
        )}

        {data.personal_info?.location && (
          <span className="flex items-center gap-1">
            <MapPin className="size-4" />
            {data.personal_info.location}
          </span>
        )}
      </div>

      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="font-semibold border-b pb-1 mb-2" style={{ borderColor: accentColor }}>
            Summary
          </h2>
          <p>{data.professional_summary}</p>
        </section>
      )}

      {data.experience && (
        <section className="mb-6">
          <h2 className="font-semibold border-b pb-1 mb-2" style={{ borderColor: accentColor }}>
            Experience
          </h2>

          {data.experience.map((exp, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between">
                <h3 className="font-semibold">{exp.position}</h3>
                <span className="text-sm text-gray-500">
                  {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </span>
              </div>

              <p className="text-sm text-gray-600">{exp.company}</p>
              <p className="text-sm whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.project && (
        <section className="mb-6">
          <h2 className="font-semibold border-b pb-1 mb-2" style={{ borderColor: accentColor }}>
            Projects
          </h2>

          {data.project.map((proj, index) => (
            <div key={index}>
              <h3 className="font-semibold">{proj.name}</h3>
              <p className="text-sm text-gray-700">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education && (
        <section className="mb-6">
          <h2 className="font-semibold border-b pb-1 mb-2" style={{ borderColor: accentColor }}>
            Education
          </h2>

          {data.education.map((edu, index) => (
            <div key={index}>
              <h3 className="font-semibold">
                {edu.degree} {edu.field && `in ${edu.field}`}
              </h3>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                {formatDate(edu.graduation_date)}
              </p>
            </div>
          ))}
        </section>
      )}

      {data.skills && (
        <section>
          <h2 className="font-semibold border-b pb-1 mb-2" style={{ borderColor: accentColor }}>
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-sm border rounded"
                style={{ borderColor: accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default MinimalClean;