import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true"
}

const appRoutes = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: isLoggedIn() ? <Dashboard /> : <Navigate to="/" />
  }
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {appRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
