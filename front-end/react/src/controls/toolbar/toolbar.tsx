import React from 'react';
import { useAppState } from '../../contexts/app-context';
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
  const { controlsText } = useAppState();
  const onClick = (buttonName: string) => {
    clickEvent && clickEvent(buttonName);
  };

  return (
    <div className="ctr-tool-bar">
      {buttons.new === false ? null : (
        <span className="button-box" onClick={() => onClick('new')}>
          <i className="fa fa-plus-square-o"></i>
          <span className="button-text">{controlsText.new}</span>
        </span>
      )}
      {!buttons.settings ? null : (
        <span className="button-box" onClick={() => onClick('settings')}>
          <i className="fa fa-cog"></i>
          <span className="button-text">{controlsText.settings}</span>
        </span>
      )}
      {!buttons.chart ? null : (
        <span className="button-box" onClick={() => onClick('chart')}>
          <i className="fa fa-bar-chart"></i>
          <span className="button-text">{controlsText.statistics}</span>
        </span>
      )}
    </div>
  );
};
