import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'


const Preview = () => {

  const {resumeId}=useParams()
  const [resumeData, setResumeData] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const loadResume=async ()=>{
    try {
      const {data} =await api.get("/api/resumes/public/"+resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  
  useEffect(()=>{
    loadResume()
  },[])


  return resumeData ? (
  <div className="min-h-screen flex items-center justify-center bg-brand-light p-6 ">
    <div className="max-w-5xl rounded-xl border border-brand-dark/40 bg-brand-light shadow-xl ">
      <ResumePreview
        data={resumeData}
        template={resumeData.template}
        accentColor={resumeData.accent_color}
      />
    </div>
  </div>
) : (
  <div className="min-h-screen flex items-center justify-center bg-brand-light px-4">
    {isLoading ? (
      <Loader />
    ) : (
      <div className="text-center space-y-4 rounded-xl border border-brand-dark/20 bg-brand-light p-10 shadow-lg">
        <p className="text-lg font-medium text-brand-dark">
          Resume not found
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-brand-dark hover:bg-brand-dark/20  font-medium border border-brand-dark p-2 rounded-lg"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Go to home page
        </a>
      </div>
    )}
  </div>
)
}

export default Preview
