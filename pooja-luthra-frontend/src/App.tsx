import React, { useState, useEffect } from 'react';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentFailure from './components/PaymentFailure';
import { initiatePayment, verifyPayment } from './utils/razorpay';
import type { PaymentData, RazorpayResponse } from './utils/razorpay';
import { 
  Heart, 
  Users, 
  Youtube, 
  Instagram, 
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  Sparkles,
  Award,
  TrendingUp
} from 'lucide-react';

type PageState = 'home' | 'success' | 'failure';

interface Plan {
  name: string;
  price: number;
  features: string[];
  additionalFeatures?: string[];
}

interface Testimonial {
  name: string;
  text: string;
}

const plans: Plan[] = [
  {
    name: "Weight Loss Plan",
    price: 1000,
    features: [
      "1 Month Diet Plan",
      "Exercise Plan for One Month", 
      "Energy Healing Affirmations and Meditation",
      "WhatsApp Support",
      "Easy to Follow Remedies"
    ]
  },
  {
    name: "Lifestyle Disease Reversal Plan",
    price: 1500,
    features: [
      "1 Month Diet Plan",
      "Exercise Plan for One Month",
      "Energy Healing Affirmations and Meditation", 
      "WhatsApp Support",
      "Easy to Follow Remedies"
    ],
    additionalFeatures: [
      "Fatty Liver Management",
      "High Blood Pressure Control",
      "Diabetes Reversal",
      "Thyroid Management", 
      "IBS Treatment",
      "Gut Reset Program",
      "Hormonal Imbalance",
      "PCOD/PCOS"
    ]
  },
  {
    name: "Menopause Management Plan", 
    price: 1500,
    features: [
      "1 Month Diet Plan",
      "Exercise Plan for One Month",
      "Energy Healing Affirmations and Meditation",
      "WhatsApp Support", 
      "Easy to Follow Remedies"
    ]
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Sunita Balmiki",
    text: "Ap sabh try karein...i have been using this diet on my mom and it really works...it has been 5 days she has now only 174....before she use to have 300 above sometime after food."
  },
  {
    name: "Poonam Shinde", 
    text: "Thankyou so much pooja dii for this diet..... Mene mere papa ko ye kadha pilaya he ab lgbhg pite pite 1 month se upr time ho gyaa he or mene iske bahut achhe result dekhe he mene iske result 15din me hi dekh liye me bahut khush hu ki aapके dwara btaye gaye is kadhe ka itna achha asr dekhne ko mila ......... Thankyou so much again 🙏🥰😍❤"
  },
  {
    name: "Vani Kuccha",
    text: "Yes it actually does work 😊 I drink this in the morning and with in 6 hrs I got my periods 🎉😊"
  },
  {
    name: "Kuldeep Singh",
    text: "Thank u Puja di and helpful video Maine one week use Kiya aur result bahut achcha aaya 😘😘😘😘"
  },
  {
    name: "Shruti",
    text: "Dear Pooja, Your Diet Plan worked like magic for me. Mera pet sach me ander chala gya."
  },
  {
    name: "Rashi Mittal",
    text: "Thank You Pooja, My hair fall has completely stopped with your home remedies and diet"
  }
];

function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageState>('home');
  const [paymentResponse, setPaymentResponse] = useState<RazorpayResponse | null>(null);
  const [paymentError, setPaymentError] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    issue: '',
    plan: ''
  });

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBookConsultation = (planName: string) => {
    setSelectedPlan(planName);
    setFormData({ ...formData, plan: planName });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get plan price
    const selectedPlanData = plans.find(plan => plan.name === formData.plan);
    if (!selectedPlanData) {
      alert('Please select a valid plan');
      return;
    }

    const paymentData: PaymentData = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      issue: formData.issue,
      plan: formData.plan,
      amount: selectedPlanData.price,
    };

    // Initiate Razorpay payment
    initiatePayment(
      paymentData,
      async (response: RazorpayResponse) => {
        // Payment successful
        try {
          const isVerified = await verifyPayment(response);
          if (isVerified) {
            setPaymentResponse(response);
            setCurrentPage('success');
            setIsModalOpen(false);
          } else {
            setPaymentError('Payment verification failed');
            setCurrentPage('failure');
            setIsModalOpen(false);
          }
        } catch (error) {
          setPaymentError('Payment verification failed');
          setCurrentPage('failure');
          setIsModalOpen(false);
        }
      },
      (error: string) => {
        // Payment failed
        setPaymentError(error);
        setCurrentPage('failure');
        setIsModalOpen(false);
      }
    );
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setPaymentResponse(null);
    setPaymentError('');
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      issue: '',
      plan: ''
    });
  };

  const handleRetryPayment = () => {
    setCurrentPage('home');
    setPaymentError('');
    // Keep the form data so user doesn't have to re-enter
    setIsModalOpen(true);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Render different pages based on current state
  if (currentPage === 'success') {
    return (
      <PaymentSuccess
        onBackToHome={handleBackToHome}
        paymentId={paymentResponse?.razorpay_payment_id}
        orderId={paymentResponse?.razorpay_order_id}
      />
    );
  }

  if (currentPage === 'failure') {
    return (
      <PaymentFailure
        onBackToHome={handleBackToHome}
        onRetryPayment={handleRetryPayment}
        error={paymentError}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="floating-element absolute top-20 left-10 w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
        <div className="floating-element-delay absolute top-40 right-20 w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
        <div className="floating-element absolute bottom-40 left-20 w-3 h-3 bg-orange-300 rounded-full opacity-50"></div>
        <div className="floating-element-delay absolute bottom-20 right-40 w-5 h-5 bg-pink-400 rounded-full opacity-30"></div>
        <div className="floating-element absolute top-60 left-1/2 w-2 h-2 bg-blue-400 rounded-full opacity-70"></div>
      </div>

      {/* Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full pointer-events-none z-50 opacity-20 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1)',
        }}
      ></div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-orange-50 to-blue-50 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/20 via-orange-100/20 to-blue-100/20 animate-gradient-shift"></div>
        
        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-pink-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-blue-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'animate-slide-in-left' : 'opacity-0 translate-x-[-100px]'}`}>
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-4 animate-pulse-glow shadow-lg">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Hi I am Pooja Luthra
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-4 leading-tight animate-text-reveal">
                  <span className="inline-block animate-wave">👋</span> Hello!
                </h1>
                <p className="text-xl lg:text-2xl text-gray-600 mb-6 animate-fade-in-up animation-delay-500">
                  I'm a <span className="text-pink-600 font-semibold">Certified Dietician & Nutritionist</span>, 
                  dedicated to helping you live a healthier and happier life.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-700">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">I offer customized diet plans for managing:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Weight Loss", "Diabetes Reversal", "Thyroid Reversal", "PCOS & Hormonal Imbalance",
                    "High Blood Pressure", "Cholesterol Management", "Fatty Liver", "Stress & Anxiety Related Eating",
                    "Digestive Issues & Bloating"
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700 animate-fade-in-up" style={{animationDelay: `${800 + index * 100}ms`}}>
                      <CheckCircle className="w-4 h-4 text-green-500 animate-pulse" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`lg:w-1/2 flex justify-center transition-all duration-1000 ${isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-[100px]'}`}>
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full flex items-center justify-center shadow-2xl animate-float hover:scale-110 transition-transform duration-500 p-4">
                  <img 
                    src="https://i.postimg.cc/k4VVkjty/pooja.jpg" 
                    alt="Pooja Luthra - Certified Dietician & Nutritionist" 
                    className="w-full h-full object-cover rounded-full animate-pulse-slow"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce-slow">
                  <Heart className="w-8 h-8 text-pink-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-spin-slow">
                  <Award className="w-6 h-6 text-blue-500" />
                </div>
                <div className="absolute top-1/2 -left-8 bg-white rounded-full p-3 shadow-lg animate-pulse">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-bounce-in">
                <Youtube className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 animate-count-up">7.6M</h3>
              <p className="text-gray-600">YouTube Subscribers</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-bounce-in animation-delay-200">
                <Instagram className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 animate-count-up">4.9L</h3>
              <p className="text-gray-600">Instagram Followers</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-bounce-in animation-delay-400">
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 animate-count-up">100K</h3>
              <p className="text-gray-600">People Benefitted</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-bounce-in animation-delay-600">
                <Heart className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 animate-count-up">2K</h3>
              <p className="text-gray-600">Diabetes Reversed</p>
            </div>
            
            <div className="text-center group col-span-2 lg:col-span-1">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 animate-bounce-in animation-delay-800">
                <CheckCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 animate-count-up">28K</h3>
              <p className="text-gray-600">Weight Loss Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-orange-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12 animate-fade-in-up">
            What My Clients Say
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 min-h-[200px] flex items-center hover:shadow-3xl transition-all duration-500 animate-scale-in">
              <div className="text-center w-full">
                <div className="flex justify-center mb-4 animate-fade-in">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-star-twinkle" style={{animationDelay: `${i * 100}ms`}} />
                  ))}
                </div>
                
                <p className="text-lg lg:text-xl text-gray-700 mb-6 italic leading-relaxed animate-fade-in-up animation-delay-300">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <h4 className="text-xl font-semibold text-gray-800 animate-fade-in-up animation-delay-500">
                  - {testimonials[currentTestimonial].name}
                </h4>
              </div>
            </div>
            
            <button 
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-300 animate-pulse-subtle"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 hover:scale-110 transition-all duration-300 animate-pulse-subtle"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentTestimonial ? 'bg-pink-500 animate-pulse' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-pink-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4 animate-fade-in-up">
            Choose Your Plan
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg animate-fade-in-up animation-delay-200">
            Select the perfect plan for your health journey
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 transform hover:scale-105 hover:shadow-3xl transition-all duration-500 animate-slide-in-up group ${
                  index === 1 ? 'ring-4 ring-pink-200 lg:scale-105 animate-glow' : ''
                }`}
                style={{animationDelay: `${index * 200}ms`}}
              >
                {index === 1 && (
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-center py-2 px-4 rounded-full text-sm font-medium mb-6 animate-pulse-glow">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center group-hover:text-pink-600 transition-colors duration-300">{plan.name}</h3>
                
                <div className="text-center mb-6 animate-bounce-in animation-delay-300">
                  <span className="text-4xl font-bold text-pink-600 animate-number-glow">₹{plan.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3 animate-fade-in-left" style={{animationDelay: `${400 + fIndex * 100}ms`}}>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 animate-pulse-subtle" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.additionalFeatures && (
                    <>
                      <hr className="my-4 animate-fade-in" />
                      <p className="font-semibold text-gray-800 mb-2 animate-fade-in-up">Diseases covered:</p>
                      {plan.additionalFeatures.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-3 animate-fade-in-left" style={{animationDelay: `${600 + fIndex * 100}ms`}}>
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 animate-pulse-subtle" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                <button 
                  onClick={() => handleBookConsultation(plan.name)}
                  className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up ${
                    index === 1 
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 shadow-lg animate-gradient-x' 
                      : 'bg-gray-800 text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600'
                  }`}
                  style={{animationDelay: `${800 + index * 100}ms`}}
                >
                  Book Consultation
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-modal-slide-in">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 animate-fade-in-up">Book Consultation</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-300 animate-fade-in"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl animate-fade-in-up animation-delay-200">
                <p className="text-sm text-gray-600">Selected Plan:</p>
                <p className="font-semibold text-gray-800">{selectedPlan}</p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 animate-fade-in-up animation-delay-300">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300 hover:border-pink-300 animate-fade-in-up animation-delay-400"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 animate-fade-in-up animation-delay-500">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300 hover:border-pink-300 animate-fade-in-up animation-delay-600"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 animate-fade-in-up animation-delay-700">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300 hover:border-pink-300 animate-fade-in-up animation-delay-800"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 animate-fade-in-up animation-delay-900">Describe Your Issue</label>
                  <textarea 
                    required
                    value={formData.issue}
                    onChange={(e) => setFormData({...formData, issue: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300 hover:border-pink-300 animate-fade-in-up animation-delay-1000"
                    placeholder="Please describe your health concerns and goals..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-orange-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 animate-fade-in-up animation-delay-1100 animate-gradient-x disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.name || !formData.email || !formData.whatsapp || !formData.issue}
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4 animate-fade-in-up">Pooja Luthra</h3>
          <p className="text-gray-400 mb-6 animate-fade-in-up animation-delay-200">Certified Dietician & Nutritionist</p>
          <div className="flex justify-center gap-6 mb-8 animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
              <Youtube className="w-5 h-5" />
              <span>7.6M Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
              <Instagram className="w-5 h-5" />
              <span>4.9L Followers</span>
            </div>
          </div>
          <p className="text-gray-400 animate-fade-in-up animation-delay-600">© 2025 Pooja Luthra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;