import React from 'react';
import { useNavigate } from 'react-router-dom';


function ChatBox() {
  const navigate = useNavigate();
  return (
    <div className="border border-primaryDark rounded-lg bg-white shadow-sm h-full flex flex-col">

      {/* Header */}
      <div className="px-4 py-3 flex justify-between bg-primaryDark text-white rounded-t-lg">
        <div>
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-xs opacity-80">Recent chats</p>
        </div>
        <button className="btn-secondary-sm" onClick={()=>navigate("/chat")}>
          View Chats
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 text-sm flex-1 overflow-y-auto">
        <div>
          <p className="font-medium text-primary">Anjali</p>
          <p className="text-gray-600 truncate">
            Is today’s tomato stock available?
          </p>
        </div>

        <div>
          <p className="font-medium text-primary">Rahul</p>
          <p className="text-gray-600 truncate">
            Please confirm delivery time
          </p>
        </div>

        <div>
          <p className="font-medium text-primary">Store Admin</p>
          <p className="text-gray-600 truncate">
            Your inventory was updated
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
