import { useDispatch, useSelector } from "react-redux"
import { fetchAuthors } from "./redux/middlewares/fetchAuthors"
import { fetchBooks } from "./redux/middlewares/fetchBooks"
import { fetchUsers } from "./redux/middlewares/fetchUsers"
import { AppDispatch, RootState } from "./redux/store"

function App() {
  const books = useSelector((state: RootState) => state.book)
  const authors = useSelector((state: RootState) => state.author)
  const users = useSelector((state: RootState) => state.user)

  console.log("users", users)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchBooks())}>Fetch Books</button>
        <ul>
          {books.items.map((book) => (
            <li key={book.id}>{book.authors.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => dispatch(fetchAuthors())}>Fetch Authors</button>
        <ol>
          {authors.items.map((author) => (
            <li key={author.id}>{author.name}</li>
          ))}
        </ol>
      </div>
      <div>
        <button onClick={() => dispatch(fetchUsers())}>Fetch Users</button>
        <ol>
          {users.items.map((user) => (
            <li key={user.id}>{user.firstname}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default App
