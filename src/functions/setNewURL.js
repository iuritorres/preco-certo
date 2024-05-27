import { isURL } from './isURL';

export function setNewURL(newURL) {
  const currentURL = window.location.href;

  if (isURL(newURL) && currentURL != newURL) window.location.href = newURL;
}
