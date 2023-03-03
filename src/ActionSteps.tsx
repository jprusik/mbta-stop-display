import * as React from 'react';
import styled from '@emotion/styled';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {useTranslation} from 'react-i18next';

const steps = [
  {
    stepKey: 'action_prompt.select_route_type'
  },
  {
    stepKey: 'action_prompt.select_route'
  },
  {
    stepKey: 'action_prompt.select_stop'
  },
];

export function ActionSteps({
  activeStep
}: {activeStep: number}): JSX.Element {
  const {t} = useTranslation();

  // Do not show steps beyond the active one
  const cappedSteps = steps.filter((_, i) => i <= activeStep);

  return (
    <StepperContainer>
      <Stepper activeStep={activeStep} orientation="vertical">
        {cappedSteps.map((step, index) => (
          <StyledStep
            key={step.stepKey}
            completed={activeStep !== index}
          >
            <StepLabel>
              {t(step.stepKey)}
            </StepLabel>
          </StyledStep>
        ))}
      </Stepper>
    </StepperContainer>
  );
}

const StepperContainer = styled.div`
  margin: 30vh auto 0 auto;
  max-width: 320px;
  padding: 0;
`;

// Completed steps should be de-emphasized
const StyledStep = styled(Step)`
  ${({completed}) => completed ? `
    span, svg {
      color: #ffffff80!important;
    }
  ` : ''}
`;
