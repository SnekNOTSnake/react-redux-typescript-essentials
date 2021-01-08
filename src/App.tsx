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
import SinglePostPage from './features/posts/SinglePostPage'
import EditPostForm from './features/posts/EditPostForm'

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
					<Route
						exact
						path="/post/:id"
						render={(props) => <SinglePostPage {...props} />}
					/>
					<Route
						exact
						path="/edit/:id"
						render={(props) => <EditPostForm {...props} />}
					/>
					<Redirect to="/" />
				</Switch>
			</div>
		</Router>
	)
}

export default App
