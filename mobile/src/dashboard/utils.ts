export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

const CATEGORIES_COLORS = [
  '#4F7CAC',
  '#FF3E41',
  '#8CB369',
  '#3A015C',
  '#000F08',
  '#FF4D80',
  '#322214',
  '#FFD23F',
  '#08BDBD',
  '#03191E',
  '#272727',
];

type PieSlice = {
  key: string,
  title: string,
  value: number,
  svg: {
    fill: string
  }
};
export function categoriesToPieSlices(items: Array<{ category: string, amount: number }>): PieSlice[] {
  let colorIndex = 0 % CATEGORIES_COLORS.length;
  return items.map((item: { category: string , amount: number }, index: number) => ({
    key: `pie-${item.category}`,
    title: item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase(),
    value: item.amount,
    svg: {
      fill: CATEGORIES_COLORS[colorIndex++],
    },
  }));
};