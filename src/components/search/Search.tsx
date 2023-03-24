import { useDispatch } from "react-redux"

import { AppDispatch } from "../../redux/store"
import { searchBook } from "../../redux/reducers/bookReducer"
import { fetchBooks } from "../../redux/middlewares/fetchBooks"

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleSearch = (e: any) => {
    if (e.target.value.length > 0) {
      dispatch(searchBook(e.target.value))
    } else {
      dispatch(fetchBooks())
    }
  }
  return (
    <div>
      <input type="text" onChange={handleSearch} />
    </div>
  )
}
