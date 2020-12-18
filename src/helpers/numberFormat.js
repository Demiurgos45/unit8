export default function numberFormat(val) {
  return new Intl.NumberFormat().format(val)
}
