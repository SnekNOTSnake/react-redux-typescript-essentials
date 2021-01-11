export interface Post {
	id: string
	title: string
	content: string
	date: number
	user: string
	reactions: Reaction
}

export interface User {
	id: string
	name: string
}

export interface Reaction {
	thumbsUp: number
	hooray: number
	heart: number
	rocket: number
	eyes: number
}

export interface AsyncState<T> {
	status: 'idle' | 'loading' | 'success' | 'failed'
	error: string | null
	entries: T[]
}
