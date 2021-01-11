import React from 'react'
import { useTypedSelector } from '../../app/store'

type Props = {
	userId: string
}

const PostAuthor: React.FC<Props> = ({ userId }) => {
	const author = useTypedSelector((state) =>
		state.users.entries.find((el) => el.id === userId),
	)

	return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
