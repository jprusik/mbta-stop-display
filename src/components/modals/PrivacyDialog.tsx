import {Fragment} from 'react';
import {useTranslation, Trans} from 'react-i18next';
import {APP_AUTHOR_EMAIL} from '../../constants';
import {BaseDialog} from 'components/modals/BaseDialog';
import {DialogSection} from 'components/modals/DialogSection';

export function PrivacyDialog({
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
      dialogTitleKey="content.privacy_title"
    >
      <PrivacyDialogSections />
    </BaseDialog>
  );
}

function PrivacyDialogSections(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Fragment>
      <DialogSection>
        <h3>{t('content.privacy_section_policy.title')}</h3>
        <div>
          {t('content.privacy_section_policy.body_open')}
          <ul>
            <li>
              <Trans
                i18nKey="content.privacy_section_policy.body_list_google_analytics"
                components={[
                  <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">text</a>,
                  <a href="https://www.eff.org/privacybadger" rel="noopener noreferrer" target="_blank">text</a>
                ]}
              />
            </li>
          </ul>
          <Trans
            i18nKey="content.privacy_section_policy.body_close"
            components={[
              <a href={`mailto:${APP_AUTHOR_EMAIL}`} rel="noopener noreferrer">text</a>,
              <a href="https://supporters.eff.org/donate" rel="noopener noreferrer" target="_blank">text</a>,
            ]}
          />
        </div>
      </DialogSection>
      <DialogSection>
        <h3>{t('content.privacy_section_advertising.title')}</h3>
        <div>
          {t('content.privacy_section_advertising.body')}
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
      <sub>{t('content.privacy_last_updated')}</sub>
    </Fragment>
  );
}
