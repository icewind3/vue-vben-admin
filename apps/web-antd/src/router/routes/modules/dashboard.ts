import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   meta: {
  //     icon: 'lucide:layout-dashboard',
  //     order: -1,
  //     title: $t('page.dashboard.title'),
  //   },
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   children: [
  //     {
  //       name: 'Analytics',
  //       path: '/analytics',
  //       component: () => import('#/views/dashboard/analytics/index.vue'),
  //       meta: {
  //         order: 1000,
  //         affixTab: true,
  //         icon: 'lucide:area-chart',
  //         title: $t('page.dashboard.analytics'),
  //       },
  //     },
  //     {
  //       name: 'Workspace',
  //       path: '/workspace',
  //       component: () => import('#/views/dashboard/workspace/index.vue'),
  //       meta: {
  //         order: 1,
  //         // authority: ['admin2'],
  //         icon: 'carbon:workspace',
  //         title: $t('page.dashboard.workspace'),
  //       },
  //     },
  //   ],
  // },
  // {
  //   meta: {
  //     icon: 'lucide:layout-dashboard',
  //     order: -4,
  //     title: '概览2',
  //   },
  //   name: 'Dashboard2',
  //   path: '/dashboard2',
  //   children: [
  //     {
  //       name: 'Analytics2',
  //       path: '/analytics2',
  //       component: () => import('#/views/dashboard/analytics/index.vue'),
  //       meta: {
  //         order: -1,
  //         affixTab: true,
  //         icon: 'lucide:area-chart',
  //         title: $t('page.dashboard.analytics'),
  //       },
  //     },
  //     {
  //       name: 'Workspace2',
  //       path: '/workspace2',
  //       component: () => import('#/views/dashboard/workspace/index.vue'),
  //       meta: {
  //         order: -9,
  //         // authority: ['admin2'],
  //         icon: 'carbon:workspace',
  //         title: $t('page.dashboard.workspace'),
  //       },
  //     },
  //   ],
  // },
];

export default routes;
