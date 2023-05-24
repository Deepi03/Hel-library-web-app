/* eslint-disable prettier/prettier */
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"

import { logout } from "../../redux/slices/userSlice"
import { AppDispatch, RootState } from "../../redux/store"
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
  Typography
} from "@mui/material"

import { BookRounded } from "@mui/icons-material"
import { SyntheticEvent, useState } from "react"
import { Search } from "../search/Search"
import { LoginButton } from "../LoginButton"
import { User } from "../../types_variables/types"

export const NavBar = () => {
  const currentTab = () => {
    const path = window.location.pathname
    if (path === "/") return "/"
    else if (path === "/books") return "/books"
    else if (path === "/authors") return "/authors"
  }
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { item: user } = useSelector((state: RootState) => state.user)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [value, setValue] = useState(currentTab)

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

  const pages = [
    { to: "/", label: "Home" },
    { to: "/books", label: "Books" },
    { to: "/authors", label: "Authors" }
  ]

  const handleLogout = () => {
    setAnchorElUser(null)
    dispatch(logout())
    setValue("/")
    navigate("/")
  }
  //when path being called directly

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
    navigate(newValue)
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff;", p: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" }
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#323232", fontSize: "2.2rem" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link
                    sx={{
                      textDecoration: "none",
                      color: "#323232",
                      textAlign: "center"
                    }}
                    href={page.to}
                  >
                    {page.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
          <Box>
            <Search></Search>
          </Box>

          {/* Nav bar login or avatar placer holder */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
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
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        e.preventDefault()
                        setAnchorElUser(null)
                        navigate("profile")
                      }}
                    >
                      Profile
                    </Link>
                  </MenuItem>
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
                </Menu>
              </>
            ) : (
              <LoginButton />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
