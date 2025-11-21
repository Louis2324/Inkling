import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import LoginSignUp from "./components/auth/LoginSignUp.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./components/Create.jsx";
import BlogDetails from "./components/BlogDetails.jsx";
import NotFound from "./components/NotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EditBlog from "./components/EditBlog.jsx";

const toggleTheme = () => {
  const currentTheme = document.body.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.body.setAttribute("data-theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
  }
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/create"
              element={
                <ProtectedRoute allowedRoles={["writer", "admin"]}>
                  <Create />
                </ProtectedRoute>
              }
            />
            <Route exact path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/edit/:id" element={
              <ProtectedRoute allowedRoles={["writer","admin"]}>
                <EditBlog/>
            </ProtectedRoute> 
          }/>

            <Route exact path="/register" element={<LoginSignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <button
          className="theme-toggle"
          onClick={() => {
            toggleTheme();
          }}
        ></button>
      </div>
    </Router>
  );
}

export default App;
