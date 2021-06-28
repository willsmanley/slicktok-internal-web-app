import React from 'react';

const SvgAlertIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' {...props}>
      <path
        fill={props.fill ?? 'black'}
        d='M87.1 72.5L57 19.6c-1.4-2.5-4-4-7-4s-5.5 1.5-7 4L12.9 72.5c-1.4 2.5-1.4 5.5 0 8s4 4 6.9 4H80c2.9 0 5.5-1.5 6.9-4 1.6-2.5 1.6-5.5.2-8zm-32.7-.6h-8v-7h8v7zm0-11h-8v-20h8v20z'
      />
    </svg>
  );
};

export default SvgAlertIcon;
