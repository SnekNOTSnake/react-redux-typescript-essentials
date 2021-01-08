import React from 'react'
import { formatISO, formatDistanceToNow } from 'date-fns'

type Props = {
	date: number
}

const PostDate: React.FC<Props> = ({ date }) => {
	return (
		<span title={formatISO(date)}>
			&nbsp; <i>{formatDistanceToNow(date)}</i>
		</span>
	)
}

export default PostDate
