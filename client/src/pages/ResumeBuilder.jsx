import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api.js";
import toast from "react-hot-toast";
const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const {token}=useSelector((state)=>state.auth)
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    try {
      const {data}=await api.get("/api/resumes/get/"+resumeId,{headers:{Authorization:token}})

      if(data.resume){
        setResumeData(data.resume)
        document.title = data.resume.title 
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const fetchResume = async () => {
      await loadExistingResume();
    };

    fetchResume();
  }, []);


  const changeResumeVisibility = async () => {
    try {
      const formData= new FormData()
      formData.append("resumeId",resumeId)
      formData.append("resumeData",JSON.stringify({public:!resumeData.public}))
      const {data}= await api.put("/api/resumes/update",formData,{headers:{Authorization:token}})

      setResumeData({...resumeData,public:!resumeData.public})
      toast.success(data.message)
    } catch (error) {
      console.error("Error saving resume: ",error)
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share is not supported on this browser");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      //remove image from updatedResume Data
      if(typeof resumeData.personal_info.image==="object"){
        delete updatedResumeData.personal_info.image
      }

      const formData= new FormData()
      formData.append("resumeId",resumeId)
      formData.append("resumeData",JSON.stringify(updatedResumeData))
      removeBackground && formData.append("removeBackground","yes")

      typeof resumeData.personal_info.image==="object" && formData.append("image",resumeData.personal_info.image)

      const {data}= await api.put("/api/resumes/update",formData,{headers:{Authorization:token}})

      setResumeData(data.resume)
      toast.success(data.message)


    } catch (error) {
      console.error("Error saving resume: ",error)

    }
  }

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark">
      <div className="px-6 py-4 border-b border-brand-dark/40">
        <Link
          to={"/app"}
          className="flex items-center gap-1 text-brand-dark hover:text-brand-dark transition font-small"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* left panel-form */}
          <div className="relative lg:col-span-5 h-fit rounded-xl overflow-hidden bg-brand-light border border-brand-dark/40 shadow-xl">
            <div className="p-6 space-y-6">
              {/* progressbar using activeSectionIndex */}
              
              <hr
                className="border-2 border-brand-dark rounded-full transition-all duration-300"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />
              {/* section navigation */}
              <div className="flex items-center justify-between">
                <div className="text-brand-dark font-semibold flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) => {
                      setResumeData((prev) => ({ ...prev, template }));
                    }}
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>
                <div className="flex items-center gap-3">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      disabled={activeSectionIndex === 0}
                      className="flex items-center gap-1 px-4 py-2 rounded-md bg-brand-light text-brand-dark hover:bg-brand-dark hover:text-brand-light transition text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-md font-medium transition text-sm ${
                      activeSectionIndex === sections.length - 1
                        ? "bg-brand-light text-brand-dark cursor-not-allowed"
                        : "bg-brand-dark text-brand-light shadow-md hover:bg-brand-dark"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* form content */}
              <div className="bg-brand-light border border-brand-dark/30 rounded-lg p-5 shadow-inner min-h-75">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => {
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }));
                    }}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, project: data }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>

              <button onClick={()=>{toast.promise(saveResume,{loading:"Saving..."})}} className="px-4 py-2 rounded-md border border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-light transition">
                Save Changes
              </button>
            </div>
          </div>

          {/* right panel-preview*/}
          <div className="lg:col-span-7 rounded-xl bg-brand-light border border-brand-dark/50 shadow-xl p-3 flex flex-col  ">
            <div className="rounded-lg   bg-brand-light/60 px-5 py-3 flex justify-end  text-brand-dark">
              {/* ---buttons--- */}

              {/* ---share button--- */}
              <div className="flex items-center gap-3">
                {resumeData.public && (
                  <button onClick={handleShare} className="flex items-center gap-2 px-3 py-2 rounded-md bg-brand-light hover:bg-brand-dark/20 text-brand-dark text-sm font-medium transition duration-200">
                    <Share2Icon className="w-5 h-5 text-brand-dark" />Share
                  </button>
                )}

                {/* ---public or private button--- */}
                <button onClick={changeResumeVisibility} className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-light hover:bg-brand-dark/20 text-brand-dark text-sm font-medium transition duration-200">
                  {resumeData.public ? (
                    <EyeIcon className="w-5 h-5 text-brand-dark" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5 text-brand-dark" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>

                {/* ---download button--- */}
                <button onClick={downloadResume} className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-dark text-brand-light shadow-md hover:bg-brand-dark text-sm font-semibold transition duration-200">
                  <DownloadIcon className="w-5 h-5" />
                  Download
                </button>
              </div>
            </div>

            {/* ---resume preview--- */}
            <div className="flex-1 overflow-auto rounded-lg   bg-brand-light p-4">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
