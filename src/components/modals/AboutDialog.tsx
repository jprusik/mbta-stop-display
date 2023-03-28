import {Fragment} from 'react';
import {useTranslation, Trans} from 'react-i18next';
import {
  APP_AUTHOR_EMAIL,
  APP_AUTHOR_URL,
  APP_CODE_URL
} from '../../constants';
import {BaseDialog} from 'components/modals/BaseDialog';
import {DialogSection} from 'components/modals/DialogSection';

export function AboutDialog({
  handleDismiss,
  isOpen,
}: {
  handleDismiss: () => void;
  isOpen: boolean;
}): JSX.Element {
  return (
    <BaseDialog
      handleDismiss={handleDismiss}
      isOpen={isOpen}
      dialogTitleKey="content.about_title"
    >
      <AboutDialogSections />
    </BaseDialog>
  );
}

function AboutDialogSections(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Fragment>
      <DialogSection>
        <h3>{t('content.about_section_app.title')}</h3>
        <div>
          <Trans
            i18nKey="content.about_section_app.body"
            components={[
              <a href="https://www.mbta.com/developers/v3-api" target="_blank" rel="noopener noreferrer">text</a>
            ]}
          />
        </div>
        <div>
          <Trans
            i18nKey="content.about_section_app.body_link"
            components={[
              <a href={APP_CODE_URL} target="_blank" rel="noopener noreferrer">text</a>
            ]}
            values={{appCodeUrl: APP_CODE_URL}}
          />
        </div>
      </DialogSection>
      <DialogSection>
        <h3>{t('content.about_section_author.title')}</h3>
        <div>
          <Trans
            i18nKey="content.about_section_author.body"
            components={[
              <a href={APP_AUTHOR_URL} target="_blank" rel="noopener noreferrer">text</a>
            ]}
          />
        </div>
        <div>
          <Trans
            i18nKey="content.about_section_author.body_link"
            components={[
              <a href="https://www.linkedin.com/in/jprusik/" target="_blank" rel="noopener noreferrer">text</a>,
              <a href={`mailto:${APP_AUTHOR_EMAIL}`} target="_blank" rel="noopener noreferrer">text</a>
            ]}
          />
        </div>
      </DialogSection>
    </Fragment>
  );
}
