export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'report',
        data: {
          menu: {
            title: 'general.menu.report',
            icon: 'ion-ios-paper',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },

      {
        path: 'test-site',
        data: {
          menu: {
            title: 'general.menu.test-site',
            icon: 'ion-wrench',
            selected: false,
            expanded: true,
            order: 10,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.devsite',
                url: '',
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.testsite',
                url: '',
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.demosite',
                url: '',
                target: '_blank'
              }
            }
          }
        ]
      },
      {
        path: 'work-site',
        data: {
          menu: {
            title: 'general.menu.work-site',
            icon: 'ion-hammer',
            selected: false,
            expanded: true,
            order: 10,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.devops',
                url: '',
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.gitlab',
                url: '',
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.jira',
                url: '',
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.wiki',
                url: '',
                target: '_blank'
              }
            }
          }
        ]
      }
    ]
  }
];
