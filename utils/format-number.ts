export default function formatNumber(num:number|string) {
  const numString=String(num)
  const floatNum = parseFloat(numString);

  const formatted =
    floatNum % 1 === 0 ? floatNum.toString() : floatNum.toFixed(2);

  return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
