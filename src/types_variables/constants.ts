import { createTheme } from "@mui/material"

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

export const borrowInitialState = {
  user: undefined,
  items: [],
  isBorrowed: false
}

export const theme = {
  iconbutton: {
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(",")
  }
}
