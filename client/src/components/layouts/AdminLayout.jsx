import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import AdminSidebar from '../admin/Sidebar'

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout