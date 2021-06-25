import React, { Fragment, useState } from "react";

const TasksForm = (props) => {
  const [taskIntro, setTaskIntro] = useState([]);
  const [emptyTaskIntro, setEmptyTaskIntro] = useState(true);
  const [counter, setCounter] = useState(0);

  const settingTask = (e) => {
    setTaskIntro(e.target.value);
  };

  const submitTask = (event) => {
    event.preventDefault();
    if (taskIntro.toString().trim() !== "") {
      setEmptyTaskIntro(false);
      props.passTask(taskIntro.toString().trim());
      setTaskIntro("");
    } else {
      setEmptyTaskIntro(true);
    }
    setCounter(counter + 1);
  };

  return (
    <Fragment>
      <form onSubmit={submitTask}>
        <span>Add task: </span>
        <input type="text" value={taskIntro} onInput={settingTask} />
        <button>Add</button>
        <br />
        {emptyTaskIntro === true && counter > 0 && (
          <span> Add a task, please.</span>
        )}
      </form>
    </Fragment>
  );
};

export default TasksForm;
