import React from 'react'
import { Link } from 'react-router-dom'
import { EntityId } from '@reduxjs/toolkit'
import { useTypedSelector } from '../../app/store'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import PostDate from './PostDate'
import ReactionButtons from './ReactionButtons'

type Props = { postId: EntityId }

const PostExcerpt: React.FC<Props> = ({ postId }) => {
	const post = useTypedSelector((state) => selectPostById(state, postId))

	return post ? (
		<article className="post-excerpt" key={post.id}>
			<h3>{post.title}</h3>

			<div>
				<PostAuthor userId={post.user} />
				<PostDate date={post.date} />
			</div>

			<p className="post-content">{post.content.substring(0, 100)}</p>

			<div>
				<Link to={`/post/${post.id}`} className="button muted-button">
					Read more
				</Link>
				<Link to={`/edit/${post.id}`} className="button muted-button">
					Edit
				</Link>
			</div>

			<ReactionButtons post={post} />
		</article>
	) : (
		<React.Fragment />
	)
}

export default PostExcerpt
