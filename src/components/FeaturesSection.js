import useScrollFadeIn from '../hooks/useScrollFadeIn';

const FeaturesSection = () => {
    const sectionRef = useScrollFadeIn();
    const accentColor = "#A3E635";
    return (
        <section id="features" className="py-20">
            <div ref={sectionRef} className="container mx-auto px-6 fade-in-start">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 section-title-ui mx-auto pb-2">Why Choose Our Bots?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div className="feature-item"><div className="flex justify-center mb-4"><i className="fa-solid fa-microchip text-4xl" style={{color: accentColor}}></i></div><h3 className="text-xl font-bold text-white mb-2">Advanced AI Algorithms</h3><p className="text-gray-400">Our bots use advanced machine learning to analyze market trends for optimal entry and exit points.</p></div>
                    <div className="feature-item"><div className="flex justify-center mb-4"><i className="fa-solid fa-lock text-4xl" style={{color: accentColor}}></i></div><h3 className="text-xl font-bold text-white mb-2">Single Account License</h3><p className="text-gray-400">Each bot is licensed to a single trading account, ensuring maximum security and integrity.</p></div>
                    <div className="feature-item"><div className="flex justify-center mb-4"><i className="fa-solid fa-shield-halved text-4xl" style={{color: accentColor}}></i></div><h3 className="text-xl font-bold text-white mb-2">Secure MT5/MT4 Integration</h3><p className="text-gray-400">Seamlessly and securely integrates with your MetaTrader 4 or 5 account.</p></div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;