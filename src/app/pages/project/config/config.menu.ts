export let configMenu = function (orgId, prjId, prjName) {
  const json = [
    {
      path: 'pages',
      children: [
        {
          path: 'org/' + orgId + '/prjs/' + prjId + '/config',
          data: {
            menu: {
              title: prjName,
              icon: 'ion-edit',
              selected: true,
              expanded: true,
              order: 1,
            },
          },
        },
        {
          path: '',
          data: {
            menu: {
              title: '项目配置',
              icon: 'ion-edit',
              selected: true,
              expanded: true,
              order: 1,
            },
          },
          children: [
            {
              path: 'org/' + orgId + '/prjs/' + prjId + '/config/module/list',
              data: { menu: { title: '模块', icon: 'ion-edit', selected: false, order: 1 } },
            },
            {
              path: 'org/' + orgId + '/prjs/' + prjId + '/config/ver/list',
              data: { menu: { title: '版本', icon: 'ion-edit', selected: false, order: 2 } },
            },
            {
              path: 'org/' + orgId + '/prjs/' + prjId + '/config/env/list',
              data: { menu: { title: '环境', icon: 'ion-edit', selected: false, order: 3 } },
            },
            {
              path: 'org/' + orgId + '/prjs/' + prjId + '/config/member',
              data: { menu: { title: '成员', icon: 'ion-edit', selected: false, order: 4 } },
            },

          ],
        },

        {
          path: '',
          data: {
            menu: {
              title: '问题配置',
              icon: 'ion-edit',
              selected: true,
              expanded: true,
              order: 1,
            },
          },
          children: [
            {
              path: 'org-admin/org-settings/org/list',
              data: { menu: { title: '类型', icon: 'ion-edit', selected: false, order: 1 } },
            },
            {
              path: 'org-admin/org-settings/org/list',
              data: { menu: { title: '优先级', icon: 'ion-edit', selected: false, order: 2 } },
            },
            {
              path: 'org-admin/org-settings/org/list',
              data: { menu: { title: '界面', icon: 'ion-edit', selected: false, order: 3 } },
            },
            {
              path: 'org-admin/org-settings/org/list',
              data: { menu: { title: '工作流', icon: 'ion-edit', selected: false, order: 4 } },
            },
          ],
        },
      ],
    },
  ];
  return json;
};
