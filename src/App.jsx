import { useEffect, useState } from "react";
import { Login } from "./components/login/Login";
import { Header } from "./components/header/Header";
import ExpenseForm from "./components/expenseForm/ExpenseForm";
const product = [
  {
    title: "Alma",
    price: 120,
    date: "01.25.23",
    id: "1",
  },

  {
    title: "Alcha",
    price: 380,
    date: "11.07.23",
    id: "2",
  },

  {
    title: "Gilas",
    price: 80,
    date: "05.15.23",
    id: "3",
  },
];
function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const loginLocalStorage = localStorage.getItem("Auth");
    setLogin(loginLocalStorage);
  }, [login]);

  const loginHandler = () => {
    setLogin(true);
    localStorage.setItem("Auth", !login);
  };

  const logOutHandler = () => {
    setLogin(false);
    localStorage.removeItem("Auth");
  };

  return (
    <>
      <Header login={login} logOutHandler={logOutHandler} />

      {login ? (
        <>
          <ExpenseForm />,
        </>
      ) : (
        <Login loginHandler={loginHandler} />
      )}
    </>
  );
}

export default App;
