import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ChatBox from "../components/Chatbox";
import InventoryCard from "../components/Inventory";
import Footer from '../components/Footer';

import { useNavigate } from 'react-router-dom';


function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full min-h-screen bg-light">
        <Navbar title="Home" />

        {/* Wrap */}
        <div className="mx-14 px-5 border min-h-screen border-l-green-200 border-r-green-200 py-6">

          {/* Farmer Info */}
          <div className="mb-6 p-4 bg-white rounded-lg border border-green-200 shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Ramesh Kumar
              </h2>
              <p className="text-sm text-gray-600">
                ramesh@kissanconnect.com
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Farmer ID: FC-1021
            </div>
          </div>

          {/* Dashboard Grid */}
            <div className="grid grid-cols-3 gap-6 mt-6">

            {/* Orders – BIG CARD */}
            <div className="col-span-2 border border-primaryDark rounded-lg bg-white shadow-sm">

                <div className="px-4 py-3 bg-primaryDark text-white">
                <h1 className="text-xl font-semibold">Orders</h1>
                <p className="text-sm">Recent activity</p>
                </div>

                <div className="p-4">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="text-left text-gray-600 border-b">
                        <th className="pb-2">Order ID</th>
                        <th className="pb-2">Item</th>
                        <th className="pb-2">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b">
                        <td className="py-2">#1021</td>
                        <td className="py-2">Tomatoes</td>
                        <td className="py-2 text-green-600 font-medium">Delivered</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2">#1022</td>
                        <td className="py-2">Banana</td>
                        <td className="py-2 text-yellow-600 font-medium">Pending</td>
                    </tr>
                    <tr>
                        <td className="py-2">#1023</td>
                        <td className="py-2">Coconut</td>
                        <td className="py-2 text-red-500 font-medium">Cancelled</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>

            {/* Right Side Stack */}
            <div className="flex flex-col gap-6">
                <InventoryCard />
                <ChatBox />
            </div>

            </div>
        </div>
      </div>
    </>
  );
}

export default FarmerDashboard;
