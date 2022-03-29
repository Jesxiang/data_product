/**
 *  created by lllwx
 *  Date: 2021/6/1
 *  Time: 2:59 下午
 *  Version: 1.0
 *  For: 表格定义
 */

declare namespace KtTable {
  // 表格props 见 https://2x.antdv.com/components/table-cn#API
  interface ITableProps {
    bordered?: boolean;
    tableLayout?: '-' | 'auto' | 'fixed';
    pagination?: boolean;
    rowKey: string | ((record: string, index: string) => string);
    scroll?: { x?: number | true; y?: number };
    rowSelection?: Partial<IRowSelect>;
    size?: 'default' | 'middle' | 'small';
  }

// 表格列 props
  interface ITableSchema {
    title: string;
    align?: 'left' | 'right' | 'center';
    ellipsis?: boolean;
    dataIndex?: string;
    // 可选 true(等效于 left) 'left' 'right'
    fixed?: boolean | string;
    key?: string;
    customRender?: ({ text, index, record }) => void;
    width?: string | number;
    slots?: any;
    scroll?: { x: string | number | boolean; y: string | number | boolean };
    // eslint-disable-next-line @typescript-eslint/ban-types
    sorter?: Function | boolean;
  }

// 行选中
  interface IRowSelect {
    columnWidth: number | string;
    columnTitle: string;
    fixed: boolean;
    hideDefaultSelections: boolean;
    selectedRowKeys: number[];
    type: string;
    onChange: (record, selected) => void;
    onSelect: (record, selected) => void;
    onSelectAll: (selected) => void;
    onSelectInvert: (selectedRows) => void;
  }

  // 分页设置
  type Pagination = {
    disabled: boolean,
    showQuickJumper: boolean,
    showSizeChanger: boolean,
    showCounter: boolean,
    pageSizeOptions: string[],
    hideOnSinglePage: boolean,

    [key: string]: any
  }
}
