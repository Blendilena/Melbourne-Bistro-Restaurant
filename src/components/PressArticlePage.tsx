import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Star, Quote } from 'lucide-react';

const PressArticlePage = () => {
  const { articleId } = useParams();

  const articles = {
    'the-age-2024': {
      id: 'the-age-2024',
      publication: 'The Age',
      headline: 'Melbourne Bistro Redefines Fine Dining',
      subheading: 'Chef Marcus Thompson\'s innovative approach to Australian cuisine sets new standards',
      author: 'Sarah Mitchell',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/2159065/pexels-photo-2159065.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: [
        'In the heart of Melbourne\'s bustling Collins Street, a culinary revolution is quietly taking place. Melbourne Bistro, under the masterful guidance of Chef Marcus Thompson, has emerged as the city\'s most talked-about dining destination, redefining what fine dining means in contemporary Australia.',
        'Thompson, who honed his skills in Michelin-starred kitchens across Europe, brings a unique perspective to Australian cuisine. His philosophy centers on showcasing local ingredients through innovative techniques while respecting traditional cooking methods.',
        '"We\'re not trying to reinvent the wheel," Thompson explains as he prepares his signature wagyu beef tenderloin. "We\'re simply presenting Australian produce in its best possible light, using techniques that enhance rather than mask the natural flavors."',
        'The restaurant\'s commitment to sustainability is evident in every aspect of its operation. From sourcing ingredients within a 100-kilometer radius to implementing a zero-waste kitchen policy, Melbourne Bistro sets an example for responsible fine dining.',
        'The dining room, designed by acclaimed architect James Morrison, strikes a perfect balance between elegance and warmth. Dark timber panels contrast beautifully with brass accents, while floor-to-ceiling windows offer glimpses into the bustling kitchen.',
        'Service at Melbourne Bistro is impeccable without being stuffy. The staff, led by restaurant manager Elena Rodriguez, demonstrates an encyclopedic knowledge of both the menu and wine list, guiding diners through their culinary journey with genuine enthusiasm.',
        'The wine program, curated by sommelier David Chen, focuses exclusively on Australian producers, with particular emphasis on Victorian vineyards. The list features both established names and emerging winemakers, offering diners the opportunity to discover new favorites.',
        'Melbourne Bistro\'s success hasn\'t gone unnoticed by the industry. Recent accolades include a three-hat rating from the Good Food Guide and recognition as Restaurant of the Year by the Melbourne Dining Awards.',
        'As Melbourne\'s dining scene continues to evolve, Melbourne Bistro stands as a beacon of excellence, proving that Australian cuisine can compete with the world\'s best while maintaining its unique identity.'
      ],
      pullQuote: 'We\'re simply presenting Australian produce in its best possible light, using techniques that enhance rather than mask the natural flavors.',
      rating: 5,
      tags: ['Fine Dining', 'Australian Cuisine', 'Sustainability', 'Melbourne']
    },
    'good-food-guide-2024': {
      id: 'good-food-guide-2024',
      publication: 'Good Food Guide',
      headline: 'Three Hat Excellence in the Heart of Melbourne',
      subheading: 'A masterclass in culinary artistry and hospitality',
      author: 'Michael Chen',
      date: 'February 28, 2024',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: [
        'Earning three hats from the Good Food Guide is no small feat. It requires not just exceptional food, but a complete dining experience that leaves guests with memories to last a lifetime. Melbourne Bistro achieves this and more.',
        'From the moment you step through the doors, it\'s clear that every detail has been carefully considered. The greeting is warm but professional, the ambiance sophisticated yet welcoming, and the anticipation palpable.',
        'Chef Marcus Thompson\'s tasting menu is a journey through the seasons, with each dish telling a story of place and time. The opening course, a delicate kingfish crudo with finger lime, immediately establishes the kitchen\'s technical prowess and commitment to local ingredients.',
        'The standout dish of the evening was undoubtedly the wagyu beef tenderloin, cooked to absolute perfection and accompanied by a rich bone marrow jus that elevated the already exceptional meat to new heights.',
        'What sets Melbourne Bistro apart is not just the quality of individual dishes, but the way they work together to create a cohesive narrative. Each course builds upon the last, creating a crescendo of flavors that reaches its peak with the dessert course.',
        'The chocolate soufflé, served with vanilla bean ice cream and gold leaf, is a masterpiece of technique and presentation. Light as air yet intensely flavored, it provides the perfect conclusion to an extraordinary meal.',
        'Service throughout the evening was flawless. The waitstaff demonstrated an intimate knowledge of each dish and wine pairing, enhancing the dining experience with their expertise and genuine passion for the restaurant\'s offerings.',
        'The wine list deserves special mention, featuring an impressive selection of Australian wines with particular strength in Victorian producers. The sommelier\'s recommendations were spot-on, each pairing enhancing both the wine and the food.',
        'Melbourne Bistro represents the pinnacle of Australian fine dining. It\'s a restaurant that doesn\'t just serve food; it creates experiences, memories, and moments of pure culinary joy.'
      ],
      pullQuote: 'Melbourne Bistro represents the pinnacle of Australian fine dining. It doesn\'t just serve food; it creates experiences.',
      rating: 5,
      tags: ['Three Hats', 'Tasting Menu', 'Wine Pairing', 'Excellence']
    },
    'broadsheet-melbourne-2024': {
      id: 'broadsheet-melbourne-2024',
      publication: 'Broadsheet Melbourne',
      headline: 'The Restaurant Everyone\'s Talking About',
      subheading: 'Melbourne Bistro has quickly become the city\'s most sought-after dining destination',
      author: 'Emma Thompson',
      date: 'January 20, 2024',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: [
        'In a city renowned for its dining scene, it takes something special to capture the attention of Melbourne\'s discerning food lovers. Melbourne Bistro has done just that, becoming the reservation that everyone wants but few can secure.',
        'The buzz around Melbourne Bistro began even before it opened its doors. Chef Marcus Thompson\'s reputation preceded him, and the restaurant\'s commitment to showcasing the best of Victorian produce had food enthusiasts eagerly anticipating its debut.',
        'The reality has exceeded even the highest expectations. Melbourne Bistro offers a dining experience that is both refined and approachable, sophisticated yet unpretentious.',
        'The menu changes seasonally, reflecting Thompson\'s commitment to using ingredients at their peak. Recent highlights include a stunning barramundi dish with native pepperberry and a truffle risotto that has become the stuff of legend among Melbourne\'s food cognoscenti.',
        'What makes Melbourne Bistro special isn\'t just the food, though that would be reason enough to visit. It\'s the complete experience – the warm hospitality, the carefully curated wine list, the attention to detail that extends to every aspect of the operation.',
        'The restaurant\'s interior strikes the perfect balance between elegance and comfort. The open kitchen allows diners to witness the culinary theater, while the dining room provides an intimate setting for conversation and connection.',
        'Reservations are notoriously difficult to secure, with the restaurant often booked weeks in advance. But for those lucky enough to experience Melbourne Bistro, the wait is more than worthwhile.',
        'As Melbourne\'s dining scene continues to evolve and mature, Melbourne Bistro stands as a shining example of what Australian cuisine can achieve when passion, skill, and vision come together in perfect harmony.'
      ],
      pullQuote: 'Melbourne Bistro offers a dining experience that is both refined and approachable, sophisticated yet unpretentious.',
      rating: 5,
      tags: ['Melbourne Dining', 'Seasonal Menu', 'Local Produce', 'Fine Dining']
    }
  };

  const article = articles[articleId] || articles['the-age-2024'];

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900/80 z-10"></div>
          <img
            src={article.image}
            alt={article.headline}
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
          
          <div className="bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg inline-block mb-4 font-semibold">
            {article.publication}
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">{article.headline}</h1>
          <p className="text-xl text-gray-200 mb-8">{article.subheading}</p>
          
          <div className="flex items-center space-x-6 text-gray-300">
            <div className="flex items-center">
              <User className="mr-2" size={16} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2" size={16} />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center">
              {[...Array(article.rating)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={16} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
            <div className="prose prose-lg prose-invert max-w-none">
              {article.content.map((paragraph, index) => (
                <div key={index}>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                  
                  {/* Insert pull quote after 3rd paragraph */}
                  {index === 2 && (
                    <div className="my-12 bg-gray-700 rounded-2xl p-8 border-l-4 border-yellow-400">
                      <Quote className="text-yellow-400 mb-4" size={32} />
                      <blockquote className="text-2xl font-semibold text-white italic leading-relaxed">
                        {article.pullQuote}
                      </blockquote>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Share this article</h3>
                <button className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-4 py-2 rounded-lg font-semibold transition-colors">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">More Press Coverage</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(articles)
              .filter(a => a.id !== article.id)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/press/${relatedArticle.id}`}
                  className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-700 transition-colors group"
                >
                  <img
                    src={relatedArticle.image}
                    alt={relatedArticle.headline}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="bg-yellow-600 text-gray-900 px-3 py-1 rounded text-sm font-semibold inline-block mb-3">
                      {relatedArticle.publication}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {relatedArticle.headline}
                    </h3>
                    <p className="text-gray-400 text-sm">{relatedArticle.date}</p>
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
            Experience Melbourne Bistro Yourself
          </h2>
          <p className="text-xl text-gray-800 mb-8">
            Discover why critics and diners alike are raving about our culinary excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/reservations"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Make a Reservation
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

export default PressArticlePage;