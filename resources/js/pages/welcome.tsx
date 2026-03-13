import React from 'react';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { FeatureGrid } from '@/components/feature-grid';
import { AboutSection } from '@/components/about-section';
import { ProcessSection } from '@/components/process-section';
import { FlexibilitySection } from '@/components/flexibility-section';
import { PricingSection } from '@/components/pricing-section';
import { GlitchMarquee } from '@/components/glitch-marquee';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

export default function Welcome() {
    return (
        <ThemeProvider>
            <div className="min-h-screen dot-grid-bg">
                <Navbar />
                <main>
                    <HeroSection />
                    <FeatureGrid />
                    <AboutSection />
                    <ProcessSection />
                    <FlexibilitySection />
                    <PricingSection />
                    <GlitchMarquee />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}