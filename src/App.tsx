import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth, Chat, Profile, Signup } from "./pages/pages";
import Header from "./widgets/Header/Header";
import Footer from "./widgets/Footer/Footer";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
