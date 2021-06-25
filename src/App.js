import React, { Fragment, useState } from "react";

import TasksForm from "./components/TasksForm";

const App = () => {
  const [listTasks, setListTasks] = useState([]);
  console.log(listTasks);

  const newTask = (task) => {
    setListTasks([task, ...listTasks]);
  };

  return (
    <Fragment>
      <TasksForm
        passTask={newTask}
      />
    </Fragment>
  );
};

export default App;
