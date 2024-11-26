import { createSlice } from "@reduxjs/toolkit"

const initialState = 'some are wrong'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action){
            return state
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer