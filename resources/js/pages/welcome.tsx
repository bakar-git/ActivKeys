import React from 'react';
import { Head } from '@inertiajs/react';
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
    const pageTitle = 'Enterprise License Key Management Platform';
    const pageDescription =
        'ActivKeys helps SaaS teams validate license keys in real-time, track activations, manage key lifecycle operations, and maintain compliance-ready audit trails.';
    const canonicalUrl = 'https://ak.test/';
    const ogImageUrl = 'https://ak.test/about-isometric.jpg';

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'ActivKeys',
        url: canonicalUrl,
        description: pageDescription,
        inLanguage: 'en',
    };

    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'ActivKeys',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: [
            {
                '@type': 'Offer',
                name: 'Starter',
                price: '99',
                priceCurrency: 'USD',
            },
            {
                '@type': 'Offer',
                name: 'Professional',
                price: '499',
                priceCurrency: 'USD',
            },
            {
                '@type': 'Offer',
                name: 'Enterprise',
                price: '0',
                priceCurrency: 'USD',
                priceSpecification: {
                    '@type': 'PriceSpecification',
                    price: '0',
                    priceCurrency: 'USD',
                    valueAddedTaxIncluded: false,
                    description: 'Custom pricing available on request',
                },
            },
        ],
        description: pageDescription,
        url: canonicalUrl,
        image: ogImageUrl,
    };

    return (
        <ThemeProvider>
            <Head title={pageTitle}>
                <meta name="description" content={pageDescription} />
                <meta
                    name="keywords"
                    content="license key management, software licensing, key validation, activation tracking, enterprise key management, audit trails"
                />
                <meta name="robots" content="index,follow,max-image-preview:large" />
                <link rel="canonical" href={canonicalUrl} />

                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="ActivKeys" />
                <meta property="og:title" content="ActivKeys | Enterprise License Key Management Platform" />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:image:alt" content="ActivKeys platform interface preview" />
                <meta property="og:locale" content="en_US" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="ActivKeys | Enterprise License Key Management Platform" />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={ogImageUrl} />

                <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
                <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
            </Head>
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