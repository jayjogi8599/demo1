export const SidebarMenuData = [
    {
      iconClass: "nav-icon fas fa-tachometer-alt",
      title: "Master",
      isParent: true,
      iconArrow: "right fas fa-angle-left",
      link: "/dashboard-v1",
      submenu: [
        {
          iconClass: "far fa-circle nav-icon",
          title: "Role",
          link: "/dashboard-v1",
        },
        {
          iconClass: "far fa-circle nav-icon",
          title: "Designation",
          link: "/dashboard-v2",
        },
        {
          iconClass: "far fa-circle nav-icon",
          title: "Modulus",
          link: "/dashboard-v3",
        },
        {
          iconClass: "far fa-circle nav-icon",
          title: "Pages",
          link: "/pages",
        },
      ],
    },
    {
      iconClass: "nav-icon fas fa-th",
      title: "Users",
      isParent: true,
      iconArrow: "right fas fa-angle-left",
      link: "/widgets",
      submenu: [
        {
          iconClass: "far fa-circle nav-icon",
          title: "Manage User",
          link: "/manageuser",
        },
        {
          iconClass: "far fa-circle nav-icon",
          title: "Permission User",
          link: "/permissionuser",
        },
       
      ],
     
    },
  
    
    
  ];