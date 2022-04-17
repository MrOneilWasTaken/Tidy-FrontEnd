import { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Login from "../components/Login";

export default function Home() {
  const [dayID, setDayID] = useState(0);
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let username = localStorage.getItem('username')

  const onNewTaskChange = useCallback((e) => {
    setNewTask(e.target.value)
  },[])

  const formSubmitted = useCallback((e) => {
    if(newTask === ""){
      alert("Please input something")
    }else{
      if (!newTask.trim())return;
      handleClose();
      e.preventDefault();
      
      const newlyCreatedTask = 
      {
        taskid: 0,
        dayid: dayID, 
        userid : parseInt(localStorage.getItem('userID')),
        content: newTask.trim(),
        done: false
      }
      
      setTasks([...tasks, newlyCreatedTask]);
      setNewTask('');
      
      


      // async function saveAndRecieve(){
      //   const response = await SaveTask(newlyCreatedTask);
      //   const 
      // }



      SaveTask(newlyCreatedTask);
      RecieveTasks()


    }
 
  
  },[tasks,newTask,dayID])

  const onTaskChecked = useCallback((task) => (e) => {
    const newTasks = [...tasks]
    task.done = !task.done
    UpdateTask(task)
    setTasks(newTasks)
  },[tasks])

  

  // const removeTask = useCallback((task) => (e) => {
  //   setTasks(tasks.filter(otherTask => otherTask !== task))
  // },[tasks])

  const handleClick = (e) =>{
    handleShow();
    setDayID(parseInt(e.target.id));
  }

  const UpdateTask = (task) => {
    let userToken = "Bearer "
    userToken = userToken + localStorage.getItem('myLoginToken')

    let updateTaskURL = "http://localhost:3001/api/updatetask"
    
    console.log("Task being updated on server: ",task);

    const headers = new Headers()
    headers.append("authorization", `${userToken}`)
    headers.append("Content-Type", "application/json")

    fetch(updateTaskURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(task)
    }).then((res) => {
      if (res.status === 200){
        return res.json({Message: "Success"})
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
  }
  
  const RecieveTasks = () =>{
    let userToken = "Bearer "
    userToken = userToken + localStorage.getItem('myLoginToken')
    const userID = localStorage.getItem('userID')

    let recieveTaskURL = "http://localhost:3001/api/recievetasks?userID=" + userID

    const headers = new Headers()
    headers.append("authorization", `${userToken}`)

    fetch(recieveTaskURL, {
      method: 'GET',
      headers: headers,
    }).then((res) => {
      if (res.status === 200){
        return res.json({Message: "Success"})
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {

      const results = data.Tasks
      console.log("API Results: ",results);
      
      setTasks([]);
      results.forEach(task => {
        setTasks(tasks => [...tasks, {
          taskid: task.taskID,
          dayid: task.dayID, 
          userid : task.userID,
          content: task.content,
          done: task.done
        }])
      });
    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
    
  }

  const SaveTask = (taskObj) =>{
    let userToken = "Bearer "
    userToken = userToken + localStorage.getItem('myLoginToken')

    const uploadTaskURL = "http://localhost:3001/api/addtask"

    const headers = new Headers()
    headers.append("authorization", `${userToken}`)
    headers.append("Content-Type", "application/json")

    fetch(uploadTaskURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(taskObj)
    }).then((res) => {
      if (res.status === 201){
        return res.json({Message: "Success"})
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log("An error has occured: ", err, " End of error");
    })
    

  }

  const checkAchievementStatus = () => {
    let userToken = "Bearer "
    userToken = userToken + localStorage.getItem('myLoginToken')

    const fetchBody = {
      userID: localStorage.getItem('userID')
    }

    const addAchievementURL = "http://localhost:3001/api/addachievement"

    const headers = new Headers()
    headers.append("authorization", `${userToken}`)
    headers.append("Content-Type", "application/json")

    fetch(addAchievementURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(fetchBody)
    }).then((res) => {
      if (res.status === 200){
        return res.json({Message: "Success"})
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
  }

  
  useEffect(() => {
    RecieveTasks()
    checkAchievementStatus()
  }, []);

  
  if (localStorage.getItem('myLoginToken')){
    return (
      <>
        <Modal show={show} onHide={handleClose}>
  
          <Modal.Header closeButton>  
            <Modal.Title>Add a task</Modal.Title>
          </Modal.Header>
  
          
          <Modal.Body>
              <input
                id="newTask"
                name="newTask"
                value={newTask}
                onChange={onNewTaskChange}
                className='modal-input-search'
              />
          </Modal.Body>
  
          <Modal.Footer>
  
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="secondary" onClick={formSubmitted}> Submit New Task </Button>
  
          </Modal.Footer>
          
  
        </Modal>
        <header>
          <h1 className="title">Tidy</h1>
          <h1 className="usersName">Hi, {username}</h1>
        </header>   
        
        
        <div className="mainContainer">
        {/* Monday List */}
        <div className="mainChild">
          <div className="dayTitle">
            <h2>Monday</h2>
            <button id = "1" className="weekButton" onClick={handleClick}>+</button>
          </div>                   
          <ul className="taskList">
            {tasks.filter(task => task.dayid ===  1).map((task) => (
              <li key={task.taskid} className={task.done ? 'taskListEntryDone '  : 'taskListEntry taskListEntryHome'} onClick={onTaskChecked(task,task.taskid)} >
                <span className={task.done ? 'done' : ''}>
                  {task.content}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tuesday List */}
        <div className="mainChild">
          <div className="dayTitle">
            <h2>Tuesday</h2>
            <button id = "2" className="weekButton" onClick={handleClick}>+</button>
          </div> 
          <ul className="taskList">
          {tasks.filter(task => task.dayid ===  2).map((task) => (
              <li key={task.taskid} className={task.done ? 'taskListEntryDone' : 'taskListEntry taskListEntryHome'} onClick={onTaskChecked(task,task.taskid)}>
              <span className={task.done ? 'done' : ''} >
                {task.content}
              </span>
            </li>
            ))}
          </ul>
        </div>

        {/* Wednesday List */}
        <div className="mainChild">
          <div className="dayTitle">
            <h2>Wednesday</h2>
            <button id = "3" className="weekButton" onClick={handleClick}>+</button>
          </div>  
          <ul className="taskList">
          {tasks.filter(task => task.dayid ===  3).map((task) => (
              <li key={task.taskid} className={task.done ? 'taskListEntryDone' : 'taskListEntry taskListEntryHome'} onClick={onTaskChecked(task,task.taskid)}>
              <span className={task.done ? 'done' : ''}>
                {task.content}
              </span>
            </li>
            ))}
          </ul>
        </div>
  
        {/* Thursday List */}
        <div className="mainChild">
          <div className="dayTitle">
            <h2>Thursday</h2>
            <button id = "4" className="weekButton" onClick={handleClick}>+</button>
          </div>
          <ul className="taskList">
            {tasks.filter(task => task.dayid ===  4).map((task) => (
              <li key={task.taskid} className={task.done ? 'taskListEntryDone' : 'taskListEntry taskListEntryHome'} onClick={onTaskChecked(task,task.taskid)} >
              <span className={task.done ? 'done' : ''}  >
                {task.content}
              </span>
            </li>
            ))}
          </ul>
        </div>

        {/* Friday List */}
        <div className="mainChild">
          <div className="dayTitle">
            <h2>Friday</h2>
            <button id = "5" className="weekButton" onClick={handleClick}>+</button>
          </div>
          <ul className="taskList">
          {tasks.filter(task => task.dayid ===  5).map((task) => (
              <li key={task.taskid} className={task.done ? 'taskListEntryDone' : 'taskListEntry taskListEntryHome'} onClick={onTaskChecked(task,task.taskid)}>
              <span className={task.done ? 'done' : ''}>
                {task.content}
              </span>
            </li>
            ))}
          </ul>
        </div>
        </div>
      </>
      )
  }else{
    return(
      <>
        <h1>Welcome to Tidy</h1>
        <h2>Please log in or create and account</h2>
        <Login/>
      </>
    )
  }
  
}
