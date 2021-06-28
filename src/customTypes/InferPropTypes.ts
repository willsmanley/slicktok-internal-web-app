import PropTypes from 'prop-types';

export type InferPropTypes<
  propTypes,
  DefaultProps = Record<string, never>,
  Props = PropTypes.InferProps<propTypes>
> = {
  [Key in keyof Props]: Key extends keyof DefaultProps
    ? Props[Key] | DefaultProps[Key]
    : Props[Key];
};
