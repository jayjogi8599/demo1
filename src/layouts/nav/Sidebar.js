/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState,useEffect  } from "react";

import { SidebarMenuData } from "./SidebarData";
import { Link } from "react-router-dom";


const Sidebar = () => {

  const [activeParentMenu, setActiveParentMenu] = useState(null);
  const [activeChildMenu, setActiveChildMenu] = useState(null);
  const [openMenus, setOpenMenus] = useState([]);

  useEffect(() => {
   
    const firstParentMenu = SidebarMenuData.find((item) => item.isParent);
    if (firstParentMenu) {
      setOpenMenus([firstParentMenu.title]);
      setActiveParentMenu(firstParentMenu.title);
    }
  }, []);
  const toggleMenu = (menuTitle) => {
    if (openMenus.includes(menuTitle)) {
      setOpenMenus(openMenus.filter((menu) => menu !== menuTitle));
    } else {
      setActiveParentMenu(menuTitle);
      setOpenMenus([...openMenus, menuTitle]);
    }
  };

  const handleMenuClick = (link) => {
    setActiveChildMenu(link);
  };

  useEffect(() => {
    // Check if any child page is active
    const isChildActive = SidebarMenuData.some((item) =>
      item.submenu ? item.submenu.some((subItem) => subItem.link === activeChildMenu) : false
    );

    if (isChildActive) {
      // Find the parent menu item and set it as active
      const parentMenuItem = SidebarMenuData.find((item) =>
        item.submenu ? item.submenu.some((subItem) => subItem.link === activeChildMenu) : false
      );

      if (parentMenuItem) {
        setActiveParentMenu(parentMenuItem.title);
      }
    }
  }, [activeChildMenu]);

  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* <!-- Brand Logo --> */}
        <Link to="#" className="brand-link">
          <img
            src="../../dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-img img-circle custom-logo"
          />
          <span className="brand-text font-weight-light">AdminLTE 3</span>
        </Link>

        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user (optional) --> */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="img">
              <img
                src="../../dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User img"
              />
            </div>
            <div className="info">
              <Link to="#" className="d-block">
                Alexander Pierce
              </Link>
            </div>
          </div>

          {/* <!-- SidebarSearch Form --> */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {SidebarMenuData.map((item, index) => (
                <li
                className={`nav-item ${openMenus.includes(item.title) ? "menu-open" : ""}`}
                  key={index}
                >
                  <Link
                    to={item.link}
                    className={`nav-link ${
                      activeChildMenu  === item.link || activeParentMenu  === item.title
                       
                          ? "active "
                          
                        : ""
                    }`}
                    onClick={() => {
                      handleMenuClick(item.submenu ? item.title : item.link);
                      if (item.isParent) {
                        toggleMenu(item.title);
                      }
                    }}
                  >
                    <i className={`nav-icon ${item.iconClass}`}></i>
                    <p>
                      {item.title}
                      {item.isParent && <i className={item.iconArrow}></i>}
                    </p>
                  </Link>

                  {item.isParent && (
                    <ul className="nav nav-treeview">
                      {item.submenu.map((subItem, subIndex) => (
                        <li className="nav-item" key={subIndex}>
                          <Link
                            to={subItem.link}
                            className={`nav-link ${
                              activeParentMenu  === subItem.link ? "active green" : ""
                            }`}
                            onClick={() => handleMenuClick(subItem.link)}
                          >
                            <i className={subItem.iconClass}></i>
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
           
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
