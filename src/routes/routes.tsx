import React from 'react';
import NavigatorContainer from '../navigation/NavigatorContainer';
import Stack, {Page} from '../navigation/Stack';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Login2 from '../pages/Login2';

export type Pages = 'Home' | 'Login';

const Routes = () => {
  const pages: Page[] = [
    {page: Login, title: 'Login'},
    {page: Home, title: 'Home'},
    {page: Login2, title: 'Login2'},
  ];

  return (
    <NavigatorContainer>
      <Stack initialPage="Login" pages={pages} />
    </NavigatorContainer>
  );
};

export default Routes;
