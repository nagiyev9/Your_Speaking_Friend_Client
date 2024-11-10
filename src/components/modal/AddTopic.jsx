import { Input, message, Modal } from "antd";
import React, { useState } from "react";
import { Button } from "react-scroll";
import { addTopic } from "../../services/topic.service";

const AddTopic = ({ setTopicData }) => {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState({
    topic: "",
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    topicID: "",
  });

  const handleAddTopic = async () => {
    try {
      const response = await addTopic({ topic, ...topic });
      if (response.status === 201) {
        message.success(response.message || "Topic added successfully.");
        setOpen(false);
        setTopic({
          topic: "",
          question_1: "",
          question_2: "",
          question_3: "",
          question_4: "",
          question_5: "",
          topicID: "",
        });
        setTopicData((prevData) => [
          ...prevData,
          {
            index: prevData.length + 1,
            ...topic,
          },
        ]);
      } else {
        message.error(response.error || "Failed to add topic.");
      }
    } catch (error) {
      message.error("An error occurred while adding the topic.");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTopic((prevTopic) => ({
      ...prevTopic,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex items-center mb-1">
        <Button
          className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
          onClick={() => setOpen(true)}
        >
          Add Topic
        </Button>
      </div>
      <Modal
        title="Add New Topic"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="flex flex-col gap-4 my-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="topic" className="font-serif text-lg pl-1">
              Topic Name
            </label>
            <Input
              id="topic"
              name="topic"
              value={topic.topic} // Bind value to the state
              onChange={handleInputChange}
              required
            />
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label
                htmlFor={`question_${index + 1}`}
                className="font-serif text-lg pl-1"
              >
                Question {index + 1}
              </label>
              <Input
                id={`question_${index + 1}`}
                name={`question_${index + 1}`}
                value={topic[`question_${index + 1}`]} // Bind value to the state
                onChange={handleInputChange}
                required
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-6">
          <Button type="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
            onClick={handleAddTopic}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddTopic;
