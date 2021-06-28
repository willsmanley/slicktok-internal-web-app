import React from 'react';
import PropTypes from 'prop-types';
import removeKeys from '../../lib/removeKeys';
import {InferPropTypes} from '../../customTypes/InferPropTypes';

/**
 * Renders an anchor tag with security to disallow javascript to control the new window.
 * This prevents users from making unauthorized requests through our domain by
 * uploading a link to their malicious site which can then control the origin window.
 *
 * It also forces opening in a new tab and adds nofollow link for SEO retention.
 *
 * If children are passed, the text prop will be ignored.
 *
 * If there is no text or children passed, the text will be the same as the href.
 */

const propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  text: PropTypes.any,
};

type Props = {[x: string]: unknown} & InferPropTypes<typeof propTypes>;

const ExternalLink = (props: Props): React.ReactElement => {
  return (
    <a
      {...removeKeys(props, ['text', 'href', 'children'])}
      rel='noopener noreferrer nofollow' // Don't allow JS to control page from new window, don't follow for SEO
      target='_blank' // Open in new tab
      href={props.href}
    >
      {props.children ?? props.text ?? props.href}
    </a>
  );
};

ExternalLink.propTypes = propTypes;

export default ExternalLink;
