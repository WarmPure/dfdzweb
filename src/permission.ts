// import router, { constantRoutes } from './router'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { Message } from 'element-ui'
// import { Route } from 'vue-router'
// import { UserModule } from '@/store/modules/login'
// import { PermissionModule } from '@/store/modules/permission'
// import settings from './settings'
// //暂时写死，之后清除
// import Layout from '@/layout/Index.vue'
//
// NProgress.configure({ showSpinner: false })
//
// const whiteList = ['/login', '/register']
//
// const getPageTitle = (key: string) => {
//   const hasKey = key
//   if (hasKey) {
//     const pageName = key
//     return `${pageName} - ${settings.title}`
//   }
//   return `${settings.title}`
// }
//
// router.beforeEach(async(to: Route, _: Route, next: any) => {
//   // Start progress bar
//   NProgress.start()
//   PermissionModule.SetButtonsRole(to.meta.buttons)
//   // Determine whether the user has logged in
//   if (UserModule.token) {
//     if (to.path === '/login') {
//       // If is logged in, redirect to the home page
//       next({ path: '/home' })
//       NProgress.done()
//     } else {
//       // Check whether the user has obtained his permission roles
//         debugger
//       if (UserModule.menus.length === 0 && !router.options.isNew) {
//         try {
//           await UserModule.GetMenus()
//           await UserModule.GetUserInfo()
//           const menus = UserModule.menus
//           //暂时前端写死认证路由
//           let defaultMenus: any = []
//           if(UserModule.userInfo.organizationStatus == 1 && UserModule.menus.length === 0){
//             defaultMenus = [{
//               "id": 99,
//               "parentId": -1,
//               "name": "安全认证",
//               "css": "anquanrenzheng",
//               "url": "",
//               "path": "/safety",
//               "sort": 1,
//               "type": 1,
//               "hidden": false,
//               "showUrl": "",
//               "redirect": "",
//               "pathMethod": null,
//               "subMenus": [
//                 {
//                   "id": 101,
//                   "parentId": 99,
//                   "name": "个人认证",
//                   "css": "gerenrenzheng-2",
//                   "url": "",
//                   "path": "personal",
//                   "sort": 2,
//                   "type": 1,
//                   "hidden": false,
//                   "showUrl": "views/safety/personal/Index.vue",
//                   "redirect": "",
//                   "pathMethod": null,
//                   "subMenus": null,
//                   "roleId": null,
//                   "menuIds": null,
//                   "organizationId": 5,
//                   "buttonMenus": null
//                 },
//                 {
//                   "id": 102,
//                   "parentId": 99,
//                   "name": "补全审核信息",
//                   "css": "",
//                   "url": "",
//                   "path": "/index",
//                   "sort": 2,
//                   "type": 1,
//                   "hidden": false,
//                   "showUrl": "views/index/Index.vue",
//                   "redirect": "",
//                   "pathMethod": null,
//                   "subMenus": null,
//                   "roleId": null,
//                   "menuIds": null,
//                   "organizationId": 5,
//                   "buttonMenus": null
//                 }]
//             }]
//             if(UserModule.userInfo.organization && UserModule.userInfo.organization.organizationProperty == 0){
//               defaultMenus[0].subMenus.unshift({
//                 "id": 100,
//                 "parentId": 99,
//                 "name": "企业认证",
//                 "css": "qiyerenzheng-2",
//                 "url": "",
//                 "path": "enterprise",
//                 "sort": 1,
//                 "type": 1,
//                 "hidden": false,
//                 "showUrl": "views/safety/enterprise/Index.vue",
//                 "redirect": "",
//                 "pathMethod": null,
//                 "subMenus": null,
//                 "roleId": null,
//                 "menuIds": null,
//                 "organizationId": 5,
//                 "buttonMenus": null
//               })
//             }
//           }
//
//           await PermissionModule.GenerateRoutes(defaultMenus.concat(menus));
//           //动态菜单添加
//           // await PermissionModule.GenerateRoutes(menus)
//           router.options.routers = constantRoutes
//           if(PermissionModule.dynamicRoutes.length > 0){
//             PermissionModule.dynamicRoutes.map((item) => {
//                router.options.routes.push(item)
//             })
//             router.addRoutes(PermissionModule.dynamicRoutes)
//           }
//             router.options.isNew = true
//           next({ ...to, replace: true })
//           // next({ to })
//         } catch (err) {
//           // Remove token and redirect to login page
//           UserModule.ResetToken()
//           Message.error(err || 'Has Error')
//           next(`/login`)
//           // next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       } else {
//         next()
//       }
//     }
//   } else {
//     // Has no token
//     if (whiteList.indexOf(to.path) !== -1) {
//       // In the free login whitelist, go directly
//       next()
//     } else {
//       // Other pages that do not have permission to access are redirected to the login page.
//       next(`/login`)
//       // next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })
//
// router.afterEach((to: Route) => {
//   // Finish progress bar
//   NProgress.done()
//
//   // set page title
//   document.title = getPageTitle(to.meta.title)
// })
