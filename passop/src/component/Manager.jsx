import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {
    const newPassword = { ...form, id: uuidv4() };
    const updatedPasswords = [...passwordArray, newPassword];

    setpasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

    setform({ site: "", username: "", password: "" });

    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    let c = confirm("Do you want to delete this password?");
    if (c) {
      setpasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
      toast("Password deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} pauseOnHover draggable theme="dark" />

      <div className="relative min-h-screen flex flex-col items-center px-4">
        <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#a3e635_100%)]"></div>

        {/* Header */}
        <div className="text-black text-3xl font-bold text-center mt-6">
          <span>
            <span className="text-green-500">&lt;</span>Pass
          </span>
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <div className="text-center text-lg text-gray-700">Your Own Password Manager</div>

        {/* Form */}
        <div className="w-full max-w-lg mt-5 bg-white p-5 rounded-lg shadow-md">
          <input
            value={form.site}
            onChange={handleChange}
            className="border border-green-600 w-full p-2 rounded-lg mb-4"
            type="text"
            placeholder="Enter Website URL"
            name="site"
          />

          {/* Responsive Inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              className="border border-green-600 p-3 w-full rounded-lg"
              type="text"
              placeholder="Enter username"
              name="username"
            />
            <input
              value={form.password}
              onChange={handleChange}
              className="border border-green-600 p-3 w-full rounded-lg"
              type="password"
              placeholder="Enter Password"
              name="password"
            />
          </div>

          <button onClick={savePassword} className="w-full mt-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-400">
            Add Password
          </button>
        </div>

        {/* Password List */}
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-center font-bold text-2xl pb-4">Your Passwords</h2>

          {passwordArray.length === 0 ? (
            <div className="text-center text-gray-600">No passwords to show</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto border w-full min-w-[600px] border-green-600">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="py-2 px-4">Site</th>
                    <th className="py-2 px-4">Username</th>
                    <th className="py-2 px-4">Password</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, key) => {
                    return (
                      <tr key={key}>
                        <td className="py-2 text-center w-32 px-5 gap-2">
                          <div className="flex justify-center gap-x-4">
                            <a
                              href={item.site}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.site}
                            </a>
                            <img
                              className="w-5 cursor-pointer"
                              src="copy-solid.svg"
                              alt="copy"
                              onClick={() => copyToClipboard(item.site)}
                            />
                          </div>
                        </td>

                        <td className="py-2 text-center w-32  gap-2">
                          <div className="flex justify-center gap-x-4">
                            {item.username}
                            <img
                              className="w-5 cursor-pointer"
                              src="copy-solid.svg"
                              alt="copy"
                              onClick={() => copyToClipboard(item.username)}
                            />
                          </div>
                        </td>

                        <td className="py-2 text-center w-32  gap-2">
                          <div className="flex justify-center gap-x-4">
                            {item.password}
                            <img
                              className="w-5 cursor-pointer"
                              src="copy-solid.svg"
                              alt="copy"
                              onClick={() => copyToClipboard(item.password)}
                            />
                          </div>
                        </td>
                        <td className="py-2 text-center w-32 gap-2 ">
                          <div className="flex justify-center">
                            <div
                              className="cursor-pointer "
                              onClick={() => {
                                editPassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingRight: "45px",
                                }}
                              ></lord-icon>
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                deletePassword(item.id);
                              }}
                            >
                              <lord-icon
                                src="https://cdn.lordicon.com/hwjcdycb.json"
                                trigger="hover"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingRight: "45px",
                                }}
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;