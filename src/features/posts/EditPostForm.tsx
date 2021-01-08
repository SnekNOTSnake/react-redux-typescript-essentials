import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from '../../app/store'
import { updatePost } from './postsSlice'

type Params = RouteComponentProps<{ id: string }>
type InputChange = React.ChangeEvent<HTMLInputElement>
type TextareaChange = React.ChangeEvent<HTMLTextAreaElement>

const EditPostForm: React.FC<Params> = ({ match, history }) => {
	const post = useSelector((state: RootState) => {
		return state.posts.find((el) => el.id === match.params.id)
	})

	const [title, setTitle] = React.useState(post?.title || '')
	const [content, setContent] = React.useState(post?.content || '')
	const dispatch = useDispatch()

	const onTitleChanged = (e: InputChange) => setTitle(e.target.value)
	const onContentChanged = (e: TextareaChange) => setContent(e.target.value)
	const submitHandler = () => {
		dispatch(updatePost({ id: match.params.id, title, content }))
		history.push('/')
	}

	if (!post)
		return (
			<section>
				<h2>The post you want to edit is not found</h2>
			</section>
		)

	return (
		<section>
			<h2>Add a New Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button onClick={submitHandler} type="button">
					Save Post
				</button>
			</form>
		</section>
	)
}

export default EditPostForm
