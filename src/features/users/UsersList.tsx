import React from 'react'
import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../app/store'
import { selectAllUsers } from './usersSlice'

const UsersList: React.FC = () => {
	const users = useTypedSelector(selectAllUsers)

	const renderUsers = users.map((user) => (
		<li key={user.id}>
			<Link to={`/users/${user.id}`}>{user.name}</Link>
		</li>
	))

	return (
		<section>
			<h2>UsersList</h2>
			<ul>{renderUsers}</ul>
		</section>
	)
}

export default UsersList
