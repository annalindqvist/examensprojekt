// IMPORT REACT 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// IMPORT COMPONENTS
import Navbar from "../components/Navbar/Navbar";

// IMPORT DATE FNS
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchNotifications = async () => {
            const res = await fetch(`http://localhost:8080/notifications`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            })
            const json = await res.json();

            if (res.ok) {
                setNotifications(json.notifications)
            }
            if (!res.ok) {
                setError(json.message);
            }
        }

        if (token) {
            fetchNotifications();
        }
    }, []);

    // Notification type
    const renderNotificationType = (notificationType) => {
        switch (notificationType) {
            case 'comment':
                return "commented your post";
            case 'like':
                return "liked your post";
            case 'saved':
                return "saved your profile";
            default:
                return "unknown";
        }
    };

    // Link type - to post or profile
    const renderLinkType = (linkType, id) => {
        console.log(linkType, id)
        switch (linkType) {
            case 'post':
                return `/feed/${id}`;
            case 'profile':
                return `/user/${id}`;
            default:
                return "/";
        }
    };

    return (
        <>
            <Navbar />
            <div className="pink-background centered-content-column">
                <div className="logo flex">
                    <h1 className="lily-font dark-text l-font">GalVibe</h1>
                </div>

                <div className="inner-container">


                    {notifications && notifications.map((notification, index) => {
                        //const postId = notification.postId;
                        const imageUrl = notification.senderId.img ? "http://localhost:8080/static/" + notification.senderId.img : "http://localhost:8080/static/deefaultimg.png";
                        const firstname = notification.senderId.firstname ? notification.senderId.firstname : "Unknown";
                        const createdAt = notification.createdAt;
                        // get notification type to use for renderLinkType
                        const postOrProfile = notification.notifictionType === "saved" ? "profile" : "post";
                        // get the postId if any otherwise the sender._id to get profile
                        const postIdOrProfileId = notification.postId ? notification.postId : notification.senderId._id;

                        return (
                            <Link to={renderLinkType(postOrProfile, postIdOrProfileId)} className="flex-row notification-card" key={index}>
                                {imageUrl && <div style={{ backgroundImage: `url(${imageUrl})` }} alt="profileimage" className="s-profile-img" />}
                                <div className="notification-card-info flex-column">
                                    <p className="m-font flex-row">{firstname} {renderNotificationType(notification.notifictionType)}</p>
                                    <p className="xs-font grey-text flex-row">{createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : createdAt}</p>
                                </div>
                            </Link>)
                    })}

                    {error && <div className="error-soft">{error}</div>}
                </div>
            </div>
        </>
    );
}

export default Notifications;