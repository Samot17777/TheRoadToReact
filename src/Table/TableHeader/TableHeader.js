import React from 'react';
import Sort from '../../Sort/Sort';

import {
  largeColumn,
  midColumn,
  smallColumn
} from './TableHeader.consts';

const TableHeader = ({onSort, sortKey}) => (
  <div className="table-header">
    <span style={largeColumn}>
      <Sort sortKey={'TITLE'} onSort={onSort} activeSortKey={sortKey}>
        Title
      </Sort>
    </span>
    <span style={midColumn}>
      <Sort sortKey={'AUTHOR'} onSort={onSort} activeSortKey={sortKey}>
        Author
      </Sort>
    </span>
    <span style={smallColumn}>
      <Sort sortKey={'COMMENTS'} onSort={onSort} activeSortKey={sortKey}>
        Comments
      </Sort>
    </span>
    <span style={smallColumn}>
      <Sort sortKey={'POINTS'} onSort={onSort} activeSortKey={sortKey}>
        Points
      </Sort>
    </span>
    <span style={smallColumn}>
      Archive
    </span>
  </div>
);

export default TableHeader;