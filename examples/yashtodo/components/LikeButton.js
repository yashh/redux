import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'

export default class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {liked: props.liked};
    }

    handleClick(postId, event) {
        event.preventDefault()
        this.setState({liked: !this.state.liked})
        fetch(`/like`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
        }).then(response => console.log(response))
    }

    render() {
        const { postId } = this.props
        var text = this.state.liked ? 'UnLike' : 'Like'
        return (
            <a key={postId} href="#" onClick={this.handleClick.bind(this, postId)}>{text}</a>
        )
    }
}

LikeButton.propTypes = {
    liked: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired
}
