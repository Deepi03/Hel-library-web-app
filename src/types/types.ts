export type Book = {
  id: string
  isbn: string
  title: string
  description: string
  publisher: Publisher
  authors: Author
  status: boolean
  borrowId: null | string
  publishedDate: string
  borrowDate: null | string
  returnDate: null | string
  cover: string
}

export type Author = {
  id: string
  name: string
}

export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
}

export type Publisher = {
  id: string
  name: string
}
