/* eslint-disable prettier/prettier */
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
}

export type UsersState = {
  item: User | undefined
  isLoading: boolean
  error: string | undefined
  status: string
}

export type User = {
  id?: string
  username: string
  password?: string
  role?: Role
}
enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export type DecodedUser = {
  role: Role
  user_id: string
  username: string
}

export type Transaction = {
  id?: string
  user: string
  book: string
  borrowDate: string
  returnDate: string
  returned: boolean
  toBeReturned: boolean
}

export type BorrowDto = {
  id?: string
  bookId: string
  userId: string
  day: Days
}

export enum Days {
  TEN = "TEN",
  TWENTY = "TWENTY",
  THIRTY = "THIRTY"
}

export type TransactionState = {
  items: Transaction[]
  isLoading: boolean
  error: string | undefined
  message: string
}
