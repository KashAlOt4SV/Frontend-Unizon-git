import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserCard.module.scss';
import Button from '@mui/material/Button';
import axios from '../../axios'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Link, useParams, useLocation} from "react-router-dom";

export const UserCard = ({
}) => {
    const [userInfo, setUserInfo] = React.useState('');
    let {id} = useParams();
    const location = useLocation();

    React.useEffect(() => {
      if ((userData) && location.pathname === `/user-page/${userData._id}`) {
        id  = userData._id;
      }
        axios
        .get(`/user-page/${id}`)
        .then((res) => {
          setUserInfo(res.data);
        });
    }, []);
    const fullName = userInfo.fullName;
    const userData = useSelector(state => state.auth.data);
    console.log(userData, userInfo)
    const itemsOfUser = {avatarUrl: userInfo.avatarUrl, fullName:{fullName}, email: userInfo.email, interests: userInfo.interests, typeOfUser: userInfo.typeOfUser}
    console.log()
    

    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={userInfo.avatarUrl ? `http://localhost:5555${userInfo.avatarUrl}` :  '/noavatar.png'} alt={userInfo.fullName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{userInfo.fullName}</span> 
            </div>
            <div className={styles.userInfo}>
                <h3 className={styles.aboutMe}>Обо мне:</h3>
                <span className={styles.interests}>{userInfo.interests}</span>
            </div>
            {(userData._id === userInfo._id) ? (
                <div className={styles.editButton}>
                <Link to={`/edit-profile/${id}`} state={{itemsOfUser}}>
                     <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                </Link>
            </div>
            ) : (null)}
            <div>
                <em className={styles.typeOfUser}>{userInfo.typeOfUser}</em>
            </div>
        </div>
    )
}
