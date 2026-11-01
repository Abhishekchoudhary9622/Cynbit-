import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import JoinModal from './components/JoinModal';
import SmartConnect from './components/SmartConnect/SmartConnect';

// Pages
import Home from './pages/Home';
import Story from './pages/Story';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Impact from './pages/Impact';
import Services from './pages/Services';
import Products from './pages/Products';
import CaseStudies from './pages/CaseStudies';
import BitElevate from './pages/BitElevate';
import BitElevatePaths from './pages/BitElevatePaths';
import Diaries from './pages/Diaries';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import NavigationSitemap from './pages/NavigationSitemap';

export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-surface font-body antialiased selection:bg-primary/20 selection:text-primary">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/team" element={<Team />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/bitelevate" element={<BitElevate />} />
              <Route path="/bitelevate/paths" element={<BitElevatePaths />} />
              <Route path="/diaries" element={<Diaries />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/navigation" element={<NavigationSitemap />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <JoinModal />
          <SmartConnect />
        </div>
      </BrowserRouter>
    </ModalProvider>
  );
}

