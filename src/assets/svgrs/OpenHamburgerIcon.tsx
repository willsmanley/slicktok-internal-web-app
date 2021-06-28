import React from 'react';

const SvgOpenHamburgerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props: React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width={23}
      height={18}
      xmlns='http://www.w3.org/2000/svg'
      {...{
        ...props,
        fill: 'none',
      }}
    >
      <line
        y1='1'
        x2='23'
        y2='1'
        stroke={props.fill || 'white'}
        strokeWidth='2'
      />
      <line
        y1='9'
        x2='23'
        y2='9'
        stroke={props.fill || 'white'}
        strokeWidth='2'
      />
      <line
        y1='17'
        x2='23'
        y2='17'
        stroke={props.fill || 'white'}
        strokeWidth='2'
      />
    </svg>
  );
};

export default SvgOpenHamburgerIcon;
