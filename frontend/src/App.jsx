import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";

import { MdDeleteForever } from "react-icons/md";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/v1/api");
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resPostData = await axios.post("http://localhost:3001/v1/api", formData);
      toast.success(resPostData.data.message);

      setFormData({
        name: "",
        message: "",
      });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      const resDeleteData = await axios.delete(`http://localhost:3001/v1/api/${id}`);
      toast.success(resDeleteData.data.message);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="max-w-xl mx-auto pt-20 px-6">
      <h1 className="text-4xl text-center font-bold mb-8">Public Message Board</h1>
      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-sm text-gray-700">
              Name:
            </label>
            <input type="text" value={formData.name} onChange={handleChange} name="name" id="name" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-medium text-sm text-gray-700">
              Message:
            </label>
            <textarea name="message" value={formData.message} onChange={handleChange} id="message" rows="5" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
          </div>

          <button type="submit" className="cursor-pointer bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2">
            Submit
          </button>
        </form>

        <ul className="mt-6">
          {data.map((d) => (
            <li key={d._id} className="mb-10 grid grid-cols-[1fr_auto] grid-rows-[auto_1fr]">
              <h3 className="font-semibold text-2xl">{d.name}</h3>
              <p className="text-base/relaxed whitespace-pre-wrap row-[2/3]">{d.message}</p>
              <button onClick={() => handleDelete(d._id)} className="cursor-pointer">
                <MdDeleteForever className="text-3xl" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <Toaster position="bottom-center" />
    </main>
  );
};

export default App;
