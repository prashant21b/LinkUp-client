import React, { useContext } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Avatar from 'react-avatar';
import { CiHeart, FcLike } from 'react-icons/fc';
import { FaRegComment, FaRegEdit } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import { userContext } from '../../context';
import { useRouter } from 'next/router';

export const Post = ({ post, deleteHandler, handleLike, handleDisLike, handleComment, page }) => {
    const [state] = useContext(userContext);
    const router = useRouter();

    if (!post || !post.postedBY  || !post.likes) {
        return null; 
    }
    

    return (
        <div className="card mb-3" key={post._id}>
            <div className="card-header d-flex justify-content-between align-items-center">
                <div>
                    {state && state.user && state.user.image && state.user.image.url ? (
                        <Avatar round="20px" src={state.user.image.url} className="mb-2" size="40" />
                    ) : (
                        <Avatar round="20px" name={post.postedBY.name ? post.postedBY.name[0] : "?"} className="mb-2" size="40" />
                    )}
                    {post.postedBY && post.postedBY.name && (
                        <span className="pt-2" style={{ marginLeft: '1rem' }}>{post.postedBY.name}</span>
                    )}
                    {post.createdAt && (
                        <span className="pt-2" style={{ marginLeft: '1rem' }}>{moment(post.createdAt).fromNow()}</span>
                    )}
                </div>
            </div>

            <div className="card-body">
                {post.content ? (
                    <div>{renderHTML(post.content)}</div>
                ) : (
                    <div>No content available</div>
                )}
            </div>
            <div className="card-footer">
                {post.image && (
                    <div
                        style={{
                            backgroundImage: `url(${post.image.url})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            height: '300px',
                        }}
                    ></div>
                )}
                <div className="d-flex">
                    {state.user && !post.likes.includes(state.user._id) ? (
                        <CiHeart className="text-danger pt-2 h1" onClick={() => handleLike(post._id)} />
                    ) : (
                        <FcLike className="text-danger pt-2 h1" onClick={() => handleDisLike(post._id)} />
                    )}

                    <div className="pt-1" style={{ marginLeft: '1rem', marginRight: '1rem' }}>{post.likes.length} Likes</div>

                    <FaRegComment onClick={() => router.push(`/post/${post._id}`)} className="text-danger pt-2 h1" />
                    <div className="pt-1" style={{ marginLeft: '1rem' }}>{post.comments.length} comments</div>

                    {page !== 'home' && state.user && state.user._id === post.postedBY._id && (
                        <>
                            <FaRegEdit onClick={() => router.push(`/user/post/${post._id}`)} className="text-danger pt-2 px-2 max-auto h1" style={{ marginLeft: '6rem' }} />
                            <MdAutoDelete className="text-danger pt-2 h1" style={{ marginLeft: '12rem' }} onClick={() => deleteHandler(post)} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


