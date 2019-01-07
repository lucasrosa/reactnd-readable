import {
    _getAllPosts,
    _getAllCategories,
    _getPostsByCategory
} from './_DATA.js'

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