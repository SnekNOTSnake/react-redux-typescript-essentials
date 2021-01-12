import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	createSelector,
	createEntityAdapter,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Post, Reaction } from '../../app/types'
import { client } from '../../api/client'

// Adapter
const postsAdapter = createEntityAdapter<Post>({
	sortComparer: (a, b) => b.date - a.date,
})

// Initial state
const initialState = postsAdapter.getInitialState({
	status: 'idle',
	error: null,
})

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
			const post = state.entities[id]
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
			const post = state.entities[postId]
			if (!post) return state
			post.reactions[reaction] += 1
		},
	},
	extraReducers: {
		[fetchPosts.pending.type]: (state, action) => {
			state.status = 'loading'
		},
		[fetchPosts.fulfilled.type]: (state, action) => {
			state.status = 'success'

			// Use the `upsertMany` reducer as a mutating update utility
			postsAdapter.upsertMany(state, action.payload)
		},
		[fetchPosts.rejected.type]: (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		},

		// Use the `addOne` reducer for the fulfilled case
		[addNewPost.fulfilled.type]: postsAdapter.addOne,
	},
})

// Actions
export const { updatePost, addReaction } = postSlice.actions

// Reducer
export default postSlice.reducer

// Selectors
// Export the customized selectors for this adapter using `getSelectors`
export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts)

// Memoized selector
export const selectPostByUser = createSelector(
	[selectAllPosts, (state: RootState, userId: string) => userId],
	(res1, res2) => res1.filter((post) => post.user === res2),
)
