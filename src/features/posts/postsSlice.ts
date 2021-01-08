import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface AddPayload {
	id: string
	title: string
	content: string
	date: number
	user: string
	reactions: Reactions
}

interface UpdatePayload {
	id: string
	title: string
	content: string
}

interface ReactionPayload {
	postId: string
	reaction: ReactionType
}

const createInitReactions = (): Reactions => ({
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
		addPost: {
			reducer: (state, action: PayloadAction<AddPayload>) => {
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
		updatePost: (state, action: PayloadAction<UpdatePayload>) => {
			const { id, title, content } = action.payload
			const post = state.find((el) => el.id === id)
			if (post) {
				post.title = title
				post.content = content
			}
		},
		addReaction: (state, action: PayloadAction<ReactionPayload>) => {
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

// Selector
export const selectPosts = (state: RootState) => state.posts
