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
  userMail: string
}

export type PartialBook = Partial<Book>
export type PartialAuthor = Partial<Author>

export type Author = {
  id: string
  name: string
  books?: never[]
  info?: string
}

export type AuthorState = {
  items: Author[]
  isLoading: boolean
  error: string | undefined
}

export type BookState = {
  items: Book[]
  singleBook: Book | undefined
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
