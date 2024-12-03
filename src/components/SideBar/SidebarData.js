import React from 'react';

export const SidebarData = [
    {
      title: 'Network Status',
      path: '/',
      icon: <i className="fa fa-tachometer-alt"/>
    },
    {
        title: 'Coverage Map',
        path: '/map',
        icon: <i className="fa fa-map-marker-alt"/>
    },
    {
        title: 'Block Explorer',
        path: '/blocks',
        icon: <i className="fa fa-cubes"/>
    },
    {
        title: 'Operators',
        path: '/operators',
        icon: <i className="fa fa-globe"/>
    },
    {
        title: 'Subscribers',
        path: '/subscribers',
        icon: <i className="fas fa-user-secret"/>
    },
    {
        title: 'Plans',
        path: '/plans',
        icon: <i className="fa fa-newspaper"/>
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <i className="fa fa-cloud-upload-alt"/>
    },
    {
        title: 'Network Equipment',
        icon: <i className="fas fa-project-diagram"/>,

        iconClosed: <i className="fas fa-caret-down"/>,
        iconOpened: <i className="fas fa-caret-up"/>,

        subNav: [
            {
              title: 'Access gateways',
              path: '/gateways',
              icon: <i className="fa fa-server"/>
            },
            {
                title: 'Small Cells',
                path: '/cells',
                icon: <i className="fa fa-signal"/>
            },
        ]
    },
    {
        title: 'dSIMs',
        path: '/dsim',
        icon: <i className="fa fa-microchip"/>
    },
    {
        title: 'Charging',
        path: '/charging',
        icon: <i className="fas fa-dollar-sign"/>
    },
    {
        title: 'User Equipment',
        icon: <i className="fas fa-users-cog"/>,

        iconClosed: <i className="fas fa-caret-down"/>,
        iconOpened: <i className="fas fa-caret-up"/>,

        subNav: [
            // {
            //   title: 'Phones',
            //   path: '/phones',
            //   icon: <i className="fa fa-mobile"/>
            // },
            {
                title: 'Cameras',
                path: '/cameras',
                icon: <i className="fa fa-camera"/>
            },
        ]
    },
    {
        title: 'Invoices',
        path: '/invoices',
        icon: <i className="fa fa-file-invoice-dollar"/>
    },
    {
        title: 'Payouts',
        path: '/payouts',
        icon: <i className="fas fa-piggy-bank"/>
    },
    {
        title: 'Analytics',
        path: '/analytics',
        icon: <i className="fa fa-chart-line"/>
    },
    {
        title: 'Users',
        path: '/users',
        icon: <i className="fas fa-user"/>
    },
];

export const SidebarDataSubscriber = [
    {
      title: 'Network Status',
      path: '/',
      icon: <i className="fa fa-tachometer-alt"/>
    },
    {
        title: 'Coverage Map',
        path: '/map',
        icon: <i className="fa fa-map-marker-alt"/>
    },
    {
        title: 'Block Explorer',
        path: '/blocks',
        icon: <i className="fa fa-cubes"/>
    },
    {
        title: 'Plans',
        path: '/plans',
        icon: <i className="fa fa-newspaper"/>
    },
    {
        title: 'dSIMs',
        path: '/dsim',
        icon: <i className="fa fa-microchip"/>
    },
    {
        title: 'Invoices',
        path: '/invoices',
        icon: <i className="fa fa-file-invoice-dollar"/>
    },
];
  