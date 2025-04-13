import Header from "./components/Header/Header"
import HeroSection from "./components/TutorTitle/TutorTitle"
import CategoryNav from "./components/CategoryNav/CategoryNav"
import TutorsList from "./components/TutorsList/TutorsList"
import "./App.css"
import CourseList from "./components/CourseList/CourseList"
import AuthPage from "./components/Login/AuthPage"
import TutorPage from "./pages/CustomerPage"
import PaymentPage from "./pages/PaymentPage"
import CustomerPage from "./pages/CustomerPage"
import TutoringRequestForm from "./pages/TutoringRequestForm"

function App() {
  return (
    <div className="app">
      <CustomerPage  />
      {/* <PaymentPage /> */}
      {/* <AuthPage /> */}
  
      <TutoringRequestForm />
    </div>
  )
}

export default App
