// import { Outlet } from 'react-router-dom'
// import Header from '../common/Header'
// import Footer from '../common/Footer'

// const MainLayout = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   )
// }

// export default MainLayout
// File: src/components/layouts/MainLayout.jsx
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout