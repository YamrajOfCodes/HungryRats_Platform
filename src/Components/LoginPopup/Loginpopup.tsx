"use client"
import React, { act, useState } from 'react';
import { 
    Bike, 
    Utensils, 
    Eye, 
    EyeOff, 
    X
  } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, Register } from '@/Redux/Slices/User/userSlice'
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import toast from 'react-hot-toast';


  interface Popup{
    popup:string,
    hideloginpopup:()=>void

  }

const Loginpopup : React.FC<Popup> = ({popup,hideloginpopup}) => {
   const [showPassword, setShowPassword] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [active,setactive] = useState("");
      const dispatch = useAppDispatch();
      // const { login } = useSelector((state:RootState)=>state.User);

      // console.log(login);
      


      const handleLogin = (e:any)=>{
        e.preventDefault();
        const data:any = {
          email,
          password
        }

        dispatch(Login(data)).then((res)=>{
          if(res.payload){
            setEmail("");
            setPassword("");
            console.log(res.payload.token);
            localStorage.setItem("login",res.payload.token);
            
            toast.success("Login is successfull")
            // window.location.reload();
            setTimeout(() => {
              hideloginpopup();
            }, 1000);
          }
        });

      }


     



    
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      const [formData, setFormData] = useState({
        Firstname: '',
        Lastname: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
        confirmpassword: ''
      });


      const handleChange = (e:any) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

    
    
      const handleSubmit = (e:any)=>{

        e.preventDefault();
  
         const {Firstname,Lastname,email,password,mobile,address} = formData
  
          const data =  new FormData();
          data.append("Firstname",Firstname);
          data.append("Lastname",Lastname);
          data.append("email",email);
          data.append("mobile",mobile);
          data.append("address",address);
          data.append("password",password);
  
          const config = {
              "Content-Type":"multipart/formdata"
            }
            
            const newdata = {
              data,
              config
            }

            console.log(formData);
            
  
             dispatch(Register(formData)).then((res)=>{
              if(res.payload){
                setFormData({...formData,Firstname:"",Lastname:"",email:"",mobile:"",password:"",address:""});
                toast.success("Registration is successfull")
                setactive("login")
              }
             })
  
    }

      const handlePropogation = (e:any)=>{
        e.stopPropagation();
      }
    
      return (
       <>
        <div className={`min-h-screen  flex items-center justify-center p-4 w-full ${ active == "login"? "block" : "hidden"} `}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8" onClick={handlePropogation}>
          <p className='flex justify-end cursor-pointer'><X onClick={hideloginpopup}/></p> 
            <div className="text-center mb-8">
              <div className="flex justify-center space-x-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Bike className="w-8 h-8 text-blue-600" />
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Utensils className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back!</h2>
              <p className="text-gray-500 mt-2">Login to order your favorite meals</p>
            </div>
    
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
    
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
    
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-500">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-600  hover:cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors"
                onClick={handleLogin}
              >
                Sign In
              </button>
    
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
    
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors hover:cursor-not-allowed"
                  disabled
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                    />
                    <path
                      fill="#34A853"
                      d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.8 1.6-1.26 3.41-1.26 5.38s.46 3.78 1.26 5.38l3.98-3.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.07-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors hover:cursor-not-allowed"
                  disabled
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#1877F2"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
    
              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{' '}
                <a className="text-blue-600 hover:cursor-pointer hover:text-blue-700 font-medium" onClick={()=>{setactive("signup")}}>
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>


  <div className={`min-h-screen flex items-center justify-center p-4 w-full  ${popup == "signup"? "block" : "hidden"} ${active == "login"? 'hidden' : 'block'} `}>
      <div className="bg-white rounded-lg shadow-xl w-full sm:w-2/3 lg:1/2  xl:w-5/12 2xl:w-1/3 p-8" onClick={handlePropogation}>
      <p className='flex justify-end cursor-pointer'><X onClick={hideloginpopup}/></p> 
        <div className="text-center mb-8">
          <div className="flex justify-center space-x-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Bike className="w-8 h-8 text-blue-600" />
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Utensils className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Sign up to start ordering your favorite meals</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="Firstname"
                value={formData.Firstname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="John"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="Lastname"
                value={formData.Lastname}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="Doe"
                required
              />
            </div>
          </div>



          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              placeholder="123 Main St, City, State"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          

          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors mt-6"
          >
            Create Account
          </button>


          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium" onClick={()=>{setactive("login")}}>
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>

       </>
      );
}

export default Loginpopup
