import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        set(state, action){
            return action.payload
        },
        clear() {
            return initialState
        }
    }
})

export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(set(content))
        setTimeout(() => {
            dispatch(clear())
        }, time)
    }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer