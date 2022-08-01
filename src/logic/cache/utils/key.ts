function key(givenKey: string, prefixId = '', separator = '__'): string {
  if (prefixId) {
    return `${prefixId}${separator}${givenKey}`;
  }

  return givenKey;
}

export default key;
