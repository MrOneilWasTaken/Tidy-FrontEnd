import { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Signup from "../components/Signup";

export default function Home() {

  const [dayID, setDayID] = useState(0);
  const [show, setShow] = useState(false);

  //const [auth, setAuth] = useState(false)

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([])

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkDB = () =>{
    console.log("DB CHECKED");
  }

  const onNewTaskChange = useCallback((e) => {
    setNewTask(e.target.value)
    console.log("E Target Value: ", e.target.value);
    console.log("New Task: ", newTask);
  },[newTask])

  const formSubmitted = useCallback((e) => {
    if(newTask === ""){
      alert("Please input something")
    }else{

    handleClose();

    e.preventDefault();

    if (!newTask.trim())return;

    console.log("Form Submitted");

    setTasks([
      ...tasks,
      {
        taskid: tasks.length + 1,
        dayid: dayID, 
        // userid : userID,
        content: newTask.trim(),
        done: false
      }
    ])

    setNewTask('')
  }
  
  },[tasks,newTask,dayID])

  // const onTaskChecked = useCallback((task,index) => (e) => {
  //   const newTasks = [...tasks]
  //   newTasks.splice(index, 1,{
  //     ...task,
  //     done: !task.done
  //   })
  //   setTasks(newTasks)
  // },[tasks])

  const removeTask = useCallback((task) => (e) => {
    setTasks(tasks.filter(otherTask => otherTask !== task))
  },[tasks])

  useEffect(() => {
    checkDB()
    console.log('tasks', tasks);
  }, [tasks])

 

  const handleClick = (e) =>{
    handleShow();
    console.log(e.target.id);
    setDayID(e.target.id);
  }

  if (localStorage.getItem('myLoginToken')){
    return (
      <>
        <Modal show={show} onHide={handleClose}>
  
          <Modal.Header closeButton>  
            <Modal.Title>Add a task</Modal.Title>
          </Modal.Header>
  
          <form>
          <Modal.Body>
              <input
                id="newTask"
                name="newTask"
                value={newTask}
                onChange={onNewTaskChange}
                className='input-search'
              />
          </Modal.Body>
  
          <Modal.Footer>
  
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={formSubmitted}> Submit New Task </Button>
  
          </Modal.Footer>
          </form>
  
        </Modal>
  
        <h1>Hi User</h1>
        
        <Logout/>
        
        {/* <img src={ require('./images/image1.jpg') } /> */}
        <h3>----------------------</h3>
        <p>This is an app that allows you to order your time and be rewarded for it</p>
  
        <div>
          <h2>Monday</h2>
  
          <Button id = "1" variant="primary" onClick={handleClick}>+</Button>
        
          <ul>
            {tasks.filter(task => task.dayid === '1').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : ''}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          <h2>Tuesday</h2>
  
          <Button id = "2" variant="primary" onClick={handleClick}>+</Button>
  
          <ul>
            {tasks.filter(task => task.dayid === '2').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : ''}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          <h2>Wednesday</h2>
  
          <Button id = "3" variant="primary" onClick={handleClick}>+</Button>
  
          <ul>
            {tasks.filter(task => task.dayid === '3').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : ''}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          <h2>Thursday</h2>
  
          <Button id = "4" variant="primary" onClick={handleClick}>+</Button>
  
          <ul>
            {tasks.filter(task => task.dayid === '4').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : ''}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          <h2>Friday</h2>
  
          <Button id = "5" variant="primary" onClick={handleClick}>+</Button>
  
          <ul>
            {tasks.filter(task => task.dayid === '5').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : ''}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>      
      </>
      )
  }else{
    return(
      <>
        <h1>You gotta log in pal</h1>
        
        <Login/>
        <Signup/>
        
        {/* <img src={ require('./images/image1.jpg') } /> */}
        <h3>----------------------</h3>
        <p>This is an app that allows you to order your time and be rewarded for it</p>
      </>
    )
  }
  
}
