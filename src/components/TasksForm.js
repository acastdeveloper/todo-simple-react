import React, { Fragment } from "react";

const tasksForm = () => {
  return (
    <Fragment>
      <form>
        <span>Add task</span>
        <input type="text" />
        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default tasksForm;
