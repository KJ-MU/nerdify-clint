import "./App.css";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SigninPage";
import CoursesPage from "./pages/CoursesPage";
import ProfilePage from "./pages/ProfilePage";
import { Route, Routes } from "react-router-dom";
import NewCoursePage from "./pages/NewCoursePage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "./features/courseSlice";
import SingleCoursePage from "./pages/SingleCoursePage";
import { fetchUserProfile } from "./features/userSlice";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const courses = useSelector((state) => state.course);
  useEffect(() => {
    dispatch(fetchCourses());

    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Dispatch fetchUserProfile action
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      {" "}
      <LoadingSpinner />
    </div>
  ) : (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-course" element={<NewCoursePage />} />
        <Route
          path="/courses"
          element={<CoursesPage courses={courses.courses} />}
        />
        <Route path="/single-course/:id" element={<SingleCoursePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
