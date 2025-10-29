import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import StoriesPage from "./pages/Stories.jsx";
import StoryDetailPage from "./pages/StoryDetailPage.jsx"; 
import GuideBookingPage from "./pages/GuideBookingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Main website routes with Navbar and Footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        } />
        
        <Route path="/stories" element={
          <>
            <Navbar />
            <StoriesPage />
            <Footer />
          </>
        } />
        
        <Route path="/stories/:id" element={
          <>
            <Navbar />
            <StoryDetailPage />
            <Footer />
          </>
        } />
        
        <Route path="/guide-booking" element={
          <>
            <Navbar />
            <GuideBookingPage />
            <Footer />
          </>
        } />
        
        <Route path="/contact" element={
          <>
            <Navbar />
            <ContactPage />
            <Footer />
          </>
        } />
        
        <Route path="/login" element={<Login />} />
        
        {/* Admin Dashboard - WITHOUT Navbar and Footer */}
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;