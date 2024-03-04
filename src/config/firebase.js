// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { calculateAmount, getDateFromExpense } from 'util/helpers';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyDe-g4B7YP4Gex2jvskS0mm1gFrmRF0KfE",

  authDomain: "money-tracker-40fcb.firebaseapp.com",

  projectId: "money-tracker-40fcb",

  storageBucket: "money-tracker-40fcb.appspot.com",

  messagingSenderId: "878814391744",

  appId: "1:878814391744:web:983810e9f0932aa8902c25",

  measurementId: "G-1F8QW20494"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

const getCollection = () => {
  const userID = localStorage.getItem('userID');
  let collectionName = '';
  switch (userID) {
    case '8cdi1pTfmMgV1mItRyic6NSrGOn2':
      collectionName = 'transakcije';
      break;
    default:
      collectionName = userID;
  }
  return collectionName;
};

// const transactions_collection = getCollection();

export async function getDataByYear(year) {
  let data = [];
  for (let i = 1; i <= 12; i++) {
    const docID = `${i}.${year}`;
    const expenseList = await getDataByID(docID);
    data.push(...expenseList);
  }
  const newAmount = calculateAmount(data);
  return { expenseList: data, amount: newAmount };
}

async function getDataByID(docID) {
  const transactions_collection = getCollection();
  const docRef = doc(db, transactions_collection, docID);
  const response = await getDoc(docRef);
  const exists = response.exists();
  if (exists) {
    const { expenseList } = response.data();
    return expenseList;
  } else return [];
}

export const getDataByDate = async (month, year) => {
  const transactions_collection = getCollection();
  const docID = `${month}.${year}`;
  const response = await getDoc(doc(db, transactions_collection, docID));
  const { expenseList } = response.data();
  console.log("Expense list******************",response.data())
  const newAmount = calculateAmount(expenseList);
  return { expenseList: expenseList, amount: newAmount };
}

export async function addExpense(expense) {
  const transactions_collection = getCollection();
  const { month, year } = getDateFromExpense(expense);
  const docID = `${month}.${year}`;
  const docRef = doc(db, transactions_collection, docID);

  const response = await getDoc(docRef);

  let expenseList = [];

  if (response.exists()) {
    const data = response.data();
    expenseList = data.expenseList;
  }
  expenseList.push(expense);
  const newAmount = calculateAmount(expenseList);
  await setDoc(docRef, { expenseList: expenseList });
  return { expenseList, amount: newAmount };
}

export async function removeExpense(expense) {
  const transactions_collection = getCollection();
  const { month, year } = getDateFromExpense(expense);
  const expenseID = expense.id;
  const docID = `${month}.${year}`;
  const docRef = doc(db, transactions_collection, docID);

  const response = await getDoc(docRef);
  const { expenseList } = response.data();

  let index = expenseList.findIndex((expense) => expense.id === expenseID);
  expenseList.splice(index, 1);

  const newAmount = calculateAmount(expenseList);
  await setDoc(docRef, { expenseList: expenseList }, { merge: true });

  return { expenseList, amount: newAmount };
}
