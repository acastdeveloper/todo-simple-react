import React, { Fragment, useState } from "react";

const TasksForm = () => {
  const [taskIntro, setTaskIntro] = useState("");

  const settingTask = (e) => {
    setTaskIntro(e.target.value);
    console.log(taskIntro);
  };

  return (
    <Fragment>
      <form>
        <span>Add task: </span>
        <input type="text" value={taskIntro} onChange={settingTask} />
        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default TasksForm;
