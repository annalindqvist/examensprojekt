// imports
import { useState } from 'react';

import { usePostContext } from "../../hooks/usePostContext";
import { useAuthContext } from '../../hooks/useAuthContext';
import './PostToFeed.css';

import env from "react-dotenv";
// `${env.REACT_APP_API_URL}/`

const PostToFeed = () => {

    const { dispatch } = usePostContext();
    const { user } = useAuthContext();
    const [error, setError] = useState(null)
    const [post, setPost] = useState("");

   // const URL1 = "http://localhost:8080/feed";
   // const URL2 = "http://localhost:8080/feed";


    const handleSubmit = async (e) => {

        const token = localStorage.getItem('token');
        if (token) {
            e.preventDefault();
            if (!user) {
                setError("You must be signed in to post.");
                return;
            }

            const res = await fetch(`http://localhost:8080/post-to-feed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ post })
            })
            const json = await res.json();
            //json = [{post: postDoc, postedByUser: true}]
            //console.log("PostToFeed json", json);
        
            if (!res.ok) {
                setError(json.error)
            };
            if (res.ok) {
                setPost('')
                setError(null)
                
                dispatch({type: 'CREATE_POST', payload: json})
            };
        }
    };

    return ( 
        <>
            <form onSubmit={handleSubmit} className="input-field-container">
                
                    <input type="text" name="post" className="input-field" placeholder={'Start a conversation ' + user.firstname + '!'} onChange={(e) => setPost(e.target.value)} />
                    <input  type="submit" id="input-btn" value="Share" />
                
                {error && <div className="error">{error}</div>}
            </form>
        </>
     );
}
 
export default PostToFeed;