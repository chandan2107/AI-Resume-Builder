
import imagekit from "../configs/imageKit.js";
import Resume from "../models/resume.model.js";
import fs from "fs";

//controller for creating new resume
//POST: /api/resumes/create


export const createResume = async (req,res) => {
    try {
        const userId=req.userId;
        const {title}=req.body;

        //create new ressume
        const newResume=await Resume.create({
            userId,
            title
        })

        //return success message
        return res.status(201).json({
            message:'Resume created successfully',
            resume:newResume
        })

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//controller for deleting resume
//DELETE: /api/resumes/delete

export const deleteResume = async (req,res) => {
    try {
        const userId=req.userId;
        const {resumeId}=req.params;

        
        await Resume.findOneAndDelete({userId,_id:resumeId})

        //return success message
        return res.status(200).json({
            message:'Resume deleted successfully'
        })

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}


//get user resume by id
//GET: /api/resumes/get

export const getResumeById = async (req,res) => {
    try {
        const userId=req.userId;
        const {resumeId}=req.params;

        const resume =await Resume.findOne({userId,_id:resumeId})

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        
        resume.__v=undefined
        resume.createdAt=undefined
        resume.updatedAt=undefined

        //return success message
        return res.status(200).json({ resume})

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}


//get resume by id public
//GET /api/resumes/public

export const getPublicResumeById = async (req,res) => {
    try {
        
        const {resumeId}=req.params;

        const resume =await Resume.findOne({public:true,_id:resumeId})

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        

        //return success message
        return res.status(200).json({ resume})

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}


//controller for updating  a resume
//PUT: /apo/resumes/update

export const updateResume = async (req,res) => {
    try {
        
        const userId=req.userId;
        const {resumeId,resumeData,removeBackground}=req.body
        const image=req.file;
        
        

        let resumeDataCopy;
        if(typeof resumeData === "string"){
            resumeDataCopy= await JSON.parse(resumeData)
        }else{
            resumeDataCopy=structuredClone(resumeData)
        }

        if(image){

            // Read the file from disk as a buffer, then convert to base64 string
            const imageBufferData = fs.readFileSync(image.path);
            const fileString = imageBufferData.toString('base64');
            
            const response = await imagekit.files.upload({
                file: fileString,
                fileName:'resume.png',
                folder:"user-resumes",
                transformation:{
                    pre:"w-300,h-300,fo-face,z-0.75"+(removeBackground? ",e-bgremove,f-png":"")
                }
            });

            resumeDataCopy.personal_info.image=response.url;
            
            // Clean up the temporary file from disk after upload
            try {
                fs.unlinkSync(image.path);
            } catch(e) {
                console.log("Could not delete temp file:", e);
            }
        }

        const resume=await Resume.findOneAndUpdate({userId, _id:resumeId},resumeDataCopy,{new:true})

        

        

        //return success message
        return res.status(200).json({
            message:'Resume updated successfully',
            resume
        })

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}