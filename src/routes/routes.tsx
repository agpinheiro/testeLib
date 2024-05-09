import React from 'react';
import NavigatorContainer from '../navigation/NavigatorContainer';
import Stack, {Page} from '../navigation/Stack';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NFC from '../pages/Nfc';

export type Pages = 'Home' | 'Login';

const Routes = () => {
  const pages: Page[] = [
    {page: Login, title: 'Login'},
    {page: Home, title: 'Home'},
    {page: NFC, title: 'NFC'},

  ];

  return (
    <NavigatorContainer>
      <Stack initialPage="Home" pages={pages} />
    </NavigatorContainer>
  );
};

export default Routes;
