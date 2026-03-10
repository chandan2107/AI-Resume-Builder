import { Lock, Mail, UserRound } from 'lucide-react'
import React from 'react'
import api from '../configs/api.js'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice.js'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch= useDispatch()
  const query = new URLSearchParams(window.location.search)
  const urlState=query.get('state')
  const [state, setState] = React.useState(urlState || "login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const {data} = await api.post(`/api/users/${state}`,formData)
          dispatch(login(data))
          localStorage.setItem('token',data.token)
          toast.success(data.message)
        } catch (error) {
          toast(error?.response?.data?.message || error.message)
          
        }

    }

    return (
  <div className="min-h-screen flex items-center justify-center bg-brand-light relative overflow-hidden">
    
    {/* Decorative background blurs */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-dark/5 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-dark/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-[420px] text-center border border-brand-dark/20 bg-white rounded-3xl p-10 shadow-xl shadow-brand-dark/5 z-10 mx-4"
    >
      

      <h1 className="text-brand-dark text-3xl font-bold tracking-tight">
        {state === "login" ? "Welcome back" : "Create account"}
      </h1>

      <p className="text-brand-muted text-sm mt-3 mb-8 font-medium">
        {state === "login" ? "Please sign in to continue" : "Sign up to start building"}
      </p>

      {state !== "login" && (
        <div className="flex items-center mb-5 w-full bg-brand-light border border-brand-dark/10 focus-within:border-brand-dark h-12 rounded-xl overflow-hidden pl-4 pr-4 gap-3 transition-colors shadow-sm">
          <UserRound className='text-brand-muted' size={18} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full bg-transparent text-brand-dark placeholder-brand-muted/70 outline-none text-sm font-medium"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="flex items-center mb-5 w-full bg-brand-light border border-brand-dark/10 focus-within:border-brand-dark h-12 rounded-xl overflow-hidden pl-4 pr-4 gap-3 transition-colors shadow-sm">
        <Mail className='text-brand-muted' size={18} />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full bg-transparent text-brand-dark placeholder-brand-muted/70 outline-none text-sm font-medium"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center w-full bg-brand-light border border-brand-dark/10 focus-within:border-brand-dark h-12 rounded-xl overflow-hidden pl-4 pr-4 gap-3 transition-colors shadow-sm">
        <Lock className='text-brand-muted' size={18} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full bg-transparent text-brand-dark placeholder-brand-muted/70 outline-none text-sm font-medium"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      

      <button
        type="submit"
        className="w-full h-12 mt-8 rounded-xl text-brand-light bg-brand-dark hover:bg-brand-dark-hover transition-colors font-semibold text-base shadow-md shadow-brand-dark/10"
      >
        {state === "login" ? "Sign In" : "Sign Up"}
      </button>

      <p className="text-brand-muted text-sm mt-8 font-medium">
        {state === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <strong 
            onClick={() => {
                setState((prev) => (prev === "login" ? "register" : "login"));
                setFormData({name: '', email: '', password: ''});
            }}
            className="text-brand-dark hover:text-brand-muted transition-colors cursor-pointer ml-1.5 cursor-pointer underline underline-offset-4"
        >
          {state === "login" ? "Sign up" : "Log in"}
        </strong>
      </p>
    </form>
  </div>
);
}

export default Login
