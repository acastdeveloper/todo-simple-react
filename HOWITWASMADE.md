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

9. I was Thinking about forms in React. Is not like in Javascript. 
   
   In Javascript we usually use variables assigning them the value of the input text doing something like this: 
   `let v=document.getElementById("whatever").value`. 
   
   But in React getting values from a form requires working in a different way.  When put ***value*** as usual we did in order to get the value by our JavaScript as follows...

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

It says that if we put a property ***value*** without an ***onChange*** handler:

- This will render a read-only field. We can't write on it. 

- It recommends to use defaultValue instead if it's going to be "mutable". 

But if we want that React controls our form it's recommended tu use onChange in orther to get in real time the state of this value. This implies that also we must define state. 

Thinking in all of these arguments this is how code should go on by the moment:

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
  I've created a function, that I've called "***settingTask***"  in order to capture the event of "changing the value of the input" as it follows: 
  `const settingTask = (e) => { /* LOOK HERE 3 */
   setTaskIntro(e.target.value);
   };`
  

- ***LOOK HERE 4***
  Now It can be able to write ***value={taskIntro}*** (that links with ***LOOK HERE 2***) and by other hand ***onChange={settingTask}*** that it calls to the function we've created on ***LOOK HERE 3***
  

***It's imperative we do this 4 things in order to capture the value of an input field in React. *** 
