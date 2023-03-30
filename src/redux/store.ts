import { configureStore } from "@reduxjs/toolkit"

import { authorReducer } from "./reducers/authorReducer"
import { booksReducer } from "./reducers/booksReducer"
import { genreReducer } from "./reducers/genresReducer"
import { userReducer } from "./reducers/userReducer"

export const store = configureStore({
  reducer: {
    book: booksReducer,
    author: authorReducer,
    user: userReducer,
    genre: genreReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
