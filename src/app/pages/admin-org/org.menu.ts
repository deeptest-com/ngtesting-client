export const ORG_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'org-admin/org/list',
        data: {
          menu: {
            title: '我的组织列表',
            icon: 'ion-edit',
            selected: false,
            order: 1,
          },
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: '当前组织',
            icon: 'ion-edit',
            selected: true,
            expanded: true,
            order: 1,
          },
        },
        children: [
          {
            path: 'org-admin/user/list',
            data: {
              menu: {
                title: '用户管理',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/group/list',
            data: {
              menu: {
                title: '群组管理',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/org-role/list',
            data: {
              menu: {
                title: '组织角色',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/project-role/list',
            data: {
              menu: {
                title: '测试角色',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
          {
            path: 'org-admin/property/case-type/list',
            data: {
              menu: {
                title: '属性设置',
                icon: 'ion-edit',
                selected: false,
                order: 1,
              },
            },
          },
        ],
      },
    ],
  },
];
