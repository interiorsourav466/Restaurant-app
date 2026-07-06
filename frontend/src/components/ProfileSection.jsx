import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ProfileSection = ({ user, onSave }) => {
  const { axios, setUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const initials = (user?.name?.[0] || user?.email?.[0] || "A").toUpperCase();

  const handleSave = async () => {
    try {
      const res = await axios.put("/api/auth/profile", form);
      if (res.data?.success) {
        toast.success("Profile updated");
        // Refresh user from backend
        const prof = await axios.get("/api/auth/profile");
        if (prof.data?.role) {
          setUser(prof.data);
        }
        setOpen(false);
        onSave?.(form);
      } else {
        toast.error(res.data?.message || "Failed to update profile");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  const handlePhotoChange = async (file) => {
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const res = await axios.post("/api/auth/profile-photo", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        toast.success("Profile photo updated");
        const prof = await axios.get("/api/auth/profile");
        setUser(prof.data);
      } else {
        toast.error(res.data?.message || "Failed to update photo");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {user?.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-semibold text-gray-700">{initials}</span>
          )}
        </div>

        <div className="flex-1">
          <div className="text-lg font-semibold text-gray-900">
            {user?.role === "admin" ? "Admin" : "User"} Profile
          </div>
          <div className="text-sm text-gray-600">{user?.name || ""}</div>
          <div className="text-sm text-gray-600">{user?.email || ""}</div>
        </div>

        <button
          className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium"
          onClick={() => setOpen((v) => !v)}
        >
          Edit
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-700 font-medium">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) handlePhotoChange(e.target.files[0]);
              }}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              New Password (optional)
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium"
              onClick={() => {
                setForm({
                  name: user?.name || "",
                  email: user?.email || "",
                  password: "",
                });
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;


