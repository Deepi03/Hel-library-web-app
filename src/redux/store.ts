import { configureStore } from "@reduxjs/toolkit"

import { authorReducer } from "./reducers/authorReducer"
import { bookReducer } from "./reducers/bookReducer"
import { borrowReducer } from "./reducers/borrowReducer"
import { userReducer } from "./reducers/userReducer"

export const store = configureStore({
  reducer: {
    book: bookReducer,
    author: authorReducer,
    user: userReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
