import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ProductsPage from '@/pages/ProductsPage';
import PatientStoriesPage from '@/pages/PatientStoriesPage';
import { GalleryPage } from '@/pages/GalleryPage';
import { ContactPage } from '@/pages/ContactPage';
import { FreeTrialModal } from './components/ui/FreeTrialModal';
import { ScrollToTop } from './components/ScrollToTop'; // 👈 import it

export default function App() {
  return (
    <>
      <FreeTrialModal />
      <ScrollToTop /> {/* 👈 Add this here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/patient-stories" element={<PatientStoriesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}
