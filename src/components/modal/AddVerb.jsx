import { Input, Modal, message } from "antd";
import React, { useState } from "react";
import { addVerb, getAllVerbs } from "../../services/phrasal.service";
import { Button } from "antd";

const AddVerb = ({ setVerbData }) => {
  const [open, setOpen] = useState(false);
  const [verb, setVerb] = useState("");
  const [description, setDescription] = useState(""); 

  const handleAddVerb = async () => {
    try {
      const response = await addVerb({ verb, description });
      if (response.status === 201) {
        message.success(response.message || "Verb added successfully."); 
        setOpen(false); 
        setVerb(""); 
        setDescription("");

        getAllVerbs().then((data) => {
          const datas = data.map((verb, index) => ({
            index: index + 1,
            verb: verb.verb,
            description: verb.description,
            verbID: verb.verbID,
          }));
          setVerbData(datas); 
        });
      } else {
        message.error(response.error || "Failed to add verb."); 
      }
    } catch (error) {
      message.error("An error occurred while adding the verb.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center mb-1">
        <Button
          className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Verb
        </Button>
      </div>

      <Modal
        title="Add New Verb"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="flex flex-col gap-4 my-6">
          {/* Verb input field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="verb" className="font-serif text-lg pl-1">
              Verb
            </label>
            <Input
              id="verb"
              name="verb"
              value={verb}
              onChange={(e) => setVerb(e.target.value)}
              required
            />
          </div>

          {/* Description input field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-serif text-lg pl-1">
              Description
            </label>
            <Input
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Modal footer buttons */}
        <div className="flex justify-end gap-6">
          <Button type="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
            onClick={handleAddVerb}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddVerb;
