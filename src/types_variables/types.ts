export type Book = {
  id: string
  isbn: string
  title: string
  authorId: string
  description: string
  publisher: string
  status: boolean
  borrowerId?: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  cover: string
  genreId: string
}

export type PartialBook = Partial<Book>
export type PartialAuthor = Partial<Author>

export type Author = {
  id: string
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
  books: Book[]
  isLoading: boolean
  error: string | undefined
  item: Author | null
}

export type BookState = {
  items: Book[]
  filteredBooks: Book[]
  filterBooksByGenre: Book[]
  filteredGenres: Genre[]
  filteredAuthors: Author[]
  isLoading: boolean
  error: string | undefined
  isBorrowed: boolean
}
export type UsersState = {
  item: GoogleLoggedInUser | undefined
  isLoggedIn: boolean
  isLoading: boolean
  error: string | undefined
}

export type GoogleLoggedInUser = {
  email: string
  family_name: string
  given_name: string
  id: string
  locale: string
  name: string
  picture: string
  verified_email: string
}

export type Borrow = {
  user: GoogleLoggedInUser | undefined
  books: Book[]
}
