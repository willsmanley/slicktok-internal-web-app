import {formatDistance as formatDistanceOriginal} from 'date-fns';

/**
 * This wraps date-fns's formatDistance function to remove the overly verbose "about " prefix
 *
 * "about 15 minutes ago" -> "15 minutes ago"
 */
export function formatDistance(
  dirtyDate: Date | number,
  dirtyBaseDate: Date | number,
  options: Record<string, unknown>,
): string {
  const distance = formatDistanceOriginal(dirtyDate, dirtyBaseDate, options);
  return distance.replace('about ', '');
}
