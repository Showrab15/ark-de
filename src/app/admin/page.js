"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  const { user, appUser, loading, logout, isAuthenticated, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!loading && isAuthenticated && !isAdmin) {
      router.push("/");
      return;
    }

    if (!loading && isAuthenticated && isAdmin) {
      fetchOrders();
      fetchUsers();
    }
  }, [isAuthenticated, isAdmin, loading, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };


  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingStatus(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update local state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Pending" },
      confirmed: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Confirmed" },
      delivered: { color: "bg-green-50 text-green-700 border-green-200", label: "Delivered" },
      canceled: { color: "bg-red-50 text-red-700 border-red-200", label: "Canceled" },
      returned: { color: "bg-gray-50 text-gray-700 border-gray-200", label: "Returned" },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const toggleDetails = (orderId) => {
    setShowDetails(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      const updated = await response.json();
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated.user : u)));

      if (appUser?.id === userId) {
        setUsers((prev) => prev.map((u) => (u.id === userId ? updated.user : u)));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (loadingOrders) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center">Loading orders...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-red-500">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-black mb-2">Order Management</h1>
            <p className="text-zinc-600">View and manage customer orders</p>
            <p className="text-sm text-zinc-500 mt-1">
              Logged in as: {user?.displayName || user?.email}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Site
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-zinc-900">Total Orders</h3>
            <p className="text-3xl font-bold text-black">{orders.length}</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-zinc-900">Total Revenue</h3>
            <p className="text-3xl font-bold text-black">
              Tk {orders.reduce((sum, order) => sum + order.deliveryCharge, 0)}
            </p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-zinc-900">Pending Orders</h3>
            <p className="text-3xl font-bold text-black">
              {orders.filter(order => order.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-zinc-200">
            <h2 className="text-xl font-medium text-zinc-900">User Management</h2>
          </div>

          {loadingUsers ? (
            <div className="p-6 text-center text-zinc-500">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-zinc-500">No users yet.</div>
          ) : (
            <div className="p-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-700">
                    <th className="py-2">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((usr) => (
                    <tr key={usr.id} className="border-b border-zinc-100">
                      <td className="py-2">{usr.name || "--"}</td>
                      <td>{usr.email}</td>
                      <td>{usr.role}</td>
                      <td className="space-x-2">
                        {['user', 'admin'].map((role) => (
                          <Button
                            key={`${usr.id}-${role}`}
                            size="xs"
                            variant={usr.role === role ? "default" : "outline"}
                            onClick={() => updateUserRole(usr.id, role)}
                            disabled={usr.role === role}
                            className="text-[10px]"
                          >
                            {role}
                          </Button>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Orders List */}
        <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200">
            <h2 className="text-xl font-medium text-zinc-900">Recent Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">
              No orders yet. Orders will appear here when customers place them.
            </div>
          ) : (
            <div className="divide-y divide-zinc-200">
              {orders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium text-zinc-900">{order.customerName}</h3>
                        <p className="text-sm text-zinc-600">{order.phone}</p>
                      </div>
                      <Badge variant="outline" className={getStatusBadge(order.status).color}>
                        {getStatusBadge(order.status).label}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-zinc-600">
                        {new Date(order.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-sm font-medium text-zinc-900">
                        Tk {order.deliveryCharge}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-zinc-700">
                      <span className="font-medium">Product:</span> {order.productName}
                    </p>
                    <p className="text-sm text-zinc-700">
                      <span className="font-medium">Size:</span> {order.size} | <span className="font-medium">Quantity:</span> {order.quantity}
                    </p>
                    <p className="text-sm text-zinc-700">
                      <span className="font-medium">Address:</span> {order.address}
                    </p>
                  </div>

                  {/* Status Update */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-zinc-900 mb-2">Update Status:</p>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'confirmed', 'delivered', 'canceled', 'returned'].map((status) => (
                        <Button
                          key={status}
                          variant={order.status === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, status)}
                          disabled={updatingStatus === order.id}
                          className={`text-xs ${
                            order.status === status
                              ? "bg-black text-white"
                              : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                          }`}
                        >
                          {updatingStatus === order.id ? "Updating..." : getStatusBadge(status).label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDetails(order.id)}
                    className="flex items-center gap-2 text-zinc-600 hover:text-black"
                  >
                    {showDetails[order.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showDetails[order.id] ? "Hide Details" : "Show Details"}
                  </Button>

                  {showDetails[order.id] && (
                    <div className="mt-4 p-4 bg-zinc-50 rounded-lg">
                      <h4 className="font-medium text-zinc-900 mb-2">Order Details</h4>
                      <div className="space-y-1 text-sm text-zinc-700">
                        <p><span className="font-medium">Order ID:</span> {order.id}</p>
                        <p><span className="font-medium">Product ID:</span> {order.productId}</p>
                        <p><span className="font-medium">Size:</span> {order.size}</p>
                        <p><span className="font-medium">Quantity:</span> {order.quantity}</p>
                        <p><span className="font-medium">Timestamp:</span> {new Date(order.timestamp).toLocaleString()}</p>
                        <p><span className="font-medium">Delivery Charge:</span> Tk {order.deliveryCharge}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}