import { ChangeEvent, FC } from 'react';
import styles from '../styles/filters.module.scss';
import { Container, Flex, Text, TextField, Box, Slider } from '@radix-ui/themes';
import { CrumpledPaperIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Button } from 'shared';
import { initialState, setFilters } from 'app/redux/desc/descSlice';
import { useAppDispatch, useAppSelector } from 'app/redux/store';
import { useUserMeQuery } from 'app/redux/auth/authThunk';

const Filters: FC = () => {
  const { data } = useUserMeQuery();
  const filters = useAppSelector((state) => state.descSlice.filters);
  const dispatch = useAppDispatch();
  console.log(initialState);

  return (
    <Container mt={'5'}>
      <Flex justify={'between'} align={'end'}>
        <TextField.Root>
          <TextField.Slot>
            <MagnifyingGlassIcon height='16' width='16' />
          </TextField.Slot>
          <TextField.Input
            placeholder='Search the docs…'
            onBlur={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.value && dispatch(setFilters({ ...filters, name: e.target.value }))
            }
          />
        </TextField.Root>
        <Box>
          <Text className={styles.label}>Show packs cards</Text>
          <Flex mt={'1'}>
            <Button
              radius='none'
              className={styles.radioButton}
              variant={filters.authorId ? 'fill' : 'ghost'}
              onClick={() => dispatch(setFilters({ ...filters, authorId: data.id }))}>
              My Cards
            </Button>
            <Button
              className={styles.radioButton}
              radius='none'
              variant={filters.authorId ? 'ghost' : 'fill'}
              onClick={() => dispatch(setFilters({ ...filters, authorId: '' }))}>
              All Cards
            </Button>
          </Flex>
        </Box>
        <Box>
          <Text className={styles.label}>Number of cards</Text>
          <Flex align={'center'} gap={'2'} mt={'1'}>
            <Box className={styles.sliderBox}>{filters.minCardsCount}</Box>
            <Slider
              size={'3'}
              value={[filters.minCardsCount, filters.maxCardsCount]}
              max={10}
              min={0}
              className={styles.slider}
              onValueChange={(e) =>
                dispatch(setFilters({ ...filters, minCardsCount: e[0], maxCardsCount: e[1] }))
              }
            />
            <Box className={styles.sliderBox}>{filters.maxCardsCount}</Box>
          </Flex>
        </Box>
        <Button
          variant='normal'
          radius='small'
          onClick={() => dispatch(setFilters(initialState.filters))}>
          <CrumpledPaperIcon />
          Clear Filter
        </Button>
      </Flex>
    </Container>
  );
};

export default Filters;
