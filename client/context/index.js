import {useState,createContext,useEffect} from "react"
import axios from "axios";
import { useRouter } from "next/router";
const userContext=createContext();

const UserProvider=({children})=>{
    const [state,setState]=useState({
        user:{},
        token:"",
    });
   

    useEffect(()=>{
setState(JSON.parse(localStorage.getItem("auth")))
    },[])
    //adding header and baseurl in next js config
    const token=state && state.token?state.token:"";
    axios.defaults.baseURL=process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
    const router=useRouter();
    axios.interceptors.response.use(function (response) {
        // Do something before request is sent
        return response;
      }, function (error) {
        let res = error.response;
        if(res.status == 401 && req.config && !res.config._isRetryRequest){ // 401->unothorised error
            // then lougout user 
            setState(null);
            window.localStorage.removeItem("auth"); // remove the user from localstorage
            router.push('/login');
        }
      
      });
    return (
        <userContext.Provider value={[state,setState]}>
            {children}
        </userContext.Provider>
    )
}

export {userContext,UserProvider};
