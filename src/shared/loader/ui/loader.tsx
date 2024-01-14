import { FC } from 'react';
import '../styles/loader.scss';
import clsx from 'clsx';

const Loader: FC<{ className?: string }> = ({ className }) => {
  return <span className={clsx('loader', className)}></span>;
};

export default Loader;
