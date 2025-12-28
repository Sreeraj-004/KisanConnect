import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Chat() {
  const [activeChat, setActiveChat] = useState(1);

  const contacts = [
    {
      id: 1,
      name: "Anjali",
      lastMessage: "Is tomato available today?",
      unread: 2,
    },
    {
      id: 2,
      name: "Rahul",
      lastMessage: "Delivery before 6pm please",
      unread: 0,
    },
    {
      id: 3,
      name: "Store Admin",
      lastMessage: "Inventory updated successfully",
      unread: 1,
    },
  ];

  const messages = [
    { from: "them", text: "Is tomato available today?" },
    { from: "me", text: "Yes, fresh stock just arrived." },
    { from: "them", text: "What is the price for 1kg?" },
    { from: "me", text: "₹39 per kg." },
  ];

  return (
    <>
      {/* ✅ FIX: flex layout */}
      <div className="min-h-screen flex flex-col bg-light">
        <Navbar title="Messages" />

        {/* ✅ FIX: main content grows */}
        <div className="flex-1 mx-14 px-5 py-6">
          <div className="grid grid-cols-12 gap-6">

            {/* CHAT MESSAGES – 2/3 */}
            <div className="col-span-8 bg-white border border-green-200 rounded-lg shadow-sm flex flex-col">

              {/* Chat Header */}
              <div className="px-6 py-4 border-b bg-primaryDark text-white rounded-t-lg">
                <h2 className="text-lg font-semibold">
                  {contacts.find(c => c.id === activeChat)?.name}
                </h2>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto text-sm">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`max-w-[70%] px-4 py-2 rounded-lg ${
                      msg.from === "me"
                        ? "ml-auto bg-primary text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                />
                <button className="btn-primary-sm px-6 py-2">
                  Send
                </button>
              </div>

            </div>

            {/* CONTACT LIST – 1/3 */}
            <div className="col-span-4 bg-white border border-green-200 rounded-lg shadow-sm">

              <div className="px-6 py-4 border-b bg-primaryDark text-white rounded-t-lg">
                <h2 className="text-lg font-semibold">
                  Chats
                </h2>
              </div>

              <div className="divide-y">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setActiveChat(contact.id)}
                    className={`p-4 cursor-pointer hover:bg-light ${
                      activeChat === contact.id ? "bg-light" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-800">
                        {contact.name}
                      </h3>

                      {contact.unread > 0 && (
                        <span className="bg-primaryDark text-white text-xs px-2 py-1 rounded-full">
                          {contact.unread}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500 truncate mt-1">
                      {contact.lastMessage}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Chat;
