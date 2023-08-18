import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags');
    return data;
});

export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async (id) => 
    axios.delete(`/posts/${id}`)
);

export const fetchNewestPosts = createAsyncThunk('posts/fetchNewestPosts', async () => {
    const {data} = await axios.get('/posts/newest');
    return data;
});

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async () => {
    const {data} = await axios.get('/posts/popular');
    console.log(data);
    return data;
});


export const fetchFilterPosts = createAsyncThunk('posts/fetchFilterPosts', async (name) => {
    const {data} = await axios.get(`/tags/${name}`);
    console.log(`/tags/${name}`)
    return data;
});

export const fetchDoLike = createAsyncThunk('posts/fetchDoLike', async (id) => {
    const {data} = await axios.patch(`/like/${id}`);
    return data;
});

export const fetchIsLike = createAsyncThunk('posts/fetchIsLike', async (id) => {
    const {data} = await axios.get(`/IsLike/${id}`);
    console.log(data.IsLike);
    return data;
});

export const fetchUserLike = createAsyncThunk('posts/fetchUserLike', async () => {
    const {data} = await axios.get(`/UserLikes/`);
    return data;
});

export const fetchCountLikes = createAsyncThunk('posts/fetchCountLikes', async (id) => {
    const {data} = await axios.get(`/like/:id`);
    return data;
});


const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
    likes: {
        items: [],
        status: 'loading',
    },
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // Получение статей
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // Получение тэгов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        // Удаление статьи
        [fetchRemovePosts.pending]: (state, action) => {
            state.posts.items =  state.posts.items.filter((obj) => obj._id !== action.meta.arg);
        },

        // Сортировка по новым постам
        [fetchNewestPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchNewestPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchNewestPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // Сортировка по популярным постам
        [fetchPopularPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPopularPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // Фильтрация постов по тэгам
        [fetchFilterPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchFilterPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchFilterPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // Лайки
        [fetchDoLike.pending]: (state) => {
            state.likes.items = [];
            state.likes.status = 'loading';
        },
        [fetchDoLike.fulfilled]: (state, action) => {
            state.likes.items = action.payload;
            state.likes.status = 'loaded';
        },
        [fetchDoLike.rejected]: (state) => {
            state.likes.items = [];
            state.likes.status = 'error';
        },

        // Лайкнул ли пользователь данн
        [fetchUserLike.pending]: (state) => {
            state.likes.items = [];
            state.likes.status = 'loading';
        },
        [fetchUserLike.fulfilled]: (state, action) => {
            state.likes.items = action.payload;
            state.likes.status = 'loaded';
        },
        [fetchUserLike.rejected]: (state) => {
            state.likes.items = [];
            state.likes.status = 'error';
        },

        // Список постов, который пользователь лайкнул
        [fetchIsLike.pending]: (state) => {
            state.likes.items = [];
            state.likes.status = 'loading';
        },
        [fetchIsLike.fulfilled]: (state, action) => {
            state.likes.items = action.payload;
            state.likes.status = 'loaded';
        },
        [fetchIsLike.rejected]: (state) => {
            state.likes.items = [];
            state.likes.status = 'error';
        },
        // Количество лайков
         [fetchCountLikes.pending]: (state) => {
            state.likes.items = [];
            state.likes.status = 'loading';
        },
        [fetchCountLikes.fulfilled]: (state, action) => {
            state.likes.items = action.payload;
            state.likes.status = 'loaded';
        },
        [fetchCountLikes.rejected]: (state) => {
            state.likes.items = [];
            state.likes.status = 'error';
        },
    }});
        
        


export const postsReducer = postSlice.reducer;
