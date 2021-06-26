# HOW IT WAS MADE

> To my me from the future. 

## Preliminary doings.

1. I've created a react app. (`yarn create react-app tudutudu` on *terminal*).

2. I've created folder **components**  inside **src** where will be placed all components that I'm going to create to be able to add functionallities to our app.

3. in order to manage tasks (addition, edition and deleting tasks) I create a component TasksForm.js on /src/components/

4. I've created a git branch called ***dev*** in order to separete our work from production: 
   `git checkout -b dev` on terminal.

5. From ***dev*** I've created a branch ***form-addition-tasks*** to develope this functionallity: 
   `git checkout -b form-addition-tasks` on terminal.

6. Once inside this branch I create a simple **form** with nostyles. I commit "*Basic HTML Form in order to add tasks*"). Code looks as it follows by the moment:

##### /src/components/Tasksform.js

```jsx
import React, { Fragment } from "react";

const TasksForm = () => {
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

export default TasksForm;
```

7. I execute`yarn start` in terminal to be able to see in browser how the app does in live. 

8. I import and I use component **TasksForm.js** in **App.js** to connect them as it follows:

```jsx
import React, { Fragment } from "react";

import TasksForm from "./components/TasksForm"; /* LOOK HERE */

const App = () => {
  return (
    <Fragment>
      <TasksForm></TasksForm> {/* LOOK HERE */}
    </Fragment>
  );
};

export default App;
```

In browser we can see something like this, by the moment:

![](N:\ESCRIPTORI\TODO\TODO-RE-ON-MEDIA\tudutudu\HOWITWASMADE\addTaskCapture01.jpg)

## Getting what user writes in the Tasksform input field

### Introduction

9. I was Thinking about forms in React. Is not like in Javascript. In Javascript we usually use variables assigning them the value of the input text doing something like this: 
   `let v=document.getElementById("whatever").value`.  But ***in react every input must be controlled by an state***. When we put atribute ***value*** as usual we have done in ordinary html/javascript ...

```jsx
 return (
    <Fragment>
      <form>
        <span>Add task: </span>
        <input type="text" value=""/>
        <button>Add</button>
      </form>
    </Fragment>
  );
```

... browser send us this **<mark>Warning</mark>**. 

![](N:\ESCRIPTORI\TODO\TODO-RE-ON-MEDIA\tudutudu\HOWITWASMADE\addTaskCapture02.jpg)

> *Warning: You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
>     at input*

It says that if we've put a property ***value*** without an ***onChange*** handler:

- This will render a read-only field. We can't write on it. 

- It recommends to use defaultValue instead if it's going to be "mutable". 

But if we want that React controls our form it's recommended tu use onChange in orther to get in real time the state of this value. This implies that also we must define an state. 

<mark>In other words: ***In react every input must be controlled by an <u>state</u>***</mark>

### How to control an input by an state with React in order to get and handle its value

##### */src/components/TasksForm.js*

```jsx
import React, { Fragment, useState } from "react"; /* LOOK HERE 1 */

const TasksForm = () => {
  const [taskIntro, setTaskIntro] = useState("");  /* LOOK HERE 2 */

  const settingTask = (e) => { /* LOOK HERE 3 */
    setTaskIntro(e.target.value);
  };

  return (
    <Fragment>
      <form>
        <span>Add task: </span>
        <input type="text" value={taskIntro} onChange={settingTask} />
        {/* LOOK HERE 4 */}
        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default TasksForm;
```

What have I done

- ***LOOK HERE 1***
  I have imported **useState** library because this form require control changes of state in real time. ("It must react").
  `import React, { Fragment, useState } from "react";`

- ***LOOK HERE 2***
  I have defined the state of the variable that is going to vary, as the user writes, which is the value of the input. I called this variable **taskIntro**. Therefore the code to define the state is:
  `const [taskIntro, setTaskIntro] = useState("");`

- ***LOOK HERE 3***
  I've created a function, that I've called "***settingTask***"  in order to capture the event and update the "changing value of the input" as it follows: 
  `const settingTask = (e) => { /* LOOK HERE 3 */
   setTaskIntro(e.target.value);
   };`

- ***LOOK HERE 4***
  Now It can be able to write ***value={taskIntro}*** (that links with ***LOOK HERE 2***) and by other hand ***onChange={settingTask}*** that it calls to the function we've created on ***LOOK HERE 3***
  `<input type="text" value={taskIntro} onChange={settingTask} />`

#### RESUME

***It's imperative we do all this 4 things in order to capture the value of an input field in React. ***

---

## Defining the listing tasks function on App.js

10. Now we need to create a function that list all the tasks that user writes in the component ***TaksForm***. 
    
    We  locate this function in ***App.js***. 
    
    Why?
    
    Because we work with phylosophy of modularize what every component does (one component - one purpose) in order to do components more reusable and versatile.
    
    But by other hand **App.js** is the main component(by default) in React and its purpose is to controll what children components does. 
    
    *[In Java we would call it "the controller" and its name would be "Main.class". in react this controller is called, by default, **App.js** (but we can change its name if we want).]* 
    
    ---
    
    After these considerations code on App.js will be as it follows:
    
    ##### /src/App.js

```jsx
import React, { Fragment, useState } from "react"; /* LOOK HERE 1 */

import TasksForm from "./components/TasksForm";

const App = () => {
  const [listTasks, setListTasks] = useState([]); /* LOOK HERE 2 */

  const newTask = (task) => {                    /* LOOK HERE 3 */
    setListTasks([task, ...listTasks]);
  };

  return (
    <Fragment>
      <TasksForm
        passTask={newTask}                      {/* LOOK HERE 4 */}          
      />
    </Fragment>
  );
};

export default App;
```

#### Explanation of what have I done:

- <mark>LOOK HERE 1</mark>: I import  **useState** hook in order to be "reactive" to changes. What changes? The produced changes everytime that a task is added to the ***listTasks***, that we declare on LOOK HERE 2.
  `import React, { Fragment, useState } from "react";`

- <mark>LOOK HERE 2</mark>: I declare the ***variable of state***, that I call ***listTasks***, and I define the initial state as an array by writing []. Why? To be able to add every update that user does on a list. We are not capturing in this *variable of state* a singular value but a collection, a list, of values. Therefore the more convenient way for the purpose of list values is by mean an array.
  `const [listTasks, setListTasks] = useState([]);`

- <mark>LOOK HERE 3</mark>: I create a function (I've called it ***newTask***) to update every task user adds on the variable of state ***listTasks***. 
  `const newTask = (task) => { /* LOOK HERE 3 */
   setListTasks([task, ...listTasks]);
   };`

- <mark>LOOK HERE 4</mark>: What does it means `passTask={newTask}`? sendTask is a **prop** that it's sent from the component ***TasksForm*** that calls to the function ***newTask*** that I've declared on *LOOK HERE 3*. 

## Connecting TasksForm.js with App.js, by mean props, in order to pass tasks.

> ***Props are the way to communicate depending components.***

11. In previous step, on LOOK HERE 4, I've prepared a **prop** to be able to receive what user writes in ***TasksForm.js*** component in order to be used by the controller component **App.js**. 
    
    But we also need "to build the bridge" from the other side. In other words, we need to declare Props, and send them by mean a function, in the component **TasksForm.js**. How? As it follows:

##### /src/TasksForm.js

```jsx
import React, { Fragment, useState } from "react";

const TasksForm = (props) => { /* LOOK HERE 1 */
  const [taskIntro, setTaskIntro] = useState([]);

  const settingTask = (e) => {
    setTaskIntro(e.target.value);
  };

  const submitTask = (event) => {
    event.preventDefault();
    props.passTask(taskIntro); /* LOOK HERE 2 */
    setTaskIntro(""); /* LOOK HERE 3 */
  };

  return (
    <Fragment>
      <form onSubmit={submitTask}>
        <span>Add task: </span>
        <input type="text" value={taskIntro} onInput={settingTask} />
        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default TasksForm;
```

#### EXPLANATION OF WHAT HAVE I DONE

- <mark>LOOK HERE 1</mark>: Between the rounded brackets of the component I've writed **props** in order to declare that I'm going to use **props**. 
  `const TasksForm = (props) => { `...

- <mark>LOOK HERE 2</mark>: I declare the prop **passTask**, that is waited on controller component **App.js** (Remember 10. LOOK HERE 4 ), and I put as parameter the variable of state **taskIntro** in order to pass what user writes.
  `props.passTask(taskIntro);` 

- <mark>LOOK HERE 3</mark>: I reset variable of state **taskIntro**, by mean code: 
  `setTaskIntro("");`
  And as we see Input text it's empty again.

## Avoiding submit empty field "taskIntro"

12. I want to avoid to submit an empty **taskIntro**. Therefore we are doing a little of validation on submitTask function on TasksForm.js as it follows:

```jsx
const submitTask = (event) => {
    event.preventDefault();
    if (taskIntro.trim()!=="") {
      props.passTask(taskIntro);
      setTaskIntro("");
    }
  };
```

I use a conditional that only let send the prop passTask to the function **submitTask** only in the case that taskIntro is not empty. 

## Giving feedback to the user if validation fails.

13. We should warn the user if field **taskIntro** is empty in case user tries to submit form, accidentaly or not, by clicking on button "Add".
    
    In order to do that the strategy I follow consists in create another variable of state that says if field is empty or not. I call it "***emptyTaskIntro***". Therefore I declare this variable of state as it follows: 
    `const [emptyTaskIntro, setEmptyTaskIntro] = useState(true);` 
    
    Finally code of **TasksForm.js** looks so:

```jsx
import React, { Fragment, useState } from "react";

const TasksForm = (props) => {
  const [taskIntro, setTaskIntro] = useState([]);
  const [emptyTaskIntro, setEmptyTaskIntro] = useState(true); /* LOOK HERE 1 */
  const [counter, setCounter] = useState(0); /* LOOK HERE 2 */

  const settingTask = (e) => {
    setTaskIntro(e.target.value);
  };

  const submitTask = (event) => {
    event.preventDefault();
    if (taskIntro.toString().trim() !== "") { /* LOOK HERE 3 */
      setEmptyTaskIntro(false); /* LOOK HERE 4 */
      props.passTask(taskIntro.toString().trim()); /* LOOK HERE 5 */
      setTaskIntro("");
    } else {
      setEmptyTaskIntro(true); /* LOOK HERE 6 */
    }
    setCounter(counter + 1); /* LOOK HERE 7 */
  };

  return (
    <Fragment>
      <form onSubmit={submitTask}>
        <span>Add task: </span>
        <input type="text" value={taskIntro} onInput={settingTask} />
        <button>Add</button>
        <br />
        {emptyTaskIntro === true && counter > 0 && (
          <span> Add a task, please</span>
        )}
        {/* LOOK HERE 8 */}

      </form>
    </Fragment>
  );
};

export default TasksForm;
```

#### WHAT HAVE I DONE

- <mark>LOOK HERE 1</mark>: In order to control when **taskIntro** is empty or not we declare variable of state **emptyTaskIntro** as it follows:
  `const [emptyTaskIntro, setEmptyTaskIntro] = useState(true);`
  being its initial state empty, that's why we use default value as the boolean **true**.

- <mark>LOOK HERE 3</mark>: I have had to redefine the conditional adding `toString()` because React warned me that trim was not recognizable. That is because for some reason the Javascript interpreter doesn't know what kind of variable is **taskIntro** and trim() only runs with strings. That's why I've added toString(), to ensure there is not problem. 

- <mark>LOOK HERE 4</mark>: Once we know that **taskIntro** is not empty we set **emptyTaskIntro** to false. That means that is not empty.

- <mark>LOOK HERE 5</mark>: I have refactorized the prop statement to:
  `props.passTask(taskIntro.toString().trim());`
  because I want to ensure that the task I send in this prop is a String(***toString()***) without inicial or final empty spaces(***trim()***). 

- <mark>LOOK HERE 6</mark>: We set **emptyTaskIntro**, *variable of state*, because it detects that it's empty field **taskIntro**.

- <mark>LOOK HERE 2</mark>: I've added another *variable of state*, **counter**, in order to know if form has been already submitted or not. By default counter is setted to zero that means that never has been submited before. Why? The answer is in **LOOK HERE 8**
  `const [counter, setCounter] = useState(0);` 

- <mark>LOOK HERE 7</mark>: Every time that user activates the **submitTask()** function, the variable of state **counter** will be setted increasing 1 (counter+1). 

- <mark>LOOK HERE 8</mark>: In return statement, with the help of a *ternary operator*, we do a conditional rendering with the code:

```jsx
{emptyTaskIntro === true && counter > 0 && (
          <span> Add a task, please.</span>
        )}
```

**What does it mean this code**? Translation to English: "If **taskIntro** is empty and it's not the first time that user had clicked on the submit button **Add** `<span>Add a task, please.</span>`" 

## LISTING TASKS

14. Now I want to show all the tasks that user has submitted. For this purpose I create **TaskLister.js** in ***/src/components/TaskLister.js*** with this code, by the moment:

##### /src/components/TaskLister.js

```jsx
import React, { Fragment} from 'react'

const TasksLister = (props) => { /* LOOK HERE 1 */
    return (
        <Fragment>
            <div>
            <span>{props.passTask}</span> - <span>Edit</span> <span>Delete</span>
            </div>
            { /* LOOK HERE 2*/}
        </Fragment>
    )
}

export default TasksLister;
```

##### WHAT HAVE I DONE?

- <mark>LOOK HERE 1</mark>: I've prepared this component to receive a prop from the controller **App.js** ...

- <mark>LOOK HERE 2</mark>: ... that will be rendered between these span tags: 
  `{props.passTask}`

But, we have not finished yet. We need to do the other side of the bridge. We go to the controller component, **App.js** and we place this code: 

```jsx
{ listTasks.map(el=><TasksLister passTask={el} key={el} />) }
```

###### /src/App.js

```jsx
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
        <TasksLister passTask={el} key={el} /> {/* LOOK HERE */}
      ))}
    </Fragment>
  );
};

export default App;
```

##### WHAT HAVE I DONE?

- I take the *variable of state* **listTasks** that, remember, it's an array.

- And I apply the **map** methode to iterate every element (***el***) of the ***listTasks*** array in order to render a component **TasksLister** for every element (***el***). 

- To every TaskLister component i pass a prop, that I've called **passTask** with the element (***el***) as a value in order to render it in the **TasksLister.js** in its**<mark>LOOKS HERE 2</mark>**.

- By other hand in React when we generate a list(an array in this case) of virtual elements, by mean a map methode, React send us **wargings** that says that every element of this virtual list must have a key. That's why I've used `key={el}`.
