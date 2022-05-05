import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";


export default function Profile() {
  let navigate = useNavigate();

  const [achievements, setAchievements] = useState([]);
  const [username, setUsername] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [favouriteDay, setFavouriteDay] = useState(0);
  
  const calcTopDay = (tasks) => {

    let dayCount = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
    }

    tasks.forEach(task => {
      if (task.dayID === 1){
        dayCount.Monday += 1
      }
      if (task.dayID === 2){
        dayCount.Tuesday += 1
      }
      if (task.dayID === 3){
        dayCount.Wednesday += 1
      }
      if (task.dayID === 4){
        dayCount.Thursday += 1
      }
      if (task.dayID === 5){
        dayCount.Friday += 1
      }
    });

     

    return Object.keys(dayCount).reduce((a, b) => dayCount[a] > dayCount[b] ? a : b); 
  }

  // Fetching from userstasks API endpoint
  const fetchProfileData = () => {
    let userToken = "Bearer "
    userToken = userToken + localStorage.getItem('myLoginToken')
    const userID = localStorage.getItem('userID')

    let usersTasksURL = "http://localhost:3001/api/userstasks?userID=" + userID

    const headers = new Headers()
    headers.append("authorization", `${userToken}`)
    
    fetch(usersTasksURL, {
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
      setUsername(data.Username)
      setCompletedTasks(data.UsersCompletedTasks)
      setFavouriteDay(calcTopDay(data.UsersTasks))
      

    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
  }

  // Fetching from achievements API endpoint
  const fetchAchievementData = () => {

    let userToken = "Bearer "
    userToken = userToken + localStorage.getItem('myLoginToken')
    const userID = localStorage.getItem('userID')

    let achievementDataURL = "http://localhost:3001/api/achievements?userID=" + userID

    const headers = new Headers()
    headers.append("authorization", `${userToken}`)
    
    fetch(achievementDataURL, {
      method: 'GET',
      headers: headers,
    }).then((res) => {
      if (res.status === 200){
        return res.json({Message: "Success"})
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {
      const fetchedAch = data.achievements

      setAchievements([]);
      
      fetchedAch.forEach(achievement => {
        setAchievements(achievements => [...achievements, {
          achievementid: achievement.achievementID,
          achievement_desc : achievement.achievement_desc,
        }])
      });
    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
  }

  useEffect(() => {
    fetchProfileData()
    fetchAchievementData()
  },[]);

  const toHome = () => {
    navigate("/");
  }


  if (localStorage.getItem('myLoginToken')){
    return (
      <>
        <header>
          <h1 className="title">Profile</h1>
        </header>
  
        
        <div className="profileContainer">
          <div className="profileHeader">
            <span className="profileHeaderChild">Profile Information</span>
          </div>
          <div className="profileBody">
            <span className="profileBodyChild">Username: {username}</span>
            <span className="profileBodyChild">Tasks Completed: {completedTasks}</span>
            <span className="profileBodyChild">Favourite Day: {favouriteDay}</span>
          </div>
          <Logout />
        </div>
  
        <div className="profileContainer">
          <div className="achievementHeader">
            <span className="achievementHeaderChild">Achievements Attained</span>
          </div>
          <div className="achievementBody">
            <ul className="achievementBodyChild">
            {achievements.map((achievement) => (
                <li key={achievement.achievementid}>
                  <span>{achievement.achievement_desc}✔️</span>
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
      <header>
        <h1 className="title" onClick={toHome}>Return to Home</h1>
      </header>
      </>
    )
  }
}