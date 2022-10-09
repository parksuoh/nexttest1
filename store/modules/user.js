import { createSlice } from '@reduxjs/toolkit';

const initialState = { info: {} }; // 초기 상태 정의

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setInfo: (state, action) => {
            state.info = action.payload
        },
        removeInfo: state => { state.info = {}},
    },
});

export const { setInfo, removeInfo } = userSlice.actions; // 액션 생성함수
export default userSlice.reducer; // 리듀서