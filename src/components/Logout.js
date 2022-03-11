export default function Logout(props){


  const handleLogoutClick= (e) =>{
    console.log("Logout clicked");
  }

  return(
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}