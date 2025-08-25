import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductDetail from './pages/product-detail';
import ProductCatalog from './pages/product-catalog';
import UserProfileSettings from './pages/user-profile-settings';
import VideoFeedUpload from './pages/video-feed-upload';
import Homepage from './pages/homepage';
import UserAuthenticationLoginRegister from './pages/user-authentication-login-register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="/video-feed-upload" element={<VideoFeedUpload />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;