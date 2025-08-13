import { useState } from 'react';

const Header = ({ user, onLogoutClick }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const UserInfo = ({ isMobile = false }) => (
        <div className={isMobile ? "mt-4 space-y-4" : "items-center space-x-4 flex"}>
            <span className="text-white">Welcome, {user.name}!</span>
            <button onClick={onLogoutClick} className="px-5 py-2 rounded-md primary-btn-ui">Logout</button>
        </div>
    );

    return (
        <header className="bg-gray-900/70 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-white">AlgoPilot<span className="text-[#A3E635]">Tech</span></a>
                <div className="hidden md:flex space-x-8 items-center">
                    <a href="#products" className="text-gray-400 hover:text-white transition-colors">Products</a>
                    <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                    <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                    {user && <UserInfo />}
                </div>
                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                </button>
            </nav>
            {isMobileMenuOpen && (
                <div className="md:hidden px-6 pb-4 bg-gray-900 border-t border-gray-800">
                    <a href="#products" className="block py-2 text-gray-300 hover:text-white transition-colors">Products</a>
                    <a href="#features" className="block py-2 text-gray-300 hover:text-white transition-colors">Features</a>
                    <a href="#about" className="block py-2 text-gray-300 hover:text-white transition-colors">About Us</a>
                    {user && <UserInfo isMobile />}
                </div>
            )}
        </header>
    );
};

export default Header;
