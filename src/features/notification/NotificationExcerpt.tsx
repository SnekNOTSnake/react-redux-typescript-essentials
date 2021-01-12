import React from 'react'
import classnames from 'classnames'
import { formatDistanceToNow } from 'date-fns'
import { Notification } from '../../app/types'
import { useTypedSelector } from '../../app/store'
import { selectUserById } from '../users/usersSlice'

type Props = { notification: Notification }

const NotificationExcerpt: React.FC<Props> = ({ notification }) => {
	const notifClassname = classnames('notification', {
		new: notification.isNew,
	})

	const timeAgo = formatDistanceToNow(notification.date)
	const user = useTypedSelector((state) =>
		selectUserById(state, notification.user),
	) || { name: 'Unknown user' }

	return (
		<div key={notification.id} className={notifClassname}>
			<div>
				<b>{user.name}</b> {notification.message}
			</div>
			<div title={new Date(notification.date).toISOString()}>
				<i>{timeAgo} ago</i>
			</div>
		</div>
	)
}

export default NotificationExcerpt
