import ProductCard from './ProductCard';
import useScrollFadeIn from '../hooks/useScrollFadeIn';

const ProductsSection = ({ onBuyNow }) => {
    const sectionRef = useScrollFadeIn();
    const products = [
        { name: 'AlgoPilot EA - Basic', description: 'Specialized bot for Gold (XAUUSD) trading only. Single account license.', price: 10000, imageUrl: 'https://placehold.co/600x400/1f2937/a3e635?text=AlgoPilot+EA+Basic' },
        { name: 'AlgoPilot EA - Elite', description: 'Trades Gold, BTC, and ETH. Single account license.', price: 20000, imageUrl: 'https://placehold.co/600x400/1f2937/a3e635?text=AlgoPilot+EA+Elite' },
        { name: 'AlgoPilot EA - Pro', description: 'Trade any symbol you want with our most advanced bot. Single account license.', price: 30000, imageUrl: 'https://placehold.co/600x400/1f2937/a3e635?text=AlgoPilot+EA+Pro' },
    ];

    return (
        <section id="products" className="py-20 bg-gray-900/50">
            <div ref={sectionRef} className="container mx-auto px-6 fade-in-start">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 section-title-ui mx-auto pb-2">Our AI Trading Bots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(p => <ProductCard key={p.name} {...p} onBuyNow={onBuyNow} />)}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;