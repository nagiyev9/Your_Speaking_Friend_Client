import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Table from "../components/table/Table";
import { changeAccountRole, getAllAccounts } from "../services/auth.service";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Input, message, Modal, Popconfirm, Select, Spin, Tooltip } from "antd";
import {
  banUser,
  changeRole,
  getAllUsers,
  refreshUserUnbanDate,
  unbanUser,
} from "../services/user.service";
import {
  editTopic,
  getAllTopics,
  removeTopic,
} from "../services/topic.service";
import {
  editQuestion,
  getAllQuestions,
  removeQuestion,
} from "../services/question.service";
import { editVerb, getAllVerbs, removeVerb } from "../services/phrasal.service";
import { Button } from "react-scroll";
import AddVerb from "../components/modal/AddVerb";
import AddQuestion from "../components/modal/AddQuestion";
import AddTopic from "../components/modal/AddTopic";
import { Option } from "@material-tailwind/react";
import Search from "antd/es/transfer/search";
import { changeStaus, deleteForm, getAllForms } from "../services/form.service";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("accounts");
  const [searchTerm, setSearchTerm] = useState("");
  const [accountsData, setAccountsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [verbData, setVerbData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [verbToEdit, setVerbToEdit] = useState({
    verb: "",
    description: "",
    verbID: "",
  });
  const [questionToEdit, setQuestionToEdit] = useState({
    question: "",
    correct_answer: "",
    wrong_answer_1: "",
    wrong_answer_2: "",
    wrong_answer_3: "",
    questionID: "",
  });
  const [topicToEdit, setTopicToEdit] = useState({
    topic: "",
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    topicID: "",
  });
  const [accountToEdit, setAccountToEdit] = useState({
    role: "",
  });
  const [userToEdit, setUserToEdit] = useState({
    role: "",
    userID: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getAllAccounts().then((data) => {
      const datas = data.data.map((account, index) => ({
        index: index + 1,
        id: account.id,
        name: account.name,
        surname: account.surname,
        email: account.email,
        role: account.role,
        infoID: account.infoID,
      }));
      setAccountsData(datas);
    });
  }, []);

  useEffect(() => {
    getAllUsers().then((data) => {
      const datas = data.map((user, index) => ({
        index: index + 1,
        userID: user.userID,
        username: user.username ? user.username : "Unknown",
        name: user.first_name ? user.first_name : "Unknown",
        surname: user.last_name ? user.last_name : "Unknown",
        banned: user.banned ? "Banned" : "Active",
        role: user.role,
        englishLevel: user.english_level,
        last_unban_date:
          user.banned === false
            ? new Date(user.last_unban_date).toISOString().slice(0, 10)
            : "N/A",
      }));
      setUserData(datas);
    });
  }, []);

  useEffect(() => {
    getAllTopics().then((data) => {
      const datas = data.map((topic, index) => ({
        index: index + 1,
        topic: topic.topic,
        question_1: topic.question_1,
        question_2: topic.question_2,
        question_3: topic.question_3,
        question_4: topic.question_4,
        question_5: topic.question_5,
        topicID: topic.topicID,
      }));
      setTopicData(datas);
    });
  }, []);

  useEffect(() => {
    getAllQuestions().then((data) => {
      const datas = data.map((question, index) => ({
        index: index + 1,
        question: question.question,
        correct_answer: question.correct_answer,
        wrong_answer_1: question.wrong_answer_1,
        wrong_answer_2: question.wrong_answer_2,
        wrong_answer_3: question.wrong_answer_3,
        questionID: question.questionID,
      }));

      setQuestionData(datas);
    });
  }, []);

  useEffect(() => {
    getAllVerbs().then((data) => {
      const datas = data.map((verb, index) => ({
        index: index + 1,
        verb: verb.verb,
        description: verb.description,
        verbID: verb.verbID,
      }));

      setVerbData(datas);
    });
  }, []);

  useEffect(() => {
    getAllForms().then((data) => {
      const datas = data.map((form, index) => {
        const date = new Date(form.sendDate);
        const formattedDate = `${String(date.getDate()).padStart(
          2,
          "0"
        )}-${date.toLocaleString("en", {
          month: "short",
        })}-${date.getFullYear()} ${String(date.getHours()).padStart(
          2,
          "0"
        )}:${String(date.getMinutes()).padStart(2, "0")}:${String(
          date.getSeconds()
        ).padStart(2, "0")}`;

        return {
          index: index + 1,
          id: form.id,
          name: form.name,
          surname: form.surname,
          email: form.email,
          message: form.message,
          status: form.isRead === true ? "Viewed" : "Pending",
          send_date: formattedDate,
        };
      });
      setFormData(datas);
    });
  }, []);

  const handleVerbEdit = () => {
    editVerb(verbToEdit.verbID, verbToEdit).then((data) => {
      if (data.status === 200) {
        message.success(data.message || "Verb was successfully edited!");

        getAllVerbs().then((updatedData) => {
          const datas = updatedData.map((verb, index) => ({
            index: index + 1,
            verb: verb.verb,
            description: verb.description,
            verbID: verb.verbID,
          }));
          setVerbData(datas);
        });
      } else {
        message.error(data.error || "Something went wrong!");
      }
      setOpen(false);
    });
  };

  const handleQuestionEdit = () => {
    editQuestion(questionToEdit.questionID, questionToEdit)
      .then((data) => {
        if (data.status === 200) {
          message.success(data.message || "Question was successfully edited!");
          getAllQuestions().then((updatedData) => {
            const datas = updatedData.map((question, index) => ({
              index: index + 1,
              question: question.question,
              correct_answer: question.correct_answer,
              wrong_answer_1: question.wrong_answer_1,
              wrong_answer_2: question.wrong_answer_2,
              wrong_answer_3: question.wrong_answer_3,
              questionID: question.questionID,
            }));
            setQuestionData(datas);
            setOpen(false);
          });
        } else {
          message.error(data.error || "Something went wrong!");
        }
      })
      .catch((error) => {
        message.error("An error occurred during the update.");
      });
  };

  const handleTopicEdit = () => {
    editTopic(topicToEdit.topicID, topicToEdit)
      .then((data) => {
        if (data.status === 200) {
          message.success(data.message || "Topic was successfully edited!");
          getAllTopics().then((updatedData) => {
            const datas = updatedData.map((topic, index) => ({
              index: index + 1,
              topic: topic.topic,
              question_1: topic.question_1,
              question_2: topic.question_2,
              question_3: topic.question_3,
              question_4: topic.question_4,
              question_5: topic.question_5,
              topicID: topic.topicID,
            }));
            setTopicData(datas);
            setOpen(false);
          });
        } else {
          message.error(data.error || "Something went wrong!");
        }
      })
      .catch((error) => {
        message.error("An error occurred during the update.");
      });
  };

  const handleAccountEdit = () => {
    changeAccountRole(accountToEdit.infoID, accountToEdit)
      .then((data) => {
        if (data.status === 200) {
          message.success(data.message || "Account was successfully edited!");
          getAllAccounts().then((updatedData) => {
            const datas = updatedData.data.map((account, index) => ({
              index: index + 1,
              name: account.name,
              surname: account.surname,
              email: account.email,
              role: account.role,
              infoID: account.infoID,
            }));
            setAccountsData(datas);
            setOpen(false);
          });
        } else {
          message.error(data.error || "Something went wrong!");
        }
      })
      .catch((error) => {
        message.error("An error occurred during the update.");
      });
  };

  const handleUserEdit = () => {
    changeRole(userToEdit.userID, userToEdit).then((data) => {
      console.log(data);
      if (data.status === 200) {
        message.success(data.message || "User was successfully edited!");
        getAllUsers().then((updatedData) => {
          const datas = updatedData.map((user, index) => ({
            index: index + 1,
            userID: user.userID,
            username: user.username ? user.username : "Unknown",
            name: user.first_name ? user.first_name : "Unknown",
            surname: user.last_name ? user.surname : "Unknown",
            banned: user.banned ? "Banned" : "Active",
            role: user.role,
            englishLevel: user.english_level,
            last_unban_date:
              user.banned === false
                ? new Date(user.last_unban_date).toISOString().slice(0, 10)
                : "N/A",
          }));
          setUserData(datas);
          setOpen(false);
        });
      } else {
        message.error(data.error || "Something went wrong!");
      }
    });
  };

  const handleUnbanUser = (userID) => {
    unbanUser(userID).then((data) => {
      if (data.status === 200) {
        message.success(data.message || "User was successfully unbanned!");
        getAllUsers().then((updatedData) => {
          const datas = updatedData.map((user, index) => ({
            index: index + 1,
            userID: user.userID,
            username: user.username ? user.username : "Unknown",
            name: user.first_name ? user.first_name : "Unknown",
            surname: user.last_name ? user.surname : "Unknown",
            banned: user.banned ? "Banned" : "Active",
            role: user.role,
            englishLevel: user.english_level,
            last_unban_date:
              user.banned === false
                ? new Date(user.last_unban_date).toISOString().slice(0, 10)
                : "N/A",
          }));
          setUserData(datas);
        });
      } else {
        message.error(data.error || "Something went wrong!");
      }
    });
  };

  const handleBanUser = (userID) => {
    banUser(userID).then((data) => {
      if (data.status === 200) {
        message.success(data.message || "User was successfully banned!");
        getAllUsers().then((updatedData) => {
          const datas = updatedData.map((user, index) => ({
            index: index + 1,
            userID: user.userID,
            username: user.username ? user.username : "Unknown",
            name: user.first_name ? user.first_name : "Unknown",
            surname: user.last_name ? user.surname : "Unknown",
            banned: user.banned ? "Banned" : "Active",
            role: user.role,
            englishLevel: user.english_level,
            last_unban_date:
              user.banned === false
                ? new Date(user.last_unban_date).toISOString().slice(0, 10)
                : "N/A",
          }));
          setUserData(datas);
        });
      } else {
        message.error(data.error || "Something went wrong!");
      }
    });
  };

  const getFilteredData = () => {
    const activeData = tabConfig[activeTab].data;

    if (!searchTerm) return activeData;

    return activeData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const accountColumns = [
    { title: "№", dataIndex: "index", key: "index" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Surname", dataIndex: "surname", key: "surname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <Tooltip title="Change Role">
            <UserSwitchOutlined
              className="text-xl hover:text-orange-500 transition-all cursor-pointer"
              onClick={() => {
                setAccountToEdit(record);
                setOpen(true);
              }}
            />

            <Modal
              title={<p>Edit Phrasal Verb</p>}
              visible={open}
              footer={
                <div className="flex justify-end gap-6">
                  <Button type="primary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
                    onClick={() => {
                      handleAccountEdit(record.verbID);
                    }}
                  >
                    Save
                  </Button>
                </div>
              }
              onCancel={() => setOpen(false)}
            >
              <div className="flex flex-col gap-4 my-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="font-serif text-lg pl-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={accountToEdit.name}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="surname" className="font-serif text-lg pl-1">
                    Surname
                  </label>
                  <Input
                    id="surname"
                    name="surname"
                    value={accountToEdit.surname}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="font-serif text-lg pl-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    value={accountToEdit.email}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="role" className="font-serif text-lg pl-1">
                    Role
                  </label>
                  <Select
                    id="role"
                    name="role"
                    value={accountToEdit.role}
                    onChange={(value) =>
                      setAccountToEdit({ ...accountToEdit, role: value })
                    }
                  >
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                </div>
              </div>
            </Modal>
          </Tooltip>
        </div>
      ),
    },
  ];

  const userColumns = [
    { title: "№", dataIndex: "index", key: "index" },
    { title: "User ID", dataIndex: "userID", key: "userID" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "First Name", dataIndex: "name", key: "name" },
    { title: "Last Name", dataIndex: "surname", key: "surname" },
    { title: "Status", dataIndex: "banned", key: "banned" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "English Level", dataIndex: "englishLevel", key: "englishLevel" },
    {
      title: "Last Unban Date",
      dataIndex: "last_unban_date",
      key: "last_unban_date",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          {record.banned === "Banned" ? (
            <Tooltip title={"Unban"}>
              <Popconfirm
                title={`Are you sure to unban ${
                  record.username ? record.username : "User"
                }?`}
                cancelText="Cancel"
                okText="Unban"
                onConfirm={() => {
                  handleUnbanUser(record.userID);
                }}
              >
                <UserAddOutlined className="text-xl hover:text-orange-500 transition-all" />
              </Popconfirm>
            </Tooltip>
          ) : (
            <Tooltip title={"Ban"}>
              <Popconfirm
                title={`Are you sure to ban ${
                  record.username ? record.username : "User"
                }?`}
                cancelText="Cancel"
                okText="Ban"
                onConfirm={() => {
                  handleBanUser(record.userID);
                }}
              >
                <UserDeleteOutlined className="text-xl hover:text-orange-500 transition-all" />
              </Popconfirm>
            </Tooltip>
          )}
          <Tooltip title={"Refresh Unban Date"}>
            <Popconfirm
              title={`Are you sure to refresh ${
                record.username ? record.username : "User"
              } unban date?`}
              cancelText="Cancel"
              okText="Refresh"
              onConfirm={() => {
                refreshUserUnbanDate(record.userID).then((data) => {
                  if (data.status === 200) {
                    message.success(data.message || "Unban date refreshed.");
                    getAllUsers().then((data) => {
                      const datas = data.map((user, index) => ({
                        index: index + 1,
                        userID: user.userID,
                        username: user.username ? user.username : "Unknown",
                        name: user.name ? user.name : "Unknown",
                        surname: user.last_name ? user.last_name : "Unknown",
                        banned: user.banned,
                        role: user.role,
                        englishLevel: user.englishLevel,
                        last_unban_date:
                          user.banned === false
                            ? new Date(user.last_unban_date)
                                .toISOString()
                                .slice(0, 10)
                            : "N/A",
                      }));
                      setUserData(datas);
                    });
                  } else {
                    message.error(data.error || "Something went wrong!");
                  }
                });
              }}
            >
              <ReloadOutlined className="text-xl hover:text-orange-500 transition-all cursor-pointer" />
            </Popconfirm>
          </Tooltip>
          <Tooltip title={"Change Role"}>
            <UserSwitchOutlined
              className="text-xl hover:text-blue-500 transition-all"
              onClick={() => {
                setUserToEdit(record);
                setOpen(true);
              }}
            />

            <Modal
              title={<p>Edit User</p>}
              visible={open}
              footer={
                <div className="flex justify-end gap-6">
                  <Button type="primary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
                    onClick={() => {
                      handleUserEdit();
                    }}
                  >
                    Save
                  </Button>
                </div>
              }
              onCancel={() => setOpen(false)}
            >
              <div className="flex flex-col gap-4 my-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="role" className="font-serif text-lg pl-1">
                    Role
                  </label>
                  <Select
                    id="role"
                    name="role"
                    value={userToEdit.role}
                    onChange={(value) =>
                      setUserToEdit({ ...userToEdit, role: value })
                    }
                  >
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                </div>
              </div>
            </Modal>
          </Tooltip>
        </div>
      ),
    },
  ];

  const topicColumns = [
    { title: "№", dataIndex: "index", key: "index" },
    { title: "Topic", dataIndex: "topic", key: "topic" },
    { title: "First question", dataIndex: "question_1", key: "question_1" },
    { title: "Second question", dataIndex: "question_2", key: "question_2" },
    { title: "Third question", dataIndex: "question_3", key: "question_3" },
    { title: "Fourth question", dataIndex: "question_4", key: "qeustion_4" },
    { title: " Fifth question", dataIndex: "question_5", key: "question_5" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <Tooltip title="Edit">
            <EditOutlined
              className="text-xl hover:text-orange-500 transition-all cursor-pointer"
              onClick={() => {
                setTopicToEdit({
                  topic: record.topic,
                  question_1: record.question_1,
                  question_2: record.question_2,
                  question_3: record.question_3,
                  question_4: record.question_4,
                  question_5: record.question_5,
                  topicID: record.topicID,
                });
                setOpen(true);
              }}
            />
            <Modal
              title={<p>Edit Topic</p>}
              open={open}
              mask={false}
              maskProps={{ style: { backgroundColor: "transparent" } }}
              footer={
                <div className="flex justify-end gap-6">
                  <Button type="primary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
                    onClick={() => handleTopicEdit()}
                  >
                    Save
                  </Button>
                </div>
              }
              onCancel={() => setOpen(false)}
            >
              <div className="flex flex-col gap-4 my-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="topic" className="font-serif text-lg pl-1">
                    Topic Name
                  </label>
                  <Input
                    id="topic"
                    name="topic"
                    onChange={(e) =>
                      setTopicToEdit({
                        ...topicToEdit,
                        topic: e.target.value,
                      })
                    }
                    value={topicToEdit.topic}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="question_1"
                    className="font-serif text-lg pl-1"
                  >
                    First Question
                  </label>
                  <Input
                    id="question_1"
                    name="question_1"
                    onChange={(e) =>
                      setTopicToEdit({
                        ...topicToEdit,
                        question_1: e.target.value,
                      })
                    }
                    value={topicToEdit.question_1}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="question_2"
                    className="font-serif text-lg pl-1"
                  >
                    Second Question
                  </label>
                  <Input
                    id="question_2"
                    name="question_2"
                    onChange={(e) =>
                      setTopicToEdit({
                        ...topicToEdit,
                        question_2: e.target.value,
                      })
                    }
                    value={topicToEdit.question_2}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="question_3"
                    className="font-serif text-lg pl-1"
                  >
                    Third Question
                  </label>
                  <Input
                    id="question_3"
                    name="question_3"
                    onChange={(e) =>
                      setQuestionToEdit({
                        ...questionToEdit,
                        question_3: e.target.value,
                      })
                    }
                    value={topicToEdit.question_3}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="question_4"
                    className="font-serif text-lg pl-1"
                  >
                    Fourth Question
                  </label>
                  <Input
                    id="question_4"
                    name="question_4"
                    onChange={(e) =>
                      setTopicToEdit({
                        ...topicToEdit,
                        question_4: e.target.value,
                      })
                    }
                    value={topicToEdit.question_4}
                    required
                  />
                </div>
              </div>
            </Modal>
          </Tooltip>
          <Tooltip title="Remove">
            <Popconfirm
              title="Are you sure?"
              okText="Remove"
              cancelText="Cancel"
              onCancel={() => {
                message.info("Process was terminated");
              }}
              onConfirm={() => {
                removeTopic(record.topicID).then((data) => {
                  if (data.status === 200) {
                    message.success(
                      data.message || "Topic removed successfully!"
                    );
                    getAllTopics().then((data) => {
                      const datas = data.map((question, index) => ({
                        index: index + 1,
                        topic: question.topic,
                        question_1: question.question_1,
                        question_2: question.question_2,
                        question_3: question.question_3,
                        question_4: question.question_4,
                        question_5: question.question_5,
                        topicID: question.topicID,
                      }));

                      setTopicData(datas);
                    });
                  } else {
                    message.error(
                      message.error || "Failed to remove question."
                    );
                  }
                });
              }}
            >
              <DeleteOutlined className="text-xl hover:text-red-600 transition-all cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const questionColumns = [
    { title: "№", dataIndex: "index", key: "index" },
    { title: "Question", dataIndex: "question", key: "question" },
    {
      title: "Correct Answer",
      dataIndex: "correct_answer",
      key: "correct_answer",
    },
    {
      title: "First Wrong Answer",
      dataIndex: "wrong_answer_1",
      key: "wrong_answer_1",
    },
    {
      title: "Second Wrong Answer",
      dataIndex: "wrong_answer_2",
      key: "wrong_answer_2",
    },
    {
      title: "Third Wrong Answer",
      dataIndex: "wrong_answer_3",
      key: "wrong_answer_3",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <Tooltip title="Edit">
            <EditOutlined
              className="text-xl hover:text-orange-500 transition-all cursor-pointer"
              onClick={() => {
                setQuestionToEdit({
                  question: record.question,
                  correct_answer: record.correct_answer,
                  wrong_answer_1: record.wrong_answer_1,
                  wrong_answer_2: record.wrong_answer_2,
                  wrong_answer_3: record.wrong_answer_3,
                  questionID: record.questionID,
                });
                setOpen(true);
              }}
            />
            <Modal
              title={<p>Edit Question</p>}
              open={open}
              mask={false}
              maskProps={{ style: { backgroundColor: "transparent" } }}
              footer={
                <div className="flex justify-end gap-6">
                  <Button type="primary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
                    onClick={() => handleQuestionEdit()}
                  >
                    Save
                  </Button>
                </div>
              }
              onCancel={() => setOpen(false)}
            >
              <div className="flex flex-col gap-4 my-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="question" className="font-serif text-lg pl-1">
                    Question
                  </label>
                  <Input
                    id="question"
                    name="question"
                    onChange={(e) =>
                      setQuestionToEdit({
                        ...questionToEdit,
                        question: e.target.value,
                      })
                    }
                    value={questionToEdit.question}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="correct_answer"
                    className="font-serif text-lg pl-1"
                  >
                    Correct Answer
                  </label>
                  <Input
                    id="correct_answer"
                    name="correct_answer"
                    onChange={(e) =>
                      setQuestionToEdit({
                        ...questionToEdit,
                        correct_answer: e.target.value,
                      })
                    }
                    value={questionToEdit.correct_answer}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="wrong_answer_1"
                    className="font-serif text-lg pl-1"
                  >
                    First Wrong Answer
                  </label>
                  <Input
                    id="wrong_answer_1"
                    name="wrong_answer_1"
                    onChange={(e) =>
                      setQuestionToEdit({
                        ...questionToEdit,
                        wrong_answer_1: e.target.value,
                      })
                    }
                    value={questionToEdit.wrong_answer_1}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="wrong_answer_2"
                    className="font-serif text-lg pl-1"
                  >
                    Second Wrong Answer
                  </label>
                  <Input
                    id="wrong_answer_2"
                    name="wrong_answer_2"
                    onChange={(e) =>
                      setQuestionToEdit({
                        ...questionToEdit,
                        wrong_answer_2: e.target.value,
                      })
                    }
                    value={questionToEdit.wrong_answer_2}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="wrong_answer_3"
                    className="font-serif text-lg pl-1"
                  >
                    Third Wrong Answer
                  </label>
                  <Input
                    id="wrong_answer_3"
                    name="wrong_answer_3"
                    onChange={(e) =>
                      setQuestionToEdit({
                        ...questionToEdit,
                        wrong_answer_3: e.target.value,
                      })
                    }
                    value={questionToEdit.wrong_answer_3}
                    required
                  />
                </div>
              </div>
            </Modal>
          </Tooltip>
          <Tooltip title="Remove">
            <Popconfirm
              title="Are you sure?"
              okText="Remove"
              cancelText="Cancel"
              onCancel={() => {
                message.info("Process was terminated");
              }}
              onConfirm={() => {
                removeQuestion(record.questionID).then((data) => {
                  if (data.status === 200) {
                    message.success(
                      data.message || "Question removed successfully!"
                    );
                    getAllQuestions().then((data) => {
                      const datas = data.map((question, index) => ({
                        index: index + 1,
                        question: question.question,
                        correct_answer: question.correct_answer,
                        wrong_answer_1: question.wrong_answer_1,
                        wrong_answer_2: question.wrong_answer_2,
                        wrong_answer_3: question.wrong_answer_3,
                        questionID: question.questionID,
                      }));

                      setQuestionData(datas);
                    });
                  } else {
                    message.error(data.error || "Failed to remove question.");
                  }
                });
              }}
            >
              <DeleteOutlined className="text-xl hover:text-red-600 transition-all cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const verbColumns = [
    { title: "№", dataIndex: "index", key: "index" },
    { title: "Verb", dataIndex: "verb", key: "verb" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-4">
          <Tooltip title="Edit">
            <EditOutlined
              className="text-xl hover:text-orange-500 transition-all cursor-pointer"
              onClick={() => {
                setVerbToEdit({
                  verb: record.verb,
                  description: record.description,
                  verbID: record.verbID,
                });
                setOpen(true);
              }}
            />
            <Modal
              title={<p>Edit Phrasal Verb</p>}
              visible={open}
              footer={
                <div className="flex justify-end gap-6">
                  <Button type="primary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-500 text-white font-medium px-5 py-1 border-2 border-blue-500 rounded"
                    onClick={() => {
                      handleVerbEdit(record.verbID);
                    }}
                  >
                    Save
                  </Button>
                </div>
              }
              onCancel={() => setOpen(false)}
              maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <div className="flex flex-col gap-4 my-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="verb" className="font-serif text-lg pl-1">
                    Verb
                  </label>
                  <Input
                    id="verb"
                    name="verb"
                    value={verbToEdit.verb}
                    onChange={(e) =>
                      setVerbToEdit({ ...verbToEdit, verb: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="description"
                    className="font-serif text-lg pl-1"
                  >
                    Description
                  </label>
                  <Input
                    id="description"
                    name="description"
                    value={verbToEdit.description}
                    onChange={(e) =>
                      setVerbToEdit({
                        ...verbToEdit,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </Modal>
          </Tooltip>
          <Tooltip title="Remove">
            <Popconfirm
              title="Are you sure?"
              okText="Remove"
              cancelText="Cancel"
              onCancel={() => {
                message.info("Process was terminated");
              }}
              onConfirm={() => {
                removeVerb(record.verbID).then((data) => {
                  console.log(record.verbID);
                  if (data.status === 200) {
                    message.success(
                      data.message || "Verb removed successfully!"
                    );
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
                    message.error(data.error || "Failed to remove verb.");
                  }
                });
              }}
            >
              <DeleteOutlined className="text-xl hover:text-red-600 transition-all cursor-pointer" />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  const formColumns = [
    { title: "№", dataIndex: "index", key: "index" },
    { title: "Sender name", dataIndex: "name", key: "name" },
    { title: "Sender surname", dataIndex: "surname", key: "surname" },
    { title: "Sender email", dataIndex: "email", key: "email" },
    { title: "Message", dataIndex: "message", key: "message" },
    { title: "Send date", dataIndex: "send_date", key: "send_date" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <div className="flex gap-4">
            <Tooltip title="Remove">
              <Popconfirm
                title="Are you sure?"
                okText="Remove"
                cancelText="Cancel"
                onConfirm={() => {
                  deleteForm(record.id).then((data) => {
                    if (data.status === 200) {
                      message.success(
                        data.message || "Form removed successfully!"
                      );
                      getAllForms().then((data) => {
                        const datas = data.map((form, index) => {
                          const date = new Date(form.sendDate);
                          const formattedDate = `${String(
                            date.getDate()
                          ).padStart(2, "0")}-${date.toLocaleString("en", {
                            month: "short",
                          })}-${date.getFullYear()} ${String(
                            date.getHours()
                          ).padStart(2, "0")}:${String(
                            date.getMinutes()
                          ).padStart(2, "0")}:${String(
                            date.getSeconds()
                          ).padStart(2, "0")}`;

                          return {
                            index: index + 1,
                            id: form.id,
                            name: form.name,
                            surname: form.surname,
                            email: form.email,
                            message: form.message,
                            status: form.isRead === true ? "Viewed" : "Pending",
                            send_date: formattedDate,
                          };
                        });
                        setFormData(datas);
                      });
                    } else {
                      message.error(data.error || "Failed to remove form.");
                    }
                  });
                }}
              >
                <DeleteOutlined className="text-xl hover:text-red-600 transition-all cursor-pointer" />
              </Popconfirm>
            </Tooltip>
            {record.status === "Pending" ? (
              <Tooltip title="Mark as read">
                <Popconfirm
                  title="Are you sure?"
                  okText="Mark as read"
                  cancelText="Cancel"
                  onConfirm={() => {
                    changeStaus(record.id).then((data) => {
                      if (data.status === 200) {
                        message.success(
                          data.message || "Form marked as read successfully!"
                        );
                        getAllForms().then((data) => {
                          const datas = data.map((form, index) => {
                            const date = new Date(form.sendDate);
                            const formattedDate = `${String(
                              date.getDate()
                            ).padStart(2, "0")}-${date.toLocaleString("en", {
                              month: "short",
                            })}-${date.getFullYear()} ${String(
                              date.getHours()
                            ).padStart(2, "0")}:${String(
                              date.getMinutes()
                            ).padStart(2, "0")}:${String(
                              date.getSeconds()
                            ).padStart(2, "0")}`;

                            return {
                              index: index + 1,
                              id: form.id,
                              name: form.name,
                              surname: form.surname,
                              email: form.email,
                              message: form.message,
                              status:
                                form.isRead === true ? "Viewed" : "Pending",
                              send_date: formattedDate,
                            };
                          });
                          setFormData(datas);
                        });
                      } else {
                        message.error(
                          data.error || "Failed to mark form as read."
                        );
                      }
                    });
                  }}
                >
                  <CheckCircleOutlined className="text-xl hover:text-green-500 transition-all cursor-pointer" />
                </Popconfirm>
              </Tooltip>
            ) : (
              <Tooltip title="Mark as pending">
                <Popconfirm
                  title="Are you sure?"
                  okText="Mark as pending"
                  cancelText="Cancel"
                  onConfirm={() => {
                    changeStaus(record.id).then((data) => {
                      if (data.status === 200) {
                        message.success(
                          data.message || "Form marked as pending successfully!"
                        );
                        getAllForms().then((data) => {
                          const datas = data.map((form, index) => {
                            const date = new Date(form.sendDate);
                            const formattedDate = `${String(
                              date.getDate()
                            ).padStart(2, "0")}-${date.toLocaleString("en", {
                              month: "short",
                            })}-${date.getFullYear()} ${String(
                              date.getHours()
                            ).padStart(2, "0")}:${String(
                              date.getMinutes()
                            ).padStart(2, "0")}:${String(
                              date.getSeconds()
                            ).padStart(2, "0")}`;

                            return {
                              index: index + 1,
                              id: form.id,
                              name: form.name,
                              surname: form.surname,
                              email: form.email,
                              message: form.message,
                              status:
                                form.isRead === true ? "Viewed" : "Pending",
                              send_date: formattedDate,
                            };
                          });
                          setFormData(datas);
                        });
                      } else {
                        message.error(
                          data.error || "Failed to mark form as pending."
                        );
                      }
                    });
                  }}
                >
                  <EyeOutlined className="text-xl hover:text-red-500 transition-all cursor-pointer" />
                </Popconfirm>
              </Tooltip>
            )}
          </div>
        </>
      ),
    },
  ];

  const tabConfig = {
    accounts: {
      columns: accountColumns,
      data: accountsData,
      label: "Accounts",
    },
    users: {
      columns: userColumns,
      data: userData,
      label: "Users",
    },
    topics: {
      columns: topicColumns,
      data: topicData,
      label: "Topics",
      button: <AddTopic setTopicData={setTopicData} />,
    },
    questions: {
      columns: questionColumns,
      data: questionData,
      label: "Questions",
      button: <AddQuestion setQuestionData={setQuestionData} />,
    },
    verbs: {
      columns: verbColumns,
      data: verbData,
      label: "Phrasal Verbs",
      button: <AddVerb setVerbData={setVerbData} />,
    },
    forms: {
      columns: formColumns,
      data: formData,
      label: "Forms",
    },
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div
          className="fixed inset-0 bg-white bg-opacity-100 flex justify-center items-center z-50"
          style={{ zIndex: 9999 }}
        >
          <div className="flex flex-col justify-center items-center">
            <Spin spinning={loading} size="large" />
            <span className="mt-4 text-xl font-semibold">Loading...</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`${
          loading ? "pointer-events-none" : ""
        } min-h-screen bg-gray-100`}
      >
        <Header />

        <main className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
            {tabConfig[activeTab].button && (
              <div className="flex items-center mb-1">
                {tabConfig[activeTab].button}
              </div>
            )}
          </div>

          <div className="mb-4 overflow-x-auto whitespace-nowrap flex justify-between flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {Object.keys(tabConfig).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-3 px-4 rounded w-[150px] ${
                    activeTab === key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } transition`}
                >
                  {tabConfig[key].label}
                </button>
              ))}
            </div>

            {/* Search Bar (will move below buttons on small screens) */}
            <div className="flex items-end w-full sm:w-auto sm:sticky sm:top-0 sm:z-10 mt-6 md:mt-4">
              <Search
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table
            columns={tabConfig[activeTab].columns}
            data={getFilteredData()}
            rowKey="id"
          />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
