import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";

import React, { use, useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api.js";
import pdfToText from "react-pdftotext"

const Dashboard = () => {
  const {user,token}=useSelector(state=>state.auth)


  const colors = ["#14532d", "#166534", "#15803d", "#16a34a", "#22c55e"];
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showDeleteResume, setShowDeleteResume] = useState(false);
  
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const {data}=await api.get('/api/users/resumes',{headers:{
        Authorization:token
      }})
      setAllResumes(data.resumes)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  };

  const createResume = async (event) => {
    try {
      event.preventDefault();
      
      const {data}=await api.post('/api/resumes/create',{title},{headers:{
        Authorization:token
      }})
      setAllResumes([...allResumes,data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const resumeText= await pdfToText(resume)
      
      const {data}=await api.post('/api/ai/upload-resume',{title,resumeText},{headers:{
        Authorization:token
      }})
      
      setTitle("")
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      
    }
    setIsLoading(false)

    
  };

  const editTitle = async (event) => {
    try {
      event.preventDefault();
      const {data}=await api.put(`/api/resumes/update`,{resumeId:editResumeId,resumeData:{title}},{headers:{
        Authorization:token
      }})
      setAllResumes(allResumes.map(resume=>resume._id===editResumeId ?{...resume,title}:resume))
      setTitle("")
      setEditResumeId("")
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    
  };

  const deleteResume = async (resumeId) => {
    try {
      
      const {data}=await api.delete(`/api/resumes/delete/${resumeId}`,{headers:{
        Authorization:token
      }})
      setAllResumes(allResumes.filter(resume=>resume._id!==resumeId))
      setShowDeleteResume(false)
      toast.success(data.message)
      
    
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    
    
  };
  


  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark p-6 md:p-10 relative overflow-hidden">
        {/* Soft decorative background blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-dark/5 blur-[100px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-brand-dark/10">
            <div>
                <p className="text-sm font-semibold text-brand-muted uppercase tracking-wider mb-1">Overview</p>
                <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
                    Welcome back, <span className="text-brand-dark">{user?.name || 'User'}</span>
                </h1>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6 md:mt-0">
            <button
                onClick={() => setShowCreateResume(true)}
                className="flex items-center gap-2 bg-brand-dark hover:bg-brand-dark-hover text-brand-light font-medium px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand-dark/10 hover:shadow-lg hover:-translate-y-0.5"
            >
                <PlusIcon className="w-5 h-5"/>
                <span>Create Resume</span>
            </button>

            <button
                onClick={() => setShowUploadResume(true)}
                className="flex items-center gap-2 border border-brand-dark/10 bg-white text-brand-dark hover:border-brand-dark/30 hover:bg-brand-dark/5 font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >
                <UploadCloudIcon className="w-5 h-5 text-brand-muted"/>
                <span>Upload Existing</span>
            </button>
            </div>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <>
              <button
                key={index}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="bg-white border border-brand-dark/30 rounded-2xl p-6 text-left hover:border-brand-dark/50 hover:shadow-xl hover:shadow-brand-dark/5 transition-all duration-300 relative group flex flex-col h-45"
              >
                <div className="p-3 bg-brand-light rounded-xl w-fit mb-4 group-hover:bg-brand-dark/80 transition-colors duration-300">
                    <FilePenLineIcon
                    className="w-5 h-5 text-brand-dark group-hover:text-brand-light transition-colors duration-300"
                    />
                </div>

                <p className="font-bold text-lg text-brand-dark line-clamp-2 leading-tight">
                  {resume.title}
                </p>

                <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted mt-auto">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-2 rounded-lg shadow-sm border border-brand-dark/5"
                >
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="w-4 h-4 text-brand-muted hover:text-brand-dark transition-colors"
                  />
                  <TrashIcon
                    onClick={() => setShowDeleteResume(true) }
                    className="w-4 h-4 text-brand-muted hover:text-red-500 transition-colors"
                  />
                </div>
              </button>
              {showDeleteResume && (
  <div
    className="fixed inset-0 bg-brand-light/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
  >
    <div
      
      className="bg-white border border-brand-dark/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
    >
      <h2 className="text-2xl font-bold tracking-tight text-brand-dark mb-2">
        Delete Resume
      </h2>

      <p className="text-sm font-medium text-brand-muted mb-6">
        Are you sure you want to delete this resume? This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setShowDeleteResume(false)}
          className="w-1/2 border border-brand-dark/20 text-brand-dark py-3 rounded-xl font-semibold hover:bg-brand-light transition cursor-pointer"
        >
          Cancel
        </button>

        <button
          onClick={() => deleteResume(resume._id)}
          className="w-1/2 bg-brand-dark text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition cursor-pointer"
        >
          Delete
        </button>
      </div>

      <button
        onClick={() => setShowDeleteResume(false)}
        className="absolute top-6 right-6 p-2 rounded-full text-brand-muted hover:text-brand-dark hover:bg-brand-light transition cursor-pointer"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
)}

              </>
              
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-brand-light/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-brand-dark/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
            >
              <h2 className="text-2xl font-bold tracking-tight text-brand-dark mb-2">
                Create a Resume
              </h2>
              <p className="text-sm font-medium text-brand-muted mb-6">Give your new resume a starting title.</p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                required
                className="w-full bg-brand-light border border-brand-dark/10 text-brand-dark placeholder-brand-muted/70 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-brand-dark transition-colors font-medium text-sm"
              />

              <button
                type="submit"
                className="w-full bg-brand-dark text-brand-light hover:bg-brand-dark-hover py-3.5 rounded-xl font-semibold transition-colors shadow-md shadow-brand-dark/10"
              >
                Create Resume
              </button>

              <button 
                type="button"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="absolute top-6 right-6 p-2 rounded-full cursor-pointer text-brand-muted hover:text-brand-dark hover:bg-brand-light transition-colors"
              >
                  <XIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-brand-light/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-brand-dark/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
            >
              <h2 className="text-2xl font-bold tracking-tight text-brand-dark mb-2">
                Upload a Resume
              </h2>
              <p className="text-sm font-medium text-brand-muted mb-6">Upload an existing PDF to extract data.</p>


              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                required
                className="w-full bg-brand-light border border-brand-dark/10 text-brand-dark placeholder-brand-muted/70 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-brand-dark transition-colors font-medium text-sm"
              />

              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm font-bold tracking-wider uppercase text-brand-muted mb-3"
                >
                  Select PDF File
                </label>
                  <label htmlFor="resume-input" className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-brand-dark/20 bg-brand-light rounded-xl p-4 py-10 mb-8 hover:border-brand-dark/40 hover:bg-brand-dark/5 text-brand-muted hover:text-brand-dark cursor-pointer transition-all duration-300">
                    {resume ? (
                      <div className="flex flex-col items-center gap-2">
                        <FilePenLineIcon className="w-8 h-8 text-brand-dark" />
                        <p className="text-brand-dark font-semibold text-center mt-2">{resume.name}</p>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-10 h-10 stroke-[1.5]" />
                        <p className="text-sm font-medium">Click or drag specifically to upload PDF</p>
                      </>
                    )}
                  </label>

                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-brand-dark text-brand-light hover:bg-brand-dark-hover py-3.5 rounded-xl font-semibold transition-colors shadow-md shadow-brand-dark/10 flex flex-row items-center justify-center gap-2"
              >
                  {isLoading && (
                    <LoaderCircleIcon className="animate-spin w-5 h-5 text-brand-light" />
                   )}
                {isLoading ? "Analyzing PDF..." : "Upload & Analyze"}
              </button>

              <button 
                type="button"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                }}
                className="absolute top-6 right-6 p-2 rounded-full cursor-pointer text-brand-muted hover:text-brand-dark hover:bg-brand-light transition-colors"
               >
                  <XIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Edit Resume Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-brand-light/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-brand-dark/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
            >
              <h2 className="text-2xl font-bold tracking-tight text-brand-dark mb-2">
                Edit Resume
              </h2>
              <p className="text-sm font-medium text-brand-muted mb-6">Rename your existing resume.</p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                required
                className="w-full bg-brand-light border border-brand-dark/10 text-brand-dark placeholder-brand-muted/70 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-brand-dark transition-colors font-medium text-sm"
              />

              <button
                type="submit"
                 className="w-full bg-brand-dark text-brand-light hover:bg-brand-dark-hover py-3.5 rounded-xl font-semibold transition-colors shadow-md shadow-brand-dark/10"
              >
                Update Name
              </button>

              <button 
                type="button"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
                className="absolute top-6 right-6 p-2 rounded-full cursor-pointer text-brand-muted hover:text-brand-dark hover:bg-brand-light transition-colors"
               >
                  <XIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;