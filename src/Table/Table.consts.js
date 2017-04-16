import {sortBy} from 'lodash';
import {
  largeColumn,
  midColumn,
  smallColumn
} from './TableHeader/TableHeader.consts';

export const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse()
};

export {
  largeColumn,
  midColumn,
  smallColumn
};