import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import nprogress from 'nprogress';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index.vue'),
    redirect: 'data-center',
    children: [
      {
        path: '/data-center',
        name: 'DataCenter',
        component: () => import('@/views/data-center/index.vue'),
        meta: {
          title: '数据看板',
          breadcrumb: true,
          img: 'data-screen',
          selectImg: 'data-screen-select',
        },
      },
    ],
  },
];

const generateMenusByRoutes = (childRoutes: RouteRecordRaw[]) => {
  return childRoutes.map(_ => {
    return {
      ..._.meta,
      name: _.name || _.redirect,
      subMenu: generateMenusByRoutes(_.children || []),
    };
  });
};

export const Menus = generateMenusByRoutes(routes[0].children || []);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
  nprogress.done();
});

export default router;
