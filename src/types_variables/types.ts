export type Book = {
  id: string
  isbn: string
  title: string
  authorId: string
  description: string
  publisher: string
  status: boolean
  borrowId: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  cover: string
  userMail: string
  genreId: string
}

export type PartialBook = Partial<Book>
export type PartialAuthor = Partial<Author>

export type Author = {
  id: string
  name: string
  info: string
}
export type Genre = {
  id: string
  name: string
  description: string
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
}

export type BookState = {
  items: Book[]
  filteredBooks: Book[]
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
