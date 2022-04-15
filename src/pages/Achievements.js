// import { useEffect, useState } from "react"

// export default function Achievements() {

  

//   return (
//     <>
//       <header>
//         <h1 className="title">Achievemnts</h1>
//       </header>

//       <div className="mainContainer">
//         <div className="leaderboardHeader">
//           <span className="leaderboardHeaderChild">Position</span>
//           <span className="leaderboardHeaderChild">Username</span>
//           <span className="leaderboardHeaderChild">Tasks Completed</span>
//         </div>
//         <ul className="taskList"> 
//           {leaderboard.map((user, index) => (
//             <li key={index} className="taskListEntry leaderboardList">
//               <span className="leaderboardChild userPosition">{index+1}</span>
//               <span className="leaderboardChild userName">{user.username}</span>
//               <span className="leaderboardChild userTasksCompleted">{user.tasksCompleted}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//     )
// }