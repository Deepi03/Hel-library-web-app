import { configureStore } from "@reduxjs/toolkit"

import { authorsReducer } from "./reducers/authorsReducer"
import { booksReducer } from "./reducers/booksReducer"
import { genresReducer } from "./reducers/genresReducer"
import { usersReducer } from "./reducers/usersReducer"

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
