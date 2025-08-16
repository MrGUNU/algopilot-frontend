import useScrollFadeIn from '../hooks/useScrollFadeIn'; // Yeh line add ki gayi hai

const AboutSection = () => {
    const sectionRef = useScrollFadeIn();
    return (
        <section id="about" className="py-20 bg-gray-900/50">
            <div ref={sectionRef} className="container mx-auto px-6 fade-in-start">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 section-title-ui pb-2 inline-block">About AlgoPilot Technologies</h2>
                    <div className="text-left space-y-4 text-gray-400 leading-relaxed">
                      <p>AlgoPilot Technologies is a FinTech company specializing in creating advanced algorithmic trading solutions for retail traders. Our mission is to make trading accessible and profitable through the power of AI and machine learning.</p>
                      <p>Our team consists of experienced developers and financial analysts dedicated to providing you with best-in-class trading bots for the MT5/MT4 platforms.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;