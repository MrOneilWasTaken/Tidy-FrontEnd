export default function Login(props){

  const handleUsername = (e) =>{
    console.log("Username typed: " +  e.target.value);
  }

  const handlePassword = (e) =>{
    console.log("Password typed: " +  e.target.value);
  }

  const handleLoginClick= (e) =>{
    console.log("login clicked");
  }


  

  return(
    <div>
      <input
          type='text'
          placeholder={props.authFlag.toString()}
          // value={}
          onChange={handleUsername}
      />
      <input
          type='password'
          placeholder='Password'
          // value={password}
          onChange={handlePassword}
      />
      <button onClick={handleLoginClick}>Log in</button>
    </div>
  )
}