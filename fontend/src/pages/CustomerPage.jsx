
import React from "react";
import Header from "../components/Header/Header";
import AuthPage from "../components/Login/AuthPage";
import HeroSection from "../components/TutorTitle/TutorTitle";
import CategoryNav from "../components/CategoryNav/CategoryNav";
import TutorsList from "../components/TutorsList/TutorsList";


const CustomerPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroSection />
        <CategoryNav />
        <TutorsList />
      </main>
    </div>
  );
};

export default CustomerPage;
