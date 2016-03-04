import React, { Component, PropTypes } from 'react'
import LikeButton from './LikeButton'

export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.handleLike = this.handleLike.bind(this)
    }

    handleLike() {
        console.log("liked")
    }

    render() {
        const { posts } = this.props
        return (
            <ul>
                {posts.map((post, i) =>
                    <li key={i}>
                        [{post.ups} &#8593;]
                        <a href={post.url} target="_blank">{post.title}</a>
                        ({post.num_comments} comments)
                        <LikeButton liked={false} postId={post.id} />
                        <p>{post.selftext}</p>
                    </li>
                )}
            </ul>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}