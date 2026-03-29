// components/ChatWidget.jsx
import { useState } from "react";
import { Chat } from "../pages/Chat";

export const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-yellow-400 text-black p-4 rounded-full z-50 aspect-square w-[60px] h-[60px]"
      >
        💬
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[350px] h-[500px] bg-gray-600 rounded-2xl z-50 shadow-lg">
          <Chat />
        </div>
      )}
    </>
  );
};