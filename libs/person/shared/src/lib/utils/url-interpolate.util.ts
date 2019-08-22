export function interpolateUrl(url: string, key: string, value: number) {
  return url.replace(key, value.toString());
}
