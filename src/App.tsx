import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth, Chat, Profile, Signup, Home } from "./pages/pages";
import Header from "./widgets/Header/Header";
import Footer from "./widgets/Footer/Footer";
import "./index.css";
import { ReactNode } from "react";
import { useAppStore } from "./store/store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/apiClient";
import { GET_USER_INFO } from "./utils/constants";

interface IRoute {
  children: ReactNode;
}

function PrivateRoute({ children }: IRoute) {
  const { userInfo } = useAppStore();
  const isAuth = !!userInfo; // returns true if userInfo is undefined
  return isAuth ? children : <Navigate to="/auth" />;
}

function AuthRoute({ children }: IRoute) {
  const { userInfo } = useAppStore();
  console.log(userInfo);
  const isAuth = !!userInfo; // returns true if userInfo is undefined
  return isAuth ? <Navigate to="/chat" /> : children;
}

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
          console.log(response);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };
    if (loading) {
      getUserData();
    }
  }, [loading]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
