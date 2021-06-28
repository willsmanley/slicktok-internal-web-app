import React from 'react';

const SvgSuccessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' {...props}>
      <path
        d='M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.89 11.915l-7.477 7.479c-.909.907-2.347.953-3.197.103a1.988 1.988 0 01-.305-.402L8.854 18.04c-.908-.908-.954-2.346-.104-3.196.851-.85 2.29-.805 3.197.104l1.863 1.863 5.987-5.988c.909-.908 2.346-.954 3.196-.103.851.849.804 2.288-.103 3.195z'
        fill={props.fill ?? '#000'}
        fillRule='evenodd'
      />
    </svg>
  );
};

export default SvgSuccessIcon;
