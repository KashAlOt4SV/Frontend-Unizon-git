import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch} from 'react-redux';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { fetchFilterPosts, fetchTags } from '../redux/slices/posts';


export const TagsBlock = ({ items, isLoading = true }) => {
  const params = useParams();  
  const name = params.name
  const dispatch = useDispatch();

  const onClickTag = () => {
    dispatch(fetchFilterPosts(name));
    dispatch(fetchTags());
};

  return (
    <SideBlock title="Вакансии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link onClick={onClickTag}
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
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
