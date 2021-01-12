import React from 'react'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTypedSelector, useAppDispatch } from '../../app/store'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

type InputChange = React.ChangeEvent<HTMLInputElement>
type TextareaChange = React.ChangeEvent<HTMLTextAreaElement>
type SelectChange = React.ChangeEvent<HTMLSelectElement>

const AddPostForm: React.FC = () => {
	const [title, setTitle] = React.useState('')
	const [content, setContent] = React.useState('')
	const [user, setUser] = React.useState('')
	const [addRequestStatus, setAddRequestStatus] = React.useState('idle')

	const users = useTypedSelector(selectAllUsers)
	const dispatch = useAppDispatch()
	const canSave = title && content && user && addRequestStatus === 'idle'

	const onTitleChanged = (e: InputChange) => setTitle(e.target.value)
	const onContentChanged = (e: TextareaChange) => setContent(e.target.value)
	const onUserChanged = (e: SelectChange) => setUser(e.target.value)
	const submitHandler = async () => {
		if (!canSave) return

		try {
			setAddRequestStatus('loading')
			const resultAction = await dispatch(addNewPost({ title, content, user }))
			unwrapResult(resultAction)
			setTitle('')
			setContent('')
			setUser('')
		} catch (err) {
			console.error(err)
		} finally {
			setAddRequestStatus('idle')
		}
	}

	const renderUserOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	))

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
				<label htmlFor="postAuthor">Author:</label>
				<select id="postAuthor" value={user} onChange={onUserChanged}>
					<option value="">-</option>
					{renderUserOptions}
				</select>
				<button disabled={!canSave} onClick={submitHandler} type="button">
					Save Post
				</button>
			</form>
		</section>
	)
}

export default AddPostForm
