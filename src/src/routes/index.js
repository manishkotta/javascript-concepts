// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout';

import Home from '../routes/Home';
import LoginForm from '../routes/Login';
import newDashboardForm from '../routes/dashboard/new-dashboard';
import myDashboardForm from '../routes/dashboard/my-dashboards';
import viewDashboardForm from '../routes/dashboard/view-dashboards';
import previewDashboardForm from '../routes/dashboard/preview-dashboard';
import Localization from '../localization'

import requiresAuth from '../authentication/authenticated.component';
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
export const createRoutes = (store) => (
  [
    // {
    //   path: '/',
    //   indexRoute: LoginForm(store),
    //   childRoutes: []
    // },
    {
      path: '/login',
      indexRoute: LoginForm(store),
      childRoutes: []
    },
    {
      path: '/dashboard',
      component: CoreLayout,
      indexRoute: myDashboardForm(store),
      childRoutes: [
        {
          path: 'new',
          indexRoute: newDashboardForm(store),
        },
        {
          path: 'mydashboards',
          indexRoute: myDashboardForm(store),
        },
        {
          path: 'view/:id',
          indexRoute: viewDashboardForm(store)
        },
        {
          path: 'edit/:id',
          indexRoute: newDashboardForm(store),
        },
        {
          path: 'preview/:id',
          indexRoute: previewDashboardForm(store)
        }
      ]

    },
    {
      path: '/l',
      indexRoute: Localization(store),
      childRoutes: []
    },
    {
      path: '/**',
      indexRoute: LoginForm(store),
      childRoutes: []
    }
  ])

export default createRoutes
