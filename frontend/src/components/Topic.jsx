import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import { dataContext } from "../contexts/DataContext.jsx";
import { getError, capitalizeWords } from "../fuction.js";

import { MdDeleteForever } from "react-icons/md";

const Topic = () => {
  const [formTopic, setFormTopic] = useState({ name: "" });
  const { state, dispatch } = useContext(dataContext);
  const { topic } = state;

  //👇 function handle
  const handleChange = (e) => {
    setFormTopic({
      ...formTopic,
      [e.target.name]: capitalizeWords(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/v1/api/topic", formTopic);
      const topics = await axios.get("http://localhost:3001/v1/api/topic");
      dispatch({ type: "SET_TOPICS", payload: topics.data });
      setFormTopic({ name: "" });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/v1/api/topic/${id}`);
      const topics = await axios.get("http://localhost:3001/v1/api/topic");
      dispatch({ type: "SET_TOPICS", payload: topics.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3">
        <label htmlFor="nameTopic" className="font-medium text-sm text-gray-700">
          Name Topic:
        </label>
        <input type="text" name="name" id="nameTopic" onChange={handleChange} value={formTopic.name} className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <button type="submit" className="cursor-pointer bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-2">
          Submit
        </button>
      </form>

      <ul className="mt-6">
        {topic.map((item) => (
          <li key={item._id} className="mb-10 flex justify-between">
            <h3 className="font-semibold text-2xl">{item.name}</h3>
            <button onClick={() => handleDelete(item._id)} className="cursor-pointer text-3xl">
              <MdDeleteForever />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Topic;
