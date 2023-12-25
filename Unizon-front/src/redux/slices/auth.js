import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params) => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchSwitchPassword = createAsyncThunk('auth/fetchSwitchPassword', async (params) => {
    const { data } = await axios.patch('/update-password', params);
    return data;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (id) => {
    const { data } = await axios.get(`/user-page/${id}`);
    return data;
});

export const addFriend = createAsyncThunk('/addFriend', async (id) => {
    const { data } = await axios.patch(`/addFriend/${id}`);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers:{
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload; 
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload; 
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload; 
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchSwitchPassword.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchSwitchPassword.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload; 
        },
        [fetchSwitchPassword.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchUser.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload; 
        },
        [fetchUser.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    }
});

export const selectIsAuth = state => Boolean(state.auth.data)
export const UserID = state => state.auth.data;

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;