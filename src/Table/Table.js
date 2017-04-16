import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import TableHeader from './TableHeader/TableHeader';
import {
  SORTS,
  largeColumn,
  midColumn,
  smallColumn
} from './Table.consts';

class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };

    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({
      sortKey,
      isSortReverse
    });
  }

  render() {
    const {list, onDismiss} = this.props;
    const {sortKey, isSortReverse} = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList

    return (

      <div className="table">
        <TableHeader onSort={this.onSort} sortKey={sortKey} />
        {reverseSortedList.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={largeColumn}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={midColumn}>{item.author}</span>
            <span style={smallColumn}>{item.num_comments}</span>
            <span style={smallColumn}>{item.points}</span>
            <span style={smallColumn}>
              <Button onClick={() => onDismiss(item.objectID)} type="button" className="button-inline">
                Dismiss
              </Button>
            </span>
          </div>
        )}
      </div>
    );
  };
}
;
Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
  sortKey: PropTypes.string,
  onSort: PropTypes.func
};

export default Table;