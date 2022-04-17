import { useNavigate } from "react-router-dom";

export default function Logout(){
  let navigate = useNavigate();

  const handleLogoutClick = (e) =>{
    localStorage.removeItem('myLoginToken')
    localStorage.removeItem('userID')
    localStorage.removeItem('username')
    
    // window.location.reload(false);
    // Redirect()
    navigate("/");
  }


  return(
    <>
      <button className="logoutButton" onClick={() => {
                            handleLogoutClick();
                            }}>Logout</button>
    </>
  )
}