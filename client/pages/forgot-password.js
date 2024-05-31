import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
// import { Modal } from 'antd';
// import { Spin } from 'antd';
import { useContext } from 'react'
import { userContext } from '../context'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ForgotForm from '../components/Forms/ForgotForm'
const forgotPassword = () => {
    
    const [email,setEmail]=useState('')
    const [newpassword,setNewPassword]=useState('')
    const [secret,setSecret]=useState('')
    const [ok,setOk]=useState(false)
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const [state,setState]=useContext(userContext)
   // console.log(name,email,password,secret)
    const submitHandler=async (e)=>{
        e.preventDefault();
        try{
            setLoading(true)
           const {data} =await axios.post(`/forgot-password`,{
                email,
                newpassword,
                secret
            });
           
           // setLoading(false)
            console.log(email,newpassword,secret)
            if(data.error){
                toast.error(data.error)
                setLoading(false)
            }
            if(data.success){
             
             
              setEmail('')
              setNewPassword('')
              setSecret('')
              setOk(true)
              setLoading(false)
              router.push('/login')
            }

           // setOk(data.ok);

        }
        catch(error){
            toast.error(error.response.data)
            setLoading(false)
        }
          //  console.log(response)

        
       
    }
if(state && state.token) router.push('/')
    return (
        <div className="container-fluid">
            <div className="row py-5">
                <div className="col text-center">
                    <h1>Forgot Password</h1>
                </div>
                <div className="row py-5">
                    <div className="col-md-6 offset-md-3">
                        <ForgotForm
                        
                        email={email}
                        setEmail={setEmail}
                        newpassword={newpassword}
                        setNewPassword={setNewPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                        submitHandler={submitHandler}
                       
                        />
                    </div>
                </div>
            </div>
     {/* after successfull login */}
     {/* <div className="row">
        <div className="col">
            <Modal 
            title="Welcome"
            visible={ok}
            onCancel={()=>setOk(false)}
            footer={null}
            >
        <Link href='/login' className='btn btn-primary'>
            Login
        </Link>
            </Modal>

        </div>
     </div> */}
        </div>
    )
}

export default forgotPassword;
