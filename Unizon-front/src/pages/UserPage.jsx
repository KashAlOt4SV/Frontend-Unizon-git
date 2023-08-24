import React from 'react';
import { UserCard } from '../components/UserCard';
import { UserID } from "../redux/slices/auth";
import { useSelector, useDispatch  } from 'react-redux';
import { Navigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { fetchFilterUserPosts } from '../redux/slices/posts';
import { FriendsBlock } from '../components/FriendsBlock';
import axios from '../axios'
import {useParams} from "react-router-dom";



export const UserPage = () => {
    const isAuth = useSelector(UserID);
    const userData = useSelector(state => state.auth.data);
    const {posts} = useSelector(state => state.posts);
    const isPostsLoading = posts.status == 'loading';
    const dispatch = useDispatch();
    const { id } = useParams();


    const [imageUrl, setImageUrl] = React.useState('');
    const handleChangeFile = async(event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!')
    }
  };

    React.useEffect(() => {
        dispatch(fetchFilterUserPosts(id));
    }, []);

    if (!isAuth) {
        return <Navigate to={`/user-page/${id}`} />
    }


    
    return (
        <div>
            <UserCard
                fullName={userData.fullName}
                avatarUrl={userData.avatarUrl}
                typeOfUser={userData.typeOfUser}
                interests={userData.interests}
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
              <FriendsBlock
                items={[
                  {
                    user: {
                      fullName: 'Аня Дацюк',
                      avatarUrl: 'https://sun1-47.userapi.com/impg/viwowJUBwlXCzyADq2jDduNmtJ4BeqWubBho_w/LiMLJdXWZLw.jpg?size=1440x1440&quality=95&sign=0cce24a304d34739ccd2243114a25b1c&type=album',
                    },
                    text: 'Инвестор',
                  },
                  {
                    user: {
                      fullName: 'Ашот Шайкин',
                      avatarUrl: 'https://sun9-53.userapi.com/impg/LfC9UkbKOKliwa9S-fcybijpO6X3Sb0RT-9fcQ/2AzcQR_HTmE.jpg?size=720x1080&quality=95&sign=52990859d295b8943b7593b7cbfb2657&type=album',
                    },
                    text: 'Предпринематель',
                  },
                ]}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </div>
    )
}
