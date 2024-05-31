import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserRouter from '../../../components/router/UserRouter';
import axios from 'axios';
import CreatePostForm from '../../../components/Forms/CreatePostForm';
import { toast } from 'react-toastify';
 const editPost = () => {
    const router=useRouter()
   // console.log(router.query._id)
    const _id=router.query._id
    const [post,setPost]=useState({})
    const [content,setContent]=useState ("");
    const [image,setImage]=useState({})
    const [loading,setLoading]=useState(false)
   // const [state,setState]=useContext(userContext)
    const  getPostBYId=async()=>{
        try{
          const {data}=await axios.get(`/posts/user-post/${_id}`);
          setPost(data)
          setContent(data.content)
          setImage(data.image)

          //console.log("data->",data)
        }
        catch(error){
            console.log(error)
        }
    }
    console.log("data->",post)


     //image upload
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

     const postSubmit=async(e)=>{
        e.preventDefault()
        //console.log("post",content)
        try{
             const response=await axios.put(`/posts/update-post/${_id}`,{
                 content,
                 image
             })
            console.log("response",response.data)
             if(response.data.error){
             toast.error(response.data.error)
             }
             else{
               // fetchUserPosts()
              //  setContent("")
               // setImage("")
                toast.success("Post Updated successfully")
                router.push('/dashboard')
             }
        }
        catch(error){
            console.log("Error in postSubmit",error)

        }
    }

    useEffect(()=>{
          if(_id) getPostBYId()
    },[_id])

  return (
    <UserRouter>
    <div className='container'>
  <div className='row py-5'>
      <div className='col'>
         <h1 className='text-center'>Edit Post</h1>
      </div>
  </div>
  <div className='row py-3'>
      <div className='col-md-8 offset-md-2'>
          <CreatePostForm
          content={content}
          setContent={setContent}
          postSubmit={postSubmit}
          handleImage={handleImage}
          loading={loading}
          setLoading={setLoading}
          image={image}
          setImage={setImage}
          />
          
      </div>
      {/* <div className='col-md-4'>
       Sidebar
      </div> */}
  </div>
 </div>
  
 </UserRouter>
  )
}

export default editPost;
