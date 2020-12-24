export default function numberFormat(val) {
  //return new Intl.NumberFormat().format(Number(val) || 0)
  if (typeof(val) !== 'number') {
    return 0
  }
  return new Intl.NumberFormat().format(val)
}
