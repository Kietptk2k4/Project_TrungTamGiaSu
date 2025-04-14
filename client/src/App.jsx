// File: src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import CustomerLayout from './components/layouts/CustomerLayout';
import TutorLayout from './components/layouts/TutorLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TutorListPage from './pages/TutorListPage';
import TutorDetailPage from './pages/TutorDetailPage';
import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';

// Customer Pages
import CustomerDashboard from './pages/customer/Dashboard';
import TutorRequest from './pages/customer/TutorRequest';
import MyCoursesPage from './pages/customer/MyCourses';
import CourseDetailPage from './pages/customer/CourseDetail';
import FeedbackPage from './pages/customer/Feedback';
import CustomerProfilePage from './pages/customer/Profile';
// import PaymentPage from './pages/customer/Payment';

// Tutor Pages
import TutorDashboard from './pages/tutor/Dashboard';
import AvailableCoursesPage from './pages/tutor/AvailableCourses';
import TutorMyCoursesPage from './pages/tutor/MyCourses';
import TutorRequestsPage from './pages/tutor/Requests';
import RefundRequestsPage from './pages/tutor/RefundRequests';
import TutorProfilePage from './pages/tutor/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import CustomerRequestsPage from './pages/admin/CustomerRequests';
import AdminTutorRequestsPage from './pages/admin/TutorRequests';
import CoursesManagementPage from './pages/admin/CoursesManagement';
import UsersManagementPage from './pages/admin/UsersManagement';
// import PaymentsManagementPage from './pages/admin/PaymentsManagement';
// import StatisticsPage from './pages/admin/Statistics';

// Component bổ sung (nếu cần)
// import LoadingSpinner from './components/common/LoadingSpinner';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="tutors" element={<TutorListPage />} />
        <Route path="tutors/:id" element={<TutorDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        {/* <Route path="contact" element={<ContactPage />} /> */}
      </Route>
      
      {/* Customer Routes */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="request" element={<TutorRequest />} />
        <Route path="my-courses" element={<MyCoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
        <Route path="feedback/:id" element={<FeedbackPage />} />
        <Route path="profile" element={<CustomerProfilePage />} />
        {/* <Route path="payment/:id" element={<PaymentPage />} /> */}
      </Route>
      
      {/* Tutor Routes */}
      <Route path="/tutor" element={<TutorLayout />}>
        <Route index element={<TutorDashboard />} />
        <Route path="available-courses" element={<AvailableCoursesPage />} />
        <Route path="my-courses" element={<TutorMyCoursesPage />} />
        <Route path="requests" element={<TutorRequestsPage />} />
        <Route path="refunds" element={<RefundRequestsPage />} />
        <Route path="profile" element={<TutorProfilePage />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="customer-requests" element={<CustomerRequestsPage />} />
        <Route path="tutor-requests" element={<AdminTutorRequestsPage />} />
        <Route path="courses" element={<CoursesManagementPage />} />
        <Route path="users" element={<UsersManagementPage />} />
        {/* <Route path="payments" element={<PaymentsManagementPage />} /> */}
        {/* <Route path="statistics" element={<StatisticsPage />} /> */}
      </Route>
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;