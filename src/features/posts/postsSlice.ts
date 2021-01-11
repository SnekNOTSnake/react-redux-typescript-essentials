import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Post, Reaction, AsyncState } from '../../app/types'
import { client } from '../../api/client'

const initialState: AsyncState<Post> = {
	entries: [],
	status: 'idle',
	error: null,
}

// Thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const res = await client.get('/fakeApi/posts')
	return res.posts
})

export const addNewPost = createAsyncThunk(
	'posts/addNewPost',
	async (initialPost: Partial<Post>) => {
		const res = await client.post('/fakeApi/posts', { post: initialPost })
		// The response includes the complete post object, including unique ID
		return res.post
	},
)

// Slice
const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		// Actions (Don't try to mutate any data outside of createSlice)
		updatePost: (
			state,
			action: PayloadAction<Pick<Post, 'id' | 'content' | 'title'>>,
		) => {
			const { id, title, content } = action.payload
			const post = state.entries.find((el) => el.id === id)
			if (post) {
				post.title = title
				post.content = content
			}
		},
		addReaction: (
			state,
			action: PayloadAction<{ postId: string; reaction: keyof Reaction }>,
		) => {
			const { postId, reaction } = action.payload
			const post = state.entries.find((el) => el.id === postId)
			if (!post) return state
			post.reactions[reaction] += 1
		},
	},
	extraReducers: {
		[fetchPosts.pending.type]: (state, action) => {
			// When the request starts, we'll set the status enum to 'loading'
			state.status = 'loading'
		},
		[fetchPosts.fulfilled.type]: (state, action) => {
			// If the request succeeds, we mark the status as 'succeeded',
			// and add the fetched posts to state.posts
			state.status = 'success'
			state.entries = state.entries.concat(action.payload)
		},
		[fetchPosts.rejected.type]: (state, action) => {
			// If the request fails, we'll mark the status as 'failed',
			// and save any error message into the state so we can display it
			state.status = 'failed'
			state.error = action.error.message
		},

		[addNewPost.fulfilled.type]: (state, action) => {
			state.entries.push(action.payload)
		},
	},
})

// Actions
export const { updatePost, addReaction } = postSlice.actions

// Reducer
export default postSlice.reducer

// Selectors
export const selectAllPosts = (state: RootState) => state.posts
export const selectPostById = (state: RootState, id: string) =>
	state.posts.entries.find((post) => post.id === id)
