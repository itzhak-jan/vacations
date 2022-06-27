import { Routes, Route } from 'react-router-dom';
import AddVacation from '../add-vacation/add-vacation';
import EditVacation from '../edit-vacation/edit-vacation';
import LogIn from '../log-in/Log-in';
import Register from '../register/Register';
import Statistics from '../Statistics/Statistics';
import VacationContainer from '../vacationContainer/VacationContainer';
import ButtonsBar from './buttons-bar/button-bar';
import Footer from './footer/footer';
import Header from './header/header';
import './layout.css';
import Search from './search/search';

export default function layout(): JSX.Element {
  return (
    <div className="Layout">
      <div>
        <Search />
      </div>

      <header>
        <Header />
      </header>

      <div>
        <ButtonsBar />
      </div>

      <Routes>
        <Route path="/" element={
          <main>
            <VacationContainer />
          </main>} />
        <Route path="/Log-in" element={
          <main>
            <LogIn />
          </main>} />
        <Route path="/Register" element={
          <main>
            <Register />
          </main>} />
        <Route path="/Add-vacation" element={
          <main>
            <AddVacation />
          </main>} />
          <Route path="/Edit-vacation" element={
          <main>
            <EditVacation />
          </main>} />
        <Route path="/Statistics" element={
          <main>
            <Statistics />
          </main>} />
      </Routes>

      <footer>
        <Footer />
      </footer>

    </div>
  )
}
