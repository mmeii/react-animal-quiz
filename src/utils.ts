export const randomArray = (array: any[]) =>
    [...array].sort(() => Math.random() - 0.5);