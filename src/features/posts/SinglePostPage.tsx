import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

type Params = RouteComponentProps<{ id: string }>

const SinglePostPage: React.FC<Params> = ({ match }) => {
	const { id } = match.params
	const post = useSelector((state: RootState) =>
		state.posts.find((el) => el.id === id),
	)

	if (!post)
		return (
			<section>
				<h2>Post Not Found</h2>
			</section>
		)

	return (
		<section>
			<article className="post">
				<h2>{post.title}</h2>
				<p className="post-content">{post.content}</p>
			</article>
		</section>
	)
}

export default SinglePostPage
