import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Academics = lazy(() => import("./pages/Academics"));
const Timetable = lazy(() => import("./pages/Timetable"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminAnnouncements = lazy(() => import("./pages/AdminAnnouncements"));
const AdminNews = lazy(() => import("./pages/AdminNews"));
const AdminGallery = lazy(() => import("./pages/AdminGallery"));
const AdminAdmissions = lazy(() => import("./pages/AdminAdmissions"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));

function App() {
  // Removed dark mode toggle to keep skyblue theme
  // useEffect(() => {
  //   document.documentElement.classList.toggle('dark', localStorage.getItem('gs-nemba-theme') === 'dark');
  // }, []);

  return (
    <div className="min-h-screen bg-sky-100 text-slate-900">
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/admin/announcements"
              element={<AdminAnnouncements />}
            />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
            <Route path="/admin/admissions" element={<AdminAdmissions />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
