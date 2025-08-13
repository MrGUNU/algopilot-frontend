import { useState } from 'react';

// Login Form Component
const LoginView = ({ onLoginSuccess, showRegister, showNotification }) => {
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const response = await fetch('http://localhost:3001/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed');
            onLoginSuccess(email);
        } catch (error) {
            showNotification(error.message, false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Login to Your Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4"><label className="block text-gray-400 mb-2 text-sm">Email</label><input type="email" name="email" className="w-full p-3 rounded-md form-input" required /></div>
                <div className="mb-6"><label className="block text-gray-400 mb-2 text-sm">Password</label><input type="password" name="password" className="w-full p-3 rounded-md form-input" required /></div>
                <button type="submit" className="w-full primary-btn-ui font-bold py-3 rounded-md" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
            </form>
            <p className="text-center text-gray-400 mt-6 text-sm">Don't have an account? <button onClick={showRegister} className="text-lime-400 font-semibold hover:underline">Register here</button></p>
        </div>
    );
};

// Register Form Component
const RegisterView = ({ showLogin, showNotification }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const response = await fetch('http://localhost:3001/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Registration failed');
            showNotification('Registration successful! Please log in.', true);
            showLogin();
        } catch (error) {
            showNotification(error.message, false);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4"><label className="block text-gray-400 mb-2 text-sm">Full Name</label><input type="text" name="name" className="w-full p-3 rounded-md form-input" required /></div>
                <div className="mb-4"><label className="block text-gray-400 mb-2 text-sm">Email</label><input type="email" name="email" className="w-full p-3 rounded-md form-input" required /></div>
                <div className="mb-6"><label className="block text-gray-400 mb-2 text-sm">Password</label><input type="password" name="password" className="w-full p-3 rounded-md form-input" required /></div>
                <button type="submit" className="w-full primary-btn-ui font-bold py-3 rounded-md" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
            </form>
            <p className="text-center text-gray-400 mt-6 text-sm">Already have an account? <button onClick={showLogin} className="text-lime-400 font-semibold hover:underline">Login here</button></p>
        </div>
    );
};


// Main Welcome Page Component
const WelcomePage = ({ onLoginSuccess, showNotification }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to AlgoPilot<span className="text-[#A3E635]">Tech</span></h1>
                <p className="text-gray-400 mt-2">Your Automated AI Trading Partner</p>
            </div>
            <div className="w-full max-w-md bg-[#111827] border border-gray-700 rounded-lg shadow-2xl p-8">
                {isLoginView ? (
                    <LoginView onLoginSuccess={onLoginSuccess} showRegister={() => setIsLoginView(false)} showNotification={showNotification} />
                ) : (
                    <RegisterView showLogin={() => setIsLoginView(true)} showNotification={showNotification} />
                )}
            </div>
        </div>
    );
};

export default WelcomePage;
