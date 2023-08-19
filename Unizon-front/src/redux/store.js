import {configureStore} from '@reduxjs/toolkit'
import {postsReducer} from './slices/posts';
import {authReducer} from './slices/auth';
import { projectReducer } from './slices/projects';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        project: projectReducer
        
    },
});

export default store;