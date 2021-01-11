import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { User, AsyncState } from '../../app/types'

const initialState: AsyncState<User> = {
	entries: [],
	status: 'idle',
	error: null,
}

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
			state.entries = state.entries.concat(action.payload)
		},
		[fetchUsers.rejected.type]: (state, action) => {
			state.status = 'failed'
			console.log(action.error.message)
		},
	},
})

export default usersSlice.reducer
// export const {} = usersSlice.actions
