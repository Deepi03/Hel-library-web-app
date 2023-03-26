import { v4 as uuid } from "uuid"
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

export const initialAuthorState = {
  id: "",
  name: "",
  books: [],
  info: ""
}
export const borrowInitialState = {
  user: undefined,
  items: [],
  isBorrowed: false
}

export const unique_id = uuid()
const bDate = new Date()
const rDate = new Date()
rDate.setDate(bDate.getDate() + 30)
export const bDateString = bDate.toDateString()
export const rDateString = rDate.toDateString()
