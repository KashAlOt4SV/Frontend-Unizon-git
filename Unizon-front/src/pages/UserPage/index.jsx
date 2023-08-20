import React from 'react';
import styles from './userPage.scss';
import { UserInfo } from '../../components/UserInfo';


export const UserPage = () => {
    return (
        <div>
            <UserInfo  className = {styles.bot}/>
            <span>kassi</span>
        </div>
    )
}
