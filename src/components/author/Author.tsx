/* eslint-disable prettier/prettier */
import { Box, IconButton, Modal, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import UpdateIcon from "@mui/icons-material/Update"
import ReadMoreIcon from "@mui/icons-material/ReadMore"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAdmin } from "../../hook/useAdmin"
import { deleteAuthor } from "../../redux/reducers/authorReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Author } from "../../types_variables/types"
import "../books/Books.css"

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

export const Authors = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authors = useSelector((state: RootState) => state.author.items)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState("")
  const isAdmin = useAdmin()
  const handleOpen = (author: Author) => {
    if (author.info) {
      setInfo(author.info)
      setOpen(true)
    } else {
      setOpen(false)
    }
  }
  const handleUpdate = (id: string) => {
    navigate(`/${id}/updateAuthor`)
  }
  const handleClose = () => setOpen(false)

  const handleDelete = (author: Author) => {
    dispatch(deleteAuthor(author))
  }
  const handleAddAuthor = () => {
    navigate("/addAuthor")
  }

  return (
    <Box sx={{ m: "5rem" }}>
      <h2>Authors</h2>
      {isAdmin && (
        <button className="add-btn" onClick={() => handleAddAuthor()}>
          Add Author
        </button>
      )}
      <table id="books">
        <thead>
          <tr>
            <th>Name</th>
            <th>Info</th>
            {isAdmin && <th>Update</th>}
            {isAdmin && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>
                <IconButton>
                  <ReadMoreIcon
                    sx={{ color: "#323232" }}
                    onClick={() => handleOpen(author)}
                  ></ReadMoreIcon>
                </IconButton>
              </td>
              <td>
                {isAdmin && (
                  <IconButton
                    onClick={() => {
                      handleUpdate(author.id)
                    }}
                  >
                    <UpdateIcon sx={{ color: "#323232" }}></UpdateIcon>
                  </IconButton>
                )}
              </td>
              {isAdmin && (
                <td>
                  <IconButton>
                    <DeleteIcon
                      sx={{ color: "#323232" }}
                      onClick={() => {
                        handleDelete(author)
                      }}
                    ></DeleteIcon>
                  </IconButton>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

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
    </Box>
  )
}
