import React from 'react'
import { useTypedSelector } from '../../app/store'
import { selectUserById } from './usersSlice'
import { selectPostByUser } from '../posts/postsSlice'
import { Link, RouteComponentProps } from 'react-router-dom'

type Props = RouteComponentProps<{ userId: string }>

const UserPage: React.FC<Props> = ({ match }) => {
	const { userId } = match.params
	const user = useTypedSelector((state) => selectUserById(state, userId))
	const posts = useTypedSelector((state) => selectPostByUser(state, userId))

	const renderPostTitles = posts.map((post) => (
		<li key={post.id}>
			<Link to={`/post/${post.id}`}>{post.title}</Link>
		</li>
	))

	if (!user)
		return (
			<div>
				<h2>User not found</h2>
			</div>
		)

	return (
		<section>
			<h2>
				By {user.name} ({user.id})
			</h2>
			<ul>{renderPostTitles}</ul>
		</section>
	)
}

export default UserPage
