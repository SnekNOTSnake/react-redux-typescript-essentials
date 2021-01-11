import React from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector, useAppDispatch } from '../../app/store'
import PostAuthor from './PostAuthor'
import PostDate from './PostDate'
import ReactionButtons from './ReactionButtons'
import { fetchPosts, selectAllPosts } from './postsSlice'

const PostsList: React.FC = () => {
	const dispatch = useAppDispatch()
	const posts = useTypedSelector(selectAllPosts)
	const orderedPosts = posts.entries.slice().sort((a, b) => b.date - a.date)

	const postStatus = useTypedSelector((state) => state.posts.status)

	React.useEffect(() => {
		if (postStatus === 'idle') dispatch(fetchPosts())
	}, [dispatch, postStatus])

	let renderContent
	if (postStatus === 'loading') {
		renderContent = <div>Loading...</div>
	} else if (postStatus === 'success') {
		renderContent = orderedPosts.map((post) => (
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
	} else if (postStatus === 'failed') {
		renderContent = <div>{posts.error}</div>
	}

	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{renderContent}
		</section>
	)
}

export default PostsList
