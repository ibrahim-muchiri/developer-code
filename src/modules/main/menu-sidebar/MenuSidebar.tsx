import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {MenuItem} from '@components';
import {PfImage} from '@profabric/react-components';
import styled from 'styled-components';
import {SidebarSearch} from '@app/components/sidebar-search/SidebarSearch';
import i18n from '@app/utils/i18n';
import jwt from 'jsonwebtoken';

export interface IMenuItem {
  name: string;
  icon?: string;
  path?: string;
  children?: Array<IMenuItem>;
}

export const MENU: IMenuItem[] = [
  {
    name: i18n.t('menusidebar.label.dashboard'),
    icon: 'fas fa-tachometer-alt nav-icon" />',
    path: '/'
  },
  {
    name: 'Jobs',
    icon: 'fas fa-tasks nav-icon',
    children: [
         {
           name: 'Job List',
           icon: 'fas fa-file-alt nav-icon',
           path: '/job-list'
         },
          {
            name: 'My Jobs',
            icon: 'fas fa-file-alt nav-icon',
            path: '/my-jobs'
          }
       ]

  }
 
];
export const CheckRole = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    const decodedToken = jwt.decode(accessToken);
    const userRole = decodedToken.claims.find(claim => claim === "ROLE_ADMIN" );
    const userRoleQA = decodedToken.claims.find(claim => claim === "ROLE_QA" );
    if (userRole) {
      const adminItem = MENU.find(item => item.name === 'Admin');
      const jobsItem = MENU.find(item => item.name === 'Jobs');
      if (!adminItem) {
        jobsItem.children.push({
          name: 'Peer review queue',
          icon: 'fas fa-file-alt nav-icon',
          path: '/peer-review-queue'
        },
        {
          name: 'Complete tasks',
          icon: 'fas fa-file-alt nav-icon',
          path: '/complete-tasks'
        });
        MENU.push(
          {
            name: 'Clients',
            icon: 'fas fa-users nav-icon',
            children: [
                 {
                   name: 'Add Client',
                   icon: 'fas fa-plus nav-icon',
                   path: '/add-client'
                 },
                 {
                    name: 'Manage Clients',
                    icon: 'fas fa-cog nav-icon',
                    path: '/manage-clients'
                  }
               ]
        
          },
          {
            name: 'Projects',
            icon: 'fas fa-project-diagram nav-icon',
            children: [
                 {
                   name: 'Add Project',
                   icon: 'fas fa-plus nav-icon',
                   path: '/add-project'
                 },
                 {
                    name: 'Manage Projects',
                    icon: 'fas fa-cog nav-icon',
                    path: '/manage-projects'
                  }
               ]
        
          },
          {
          name: "Admin",
          icon: 'fas fa-user-cog nav-icon',
          children: [
            {
              name: 'Add User',
              icon: 'fas fa-plus nav-icon',
              path: '/add-user'
            },
            {
              name: 'Manage Users',
              icon: 'fas fa-cog nav-icon',
              path: '/manage-user'
            }
          ]
        });
      }
    }
    if (userRoleQA) {
      const jobsItem = MENU.find(item => item.name === 'Jobs');
      jobsItem.children.push({
        name: 'Peer review queue',
        icon: 'fas fa-file-alt nav-icon',
        path: '/peer-review-queue'
      },
         
      {
        name: 'Complete tasks',
        icon: 'fas fa-file-alt nav-icon',
        path: '/complete-tasks'
      });
    }
  }
};

const StyledBrandImage = styled(PfImage)`
  float: left;
  line-height: 0.8;
  margin: -1px 8px 0 6px;
  opacity: 0.8;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
`;

const StyledUserImage = styled(PfImage)`
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
`;

const MenuSidebar = () => {
  // const user = useSelector((state: any) => state.auth.currentUser);
  const sidebarSkin = useSelector((state: any) => state.ui.sidebarSkin);
  const menuItemFlat = useSelector((state: any) => state.ui.menuItemFlat);
  const menuChildIndent = useSelector((state: any) => state.ui.menuChildIndent);
  const [email, setEmail] = useState('');
  useEffect(() => {
    CheckRole();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken = jwt.decode(accessToken);
      setEmail(decodedToken.sub);
    }
  }, []);

  return (
    <aside className={`main-sidebar elevation-4 ${sidebarSkin}`}>
      <Link to="/" className="brand-link">
        <StyledBrandImage
          src="/img/logo.png"
          alt="SCRIBE"
          width={33}
          height={33}
          rounded
        />
        
        <span className="brand-text font-weight-light">SCRIBE</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <StyledUserImage
              src=""
              fallbackSrc="/img/default-profile.png"
              alt="User"
              width={34}
              height={34}
              rounded
            />
          </div>
          <div className="info">
            <Link to="/profile" className="d-block">
              {email}
            </Link>
          </div>
        </div>

        <div className="form-inline">
          <SidebarSearch />
        </div>

        <nav className="mt-2" style={{overflowY: 'hidden'}}>
          <ul
            className={`nav nav-pills nav-sidebar flex-column${
              menuItemFlat ? ' nav-flat' : ''
            }${menuChildIndent ? ' nav-child-indent' : ''}`}
            role="menu"
          >
            {MENU.map((menuItem: IMenuItem) => (
              <MenuItem
                key={menuItem.name + menuItem.path}
                menuItem={menuItem}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default MenuSidebar;
