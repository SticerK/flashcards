// import { Table } from '@radix-ui/themes';
import { FC } from 'react';
import styles from '../styles/mainTable.module.scss';
import { tableConfig } from '../config/tableConfig';
import { useDeckQuery } from 'app/redux/desc/descApi';
import { Loader, SortableHead } from 'shared';
import { useAppDispatch, useAppSelector } from 'app/redux/store';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Table } from '@radix-ui/themes';
import { setFilters } from 'app/redux/desc/descSlice';
import { sortingFuncBoolean } from 'shared/sortableCell/utils/sortingFuncBoolean';
import TableActions from './tableActions';

const MainTable: FC = () => {
  const { filters } = useAppSelector((state) => state.descSlice);
  const { data, isLoading } = useDeckQuery(filters);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSort = (sortingName: string): void => {
    if (sortingName) {
      dispatch(
        setFilters({
          ...filters,
          orderBy: `${sortingName}-${sortingFuncBoolean('asc', filters.orderBy) ? 'desc' : 'asc'}`,
        })
      );
    }
  };

  return (
    <>
      {isLoading && <Loader className={styles.loader} />}
      <Table.Root mt={'7'} className={styles.tableRoot}>
        <Table.Header className={styles.header}>
          <Table.Row className={styles.headerRow}>
            {tableConfig.map(({ name, sortingName }) => (
              <SortableHead
                handleSort={(name) => handleSort(name)}
                state={filters.orderBy}
                key={name}
                sortingName={sortingName}
                className={clsx(styles[sortingName], { [styles.pointer]: sortingName })}>
                {name}
              </SortableHead>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.items.map((item) => (
            <Table.Row
              key={item.id}
              onClick={() => navigate(`/card?id=${item.id}`)}
              className={styles.row}>
              <Table.RowHeaderCell>{item.name}</Table.RowHeaderCell>
              <Table.Cell>{item.cardsCount}</Table.Cell>
              <Table.Cell>{item.updated}</Table.Cell>
              <Table.Cell>{item.author.name}</Table.Cell>
              <Table.Cell>
                <TableActions id={item.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default MainTable;
