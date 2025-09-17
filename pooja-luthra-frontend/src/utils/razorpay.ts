// Razorpay integration utility functions

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface PaymentData {
  name: string;
  email: string;
  whatsapp: string;
  issue: string;
  plan: string;
  amount: number;
}

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create Razorpay order (this would typically be done on your backend)
export const createOrder = async (amount: number): Promise<{ order_id: string; amount: number }> => {
  // In a real application, this would be an API call to your backend
  // For demo purposes, we'll simulate an order creation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        order_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: amount * 100, // Razorpay expects amount in paise
      });
    }, 1000);
  });
};

// Initialize Razorpay payment
export const initiatePayment = async (
  paymentData: PaymentData,
  onSuccess: (response: RazorpayResponse) => void,
  onFailure: (error: string) => void
): Promise<void> => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    // Create order
    const order = await createOrder(paymentData.amount);

    // Razorpay options
    const options: RazorpayOptions = {
      key: 'rzp_test_1234567890', // Replace with your Razorpay key ID
      amount: order.amount,
      currency: 'INR',
      name: 'Pooja Luthra Nutrition',
      description: `${paymentData.plan} - Nutrition Consultation`,
      order_id: order.order_id,
      handler: (response: RazorpayResponse) => {
        // Payment successful
        onSuccess(response);
      },
      prefill: {
        name: paymentData.name,
        email: paymentData.email,
        contact: paymentData.whatsapp,
      },
      theme: {
        color: '#ec4899', // Pink color matching your theme
      },
      modal: {
        ondismiss: () => {
          onFailure('Payment cancelled by user');
        },
      },
    };

    // Create and open Razorpay checkout
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    onFailure(error instanceof Error ? error.message : 'Payment initialization failed');
  }
};

// Verify payment (this should be done on your backend)
export const verifyPayment = async (response: RazorpayResponse): Promise<boolean> => {
  // In a real application, this would be an API call to your backend
  // to verify the payment signature
  console.log('Verifying payment with response:', response);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate verification - in real app, verify the signature
      resolve(true);
    }, 1000);
  });
};