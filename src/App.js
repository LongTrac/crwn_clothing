import './categories.style.scss'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import { Fragment } from 'react';


const Shop = () => {
  return (<h1>I am the shop</h1>);
}
const App = () => {
  return (
    <Fragment>
      <h1>sakjdfhaskdfjhksdhfkasjldhfkjashdfkjhsadfkjhasdkjlfh</h1>
      <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
    </Fragment>
    

  );
}


export default App;
