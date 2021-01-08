import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

const store = configureStore({
	reducer: {
		posts: postsReducer,
		users: usersReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
export default store
