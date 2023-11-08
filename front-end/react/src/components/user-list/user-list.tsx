import React, { useCallback, useEffect, useState } from 'react';
import { Table, PageBar, Dialog, Toolbar, PageOptions } from '../../controls';
import { ComSearch, ComUserProfile } from '..';
import { UserBusiness } from '../../business';
import { TableButton, TableColumn } from '../../controls/table/table.interface';
import { QueryFilters, User, UserList } from '../../models';
import { useAppContext } from '../../contexts/app-context';
import './user-list.scss';

export interface ComUserListProps {
  toolbarEvent?: (type: string) => void;
  isLoading?: boolean;
  showToolbar?: boolean;
  buttons?: TableButton[];
  columns?: TableColumn[];
  filters?: QueryFilters;
  instance?: (params: { getList: (rebind?: boolean) => void }) => void;
}

export const ComUserList = ({
  buttons,
  columns,
  filters,
  toolbarEvent,
  showToolbar,
  instance,
}: ComUserListProps) => {
  const { controlsText } = useAppContext();
  const [tableOptions] = useState({ buttons: buttons || [] });
  const [tableColumns] = useState(
    columns?.length
      ? columns
      : [
          {
            headerText: controlsText.loginName,
            field: 'loginName',
            click: (item: User) => {
              showDetail(item);
            },
          },
          { headerText: controlsText.fullName, field: 'fullName' },
          { headerText: controlsText.department, field: 'department' },
          { headerText: controlsText.birthday, field: 'birthDate' },
          { headerText: controlsText.email, field: 'email' },
          { headerText: controlsText.remark, field: 'remark' },
        ]
  );
  const [list, setList] = useState<User[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [currentItem, setCurrentItem] = useState<User>({} as User);
  const [pageBarOptions, setPageBarOptions] = useState<PageOptions>({
    itemCount: 0,
    pageIndex: 1,
    pageSize: 20,
  });
  const [queryFilters, setQueryFilters] = useState({ ...filters });

  const getList = useCallback(
    (rebind = false) => {
      if (rebind) {
        setPageBarOptions((p) => {
          return { ...p, pageIndex: 1 };
        });
      }

      setLoading(true);
      UserBusiness.getList(queryFilters).then(
        (data: UserList) => {
          setLoading(false);
          setSearching(false);
          setList(data.list);
          setPageBarOptions((p) => {
            return { ...p, itemCount: data.count };
          });
        },
        () => {
          setLoading(false);
          setSearching(false);
        }
      );
    },
    [queryFilters]
  );

  useEffect(() => {
    getList();
  }, [getList]);

  const showDetail = (item: User) => {
    setCurrentItem(item);
    setDialogVisible(true);
  };

  const onSearch = (filters: QueryFilters) => {
    setQueryFilters({ ...filters, ...queryFilters, pageIndex: 1 });
    setSearching(true);
    getList(true);
  };

  const onPageUpdate = (options: PageOptions) => {
    setQueryFilters({
      ...filters,
      pageIndex: options.pageIndex,
      pageSize: options.pageSize,
    });
    setPageBarOptions(options);
    getList();
  };

  const onToolbarClick = (type: string) => {
    toolbarEvent && toolbarEvent(type);
  };

  instance && instance({ getList });

  return (
    <div className="com-user-list">
      <div className="search-toolbar-wrapper">
        <ComSearch isLoading={searching} searchEvent={onSearch}></ComSearch>
        {!showToolbar ? null : (
          <Toolbar clickEvent={onToolbarClick.bind(this)}></Toolbar>
        )}
      </div>
      <div>
        <Table
          data={list}
          columns={tableColumns}
          options={tableOptions}
          isLoading={loading}
        ></Table>
      </div>
      <div className="page-bar-wrapper">
        <PageBar
          options={pageBarOptions}
          changeEvent={(e) => onPageUpdate(e)}
        ></PageBar>
      </div>
      <Dialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        title={controlsText.userProfile}
      >
        <ComUserProfile item={currentItem}></ComUserProfile>
      </Dialog>
    </div>
  );
};
