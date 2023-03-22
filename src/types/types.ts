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
}

export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
}

export const initialBookstate = {
  id: "",
  isbn: "",
  title: "",
  description: "",
  authors: {
    id: "",
    name: ""
  },
  publishedDate: "",
  publisher: "",
  status: true,
  cover: ""
}
