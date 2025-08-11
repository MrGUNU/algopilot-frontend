const ProductCard = ({ name, description, price, imageUrl, onBuyNow }) => {
    return (
        <div className="bg-[#1F2937] rounded-xl overflow-hidden shadow-lg flex flex-col border border-gray-700 hover:shadow-2xl hover:border-lime-400 hover:-translate-y-1 transition-all duration-300">
            <img src={imageUrl} alt={name} className="w-full h-56 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1f2937/9ca3af?text=Image+Not+Found'; }} />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{description}</p>
                <div className="flex justify-between items-center mt-auto pt-4">
                    <span className="text-2xl font-bold text-white">₹{price.toLocaleString('en-IN')}</span>
                    <button onClick={() => onBuyNow(name, price)} className="primary-btn-ui px-6 py-2 rounded-md">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;