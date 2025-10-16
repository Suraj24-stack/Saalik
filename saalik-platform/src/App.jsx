import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import StoriesPage from "./pages/StoriesPage.jsx";
import GuideBookingPage from "./pages/GuideBookingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Footer from "./components/Footer.jsx";






function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <>
      <Navbar
        onHome={() => setCurrentPage("home")}
        onStories={() => setCurrentPage("stories")}
        onGuideBooking={() => setCurrentPage("guide-booking")}
        onContact={() => setCurrentPage("contact")}
        onLogin={() => setCurrentPage("login")}
      />

      {/* Conditionally render content on the same page */}
      {currentPage === "home" && <HomePage />}
      {currentPage === "stories" && <StoriesPage />}
      {currentPage === "guide-booking" && <GuideBookingPage />}
      {currentPage === "contact" && <ContactPage />}
      
      {currentPage === "Login" && <Login/>}
      {currentPage === "register" && <Register />}

      <Footer />
    </>
  );
}

export default App;
