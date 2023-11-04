import { TextService } from '../utils';
import { type TreeNode } from '@/controls';
import { type HttpOptions } from '@/models';
import { HttpRequestService } from './base/http-request.service';

const getApi = (url: string) => 'api/system/' + url;
const apis = {
  readMe: getApi('readme')
};
export class SystemBusiness {
  static getReadMe(): Promise<string> {
    const options: HttpOptions = {
      url: apis.readMe
    };
    return HttpRequestService.get(options);
  }

  static getSystemMenus(): TreeNode[] {
    const menusZHCN: TreeNode[] = [
      {
        id: '1',
        name: '用户管理',
        icon: 'fa fa-user',
        iconColor: '#bf9a44',
        children: [
          {
            id: '11',
            name: '用户管理',
            url: '/users'
          },
          { id: '12', name: '角色管理', url: '/roles' },
          { id: '13', name: '用户角色', url: '/userroles' },
          { id: '14', name: '修改密码', url: '/password' },
          { id: '15', name: '个人信息', url: '/userprofile' }
        ]
      },
      {
        id: '2',
        name: '系统管理',
        icon: 'fa fa-cog',
        children: [
          { id: '21', name: '菜单设置' },
          { id: '22', name: '登录日志' },
          { id: '23', name: '权限测试', url: '/unthorizationtest' }
        ]
      },
      { id: '3', name: '公司新闻', icon: 'fa fa-television', iconColor: '#4f63f5' },
      { id: '4', name: '工作日志', icon: 'fa fa-calendar-check-o', iconColor: '#24829f' },
      {
        id: '5',
        name: '多级菜单',
        children: [
          { id: '11', name: '测试数据' },
          { id: '12', name: '测试数据' },
          { id: '13', name: '测试数据' },
          { id: '14', name: '测试数据' },
          {
            id: '15',
            name: '测试数据',
            children: [
              { id: '11', name: '测试数据' },
              { id: '12', name: '测试数据' },
              { id: '13', name: '测试数据' },
              { id: '14', name: '测试数据' },
              { id: '15', name: '测试数据' }
            ]
          }
        ]
      }
    ];

    const menusENUS: TreeNode[] = [
      {
        id: '1',
        name: 'Users Settings',
        icon: 'fa fa-user',
        iconColor: '#bf9a44',
        children: [
          {
            id: '11',
            name: 'Users',
            url: '/users'
          },
          { id: '12', name: 'Roles', url: '/roles' },
          { id: '13', name: 'User Roles', url: '/userroles' },
          { id: '14', name: 'Modify Password', url: '/password' },
          { id: '15', name: 'My Profile', url: '/userprofile' }
        ]
      },
      {
        id: '2',
        name: 'System Settings',
        icon: 'fa fa-cog',
        children: [
          { id: '21', name: 'Menus Settings Long Name Long Name' },
          { id: '22', name: 'Login logs' },
          { id: '23', name: 'Unauthoried test', url: '/unthorizationtest' }
        ]
      },
      { id: '3', name: 'News', icon: 'fa fa-television', iconColor: '#4f63f5' },
      { id: '4', name: 'Working Log', icon: 'fa fa-calendar-check-o', iconColor: '#24829f' },
      {
        id: '5',
        name: 'Demo',
        children: [
          { id: '51', name: 'Demo' },
          { id: '52', name: 'Demo' },
          { id: '53', name: 'Demo' },
          { id: '54', name: 'Demo' },
          {
            id: '515',
            name: 'Demo',
            children: [
              { id: '11', name: 'Demo' },
              { id: '12', name: 'Demo' },
              { id: '13', name: 'Demo' },
              { id: '14', name: 'Demo' },
              { id: '15', name: 'Demo' }
            ]
          }
        ]
      }
    ];

    return TextService.getLanguage().name === 'en-us' ? menusENUS : menusZHCN;
  }
}
