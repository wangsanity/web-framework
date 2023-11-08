import React, { useState } from 'react';
import { Button, Input } from '../../controls';
import { TextService } from '../../utils';
import { QueryFilters } from '../../models';
import './search.scss';

export interface ComSearchProps {
  searchEvent?: (queryFilters: QueryFilters) => void;
  isLoading?: boolean;
}

export const ComSearch = ({ searchEvent, isLoading }: ComSearchProps) => {
  const controlsText = TextService.controls;
  const [keyword, setKeyword] = useState('');

  const onSearch = () => {
    searchEvent && searchEvent({ keyword });
  };

  return (
    <div className="com-search">
      <span className="search-item">
        <span className="search-label">{controlsText.keyword}:</span>
        <span className="search-control">
          <Input
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={controlsText.keyword}
            onKeyUp={(e) => e.keyCode === 13 && onSearch()}
          ></Input>
        </span>
      </span>
      <span className="search-item">
        <Button state={isLoading ? 3 : 1} onClick={onSearch}>
          {controlsText.search}
        </Button>
      </span>
    </div>
  );
};
