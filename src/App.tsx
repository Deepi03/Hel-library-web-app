import { useDispatch, useSelector } from "react-redux"

import { Books } from "./components/books/Books"
import { fetchAuthors } from "./redux/middlewares/fetchAuthors"
import { fetchUsers } from "./redux/middlewares/fetchUsers"
import { AppDispatch, RootState } from "./redux/store"

function App() {
  const authors = useSelector((state: RootState) => state.author)
  const users = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="App">
      <Books></Books>
    </div>
  )
}

export default App
