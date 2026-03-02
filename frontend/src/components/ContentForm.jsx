import React, { useState } from "react";
import axios from "axios";

const ContentForm = ({ setOutput, setLoading }) => {
  const [formData, setFormData] = useState({
    topic: "",
    platform: "LinkedIn",
    tone: "Professional",
    content_type: "Product Launch",
    length: "Medium",
  });
  const generate_url = import.meta.env.VITE_GENERATE_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        generate_url,
        formData,
      );

      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error generating content.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="topic"
        placeholder="Enter Content Topic"
        value={formData.topic}
        onChange={handleChange}
        required
      />
      
      <select name="platform" onChange={handleChange}>
        <option>LinkedIn</option>
        <option>Instagram</option>
        <option>Twitter</option>
      </select>

      <select name="tone" onChange={handleChange}>
        <option>Professional</option>
        <option>Casual</option>
        <option>Motivational</option>
        <option>Promotional</option>
        <option>Funny</option>
      </select>

      <select name="content_type" onChange={handleChange}>
        <option>Product Launch</option>
        <option>Personal Update</option>
        <option>Educational</option>
        <option>Announcement</option>
      </select>

      <select name="length" onChange={handleChange}>
        <option>Short</option>
        <option>Medium</option>
        <option>Long</option>
      </select>

      <button type="submit">Generate Content</button>
    </form>
  );
};

export default ContentForm;
