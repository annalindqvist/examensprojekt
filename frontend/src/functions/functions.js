

export const handleLike = async (postId, dispatch) => {

    const token = localStorage.getItem('token');
    if (token) {

        const res = await fetch('http://localhost:8080/feed/like/' + postId, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const json = await res.json()
        console.log("like json", json)

        if (res.ok) {
            dispatch({
                type: 'UPDATE_POST',
                payload: json
            })
        }
    }
};