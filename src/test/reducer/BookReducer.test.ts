/* /* eslint-disable prettier/prettier */
/* import createTestStore from "../utils/testStore"
import { books } from "../fixtures/testBooks"
import { fetchBooks } from "../../redux/middlewares/bookThunk"
import {
  addBook,
  sortBookByAvailable,
  sortBookByTitle,
  updateBook,
  deleteBook,
  borrowBook
} from "../../redux/slices/bookSlice"

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe("test book reducer", () => {
  test("fetch books", async () => {
    await store.dispatch(fetchBooks())
    expect(store.getState().booksReducer.items.length).toBeGreaterThan(0)
  })
  test("should add", () => {
    books.map((book) => store.dispatch(addBook(book)))
    expect(store.getState().booksReducer.items.length).toBe(3)
  })
  test("should be borrowed", () => {
    books.map((book) => store.dispatch(addBook(book)))
    store.dispatch(borrowBook({ id: "4", userId: "3", days: 10 }))
    expect(store.getState().booksReducer.items[1].status).toBeFalsy()
  })
  test("should sort by title", () => {
    books.map((book) => store.dispatch(addBook(book)))
    store.dispatch(sortBookByTitle())
    expect(store.getState().booksReducer.items[0].title).toBe("Jack and Jill")
  })
  test("should sort by available", () => {
    books.map((book) => store.dispatch(addBook(book)))
    store.dispatch(sortBookByAvailable())
    expect(store.getState().booksReducer.items[0].title).toBe("Qwerty")
  })
  test("should update", () => {
    books.map((book) => store.dispatch(addBook(book)))
    store.dispatch(updateBook({ id: "2", isbn: "413257406" }))
    expect(store.getState().booksReducer.items[1].isbn).toBe("413257406")
  })
  test("should delete", () => {
    books.map((book) => store.dispatch(addBook(book)))
    store.dispatch(deleteBook({ id: "2" }))
    expect(store.getState().booksReducer.items.length).toBe(2)
  })
}) */
