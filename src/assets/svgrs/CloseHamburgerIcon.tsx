import React from 'react';

const SvgCloseHamburgerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width={20}
      height={18}
      xmlns='http://www.w3.org/2000/svg'
      {...{
        ...props,
        fill: 'none',
      }}
    >
      <line
        x1='2.70711'
        y1='1.29289'
        x2='18.7071'
        y2='17.2929'
        stroke={props.fill || 'white'}
        strokeWidth='2'
      />
      <line
        y1='-1'
        x2='22.6274'
        y2='-1'
        transform='matrix(-0.707107 0.707107 0.707107 0.707107 18 2)'
        stroke={props.fill || 'white'}
        strokeWidth='2'
      />
    </svg>
  );
};

export default SvgCloseHamburgerIcon;
