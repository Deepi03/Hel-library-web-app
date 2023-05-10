import { v4 as uuid } from "uuid"
import { Book } from "./types"

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

export const initialBookstate: Book = {
  id: "",
  isbn: "",
  title: "",
  description: "",
  authorId: "",
  publishedDate: "",
  publisher: "",
  status: true,
  cover: "",
  genreId: "",
  borrowDate: "",
  borrowerId: "",
  returnDate: ""
}

export const initialAuthorState = {
  id: "",
  name: "",
  info: ""
}
export const borrowInitialState = {
  user: undefined,
  items: [],
  isBorrowed: false
}

export const unique_id = uuid()
