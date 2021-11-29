import { format, parseISO } from 'date-fns';

import iconFavorited from '../img/favorited.svg';
import iconUnfavorited from '../img/unfavorited.svg';

export const formatDate = (date) => {
  if (date) {
    return format(parseISO(date), 'MMMM d, yyyy');
  }

  return 'NA';
};

export const parseObjects = (taglist) => {
  if (taglist) {
    // console.log(taglist);
    return taglist.map((tag) => ({ tag }));
  }

  return [];
};

export const parseStrings = (tagList) => {
  if (tagList.length !== 0) {
    return tagList.filter((name) => name.tag).map((name) => name.tag);
  }

  return [];
};

export const getIcon = (liked) => {
  if (liked) {
    return iconFavorited;
  }

  return iconUnfavorited;
};
