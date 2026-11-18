import { useState, useContext } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";

import { dataContext } from "../contexts/DataProvider";

import { MdDeleteForever } from "react-icons/md";

const getErrorMessage = (error) => {
  const message = error.response?.data?.message ?? error.message ?? "An unexpected error occurred";
  return Array.isArray(message) ? message.join(", ") : message;
};

const Message = () => {
  const [formMessage, setFormMessage] = useState({ name: "", message: "", topic: "" });
  const { state, dispatch } = useContext(dataContext);
  const { message, topic } = state;

  const handleChange = (e) => {
    setFormMessage({
      ...formMessage,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/v1/api/message", formMessage);
      const messages = await axios.get("http://localhost:3001/v1/api/message");
      dispatch({ type: "SET_MESSAGES", payload: messages.data });
      setFormMessage({ name: "", message: "", topic: "" });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/v1/api/message/${id}`);
      const messages = await axios.get("http://localhost:3001/v1/api/message");
      dispatch({ type: "SET_MESSAGES", payload: messages.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-sm text-gray-700">
              Name:
            </label>
            <input type="text" value={formMessage.name} onChange={handleChange} name="name" id="name" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          {/* message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-medium text-sm text-gray-700">
              Message:
            </label>
            <textarea name="message" value={formMessage.message} onChange={handleChange} id="message" rows="5" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
          </div>
          {/* topic */}
          <div className="flex gap-3 items-center">
            <label htmlFor="topic" className="font-medium text-sm text-gray-700">
              Topic:
            </label>
            <select name="topic" id="topic" value={formMessage.topic} onChange={handleChange} className="font-medium text-sm text-gray-700 capitalize border border-gray-300 rounded-lg px-3 py-2" required>
              <option value="" hidden>
                Select Topic
              </option>
              {topic.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="cursor-pointer bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2">
            Submit
          </button>
        </form>

        <ul className="mt-6">
          {message.map((item) => (
            <li key={item._id} className="mb-10 grid grid-cols-[1fr_auto] grid-rows-[auto_1fr]">
              <h3 className="font-semibold text-2xl">{item.name}</h3>
              <p className="text-base/relaxed whitespace-pre-wrap row-[2/3]">{item.message}</p>
              <button type="button" onClick={() => handleDelete(item._id)} className="cursor-pointer">
                <MdDeleteForever className="text-3xl" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Message;
