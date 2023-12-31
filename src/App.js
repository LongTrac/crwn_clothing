import './categories.style.scss'
import { Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />            {/*shop is going to have a nested route inside that is why the path='shop/*'   */}
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout/>}/>
        </Route>
      </Routes>
    </Fragment>


  );
}


export default App;
