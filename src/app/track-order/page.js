"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, XCircle } from "lucide-react";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // In a real implementation, this would fetch from your orders API
      // For now, we'll show a demo response
      const demoOrder = {
        id: orderId,
        customerName: "John Doe",
        status: "confirmed",
        productName: "Sample Product",
        timestamp: new Date().toISOString(),
        trackingSteps: [
          {
            status: "pending",
            label: "Order Placed",
            description: "Your order has been received",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            completed: true
          },
          {
            status: "confirmed",
            label: "Order Confirmed",
            description: "Your order has been confirmed and is being prepared",
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            completed: true
          },
          {
            status: "delivered",
            label: "Delivered",
            description: "Your order has been delivered",
            date: null,
            completed: false
          }
        ]
      };

      setOrder(demoOrder);
    } catch (err) {
      setError("Order not found. Please check your order ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status, completed) => {
    if (!completed) return <Package className="h-5 w-5 text-gray-400" />;

    switch (status) {
      case "pending":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "confirmed":
        return <Truck className="h-5 w-5 text-yellow-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "canceled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "confirmed":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-200";
      case "canceled":
        return "bg-red-50 text-red-700 border-red-200";
      case "returned":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#831113]">Track Your Order</h1>

      <div className="max-w-md mx-auto mb-12">
        <form onSubmit={handleTrackOrder} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#831113] focus:ring-1 focus:ring-[#831113]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#831113] hover:bg-[#6a0f0f] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
        )}
      </div>

      {order && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order #{order.id}</h2>
                <p className="text-gray-600">{order.customerName}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">
                <span className="font-medium">Product:</span> {order.productName}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Order Date:</span> {new Date(order.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6 text-[#831113]">Order Timeline</h3>

            <div className="space-y-6">
              {order.trackingSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.completed ? 'border-[#831113] bg-[#831113]' : 'border-gray-300 bg-white'
                  }`}>
                    {getStatusIcon(step.status, step.completed)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.label}
                      </h4>
                      {step.completed && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className={`text-sm ${step.completed ? 'text-gray-700' : 'text-gray-500'}`}>
                      {step.description}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(step.date).toLocaleDateString()} at {new Date(step.date).toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Need help with your order? <a href="/contact" className="text-[#831113] hover:underline">Contact us</a>
            </p>
            <p className="text-sm text-gray-500">
              Order tracking is currently in demo mode. Full tracking functionality will be available soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}