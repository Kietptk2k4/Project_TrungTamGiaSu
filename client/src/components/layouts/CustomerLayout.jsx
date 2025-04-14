// File: src/components/layouts/CustomerLayout.jsx
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import CustomerSidebar from '../customer/Sidebar'

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <CustomerSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default CustomerLayout