
const HeroSection = () => {
    return (
        <section className="text-center pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white fade-in-start animate-fade-in-up">AlgoPilot Technologies</h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 fade-in-start animate-fade-in-up delay-200">Automate Your Trades with AI-Powered Bots for MT5/MT4</p>
                <div className="flex justify-center space-x-4 fade-in-start animate-fade-in-up delay-400">
                    <a href="#products" className="px-8 py-3 rounded-md primary-btn-ui">Explore Our Bots</a>
                    <a href="#contact" className="px-8 py-3 rounded-md secondary-btn-ui">Request a Demo</a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;