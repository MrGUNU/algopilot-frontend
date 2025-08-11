import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

const CheckoutModal = ({ onClose, item, showNotification }) => {
    const [platform, setPlatform] = useState('MT5');
    const [activeTab, setActiveTab] = useState('indian_gw');
    const [activeSubTab, setActiveSubTab] = useState('card');
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const billingInfo = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
        };
        const accountCredentials = {
            platform: platform,
            mtLogin: formData.get('mtLogin'),
            mtPassword: formData.get('mtPassword'),
            brokerName: formData.get('brokerName'),
            serverName: formData.get('serverName'),
        };

        try {
            const response = await fetch('http://localhost:3001/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: item.product,
                    price: item.price,
                    paymentMethod: activeTab,
                    subMethod: activeTab === 'indian_gw' ? activeSubTab : null,
                    billingInfo,
                    accountCredentials
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Payment failed');
            showNotification('Payment successful! Your order is confirmed.');
            onClose();
        } catch (error) {
            showNotification(error.message, false);
        } finally {
            setIsLoading(false);
        }
    };

    const getPayButtonText = () => { if (activeTab === 'indian_gw') { if (activeSubTab === 'card') return 'Pay with Card'; if (activeSubTab === 'upi') return 'Confirm UPI Payment'; if (activeSubTab === 'netbanking') return 'Proceed to Bank'; } if (activeTab === 'crypto') return 'I have completed the payment'; return 'Pay Now'; };
    const indianBanks = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Punjab National Bank", "Bank of Baroda", "Axis Bank", "Canara Bank", "Union Bank of India", "Kotak Mahindra Bank", "Indian Bank", "Bank of India", "Central Bank of India", "IndusInd Bank", "Yes Bank", "IDBI Bank", "Federal Bank", "Bank of Maharashtra", "UCO Bank", "Indian Overseas Bank", "Punjab & Sind Bank", "South Indian Bank", "Karur Vysya Bank", "Karnataka Bank", "Jammu & Kashmir Bank", "Dhanlaxmi Bank", "City Union Bank", "Tamilnad Mercantile Bank", "Nainital Bank", "RBL Bank", "IDFC First Bank", "Bandhan Bank", "CSB Bank", "DCB Bank", "Equitas Small Finance Bank", "ESAF Small Finance Bank", "Fincare Small Finance Bank", "Jana Small Finance Bank", "North East Small Finance Bank", "Suryoday Small Finance Bank", "Ujjivan Small Finance Bank", "Utkarsh Small Finance Bank", "Shivalik Small Finance Bank", "Unity Small Finance Bank", "Airtel Payments Bank", "India Post Payments Bank", "Fino Payments Bank", "Jio Payments Bank", "Paytm Payments Bank", "NSDL Payments Bank"];

    return (
        <ModalWrapper onClose={onClose} maxWidth="max-w-lg">
            <div className="max-h-[85vh] overflow-y-auto pr-2 hide-scrollbar">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Checkout</h2>
                <p className="text-center text-gray-400 mb-6 text-sm sm:text-base">You are purchasing the {item.product} for ₹{item.price.toLocaleString('en-IN')}.</p>
                <form onSubmit={handlePayment}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">1. Your Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <input type="text" name="firstName" placeholder="First Name" className="w-full p-3 rounded-md form-input text-sm" required />
                                <input type="text" name="lastName" placeholder="Last Name" className="w-full p-3 rounded-md form-input text-sm" required />
                            </div>
                            <input type="email" name="email" placeholder="Email Address" className="w-full p-3 rounded-md form-input text-sm" required />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3 mt-4">2. Trading Account</h3>
                            <div className="mb-3">
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setPlatform('MT5')} className={`w-full p-2 rounded-md text-sm transition-colors ${platform === 'MT5' ? 'primary-btn-ui' : 'secondary-btn-ui'}`}>MT5</button>
                                    <button type="button" onClick={() => setPlatform('MT4')} className={`w-full p-2 rounded-md text-sm transition-colors ${platform === 'MT4' ? 'primary-btn-ui' : 'secondary-btn-ui'}`}>MT4</button>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <input type="text" name="mtLogin" placeholder={`${platform} Login ID`} className="w-full p-3 rounded-md form-input text-sm" required />
                                <input type="text" name="mtPassword" placeholder={`${platform} Password`} className="w-full p-3 rounded-md form-input text-sm" required />
                                <input type="text" name="brokerName" placeholder="Broker Name" className="w-full p-3 rounded-md form-input text-sm" required />
                                <input type="text" name="serverName" placeholder="Server Name" className="w-full p-3 rounded-md form-input text-sm" required />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mt-4 mb-3">3. Payment Method</h3>
                            <div className="flex flex-wrap border-b border-gray-700 mb-4 text-xs sm:text-sm"><div onClick={() => setActiveTab('indian_gw')} className={`payment-tab ${activeTab === 'indian_gw' ? 'active' : ''}`}>Card/UPI/Net Banking</div><div onClick={() => setActiveTab('paypal')} className={`payment-tab ${activeTab === 'paypal' ? 'active' : ''}`}>PayPal</div><div onClick={() => setActiveTab('crypto')} className={`payment-tab ${activeTab === 'crypto' ? 'active' : ''}`}>Crypto</div></div>
                            {activeTab === 'indian_gw' && (<div><div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700"><div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4 border-b border-gray-700 pb-3"><div onClick={() => setActiveSubTab('card')} className={`sub-payment-tab ${activeSubTab === 'card' ? 'active' : ''}`}>Card</div><div onClick={() => setActiveSubTab('upi')} className={`sub-payment-tab ${activeSubTab === 'upi' ? 'active' : ''}`}>UPI</div><div onClick={() => setActiveSubTab('netbanking')} className={`sub-payment-tab ${activeSubTab === 'netbanking' ? 'active' : ''}`}>Net Banking</div></div>{activeSubTab === 'card' && <div className="space-y-3"><input type="text" placeholder="Card Number" className="w-full p-3 rounded-md form-input" /><div className="flex space-x-3"><input type="text" placeholder="MM / YY" className="w-1/2 p-3 rounded-md form-input" /><input type="text" placeholder="CVC" className="w-1/2 p-3 rounded-md form-input" /></div></div>}{activeSubTab === 'upi' && <div className="text-center"><p className="text-gray-400 mb-3">Scan the QR code with your UPI app</p><img src="https://placehold.co/150x150/111827/a3e635?text=SCAN+ME" alt="UPI QR Code" className="mx-auto rounded-lg" /></div>}{activeSubTab === 'netbanking' && <select className="w-full p-3 rounded-md form-input"><option>Select Your Bank</option>{indianBanks.map(bank => <option key={bank} value={bank}>{bank}</option>)}</select>}</div></div>)}
                            {activeTab === 'paypal' && (<div className="text-center"><p className="text-sm text-gray-400 mb-4">You will be redirected to PayPal to complete your purchase securely.</p><button type="submit" className="w-full max-w-xs mx-auto bg-[#00457C] hover:bg-[#003057] text-white font-bold py-3 rounded-md flex items-center justify-center transition-all"><i className="fa-brands fa-paypal text-xl mr-2"></i>Proceed to PayPal</button></div>)}
                            {activeTab === 'crypto' && (<div className="text-center"><p className="text-sm text-gray-400 mb-4">Send the exact amount to the wallet address below</p><img src="https://placehold.co/150x150/111827/a3e635?text=SCAN+BTC" alt="Crypto QR Code" className="mx-auto rounded-lg mb-3" /><div className="relative p-3 rounded-md form-input bg-gray-800"><span className="break-all text-xs sm:text-sm">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span><button type="button" onClick={() => navigator.clipboard.writeText('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh').then(() => showNotification('Wallet address copied!'))} className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-white"><i className="fa-regular fa-copy"></i></button></div></div>)}
                        </div>
                    </div>
                    {activeTab !== 'paypal' && <button type="submit" className="w-full primary-btn-ui font-bold py-3 rounded-md mt-6" disabled={isLoading}>{isLoading ? 'Processing...' : getPayButtonText()}</button>}
                </form>
            </div>
        </ModalWrapper>
    );
};

export default CheckoutModal;