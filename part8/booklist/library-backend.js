const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/books')
const Author = require('./models/authors')
const config = require('./utils/config')

const MONGODB_URI = config.MONGODB_URI
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
const typeDefs = gql`
	type Author {
		name: String!
		id: ID!
		born: Int
    bookCount: Int
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}

  type Query {
	  bookCount: Int!
    authorCount: Int!
    allBooks(author: String , genre: String): [Book]!
    allAuthors: [Author!]!
  }

  type Mutation{
    addBook(
      title: String!
		  published: Int!
		  author: String!
		  genres: [String]
   ): Book,
   addAuthor(
    name: String!
   ) : Author, 
   editAuthor(
     name:String!
     born: Int
   ):Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if(!args.author && !args.genre){ // if none are given
        return Book.find({})
      }else if(!args.genre){ //if no genre is given
      return Book.find({ author: args.author})
      }else if(!args.author){ //if no author is given
        return Book.find({ genres:{ $in: args.genre}})
      }else { // if both are given
        return Book.find({author : args.author, genres: { $in: args.genre}})
      }
    },
    allAuthors: () => Author.find({}) 
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born || null,
    bookCount: (root) => books.reduce((a , book) => (book.author === root.name ? a + 1 : a),0 ),
    id: (root) => root.id
  },
  Mutation: {
    addBook: (root, args )=> {
      const book = new Book({...args})
      return book.save()
    } , 
    editAuthor: async (root, args) => {
      
      return Author.findOneAndUpdate({name:args.name},{born: args.born},{runValidators:true, new:true} )
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})