import React from 'react';
import axios from "../../axios";
import { Link } from "react-router-dom";

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './MyProject.module.scss';


export const MyProject = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
    axios
        .get(`/ProjectUser`)
        .then((res) => {
        setData(res.data);
        setLoading(false);
        })
        .catch((err) => {
        console.warn(err);
        })
    }, []);
    const colorButton = '#a42eff'; 
    return (
        (data) ? 
        (<div>
           Est' proect
        </div>) : 
        
        (<div>
           <Typography classes={{ root: styles.title }} variant="h5">
                У вас еще нет проекта, хотите создать свой проект?
            </Typography>
            <Link className={styles.LinkAdd} sx={{color:"#FFFFFF"}} to='/newProject'>
                <Button variant="contained" size="large" sx={{backgroundColor:colorButton}} className={styles.editButton}>
                    Создать проект!
                </Button>
            </Link>
            
        </div>)
        
    )
}