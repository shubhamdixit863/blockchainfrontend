import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './components/Signup';
import CreateWallet from './components/CreateWallet';
import ListWallet from './components/ListWallet';
import PrivateRoute from './components/common/PrivateRoute';
import WalletComponent from './components/WalletComponent';
import SendBitcoinComponent from './components/SendBitCoinComponent';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"createwallet",
        element:<PrivateRoute>
            <CreateWallet/>
        </PrivateRoute>
     
      },
      {
        path:"listwallet",
        element:<PrivateRoute>
   <ListWallet/>
        </PrivateRoute>
     
      },

      {
        path:"wallet/:walletName",
        element:<PrivateRoute>
   <WalletComponent/>
        </PrivateRoute>
     
      },
      {
        path:"sendbitcoin",
        element:
   <SendBitcoinComponent/>
       
     
      }

    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
