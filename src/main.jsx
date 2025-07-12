import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import { router } from './Router/Router.jsx'
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'

import { Authcontext } from './Context/Authcontext.jsx'
import Authprovider from './Context/Authprovider.jsx'
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}  >


      <Authprovider>

        <RouterProvider router={router}>

        </RouterProvider>

        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </Authprovider>


    </QueryClientProvider>
  </StrictMode>,
)
