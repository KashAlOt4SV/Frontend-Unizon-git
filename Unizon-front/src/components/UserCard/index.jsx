import React from 'react';
import styles from './UserCard.module.scss';

export const UserCard = ({
    avatarUrl, 
    fullName,
    typeOfUser,
    interests,
}) => {

    

    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={avatarUrl ? `http://localhost:5555${avatarUrl}` :  '/noavatar.png'} alt={fullName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{fullName}</span>
                <em className={styles.typeOfUser}>{typeOfUser}</em>
            </div>
            <div>
                <h3 className={styles.aboutMe}>Обо мне:</h3>
                <span className={styles.interests}>{interests}</span>
            </div>
        </div>
    )
}
