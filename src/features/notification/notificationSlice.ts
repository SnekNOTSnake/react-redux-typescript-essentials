import {
	createAsyncThunk,
	createSlice,
	PayloadAction,
	createEntityAdapter,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Notification } from '../../app/types'
import { client } from '../../api/client'

// Adapter
const notificationAdapter = createEntityAdapter<Notification>()

// Initial state
const initialState = notificationAdapter.getInitialState()

// Thunks
export const fetchNotifications = createAsyncThunk(
	'notifications/fetchNotifications',
	async (_, { getState }): Promise<Notification[]> => {
		const allNotifications = selectAllNotifications(getState() as RootState)
		const [latestNotification] = allNotifications
		const latestTimestamp = latestNotification ? latestNotification.date : 0
		const res = await client.get(
			`/fakeApi/notifications?since=${latestTimestamp}`,
		)
		return res.notifications
	},
)

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		readAllNotifications: (state, action: PayloadAction<void>) => {
			Object.values(state.entities).forEach((notification) => {
				if (notification) notification.read = true
			})
		},
	},
	extraReducers: {
		[fetchNotifications.fulfilled.type]: (state, action) => {
			// Any notifications we've read are no longer new
			Object.values(state.entities).forEach((notification) => {
				if (notification) notification.isNew = !notification.read
			})
			notificationAdapter.upsertMany(state, action.payload)
		},
	},
})

export default notificationSlice.reducer
export const { readAllNotifications } = notificationSlice.actions
export const {
	selectAll: selectAllNotifications,
} = notificationAdapter.getSelectors((state: RootState) => state.notifications)
