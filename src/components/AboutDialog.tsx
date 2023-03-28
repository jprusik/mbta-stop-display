import styled from '@emotion/styled';
import {useTranslation, Trans} from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {APP_AUTHOR_URL, APP_CODE_URL} from '../constants';

export function AboutDialog({
  handleDismiss,
  isOpen,
}: {
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
      onClose={handleDismiss}
      open={isOpen}
      scroll="paper"
      sx={{textAlign: 'left'}}
    >
      <Title id="responsive-dialog-title">
        {t('content.about_title')}
      </Title>
      <DialogContent dividers={true}>
        <Section>
          <h3>{t('content.about_section_app.title')}</h3>
          <div>
            <Trans
              i18nKey="content.about_section_app.body"
              components={[
                <a href="https://www.mbta.com/developers/v3-api" target="_blank" rel="noreferrer">text</a>
              ]}
            />
          </div>
          <div>
            <Trans
              i18nKey="content.about_section_app.body_link"
              values={{appCodeUrl: APP_CODE_URL}}
              components={[
                <a href={APP_CODE_URL} target="_blank" rel="noreferrer">text</a>
              ]}
            />
          </div>
        </Section>
        <Section>
          <h3>{t('content.about_section_author.title')}</h3>
          <div>
            <Trans
              i18nKey="content.about_section_author.body"
              components={[
                <a href={APP_AUTHOR_URL} target="_blank" rel="noreferrer">text</a>
              ]}
            />
          </div>
          <div>
            <Trans
              i18nKey="content.about_section_author.body_link"
              components={[
                <a href="https://www.linkedin.com/in/jprusik/" target="_blank" rel="noreferrer">text</a>,
                <a href="mailto:jon@mysteamgauge.com" target="_blank" rel="noreferrer">text</a>
              ]}
            />
          </div>
        </Section>
        <Section>
          <h3>{t('content.about_section_legal.title')}</h3>
          <div>{t('content.about_section_legal.body')}</div>
        </Section>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleDismiss}>
          {t('action_prompt.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Section = styled.div`
  white-space: pre-line;
  color: rgba(255, 255, 255, 0.7);

  :not(:last-of-type) {
    margin-bottom: 30px;
  }

  a {
    text-decoration: none;

    :hover,
    :active,
    :focus-visible {
      text-decoration: underline;
    }
  }

  > div {
    margin: 1em 0;
  }

  > h3 {
    margin: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }
`;

const Title = styled(DialogTitle)`
  > h2 {
    margin: 0;
  }
`;
