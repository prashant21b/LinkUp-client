import React, { useState, useEffect } from 'react'
import UserRouter from '../components/router/UserRouter';
import CreatePostForm from '../components/Forms/CreatePostForm';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { userContext } from '../context';
import axios from 'axios';
import PostList from '../components/cards/PostList';
import { People } from '../components/cards/People';
import Link from 'next/link';
import { postContext } from '../context/post';
import Profile from './user/Profile';
// import  {Model} from 'antd'
const dashboard = () => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState({})
    const [loading, setLoading] = useState(false)
    const [state, setState] = useContext(userContext)
    const [post, setPost] = useState([])
    const [people, setPeople] = useState([])
    // const [show, setShow] = useState(false);
    // const [comment,setComment]=useState('')
    // const [visible,setVisible]=useState(false)
    // const [currentPost,setCurrentPost]=useState({})
    const [posts,setPosts]=useContext(postContext)
   
    const router = useRouter();
    const fetchUserPosts = async () => {
        console.log("auto")
        try {
            const response = await axios.get(`/posts/user-post`)
            //console.log(response.data)
            setPosts(response.data)
            setPost(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const findPeople = async (req, res) => {
        try {
            const { data } = await axios.get(`/find-people`)
            setPeople(data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (state && state.token) {
            fetchUserPosts();
            findPeople();
        }
    }, [state && state.token])
    const postSubmit = async (e) => {
        e.preventDefault()
        console.log("post", content)
        try {
            const response = await axios.post(`/posts/create-post`, {
                content,
                image
            })
            console.log("response", response.data)
            if (response.data.error) {
                toast.error(response.data.error)
            }
            else {

                fetchUserPosts()
                setContent("")
                setImage("")
                toast.success("Post created")
            }
        }
        catch (error) {
            console.log("Error in postSubmit", error)

        }
    }
    const deleteHandler = async (post) => {
        try {
            const answer = window.confirm("Are you sure ?")
            if (!answer) return;

            const { data } = await axios.delete(`/posts/delete-post/${post._id}`)
            if (data.ok) {
                toast.error("Post Deleted sucessfully")
                fetchUserPosts()
            }
            else {
                toast.error("Some thing went wrong")
            }
        }
        catch (error) {
            console.log(error)
            toast.error("error in post deletion")
        }
    }
    //image upload
    const handleImage = async (e) => {
        const file = e.target.files[0]
        let formData = new FormData();
        formData.append("images", file)
        console.log([...formData])
        setLoading(true)
        try {

            const response = await axios.post(`/posts/upload-image`, formData)
            console.log(response.data)
            setImage({
                url: response.data.url,
                public_id: response.data.public_id,
            })
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleFollow = async (userId) => {
        try {
            const { data } = await axios.put(`/user-follow`, {
                _id: userId
            })

            //update local storage
            let auth = JSON.parse(localStorage.getItem("auth"))
            auth.user = data;
            localStorage.setItem('auth', JSON.stringify(auth))

            //update context
            setState({ ...state, user: data });
            let filtered = people.filter((p) => p._id !== userId);
            setPeople(filtered)
            fetchUserPosts()
        
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleLike=async(_id)=>{
        try{
            const {data}=await axios.put(`/posts/like`,{_id:_id})
            //console.log("Liked")
            fetchUserPosts()
            toast.success('Liked')
            
        }
        catch(error){
            console.log(error)
        }
    }
    const handleDisLike=async(_id)=>{
        try{
           const {data}=await axios.put(`/posts/dislike`,{_id:_id})
           
            fetchUserPosts()
            toast.success("Disliked")
        }
        catch(error){
            console.log(error)
        }
    }
    // const handleComment=(post)=>{
    //     // try{
    //        //console.log(postId,text)
    //        setCurrentPost(post)
    //        setVisible(true)
    //     //    const {data}=await axios.put('http://localhost:8000/api/posts/comment',{
    //     //     _id:postId,
    //     //     text:text
    //     //    })
    //     //    if(data.ok){
    //     //     handleClose()
    //     //     fetchUserPosts()
    //     //     toast.success("Comment added sucessfully")
    //     //    }
            
           
    //     // }
    //     // catch(error){
    //     //     console.log(error)
    //     // }
    // }
    // const addComment=async()=>{

    // }
    // const removeComment=async()=>{

    // }
    return (
        <UserRouter>
            <div className='container'>
                <div className='row py-5'>
                    <div className='col'>
                        <h1 className='text-center'>DashBoard</h1>
                    </div>
                    <Profile post={post}/>
                </div>
                <div className='row py-3'>
                    <div className='col-md-8'>
                    <div className='mt-4'>
                            <h5 style={{textAlign:"center"}}>Create new Post</h5>
                        </div>
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
                        {/* <pre>{JSON.stringify(post,null,4)}</pre> */}
                        <div className='mt-4'>
                            <h5 style={{textAlign:"center"}}>My Posts</h5>
                        </div>
                        <PostList
                         post={post} 
                         deleteHandler={deleteHandler} 
                         handleDisLike={handleDisLike} 
                         handleLike={handleLike} 
                        //  handleComment={handleComment}
                         page={'dashboard'}
                          />
                    </div>
                    {/* <div className='col-md-4'>
                        {
                            state && state.user && state.user.following &&
                            <div className='d-flex justify-content-between'>
    <Link href={`/user/following`} style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}>
        {state.user.following.length} Following
    </Link>
    <Link href={`/user/followers`} style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}>
        {state.user.followers.length} Followers
    </Link>
</div>


                        }
                        <People className='mt-8' people={people} handleFollow={handleFollow} />
                    </div> */}
                </div>
                {/* <Model title={comment} open={visible} onCancel={()=>setVisible(false)}>

                </Model> */}
            </div>

        </UserRouter>
    )
}

export default dashboard;
