import React from 'react'
import { useTypedSelector, useAppDispatch } from '../../app/store'
import {
	selectAllNotifications,
	readAllNotifications,
} from './notificationSlice'
import NotificationExcerpt from './NotificationExcerpt'

const NotificationList: React.FC = () => {
	const dispatch = useAppDispatch()
	const notifications = useTypedSelector(selectAllNotifications)

	// Automatically read all notifications when entering this page
	React.useEffect(() => {
		dispatch(readAllNotifications())
	})

	const renderNotifications = notifications.map((notification) => (
		<NotificationExcerpt key={notification.id} notification={notification} />
	))

	return (
		<section>
			<h2>NotificationList</h2>
			{renderNotifications}
		</section>
	)
}

export default NotificationList
