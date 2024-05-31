import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { userContext } from '../../context';
import {Post} from '../../components/cards/Post'
import { Spinner,Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Avatar from "react-avatar";
import moment from "moment";
const PostDetails = () => {
    const router = useRouter();
    const { _id } = router.query;
    const [post, setPost] = useState(null);
    const [state] = useContext(userContext);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState("");
    
    const getPostById = async (_id) => {
        try {
            setLoading(true);
            const response = await axios.get(`/posts/user-post/${_id}`);
            setPost(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (_id) getPostById(_id);
    }, [_id]);

    const handleLike = async (_id) => {
        try {
            await axios.put(`/posts/like`, { _id });
            getPostById(_id);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDisLike = async (_id) => {
        try {
            await axios.put(`/posts/dislike`, { _id });
            getPostById(_id);
        } catch (error) {
            console.log(error);
        }
    };

    const handleComment = async (postId, text) => {
        try {
            await axios.put(`/posts/comment`, {
                _id: postId,
                text,
            });
            getPostById(postId);
            setComment(""); // Clear the input field after submitting
            toast.success("Comment added successfully");
        } catch (error) {
            console.log(error);
        }
    };

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

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spinner animation="border" />
                </div>
            ) : (
                post && (
                    <>
                        <Post
                            post={post}
                            handleLike={handleLike}
                            handleDisLike={handleDisLike}
                            handleComment={handleComment}
                            deleteHandler={deleteHandler}
                        />
                        {post.comments && post.comments.length > 0 && (
                            <div className="comments-section">
                                {post.comments.map((com, index) => (
                                    <div key={index} className="comment">
                                        {/* <h5>{com.postedBY.name}</h5> */}
                                        <div key={com.postedBY._id} className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                       {
                        com.postedBY.image?(<Avatar 
                        name={com.postedBY.name} 
                        size="40" 
                        round={true} 
                        className="mr-3" 
                        src={com.postedBY.image.url} // if available
                    />):(<Avatar round="20px" name={com.postedBY.name[0]} className="mb-2" size="40" />)
                       } 
                        <div className="mx-2">
                            <h6 className="mb-0 text-primary">{com.postedBY.username}</h6>
                            <p className="text-muted mb-0">{com.postedBY.name}</p>
                        </div>
                    </div>
                    {/* <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleFollow(com.postedBY._id)}
                    >
                        Follow
                    </Button> */}
                </div>
                                        <p>{com.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleComment(post._id, comment);
                            }}
                        >
                            <Form.Group>
                                <Form.Label>Add Comment</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" className="mt-2">Post Comment</Button>
                        </Form>
                    </>
                )
            )}
        </>
    );
};

export default PostDetails;
