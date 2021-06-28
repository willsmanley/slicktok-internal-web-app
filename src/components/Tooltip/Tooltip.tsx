import React, {createRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Tooltip.module.css';
import classNames from '../../lib/classNames';
import SvgTooltipIcon from '../../assets/svgrs/TooltipIcon';
import {InferPropTypes} from '../../customTypes/InferPropTypes';
import useWindowDimensions from '../../customHooks/useWindowDimensions';

const propTypes = {
  client: PropTypes.any,
  content: PropTypes.any,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const defaultProps = {
  client: <SvgTooltipIcon fill='white' style={{width: 12, height: 12}} />,
};

interface Ref {
  getBoundingClientRect: () => {top: number};
}

type Props = InferPropTypes<typeof propTypes, typeof defaultProps>;

const Tooltip = (props: Props): React.ReactElement => {
  const ref = createRef();
  const [isOpen, setIsOpen] = useState(false);
  const {height} = useWindowDimensions();

  const shouldOpenToBottom = () => {
    // Handle missing ref (open to top if no ref exists)
    if (!ref || !ref.current) return false;

    // Get distance from top of element to top of viewport
    const distanceFromTop = (ref.current as Ref).getBoundingClientRect().top;

    // Handle missing coordinates (open to bottom if distance from top is zero)
    if (!distanceFromTop || !height) return true;

    // Return true if element is in the top half of the screen.
    // Return false if element is in the bottom half of the screen.
    return distanceFromTop < height / 2;
  };

  return (
    <span
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={ref}
      className={classNames({
        [styles.tooltipWrapper]: true,
        [styles.tooltipOpenToBottom]: shouldOpenToBottom(),
      })}
    >
      {/* Conditionally render tooltip window */}
      <span style={isOpen ? {} : {display: 'none'}}>
        {props.content || props.children}
      </span>

      {/* Persistent client */}
      {props.client}
    </span>
  );
};

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;
export default Tooltip;
