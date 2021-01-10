import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { Post, Reaction } from '../../app/types'

const createInitReactions = (): Reaction => ({
	eyes: 0,
	heart: 0,
	hooray: 0,
	rocket: 0,
	thumbsUp: 0,
})
const initialState: Post[] = [
	{
		id: '1',
		title: 'First Post!',
		content: 'Hello!',
		date: 1610064571213,
		reactions: createInitReactions(),
	},
	{
		id: '2',
		title: 'Second Post',
		content: 'More text',
		date: 1610064577810,
		reactions: createInitReactions(),
	},
]

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		// Actions (Don't try to mutate any data outside of createSlice)
		addPost: {
			reducer: (state, action: PayloadAction<Post>) => {
				const { id, title, content, user, date, reactions } = action.payload
				state.push({ id, title, content, user, date, reactions })
			},
			prepare: (title: string, content: string, userId: string) => {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						user: userId,
						date: Date.now(),
						reactions: createInitReactions(),
					},
				}
			},
		},
		updatePost: (
			state,
			action: PayloadAction<Pick<Post, 'id' | 'content' | 'title'>>,
		) => {
			const { id, title, content } = action.payload
			const post = state.find((el) => el.id === id)
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
			const post = state.find((el) => el.id === postId)
			if (!post) return state
			post.reactions[reaction] += 1
		},
	},
})

// Actions
export const { addPost, updatePost, addReaction } = postSlice.actions

// Reducer
export default postSlice.reducer
