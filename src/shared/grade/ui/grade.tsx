import { FC } from 'react';
import { Box } from '@radix-ui/themes';
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons';

interface IGrade {
  current: number;
}

const Grade: FC<IGrade> = ({ current }) => {
  return (
    <Box>
      {[1, 2, 3, 4, 5].map((item, index) =>
        index < current ? <StarFilledIcon key={item} /> : <StarIcon key={item} />
      )}
    </Box>
  );
};

export default Grade;
