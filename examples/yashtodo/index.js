import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import store from './store/configureStore'
import Home from './containers/Home'
import Login from './containers/Login'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// const store = configureStore()

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="login" component={Login}/>
                <Route path=":selectedReddit" component={Home} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
)
