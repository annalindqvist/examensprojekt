// RECT IMPORTS
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ICON IMPORT
import { IoClose } from 'react-icons/io5';

// HOOKS IMPORT
import { usePostContext } from "../../hooks/usePostContext";
import { useAuthContext } from '../../hooks/useAuthContext';

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

            const res = await fetch(`http://143-42-49-241.ip.linodeusercontent.com:8080/post-to-feed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ post })
            })
            const json = await res.json();

            if (!res.ok) {
                setError(json.error)
            };
            if (res.ok) {
                setPost('')
                setError(null)
                dispatch({ type: 'CREATE_POST', payload: json })
                handleNavigate();
            };
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="post-to-feed-page pink-background">
                <div className="post-input-top flex-row">
                    <Link to="/" className="item1">
                        <span className="dark-text"><IoClose /></span>
                    </Link>
                    <p className="s-font item2">Share post</p>
                    <input type="submit" value="Publish" className="item3" id="post-to-feed-submit" />
                </div>
                <textarea name="post" id="post-input" cols="30" rows="10" onChange={(e) => setPost(e.target.value)} />
                {error && <div className="error">{error}</div>}

            </form>
        </>
    );
}

export default PostToFeed;