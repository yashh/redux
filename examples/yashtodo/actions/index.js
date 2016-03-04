import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const FETCH_TOPICS = 'FETCH_TOPICS'
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS'

export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    }
}

export function invalidateReddit(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    }
}

function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    }
}

function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit: reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchPosts(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit))
        return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)))
    }
}

function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit))
        }
    }
}

function receiveTopics(json) {
    return {
        type: RECEIVE_TOPICS,
        items: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function requestTopics() {
    return {
        type: FETCH_TOPICS
    }
}

function fetchTopics() {
    return dispatch => {
        dispatch(requestTopics())
        return fetch(`https://www.reddit.com/reddits.json`)
            .then(response => response.json())
            .then(function(json) {
                dispatch(receiveTopics(json))
            })
    }
}

export function shouldFetchTopics(state) {
    const topics = state.topicsFromReddit
    if (!topics) {
        return true
    }
    if (topics.isFetching) {
        return false
    }
    return topics.items.length === 0
}

export function fetchTopicsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchTopics(getState())) {
            return dispatch(fetchTopics())
        }
    }
}
