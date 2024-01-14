import { ChangeEvent, FC, useState } from 'react';
import styles from '../styles/packCard.module.scss';
import { Box, Flex, Table, Text, TextField } from '@radix-ui/themes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Grade, SortableHead } from 'shared';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useAllCardsQuery } from 'app/redux/cards/cardsApi';
import { tableConfigCard } from '../config/configTable';
import clsx from 'clsx';
import { sortingFuncBoolean } from 'shared/sortableCell/utils/sortingFuncBoolean';

export interface IFilters {
  question?: string;
  orderBy?: string;
}

interface IPackCard {
  name: string;
}

const PackCard: FC<IPackCard> = ({ name }) => {
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const [filters, setFilters] = useState<IFilters>({});
  const { data } = useAllCardsQuery({
    id: search.get('id'),
    params: filters,
  });
  const navigate = useNavigate();

  const handleSort = (sortingName: string): void => {
    if (sortingName) {
      setFilters({
        ...filters,
        orderBy: `${sortingName}-${sortingFuncBoolean('asc', filters.orderBy) ? 'desc' : 'asc'}`,
      });
    }
  };

  return (
    <Box>
      <>
        <Flex justify={'between'}>
          <Text className={styles.title}>{name}</Text>
          <Button variant='fill' radius='medium'>
            Add New Card
          </Button>
        </Flex>
        <TextField.Root className={styles.rootInput} mt={'3'}>
          <TextField.Slot className={styles.input}>
            <MagnifyingGlassIcon height='16' width='16' />
          </TextField.Slot>
          <TextField.Input
            placeholder='Input search'
            className={styles.input}
            onBlur={(e: ChangeEvent<HTMLInputElement>) =>
              setFilters((prev) => ({ ...prev, question: e.target.value }))
            }
          />
        </TextField.Root>
        <Table.Root mt={'7'} className={styles.tableRoot}>
          <Table.Header className={styles.header}>
            <Table.Row className={styles.headerRow}>
              {tableConfigCard.map(({ name, sortingName }) => (
                <SortableHead
                  state={filters.orderBy}
                  handleSort={(name: string) => handleSort(name)}
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
                <Table.RowHeaderCell width={200}>{item.question}</Table.RowHeaderCell>
                <Table.Cell width={200}>{item.answer}</Table.Cell>
                <Table.Cell width={200}>{item.updated}</Table.Cell>
                <Table.Cell width={200}>
                  <Grade current={item.grade} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>{' '}
      </>
    </Box>
  );
};

export default PackCard;
