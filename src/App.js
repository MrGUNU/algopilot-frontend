import { useState } from 'react';
import './index.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductsSection from './components/ProductsSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import CheckoutModal from './components/modals/CheckoutModal';
import NotificationToast from './components/helpers/NotificationToast';
import WelcomePage from './components/WelcomePage';

const HomePage = ({ user, onLogoutClick, onBuyNow }) => (
    <>
        <Header user={user} onLogoutClick={onLogoutClick} />
        <main>
            <HeroSection />
            <ProductsSection onBuyNow={onBuyNow} />
            <FeaturesSection />
            <AboutSection />
        </main>
        <Footer />
    </>
);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [checkoutItem, setCheckoutItem] = useState({ product: '', price: 0 });
    const [notification, setNotification] = useState({ message: '', isSuccess: true, visible: false });

    const showNotification = (message, isSuccess = true) => {
        setNotification({ message, isSuccess, visible: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

    const handleLoginSuccess = (email) => {
        const name = email.split('@')[0];
        setUser({ name });
        setIsAuthenticated(true);
        showNotification('Login successful!');
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
        showNotification('You have been logged out.');
    };
    
    const openCheckoutModal = (product, price) => {
        setCheckoutItem({ product, price });
        setActiveModal('checkout');
    };

    return (
        <div className="bg-[#111827] text-[#F9FAFB] font-['Inter',_sans_serif]">
            {!isAuthenticated ? (
                <WelcomePage 
                    onLoginSuccess={handleLoginSuccess} 
                    showNotification={showNotification} 
                />
            ) : (
                <HomePage 
                    user={user} 
                    onLogoutClick={handleLogout} 
                    onBuyNow={openCheckoutModal} 
                />
            )}
            {isAuthenticated && activeModal === 'checkout' && <CheckoutModal onClose={() => setActiveModal(null)} item={checkoutItem} showNotification={showNotification} />}
            <NotificationToast message={notification.message} isSuccess={notification.isSuccess} visible={notification.visible} />
        </div>
    );
}

export default App;
