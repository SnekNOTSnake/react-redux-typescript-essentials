import React from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from './postsSlice'

type InputChange = React.ChangeEvent<HTMLInputElement>
type TextareaChange = React.ChangeEvent<HTMLTextAreaElement>

const AddPostForm: React.FC = () => {
	const [title, setTitle] = React.useState('')
	const [content, setContent] = React.useState('')
	const dispatch = useDispatch()

	const onTitleChanged = (e: InputChange) => setTitle(e.target.value)
	const onContentChanged = (e: TextareaChange) => setContent(e.target.value)
	const submitHandler = () => {
		dispatch(addPost({ title, content }))
		setTitle('')
		setContent('')
	}

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

export default AddPostForm
