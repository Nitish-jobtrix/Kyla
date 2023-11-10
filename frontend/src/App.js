import "./assets/libs/boxicons-2.1.1/css/boxicons.min.css";
import "./App.css";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
//import { theme } from './theme';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import LogIn from "./pages/LogIn";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./component/UserRoute";
import AdminRoute from "./component/AdminRoute";
import Layout from "./pages/global/Layout";
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import Flows from "./pages/Flows";
// import AdminDashboard from "./pages/admin/AdminDashboard";

import SingleJob from "./pages/SingleJob";
// import DashUsers from "./pages/admin/DashUsers";
// import DashJobs from "./pages/admin/DashJobs";
import Register from "./pages/Register";
// import DashCategory from "./pages/admin/DashCategory";
// import DashCreateJob from "./pages/admin/DashCreateJob";
// import DashCreateCategory from "./pages/admin/DashCreateCategory";

//kyla merging
import Blank from "./pages/Blank";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateJobPage from "./pages/CreateJobPage";
import CategoriesPage from "./pages/CategoriesPage";
import EditJobPage from "./pages/EditJobPage";
import JobsPage from "./pages/JobsPage";

//company user page
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";

import { createTheme } from "@mui/material/styles";
import { themeColors } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import UsersPage from "./pages/UsersPage";
import PostOnLinkedIn from "./pages/PostOnLinkedIn";

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
// const AdminDashboardHOC = Layout(AdminDashboard);
// const DashUsersHOC = Layout(DashUsers);
// const DashJobsHOC = Layout(DashJobs);
// const DashCategoryHOC = Layout(DashCategory);
// const DashCreateJobHOC = Layout(DashCreateJob);
// const DashCreateCategoryHOC = Layout(DashCreateCategory);

const App = () => {
  const { mode } = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);

  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              
            
              <Route path="/jobs/:companyName" element={<Home />} />
              <Route path="/jobs/:companyName/user/dashboard" element={ <UserRoute> 
                    <UserDashboardHOC />
                  </UserRoute>} />
              
              <Route path="/jobs/register" element={<UserRegister />} />
              <Route path="/jobs/login" element={<UserLogin />} />
    
             
              <Route path="/" element={ <AdminRoute><MainLayout /></AdminRoute>}>
                <Route index element={<Dashboard />} />
              <Route path="linkedin/post" element={<PostOnLinkedIn />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="recentapplications" element={<Blank />} />
                <Route path="categories/create" element={<CreateCategoryPage />} />
                <Route path="jobs" element={<JobsPage />} />
                <Route path="job/create" element={<CreateJobPage />} />
                <Route path="job/edit/:jobId" element={<EditJobPage />} />
                <Route path="profile" element={<Blank />} />
                <Route path="categories"  element={<CategoriesPage />} />
                <Route path="flows"  element={<Flows />} />
                {/* <Route path="appliedjobs/user/:" element={<CategoriesPage />} /> */}
              </Route>
              <Route
                path="/jobs/:companyName/search/location/:location"
                element={<Home />}
              />
              <Route path="/jobs/:companyName/search/:keyword" element={<Home />} />
              <Route path="/jobs/:companyName/job/:id" element={<SingleJob />} />
              
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              {/* <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboardHOC />
                  </AdminRoute>
                }
              /> */}
              {/* <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <DashUsersHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/jobs"
                element={
                  <AdminRoute>
                    <DashJobsHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/category"
                element={
                  <AdminRoute>
                    <DashCategoryHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/job/create"
                element={
                  <AdminRoute>
                    <DashCreateJobHOC />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/category/create"
                element={
                  <AdminRoute>
                    <DashCreateCategoryHOC />
                  </AdminRoute>
                }
              /> */}
             
              <Route
                path="/jobs/:companyName/user/info"
                element={
                  <UserRoute>
                    <UserInfoDashboardHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/jobs/:companyName/user/applied"
                element={
                  <UserRoute>
                    <UserJobsHistoryHOC />
                  
                  </UserRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
