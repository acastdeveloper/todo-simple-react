import React, { Fragment, useState } from "react";

import TasksForm from "./components/TasksForm";

import TasksLister from "./components/TasksLister";

const App = () => {
  const [listTasks, setListTasks] = useState([]);

  const newTask = (task) => {
    setListTasks([task, ...listTasks]);
  };

  return (
    <Fragment>
      <TasksForm passTask={newTask} />
      {listTasks.map((el) => (
        <TasksLister passTask={el} key={el} />
      ))}
    </Fragment>
  );
};

export default App;
