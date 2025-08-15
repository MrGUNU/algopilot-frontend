const ModalWrapper = ({ children, onClose, maxWidth = 'max-w-md' }) => (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className={`bg-[#111827] border border-gray-700 rounded-lg shadow-2xl w-full ${maxWidth} p-6 sm:p-8 relative`}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl transition-colors">&times;</button>
            {children}
        </div>
    </div>
);

export default ModalWrapper;