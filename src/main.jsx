import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './Router/Router.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Authprovider from './Context/Authprovider.jsx';
import { Toaster } from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css';

// import { ChakraProvider } from '@chakra-ui/react';



AOS.init({
  duration: 1000,
  once: true,
});


const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>


        {/* <ChakraProvider>



        </ChakraProvider> */}

        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />





      </Authprovider>
    </QueryClientProvider>
  </StrictMode>
);
