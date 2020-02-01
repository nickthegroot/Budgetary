import React, { FC } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'

const AppRoutes: FC = () => (
    <Router>
        <Switch>
            <Route path="/login" exact component={LoginPage} />
            <AuthenticatedRoute path="/" exact component={ChatPage} />
        </Switch>
    </Router>
)

export default AppRoutes
