import { useCallback, useState } from "react";

export default function Login(){
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleUsername = (e) =>{
    setUsername(e.target.value)
  }

  const handlePassword = useCallback((e) =>{
    setPassword(e.target.value)
  },[])

  const handleLoginClick = () =>{
    //call log in api
    let loginURL = "http://localhost:3001/api/login"

    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    fetch(loginURL,{
      method: 'POST',
      headers: new Headers(),
      body: formData
    }).then((res) => {
      if (res.status === 200){
        return res.json()
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {
      console.log(data);

      if ("token" in data){
        localStorage.setItem('myLoginToken', data.token)
        localStorage.setItem('userID', data.userID)
        localStorage.setItem('username', data.username)
      }
      window.location.reload(false);

    }).catch((err) => {
      console.log("An error has occured: ", err);
    })

  }

  const handleSignup = () =>{
    
    let signupURL = "http://localhost:3001/api/signup"

    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)


    fetch(signupURL,{
      method: 'POST',
      headers: new Headers(),
      body: formData
    }).then((res) => {
      if (res.status === 200){
        return res.json()
      }else{
        throw Error(res.statusText)
      }
    }).then((data) => {
      console.log(data);

      if ("token" in data){
        localStorage.setItem('myLoginToken', data.token)
        localStorage.setItem('userID', data.userID)
        localStorage.setItem('username', data.username)
      }
      window.location.reload(false);

    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
    
    //call log in api
  }

  return(
    <div className="inputContainer">
      <input
        className="input-search"
        type='text'
        placeholder="Username"
        value={username}
        onChange={handleUsername}
      />
      <input
        className="input-search"
        type='password'
        placeholder='Password'
        value={password}
        onChange={handlePassword}
      />
      <br></br>
      <div className="loginlogoutbuttonContainer">
        <button className="loginlogoutButton" onClick={handleLoginClick}>Log in</button>
        <button className="loginlogoutButton" onClick={handleSignup}>Sign up</button>
      </div>
    </div>
  )
}