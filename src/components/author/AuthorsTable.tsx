/* eslint-disable prettier/prettier */
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Modal,
  Typography
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import UpdateIcon from "@mui/icons-material/Update"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import SortIcon from "@mui/icons-material/Sort"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { checkAdmin } from "../../hook/checkAdmin"
import { sortAuthorByName } from "../../redux/slices/authorSlice"
import { AppDispatch, RootState } from "../../redux/store"
import { Author, BookDto, User } from "../../types_variables/types"
import "./AuthorsTable.css"
import { deleteAuthorById } from "../../redux/middlewares/authorThunk"
import { getToken, getUserByToken } from "../../hook/getToken"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}

export const AuthorsTable = ({ authors }: { authors: Author[] }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { items: books } = useSelector((state: RootState) => state.book)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState("")
  const isAdmin = checkAdmin()
  const handleOpen = (author: Author) => {
    if (author.info) {
      setInfo(author.info)
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const token = getToken()
  let loggedUser: User
  if (token) {
    const user = getUserByToken(token)
    if (user) loggedUser = user
  }

  const handleUpdate = (author: Author) => {
    if (author.id) {
      const id = author.id
      navigate(`/${id}/updateAuthor`)
    }
  }
  const handleClose = () => setOpen(false)

  const handleDelete = (author: Author) => {
    if (author.id) {
      dispatch(deleteAuthorById(author.id))
    }
  }
  const handleAddAuthor = () => {
    navigate("/addAuthor")
  }
  const handleSort = () => {
    dispatch(sortAuthorByName())
  }

  return (
    <Box sx={{ m: "5rem" }}>
      {isAdmin && (
        <button className="add-author-btn" onClick={() => handleAddAuthor()}>
          Add Author
        </button>
      )}

      <table id="authors-table">
        <thead>
          <tr>
            <th>Picture</th>
            <th onClick={() => handleSort()}>
              Name <SortIcon />
            </th>
            <th>Books</th>
            <th>Info</th>
            {isAdmin && <th>Update</th>}
            {isAdmin && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>
                <Avatar
                  src={author.image}
                  variant="circular"
                  sx={{ width: 70, height: 70 }}
                />
              </td>
              <td>{author.name}</td>
              <td>
                {books.map((book: BookDto) => {
                  if (book.author === author.id) {
                    return <li key={book.id}>{book.title}</li>
                  }
                })}
              </td>
              <td>
                <IconButton>
                  <ReadMoreIcon
                    sx={{
                      color: "#323232",
                      "&:hover": {
                        boxShadow: "none",
                        color: "#9C28B0"
                      }
                    }}
                    onClick={() => handleOpen(author)}
                  ></ReadMoreIcon>
                </IconButton>
              </td>
              <td>
                {isAdmin && (
                  <IconButton
                    onClick={() => {
                      handleUpdate(author)
                    }}
                  >
                    <UpdateIcon
                      sx={{
                        color: "#323232",
                        "&:hover": {
                          boxShadow: "none",
                          color: "green"
                        }
                      }}
                    ></UpdateIcon>
                  </IconButton>
                )}
              </td>
              {isAdmin && (
                <td>
                  <IconButton>
                    <DeleteIcon
                      sx={{
                        color: "#323232",
                        "&:hover": {
                          boxShadow: "none",
                          color: "red"
                        }
                      }}
                      onClick={() => {
                        handleDelete(author)
                      }}
                    ></DeleteIcon>
                  </IconButton>
                </td>
              )}
              {/*  <td>
                <button
                  onClick={() => {
                    handleAuthorsingle(author.id)
                  }}
                ></button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal container */}
      <Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Author Info
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {info}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </Box>
  )
}
