
import "./App.css"
import AuthPage from "./components/Login/AuthPage"
import CustomerPage from "./pages/CustomerPage"
import TutoringRequestForm from "./pages/TutoringRequestForm"

function App() {
  return (
    <div className="app">
      <CustomerPage  />
      {/* <PaymentPage /> */}
      <AuthPage />
      
      {/* <TutoringRequestForm /> */}
    </div>
  )
}

export default App
