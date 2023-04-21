// imports
import { useState } from 'react';

import { usePostContext } from "../../hooks/usePostContext";
import { useAuthContext } from '../../hooks/useAuthContext';
import './PostToFeed.css';


const PostToFeed = () => {

    const { dispatch } = usePostContext();
    const { user } = useAuthContext();
    const [error, setError] = useState(null)
    const [post, setPost] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("You must be signed in to post.");
            return;
        }

        const res = await fetch('http://localhost:8080/post-to-feed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ post })
        })
        const json = await res.json();

        if (!res.ok) {
            setError(json.error)
            //setEmptyFields(json.emptyFields)
        };
        if (res.ok) {
            setPost('')
            setError(null)
            //setEmptyFields([])
            dispatch({type: 'CREATE_POST', payload: json})
        };
    };

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <label>Post to feed</label>
                <input type="text" name="post" onChange={(e) => setPost(e.target.value)} />
                <input  type="submit" value="Submit" />
                {error && <div className="error">{error}</div>}
            </form>
        </div>
     );
}
 
export default PostToFeed;