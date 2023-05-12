import { configureStore } from "@reduxjs/toolkit"

import { authorsReducer } from "./slices/authorSlice"
import { booksReducer } from "./slices/bookSlice"
import { genresReducer } from "./slices/genreSlice"
import { usersReducer } from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    book: booksReducer,
    author: authorsReducer,
    user: usersReducer,
    genre: genresReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
