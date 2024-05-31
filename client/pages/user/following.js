import Avatar from "react-avatar";
import moment from "moment";
import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { userContext } from "../../context";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
const following = () => {
    const [state, setState] = useContext(userContext);
    const [people, setPeople] = useState([])
    const router = useRouter();

    const fetchFollowing = async () => {
        try {
            const { data } = await axios.get(`/user-following`)
            setPeople(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleUnfollow = async (userId) => {
        try {
           const {data}=await axios.put(`/user-unfollow`,{
            _id:userId
           })

           //update local storage
           let auth=JSON.parse(localStorage.getItem("auth"))
           auth.user=data;
           localStorage.setItem('auth',JSON.stringify(auth))

           //update context
           setState({...state,user:data});
           let filtered=people.filter((p)=>p._id!==userId);
           setPeople(filtered)
        }
        catch (error) {

        }
    }
    useEffect(() => {
        if (state && state.token) fetchFollowing();
    }, [state && state.token])
    return (
        <>
         <h6 className="text-center mt-5">Following</h6>
       
        <div className="align-item-center w-4 mt-5" style={{width:"250px",margin:"auto"}}>
           
            {people.map(person => (
                <div key={person._id} className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                    {
                        person.image?(<Avatar 
                        name={person.name} 
                        size="40" 
                        round={true} 
                        className="mr-3" 
                        src={person.image.url} // if available
                    />):(<Avatar round="20px" name={person.name[0]} className="mb-2" size="40" />)
                       } 
                        <div className="mx-2">
                            <h6 className="mb-0 text-primary" onClick={()=>router.push(`/chat/${person._id}`)} style={{cursor:"pointer"}}>{person.username}</h6>
                            <p className="text-muted mb-0" onClick={()=>router.push(`/chat/${person._id}`)} style={{cursor:"pointer"}}>{person.name}</p>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={()=>handleUnfollow(person._id)}
                    >
                        Unfollow
                    </Button>
                </div>
            ))}
            <div>
                <Link href={`/dashboard`} >Go To Dashboard</Link>
            </div>
        </div>
        </>
    );
}

export default following