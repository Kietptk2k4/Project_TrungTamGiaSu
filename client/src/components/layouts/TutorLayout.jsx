import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import TutorSidebar from '../tutor/Sidebar'

const TutorLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <TutorSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default TutorLayout