import React from 'react'
import { useTypedSelector } from '../../app/store'
import { selectUserById } from '../users/usersSlice'

type Props = {
	userId: string
}

const PostAuthor: React.FC<Props> = ({ userId }) => {
	const author = useTypedSelector((state) => selectUserById(state, userId))

	return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
