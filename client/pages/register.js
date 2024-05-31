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
import Auth from '../components/Forms/Auth';
const register = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
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
        const {data} =await axios.post(`/register`,{
            name,
            email,
            password,
            secret
        });
            setName('')
            setEmail('')
            setPassword('')
            setSecret('')
            setLoading(false)
            setOk(data.ok);
            router.push('/login')

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
                    <h1>Register</h1>
                </div>
                <div className="row py-5">
                    <div className="col-md-6 offset-md-3">
                        <Auth
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        secret={secret}
                        setSecret={setSecret}
                        loading={loading}
                        submitHandler={submitHandler}
                        page={'register'}
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

export default register
