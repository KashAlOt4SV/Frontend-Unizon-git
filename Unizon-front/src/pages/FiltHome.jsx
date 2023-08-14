import React from 'react';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector, useState } from 'react-redux';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags, fetchNewestPosts, fetchPopularPosts, fetchTagsName } from '../redux/slices/posts';

export const FiltHome = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const {posts, tags} = useSelector(state => state.posts);

  const isPostsLoading = posts.status == 'loading';
  const isTagsLoading = tags.status == 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const onClickNewestPosts = () => {
    dispatch(fetchNewestPosts());
  };

  const onClickPopularPosts = () => {
    dispatch(fetchPopularPosts());
  };

  const onClickTagsName = () => {
    dispatch(fetchTagsName());
  };

  const [value, setValue] = React.useState(0)

  const handleTabs = (e, val) => {
    console.warn(val)
    setValue(val)
  } 

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={value} aria-label="basic tabs example" onChange={handleTabs}>
        <Tab label="Новые" onClick = {onClickNewestPosts} />
        <Tab label="Популярные" onClick = {onClickPopularPosts} />
      </Tabs>
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
            />
          )
        )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading}/>
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
