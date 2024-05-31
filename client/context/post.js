import { useState, createContext, useEffect } from "react";
import axios from "axios";

const postContext = createContext();

const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
        
    //     const fetchPosts = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8000/api/posts/user-post");
    //             setPosts(response.data);
    //         } catch (error) {
    //             console.error("Error fetching posts:", error);
    //         }
    //     };
    //     fetchPosts();
    // }, []);

    return (
        <postContext.Provider value={[posts, setPosts]}>
            {children}
        </postContext.Provider>
    );
};

export { postContext, PostProvider };
