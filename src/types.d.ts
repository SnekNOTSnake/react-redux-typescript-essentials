interface Post {
	id: string
	title: string
	content: string
	date: number
	user?: string
	reactions: Reactions
}

type ReactionType = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes'

interface Reactions {
	[key: string]: number
	thumbsUp: number
	hooray: number
	heart: number
	rocket: number
	eyes: number
}
