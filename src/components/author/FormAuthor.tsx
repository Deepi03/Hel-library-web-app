/* eslint-disable prettier/prettier */
import { Box, Button, Card, TextField } from "@mui/material"
import { Author } from "../../types_variables/types"

type Props = {
  author: Author
  setAuthor: React.Dispatch<React.SetStateAction<Author>>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  label: string
}
export const FormAuthor = ({
  author,
  setAuthor,
  handleSubmit,
  label
}: Props) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="main-card-login">
          <Box mb={2}>
            <TextField
              variant="outlined"
              type="text"
              placeholder="name"
              fullWidth
              autoComplete="name"
              required
              defaultValue={author?.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAuthor({ ...author, name: e.target.value })
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="info"
              type="text"
              fullWidth
              autoComplete="info"
              autoFocus
              required
              defaultValue={author?.info}
              onChange={(e) => setAuthor({ ...author, info: e.target.value })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="text"
              variant="outlined"
              placeholder="Image"
              fullWidth
              autoComplete="Image"
              autoFocus
              required
              defaultValue={author?.image}
              onChange={(e) =>
                setAuthor({
                  ...author,
                  image: e.target.value
                })
              }
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              bgcolor: "#DDD0C8",
              color: "btn.text",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
            }}
          >
            {label}
          </Button>
        </Card>
      </form>
    </div>
  )
}
