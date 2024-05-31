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
import StoryList from '../components/story/StoryList';
const dashboard = () => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState({})
    const [loading, setLoading] = useState(false)
    const [state, setState] = useContext(userContext)
    const [post, setPost] = useState([])
    const [people, setPeople] = useState([])
   
    // const [show, setShow] = useState(false);
    const [posts,setPosts]=useContext(postContext)
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  //const router=useRouter()
  const [show, setShow] = useState({});

    const handleShow = (postId) => {
        setShow(prevState => ({
            ...prevState,
            [postId]: true,
        }));
    };

    const handleClose = (postId) => {
        setShow(prevState => ({
            ...prevState,
            [postId]: false,
        }));
    };
    const router = useRouter();
    const fetchUserPosts = async () => {
        console.log("auto")
        try {
            const response = await axios.get(`/posts/user-post`)
            console.log(response.data)
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
    const handleComment=async(postId,text)=>{
        try{
           console.log(postId,text)
          
           const {data}=await axios.put(`/posts/comment`,{
            _id:postId,
            text:text
           })
           if(data.ok){
            handleClose(postId)
            fetchUserPosts()
            toast.success("Comment added sucessfully")
           }
            
           
        }
        catch(error){
            console.log(error)
        }
    }
    
   // if(!state) router.push('/login')
    return (
        
            <UserRouter>
              <div className="container">
                <div className="row py-5">
                  <div className="col-12 d-flex justify-content-center">
                    <StoryList />
                  </div>
                  <div className="col-12">
                    {/* <h1 className="text-center">Posts</h1> */}
                  </div>
                </div>
                <div className="row py-3">
                  <div className="col-md-8">
                    {/* Uncomment and add these if you need them */}
                    {/* <CreatePostForm
                        content={content}
                        setContent={setContent}
                        postSubmit={postSubmit}
                        handleImage={handleImage}
                        loading={loading}
                        setLoading={setLoading}
                        image={image}
                        setImage={setImage}
                    /> */}
                    {/* <pre>{JSON.stringify(post,null,4)}</pre> */}
                    <PostList
                      post={post}
                      handleDisLike={handleDisLike}
                      handleLike={handleLike}
                      handleComment={handleComment}
                      show={show}
                      setShow={setShow}
                      handleClose={handleClose}
                      handleShow={handleShow}
                      page={'home'}
                    />
                  </div>
                  <div className="col-md-4">
                    {state && state.user && state.user.following && (
                      <div className="d-flex justify-content-between">
                        <Link
                          href={`/user/following`}
                          style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}
                        >
                          {state.user.following.length} Following
                        </Link>
                        <Link
                          href={`/user/followers`}
                          style={{ fontSize: '18px', fontWeight: 'bold', textDecoration: 'none' }}
                        >
                          {state.user.followers.length} Followers
                        </Link>
                      </div>
                    )}
                    <People className="mt-8" people={people} handleFollow={handleFollow} />
                  </div>
                </div>
              </div>
            </UserRouter>
    )
}

export default dashboard;
