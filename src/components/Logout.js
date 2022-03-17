export default function Logout(){


  const handleLogoutClick= (e) =>{
    localStorage.removeItem('myLoginToken')
    window.location.reload(false);

  }

  return(
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  )
}