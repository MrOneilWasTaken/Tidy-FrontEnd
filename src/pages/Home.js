import { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Login from "../components/Login";
import Logout from "../components/Logout";
//import SaveTasks from "../components/SaveTasks.js";
// import Signup from "../components/Signup(DECIPRICATED)";

export default function Home() {

  



  const [dayID, setDayID] = useState(0);
  const [show, setShow] = useState(false);

  //const [user, setUser] = useState(0)

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([])

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const checkUser = () =>{
    console.log("DB CHECKED");

  }

  const onNewTaskChange = useCallback((e) => {
    setNewTask(e.target.value)
  },[])

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
        userid : localStorage.getItem('userID'),
        content: newTask.trim(),
        done: false
      }
    ])

    setNewTask('')

    SaveTasks()
  }
  
  },[tasks,newTask,dayID])

  const onTaskChecked = useCallback((task,index) => (e) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1,{
      ...task,
      done: !task.done
    })
    setTasks(newTasks)
  },[tasks])


  const removeTask = useCallback((task) => (e) => {
    setTasks(tasks.filter(otherTask => otherTask !== task))
  },[tasks])

  useEffect(() => {
    console.log('tasks', tasks);
  }, [tasks])

  useEffect(() => {
    checkUser()
  }, []);

 

  const handleClick = (e) =>{
    handleShow();
    setDayID(e.target.id);
  }

  // Button Code for Save Tasks
  // const SaveTasks = (e) => {
  //   console.log(tasks);
  //   e.preventDefault();

  //   let userToken = "Bearer "
  //   userToken = userToken + localStorage.getItem('myLoginToken')

  //   console.log(userToken);


  //   // const task = {
  //   //   userID: localStorage.getItem('userID'),
  //   //   dayID: 2,
  //   //   content: "Doing stuff",
  //   //   done: false
  //   // }

  //   const uploadTaskURL = "http://localhost:3001/api/addtask"
  //   const headers = new Headers()
  //   headers.append("authorization", `${userToken}`)
  //   headers.append("Content-Type", "application/json")

    
    
  //   // const formData = new FormData()
  //   // formData.append('tasksArray', )

  //   fetch(uploadTaskURL, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(tasks),
  //   }).then((res) => {
  //     if (res.status === 200){
  //       return res.json({Message: "Success"})
  //     }else{
  //       throw Error(res.statusText)
  //     }
  //   }).then((data) => {
  //     console.log(data);
  //   }).catch((err) => {
  //     console.log("An error has occured: ", err);
  //   })
    

  // }

  let username = localStorage.getItem('username')

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

        
        <header>
          <h1>Tidy</h1>
          <h1>Hi {username}</h1>
          <Logout/>
        </header>
        
        
        {/* <img src={ require('./images/image1.jpg') } /> */}
  
        <div>
          <div className="dayTitle">
            <h2>Monday</h2>
            <Button id = "1" variant="primary" onClick={handleClick}>+</Button>
          </div>                   
          <ul>
            {tasks.filter(task => task.dayid === '1').map((task, index) => (
              <li key={task.id} className={task.done ? 'doneLI' : 'undoneLI'}>
                <button onClick={onTaskChecked(task,index)}>Check</button>

                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tuesday List */}
        <div>
          <div className="dayTitle">
            <h2>Tuesday</h2>
            <Button id = "2" variant="primary" onClick={handleClick}>+</Button>
          </div> 
          <ul>
            {tasks.filter(task => task.dayid === '2').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : 'undoneLI'}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Wednesday List */}
        <div>
          <div className="dayTitle">
            <h2>Wednesday</h2>
            <Button id = "3" variant="primary" onClick={handleClick}>+</Button>
          </div>  
          <ul>
            {tasks.filter(task => task.dayid === '3').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : 'undoneLI'}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Thursday List */}
        <div>
          <div className="dayTitle">
            <h2>Thursday</h2>
            <Button id = "4" variant="primary" onClick={handleClick}>+</Button>
          </div>
          <ul>
            {tasks.filter(task => task.dayid === '4').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : 'undoneLI'}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Friday List */}
        <div>
          <div className="dayTitle">
            <h2>Friday</h2>
            <Button id = "5" variant="primary" onClick={handleClick}>+</Button>
          </div>
          <ul>
            {tasks.filter(task => task.dayid === '5').map((task) => (
              <li key={task.id} className={task.done ? 'doneLI' : 'undoneLI'}>
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
                <button onClick={removeTask(task)}>Remove Task</button>
              </li>
            ))}
          </ul>
        </div>  
        <div>
          <Button onClick={SaveTasks}>Save</Button>
        </div>    
      </>
      )
  }else{
    return(
      <>
        <h1>Welcome to Tidy</h1>
        <h2>Please log in or create and account</h2>
        
        <Login/>
        {/* <Signup/> */}
        
        {/* <img src={ require('./images/image1.jpg') } /> */}
      </>
    )
  }
  
}
