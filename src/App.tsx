import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/AddPostForm'

const App: React.FC = () => {
	return (
		<Router>
			<Navbar />
			<div className="App">
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<React.Fragment>
								<PostsList />
								<AddPostForm />
							</React.Fragment>
						)}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	)
}

export default App