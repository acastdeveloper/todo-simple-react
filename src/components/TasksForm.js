import React, { Fragment, useState } from "react";

const TasksForm = (props) => {
  const [taskIntro, setTaskIntro] = useState([]);

  const settingTask = (e) => {
    setTaskIntro(e.target.value);
    console.log(taskIntro);
  };

  const submitTask = (event) => {
    setTaskIntro(event.target.value);
    event.preventDefault();
    props.passTask(taskIntro);
    setTaskIntro("");
  };

  return (
    <Fragment>
      <form  onSubmit={submitTask}>
        <span>Add task: </span>
        <input type="text" value={taskIntro} onInput={settingTask} />
        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default TasksForm;
