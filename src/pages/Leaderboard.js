import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  let navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  const callLeaderboard = () =>{
    let userToken = "Bearer "
    userToken = userToken + localStorage.getItem('myLoginToken')

    let updateTaskURL = "http://localhost:3001/api/leaderboard"
    

    const headers = new Headers()
    headers.append("authorization", `${userToken}`)
    headers.append("Content-Type", "application/json")

    setLeaderboard([]);

    fetch(updateTaskURL, {
      method: 'GET',
      headers: headers,
    }).then((res) => {
      if (res.status === 200){
        return res.json({Message: "Success"})
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {
      console.log(data);

      data.TaskCount.forEach(usersCount => {
        setLeaderboard(leaderboardEntries => [...leaderboardEntries, {
          username: usersCount.username,
          tasksCompleted: usersCount.result,
        }])
      });
    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
  }



  const positionCheck = (index) => {
    if (index === 0){
      return "taskListEntry leaderboardList first"
    }else if (index === 1){
      return "taskListEntry leaderboardList second"
    }else if (index === 2){
      return "taskListEntry leaderboardList third"
    }else{
      return "taskListEntry leaderboardList bottom"
    }
  }

  useEffect(() => {
    callLeaderboard()
  }, []);

  const toHome = () => {
    navigate("/");
  }

  if (localStorage.getItem('myLoginToken')){
  return (
    <>
      <header>
        <h1 className="title">Leaderboard</h1>
      </header>

      <div className="mainContainer">
        <div className="leaderboardHeader">
          <span className="leaderboardHeaderChild">Position</span>
          <span className="leaderboardHeaderChild">Username</span>
          <span className="leaderboardHeaderChild">Tasks Completed</span>
        </div>
        <ul className="taskList"> 
          {leaderboard.map((user, index) => (
            <li key={index} className={positionCheck(index)}>
              <span className="leaderboardChild userPosition"> {index+1}</span>
              <span className="leaderboardChild userName">{user.username}</span>
              <span className="leaderboardChild userTasksCompleted">{user.tasksCompleted}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
    )
  }else{
    return(
      <>
      <header>
        <h1 className="title" onClick={toHome}>Return to Home</h1>
      </header>
      </>
    )
  }
}