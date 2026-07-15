import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Camera, Edit } from "lucide-react";

const Profile = () => {
  const { user, setUser, axios } = useContext(AppContext);

  const [edit, setEdit] = useState(false);

  const [preview, setPreview] = useState(user?.profilePhoto || "");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    birthday: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        gender: user.gender || "",
        birthday: user.birthday || "",
        address: user.address || "",
      });

      setPreview(user.profilePhoto);
    }
  }, [user]);

  const changeHandler = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    const { data } = await axios.put("/api/auth/profile", form);

    if (data.success) {
      toast.success(data.message);

      setUser(data.user);

      setEdit(false);
    }
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();

    formData.append("photo", file);

    const { data } = await axios.post("/api/auth/profile-photo", formData);

    if (data.success) {
      setUser(data.user);

      toast.success("Photo updated");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] py-14">
      <div className=" max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10 ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>

          <button
            onClick={() => setEdit(true)}
            className=" flex gap-2 text-orange-500 font-semibold cursor-pointer "
          >
            <Edit size={18} />
            Edit Profile
          </button>
        </div>

        <div className="flex justify-center my-8">
          <div className="relative">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className=" w-36 h-36 rounded-full object-cover border-4 border-orange-300 "
            />

            {edit && (
              <label className=" absolute bottom-2 right-2 bg-orange-500 text-white p-2 rounded-full cursor-pointer ">
                <Camera size={18} />

                <input hidden type="file" onChange={uploadPhoto} />
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Input
            label="Name"
            name="name"
            value={form.name}
            edit={edit}
            change={changeHandler}
          />

          <div>
            <label>Email</label>

            <p className="border p-3 rounded-xl mt-2">{user?.email}</p>
          </div>

          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            edit={edit}
            change={changeHandler}
          />

          <Input
            label="Birthday"
            name="birthday"
            value={form.birthday}
            edit={edit}
            change={changeHandler}
          />

          <Input
            label="Gender"
            name="gender"
            value={form.gender}
            edit={edit}
            change={changeHandler}
          />

          <Input
            label="Address"
            name="address"
            value={form.address}
            edit={edit}
            change={changeHandler}
          />
        </div>

        <p className="mt-6 text-gray-500">
          Member Since : {new Date(user?.createdAt).toLocaleDateString()}
        </p>

        {edit && (
          <div className="flex gap-5 mt-8">
            <button
              onClick={saveProfile}
              className=" flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold "
            >
              Save Changes
            </button>

            <button
              onClick={() => setEdit(false)}
              className=" flex-1 border py-3 rounded-xl "
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Input = ({ label, name, value, edit, change }) => {
  return (
    <div>
      <label>{label}</label>

      {edit ? (
        <input
          name={name}
          value={value}
          onChange={change}
          className=" w-full border p-3 rounded-xl mt-2 "
        />
      ) : (
        <p className=" border p-3 rounded-xl mt-2 bg-gray-50 ">
          {value || "Not added"}
        </p>
      )}
    </div>
  );
};

export default Profile;
