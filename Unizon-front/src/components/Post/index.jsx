import React from 'react';
import { Link, useParams} from "react-router-dom";
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { purple, grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import axios from '../../axios';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { fetchRemovePosts, fetchDoLike, fetchFilterPosts, fetchTags} from '../../redux/slices/posts';

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {

  const [CountLikes, setCountLikes] = React.useState();
  const [IsLike, setIsLike] = React.useState();
  const dispatch = useDispatch();
  const params = useParams();  
  const name = params.name
  
  React.useEffect(() => {
  if (id===undefined) {
    console.warn("Id is undefined!")
  }
  else{
    axios
    .get(`/like/${id}`)
    .then((res) => {
      setCountLikes(res.data);
    })
    axios
    .get(`/IsLike/${id}`)
    .then((res) => {
      setIsLike(res.data.IsLike);
    })
  }
  
}, []);
  if (isLoading) {
    return <PostSkeleton />;
  }
  
  const onClickRemove = () => {
    if (window.confirm('Вы уверены что хотите удалить статью?')){
      dispatch(fetchRemovePosts(id));
    }
  };

  const onClickTag = () => {
    dispatch(fetchFilterPosts(name));
    dispatch(fetchTags());
};


  const onClickDoLike = () => {
    dispatch(fetchDoLike(id))
    .then((res) => {
      setCountLikes(res.payload.countLikes)
      setIsLike(res.payload.isLike)
    })
    ;
  };

  var color = grey[500]
  if (IsLike) {
    color = purple[500]
  }
  
  
  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`} >
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link onClick={onClickTag} to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
            <div>
              <ul className={styles.postDetails}>
                <div className={styles.Like}>
                <IconButton sx={{ color: color }} fontSize="large"  onClick={onClickDoLike}>
                  <FavoriteIcon />
                </IconButton>
                <span>{CountLikes}</span>
                </div>
                <li>
                  <CommentIcon fontSize="large"  />
                  <span>{commentsCount}</span>
                </li>
                <li>
                    <EyeIcon fontSize="large"  />
                  <span>{viewsCount}</span>
                </li>
              </ul>
            </div>
        </div>
      </div>
    </div>
  );
};