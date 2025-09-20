import React from "react";
import Button from "../ui/Button.jsx";

function UserMenu({ userLogin, onLogout }) {
  return (
    <div className='panel-header'>
      <p>Your login: {userLogin}</p>
      <Button onClick={onLogout}>Log out</Button>
    </div>
  );
}

export default UserMenu;


