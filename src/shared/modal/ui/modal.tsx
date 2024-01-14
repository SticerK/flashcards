import * as React from 'react';
import styles from '../styles/modal.module.scss';
import { Dialog, Flex } from '@radix-ui/themes';
import clsx from 'clsx';
import { ModalInteface } from 'widgets/header/types/types';

export interface ModalProps extends ModalInteface {
  title?: string;
  titleCenter?: boolean;
  className?: string;
}

const TransitionsModal: React.FC<ModalProps> = ({
  title,
  children,
  titleCenter,
  openModal,
  setOpenModal,
  className,
}) => {
  return (
    <Dialog.Root open={openModal} onOpenChange={() => setOpenModal && setOpenModal(false)}>
      <Dialog.Content className={clsx(styles.container, className)}>
        <Dialog.Title
          className={clsx(styles.title, {
            [styles.titleCenter]: titleCenter,
            [styles.modalBorder]: !titleCenter,
          })}>
          {title}
        </Dialog.Title>
        <Flex direction='column' gap='3'>
          {children}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TransitionsModal;
