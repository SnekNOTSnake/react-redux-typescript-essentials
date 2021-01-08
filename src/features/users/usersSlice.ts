import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface UserState {
	id: string
	name: string
}

const initialState: UserState[] = [
	{ id: '1', name: 'Tiffany Mandeville' },
	{ id: '2', name: 'Old man Jenkins' },
]

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
})

export default usersSlice.reducer
export const selectUsers = (state: RootState) => state.users
// export const {} = usersSlice.actions
