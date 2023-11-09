import React, { useCallback, useContext, useEffect, useState } from 'react';
import { type TableOptions, type TableColumn } from './table.interface';
import { FormatService } from '../../utils';
import { useAppState } from '../../contexts/app-context';
import './table.scss';
import Image from 'next/image';
import Link from 'next/link';

export interface TableProps {
  isLoading?: boolean;
  data?: any[];
  columns?: TableColumn[];
  options?: TableOptions;
}

export const Table = ({
  options = {},
  columns = [],
  data = [],
  isLoading,
}: TableProps) => {
  const { controlsText, messagesText } = useAppState();
  const [tableOptions, setTableOptions] = useState<TableOptions>(options);
  const [tableData, setTableData] = useState(data);

  const update = useCallback(() => {
    const tableColumns = columns || [];
    const tempData = data ? JSON.parse(JSON.stringify(data)) : [];
    let newTableOptions = tableOptions;

    if (newTableOptions.alwaysShowHeader !== false) {
      newTableOptions.alwaysShowHeader = true;
    }

    if (newTableOptions.buttonInGroup !== false) {
      newTableOptions.buttonInGroup = true;
    }

    if (tableColumns.length > 0) {
      let tempString = '';
      for (let i = 0; i < columns.length; i++) {
        if (tableColumns[i].template) {
          tempString = tableColumns[i].template;
          if (tempData && tempData.length > 0) {
            for (let j = 0; j < tempData.length; j++) {
              for (let m = 0; m < tableColumns.length; m++) {
                tempString = tempString.replace(
                  '{' + columns[m].field + '}',
                  tempData[j][String(tableColumns[m].field)]
                );
              }
              tempData[j][String(tableColumns[i].field)] = tempString;
            }
          }
        }
      }
    }

    setTableOptions(newTableOptions);
    setTableData(tempData);
  }, [columns, tableOptions, data]);

  useEffect(() => {
    update();
  }, [update]);

  const checkAll = () => {
    let newTableOptions = tableOptions;
    let newTableData = tableData;
    newTableOptions.checkAllState = !newTableOptions.checkAllState;
    let allChecked = true;
    for (let i = 0; i < newTableData?.length; i++) {
      if (!newTableData[i].checkState) {
        allChecked = false;
        break;
      }
    }
    for (let i = 0; i < newTableData?.length; i++) {
      newTableData[i].checkState = !allChecked;
    }
    setTableOptions({ ...newTableOptions });
    setTableData([...newTableData]);
  };

  const checkOne = (item: any) => {
    item.checkState = !item.checkState;
    let allChecked = true;
    for (let i = 0; i < tableData?.length; i++) {
      if (!tableData[i].checkState) {
        allChecked = false;
        break;
      }
    }
    setTableOptions({ ...tableOptions, checkAllState: allChecked });
    setTableData([...tableData]);
  };

  const onHeaderClick = (header: TableColumn) => {
    if (header) {
      if (header.click) {
        header.click(header);
      }
    }
  };

  const onRowClick = (item: any) => {
    tableOptions.rowClick && tableOptions.rowClick(item);
  };

  if (!tableOptions) {
    return null;
  }
  const thead = (
    <thead
      className={[
        tableOptions.simpleStyle ? 'simple-header' : '',
        tableOptions.alwaysShowHeader || (tableData && tableData.length > 0)
          ? ''
          : 'hidden',
      ].join(' ')}
    >
      <tr className={'align-' + (tableOptions?.align || 'center')}>
        <th className={tableOptions.showCheckbox ? '' : 'hidden'}>
          <input
            onClick={() => checkAll()}
            value={String(tableOptions.checkAllState)}
            type="checkbox"
          />
        </th>
        {(columns || []).map((item, index) => (
          <th
            key={index}
            className={
              (item.click ? 'link-style ' : '') +
              (item.hidden ? ' hidden' : '') +
              (item.headerClass ? item.headerClass : '')
            }
            onClick={() => onHeaderClick(item)}
          >
            {item.headerText}
          </th>
        ))}
        {tableOptions.buttonInGroup && options.buttons?.length ? (
          <th>{tableOptions.buttonGroupName || controlsText.operation}</th>
        ) : (
          (options.buttons || []).map((button, index) => (
            <th key={index} className={button.headerClass}>
              {button.headerText}
            </th>
          ))
        )}
      </tr>
    </thead>
  );
  const tbody = (
    <tbody>
      {(tableData || []).map((item, index) => (
        <tr
          className={[
            'align-' + (tableOptions.align || 'center'),
            index % 2 === 0 ||
            tableOptions.noRowBackground ||
            tableOptions.simpleStyle
              ? ''
              : 'even-row',
          ].join(' ')}
          key={index}
          onClick={() => onRowClick(item)}
        >
          <td className={tableOptions.showCheckbox ? '' : 'hidden'}>
            <input
              type="checkbox"
              onClick={() => checkOne(item)}
              value={item.checkState}
            />
          </td>
          {(columns || []).map((header, index) => (
            <td key={index} className={header.hidden ? 'hidden' : ''}>
              {header.urlBase && !header.bindHtml && !header.image ? (
                <div className="header.rowClass">
                  <a
                    href={
                      header.urlBase +
                      (header.urlParam ? item[header.urlParam] : '')
                    }
                    target={header.urlTarget ? header.urlTarget : '_parent'}
                  >
                    {item[String(header.field)]}
                  </a>
                </div>
              ) : null}
              {!header.urlBase &&
              !header.bindHtml &&
              !header.click &&
              (header.dataType === 'datetime' || header.dataType === 'date') ? (
                <div className="header.rowClass">
                  {FormatService.formatDate(
                    item[String(header.field)],
                    header.format ||
                      (header.dataType === 'date'
                        ? 'yyyy-MM-dd'
                        : 'yyyy-MM-dd hh:mm:ss')
                  )}
                </div>
              ) : null}
              {!header.urlBase &&
              !header.bindHtml &&
              header.click &&
              header.dataType !== 'date' &&
              header.dataType !== 'datetime' ? (
                <div className="header.rowClass">
                  <span
                    className="link-button"
                    onClick={() => header.click(item)}
                  >
                    {header.maxLength &&
                    item[String(header.field)] &&
                    item[String(header.field)]?.length > header.maxLength
                      ? item[String(header.field)].substr(0, header.maxLength) +
                        '...'
                      : item[String(header.field)]}
                  </span>
                </div>
              ) : null}
              {!header.urlBase &&
              !header.bindHtml &&
              !header.click &&
              !header.image &&
              header.dataType !== 'date' &&
              header.dataType !== 'datetime' ? (
                <div className="header.rowClass">
                  {header.maxLength &&
                  item[String(header.field)] &&
                  item[String(header.field)]?.length > header.maxLength
                    ? item[String(header.field)].substr(0, header.maxLength) +
                      '...'
                    : item[String(header.field)]}
                </div>
              ) : null}
              {!header.urlBase && !header.bindHtml && header.image ? (
                <div
                  className={header.rowClass}
                  onClick={() => header.click(item)}
                >
                  <Image
                    title={item[String(header.tooltip)]}
                    src={item[String(header.field)]}
                    alt=""
                  />
                </div>
              ) : null}
              {header.bindHtml ? (
                <div
                  className="header.rowClass"
                  onClick={() => header.click(item)}
                  dangerouslySetInnerHTML={{
                    __html: item[String(header.field)],
                  }}
                ></div>
              ) : null}
            </td>
          ))}
          {tableOptions.buttonInGroup && options.buttons?.length ? (
            <td className="button-column">
              {(options.buttons || []).map((button, index) =>
                button.url ? (
                  <Link className="link-button" key={index} href={button.url}>
                    {button.buttonText}
                  </Link>
                ) : (
                  <span
                    className="link-button"
                    key={index}
                    onClick={() => button.click && button.click(item)}
                  >
                    {button.buttonText}
                  </span>
                )
              )}
            </td>
          ) : (
            options.buttons?.map((button, index) => (
              <td className={'button-column ' + button.rowClass} key={index}>
                {button.url ? (
                  <Link className="link-button" key={index} href={button.url}>
                    {button.buttonText}
                  </Link>
                ) : (
                  <span
                    className="link-button"
                    onClick={() => button.click && button.click(item)}
                  >
                    {button.buttonText}
                  </span>
                )}
              </td>
            ))
          )}
        </tr>
      ))}
    </tbody>
  );

  const loadingElement = !isLoading ? null : (
    <div className="loading">
      <Image src="/assets/images/loading.gif" width={20} height={20} alt="" />
    </div>
  );

  const noDay =
    loadingElement || tableData?.length ? null : (
      <div className="no-data">{messagesText.noData}</div>
    );

  return (
    <div className="ctr-table">
      {tableOptions.alwaysShowHeader || tableData?.length ? (
        <div
          className={[
            tableOptions.noRowBackground && !tableOptions.simpleStyle
              ? 'table-border'
              : '',
          ].join(' ')}
        >
          <table
            cellSpacing="0"
            className={
              (tableOptions.boldHeader ? '' : 'normal-font ') +
              'table table-hover'
            }
          >
            {thead}
            {tableData && !loadingElement ? tbody : null}
          </table>
        </div>
      ) : null}
      {loadingElement}
      {noDay}
    </div>
  );
};
