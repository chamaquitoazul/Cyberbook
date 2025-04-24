import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./hooks/useAuth";
import HomeLayout from "./layouts/HomeLayout";
import BookPage from "./pages/BookPage";
import { BooksProvider } from "./hooks/useBooks";
import ProfilePage from "./pages/ProfilePage";
import RequireAuth from "./components/RequireAuth";
import RootLayout from "./layouts/RootLayout";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <>
      <AuthProvider>
        <BooksProvider>
          <RouterProvider router={router} />
        </BooksProvider>
      </AuthProvider>
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route element={<RequireAuth child={<HomeLayout />} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/book/:id" element={<BookPage />} />
        <Route path="/home/profile" element={<ProfilePage />} />
        <Route path="/home/profile-edit" element={<EditProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Route>
  )
);

export default App;
