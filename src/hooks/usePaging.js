import { useCallback, useMemo, useState } from 'react';

export const usePaging = (array, perPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = Math.ceil(array.length / perPage);

  const list = useCallback(
    (array) => {
      const arr = [];
      let index = (currentPage - 1) * perPage;
      for (let i = index; i < index + perPage; i++) {
        if (array[i]) arr.push(array[i]);
      }
      return arr;
    },
    [currentPage, perPage, array]
  );

  const items = list(array);

  return {
    currentPage,
    numberOfPages,
    changePage: setCurrentPage,
    items: items,
    setCurrentPage,
  };
};
