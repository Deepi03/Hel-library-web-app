/* eslint-disable prettier/prettier */

import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import { GenreCards } from "./GenreCards"

export const Genres = () => {
  const { items: genres, filteredGenres } = useSelector(
    (state: RootState) => state.genre
  )

  return (
    <div>
      {filteredGenres.length > 0 ? (
        <GenreCards genres={filteredGenres} />
      ) : (
        <GenreCards genres={genres} />
      )}
    </div>
  )
}
