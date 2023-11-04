import type { QueryFilters } from '../../models';

export const getFilters = (filters: QueryFilters): string => {
  if (!filters) {
    return '';
  }

  let result = '';
  if (filters.keyword) {
    result += '&keyword=' + filters.keyword;
  }
  if (filters.searchField) {
    result += '&searchField=' + filters.searchField;
  }
  if (filters.roleId) {
    result += '&roleId=' + filters.roleId;
  }
  if (filters.startDate) {
    result += '&startDate=' + filters.startDate;
  }
  if (filters.endDate) {
    result += '&endDate=' + filters.endDate;
  }
  if (Number(filters.pageSize) > 0) {
    result += '&pageSize=' + filters.pageSize;
  }
  if (Number(filters.pageIndex) > 0) {
    result += '&pageIndex=' + filters.pageIndex;
  }

  if (result) {
    return '?' + result.substr(1);
  } else {
    return result;
  }
};
