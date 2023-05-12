import { v4 as uuid } from "uuid"
import { Book, BookDto } from "./types"

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

export const initialBookstate: BookDto = {
  id: "",
  isbn: "",
  title: "",
  description: "",
  author: "",
  publishedDate: "",
  publisher: "",
  available: true,
  cover: "",
  genre: ""
}

export const initialAuthorState = {
  id: "",
  name: "",
  info: "",
  image: ""
}
export const borrowInitialState = {
  user: undefined,
  items: [],
  isBorrowed: false
}

export const unique_id = uuid()
