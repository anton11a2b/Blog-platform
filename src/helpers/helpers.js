/* eslint-disable import/prefer-default-export */
import { format, parseISO } from 'date-fns';

export const formatDate = (date) => {
  if (date) {
    return format(parseISO(date), 'MMMM d, yyyy');
  }

  return 'NA';
};
