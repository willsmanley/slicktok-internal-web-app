import React, {useEffect, useRef, useState} from 'react';
import useWindowDimensions from '../../customHooks/useWindowDimensions';
import removeKeys from '../../lib/removeKeys';

const AutoResizeTextArea = (_props: {
  value: string;
  onChange: (x: unknown) => void;
  maxHeight?: number;
  style?: Record<string, unknown>;
  minRows?: number;
  disabled?: boolean;
}): React.ReactElement => {
  const props = {
    ..._props,
    maxHeight: _props.maxHeight === undefined ? 200 : _props.maxHeight,
    style: _props.style === undefined ? {} : _props.style,
    minRows: _props.minRows === undefined ? 1 : _props.minRows,
  };
  const {height: windowHeight, width: windowWidth} = useWindowDimensions();
  const [height, setHeight] = useState('auto' as 'auto' | number);
  const [maxValueChars, setMaxValueChars] = useState(0);
  const textAreaRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    // Keep track of max length of value prop
    if (props.value && props.value.length > maxValueChars) {
      setMaxValueChars(props.value.length);
    }

    // Check if value is being reduced in length to approximate a resize
    // We don't want to resize down too often because it causes jank.
    if (typeof props.value === 'string' && typeof height === 'number') {
      const appxRows = height / 15;
      const charsPerRow = props.value.length / appxRows;
      const charDifference = maxValueChars - props.value.length;

      // If we are likely to have deleted at least a row of characters
      if (props.value.length < maxValueChars - charsPerRow) {
        setMaxValueChars(props.value.length);
        const proposedHeight = height - 15 * (charDifference / charsPerRow);
        setHeight(Math.max(0, proposedHeight));
      }
    }
  }, [props.value]);

  useEffect(() => {
    const {scrollHeight} = textAreaRef.current as unknown as {
      scrollHeight: number;
    };
    const newHeight = Math.min(scrollHeight, props.maxHeight);
    if (height !== newHeight) setHeight(newHeight);
  }, [props.value, windowHeight, windowWidth, maxValueChars]);

  // Add height to style properties
  const style = {
    ...props.style,
    height,
  };

  // Only use minRows if height is auto or less than 45px...
  const rows =
    typeof height === 'number' && height < 45 ? {rows: props.minRows} : {};

  // Return textarea with minRows, style, ref, and props pass-thru
  return (
    <textarea
      {...removeKeys({...props, ...rows}, ['minRows', 'maxHeight'])}
      style={style}
      ref={textAreaRef}
    />
  );
};

export default AutoResizeTextArea;
