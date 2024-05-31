import React, { useState, useContext } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Avatar from 'react-avatar';
import { CiHeart } from 'react-icons/ci';
import { FcLike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import { userContext } from '../../context';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';

const PostList = ({
    post,
    deleteHandler,
    handleLike,
    handleDisLike,
    handleComment,
    page,
    handleFollow,
}) => {
    const [state] = useContext(userContext);
    const router = useRouter();

    const filteredPosts = page === 'dashboard' && state.user
        ? post.filter(postItem => postItem.postedBY._id === state.user._id)
        : post;

    const goTocomment = (postItem) => {
        if (!postItem.likes.includes(state.user._id)) {
            alert('Like the post before commenting');
            return;
        } else {
            router.push(`/post/${postItem._id}`);
        }
    };

    return (
        <>
            {filteredPosts.map(postItem => (
                <div className="card mb-3" key={postItem._id}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <div>
                            {state && state.user && state.user.image && state.user.image.url ? (
                                <Avatar round="20px" src={state.user.image.url} className="mb-2" size="40" />
                            ) : (
                                <Avatar round="20px" name={postItem.postedBY.name[0]} className="mb-2" size="40" />
                            )}
                            <span className="pt-2" style={{ marginLeft: '1rem' }}>{postItem.postedBY.name}</span>
                            <span className="pt-2" style={{ marginLeft: '1rem' }}>{moment(postItem.createdAt).fromNow()}</span>
                        </div>
                    </div>

                    <div className="card-body">
                        <div>{renderHTML(postItem.content)}</div>
                    </div>
                    <div className="card-footer">
                        {postItem.image && (
                            <div
                                style={{
                                    backgroundImage: `url(${postItem.image.url})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                    height: '300px',
                                }}
                            ></div>
                        )}
                        <div className="d-flex">
                            {!postItem.likes.includes(state.user._id) ? (
                                <CiHeart className="text-danger pt-2 h1" onClick={() => handleLike(postItem._id)} />
                            ) : (
                                <FcLike className="text-danger pt-2 h1" onClick={() => handleDisLike(postItem._id)} />
                            )}

                            <div className="pt-1" style={{ marginLeft: '1rem', marginRight: '1rem' }}>{postItem.likes.length} Likes</div>

                            <FaRegComment onClick={() => goTocomment(postItem)} className="text-danger pt-2 h1" />
                            <div className="pt-1" style={{ marginLeft: '1rem' }}>{postItem.comments.length} comments</div>

                            {page !== 'home' && state && state.user && state.user._id === postItem.postedBY._id ? (
                                <>
                                    <FaRegEdit onClick={() => router.push(`/user/post/${postItem._id}`)} className="text-danger pt-2 px-2 max-auto h1" style={{ marginLeft: '6rem' }} />
                                    <MdAutoDelete className="text-danger pt-2 h1" style={{ marginLeft: '12rem' }} onClick={() => { deleteHandler(postItem) }} />
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostList;
