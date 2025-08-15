import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

const RegisterModal = ({ onClose, onShowLogin, showNotification, onLoginSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => { e.preventDefault(); setIsLoading(true); const name = e.target.name.value; const email = e.target.email.value; const password = e.target.password.value; try { const response = await fetch('http://localhost:3001/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }), }); const data = await response.json(); if (!response.ok) throw new Error(data.message || 'Registration failed'); showNotification('Registration successful! Logging you in.', true); onLoginSuccess(email); } catch (error) { showNotification(error.message, false); } finally { setIsLoading(false); } };
    return (
        <ModalWrapper onClose={onClose}>
            <h2 className="text-2xl font-bold text-white text-center mb-6">Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4"><label className="block text-gray-400 mb-2">Full Name</label><input type="text" name="name" className="w-full p-3 rounded-md form-input" required /></div>
                <div className="mb-4"><label className="block text-gray-400 mb-2">Email</label><input type="email" name="email" className="w-full p-3 rounded-md form-input" required /></div>
                <div className="mb-6"><label className="block text-gray-400 mb-2">Password</label><input type="password" name="password" className="w-full p-3 rounded-md form-input" required /></div>
                <button type="submit" className="w-full primary-btn-ui font-bold py-3 rounded-md" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
            </form>
            <p className="text-center text-gray-400 mt-6">Already have an account? <button onClick={onShowLogin} className="text-lime-400 font-semibold hover:underline">Login here</button></p>
        </ModalWrapper>
    );
};

export default RegisterModal;