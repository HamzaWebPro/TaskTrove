import React, { useEffect, useState } from "react";
import Navs from "../components/Navs";
import { useSelector } from "react-redux";
import { BsChevronDoubleDown, BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlineDownloadDone,
  MdOutlineEditNote,
  MdDeleteOutline,
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

  const handleDropShow = (index) => {
    setShowIndex(index === showIndex ? null : index);
  };
  console.log(data.userData.userInfo._id);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
      taskby: data.userData.userInfo._id
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
        console.error(error);
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
        console.log("tasks", tasks);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error retrieving tasks.");
      });
  }, [tasks]);

// scroll

 


  return (
    <>
      <Navs />
      <div className="flex flex-col gap-y-5 md:flex-row gap-x-5 py-4">
        {/* profile info */}
        <div className="w-full md:w-[30%] h-[300px] flex gap-x-5 p-4 glass-bg rounded-2xl">
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
          </div>
        </div>
        {/* Task items */}
        <div className="w-full md:w-[40%] flex flex-col-reverse gap-y-5 h-[500px] overflow-y-scroll rounded-2xl p-2">
          {/* Task item boxes */}
          {tasks.map((task, index) => (
            <div
              key={index}
              className="glass-bg rounded-2xl p-3 flex flex-col gap-y-3"
            >
              <h6 className="font-bold m-0 p-0 flex justify-between items-center relative">
                {task.title}
                <BsThreeDotsVertical
                  onClick={() => handleDropShow(index)}
                  className="text-[18px] mt-1 hover:text-colorprimary"
                />
                {showIndex === index && (
                  <div className="absolute w-[40px] flex top-0 flex-col gap-y-[5px] p-[5px] bg-white rounded-full right-4">
                    <div className="text-[20px] w-[30px] h-[30px] shadow-md text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full hover:bg-white hover:!text-colorprimary">
                      <MdOutlineEditNote />
                    </div>
                    <div className="text-[20px] w-[30px] h-[30px] shadow-md text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full hover:bg-white hover:!text-colorprimary">
                      <MdDeleteOutline />
                    </div>
                  </div>
                )}
              </h6>
              <small>{task.task}</small>
              <small className="text-[12px] text-[#ffffff7d]">
             { task.created}
              </small>
            </div>
          ))}
        </div>
        {/* todo box */}
        <div className="w-full md:w-[30%] flex flex-col gap-y-5 rounded-2xl">
          <div className="glass-bg rounded-2xl p-4 flex flex-col gap-y-5">
            <h5 className="flex items-center m-0 p-0 gap-x-2">
              Insert your task here{" "}
              <BsChevronDoubleDown className="animate-bounce mt-1" />
            </h5>
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
              <div
                className="text-[25px] w-[45px] h-[45px] absolute text-white bg-colorprimary duration-300 flex justify-center items-center rounded-full top-[50%] translate-y-[-50%] right-[5px] hover:bg-white hover:!text-colorprimary"
                onClick={handleTaskSubmit}
              >
                <MdOutlineDownloadDone />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
