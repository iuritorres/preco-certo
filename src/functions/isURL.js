export function isURL(object) {
  try {
    let url = new URL(object);
    return true;
  } catch (error) {
    return false;
  }
}
