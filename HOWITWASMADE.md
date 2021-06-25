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
    setTaskIntro(event.target.value);
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

  
