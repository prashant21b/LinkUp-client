import React from 'react'
//import { Spin } from 'antd';
import Link from 'next/link';
const Auth = ({ profileUpdate,submitHandler, name, setName, email, setEmail, password, setPassword, secret, setSecret, loading, page, username, setUsername, about, setAbout }) => {
    return (
        <form onSubmit={submitHandler}>
            {
             profileUpdate?(<>
             <div className="form-group p-2">
                <small>
                    <label className="text-muted">UserName</label>
                </small>

                <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="form-control" placeholder="Enter your username" />
            </div>
            <div className="form-group p-2">
                <small>
                    <label className="text-muted">About</label>
                </small>

                <input value={about} onChange={e => setAbout(e.target.value)} type="text" className="form-control" placeholder="Write some thing about yourself.." />
            </div>
             </>)
             :
             (<></>)
            }
            
            {
                page != 'login' ? (<div className="form-group p-2">
                    <small>
                        <label className="text-muted">Your Name</label>
                    </small>

                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="Your Name" />
                </div>) : (<div></div>)
            }

            <div className="form-group p-2">
                <small>
                    <label className="text-muted">Email</label>
                </small>

                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Your Email"
                disabled={profileUpdate}
                 />
            </div>
            <div className="form-group p-2">
                <small>
                    <label className="text-muted">Password</label>
                </small>

                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" placeholder="Your password" />
            </div>
            <>
                {
                    page != 'login' ? (<div className="form-group p-2">
                        <small>
                            <label className="text-muted">pick a Question</label>
                        </small>
                        <select className="form-control">
                            <option>What is your favourite color ?</option>
                            <option>What is your best friend Name ?</option>
                            <option>what city you were born ?</option>
                        </select>
                        <small className="form-text text-muted">
                            You can use this for reset password
                        </small>
                        <div className="form-group p-2">
                            <input value={secret} onChange={e => setSecret(e.target.value)} type="text" className="form-control" placeholder="Enter your answer" />

                        </div>

                    </div>) : (<div></div>)
                }
                <div className="form-group p-2">

                    <button className="btn btn-primary col-12">{"Submit"}</button>
                </div>
                {
                    page == 'login' ? (<div className='row'>
                        <div className='col'>
                            <p className='text-center'>
                                <Link className='text-danger' href='/forgot-password'>
                                    Forget password
                                </Link>
                            </p>
                        </div>
                    </div>) : (<div></div>)
                }

            </>
        </form>
    )
}

export default Auth;
