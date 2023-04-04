/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { logout } from "../../redux/reducers/userReducer"
import { AppDispatch, RootState } from "../../redux/store"
import { Login } from "../login/Login"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import { BookRounded } from "@mui/icons-material"
import { SyntheticEvent, useState } from "react"
import { Search } from "../search/Search"

export const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const { isLoggedIn, item: user } = useSelector((state: RootState) => {
    return state.user
  })

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  //when path being called directly
  const currentTab = () => {
    const path = window.location.pathname
    if (path === "/") return "/"
    else if (path === "/books") return "/books"
    else if (path === "/authors") return "/authors"
  }

  const pages = [
    { to: "/", label: "Home" },
    { to: "/books", label: "Books" },
    { to: "/authors", label: "Authors" }
  ]

  const [value, setValue] = useState(currentTab)
  const handleLogout = () => {
    setAnchorElUser(null)
    dispatch(logout())
    setValue("/")
    navigate("/")
  }

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
    navigate(newValue)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff;", p: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BookRounded
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "3rem",
              color: "#323232"
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#323232",
              textDecoration: "none"
            }}
          >
            Hel Library
          </Typography>
          {/* Mobile - view */}

          <BookRounded
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              fontSize: "3rem",
              position: "absolute",
              left: "20%",
              color: "#323232"
            }}
            href=""
          />
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {pages.map((page) => (
                <Tab value={page.to} label={page.label} key={page.label} />
              ))}
            </Tabs>
          </Box>

          {/* Nav bar login or avatar placer holder */}
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user?.picture} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Link
                      sx={{
                        color: "#323232",
                        fontSize: "1rem",
                        textDecoration: "none"
                      }}
                      to={"/"}
                      onClick={() => handleLogout()}
                    >
                      {"Logout"}
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <Link
                      sx={{
                        color: "#323232",
                        fontSize: "1rem",
                        textDecoration: "none"
                      }}
                      onClick={(e) => {
                        e.preventDefault()
                        setAnchorElUser(null)
                        navigate("profile")
                        setValue("")
                      }}
                    >
                      Profile
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Login></Login>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
