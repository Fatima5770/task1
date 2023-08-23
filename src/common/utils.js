export function titleize(value) {
  return value.toLowerCase().replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase());
}
