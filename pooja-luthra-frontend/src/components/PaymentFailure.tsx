
import React from 'react';
import { XCircle, Mail, Phone, MessageSquare, Home, RefreshCw } from 'lucide-react';

interface PaymentFailureProps {
  onBackToHome: () => void;
  onRetryPayment: () => void;
  error?: string;
}

const PaymentFailure: React.FC<PaymentFailureProps> = ({ onBackToHome, onRetryPayment, error }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 max-w-2xl w-full text-center animate-scale-in">
        {/* Failure Icon */}
        <div className="mb-8 animate-bounce-in">
          <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <XCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Payment Failed 😔
          </h1>
          <p className="text-lg text-gray-600 mb-8 animate-fade-in-up animation-delay-200">
            Don't worry! Your payment could not be processed, but you can try again.
          </p>
        </div>

        {/* Error Details */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-8 animate-fade-in-up animation-delay-400">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Details</h3>
            <p className="text-sm text-gray-600">{error}</p>
          </div>
        )}

        {/* Common Reasons */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8 animate-fade-in-up animation-delay-600">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Reasons for Payment Failure</h3>
          <div className="space-y-2 text-left text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Insufficient balance in your account</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Network connectivity issues</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Card details entered incorrectly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>Transaction limit exceeded</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-6 mb-8 animate-fade-in-up animation-delay-800">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1000">
          <button
            onClick={onRetryPayment}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 animate-gradient-x"
          >
            <RefreshCw className="w-5 h-5" />
            Retry Payment
          </button>
          
          <button
            onClick={onBackToHome}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-gray-600 hover:to-gray-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;