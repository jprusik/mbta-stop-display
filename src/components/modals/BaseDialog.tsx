import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function BaseDialog({
  children,
  dialogTitleKey,
  handleDismiss,
  isOpen
}: {
  children: JSX.Element;
  dialogTitleKey?: string;
  handleDismiss: () => void;
  isOpen: boolean;
}): JSX.Element {
  const {t} = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      aria-labelledby="responsive-dialog-title"
      fullScreen={fullScreen}
      keepMounted
      onClose={handleDismiss}
      open={isOpen}
      scroll="paper"
      sx={{textAlign: 'left'}}
    >
      {dialogTitleKey && (
        <Title id="responsive-dialog-title">
          {t(dialogTitleKey)}
        </Title>
      )}
      <DialogContent dividers={true}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleDismiss}>
          {t('action_prompt.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Title = styled(DialogTitle)`
  > h2 {
    margin: 0;
  }
`;
