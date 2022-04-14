import { useEffect, useState } from "react";

export default function Leaderboard() {
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

  useEffect(() => {
    callLeaderboard()
  }, []);

  

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
            <li key={index} className="taskListEntry leaderboardList">
              <span className="leaderboardChild userPosition">{index+1}</span>
              <span className="leaderboardChild userName">{user.username}</span>
              <span className="leaderboardChild userTasksCompleted">{user.tasksCompleted}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
    )
}