import { createRoot } from 'react-dom/client';
import './app/index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from 'app/router/router';
import { Theme } from '@radix-ui/themes';
import { Provider } from 'react-redux';
import { store } from 'app/redux/store';

const rootElement = document.body;
const root = createRoot(rootElement);

root.render(
  <Theme>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </Theme>
);
