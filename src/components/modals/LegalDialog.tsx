import {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {BaseDialog} from 'components/modals/BaseDialog';
import {DialogSection} from 'components/modals/DialogSection';

export function LegalDialog({
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
      dialogTitleKey="content.legal_title"
    >
      <LegalDialogSections />
    </BaseDialog>
  );
}

function LegalDialogSections(): JSX.Element {
  const {t} = useTranslation();

  return (
    <Fragment>
      <DialogSection>
        <div>{t('content.legal_section_rights.body')}</div>
      </DialogSection>
    </Fragment>
  );
}
