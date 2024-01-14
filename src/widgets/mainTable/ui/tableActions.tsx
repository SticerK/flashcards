import { FC } from 'react';
import styles from '../styles/mainTable.module.scss';
import { Flex } from '@radix-ui/themes';
import { Pencil1Icon, PlayIcon, TrashIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

interface ITableActions {
  id: string;
}

const TableActions: FC<ITableActions> = ({ id }) => {
  const navigate = useNavigate();

  const handleEdit = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    navigate(`edit_pack/${id}`);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    navigate(`delete_pack/${id}`);
  };

  return (
    <Flex gap={'1'} align={'center'}>
      <button className={styles.resetBtn}>
        <PlayIcon className={styles.icon} />
      </button>
      <button className={styles.resetBtn} onClick={handleEdit}>
        <Pencil1Icon className={styles.icon} />
      </button>
      <button className={styles.resetBtn} onClick={handleDelete}>
        <TrashIcon className={styles.icon} />
      </button>
    </Flex>
  );
};

export default TableActions;
