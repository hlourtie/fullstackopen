import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
	mutation createBook( 
		$title: String!,
			$publishedNumber: Int!,
			$author: String!,
			$genres: [String]
	 ){
		 addBook(
			 title:$title,
			 published:$publishedNumber,
			 author:$author,
			 genres:$genres
			){
				title
				published
				author
			}
	 }
`

export const UPDATE_BIRTHDAY = gql`
	 mutation updateBirthday(
		 $author: String!,
		 $bornNumber: Int!
		 ){
			 editAuthor(
				 name:$author,
				 born:$bornNumber
				 ){
					 name
					 born
					 bookCount
				 }
		 }
`