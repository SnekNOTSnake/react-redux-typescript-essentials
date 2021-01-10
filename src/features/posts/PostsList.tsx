import React from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import PostAuthor from './PostAuthor'
import PostDate from './PostDate'
import ReactionButtons from './ReactionButtons'

const PostsList: React.FC = () => {
	const posts = useTypedSelector((state) => state.posts)
	const orderedPosts = posts.slice().sort((a, b) => b.date - a.date)

	const renderPosts = orderedPosts.map((post) => (
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
	))

	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{renderPosts}
		</section>
	)
}

export default PostsList
