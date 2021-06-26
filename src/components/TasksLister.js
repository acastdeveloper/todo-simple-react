import React, { Fragment} from 'react'

const TasksLister = (props) => {
    return (
        <Fragment>
            <div className="taskItem">
            <div className="taskTitle">{props.passTask}</div>  <span><button>Edit</button> <button>Delete</button></span>
            </div>
        </Fragment>
    )
}

export default TasksLister;
