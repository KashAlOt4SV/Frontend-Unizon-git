import React from 'react';
import axios from "../../axios";
import { Link } from "react-router-dom";
import { ProjectCard } from '../../components/ProjectCard';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import styles from './MyProject.module.scss';
import Grid from '@mui/material/Grid';
import { Post } from '../../components/Post';
import { useSelector } from 'react-redux';
import { SideBlock } from "../../components/SideBlock";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { TagsBlock } from '../../components/TagsBlock';


export const MyProject = ({ items }) => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const userData = useSelector(state => state.auth.data);
    const obj = useSelector(state => state.auth.data);
    const {posts} = useSelector(state => state.posts);
    const isPostsLoading = posts.status == 'loading';

    React.useEffect(() => {
    axios
        .get(`/ProjectUser`)
        .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
        })
        .catch((err) => {
        console.warn(err);
        })
    }, []);
    const colorButton = '#a42eff'; 

    console.log(data)

    return (
        (data) ? 
        (<div>
            <ProjectCard
                projectName={data.projectName}
                avatarUrl={data.avatarUrl}
                aboutProject={data.aboutProject}
            />
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isPostsLoading?[...Array(5)] : posts.items).map((obj, index) => 
              isPostsLoading? (
                <Post key={index} is isLoading={true} />
              ) : (
                <Post
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? `http://localhost:5555${obj.imageUrl}` : ''}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable = {userData?._id == obj.user._id}
                  likesCount = {obj.likesCount}
                  />
                )
              )}
            </Grid>
            <Grid xs={4} item>
                <div className={styles.inf}>
                    <div className={styles.infTitle}>
                        Инфа в цифрах
                    </div>
                    <div className={styles.partTitle}>
                        <div>Размер команды:</div>
                        <span className={styles.count}>{data.countCommand} человек</span>
                    </div>
                    <div className={styles.partTitle}>
                        <div>Количество поднятых раундов:</div>
                        <span className={styles.count}>{data.investment}</span>
                    </div>
                    <div className={styles.partTitle}>
                        <div>Размер инвестиций:</div>
                        <span className={styles.count}>{data.sizeOfInvestment}</span>
                    </div>
                    <div className={styles.partTitle}>
                        <div>Сроки реализации:</div>
                        <span className={styles.count}>{data.deadline}</span>
                    </div>
                </div>
                <div className={styles.inf}>
                    <div className={styles.infTitle}>Инвесторы</div>
                    <div className={styles.partTitle}>ООО "Инвестгруп"</div>
                    <div className={styles.partTitle}>ИП "Максим"</div>
                    <div className={styles.partTitle}>ООО "БыстроДеньги"</div>
                    <div className={styles.partTitle}>ООО "Манимен"</div>
                    <div className={styles.partTitle}>ООО "kiviku"</div>
                </div>
                <div className={styles.inf}>
                    <div className={styles.infTitle}>О команде</div>
                    <div className={styles.command}>{data.command}</div>
                </div>
                <TagsBlock items={data.vacances} isLoading={false}/>
            </Grid>
          </Grid>
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