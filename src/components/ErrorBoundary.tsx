import {forwardRef, Component, ErrorInfo, ReactNode} from 'react';
import {withTranslation, WithTranslation, Trans} from 'react-i18next';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {ISSUE_REPORTING_URL} from '../constants';

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  stateError: Error | null;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    stateError: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {stateError: error};
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // @TODO Log error somewhere
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const {t} = this.props;

    if (this.state.stateError) {
      return (
        <Snackbar
          open={true}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <Alert severity="error" sx={{width: '100%', textAlign: 'left'}}>
            <AlertTitle>{t('error.generic')}</AlertTitle>
            <div>
              {this.state.stateError.message}
              &nbsp;
              {t('error.prompt_try_again')}
            </div>
            <br/>
            <div>
              <Trans
                i18nKey="error.prompt_report_error_information"
                components={
                  [<a href={ISSUE_REPORTING_URL} target="_blank" rel="noreferrer">text</a>]
                }
              />
            </div>
          </Alert>
        </Snackbar>
      );
    }

    return this.props.children;
  }
}

export const TranslatedErrorBoundary = withTranslation()(ErrorBoundary);
