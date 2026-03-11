import { Users, Building, GraduationCap, Server, ShoppingCart } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-blue-400" />,
      title: "Microsoft Key Resellers",
      description: "Manage large inventories of product keys with automated validation and tracking."
    },
    {
      icon: <Building className="h-8 w-8 text-purple-400" />,
      title: "IT Inventory Management",
      description: "Keep track of software licenses across your organization with detailed reporting."
    },
    {
      icon: <Server className="h-8 w-8 text-green-400" />,
      title: "License Distributors",
      description: "Validate and distribute software licenses at scale with bulk operations."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-400" />,
      title: "System Administrators",
      description: "Streamline license management processes across enterprise environments."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-pink-400" />,
      title: "Educational Institutions",
      description: "Validate volume licenses for educational software and maintain compliance."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Use Cases
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by organizations across industries for reliable key management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                {useCase.icon}
                <h3 className="text-xl font-semibold ml-3">{useCase.title}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;