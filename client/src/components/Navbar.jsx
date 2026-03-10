import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import { logout } from '../app/features/authSlice'
import { LogOut, User } from 'lucide-react'

const Navbar = () => {
    
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const logoutUser=()=>{
        navigate("/")
        dispatch(logout())
    }

  return (
    <div className='sticky top-0 z-50 bg-brand-light/80 backdrop-blur-xl border-b border-brand-dark/10 transition-all'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-6 py-3 md:py-4'>
            <Link to='/' className="group">
                <div className="flex items-center gap-2">
                    
                    <h2 className="text-xl font-bold tracking-tight text-brand-dark">BuildMyCV<span className="text-brand-muted font-black">.AI</span></h2>
                </div>
            </Link>
            
            <div className='flex items-center gap-4'>
                
                
                <button 
                  onClick={logoutUser} 
                  className='flex items-center gap-2 bg-brand-dark hover:bg-brand-dark-hover transition-all duration-300 px-5 py-2.5 text-brand-light font-medium rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 shadow-brand-dark/20 cursor-pointer text-sm'
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
