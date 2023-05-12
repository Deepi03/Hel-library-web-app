simport { configureStore } from "@reduxjs/toolkit"
import { authorsReducer } from "../../redux/slices/authorSlice"
import { booksReducer } from "../../redux/slices/bookSlice"
import { genresReducer } from "../../redux/slices/genreSlice"
import { usersReducer } from "../../redux/slices/userSlice"

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
