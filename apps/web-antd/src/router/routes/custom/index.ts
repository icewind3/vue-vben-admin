import type { RouteRecordStringComponent } from '@vben/types';

import { $t } from '@vben/locales';

export const getAllRoutes: () => RouteRecordStringComponent[] = () => {
  return [
    {
      component: 'BasicLayout',
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        order: 1,
        title: '概览',
        icon: 'lucide:layout-dashboard',
      },
      children: [
        {
          name: 'Analytics',
          path: '/analytics',
          component: '/dashboard/analytics/index',
          meta: {
            authority: ['admin'],
            affixTab: true,
            icon: 'lucide:area-chart',
            title: $t('page.dashboard.analytics'),
          },
        },
        {
          name: 'Workspace',
          path: '/workspace',
          component: '/dashboard/workspace/index',
          meta: {
            authority: ['admin2'],
            icon: 'carbon:workspace',
            title: $t('page.dashboard.workspace'),
          },
        },
      ],
    },
  ];
};

// export const filterRoutes = (
//   allRoutes: RouteRecordStringComponent[],
//   result: MenuItem[],
// ) => {
//   let accessRoutes: RouteRecordStringComponent[] = [];
//   // 递归检查是否存在 route.meta?.access属性 存在就存到accessRoutes,数据结构保持一致
//   allRoutes.forEach((route) => {
//     const { children, meta, ...rest } = route;
//     const item = result.find((r) => r.gncdid === meta?.accessCode);

//     if (meta?.hideInMenu) {
//       accessRoutes.push({
//         ...rest,
//         meta: {
//           ...meta,
//           title: meta.title,
//         },
//         children: children ? filterRoutes(children, result) : undefined,
//       });
//     } else if (meta?.accessCode === 'ignoreAccess') {
//       accessRoutes.push({
//         ...rest,
//         meta: {
//           ...meta,
//           title: meta.title,
//         },
//         children: children ? filterRoutes(children, result) : undefined,
//       });
//     } else if (item) {
//       accessRoutes.push({
//         ...rest,
//         meta: {
//           ...meta,
//           title: item.cdmc,
//         },
//         children: children ? filterRoutes(children, result) : undefined,
//       });
//     }
//   });
//   accessRoutes = accessRoutes.filter((e) => {
//     return e.children === undefined || e.children.length > 0;
//   });

//   return accessRoutes;
// };
