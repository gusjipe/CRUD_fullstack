import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';
import { useState } from 'react';



const Signup = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();

  const [errors, setErrors] = useState(null);

  const {setToken,setUser} = useStateContext();

  const onSubmit = (ev) =>{
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
      password_confirmation: passConfirmRef.current.value
    }
    console.log(payload);
    
    axiosClient.post('/signup', payload)
      .then(({data})=>{
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err =>{
        const response = err.response;
        if (response && response.status === 422){
          
          setErrors(response.data.errors)
        }
      })
  }
  return (
    
       <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className='title'>Sign Up</h1>
                    {errors && <div className='alert'>{Object.keys(errors).map((key)=>(<p key={key}> {errors[key][0]}</p>))}</div>}
                    <input ref={ nameRef} type="text" placeholder='Username' />
                    <input ref={emailRef} type="email" placeholder='Email Address' />
                    <input ref={passRef} type="password" placeholder='Password' />
                    <input ref={passConfirmRef} type="password" placeholder='Confirm Password' />
                    <button className='btn btn-block'>Signup</button>
                    <p className="message">Already a member ? <Link to="/login">Login</Link></p>

                </form>
            </div>

        </div>
    
  )
}

export default Signup