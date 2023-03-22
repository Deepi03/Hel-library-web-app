import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AddBook } from "./components/books/AddBook"
import { Books } from "./components/books/Books"
import { UpdateBook } from "./components/books/UpdateBook"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/books">
            <Route path="" element={<Books />} />
            <Route path={":bookId/updateBook/"} element={<UpdateBook />} />
          </Route>
          <Route path="/addBook" element={<AddBook></AddBook>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
