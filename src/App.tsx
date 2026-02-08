import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import PuppyChatbot from './components/PuppyChatbot';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ContentProvider, useContent, type Section } from './contexts/ContentContext';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Section type to component map for CMS-driven layout
const SECTION_COMPONENTS: Record<string, React.ComponentType<{ section: Section }>> = {
  hero: Hero as React.ComponentType<{ section: Section }>,
  about: About as React.ComponentType<{ section: Section }>,
  skills: Skills as React.ComponentType<{ section: Section }>,
  projects: Projects as React.ComponentType<{ section: Section }>,
  experience: Experience as React.ComponentType<{ section: Section }>,
  testimonials: Testimonials as React.ComponentType<{ section: Section }>,
  contact: Contact as React.ComponentType<{ section: Section }>,
};

// Main Website Layout - renders sections from CMS (order + visibility)
const WebsiteLayout = () => {
  const { sections } = useContent();
  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-cyber-dark text-white overflow-x-hidden">
      <Navigation />
      <main>
        {visibleSections.map((section) => {
          const Component = SECTION_COMPONENTS[section.type];
          if (!Component) return null;
          return <Component key={section.id} section={section} />;
        })}
      </main>
      <Footer />
      <PuppyChatbot />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<WebsiteLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
