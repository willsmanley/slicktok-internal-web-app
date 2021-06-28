import * as React from 'react';
import styles from './BellyButton.module.css';
import classNames from '../../lib/classNames';
import removeKeys from '../../lib/removeKeys';

const BellyButton = (_props: {
  text?: string;
  isChecked?: boolean;
  small?: boolean;
  className?: string;
  fixed?: boolean;
  disabled?: boolean;
  onClick?: (x: unknown) => void;
}): React.ReactElement => {
  const props = {
    ..._props,
    text: _props.text === undefined ? '' : _props.text,
    isChecked: _props.isChecked === undefined ? false : _props.isChecked,
    small: _props.small === undefined ? false : _props.small,
    className: _props.className === undefined ? '' : _props.className,
    fixed: _props.fixed === undefined ? false : _props.fixed,
    disabled: _props.disabled === undefined ? false : _props.disabled,
  };
  // remove keys that should be removed, create className, and onClick handler
  const propsToInject = {
    ...removeKeys(props, ['text', 'isChecked', 'small', 'fixed', 'disabled']),
    className: classNames({
      [styles.bellyButton]: true,
      [styles.bellyButtonChecked]: props.isChecked,
      [styles.bellyButtonSmall]: props.small,
      [styles.bellyButtonDisabled]: props.disabled,
      [styles.bellyButtonFixed]: props.fixed,
      [props.className]: props.className,
    }),
    onClick: (e: MouseEvent) => {
      if (!props.disabled && !props.fixed && props.onClick) props.onClick(e);
    },
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <div {...propsToInject}>
      <span /> {props.text}
    </div>
  );
};

export default BellyButton;
