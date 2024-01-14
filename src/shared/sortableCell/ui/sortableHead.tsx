import { Table } from '@radix-ui/themes';
import { TriangleUpIcon, TriangleDownIcon } from '@radix-ui/react-icons';
import { FC } from 'react';
import { sortingFuncBoolean } from '../utils/sortingFuncBoolean';

interface ISortableProps {
  sortingName: string;
  className: string;
  state: string;
  handleSort: (name: string) => void;
}

const SortableHead: FC<ISortableProps> = ({
  sortingName,
  className,
  state,
  handleSort,
  children,
}) => {
  return (
    <Table.ColumnHeaderCell onClick={() => handleSort(sortingName)} className={className}>
      {children}{' '}
      {sortingFuncBoolean(sortingName, state) ? (
        sortingFuncBoolean('asc', state) ? (
          <TriangleDownIcon />
        ) : (
          <TriangleUpIcon />
        )
      ) : null}
    </Table.ColumnHeaderCell>
  );
};

export default SortableHead;
