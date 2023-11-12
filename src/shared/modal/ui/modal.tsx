import * as React from 'react';
import styles from '../styles/modal.module.scss';
import { Dialog, Flex, Text, TextField, Button, Theme } from '@radix-ui/themes';
import clsx from 'clsx';
import { extname } from 'path';
import { ModalInteface } from 'pages/auth/login/ui/login';

export interface ModalProps extends ModalInteface {
  title?: string;
  titleCenter: boolean;
}

const TransitionsModal: React.FC<ModalProps> = ({
  title,
  children,
  titleCenter,
  openModal,
  setOpenModal,
}) => {
  return (
    <Dialog.Root open={openModal} onOpenChange={() => setOpenModal(false)}>
      <Dialog.Content className={styles.container}>
        <Dialog.Title className={clsx(styles.title, { [styles.titleCenter]: titleCenter })}>
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
