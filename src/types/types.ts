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

/* export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
} */

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

export const googleUserInitialState = {
  email: "",
  family_name: "",
  given_name: "",
  id: "",
  locale: "",
  name: "",
  picture: "",
  verified_email: ""
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
