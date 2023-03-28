import {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styled from '@emotion/styled/macro';
import {useTheme, Palette} from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import {APP_CODE_URL} from '../constants';
import {AboutDialog} from 'components/modals/AboutDialog';
import {PrivacyDialog} from 'components/modals/PrivacyDialog';
import {LegalDialog} from 'components/modals/LegalDialog';
import {SupportDialog} from 'components/modals/SupportDialog';

const DIALOG_IDS = {
  ABOUT: 'about',
  PRIVACY: 'privacy',
  LEGAL: 'legal',
  SUPPORT: 'support'
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
      <SupportDialog
        handleDismiss={() => setOpenDialog(undefined)}
        isOpen={openDialog === DIALOG_IDS.SUPPORT}
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
        <TextButton
          onClick={() => setOpenDialog(DIALOG_IDS.SUPPORT)}
        >
          <FavoriteBorderIcon className="favoriteIcon" />
          {t('action_prompt.support_link')}
        </TextButton>
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
  align-items: center;
  padding: 0 6px 4px 0;

  > a,
  > ${TextButton} {
    display: inline-flex;
    align-items: center;
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

      .favoriteIcon {
        color: #ED143D;
      }
    }

    :focus-visible {
      border-color: #A0CBF5;
      background: none;
    }

    .favoriteIcon {
      margin-right: 2px;
      width: auto;
      height: 14px;
    }
  }
`;
