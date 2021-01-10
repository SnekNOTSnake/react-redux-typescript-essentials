import React from 'react'
import { Post, Reaction } from '../../app/types'
import { useAppDispatch } from '../../app/store'
import { addReaction } from './postsSlice'

const emojis = {
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
	const dispatch = useAppDispatch()

	const renderButtons = Object.entries(emojis).map(([name, emoji]) => (
		<button
			onClick={() =>
				dispatch(
					addReaction({ postId: post.id, reaction: name as keyof Reaction }),
				)
			}
			key={name}
			className="muted-butt	on reaction-button"
			type="button"
		>
			{emoji} {post.reactions[name as keyof Reaction]}
		</button>
	))

	return <div>{renderButtons}</div>
}

export default ReactionButtons
