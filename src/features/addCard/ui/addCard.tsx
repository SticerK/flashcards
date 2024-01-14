import { FC } from 'react';
import styles from '../styles/addCard.module.scss';
import { Button, Input, Modal } from 'shared';
import { Flex, Select } from '@radix-ui/themes';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCardSchema } from '../validateConfig/config';
import { useCreateDecksMutation } from 'app/redux/desc/descApi';
import { IDecksRequest } from 'app/redux/desc/types';

const AddCard: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(addCardSchema),
    defaultValues: {},
  });
  const navigate = useNavigate();
  const [setNewDeck] = useCreateDecksMutation();

  const onSubmit: SubmitHandler<IDecksRequest> = (e): void => {
    setNewDeck(e);
    navigate('/home');
  };

  return (
    <Modal title='Add New Pack' openModal={true} setOpenModal={() => navigate('/home')}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Select.Root defaultValue='apple'>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value='123'>123</Select.Item>
          </Select.Content>
        </Select.Root>
        <Controller
          control={control}
          name='question'
          render={({ field: { onChange, value } }) => (
            <Input
              type='text'
              value={value}
              onChange={onChange}
              labelName='Question'
              errorMessage={errors?.question?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='answer'
          render={({ field: { onChange, value } }) => (
            <Input
              type='text'
              value={value}
              onChange={onChange}
              labelName='Answer'
              errorMessage={errors?.answer?.message}
            />
          )}
        />
        <Flex justify={'between'}>
          <Button variant='normal' radius='small' onClick={() => navigate('/home')}>
            Cancel
          </Button>
          <Button variant='fill' radius='small' type='submit'>
            Add New Card
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddCard;
