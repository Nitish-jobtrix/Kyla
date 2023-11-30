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
import LinkedinXray from "./pages/LinkedinXray";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./component/UserRoute";
import AdminRoute from "./component/AdminRoute";
import Layout from "./pages/global/Layout";
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from "./pages/user/UserInfoDashboard";
import UserResumeUpload from "./pages/user/UserResumeUpload";

import About from "./pages/About"
import SingleJob from "./pages/SingleJob";
import Register from "./pages/Register";


//chatbot routes
import Flows from "./component/flows/Flows";


//kyla merging
import Blank from "./pages/Blank";
import Profile from "./pages/Profile";
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
// import UsersPage from "./pages/UsersPage";
import PostOnLinkedIn from "./pages/PostOnLinkedIn";
import RecentApplications from "./pages/RecentApplications";
import Applicants from "./pages/Applicants";
import Shortlisted from "./pages/Shortlisted";


//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const UserResumeUploadHOC = Layout(UserResumeUpload);

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
              {/* routes for HR i.e. main user */}
              <Route
                path="/"
                element={
                  <AdminRoute>
                    <MainLayout />
                  </AdminRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="linkedin/post" element={<PostOnLinkedIn />} />  
                <Route path="flows" element={<Flows />} />
                {/* <Route path="users" element={<UsersPage />} /> */}
                <Route path="applications" element={<RecentApplications />} />
                <Route
                  path="categories/create"
                  element={<CreateCategoryPage />}
                />
                <Route path="jobs" element={<JobsPage />} />
                <Route path="job/create" element={<CreateJobPage />} />
              
                <Route path="/job/applicants/:jobId" element={<Applicants />} />
                <Route path="/job/applicants/:jobId/shortlisted" element={<Shortlisted />} /> 
                
                {/* <Route path="job/edit/:jobId" element={<EditJobPage />} /> */}
              
                <Route path="profile" element={<Profile />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="linkedinxray" element={<LinkedinXray />} />
              </Route>

              {/* Home page (i.e company job page)  */}
              <Route path="/jobs/:companyName" element={<Home />} />
              <Route path="/jobs/:companyName/about" element={<About />} />
              <Route
                path="/jobs/:companyName/search/location/:location"
                element={<Home />}
              />
              <Route
                path="/jobs/:companyName/search/:keyword"
                element={<Home />}
              />
              <Route
                path="/jobs/:companyName/job/:id"   
                element={<SingleJob />}
              />

             
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />


{/* candidate routes  */}
              <Route path="/jobs/candidate/register" element={<UserRegister />} />
              <Route path="/jobs/candidate/login" element={<UserLogin />} />
              <Route
                path="/jobs/candidate/dashboard"
                element={
                  <UserRoute>
                    <UserDashboardHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/jobs/candidate/info"
                element={
                  <UserRoute>
                    <UserInfoDashboardHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/jobs/candidate/applied"
                element={
                  <UserRoute>
                    <UserJobsHistoryHOC />
                  </UserRoute>
                }
              />
              <Route
                path="/jobs/candidate/upload"
                element={
                  <UserRoute>
                    <UserResumeUploadHOC />
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
