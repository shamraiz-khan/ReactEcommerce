import React, {  useState } from 'react'
import { useForm } from 'react-hook-form'
import {  useAuth } from '../context/AuthContext'
import {useNavigate} from "react-router-dom";
const Auth = () => {
    const [mode , setMode] = useState("signup");
    const [error , setError] = useState(null);
    const {signUp ,  login , user} = useAuth();
    const navigate = useNavigate();
    const {register , handleSubmit , formState : {
        errors

    }} = useForm()
    const onSubmit = (data) =>{
      setError(null);
      let result ;
      if(mode === "signup"){

       result = signUp(data.email , data.password)
      }else {
       result = login(data.email , data.password)

      }
      if(result.success){
        navigate("/");
      }else{
        setError(result.error);
      }

    }
  return (
    <div className='container' style={{marginTop : "2rem"}}>
      <div className="auth-container">
        {user && <p>User logged in: {user.email} </p>}
        <h1 className="page-title">{mode ===  "signup" ? "Sign up" : "Login"}</h1>
        <form  className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className='error-message'>{error}</div>}
            <div>
                <div className="form-group">
                <label htmlFor="email" className='form-lable'>Email</label>
                <input type="text" name='email' className='form-input' id='email' {...register("email", {
          required: "Email is required",
        })}/>
                {errors.email && <span className='form-error'>{errors.email.message}</span>}

                </div>

                 <div className="form-group">
                <label htmlFor="email" className='form-lable'>Password</label>
                <input type="password" name='password' className='form-input' id='email' {...register("password", {
          required: "Password is required",minLength : {
            value : 6,
            message : "Password must be atleast 6 characters"
          },
          maxLength : {
            value : 12,
            message : "Password must be atleast of 12 characters"
          }

        })}/>
{errors.password && <span className='form-error'>{errors.password.message}</span>}
                </div>
            </div>
            <button type='submit' className='btn btn-primary'>{mode ===  "signup" ? "Sign up" : "Login"}</button>
        </form>
        <div className="auth-switch">
            {mode === "signup" ? (<p>Already have an account? <span className='auth-link' onClick={()=> setMode("login")}>Login</span></p>):

            (<p>Don't have an account? <span className='auth-link' onClick={()=> setMode("signup")}>Signup</span></p>)
            }
        </div>
      </div>
    </div>
  )
}

export default Auth
