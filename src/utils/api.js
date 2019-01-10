const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

function generateUniqueId() {
    return Math.random().toString(36).substr(-8)
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



export const addPost = (post) =>
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

export const updatePost = (postId, title, body) =>
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

export const deletePost = (postId) =>
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
        .then(data => data)

export const addComment = (parentId, body, author) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id : generateUniqueId(),
            body,
            author,
            parentId
        })
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

export const updateComment = (commentId, body) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body,
            timestamp: Date.now()
        })
    }).then(res => res.json())
        .then(data => data)        


export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => data)