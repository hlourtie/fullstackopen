const _ = require('lodash')

const dummy = (array) => {
	return 1
}

const totalLikes = (array) => {
	return array.reduce((sum, ele) => {
		return (sum + ele.likes)}, 0);
}

const favoriteBlog = (array) => {
	return array.reduce((fav,ele) => {
		return (fav.likes > ele.likes? fav : ele)
	}, {likes:0} )
}

const mostBlogs = (array) => {

	const count = _.countBy(array, _.iteratee('author'))
	console.log("count array", count)
	const keys = Object.keys(count)
	let author = keys[0];
	let num = count[keys[0]];

	for(let i = 1; i < keys.length; i++){
		if(num < count[keys[i]])
		{
			author = keys[i]
			num = count[keys[i]]
		}
	}
	return {
		author: author ,
		blogs: num
	}
}

const mostLikes = (array) =>{
	const count = _.countBy(array, _.iteratee('author'))
	const keys = Object.keys(count)
	let author = keys[0];
	let likes = 0;
	for(let i = 0; i < keys.length; i++){

		const authorArray = _.filter(array, [ 'author', keys[i]])
		const likesAuthor = authorArray.reduce((sum, ele)=>{return sum+ele.likes}, 0)
		if(likes< likesAuthor)
		{
			author = keys[i]
			likes = likesAuthor
		}
	}
	return {
		author: author,
		likes: likes

	}

}

module.exports = { 
	dummy, 
	totalLikes,
	favoriteBlog, 
	mostBlogs,
	mostLikes
}