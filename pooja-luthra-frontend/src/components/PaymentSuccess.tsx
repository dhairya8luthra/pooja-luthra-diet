import React from 'react';
import { CheckCircle, Mail, Phone, MessageSquare, Home } from 'lucide-react';

interface PaymentSuccessProps {
  onBackToHome: () => void;
  paymentId?: string;
  orderId?: string;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onBackToHome, paymentId, orderId }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 max-w-2xl w-full text-center animate-scale-in">
        {/* Success Icon */}
        <div className="mb-8 animate-bounce-in">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Payment Successful! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
            Thank you for booking your consultation with Pooja Luthra. Your journey to better health starts now!
          </p>
        </div>

        {/* Payment Details */}
        {(paymentId || orderId) && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 animate-fade-in-up animation-delay-400">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {paymentId && (
                <p><span className="font-medium">Payment ID:</span> {paymentId}</p>
              )}
              {orderId && (
                <p><span className="font-medium">Order ID:</span> {orderId}</p>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6 mb-8 animate-fade-in-up animation-delay-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
              <p className="text-gray-700">You'll receive a confirmation email within 5 minutes</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
              <p className="text-gray-700">Pooja will contact you within 24 hours via WhatsApp</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
              <p className="text-gray-700">Your personalized diet plan will be ready within 2-3 days</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-6 mb-8 animate-fade-in-up animation-delay-800">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Have Questions?</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 text-gray-700 hover:text-pink-600 transition-colors duration-300">
              <Mail className="w-5 h-5" />
              <a href="mailto:support@poojaluthra.com" className="font-medium hover:underline">
                support@poojaluthra.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition-colors duration-300">
              <Phone className="w-5 h-5" />
              <a href="tel:+919876543210" className="font-medium hover:underline">
                +91 98765 43210
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700 hover:text-green-600 transition-colors duration-300">
              <MessageSquare className="w-5 h-5" />
              <a href="https://wa.me/919876543210" className="font-medium hover:underline">
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-pink-600 hover:to-orange-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto animate-fade-in-up animation-delay-1000 animate-gradient-x"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;