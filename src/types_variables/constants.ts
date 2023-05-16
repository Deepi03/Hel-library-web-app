/* eslint-disable prettier/prettier */
import { v4 as uuid } from "uuid"
import { BookDto } from "./types"

export const initialUseState = {
  username: "",
  password: ""
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
