export type Book = {
  id: string
  isbn: string
  title: string
  description: string
  publisher: string
  authors: Author
  status: boolean
  borrowId: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  cover: string
}

export type PartialBook = Partial<Book>

export type Author = {
  id: string
  name: string
  books?: []
  info?: string
}

export type AuthorState = {
  items: Author[]
  isLoading: boolean
  error: string | undefined
}

export type BookState = {
  items: Book[]
  isLoading: boolean
  error: string | undefined
  user: GoogleLoggedInUser | undefined
  isBorrowed: boolean
}
export type UsersState = {
  items: GoogleLoggedInUser | undefined
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
