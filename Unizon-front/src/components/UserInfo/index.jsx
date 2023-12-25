import React from 'react';
import styles from './UserInfo.module.scss';

import { Link} from "react-router-dom";

export const UserInfo = ({ 
  _id,
  avatarUrl, 
  fullName, 
  additionalText 
}) => {
  console.log(_id)
  return (
    <Link className={styles.linka} to={`/user-page/${_id}`}>
      <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl ? `http://localhost:5555${avatarUrl}` : '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
    </Link>  
  );
};
