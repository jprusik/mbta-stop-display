import {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styled from '@emotion/styled/macro';
import {useTheme, Palette} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {APP_CODE_URL} from '../constants';
import {AboutDialog} from 'components/modals/AboutDialog';
import {PrivacyDialog} from 'components/modals/PrivacyDialog';
import {LegalDialog} from 'components/modals/LegalDialog';

const DIALOG_IDS = {
  ABOUT: 'about',
  PRIVACY: 'privacy',
  LEGAL: 'legal'
}

export function AppDetailsNav (): JSX.Element {
  const {t} = useTranslation();
  const [openDialog, setOpenDialog] = useState<string | undefined>();
  const {palette} = useTheme();

  return (
    <Fragment>
      <AboutDialog
        handleDismiss={() => setOpenDialog(undefined)}
        isOpen={openDialog === DIALOG_IDS.ABOUT}
      />
      <PrivacyDialog
        handleDismiss={() => setOpenDialog(undefined)}
        isOpen={openDialog === DIALOG_IDS.PRIVACY}
      />
      <LegalDialog
        handleDismiss={() => setOpenDialog(undefined)}
        isOpen={openDialog === DIALOG_IDS.LEGAL}
      />
      <Container textColor={palette.text.disabled}>
        <TextButton
          onClick={() => setOpenDialog(DIALOG_IDS.ABOUT)}
        >
          {t('action_prompt.about_link')}
        </TextButton>
        <TextButton
          onClick={() => setOpenDialog(DIALOG_IDS.PRIVACY)}
        >
          {t('action_prompt.privacy_link')}
        </TextButton>
        <TextButton
          onClick={() => setOpenDialog(DIALOG_IDS.LEGAL)}
        >
          {t('action_prompt.legal_link')}
        </TextButton>
        <a
          href={APP_CODE_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('action_prompt.code_link')}
        </a>
      </Container>
    </Fragment>
  );
}

const TextButton = styled(Button)`
  padding: 0;
  min-width: unset;
  text-transform: none;
`;

const Container = styled.div<{
  textColor: Palette['text']['disabled']
}>`
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 0 6px 4px 0;

  > a,
  > ${TextButton} {
    margin-right: 8px;
    border: 2px solid transparent;
    padding: 0;
    text-decoration: none;
    line-height: 1em;
    color: ${({textColor}) => textColor};
    font-size: 12px;
    font-weight: normal;

    :hover,
    :active,
    :focus-visible {
      background: none;
      color: #A0CBF5;
    }

    :focus-visible {
      border-color: #A0CBF5;
      background: none;
    }
  }
`;
