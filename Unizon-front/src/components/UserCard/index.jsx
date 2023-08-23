import React from 'react';
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

    /*const inputFileRef = React.useRef(null);
    const [imageUrl, setImageUrl] = React.useState('');

    const handleChangeFile = async(event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      const { avatarUrl } = await axios.patch('/updateAvatar', avatarUrl);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!')
    }
  };*/

    

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
                <Link to={`/edit-profile/${id}`} >
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
