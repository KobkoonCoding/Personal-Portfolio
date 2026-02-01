import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Project from "./sections/Project";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ActivityDetail from "./pages/ActivityDetail";
import AllActivities from "./pages/AllActivities";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Project />
            <Experience />
            <Contact />
          </>
        } />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
};



export default App;

