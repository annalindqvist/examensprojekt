// imports
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();

   const handleNavigate = () => {
    navigate('/');
  };

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
                console.log("navigate")
                handleNavigate();
            };
        }
    };


    return ( 
        <>
            <form onSubmit={handleSubmit} className="post-to-feed-page pink-background">
                <div className="post-input-top flex-row">
                    <Link to="/feed" className="item1">
                        <span className="dark-text">x</span>
                    </Link>
                    <p className="s-font item2">Share post</p>
                    <input  type="submit" value="Publish" className="item3" id="post-to-feed-submit"/>
                </div>
                    <textarea name="post" id="post-input" cols="30" rows="10" onChange={(e) => setPost(e.target.value)}/>
                    {/* <input type="text" name="post" className="input-field" placeholder={'Start a conversation ' + user.firstname + '!'} onChange={(e) => setPost(e.target.value)} /> */}
                    {/* <input  type="submit" value="Share" /> */}
                {error && <div className="error">{error}</div>}
            </form>
        </>
     );
}
 
export default PostToFeed;