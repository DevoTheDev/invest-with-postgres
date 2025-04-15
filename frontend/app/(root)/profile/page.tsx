"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/hooks/useUser";
import Logout from "@/app/components/atoms/Logout";
import { useRouter } from "next/navigation";

const Page = () => {
  const { profile, update, loading } = useUser();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    accountBalance: 0,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        accountBalance: profile.accountBalance || 0,
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (profile) {
      const { firstName, lastName, email, accountBalance } = formData;
      await update().name(firstName, lastName);
      await update().email(email);
      await update().balance(accountBalance);
      setEditing(false);
    }
  };

  const handleStatusToggle = async () => {
    profile?.isActive ? await update().deactivate() : await update().reactivate();
  };

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;

  if (!profile) {
    return <div className="text-center py-10 text-white">No profile found</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg text-white">
      <h1 className="text-3xl font-bold text-cyan-400 border-b border-gray-700 pb-4">User Profile</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300">First Name</label>
          {editing ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="mt-1 text-gray-100">{profile.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Last Name</label>
          {editing ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="mt-1 text-gray-100">{profile.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="mt-1 text-gray-100">{profile.email}</p>
          )}
        </div>

        {/* Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Account Balance</label>
          {editing ? (
            <input
              type="number"
              name="accountBalance"
              value={formData.accountBalance}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="mt-1 text-gray-100">${profile.accountBalance}</p>
          )}
        </div>

        {/* Status & Toggle */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300">Status</label>
          <p className="mt-1 mb-2 text-lg font-semibold text-white">
            {profile.isActive ? "✅ Active" : "🚫 Inactive"}
          </p>
          <button
            onClick={handleStatusToggle}
            className={`px-4 py-2 rounded-md transition ${
              profile.isActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {profile.isActive ? "Deactivate" : "Reactivate"}
          </button>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-700">
        {editing ? (
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md shadow"
          >
            Edit Profile
          </button>
        )}
        <Logout />
      </div>
    </main>
  );
};

export default Page;
