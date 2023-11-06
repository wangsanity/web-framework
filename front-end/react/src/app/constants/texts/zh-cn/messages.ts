import type { IMessages } from '../messages.i';

export const ZHCNMESSAGES: IMessages = {
  copyright: '版权所有@Colin Wang',
  deleteConfirm: '确定要删除吗？',
  invalidParameters: '无效的参数',
  noData: '没有相关数据',
  notFound: '您访问的页面不存在',
  passwordMismatch: '新密码不一致',
  resetPasswordConfirm: '确定要重置密码吗？',
  siteName: 'Web系统框架',
  unauthorized: '对不起，您没有访问该页面的权限',
  succeeded: '保存成功',
  required: (name: string | string[]) => typeof name === 'string' ? ` ${name} 不得为空.` : ` ${name.join(', ')} 不得为空.`,
  invalidFormat: (name: string | string[]) => typeof name === 'string' ? ` ${name} 不得为空.` : ` ${name.join(', ')} 格式不正确.`,
};
