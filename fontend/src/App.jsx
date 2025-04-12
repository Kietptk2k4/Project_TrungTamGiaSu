import Header from "./components/Header/Header"
import HeroSection from "./components/TutorTitle/TutorTitle"
import CategoryNav from "./components/CategoryNav/CategoryNav"
import TutorsList from "./components/TutorsList/TutorsList"
import "./App.css"

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroSection />
        <CategoryNav />
        <TutorsList />
      </main>
    </div>
  )
}

export default App
