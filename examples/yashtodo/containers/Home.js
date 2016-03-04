import React, { Component, PropTypes }  from 'react'
import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit,
         fetchTopicsIfNeeded } from '../actions'
import store from '../store/configureStore'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class Home extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchTopicsIfNeeded())
            .then(() => {
                if ("selectedReddit" in this.props.params) {
                    dispatch(selectReddit(this.props.params.selectedReddit))
                } else {
                    dispatch(selectReddit(store.getState().topicsFromReddit.items[0].display_name))
                }
            })
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.selectedReddit !== this.props.selectedReddit) {
            const {dispatch, selectedReddit } = nextprops
            dispatch(fetchPostsIfNeeded(selectedReddit))
        }
    }

    handleChange(nextReddit) {
        this.props.dispatch(selectReddit(nextReddit))
        this.context.router.push(nextReddit);
    }

    handleRefreshClick(e) {
        e.preventDefault()
        const { dispatch, selectedReddit } = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    render() {
        const { topicsFromReddit, selectedReddit, posts, isFetching, lastUpdated} = this.props
        const topicsOptions = topicsFromReddit.items.map(topic => topic.display_name)
        return (
            <div>
                <Picker value={selectedReddit}
                        onChange={this.handleChange}
                        options={topicsOptions} />
                <p>
                    {lastUpdated &&
                        <span>
                            Last updated at { new Date(lastUpdated).toLocaleTimeString()}.
                        </span>
                    }
                    {!isFetching &&
                        <a href="#" onClick={this.handleRefreshClick}>Refresh</a>}
                </p>
                {isFetching && posts.length === 0 && <h2>Loading {selectedReddit}...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty</h2>}

                {posts.length >0 &&
                    <div style={{ opacity: isFetching ? 0.5 : 1}}>
                        <Posts posts={posts} />
                    </div>
                }
            </div>
        )
    }
}

Home.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    topicsFromReddit: PropTypes.object.isRequired
}

Home.contextTypes = {
    router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { topicsFromReddit, selectedReddit, postsByReddit } = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    }
    return {
        topicsFromReddit,
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(Home)

