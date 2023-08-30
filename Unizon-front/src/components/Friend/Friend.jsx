import React from 'react';

import { Link, useParams } from "react-router-dom";
import { useDispatch} from 'react-redux';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import styles from './Friend.module.scss';
import { fetchFilterPosts, fetchTags } from '../../redux/slices/posts';


export const Friend = (
    {avatarUrl,
    fullName,
    typeOfUser,
    countFriends,
    friends,
    isLoading}
) => {
  const params = useParams();  
  const name = params.name
  const dispatch = useDispatch();

  return (
    <React.Component title="Друзья">
      <List>
        {(isLoading ? [...Array(5)] : friends).map((name, i) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/tag/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                    <React.Component>
                        <img className={styles.avatar} src={avatarUrl ? `http://localhost:5555${avatarUrl}` : '/noavatar.png'} alt={fullName} />
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{fullName}</span>
                            <span className={styles.additional}>{typeOfUser}</span>
                        </div>
                    </React.Component>
                  )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </React.Component>
  );
};