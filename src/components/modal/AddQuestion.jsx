import React, { useState } from "react";
import { addQuestion } from "../../services/question.service";
import { Input, message, Modal, Button } from "antd";

const AddQuestion = ({ setQuestionData }) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState({
    question: "",
    correct_answer: "",
    wrong_answer_1: "",
    wrong_answer_2: "",
    wrong_answer_3: "",
    questionID: "",
  });

  const handleAddQuestion = async () => {
    try {
      const response = await addQuestion(question);
      if (response.status === 201) {
        message.success(response.message || "Question added successfully.");
        setOpen(false);
        setQuestion({
          question: "",
          correct_answer: "",
          wrong_answer_1: "",
          wrong_answer_2: "",
          wrong_answer_3: "",
          questionID: "",
        });

        setQuestionData((prevData) => [
          ...prevData,
          {
            index: prevData.length + 1,
            ...question,
          },
        ]);
      } else {
        message.error(response.error || "Failed to add question.");
      }
    } catch (error) {
      message.error("An error occurred while adding the question.");
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
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
          Add Question
        </Button>
      </div>
      <Modal
        title="Add New Question"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="flex flex-col gap-4 my-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="question" className="font-serif text-lg pl-1">
              Question
            </label>
            <Input
              id="question"
              name="question"
              value={question.question} // Bind value to the state
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="correct_answer" className="font-serif text-lg pl-1">
              Correct Answer
            </label>
            <Input
              id="correct_answer"
              name="correct_answer"
              value={question.correct_answer} // Bind value to the state
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="wrong_answer_1" className="font-serif text-lg pl-1">
              First Wrong Answer
            </label>
            <Input
              id="wrong_answer_1"
              name="wrong_answer_1"
              value={question.wrong_answer_1} // Bind value to the state
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="wrong_answer_2" className="font-serif text-lg pl-1">
              Second Wrong Answer
            </label>
            <Input
              id="wrong_answer_2"
              name="wrong_answer_2"
              value={question.wrong_answer_2} // Bind value to the state
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="wrong_answer_3" className="font-serif text-lg pl-1">
              Third Wrong Answer
            </label>
            <Input
              id="wrong_answer_3"
              name="wrong_answer_3"
              value={question.wrong_answer_3} // Bind value to the state
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-6">
          <Button type="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
            onClick={handleAddQuestion}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddQuestion;
