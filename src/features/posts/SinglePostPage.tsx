import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'

type Props = RouteComponentProps<{ id: string }>

const SinglePostPage: React.FC<Props> = ({ match }) => {
	const { id } = match.params
	const post = useTypedSelector((state) =>
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
