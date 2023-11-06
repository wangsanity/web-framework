export interface IMessages {
  copyright: string;
  deleteConfirm: string;
  invalidParameters: string;
  noData: string;
  notFound: string;
  passwordMismatch: string;
  resetPasswordConfirm: string;
  siteName: string;
  unauthorized: string;
  succeeded: string;
  required: (name: string | string[]) => string;
  invalidFormat: (name: string | string[]) => string;
};
