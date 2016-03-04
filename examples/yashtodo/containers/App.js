import React, { Component, PropTypes }  from 'react'
import { Link } from 'react-router'

export default class App extends Component {
    render() {
        return (
            <div className="nav">
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>

              {this.props.children}
              
            </div>
        )
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired,
};