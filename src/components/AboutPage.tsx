import React from 'react';
import { Award, Users, Heart, Star, ChefHat, Clock } from 'lucide-react';

const AboutPage = () => {
  const chefs = [
    {
      name: 'Chef Marcus Thompson',
      role: 'Executive Chef & Owner',
      experience: '15+ years',
      speciality: 'Modern Australian Cuisine',
      bio: 'With over 15 years of culinary excellence, Chef Marcus has worked in Michelin-starred restaurants across Europe before bringing his innovative approach to Melbourne.',
      image: 'https://images.pexels.com/photos/1482329/pexels-photo-1482329.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Chef Sarah Chen',
      role: 'Head Pastry Chef',
      experience: '12+ years',
      speciality: 'Artisan Desserts',
      bio: 'Sarah\'s artistic background shines through in her stunning dessert creations, each one a masterpiece that perfectly balances flavor and visual appeal.',
      image: 'https://images.pexels.com/photos/1484824/pexels-photo-1484824.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Chef David Rodriguez',
      role: 'Sous Chef',
      experience: '10+ years',
      speciality: 'Seafood & Grilled Specialties',
      bio: 'David\'s passion for fresh, sustainable seafood and perfectly grilled meats has earned him recognition as one of Melbourne\'s rising culinary stars.',
      image: 'https://images.pexels.com/photos/1034906/pexels-photo-1034906.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const achievements = [
    {
      icon: <Award className="text-yellow-400" size={32} />,
      title: 'Restaurant of the Year',
      description: 'Melbourne Dining Awards 2023',
      year: '2023'
    },
    {
      icon: <Star className="text-yellow-400" size={32} />,
      title: 'Three Hat Rating',
      description: 'Good Food Guide Australia',
      year: '2023'
    },
    {
      icon: <ChefHat className="text-yellow-400" size={32} />,
      title: 'Chef of the Year',
      description: 'Victorian Culinary Excellence',
      year: '2022'
    },
    {
      icon: <Heart className="text-yellow-400" size={32} />,
      title: 'Sustainable Dining',
      description: 'Green Restaurant Certification',
      year: '2022'
    }
  ];

  const values = [
    {
      title: 'Quality Ingredients',
      description: 'We source only the finest local and seasonal ingredients from trusted Victorian suppliers.',
      icon: <Star className="text-yellow-400" size={24} />
    },
    {
      title: 'Culinary Innovation',
      description: 'Our chefs constantly push boundaries while respecting traditional cooking techniques.',
      icon: <ChefHat className="text-yellow-400" size={24} />
    },
    {
      title: 'Exceptional Service',
      description: 'Every guest receives personalized attention from our professionally trained team.',
      icon: <Users className="text-yellow-400" size={24} />
    },
    {
      title: 'Sustainable Practices',
      description: 'We\'re committed to environmental responsibility in every aspect of our operations.',
      icon: <Heart className="text-yellow-400" size={24} />
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900/80 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1920')`
            }}
          ></div>
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Our Story</h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Melbourne Bistro represents the pinnacle of contemporary Australian dining, 
            where culinary artistry meets warm hospitality in the heart of Victoria's cultural capital.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">A Culinary Journey</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2018, Melbourne Bistro emerged from a simple yet profound vision: 
                  to create a dining destination where exceptional cuisine meets unparalleled hospitality. 
                  Our journey began when Chef Marcus Thompson, after years of honing his craft in some of 
                  the world's most prestigious kitchens, decided to bring his innovative approach to Melbourne.
                </p>
                <p>
                  What started as a dream has evolved into one of Melbourne's most celebrated dining establishments. 
                  We've built our reputation on a foundation of quality, creativity, and genuine passion for the 
                  culinary arts. Every dish tells a story, every meal creates a memory.
                </p>
                <p>
                  Today, Melbourne Bistro stands as a testament to the vibrant food culture of Victoria, 
                  showcasing the best of local ingredients while drawing inspiration from global culinary traditions. 
                  We're not just a restaurant; we're a celebration of food, community, and the joy of shared experiences.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Restaurant interior"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-sm font-medium text-gray-900">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chef Profiles */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Culinary Team</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our passionate chefs bring decades of combined experience and boundless creativity to every dish
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-yellow-600 rounded-lg px-3 py-1">
                    <span className="text-gray-900 font-semibold text-sm">{chef.experience}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{chef.name}</h3>
                  <p className="text-yellow-400 font-semibold mb-2">{chef.role}</p>
                  <p className="text-gray-400 text-sm mb-3">{chef.speciality}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{chef.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recognition & Awards</h2>
            <p className="text-xl text-gray-300">
              Our commitment to excellence has been recognized by industry leaders and critics
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-6 text-center hover:bg-gray-700 transition-colors">
                <div className="flex justify-center mb-4">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
                <span className="text-yellow-400 font-semibold">{achievement.year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              These core principles guide everything we do, from ingredient selection to guest service
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-4 bg-gray-800 rounded-xl p-6">
                <div className="flex-shrink-0">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300">
              Key milestones in Melbourne Bistro's evolution
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                year: '2018',
                title: 'Grand Opening',
                description: 'Melbourne Bistro opens its doors with a vision to redefine fine dining in Victoria'
              },
              {
                year: '2019',
                title: 'First Recognition',
                description: 'Awarded "Rising Star" by Melbourne Food & Wine Magazine'
              },
              {
                year: '2020',
                title: 'Pandemic Adaptation',
                description: 'Successfully pivoted to include premium takeaway and delivery services'
              },
              {
                year: '2021',
                title: 'Expansion',
                description: 'Added private dining room and launched catering services'
              },
              {
                year: '2022',
                title: 'Sustainability Focus',
                description: 'Achieved Green Restaurant Certification and zero-waste kitchen goals'
              },
              {
                year: '2023',
                title: 'Industry Recognition',
                description: 'Three Hat rating and Restaurant of the Year from Melbourne Dining Awards'
              }
            ].map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">{milestone.year}</span>
                </div>
                <div className="flex-1 bg-gray-900 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                  <p className="text-gray-300">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Join us for an exceptional dining experience where every meal becomes a cherished memory
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservations"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Make a Reservation
            </a>
            <a
              href="/contact"
              className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;