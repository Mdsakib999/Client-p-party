// components/TimedPopup.jsx
import React from "react";

const TimedPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg p-4 max-w-md w-full shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-5 -right-3 bg-black text-red-500 hover:text-red-500 text-xl font-bold px-2.5 py-1  rounded-full cursor-pointer"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src="https://i.ibb.co.com/Wv0jtSsm/Khaleda-Zia.png"
          alt="Popup"
          className="w-full rounded"
        />
      </div>
    </div>
  );
};

export default TimedPopup;
