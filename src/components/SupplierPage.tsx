import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, Leaf, Award, Calendar, Users } from 'lucide-react';

const SupplierPage = () => {
  const { supplierId } = useParams();

  const suppliers = {
    'yarra-valley': {
      id: 'yarra-valley',
      name: 'Yarra Valley Premium Beef',
      location: 'Yarra Valley, Victoria',
      distance: '65km from Melbourne',
      established: '1987',
      specialty: 'Premium Wagyu Beef',
      description: 'Family-owned farm specializing in grass-fed wagyu cattle with sustainable farming practices.',
      image: 'https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=800',
      story: [
        'The Henderson family has been raising cattle in the Yarra Valley for over three generations. What started as a small dairy operation has evolved into one of Victoria\'s premier wagyu beef producers.',
        'Our commitment to sustainable farming practices means our cattle graze on pesticide-free pastures, drink from natural spring water, and live stress-free lives in the rolling hills of the Yarra Valley.',
        'Each animal is individually cared for, with detailed records kept of their diet, health, and wellbeing. This attention to detail results in beef of exceptional quality and flavor.',
        'We work exclusively with restaurants that share our values of quality, sustainability, and respect for the land. Melbourne Bistro has been a valued partner for over five years.'
      ],
      practices: [
        'Grass-fed cattle only',
        'No hormones or antibiotics',
        'Rotational grazing systems',
        'Carbon-neutral farming',
        'Animal welfare certified'
      ],
      certifications: [
        'Organic Certification Australia',
        'RSPCA Approved Farming',
        'Carbon Neutral Certified',
        'Victorian Quality Assurance'
      ],
      contact: {
        owner: 'James Henderson',
        phone: '+61 3 9XXX XXXX',
        email: 'info@yarravalleybeef.com.au'
      }
    },
    'port-phillip-bay': {
      id: 'port-phillip-bay',
      name: 'Port Phillip Fisheries',
      location: 'Port Phillip Bay, Victoria',
      distance: '45km from Melbourne',
      established: '1952',
      specialty: 'Fresh Barramundi & Seafood',
      description: 'Sustainable fishing operation providing the freshest seafood from Port Phillip Bay waters.',
      image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=800',
      story: [
        'Port Phillip Fisheries has been a cornerstone of Melbourne\'s seafood industry for over 70 years. Founded by Italian immigrant Antonio Rossi, the company has remained family-owned and operated.',
        'Our fleet of sustainable fishing vessels operates exclusively in Port Phillip Bay, ensuring the freshest possible seafood while maintaining strict quotas to protect marine ecosystems.',
        'We specialize in barramundi, but also provide a variety of local fish including snapper, flathead, and whiting. All our fish are caught using sustainable methods that minimize environmental impact.',
        'Our partnership with Melbourne Bistro began when Chef Marcus visited our facilities and was impressed by our commitment to quality and sustainability.'
      ],
      practices: [
        'Sustainable fishing quotas',
        'Line-caught fish only',
        'Daily freshness guarantee',
        'Marine park compliance',
        'Zero waste processing'
      ],
      certifications: [
        'Marine Stewardship Council',
        'Victorian Fisheries Authority',
        'HACCP Food Safety',
        'Sustainable Seafood Australia'
      ],
      contact: {
        owner: 'Maria Rossi',
        phone: '+61 3 9XXX XXXX',
        email: 'info@portphillipfish.com.au'
      }
    },
    'mornington-peninsula': {
      id: 'mornington-peninsula',
      name: 'Mornington Organic Gardens',
      location: 'Mornington Peninsula, Victoria',
      distance: '75km from Melbourne',
      established: '1995',
      specialty: 'Organic Vegetables & Herbs',
      description: 'Certified organic farm producing seasonal vegetables and herbs using biodynamic farming methods.',
      image: 'https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg?auto=compress&cs=tinysrgb&w=800',
      story: [
        'Mornington Organic Gardens was established by Sarah and David Chen, who left their corporate careers to pursue their passion for sustainable agriculture.',
        'Our 50-hectare farm uses biodynamic farming principles, working in harmony with natural cycles and lunar phases to produce vegetables of exceptional flavor and nutritional value.',
        'We grow over 100 varieties of vegetables and herbs throughout the year, carefully planning our crops to ensure a continuous supply of seasonal produce.',
        'Our relationship with Melbourne Bistro is built on shared values of quality, sustainability, and respect for the environment. We deliver fresh produce to the restaurant three times per week.'
      ],
      practices: [
        'Certified organic farming',
        'Biodynamic principles',
        'Companion planting',
        'Natural pest control',
        'Composting program'
      ],
      certifications: [
        'Australian Certified Organic',
        'Biodynamic Agriculture Australia',
        'Victorian Organic Certification',
        'Carbon Neutral Farming'
      ],
      contact: {
        owner: 'Sarah Chen',
        phone: '+61 3 9XXX XXXX',
        email: 'info@morningtonorganic.com.au'
      }
    }
  };

  const supplier = suppliers[supplierId] || suppliers['yarra-valley'];

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900/80 z-10"></div>
          <img
            src={supplier.image}
            alt={supplier.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-5xl font-bold text-white mb-4">{supplier.name}</h1>
          <p className="text-xl text-gray-200 mb-8">{supplier.description}</p>
          
          <div className="grid md:grid-cols-3 gap-6 bg-gray-800/80 rounded-2xl p-6">
            <div className="text-center">
              <MapPin className="mx-auto mb-2 text-yellow-400" size={24} />
              <p className="text-white font-semibold">{supplier.location}</p>
              <p className="text-gray-300 text-sm">{supplier.distance}</p>
            </div>
            <div className="text-center">
              <Calendar className="mx-auto mb-2 text-yellow-400" size={24} />
              <p className="text-white font-semibold">Est. {supplier.established}</p>
              <p className="text-gray-300 text-sm">Family owned</p>
            </div>
            <div className="text-center">
              <Truck className="mx-auto mb-2 text-yellow-400" size={24} />
              <p className="text-white font-semibold">{supplier.specialty}</p>
              <p className="text-gray-300 text-sm">Specialty product</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Story */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4">
                {supplier.story.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Sustainable Practices */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Leaf className="mr-3 text-green-400" size={24} />
                Sustainable Practices
              </h2>
              <ul className="space-y-3">
                {supplier.practices.map((practice, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 flex-shrink-0"></div>
                    {practice}
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="mr-3 text-yellow-400" size={24} />
                Certifications & Awards
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {supplier.certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                    <Award className="mx-auto mb-2 text-yellow-400" size={20} />
                    <p className="text-white font-medium text-sm">{cert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-8 sticky top-32">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Users className="mr-2 text-yellow-400" size={20} />
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Owner</p>
                  <p className="text-white font-semibold">{supplier.contact.owner}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">{supplier.contact.phone}</p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{supplier.contact.email}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Partnership</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This supplier has been a trusted partner of Melbourne Bistro, 
                  providing premium ingredients that meet our exacting standards 
                  for quality and sustainability.
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to="/about"
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 py-3 rounded-lg font-semibold transition-colors text-center block"
                >
                  Learn About Our Values
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Suppliers */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Other Partners</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(suppliers)
              .filter(s => s.id !== supplier.id)
              .map((relatedSupplier) => (
                <Link
                  key={relatedSupplier.id}
                  to={`/suppliers/${relatedSupplier.id}`}
                  className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-700 transition-colors group"
                >
                  <img
                    src={relatedSupplier.image}
                    alt={relatedSupplier.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {relatedSupplier.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{relatedSupplier.location}</p>
                    <p className="text-gray-300 text-sm">{relatedSupplier.specialty}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Taste the Difference Quality Makes
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Experience how our carefully selected ingredients create extraordinary flavors
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservations"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Book Your Table
            </Link>
            <Link
              to="/menu"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Our Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupplierPage;