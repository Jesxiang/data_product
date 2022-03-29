/**
 *  created by lllwx
 *  Date: 2021/6/23
 *  Time: 3:48 下午
 *  Version: 1.0
 *  For:
 */

export type MenuType = {
  // 跳转name
  name: string,
  subMenu: MenuType[],
} & Meta
