import { FC } from 'react';
import styles from '../styles/editPack.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editPackSchema } from '../validateConfig/validate';
import { useNavigate, useParams } from 'react-router-dom';
import { IDecksRequest } from 'app/redux/desc/types';
import { Button, Input, Modal } from 'shared';
import { Checkbox, Flex, Text } from '@radix-ui/themes';
import { useDeskItemQuery, useEditDeckMutation } from 'app/redux/desc/descApi';

const EditPack: FC = () => {
  const { id } = useParams();
  const { data } = useDeskItemQuery(id);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(editPackSchema),
    defaultValues: {
      isPrivate: false,
      name: data?.name,
    },
  });
  const navigate = useNavigate();
  const [handleEditPack] = useEditDeckMutation();

  const onSubmit: SubmitHandler<IDecksRequest> = (fields): void => {
    handleEditPack({ id, ...fields });
    navigate('/home');
  };

  return (
    <Modal title='Edit Pack' openModal={true} setOpenModal={() => navigate('/home')}>
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
        <Flex mt={'6'} mb={'5'} align={'center'} gap={'2'}>
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
            Save Changes
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default EditPack;
