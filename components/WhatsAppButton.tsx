
import React from 'react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "233244123456"; // Replace with VistaTouch's number
  const message = "Hello VistaTouch Homes, I'm interested in your properties.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-40 transform hover:scale-110 transition-transform"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp fa-3x"></i>
    </a>
  );
};

export default WhatsAppButton;
