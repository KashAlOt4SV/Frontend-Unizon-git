import React from 'react';
import axios from '../../axios'

import { useNavigate } from 'react-router-dom'
import { Link, useParams, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { addFriend } from '../../redux/slices/auth';

import styles from './UserCard.module.scss';
import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';



export const UserCard = ({
}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = React.useState('');
    const [itemsOfUser, setItemsOfUser] = React.useState({});
    const [fullName, setFullName] = React.useState('')

    let { id } = useParams();
    const userData = useSelector(state => state.auth.data);

    React.useEffect(() => {
        axios
        .get(`/user-page/${id}`)
        .then((res) => {
          setUserInfo(res.data);
          setFullName(userInfo.fullName)
          setItemsOfUser({avatarUrl: userInfo.avatarUrl, fullName:{fullName}, email: userInfo.email, interests: userInfo.interests, typeOfUser: userInfo.typeOfUser})
        });
    }, []);

    const onClickAddFriend = () => {
      dispatch(addFriend(id));
      navigate(`/user-page/${id}`);
    };
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
            ) : (
                (!userData.friends.includes(userInfo._id)) ? (
                    <div className={styles.addToFriends} onClick={onClickAddFriend}>
                        <Button variant="contained">
                            Добавить в друзья
                        </Button>
                </div>
                ) : (
                    <div className={styles.addToFriends} onClick={onClickAddFriend}>
                        <Button variant="contained">
                            Удалить из друзей
                        </Button>
                    </div>
                )
                
            )}
            <div>
                <em className={styles.typeOfUser}>{userInfo.typeOfUser}</em>
            </div>
        </div>
    )
}
