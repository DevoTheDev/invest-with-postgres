"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/hooks/useUser";
import Logout from "@/app/components/atoms/Logout";

const Page = () => {
  const { profile, loading, error, createProfile, updateProfile, deleteProfile } = useUser();
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthday: "",
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
        birthday: profile.birthday || "",
      });
      setCreating(false);
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    try {
      await createProfile(formData);
      setCreating(false);
      setFormErrors([]);
    } catch (err: any) {
      console.error("Create profile failed", err);
      setFormErrors(err.response?.data?.errors?.map((e: any) => e.message) || ["Failed to create profile"]);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(formData);
      setEditing(false);
      setFormErrors([]);
    } catch (err: any) {
      console.error("Update profile failed", err);
      setFormErrors(err.response?.data?.errors?.map((e: any) => e.message) || ["Failed to update profile"]);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your profile?")) {
      try {
        await deleteProfile();
      } catch (err) {
        console.error("Delete profile failed", err);
      }
    }
  };

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;

  if (error) return <div className="text-center py-10 text-red-400">{error}</div>;

  if (!profile && !creating) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg text-white">
        <h1 className="text-3xl font-bold text-cyan-400 border-b border-gray-700 pb-4">User Profile</h1>
        <p className="text-gray-100">No profile found.</p>
        <button
          onClick={() => setCreating(true)}
          className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow"
        >
          Create Profile
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg text-white">
      <h1 className="text-3xl font-bold text-cyan-400 border-b border-gray-700 pb-4">
        {creating ? "Create Profile" : "User Profile"}
      </h1>

      {formErrors.length > 0 && (
        <div className="bg-red-600 text-white p-4 rounded-lg">
          <ul className="list-disc pl-5">
            {formErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300">First Name</label>
          {editing || creating ? (
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="mt-1 text-gray-100">{profile?.firstName || "Not set"}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Last Name</label>
          {editing || creating ? (
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="mt-1 text-gray-100">{profile?.lastName || "Not set"}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <p className="mt-1 text-gray-100">{profile?.email || "Not set"}</p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Phone Number</label>
          {editing || creating ? (
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="+12345678901"
            />
          ) : (
            <p className="mt-1 text-gray-100">{profile?.phoneNumber || "Not set"}</p>
          )}
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Birthday</label>
          {editing || creating ? (
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ) : (
            <p className="mt-1 text-gray-100">{profile?.birthday || "Not set"}</p>
          )}
        </div>

        {/* Created At */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Created At</label>
          <p className="mt-1 text-gray-100">{new Date(profile?.created_at || "").toLocaleString()}</p>
        </div>

        {/* Updated At */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Updated At</label>
          <p className="mt-1 text-gray-100">{new Date(profile?.updated_at || "").toLocaleString()}</p>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-700">
        {creating ? (
          <button
            onClick={handleCreate}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow"
          >
            Create Profile
          </button>
        ) : editing ? (
          <button
            onClick={handleUpdate}
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
        {!creating && (
          <button
            onClick={handleDelete}
            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow"
          >
            Delete Profile
          </button>
        )}
        <Logout
          styles={`
            bg-red-500 text-white text-center
            px-4 py-2 w-1/4
            font-semibold text-sm 
            rounded-full border-1 border-red-500
            cursor-pointer
            hover:bg-red-600 hover:text-white
          `}
        />
      </div>
    </main>
  );
};


export default Page;