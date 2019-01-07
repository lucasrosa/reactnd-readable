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
    .then(data => data)

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
    ]).then(([posts, categories]) => ({
        posts,
        categories
    }))
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