import './categories.style.scss'
import { Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';


const Shop = () => {
  return (<h1>I am the beibu</h1>);
}
const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop' element={<Shop />} />
          <Route path='sign-in' element={<SignIn />} />
        </Route>
      </Routes>
    </Fragment>


  );
}


export default App;
