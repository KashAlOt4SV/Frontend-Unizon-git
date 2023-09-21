import React from "react";

import { SideBlock } from "../SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import styles from "./Friend.module.scss"
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';

export const Friend = ({ items, children, isLoading = true }) => {
  return (
    <div style={{ border: "1px solid #dedede", "border-radius": "6px", overflow: "hidden", backgroundColor: "white" }}>
      <form>
        <TextField className={styles.input}
          label="Поиск друзей"
        />
      </form>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem className={styles.listItem}>
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} className={styles.avatar}/>
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                  className={styles.text}
                />
              )}
            </ListItem>
            <Divider component="li" className={styles.line}/>
          </React.Fragment>
        ))}
      </List>
      {children}
    </div>
  );
};