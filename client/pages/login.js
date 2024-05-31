import React from 'react'
import { useState,useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Auth from '../components/Forms/Auth';
import { userContext } from '../context'
const login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [state,setState]=useContext(userContext)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.post(`/login`,
      {

        email,
        password,

      }
    );
    //console.log(data)
    setState({
      user:data.user,
      token:data.token
    })
    //save in local storage
    localStorage.setItem("auth",JSON.stringify(data))
     // console.log(data)
       router.push('/')
    }
    catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
      setLoading(false);
    
    }
    //  console.log(response)



  }
  if(state && state.token) router.push('/')
  return (
    <div className="container-fluid">
      <div className="row py-5">
        <div className="col text-center">
          <h1>login</h1>
        </div>
        <div className="row py-5">
          <div className="col-md-6 offset-md-3">
            <Auth
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              submitHandler={submitHandler}
              page={'login'}
            />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default login
