import React from 'react';
import axios from "../../axios";
import Grid from '@mui/material/Grid';
import styles from './Friends.module.scss';
import { Friend } from '../../components/Friend';
import { useSelector } from 'react-redux';

export const Friends = () => {
    const [data, setData] = React.useState();
    const [loading, setLoading] = React.useState();
    const userData = useSelector(state => state.auth.data);
    let friends = []

    React.useEffect(() => {
    axios
        .get(`/auth/me`)
        .then((res) => {
        console.log(res);
        setData(res.data);
        setLoading(false);
        })
        .catch((err) => {
        console.warn(err);
        })
    }, []);
    const new_array_of_friends = [];
    for (let i = 0; i < userData.friends.length; i++) {
        axios
            .get(`user-page/${userData.friends[i]}`)
            .then((res) => {
                new_array_of_friends.push(res.data);
            })
            .catch((err) => {
            console.warn(err);
            })
    }
    console.log(new_array_of_friends);

    
    return (
        data ? (
        <div>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    <Friend
                        items={[
                        {
                            user: {
                            fullName: 'Аня Дацюк',
                            id: '64d8d91ee73a17899c928763',
                            avatarUrl: 'https://sun1-47.userapi.com/impg/viwowJUBwlXCzyADq2jDduNmtJ4BeqWubBho_w/LiMLJdXWZLw.jpg?size=1440x1440&quality=95&sign=0cce24a304d34739ccd2243114a25b1c&type=album',
                            },
                            text: 'Инвестор',
                        },
                        {
                            user: {
                            fullName: 'Ашот Шайкин',
                            id: '64d8d91ee73a17899c928763',
                            avatarUrl: 'https://sun9-53.userapi.com/impg/LfC9UkbKOKliwa9S-fcybijpO6X3Sb0RT-9fcQ/2AzcQR_HTmE.jpg?size=720x1080&quality=95&sign=52990859d295b8943b7593b7cbfb2657&type=album',
                            },
                            text: 'Предпринематель',
                        },
                        ]}
                        isLoading={false}
                    />
                </Grid>
                <Grid xs={4} item>
                    <div>
                        
                    </div>
                </Grid>
            </Grid>
        </div>
        ) : (
            <div>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    Войдите в аккаунт, чтобы добавить друзей
                </Grid>
                <Grid xs={4} item>
                    <div>
                        
                    </div>
                </Grid>
            </Grid>
        </div>
        )
        
    )
}