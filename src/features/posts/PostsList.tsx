import React from 'react'
import { useTypedSelector, useAppDispatch } from '../../app/store'
import { fetchPosts, selectPostIds } from './postsSlice'
import PostExcerpt from './PostExcerpt'

const PostsList: React.FC = () => {
	const dispatch = useAppDispatch()
	const postIds = useTypedSelector(selectPostIds)
	const error = useTypedSelector((state) => state.posts.error)

	const postStatus = useTypedSelector((state) => state.posts.status)

	React.useEffect(() => {
		if (postStatus === 'idle') dispatch(fetchPosts())
	}, [dispatch, postStatus])

	let renderContent
	if (postStatus === 'loading') {
		renderContent = <div>Loading...</div>
	} else if (postStatus === 'success') {
		renderContent = postIds.map((postId) => (
			<PostExcerpt key={postId} postId={postId} />
		))
	} else if (postStatus === 'failed') {
		renderContent = <div>{error}</div>
	}

	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{renderContent}
		</section>
	)
}

export default PostsList
