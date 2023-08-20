import React from 'react';
import styles from './UserPage.module.scss';
import { UserInfo } from '../../components/UserInfo';
import { Post } from '../../components/Post';



export const UserPage = () => {
    return (
        <div className = {styles.bot} >
            <UserInfo  {...user} />
            <span>kassi</span>
        </div>
    )
}
