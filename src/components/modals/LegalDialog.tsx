import {Fragment} from 'react';
import {Trans} from 'react-i18next';
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
  return (
    <Fragment>
      <DialogSection>
        <div>
          <Trans
            i18nKey="content.legal_section_rights.body"
            components={[
              <a href="https://game-icons.net/1x1/caro-asercion/subway-train.html" rel="noopener noreferrer" target="_blank">text</a>,
              <a href="https://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" target="_blank">text</a>,
            ]}
          />
        </div>
      </DialogSection>
    </Fragment>
  );
}
