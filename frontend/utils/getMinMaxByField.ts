export const getMinMaxByField = (data: any[], field: string) => {
  let [min, max] = [data[0][field], data[0][field]];
  data.forEach(itm => {
    min = Math.min(itm[field], min);
    max = Math.max(itm[field], max);
  });

  return [min, max];
}