/* eslint-disable prettier/prettier */
/* export type Book = {
  id?: string
  isbn: string
  title: string
  author: Author
  description: string
  publisher: string
  available: boolean
  borrowerId?: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  cover: string
  genre: Genre
} */
export type BookDto = {
  id?: string
  genre: string
  author: string
  title: string
  isbn: string
  publishedDate: string
  publisher: string
  cover: string
  description: string
  available: boolean
}
/* export type PartialBook = Partial<Book> */
export type PartialAuthor = Partial<Author>

export type Author = {
  id?: string
  name: string
  info: string
  image: string
}
export type Genre = {
  id: string
  name: string
  description: string
  coverImage: string
}

export type GenreState = {
  items: Genre[]
  isLoading: boolean
  error: string | undefined
}

export type AuthorState = {
  items: Author[]
  isLoading: boolean
  error: string | undefined
  item: Author | null
}

export type BookState = {
  items: BookDto[]
  filteredBooks: BookDto[]
  filterBooksByGenre: BookDto[]
  filteredGenres: Genre[]
  filteredAuthors: Author[]
  isLoading: boolean
  error: string | undefined
  isBorrowed: boolean
}
export type UsersState = {
  item: User | undefined
  isLoggedIn: boolean
  isLoading: boolean
  error: string | undefined
  status: string
}

export type User = {
  id?: string
  username: string
  password: string
  role?: "ADMIN" | "USER"
}
