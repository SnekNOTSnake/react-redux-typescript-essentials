import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from './store'
import {
	fetchNotifications,
	selectAllNotifications,
} from '../features/notification/notificationSlice'

export const Navbar: React.FC = () => {
	const dispatch = useAppDispatch()
	const handleFetchNotifications = () => dispatch(fetchNotifications())
	const notifications = useTypedSelector(selectAllNotifications)
	const unreadNumbers = notifications.filter((n) => !n.read).length

	const renderBadge =
		unreadNumbers > 0 ? <span className="badge">{unreadNumbers}</span> : ''

	return (
		<nav>
			<section>
				<h1>Redux Essentials Example</h1>

				<div className="navContent">
					<div className="navLinks">
						<Link to="/">Posts</Link>
						<Link to="/users">Users</Link>
						<Link to="/notifications">Notifications</Link>
					</div>

					<button type="button" onClick={handleFetchNotifications}>
						Fetch Notifications {renderBadge}
					</button>
				</div>
			</section>
		</nav>
	)
}
