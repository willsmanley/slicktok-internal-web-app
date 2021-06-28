/**
 * This reusable form component always calls `e.preventDefault()`
 * so you don't have to remember to do it on every component.
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import removeKeys from '../../lib/removeKeys';
import {InferPropTypes} from '../../customTypes/InferPropTypes';

const propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

type Props = {[x: string]: unknown} & InferPropTypes<typeof propTypes>;

const Form = (props: Props): React.ReactElement => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (props.onSubmit) {
          props.onSubmit(e);
        }
      }}
      {...removeKeys(props, ['onSubmit', 'children'])}
    >
      {props.children}
    </form>
  );
};

export default Form;
