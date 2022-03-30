import { useCallback, useState } from "react";

export default function Login(){
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  //just check if token exist on home load

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
      }
      window.location.reload(false);

    }).catch((err) => {
      console.log("An error has occured: ", err);
    })

  }



  return(
    <>
    
      <input
          type='text'
          placeholder="Username"
          value={username}
          onChange={handleUsername}
      />
      <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePassword}
      />
      <button onClick={handleLoginClick}>Log in</button>
    </>
  )
}