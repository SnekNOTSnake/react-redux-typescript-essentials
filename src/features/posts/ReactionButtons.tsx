import React from 'react'
import { useDispatch } from 'react-redux'
import { addReaction } from './postsSlice'

interface Emojis {
	[key: string]: string
	thumbsUp: string
	hooray: string
	heart: string
	rocket: string
	eyes: string
}

const emojis: Emojis = {
	thumbsUp: '👍',
	hooray: '🎉',
	heart: '❤️',
	rocket: '🚀',
	eyes: '👀',
}

type Props = {
	post: Post
}

const ReactionButtons: React.FC<Props> = ({ post }) => {
	const dispatch = useDispatch()

	const renderButtons = Object.keys(emojis).map((emoji) => (
		<button
			onClick={() =>
				dispatch(
					addReaction({ postId: post.id, reaction: emoji as ReactionType }),
				)
			}
			key={emoji}
			className="muted-butt	on reaction-button"
			type="button"
		>
			{emojis[emoji]} {post.reactions[emoji]}
		</button>
	))

	return <div>{renderButtons}</div>
}

export default ReactionButtons
