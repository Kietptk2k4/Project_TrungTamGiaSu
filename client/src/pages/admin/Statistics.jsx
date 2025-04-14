// // AdminDashboard.jsx
// import React, { useEffect, useState } from 'react';
// import { Grid, Paper, Typography, Box } from '@mui/material';
// import { People, School, RequestPage, Feedback, MonetizationOn } from '@mui/icons-material';
// import axios from 'axios';

// const StatCard = ({ icon: Icon, label, value }) => (
//   <Paper elevation={3} sx={{ p: 2 }}>
//     <Box display="flex" alignItems="center">
//       <Icon sx={{ fontSize: 40, mr: 2 }} />
//       <Box>
//         <Typography variant="h6">{label}</Typography>
//         <Typography variant="h4">{value}</Typography>
//       </Box>
//     </Box>
//   </Paper>
// );

// const StatisticsPage = () => {
//   const [stats, setStats] = useState({
//     users: 0,
//     tutors: 0,
//     customers: 0,
//     courses: 0,
//     requests: 0,
//     feedbacks: 0,
//     revenue: 0,
//   });

// //   useEffect(() => {
// //     axios.get('/api/admin/stats')
// //       .then(response => setStats(response.data))
// //       .catch(error => console.error('Error fetching stats:', error));
// //   }, []);
//     useEffect(() => {
//         // Tạm thời set dữ liệu mẫu
//         setStats({
//         users: 120,
//         tutors: 45,
//         customers: 75,
//         courses: 30,
//         requests: 60,
//         feedbacks: 15,
//         revenue: 13500000,
//         });
    
//         // Khi có server thì bật lại dòng dưới
//         // axios.get('/api/admin/stats')
//         //   .then(response => setStats(response.data))
//         //   .catch(error => console.error('Error fetching stats:', error));
//     }, []);
  

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>Thống kê Hệ thống</Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard icon={People} label="Tổng người dùng" value={stats.users} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard icon={School} label="Tổng gia sư" value={stats.tutors} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard icon={People} label="Tổng khách hàng" value={stats.customers} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard icon={School} label="Tổng khóa học" value={stats.courses} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard icon={RequestPage} label="Tổng yêu cầu dạy học" value={stats.requests} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard icon={Feedback} label="Tổng phản hồi" value={stats.feedbacks} />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <StatCard icon={MonetizationOn} label="Tổng doanh thu" value={`₫${stats.revenue.toLocaleString()}`} />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default StatisticsPage;
