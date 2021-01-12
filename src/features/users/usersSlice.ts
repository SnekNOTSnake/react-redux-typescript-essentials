import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { client } from '../../api/client'
import { User } from '../../app/types'

// Adapter
const usersAdapter = createEntityAdapter<User>()
const initialState = usersAdapter.getInitialState({
	status: 'idle',
	error: null,
})

// Thunk
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const res = await client.get('/fakeApi/users')
	return res.users
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchUsers.pending.type]: (state, action) => {
			state.status = 'loading'
		},
		[fetchUsers.fulfilled.type]: (state, action) => {
			state.status = 'success'
			usersAdapter.upsertMany(state, action.payload)
		},
		[fetchUsers.rejected.type]: (state, action) => {
			state.status = 'failed'
			console.log(action.error.message)
		},
	},
})

export default usersSlice.reducer
export const {
	selectAll: selectAllUsers,
	selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users)
