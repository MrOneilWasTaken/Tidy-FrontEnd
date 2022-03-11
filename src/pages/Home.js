import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { useState, useCallback, useEffect } from "react";

export default function Home() {

  const [show, setShow] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(0);

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onNewTaskChange = useCallback((e) => {
    setNewTask(e.target.value)
  },[])

  const formSubmitted = useCallback((e) => {
    if(newTask === ""){
      console.log("nothign there hun");
      alert("Please input something")
    }else{

    e.preventDefault();
    handleClose();

    if (!newTask.trim())return;

    console.log("Form Submitted");

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        content: newTask.trim(),
        done: false
      }
    ])

    setNewTask('')
  }
  
  },[tasks,newTask])

  const onTaskChecked = useCallback((task,index) => (e) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1,{
      ...task,
      done: !task.done
    })
    setTasks(newTasks)
  },[tasks])

  const removeTask = useCallback((task) => (e) => {
    setTasks(tasks.filter(otherTask => otherTask != task))
  },[tasks])

  useEffect(() => {
    console.log('tasks', tasks);
  }, [tasks])

  const handleClickMonday = (id) => {
    handleShow()
    setButtonClicked(id)

  }

  return (
    <>
      <h1>Hi User</h1>
      {/* <img src={ require('./images/image1.jpg') } /> */}
      <h3>----------------------</h3>
      <p>This is an app that allows you to order your time and be rewarded for it</p>

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

      <div>
        <h2>Monday</h2>
        <Button id = "1" variant="primary" onClick={handleShow}>
        +
        </Button>

       {/* Compelted task feature, need to seperate
       it into different days, look at ModalForm.js for next thing todo */}
        
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? 'doneLI' : ''}>
              <span className={task.done ? 'done' : ''}>
                {task.content}
              </span>
              <button onClick={removeTask(task)}>Remove Task</button>
            </li>
          ))}
          <li>example task</li>
        </ul>
      </div>

      <div>
        <h2>Tuesday</h2>
        <Button id = "2" variant="primary" onClick={handleShow}>
        +
        </Button>
        <ul>
          <li>example task</li>
        </ul>
      </div>

      <div>
        <h2>Wednesday</h2>
        <Button id = "3" variant="primary" onClick={handleShow}>
        +
        </Button>
        <ul>
          <li>example task</li>
        </ul>
      </div>

      <div>
        <h2>Thursday</h2>
        <Button id = "4" variant="primary" onClick={handleShow}>
        +
        </Button>
        <ul>
          <li>example task</li>
        </ul>
      </div>

      <div>
        <h2>Friday</h2>
        <Button id = "5" variant="primary" onClick={handleShow}>
        +
        </Button>
        <ul>
          <li>example task</li>
        </ul>
      </div>
      

    </>
    )
}
