import React, { useCallback, useEffect, useState } from 'react';
import './page-bar.scss';

export interface PageOptions {
  itemCount?: number;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface PageBarProps {
  options?: PageOptions;
  changeEvent?: (options: PageOptions) => void;
}

export const PageBar = ({ options, changeEvent }: PageBarProps) => {
  const [pre, setPre] = useState(0);
  const [pre2, setPre2] = useState(0);
  const [next, setNext] = useState(0);
  const [next2, setNext2] = useState(0);
  const [itemInfo, setItemInfo] = useState('');
  const [pageOptions, setPageOptions] = useState<PageOptions>({
    itemCount: 0,
    pageCount: 0,
    pageIndex: 1,
    pageSize: 20,
  });
  const [pageNumber, setPageNumber] = useState<number | string>(0);
  const [pageSizes] = useState([10, 20, 50, 100, 500]);
  const [pageInfo, setPageInfo] = useState('');

  const updatePage = useCallback(
    (currentPage: number, currentPageOptions: PageOptions) => {
      let newPageOptions = currentPageOptions;
      const pageSize = Number(newPageOptions.pageSize) - 0;
      if (pageSize <= 0 || currentPage <= 0) {
        return;
      }

      if (!currentPage) {
        setPageNumber('');
      } else {
        newPageOptions.pageIndex = currentPage;
        setPageOptions(newPageOptions);
      }
      newPageOptions.pageCount = Math.ceil(
        Number(newPageOptions.itemCount) / pageSize
      );
      setPageInfo(
        newPageOptions.itemCount === 0
          ? '0/0'
          : newPageOptions.pageIndex + '/' + newPageOptions.pageCount
      );
      const current = Number(newPageOptions.pageIndex) - 1;
      const to =
        pageSize * (current + 1) > Number(newPageOptions.itemCount)
          ? newPageOptions.itemCount
          : pageSize * (current + 1);
      setPre(Number(newPageOptions.pageIndex) - 1);
      setPre2(Number(newPageOptions.pageIndex) - 2);
      setNext(Number(newPageOptions.pageIndex) + 1);
      setNext2(Number(newPageOptions.pageIndex) + 2);
      setItemInfo(
        newPageOptions.itemCount === 0
          ? '0/0'
          : current * pageSize + 1 + '-' + to + ' / ' + newPageOptions.itemCount
      );
    },
    []
  );

  const initiatize = useCallback(
    (currentPageOptions: PageOptions) => {
      setPageOptions({ ...currentPageOptions, ...options });
      updatePage(Number(currentPageOptions.pageIndex), currentPageOptions);
    },
    [options, updatePage]
  );

  useEffect(() => {
    initiatize(pageOptions);
  }, [initiatize, pageOptions]);

  const goPage = () => {
    if (!isNaN(pageNumber as number)) {
      if (
        Number(pageNumber) - 0 > Number(pageOptions.pageCount) ||
        Number(pageNumber) - 0 < 1 ||
        Number(pageNumber) - 0 === pageOptions.pageIndex
      ) {
        return;
      }
      selectPage(Number(pageNumber) - 0);
    }
  };

  const selectPage = (currentPage: number = 0, forceUpdate = false) => {
    if (
      !forceUpdate &&
      (pageOptions.itemCount === 0 ||
        currentPage === pageOptions.pageIndex ||
        currentPage > Number(pageOptions.pageCount) ||
        currentPage < 1)
    ) {
      return;
    }
    updatePage(currentPage, pageOptions);
    changeEvent && changeEvent({ ...pageOptions });
  };

  const updatePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      setPageOptions({ ...pageOptions, pageSize: Number(event.target.value) });
      selectPage(1, true);
    }
  };

  return (
    <div className="page-bar">
      <div className="pagination">
        <span className="xs-hidden page-button" onClick={() => selectPage(1)}>
          <span>&lt;&lt;</span>
        </span>
        <span className="page-button" onClick={() => selectPage(pre)}>
          <span>&lt;</span>
        </span>
        {pre2 <= 0 ? null : (
          <span
            className="xs-hidden page-button"
            onClick={() => selectPage(pre2)}
          >
            <span>{pre2}</span>
          </span>
        )}
        {pre <= 0 ? null : (
          <span className="page-button" onClick={() => selectPage(pre)}>
            <span>{pre}</span>
          </span>
        )}
        <span className="active page-button">
          <span onClick={() => selectPage(pageOptions.pageIndex)}>
            {pageOptions.pageIndex}
          </span>
        </span>
        {next > Number(pageOptions.pageCount) ? null : (
          <span className="page-button" onClick={() => selectPage(next)}>
            <span>{next}</span>
          </span>
        )}
        {next2 > Number(pageOptions.pageCount) ? null : (
          <span
            className="xs-hidden page-button"
            onClick={() => selectPage(next2)}
          >
            <span>{next2}</span>
          </span>
        )}
        <span className="page-button" onClick={() => selectPage(next)}>
          <span>&gt;</span>
        </span>
        <span
          className="xs-hidden page-button"
          onClick={() => selectPage(pageOptions.pageCount)}
        >
          <span>&gt;&gt;</span>
        </span>
        <span>
          <input
            v-model="pageNumber"
            type="number"
            step="1"
            className="input-number"
            onKeyUp={(e) => e.keyCode === 13 && goPage()}
          />
          <span className="go-button" onClick={() => goPage()}>
            Go
          </span>
        </span>
        <span>
          <span>
            <select
              onChange={(e) => updatePageSize(e)}
              defaultValue={pageOptions.pageSize}
              className="page-size"
            >
              {pageSizes.map((pageSize, index) => (
                <option key={index} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </span>
        </span>
        <span>
          <span
            style={{
              paddingLeft: '10px',
              paddingRight: '10px',
              cursor: 'default',
            }}
          >
            {pageInfo}
          </span>
        </span>
        <span className="xs-hidden">
          <span
            style={{
              paddingLeft: '10px',
              paddingRight: '10px',
              cursor: 'default',
            }}
          >
            {itemInfo}
          </span>
        </span>
      </div>
    </div>
  );
};
