import {I18nextProvider} from 'react-i18next';
import {render, screen} from '@testing-library/react';
import {App} from 'App';
import i18n from 'i18n';

test('renders the App', () => {
  render(<I18nextProvider i18n={i18n}><App /></I18nextProvider>);
  const loadingState = screen.getByText(/Please select a route./i);
  expect(loadingState).toBeInTheDocument();
});
