import { UserProvider } from '../context';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/Nav';
import Head from "next/head";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "antd/dist/reset.css";
import { PostProvider } from '../context/post';

export default function MyApp({ Component, pageProps }) {
    return(
    // <UserProvider>
    
    //    <Nav /> 
    //    <ToastContainer position="top-center"/>
    // <Component {...pageProps} />
    // </UserProvider> 
    <UserProvider>
        <PostProvider>
    <Head>
        <link rel="stylesheet" href="/css/style.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
    </Head>
    <Nav/>
    <ToastContainer position="top-center"/>
    <Component {...pageProps} />
    </PostProvider>
    </UserProvider>
    ) 
  }