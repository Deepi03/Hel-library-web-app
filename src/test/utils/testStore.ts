import { configureStore } from "@reduxjs/toolkit"
import { authorsReducer } from "../../redux/reducers/authorsReducer"
import { booksReducer } from "../../redux/reducers/booksReducer"
import { genresReducer } from "../../redux/reducers/genresReducer"
import { usersReducer } from "../../redux/reducers/usersReducer"

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      booksReducer,
      authorsReducer,
      genresReducer,
      usersReducer
    }
  })
  return store
}

export default createTestStore
