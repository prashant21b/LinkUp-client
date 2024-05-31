import { useState,useEffect,useContext} from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import { userContext } from "../../context";
import { Spinner } from 'react-bootstrap';
const UserRouter=({children})=>{
    const [ok,setOk]=useState(false);
    const router=useRouter()
    const [state,setState]=useContext(userContext)
    useEffect(()=>{
    if(state && state.token) getCurrentUser();
    },[state && state.token])

    const getCurrentUser=async ()=>{
        try{
          const {data}=await axios.get('/current-user',{
            // headers:{
            //     "Authorization":`Bearer ${state.token}`
            // }
          });
          if(data.ok) setOk(true)
        }
        catch(error){
            router.push('/login')
        }
    }
    process.browser && state==null && setTimeout(()=>{
      getCurrentUser()
    },1000)
    return !ok ?( <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Spinner animation="border" />
</div>):(<>{children}</>)
}

export default UserRouter;