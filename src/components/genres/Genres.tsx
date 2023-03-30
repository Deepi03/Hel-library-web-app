/* eslint-disable prettier/prettier */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography
} from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { filterBooksByGenre } from "../../redux/reducers/booksReducer"

import { AppDispatch, RootState } from "../../redux/store"
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
