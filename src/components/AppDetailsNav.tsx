import {Fragment, useState} from 'react';
import {useTranslation} from 'react-i18next';
import styled from '@emotion/styled/macro';
import {useTheme, Palette} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {APP_CODE_URL} from '../constants';
import {AboutDialog} from 'components/AboutDialog';

export function AppDetailsNav (): JSX.Element {
  const {t} = useTranslation();
  const [aboutIsOpen, setAboutIsOpen] = useState(false);
  const {palette} = useTheme();

  return (
    <Fragment>
      <AboutDialog
        handleDismiss={() => setAboutIsOpen(false)}
        isOpen={aboutIsOpen}
      />
      <Container textColor={palette.text.disabled}>
        <TextButton
          onClick={() => setAboutIsOpen(true)}
        >
          {t('action_prompt.about_link')}
        </TextButton>
        <a
          href={APP_CODE_URL}
          rel="noreferrer"
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
