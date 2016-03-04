import React, { Component, PropTypes }  from 'react'
import { browserHistory } from 'react-router'

export default class Login extends Component {
    handleSubmit(e) {
        e.preventDefault()
        console.log(this.refs.login.value + ' ' + this.refs.password.value)
        browserHistory.push("/")
    }

    render() {
        return (
            <div>
                <h2>Login</h2>
                <form method="post" action="" onSubmit={this.handleSubmit.bind(this)}>
                    <p><input type="text" name="login" ref="login"
                        placeholder="Username or Email" /></p>
                    <p><input type="password" name="password" ref="password"
                        placeholder="Password" /></p>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}