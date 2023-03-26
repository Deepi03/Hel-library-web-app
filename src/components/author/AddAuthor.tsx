/* eslint-disable prettier/prettier */
import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { addAuthor } from "../../redux/reducers/authorReducer"
import { AppDispatch } from "../../redux/store"
import { initialAuthorState, unique_id } from "../../types_variables/constants"
import { PartialAuthor } from "../../types_variables/types"

export const AddAuthor = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [author, setAuthor] = useState<PartialAuthor>(initialAuthorState)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    author.id = unique_id
    dispatch(addAuthor(author))
  }
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={author.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAuthor({ ...author, name: e.target.value })
          }}
          required
        />
        <label htmlFor="info">Info</label>
        <input
          type="text"
          name="info"
          required
          value={author.info}
          onChange={(e) =>
            setAuthor({
              ...author,
              info: e.target.value
            })
          }
        />

        <input type="submit" value={"submit"} />
      </form>
    </div>
  )
}
