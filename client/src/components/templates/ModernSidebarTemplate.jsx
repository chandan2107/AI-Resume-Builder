import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernSidebarTemplate = ({ data, accentColor }) => {

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg flex">

      {/* Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: accentColor }}>
        <h1 className="text-2xl font-bold mb-4">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="space-y-2 text-sm">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              {data.personal_info.email}
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              {data.personal_info.phone}
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              {data.personal_info.location}
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-2 break-all">
              <Linkedin className="size-4" />
              {data.personal_info.linkedin}
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2 break-all">
              <Globe className="size-4" />
              {data.personal_info.website}
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="space-y-1 text-sm">
              {data.skills.map((skill, index) => (
                <div key={index}>• {skill}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 text-gray-800">

        {data.professional_summary && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
              Professional Summary
            </h2>
            <p>{data.professional_summary}</p>
          </section>
        )}

        {data.experience && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
              Experience
            </h2>

            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-sm text-gray-600">{exp.company}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                </p>

                <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.project && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
              Projects
            </h2>

            {data.project.map((proj, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold">{proj.name}</h3>
                <p className="text-sm text-gray-600">{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.education && (
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
              Education
            </h2>

            {data.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <h3 className="font-semibold">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">
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

export default ModernSidebarTemplate;