/* eslint-disable prettier/prettier */

import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import { AuthorsTable } from "./AuthorsTable"

export const Authors = () => {
  const { items: authors, filteredAuthors } = useSelector(
    (state: RootState) => state.author
  )

  return (
    <div>
      {filteredAuthors.length > 0 ? (
        <AuthorsTable authors={filteredAuthors} />
      ) : (
        <AuthorsTable authors={authors} />
      )}
    </div>
  )
}
