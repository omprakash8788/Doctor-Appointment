import React from "react";
import "../styles/Layout.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { message ,Badge } from "antd";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // redering menu list
  const SidebarMenu = user?.isAdmin ? adminMenu : userMenu;

  // logout function
  const handleLogOut = () => {
    localStorage.clear();
    message.success("Logout successfully");
    navigate("/login");
  };
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogOut}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{cursor:'pointer'}}>
              <Badge count={user?.notification.length} onClick={()=>{navigate('/notification')}}>
                <i class="fa-solid fa-bell"></i>

             </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
