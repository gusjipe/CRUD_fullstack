import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';
import { useState } from 'react';

const Login = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const [errors, setErrors] = useState(null);

    const {setToken,setUser} = useStateContext();
    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passRef.current.value,
          }
          console.log(payload);
          setErrors(null)
          
          axiosClient.post('/login', payload)
            .then(({data})=>{
              setUser(data.user)
              setToken(data.token)
            })
            .catch(err =>{
              const response = err.response;
              if (response && response.status === 422){
                if(response.data.errors){
                    setErrors(response.data.errors)
                } else{
                    setErrors({
                        email: [ response.data.message]
                    })

                }
                
                
              }
            })
    }
  return (
    
    <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form action="" onSubmit={onSubmit}>
                <h1 className='title'>Login into your account</h1>
                {errors && <div className='alert'>{Object.keys(errors).map((key)=>(<p key={key}> {errors[key][0]}</p>))}</div>}
                <input ref={emailRef} type="email" placeholder='Email' />
                <input ref={passRef} type="password" placeholder='Password' />
                <button className='btn btn-block'>Login</button>
                <p className="message">Not Registered ? <Link to="/signup">Create a new account</Link></p>

            </form>
        </div>

    </div>
  )
}

export default Login