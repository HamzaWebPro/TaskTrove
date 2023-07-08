import React, { useEffect, useState } from "react";
import Navs from "../components/Navs";
import { useSelector } from "react-redux";
import { BsChevronDoubleDown, BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlineDownloadDone,
  MdOutlineEditNote,
  MdDeleteOutline,
  MdOutlineKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdRefresh,
} from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const data = useSelector((state) => state);
  const [showIndex, setShowIndex] = useState(null);
  const [taskData, setTaskData] = useState({
    title: "",
    task: "",
  });
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");

  const handleDropShow = (index) => {
    setShowIndex(index === showIndex ? null : index);
    setEdit(false);
    setTaskData({
      title: "",
      task: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
      taskby: data.userData.userInfo._id,
    }));
  };

  const handleTaskSubmit = () => {
    if (!taskData.title || !taskData.task) {
      toast.error("Task title and description are required.");
      return;
    }

    // Send task data to the backend API
    axios
      .post("http://localhost:3000/task/addTask", taskData)
      .then((response) => {
        location.reload();
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success(response.data.message);
          setTaskData({
            title: "",
            task: "",
          });
        }
      })
      .catch((error) => {
        toast.error("Error adding task.");
      });
  };

  useEffect(() => {
    // Fetch tasks based on the user ID from Redux
    axios
      .post("http://localhost:3000/task/getTasks", {
        taskby: data.userData.userInfo._id,
      })
      .then((response) => {
        setTasks(response.data);
        console.log(tasks);
      })
      .catch((error) => {
        toast.error("Error retrieving tasks.");
      });
  }, []);

  // scroll
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // task box edit icon
  let [editIndex, setEditIndex] = useState("");
  const handleEdit = async (task, index) => {
    setEdit(true);
    setEditIndex(index);
    console.log(editIndex);
    await setEditId(task._id);
    setTaskData({
      title: task.title,
      task: task.task,
    });
  };

  // insert task ediyt button
  let handleUpdate = async () => {
    // Send task data to the backend API
    axios
      .post("http://localhost:3000/task/editTasks", {
        ...taskData,
        taskId: editId,
      })
      .then((response) => {
        setEdit(false);
        setTimeout(() => {
          location.reload();
        }, 3000);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success(response.data.message);
          setTaskData({
            title: "",
            task: "",
          });
        }
        console.log(data.userData.userInfo._id, editIndex);
        axios
          .post("http://localhost:3000/task/updateTaskIndex", {
            userId: data.userData.userInfo._id,
            lastIndex: editIndex + 1,
          })
          .then((response) => {
            console.log("okk");
            setEdit(false);
            setTimeout(() => {}, 3000);
            if (response.data.error) {
              toast.error(response.data.error);
            } else {
              toast.success(response.data.message);
              setEditIndex("");
            }
          })
          .catch((error) => {
            toast.error("Error adding task.");
          });
      })
      .catch((error) => {
        toast.error("Error adding task.");
      });
  };

  // delete Task
  let deleteTask = (deleteId) => {
    axios
      .post("http://localhost:3000/task/deleteTask", {
        taskId: deleteId,
      })
      .then((response) => {
        setEdit(false);
        setTimeout(() => {
          location.reload();
        }, 3000);
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          toast.success(response.data.message);
          setTaskData({
            title: "",
            task: "",
          });
        }
      })
      .catch((error) => {
        toast.error("Error adding task.");
      });
  };
  // scroll tob button
  const [showScrollButton, setShowScrollButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // complete task functionality
  let completeTask = (completeId) => {
    // Send a POST request to the backend API to complete the task
    axios
      .post("http://localhost:3000/task/completeTask", {
        taskId: completeId,
      })
      .then((response) => {
        setTimeout(() => {
          location.reload();
        }, 3000);
        if (response.data.error) {
          toast(response.data.error);
        } else {
          toast(response.data.message);
          // Task marked as completed successfully
        }
      })
      .catch((error) => {
        console.log("Error completing task.");
      });
  };

  // uncompleteTask task
  let uncompleteTask = (uncompletedId) => {
    // Send a POST request to the backend API to complete the task
    axios
      .post("http://localhost:3000/task/unCompleteTask", {
        taskId: uncompletedId,
      })
      .then((response) => {
        setTimeout(() => {
          location.reload();
        }, 3000);
        if (response.data.error) {
          toast(response.data.error);
        } else {
          toast(response.data.message);
          // Task marked as completed successfully
        }
      })
      .catch((error) => {
        console.log("Error completing task.");
      });
  };

  // get all completed data
  let [completeTasks, setCompleteTasks] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/task/getCompletedTask")
      .then((response) => {
        const completedTasks = response.data;
        // Handle the completed tasks data as needed
        setCompleteTasks(completedTasks);
      })
      .catch((error) => {
        console.log("Error fetching completed tasks.");
      });
  }, []);

  // get last index

  const [lastIndex, setLastIndex] = useState(0);
  const userId = data.userData.userInfo._id; // Replace with your actual user ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/task/getlastindex",
          { userId }
        );

        if (response.data.lastIndex) {
          setLastIndex(response.data.lastIndex);
        } else {
          // Handle case when last index is not found
          console.log("Last index not found.");
        }
      } catch (error) {
        // Handle error
        console.log("Error fetching last index.");
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <Navs />

      <div className="flex flex-col-reverse gap-y-5 flrx  md:flex-row  gap-x-5 py-4 mt-14 ">
        {/* top button start */}
        {showScrollButton && (
          <button
            className="fixed bottom-[40px] text-[25px] z-10 right-[40px] bg-colorprimary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-bounce"
            onClick={handleScrollToTop}
          >
            {/* Add your desired back-to-top icon here */}
            <MdOutlineKeyboardDoubleArrowUp />
          </button>
        )}
        {/* top button end */}
        {/* profile info */}
        <div className="w-full md:w-[30%] h-[300px] order-0 flex gap-x-5 p-4 glass-bg rounded-2xl">
          <div className="w-[40%]  h-[100%] rounded-2xl ">
            <img
              src="https://i.postimg.cc/dtgCXGbq/Hamza-photo.jpg"
              className="w-full glass-bg p-1 h-auto rounded-2xl"
              alt=""
            />
          </div>
          <div className="!font-rale  text-white">
            <h5 className="!m-0 !p-0">{data.userData.userInfo.name} </h5>
            <small className="text-[12px] !m-0 !p-0">
              {data.userData.userInfo.profession}{" "}
            </small>
            <br />
            <small className="text-[10px] text-colorprimary font-semibold">
              {data.userData.userInfo.email}{" "}
            </small>
            <div className="text-[14px]">
            <div className="mt-3">
              <small className="font-semibold">
                Total Tasks - {tasks.length}
              </small>{" "}
            </div>
            <div className="mt-1">
              <small className="font-semibold">
                Completed Tasks - {completeTasks.length}
              </small>{" "}
            </div>
            <div className="mt-1">
              <small className="font-semibold">
                Incomplete Tasks -{" "}
                {Math.abs(completeTasks.length - tasks.length)}
              </small>{" "}
            </div>
            <div className="mt-1">
              <small className="font-semibold">
              Last Edited Tasks - {lastIndex}
              </small>{" "}
            </div>
            </div>

          </div>
        </div>
        {/* Task items */}
        <div className="w-full md:w-[40%] flex order-1  md:order-2 relative flex-col-reverse gap-y-5   rounded-2xl p-2">
          {/* Task item boxes */}
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div
                key={index}
                className="glass-bg rounded-2xl p-3 flex flex-col gap-y-3"
              >
                <h6 className="font-bold m-0 p-0 flex justify-between items-center relative">
                  {index + 1}. {task.title}
                  <BsThreeDotsVertical
                    onClick={() => handleDropShow(index)}
                    className="text-[18px] mt-1 hover:text-colorprimary"
                  />
                  {showIndex === index && (
                    <div className="absolute w-[40px] flex top-0 flex-col gap-y-[5px] p-[5px] bg-white rounded-full right-4">
                      {task.isComplete ? (
                        <div
                          onClick={() => uncompleteTask(task._id)}
                          className="text-[20px] w-[30px] h-[30px] shadow-md text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full hover:bg-white hover:!text-colorprimary"
                        >
                          <MdRefresh />
                        </div>
                      ) : (
                        <div
                          onClick={() => completeTask(task._id)}
                          className="text-[20px] w-[30px] h-[30px] shadow-md text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full hover:bg-white hover:!text-colorprimary"
                        >
                          <MdOutlineDoneAll />
                        </div>
                      )}

                      <div className="text-[20px] w-[30px] h-[30px] shadow-md text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full hover:bg-white hover:!text-colorprimary">
                        <MdOutlineEditNote
                          onClick={() => {
                            handleScrollToTop();
                            handleEdit(task, index);
                          }}
                        />
                      </div>

                      <div
                        onClick={() => deleteTask(task._id)}
                        className="text-[20px] w-[30px] h-[30px] shadow-md text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full hover:bg-white hover:!text-colorprimary"
                      >
                        <MdDeleteOutline />
                      </div>
                    </div>
                  )}
                </h6>
                <small>{task.task}</small>
                <small className="text-[12px] text-[#ffffff7d]">
                  {task.created}{" "}
                  <span
                    className={`${
                      task.isComplete ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {task.isComplete
                      ? "Task completed"
                      : "Task is not completed yet"}
                  </span>
                </small>
              </div>
            ))
          ) : (
            <h5 className="absolute top-0">Start Adding Your Task.</h5>
          )}
        </div>
        {/* todo box */}
        <div className="w-full md:w-[30%] order-2 md:order-1  flex flex-col gap-y-5 rounded-2xl">
          <div className="glass-bg rounded-2xl p-4 flex flex-col gap-y-5">
            {edit ? (
              <h5 className="flex items-center m-0 p-0 gap-x-2">
                Edit your task No. {editIndex + 1}
              </h5>
            ) : (
              <h5 className="flex items-center m-0 p-0 gap-x-2">
                Insert your task here{" "}
                <BsChevronDoubleDown className="animate-bounce mt-1" />
              </h5>
            )}
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleInputChange}
              placeholder="Task Title..."
              className="glass-bg w-full py-[5px] pl-[20px] md:py-[8px] border-none !font-rale outline-none rounded-[100px] text-white !pr-[60px]"
            />
            <div className="relative">
              <input
                type="text"
                name="task"
                value={taskData.task}
                onChange={handleInputChange}
                placeholder="Your Task..."
                className="glass-bg w-full !py-[15px] pl-[20px] !md:py-[30px] border-none !font-rale outline-none rounded-[100px] text-white !pr-[60px]"
              />
              {/* insert button */}
              {edit ? (
                <div
                  className="text-[25px] w-[45px] h-[45px] absolute text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full top-[50%] translate-y-[-50%] right-[5px] hover:bg-white hover:!text-colorprimary"
                  onClick={handleUpdate}
                >
                  <MdOutlineEditNote />
                </div>
              ) : (
                <div
                  className="text-[25px] w-[45px] h-[45px] absolute text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full top-[50%] translate-y-[-50%] right-[5px] hover:bg-white hover:!text-colorprimary"
                  onClick={handleTaskSubmit}
                >
                  <MdOutlineDownloadDone />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
