import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

type Props = {
	userId?: string
}

const PostAuthor: React.FC<Props> = ({ userId }) => {
	const author = useSelector((state: RootState) =>
		state.users.find((el) => el.id === userId),
	)

	return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
