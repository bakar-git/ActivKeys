import React from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Services from '@/components/Services';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <Hero />
            <Features />
            <Services />
            <UseCases />
            <Pricing />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    );
}