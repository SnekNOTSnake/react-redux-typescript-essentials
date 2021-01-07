import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface PostsState {
	id: string
	title: string
	content: string
}

interface AddPostPayload {
	title: string
	content: string
}

const initialState: PostsState[] = [
	{ id: '1', title: 'First Post!', content: 'Hello!' },
	{ id: '2', title: 'Second Post', content: 'More text' },
]

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		addPost: (state, action: PayloadAction<AddPostPayload>) => {
			const { title, content } = action.payload
			state.push({ id: nanoid(), title, content })
		},
	},
})

// Actions
export const { addPost } = postSlice.actions

// Reducer
export default postSlice.reducer

// Selector
export const selectPosts = (state: RootState) => state.posts
