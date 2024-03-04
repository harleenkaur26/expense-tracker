import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import { ExpenseItem } from "./expenseItem";
import { Container } from "components/expenseTracker/Container";
import { Spinner } from "components/expenseTracker/ui/spinner";
import { Pagination } from "./pagination";
import { usePaging } from "hooks/usePaging";
// Styles
import styles from "./expenseList.module.css";
import { useEffect } from "react";
import { PageNumberList } from "./pageNumberList";
import { printOff } from "store/slices/uiSlice";

const defaultItemsPerPage = 10;

export function ExpenseList({ className }) {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const { expenseList, fetching, filterBy } = useSelector(
    (state) => state.expenses
  );
  const { printMode } = useSelector((state) => state.ui);
  const { currentPage, numberOfPages, changePage, items } = usePaging(
    expenseList,
    itemsPerPage
  );

  useEffect(() => {
    changePage(1);
  }, [expenseList, filterBy]);

  useEffect(() => {
    if (printMode) {
      changePage(1);
      setItemsPerPage(1000);
    }
  }, [printMode]);

  useEffect(() => {
    if (printMode) {
      setTimeout(() => {
        window.print();
        dispatch(printOff());
        setItemsPerPage(defaultItemsPerPage);
      }, 100);
    }
    changePage(1);
  }, [itemsPerPage]);

  return (
    <Container className={className} title='Expense List'>
      <div>
        {items.length === 0 && !fetching && (
          <p>There are no expenses. Congrats!</p>
        )}
        <PageNumberList perPage={itemsPerPage} onClick={setItemsPerPage} />
        {!fetching && (
          <ul className={`${styles.list}`}>
            {items?.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </ul>
        )}
        {numberOfPages > 1 && (
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            perPage={itemsPerPage}
            changePage={changePage}
          />
        )}
      </div>
      {fetching && <Spinner />}
      <div className={styles.pageBreak}></div>
    </Container>
  );
}
