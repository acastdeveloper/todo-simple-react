import React, { Fragment} from 'react'

const TasksLister = (props) => {
    return (
        <Fragment>
            <div>
            <span>{props.passTask}</span> - <span>Edit</span> <span>Delete</span>
            </div>
        </Fragment>
    )
}

export default TasksLister;
