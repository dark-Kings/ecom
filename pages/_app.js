import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

function MyApp({ Component, pageProps }) {
      const [cart, setcart] = useState({});
      const [subTotal, setsubTotal] = useState(0);
      const [user, setUser] = useState({value:null})
      const [key, setKey] = useState()
      const [progress, setProgress] = useState(0)
      const router = useRouter();

       useEffect(() => {
       
      router.events.on("routeChangeStart",()=>{
            setProgress(40)
      })        

      router.events.on("routeChangeComplete",()=>{
            setProgress(100)
      })

      try {
            //  toggleCart();
            if(localStorage.getItem("cart")){
                  setcart(JSON.parse(localStorage.getItem("cart")))
                  saveCart(JSON.parse(localStorage.getItem("cart")))
               }
      } catch (error) {
            console.error(error);
            localStorage.clear()
      }   
       const token= localStorage.getItem("token")
       if(token){
            setUser({value:token})
      }
      setKey(Math.random)

       }, [router.query])

       const logout =()=>{
            localStorage.removeItem('token');
            setUser({value:null})
            setKey(Math.random())
            router.push(`${process.env.NEXT_PUBLIC_HOST}/`)
       }
        
       const saveCart =(myCart)=>{
         localStorage.setItem("cart",JSON.stringify(myCart))
         let subt = 0;
         let keys =Object.keys(myCart);
         for (let i = 0; i<keys.length; i++) {
             subt = subt + (myCart[keys[i]].price * myCart[keys[i]].qty);
         }
         setsubTotal(subt);
       }


      const addtoCart =(itemCode,qty,price,name,size,variant)=>{
            let newCart = JSON.parse(JSON.stringify(cart));
            if(itemCode in cart){
                  newCart[itemCode].qty = cart[itemCode].qty + qty
            }
            else{
                  newCart[itemCode] = {qty:1,price,name,size,variant}
            }
            setcart(newCart)
            saveCart(newCart)
      }
      const removefromCart =(itemCode,qty,price,name,size,variant)=>{
            let newCart = JSON.parse(JSON.stringify(cart));
            if(itemCode in cart){
                  newCart[itemCode].qty = cart[itemCode].qty - qty
            }
            if(newCart[itemCode]["qty"]<=0){
                  delete newCart[itemCode]
            }
            setcart(newCart)
            saveCart(newCart)
      }
      const clearCart =()=>{
            setcart({})
            saveCart({})
      }

      const buyNow=(itemCode,qty,price,name,size,variant)=>{
            setcart({})
            let newCart = {itemCode:{qty:1,price,name,size,variant}}
            setcart(newCart)
            saveCart(newCart)
            router.push('/Checkout')
           
      }
      return <>
         <LoadingBar
        color='#ff2d55'
        waitingTime={400}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
     {key && <Navbar logout={logout} user={user} key={key} cart={cart} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subTotal={subTotal}/>}
      <Component buyNow={buyNow} cart={cart} addtoCart={addtoCart} removefromCart={removefromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
      </>
}

export default MyApp
