import { colorsChartLine } from "constants/categories";
import dayjs from "dayjs";

export function generateID() {
  const string = Date.now().toString(8);
  return (
    "1" +
    string
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("")
  );
}

export function groupBy(array, key) {
  return array.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
//value[key] = array[i].category
//value = array[i]
export function groupByAndSum(array, key) {
  var result = [];
  //debugger;
  array.reduce(function (res, value) {
    if (!res[value[key]]) {
      res[value[key]] = {
        title: value[key],
        value: 0,
        color: value.categoryColor,
      };
      result.push(res[value[key]]);
    }
    res[value[key]].value += value.amount;
    return res;
  }, {});
  return result;
}

export function filterArrayByDate(array, month, year, filter) {
  return array.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1;
    const expenseYear = expenseDate.getFullYear();
    if (filter === "month" && expenseMonth === month && expenseYear === year)
      return expense;
    else if (filter === "year" && expenseYear === year) return expense;
  });
}

export const getDateFromExpense = (expense) => {
  const date = new Date(expense.date);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { month, year };
};

export const calculateAmount = (list) => {
  return list?.reduce((sum, obj) => (sum += obj.amount), 0);
};

export const filterDatasetForLineChart = (expenseList, labels) => {
  const monthName = dayjs(expenseList[0].date).format("MMMM");
  const color = colorsChartLine[dayjs(expenseList[0].date).month()];
  return {
    label: monthName,
    data: labels.map((day) =>
      expenseList.reduce(function (acc, obj) {
        if (day == dayjs(obj.date).date()) return acc + obj.amount;
        return acc + 0;
      }, 0)
    ),
    borderColor: color,
    backgroundColor: color,
  };
};
