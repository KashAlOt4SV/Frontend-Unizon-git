import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../axios';


export const fetchNewProject = createAsyncThunk('auth/fetchNewProject', async (params) => {
    const { data } = await axios.post('/newProject', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const projectSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:{
        [fetchNewProject.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchNewProject.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload; 
        },
        [fetchNewProject.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    }
});



export const projectReducer = projectSlice.reducer;
