import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../app/types'

const initialState: User[] = [
	{ id: '1', name: 'Tiffany Mandeville' },
	{ id: '2', name: 'Old man Jenkins' },
]

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
})

export default usersSlice.reducer
// export const {} = usersSlice.actions
