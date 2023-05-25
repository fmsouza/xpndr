import { ThemeProvider } from './theme';
import { ScrollTop } from './modules/shared/components';
import { Routes } from './routes';

export const App = () => {
  return (
    <ThemeProvider>
      <ScrollTop>
        <Routes />
      </ScrollTop>
    </ThemeProvider>
  );
};
