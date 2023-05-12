/* eslint-disable prettier/prettier */
import createTestStore from "../utils/testStore"
import { authors } from "../fixtures/testAuthors"
import { fetchAuthors } from "../../redux/middlewares/authorThunk"
import { sortAuthorByName } from "../../redux/slices/authorSlice"

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe("test author reducer", () => {
  test("fetch authors", async () => {
    await store.dispatch(fetchAuthors())
    expect(store.getState().authorsReducer.items.length).toBeGreaterThan(0)
  })
  /* test("should add", () => {
    authors.map((author) => store.dispatch(addAuthor(author)))
    expect(store.getState().authorsReducer.items.length).toBe(2)
  })

  test("should sort by name", () => {
    authors.map((author) => store.dispatch(addAuthor(author)))
    store.dispatch(sortAuthorByName())
    expect(store.getState().authorsReducer.items[0].name).toBe(
      "Chiquita Hammerberg"
    )
  })

  test("should update", () => {
    authors.map((author) => store.dispatch(addAuthor(author)))
    store.dispatch(updateAuthor({ id: "101", name: "Natka" }))
    expect(store.getState().authorsReducer.items[0].name).toBe("Natka")
  })
  test("should delete", () => {
    authors.map((author) => store.dispatch(addAuthor(author)))
    store.dispatch(deleteAuthor({ id: "101" }))
    expect(store.getState().authorsReducer.items.length).toBe(1)
  }) */
})
