/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Animated,
  BackHandler,
  StyleSheet,
} from 'react-native';

export interface StackProps {
  pages: Page[];
  initialPage: string;
}

export interface Page {
  page: React.FC<any | NavProps>;
  title: string;
}

export interface NavProps {
  navigation: {
    navigate: (title: string) => void;
    goBack: () => void;
    pageName: string;
  };
}

const Stack: React.FC<StackProps> = ({ pages, initialPage }) => {
  const [page, setPage] = useState<string>(initialPage || pages[0].title);
  const [pageStack, setPageStack] = useState<string[]>([initialPage]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, [pageStack, page]);

  const goBack = () => {
    if (pageStack.length > 1) {
      const previousPage = pageStack[pageStack.length - 2];
      setPageStack(oldStack => oldStack.slice(0, -1));
      setPage(previousPage);
    }
  };

  const navigateToPage = (value: string) => {
    setPage(value);
    setPageStack(oldStack => {
      if (!oldStack.includes(value)) {
        return [...oldStack, value];
      }
      const filtered = oldStack.filter(item => item !== value);
      return [...filtered, value];
    });
  };

  const handleBackPress = () => {
    if (pageStack.length > 1) {
      goBack();
      return true;
    }
    return false;
  };

  return (
    <Animated.View style={[styles.container]}>
      {pages.map(item => {
        const isActive = item.title === page;
        return (
          isActive && (
            <item.page
              key={item.title}
              navigation={{
                navigate: navigateToPage,
                goBack: goBack,
                pageName: item.title,
              }}
            />
          )
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Stack;
