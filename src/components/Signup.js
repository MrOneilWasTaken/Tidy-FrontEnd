import { useState } from "react"

export default function Signup(){


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  //just check if token exist on home load

  const handleUsername = (e) =>{
    setUsername(e.target.value)
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value)
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
      }
      window.location.reload(false);

    }).catch((err) => {
      console.log("An error has occured: ", err);
    })
    
    //call log in api
  }



  return(
    <>
    
      <input
          type='text'
          placeholder="Username"
          onChange={handleUsername}
      />
      <input
          type='password'
          placeholder='Password'
          onChange={handlePassword}
      />
      <button onClick={handleSignup}>Sign up</button>
    
    </>
  )
}
