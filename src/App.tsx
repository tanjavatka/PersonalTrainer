import { NavLink, Outlet } from 'react-router'

import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import Stack from "@mui/material/Stack"

function App() {

  return (
    <Container maxWidth="lg" >
      <AppBar position="static">
        <Toolbar>
          <Typography fontSize={25}> Personal Trainer </Typography>
        </Toolbar>
      </AppBar>

      <nav>
        <Stack direction="row" spacing={3} sx={{ m: 3, mt: 5, flexGrow: 1, justifyContent: "center" }}>

          <NavLink
            to={'/'}
            style={({ isActive }: { isActive: boolean }) => ({
              textDecoration: "none",
              color: "black",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Home
          </NavLink>

          <NavLink
            to={'/customers'}
            style={({ isActive }: { isActive: boolean }) => ({
              textDecoration: "none",
              color: "black",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Customers
          </NavLink>

          <NavLink
            to={'/trainings'}
            style={({ isActive }: { isActive: boolean }) => ({
              textDecoration: "none",
              color: "black",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Trainings
          </NavLink>

          <NavLink
            to={'/calendar'}
            style={({ isActive }: { isActive: boolean }) => ({
              textDecoration: "none",
              color: "black",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Calendar
          </NavLink>

        </Stack>
      </nav>
      <Outlet />

      <CssBaseline />
    </Container>
  )
}

export default App
