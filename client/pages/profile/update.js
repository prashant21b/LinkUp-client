import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useContext } from 'react'
import { userContext } from '../../context'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Auth from '../../components/Forms/Auth';
import { useEffect } from 'react'
import Avatar from 'react-avatar';
import {Blocks} from 'react-loader-spinner'
import { FaCloudUploadAlt } from "react-icons/fa";
const ProfileUpdate = () => {
    const [username,setUsername]=useState('')
    const [about,setAbout]=useState('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [secret,setSecret]=useState('')
    const [ok,setOk]=useState(false)
    const [loading,setLoading]=useState(false)
    const router=useRouter()
    const [state,setState]=useContext(userContext)
    const [image,setImage]=useState({})
    const [uploading,setUploading]=useState(false)
   // console.log(name,email,password,secret)
    const submitHandler=async (e)=>{
        e.preventDefault();
       // console.log(username)
        try{
            setLoading(true)
           const {data} =await axios.put(`/profile-update`,{
               username,
               about,
                name,
                email,
                password,
                secret,
                image
            });
           // console.log(data)
           let auth=JSON.parse(localStorage.getItem("auth"))
           auth.user=data
           localStorage.setItem("auth",JSON.stringify(auth))
           setState({...state,user:data})
           setOk(true);
            setLoading(false)
            
            toast.success("Profile updated successfully")
       router.push('/profile/update')
        }
        catch(error){
            toast.error(error.response.data)
            setLoading(false)
        }
          //  console.log(response)

        
       
    }
    const handleImage=async(e)=>{
        const file=e.target.files[0]
        let formData=new FormData();
        formData.append("images",file)
        console.log([...formData])
        setLoading(true)
        try{

           const response=await axios.post(`/posts/upload-image`,formData)
            console.log(response.data)
            setImage({
                url:response.data.url,
                public_id:response.data.public_id,
            })
            setLoading(false)
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
     }
    console.log(state.user)
//if(state && state.token) router.push('/')
    useEffect(()=>{
        if(state && state.user) {
            setUsername(state.user.username)
            setAbout(state.user.about)
            setName(state.user.name)
            setEmail(state.user.email)
            setImage(state.user.image)

        }
    },[state && state.user])
    return (
        <div className="container-fluid">
            <div className="row py-5">
                <div className="col text-center">
                    <h1>Profile Update</h1>
                </div>
                <div className="row py-5">
                    <div className="col-md-6 offset-md-3">
                        {/* image upload */}
                        <label className='d-flex justify-content-center h1'  >
                {/* <FaCloudUploadAlt className='mt-2' /> */}
                
                {
                    image && image.url ?(<Avatar size="100"  src={image.url}/>):(loading)?(<Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                        /> ):(<FaCloudUploadAlt className='mt-2' />)
                }
                    <input onChange={handleImage} type="file" accept='images/*' hidden/>
                </label>
                        <Auth
                        profileUpdate={true}
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
                        username={username}
                        setUsername={setUsername}
                        about={about}
                        setAbout={setAbout}
                        />
                    </div>
                </div>
            </div>
     
        </div>
    )
}

export default ProfileUpdate
