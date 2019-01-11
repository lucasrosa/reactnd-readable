const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const _getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts)

export const _getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const _getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)



export function getInitialData () {
    return Promise.all([
        _getAllPosts(),
        _getAllCategories()
    ]).then(([posts, categories]) => {
        let postsWithCorrectId = {}
        posts.forEach((post) => {
            postsWithCorrectId[post.id] = post
        })

        return {
                posts: postsWithCorrectId,
                categories
            }
        }   
    )
}

export function getPostsByCategory (category) {
    return Promise.all([
        _getPostsByCategory(category),
    ]).then(([posts]) => ({
        posts
    }))
}



export const addPostOnServer = (post) =>
    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(res => res.json())
      .then(data => data)

export const getPost = (postId) =>
      fetch(`${api}/posts/${postId}`, {
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .then(data => data)      

export const voteForAPost = (postId, upVote) =>
      fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: upVote ? "upVote" : "downVote"
        })
      }).then(res => res.json())
        .then(data => data)

export const updatePostOnServer = (postId, title, body) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body
        })
    }).then(res => res.json())
        .then(data => data)    

export const deletePostOnServer = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => data)
        
export const getPostComments = (postId) =>
    fetch(`${api}/posts/${postId}/comments`, {
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(comments => { 
            //console.log("data", data);return data
            let commentsWithCorrectId = {}
            comments.forEach((comment) => {
                commentsWithCorrectId[comment.id] = comment
            })

            return commentsWithCorrectId
        })

export const addCommentOnServer = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())
        .then(data => data)     
        
export const getComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => data)


export const voteForAComment = (commentId, upVote) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: upVote ? "upVote" : "downVote"
        })
    }).then(res => res.json())
        .then(data => data)

export const updateCommentOnServer = (commentId, body, timestamp) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body,
            timestamp
        })
    }).then(res => res.json())
        .then(data => data)        


export const deleteCommentOnServer = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => data)