import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

export const fetchCartData= ()=>{
          return async dispatch=>{
            const sendRequest = async ()=>{
                const response = await fetch(`${process.env.backend}/cart.json`)
                  if(!response.ok){
                    throw Error('Something went wrong!')
                  }
                  const data = response.json();
                  return data;
            }
            try{
                const cartData = await sendRequest();
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity:cartData.totalQuantity
                })
            }catch(error){
                dispatch(uiActions.showNotification({
                    status:"error",
                    title:"Error!",
                    message: "Sending cart data faild"
                  }))
            }
          }
}


export const sendCartData = (cart)=>{
          
          return async (dispatch)=>{
              
              dispatch(uiActions.showNotification({
                  status:"pending",
                  title:"Sending....",
                  message: "sending Cart data...."
                }))
              const sendRequest = async ()=>{
                  const response = await fetch(`${process.env.backend}/cart.json`,{
                      method:'PUT',
                      body:JSON.stringify({
                        items:cart.items,
                        totalQuantity:cart.totalQuantity
                      })
                    })
                    if(!response.ok){
                      throw Error('Something went wrong!')
                    }
              }
      
              try{
                   await sendRequest();
                  dispatch(uiActions.showNotification({
                      status:"success",
                      title:"Success...!",
                      message: "Sent Cart data successfully...."
                    }))
              }catch(error){
                  dispatch(uiActions.showNotification({
                      status:"error",
                      title:"Error!",
                      message: "Sending cart data faild"
                    }))
              }
      
      
      
          }
          }
          