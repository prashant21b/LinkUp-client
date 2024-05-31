import React from 'react';
//import { Spin } from 'antd';
import Link from 'next/link';

const ForgotForm = ({ submitHandler, email, setEmail, newpassword, setNewPassword, secret, setSecret, loading }) => {
    return (
        <form onSubmit={submitHandler}>

            <div className="form-group p-2">
                <small>
                    <label className="text-muted">Email</label>
                </small>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter Your Email" />
            </div>

            <div className="form-group p-2">
                <small>
                    <label className="text-muted">New Password</label>
                </small>
                <input value={newpassword} onChange={e => setNewPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Your new password" />
            </div>

            <div className="form-group p-2">
                <small>
                    <label className="text-muted">Pick a Question</label>
                </small>
                <select className="form-control">
                    <option>What is your favourite color?</option>
                    <option>What is your best friend's name?</option>
                    <option>What city were you born in?</option>
                </select>
                <small className="form-text text-muted">
                    You can use this for reset password
                </small>
            </div>

            <div className="form-group p-2">
                <input value={secret} onChange={e => setSecret(e.target.value)} type="text" className="form-control" placeholder="Enter your answer" />
            </div>

            <div className="form-group p-2">
                <button className="btn btn-primary col-12">Submit</button>
            </div>
                
        </form>
    )
}

export default ForgotForm;
