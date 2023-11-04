export interface TableButton {
  buttonText?: string;
  headerText?: string;
  click?: any;
  buttonClass?: string;
  headerClass?: string;
  rowClass?: string;
}

export interface TableOptions {
  checkAllState?: boolean;
  showCheckbox?: boolean;
  alwaysShowHeader?: boolean;
  boldHeader?: boolean;
  simpleStyle?: boolean;
  rowClick?: any;
  buttons?: TableButton[];
  buttonInGroup?: boolean;
  buttonGroupName?: string;
  noRowBackground?: boolean;
  align?: 'center' | 'right' | 'left';
}

export interface TableColumn {
  field?: string;
  headerText?: string;
  maxLength?: number;
  hidden?: boolean;
  headerClass?: string;
  rowClass?: string;
  dataType?: string;
  format?: string;
  click?: any;
  urlBase?: string;
  urlParam?: string;
  urlTarget?: string;
  bindHtml?: boolean;
  image?: boolean;
  tooltip?: string;
  template?: any;
}
