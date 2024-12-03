import React, { useState, useEffect, useRef } from 'react';
import { Route  } from "react-router-dom";
import { useHistory } from "react-router";
import AuthHelper from '../../util/AuthHelper';
import ProfileModal from './ProfileModal';
import PlanModal from './PlanModal';
import ApiHelper from '../../util/ApiHelper';

const Profile = (props) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [openNontification, setOpenNontification] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openPlanModal, setOpenPlanModal] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const DURATION = 5000;

    const profileRef = useRef(null);

    const divRef = useRef(null);

    const history = useHistory();

    const clickPopup = () => {
        setOpenPopup(!openPopup);
    }

    const clickNotificaiton = () => {
        setOpenNontification(!openNontification);
    }

    const setNotificationData = async () => {
        if (props.role === "Admin") {
            const res = await ApiHelper.fetchNotificaitons();
            setNotifications(res);
        }
    }

    useEffect(() => {
        setNotificationData();
        const interval = setInterval(() => {
            setNotificationData();
        }, DURATION);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (divRef.current && profileRef.current && !divRef.current.contains(event.target) && !profileRef.current.contains(event.target)) {
            setOpenPopup(false);
            setOpenNontification(false);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [divRef]);
    

    const onProfile = async () => {
        setOpenProfileModal(true);
        setOpenPopup(false);
    }

    const onNotification = async (notification) => {
        history.push(`/operators/${notification.operatorId}`)
        setOpenNontification(false);
    }

    const onPlan = async () => {
        setOpenPlanModal(true);
        setOpenPopup(false);
    }

    return (
        <div className='profile-container'>
            <div className='profile-img' onClick={clickPopup} ref={profileRef}>
                <i className="fas fa-user user-icon"/>
            </div>
            {props.role === "Admin" && (
                <div className='notification-img' onClick={clickNotificaiton} ref={profileRef}>
                    <i className="far fa-bell user-icon"/>
                    {notifications.length > 0 && (
                        <div className='red-dot' />
                    )}
                </div>
            )}
            {openPopup && (
                <div className='dropdown' ref={divRef}>
                    <ul className='dropdown__ul'>
                        <li onClick={onProfile}>
                            <i className="fas fa-user"/>
                            <span className='title'>Profile</span>
                        </li>
                        {props.role === "OPERATOR" && (
                            <li onClick={onPlan}>
                                <i className="fas fa-dollar-sign dollar-icon"/>
                                <span className='title'>Plan</span>
                            </li>
                        )}
                        <Route render={({ history }) => (
                            <li onClick={async () => {
                                await AuthHelper.logout();
                                history.push("/");
                            }}>
                                <i className="fas fa-sign-out-alt"/>
                                <span className='title'>Logout</span>
                            </li>
                        )} />
                    </ul>
                </div>
            )}
            {openNontification && props.role === "Admin" && (
                <div className='dropdown dropdown__notification' ref={divRef}>
                    <ul className='dropdown__ul'>
                        {notifications && notifications.map((noti, i) => (
                            <li key={`${noti.message}${i}`} onClick={() => onNotification(noti)}>
                                <i className="fas fa-exclamation red"/>
                                <span className='title'>{noti.message}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <ProfileModal open={openProfileModal} setOpen={val => setOpenProfileModal(val)}/>
            <PlanModal open={openPlanModal} setOpen={val => setOpenPlanModal(val)}/>
        </div>
    );
};

export default Profile;
