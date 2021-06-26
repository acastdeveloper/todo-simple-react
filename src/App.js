import React, { Fragment, useState } from "react";

import TasksForm from "./components/TasksForm";

import TasksLister from "./components/TasksLister";

import "./assets/css/style.css";

const App = () => {
  const [listTasks, setListTasks] = useState([]);

  const newTask = (task) => {
    setListTasks([task, ...listTasks]);
  };

  return (
    <Fragment>
      <div className="container-fluid header-task bg-dark text-light">
      <TasksForm passTask={newTask} />
      </div>

      <div className="container">
      {
        listTasks.map((el,index) => (
        <TasksLister passTask={el} key={index} />
      ))
      }
      </div>

    </Fragment>
  );
};

export default App;
