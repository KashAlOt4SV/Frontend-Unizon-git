import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserCard.module.scss';
import Button from '@mui/material/Button';
import axios from '../../axios'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Link, useParams} from "react-router-dom";

export const UserCard = ({
    avatarUrl, 
    fullName,
    typeOfUser,
    interests,
}) => {

    const {id} = useParams();
    const userData = useSelector(state => state.auth.data);
    const itemsOfUser = {avatarUrl: userData.avatarUrl,fullName:{fullName}, email: userData.email, interests: userData.interests, typeOfUser: userData.typeOfUser}
    console.log()
    

    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={avatarUrl ? `http://localhost:5555${avatarUrl}` :  '/noavatar.png'} alt={fullName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span> 
            </div>
            <div className={styles.userInfo}>
                <h3 className={styles.aboutMe}>Обо мне:</h3>
                <span className={styles.interests}>{interests}</span>
            </div>
            <div className={styles.editButton}>
                <Link to={`/edit-profile/${id}`} state={{itemsOfUser}}>
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                </Link>
            </div>
            <div>
                <em className={styles.typeOfUser}>{typeOfUser}</em>
            </div>
        </div>
    )
}
