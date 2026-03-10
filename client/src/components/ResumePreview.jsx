import React from 'react'
import ModernTemplate from "./templates/ModernTemplate"
import MinimalTemplate from "./templates/MinimalTemplate"
import ClassicTemplate from "./templates/ClassicTemplate"
import MinimalImageTemplate from "./templates/MinimalImageTemplate"
import ModernSidebarTemplate from './templates/ModernSidebarTemplate'
import MinimalClean from './templates/MinimalClean'
import CreativeTemplate from './templates/CreativeTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'
import TimelineTemplate from './templates/TimelineTemplate'
import HarvardTemplate from './templates/HarvardTemplate'
import CorporateTemplate from './templates/CorporateTemplate'
import PremiumTemplate from './templates/PremiumTemplate'

const ResumePreview = ({data,template,accentColor,classes=""}) => {

    const renderTemplate = () => {
    switch (template) {

        case "modern":
            return <ModernTemplate data={data} accentColor={accentColor} />

        case "minimal":
            return <MinimalTemplate data={data} accentColor={accentColor} />

        case "minimal-image":
            return <MinimalImageTemplate data={data} accentColor={accentColor} />

        case "modern-sidebar":
            return <ModernSidebarTemplate data={data} accentColor={accentColor} />

        case "minimal-clean":
            return <MinimalClean data={data} accentColor={accentColor} />

        case "harvard":
            return <HarvardTemplate data={data} accentColor={accentColor} />

        case "creative":
            return <CreativeTemplate data={data} accentColor={accentColor} />

        case "professional":
            return <ProfessionalTemplate data={data} accentColor={accentColor} />

        case "timeline":
            return <TimelineTemplate data={data} accentColor={accentColor} />

        case "corporate":
            return <CorporateTemplate data={data} accentColor={accentColor} />

        case "premium":
            return <PremiumTemplate data={data} accentColor={accentColor} />

        

        default:
            return <ClassicTemplate data={data} accentColor={accentColor} />
    }
}

  return (
  <div className="w-full flex justify-center bg-brand-light">
    <div
      id="resume-preview"
      className={
        "w-full bg-brand-light border border-brand-dark/40 shadow-xl rounded-lg overflow-hidden print:shadow-none print:border-none " +
        classes
      }
    >
      {renderTemplate()}
    </div>

    <style>
      {`
        @page {
          size:A4;
          margin: 12mm;
        }

        @media print {
          html,
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        }
      `}
    </style>
  </div>
)
}

export default ResumePreview
