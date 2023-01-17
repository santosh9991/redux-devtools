import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { fetchCartData, sendCartData } from './components/store/cart-actions';
import  { uiActions } from './components/store/ui-slice';
import Notification from './components/UI/Notification';
let isInitial = true;
function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state=>state.ui.cartISVisible);
  const cart = useSelector(state=>state.cart);
  const notification = useSelector(state=>state.ui.notification);
  useEffect(()=>{
    dispatch(fetchCartData())
  },[])
  useEffect(()=>{ 
    if(isInitial){
      isInitial=false;
      return
    }
    if(cart.changed){
      dispatch(sendCartData(cart))

    }
  },[cart])
  return (
    <Fragment>
      
      {notification && <Notification status= {notification.status} title={notification.title}
      message={notification.message}></Notification>}
        <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>

  );
}

export default App;
