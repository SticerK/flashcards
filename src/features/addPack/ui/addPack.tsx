import { FC } from 'react';
import styles from '../styles/addPack.module.scss';
import { Button, Input, Modal } from 'shared';
import { Checkbox, Flex, Text } from '@radix-ui/themes';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { addPackSchema } from '../validateConfig/validate';
import { useCreateDecksMutation } from 'app/redux/desc/descApi';
import { IDecksRequest } from 'app/redux/desc/types';

const AddPack: FC = () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(addPackSchema),
    defaultValues: {
      isPrivate: false,
    },
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
        <Controller
          control={control}
          name='name'
          render={({ field: { onChange, value } }) => (
            <Input
              type='text'
              value={value}
              onChange={onChange}
              labelName='Name Pack'
              errorMessage={errors?.name?.message}
            />
          )}
        />
        <Flex mt={'5'} mb={'6'} align={'center'} gap={'2'}>
          <Checkbox
            size={'1'}
            {...register('isPrivate')}
            onCheckedChange={(e: boolean) => setValue('isPrivate', e)}
          />
          <Text size={'1'}>Private pack</Text>
        </Flex>
        <Flex justify={'between'}>
          <Button variant='normal' radius='small' onClick={() => navigate('/home')}>
            Cancel
          </Button>
          <Button variant='fill' radius='small' type='submit'>
            Add New Pack
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default AddPack;
