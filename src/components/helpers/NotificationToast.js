const NotificationToast = ({ message, isSuccess, visible }) => {
    if (!visible) return null;
    const bgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
    return (
        <div className={`fixed bottom-5 right-5 z-[110] text-white py-3 px-6 rounded-lg shadow-2xl transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${bgColor}`}>
            <p>{message}</p>
        </div>
    );
};

export default NotificationToast;