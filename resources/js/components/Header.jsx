import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigation = [
    {
      name: 'Features',
      href: '#features',
      dropdown: [
        { name: 'Real-time Validation', href: '#features', description: 'Instant key verification' },
        { name: 'Bulk Operations', href: '#features', description: 'Process thousands of keys' },
        { name: 'Analytics & Tracking', href: '#features', description: 'Comprehensive insights' },
        { name: 'Security Features', href: '#features', description: 'Enterprise-grade protection' }
      ]
    },
    { name: 'Services', href: '#services' },
    { name: 'Use Cases', href: '#use-cases' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    {
      name: 'Resources',
      href: '#',
      dropdown: [
        { name: 'Documentation', href: '#', description: 'Complete guides and tutorials' },
        { name: 'API Reference', href: '#', description: 'Developer documentation' },
        { name: 'Help Center', href: '#', description: 'Support and FAQs' },
        { name: 'Community', href: '#', description: 'Join our community' }
      ]
    }
  ];

  const toggleDropdown = (e, itemName) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12">
                <svg viewBox="0 0 512 512" className="w-full h-full">
                  <path fill="#3b82f6" d="m142.6 424.5l113.8 81.2 113.7-81.3c65.5-46.9 104.3-122.5 104.3-203l-0.1-121-218.2-93.4-218.1 93.6 0.1 121c0 80.5 38.9 156.1 104.5 202.9z"/>
                  <path fill="#ffffff" d="m365.2 100.3c-2.4 1.3-24.9 22.2-50.2 46.9-25.3 24.4-47.7 44.8-49.9 45.1-2.1 0.5-8.3-1.5-13.7-4.2-50.6-24.8-109.4-5.3-133.3 44.4-20.5 42.8-12.6 82 23.5 116.5 12.1 11.3 65.4 52 79.3 60.7 13.2 8 18.2 5.8 53.5-23.2 35.1-29.1 49.3-44.4 59-64.6 11.8-24.3 12.8-43.7 2.9-54.3-9.2-9.9-11-8.8-58.4 37.8-23.8 23.7-44.6 42.5-46.2 42.1-1.5-0.4-9.4-7.2-18-15.1-8.3-8.2-20.9-18.9-28.2-24.1-26.6-19-29.9-40.7-9.2-60.1 22.5-21.2 53.7-14.4 73.1 15.7 10.5 16.5 11.4 15.9 50-22.7 18.1-18.2 34.2-33 35.7-33 1.6 0 7 3.9 12 8.8 10.5 9.7 18.3 11.2 27.2 5.2 9.7-6.2 30.6-30.2 30.8-34.9 0-2.9-3.8-8.7-10.9-15.9l-10.8-11.4 8.8-9.3c10.4-11.3 12.7-19.8 8.1-30.9-7.2-17.4-23.3-26.3-35.1-19.5z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                ActivKeys
              </span>
              <div className="text-xs text-gray-400 -mt-1 hidden sm:block">Professional</div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
              >
                <button
                  onClick={(e) => item.dropdown ? toggleDropdown(e, item.name) : window.location.href = item.href}
                  className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 group"
                >
                  {item.name}
                  {item.dropdown && (
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={closeMenu}
                          className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors group"
                        >
                          <div className="font-medium">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-xs text-gray-400 mt-1 group-hover:text-gray-300">
                              {subItem.description}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href='/app/' className="text-gray-300 hover:text-white transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-800/50">
              Sign In
            </a>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Get Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900/98 backdrop-blur-xl border-t border-gray-800/50 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                <button
                  onClick={(e) => item.dropdown ? toggleDropdown(e, item.name) : window.location.href = item.href}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors font-medium text-left"
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </button>
                
                {/* Mobile Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top duration-200">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        onClick={closeMenu}
                        className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/30 rounded-lg transition-colors"
                      >
                        <div className="font-medium text-sm">{subItem.name}</div>
                        {subItem.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {subItem.description}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Actions */}
            <div className="border-t border-gray-800 pt-4 mt-6 space-y-3">
              <button 
                onClick={closeMenu}
                className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={closeMenu}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-3 rounded-lg font-semibold transition-all duration-200 text-center"
              >
                Get Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;