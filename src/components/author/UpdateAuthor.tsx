/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { v4 as uuid } from "uuid"

import { updateAuthor } from "../../redux/reducers/authorReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { initialAuthorState } from "../../types_variables/constants"
import { PartialAuthor } from "../../types_variables/types"

export const UpdateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author.items)

  const { authorId } = useParams()
  const [uAuthor, setUAuthor] = useState<PartialAuthor>(initialAuthorState)
  const author = authors.find((au) => authorId === au.id)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateAuthor(uAuthor))
  }
  return (
    <div>
      {author && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={author.name}
            disabled={false}
            onChange={(e) => {
              setUAuthor({ ...author, name: e.target.value })
            }}
          />
          <label htmlFor="title">Info</label>
          <input
            type="text"
            name="info"
            defaultValue={author.info}
            onChange={(e) => setUAuthor({ ...author, info: e.target.value })}
          />

          <input type="submit" value={"submit"} />
        </form>
      )}
      {/* <p>{book && book.isbn}</p>
      <p>{book?.authors.name}</p>
      <p>{book?.title}</p>
      <p>{book?.description}</p>
      <p>{book?.publishedDate}</p> */}
    </div>
  )
}
