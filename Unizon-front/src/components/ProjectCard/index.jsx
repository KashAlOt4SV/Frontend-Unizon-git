import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ProjectCard.module.scss';
import Button from '@mui/material/Button';
import axios from '../../axios'
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { Link, useParams} from "react-router-dom";

export const ProjectCard = ({
    avatarUrl,
    projectName,
    aboutProject,
}) => {

    const {id} = useParams();
    const obj = useSelector(state => state.auth.data);
    const itemsOfProject = {avatarUrl: obj.avatarUrl,projectName: obj.projectName, aboutProject: obj.aboutProject}

    return (
        <div className={styles.root}>
            <img className={styles.avatar} src={avatarUrl ? `http://localhost:5555${avatarUrl}` :  '/noavatar.png'} alt={projectName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{projectName}</span> 
            </div>
            <div className={styles.userInfo}>
                <h3 className={styles.aboutMe}>Обо мне:</h3>
                <span className={styles.interests}>{aboutProject}</span>
            </div>
            <div className={styles.editButton}>
                <Link to={`/edit-profile/${id}`} state={{itemsOfProject}}>
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}
