import { useEffect, useState } from "react"
import Logout from "../components/Logout";


export default function Profile() {

  const [achievements, setAchievements] = useState([]);
  const [username, setUsername] = useState("");
  

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

    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
  }

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
  }, []);



  return (
    <>
      <header>
        <h1 className="title">Profile</h1>
      </header>

      
      <div className="profileContainer">
        <div className="profileHeader">
          <span className="leaderboardHeaderChild">Profile Information</span>
        </div>
        <div className="profileBody">
          <span className="profileBodyChild">Username: {username}</span>
          <span className="profileBodyChild"></span>
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
                <span>{achievement.achievement_desc}</span>
              </li>
            ))}


          </ul>
        </div>
      </div>
    </>
    )
}