import React from 'react';
import { TextService } from '../../utils';
import './toolbar.scss';

export interface ToolbarProps {
  buttons?: {
    new?: boolean;
    settings?: boolean;
    chart?: boolean;
  };
  clickEvent?: (buttonName: string) => void;
}

export const Toolbar = ({
  buttons = {
    new: true,
  },
  clickEvent,
}: ToolbarProps) => {
  const onClick = (buttonName: string) => {
    clickEvent && clickEvent(buttonName);
  };

  return (
    <div className="ctr-tool-bar">
      {buttons.new === false ? null : (
        <span className="button-box" onClick={() => onClick('new')}>
          <i className="fa fa-plus-square-o"></i>
          <span className="button-text">{TextService.controls.new}</span>
        </span>
      )}
      {!buttons.settings ? null : (
        <span className="button-box" onClick={() => onClick('settings')}>
          <i className="fa fa-cog"></i>
          <span className="button-text">{TextService.controls.settings}</span>
        </span>
      )}
      {!buttons.chart ? null : (
        <span className="button-box" onClick={() => onClick('chart')}>
          <i className="fa fa-bar-chart"></i>
          <span className="button-text">{TextService.controls.statistics}</span>
        </span>
      )}
    </div>
  );
};
