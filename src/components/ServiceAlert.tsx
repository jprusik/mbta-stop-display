import moment from 'moment';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@mui/material/styles';
import {
  ServiceAlertAttributes,
  ServiceAlertEffect,
  ServiceAlertLifecycle
} from 'types';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const HIGHLIGHTED_LIFECYCLES = [
  ServiceAlertLifecycle.NEW,
  ServiceAlertLifecycle.ONGOING,
  ServiceAlertLifecycle.ONGOING_UPCOMING,
];

const HIGHLIGHTED_EFFECTS = [
  ServiceAlertEffect.CANCELLATION,
  ServiceAlertEffect.DELAY,
  ServiceAlertEffect.DETOUR,
  ServiceAlertEffect.MODIFIED_SERVICE,
  ServiceAlertEffect.NO_SERVICE,
  ServiceAlertEffect.SCHEDULE_CHANGE,
  ServiceAlertEffect.SHUTTLE,
  ServiceAlertEffect.SNOW_ROUTE,
  ServiceAlertEffect.STATION_CLOSURE,
  ServiceAlertEffect.STOP_CLOSURE,
  ServiceAlertEffect.STOP_MOVE,
  ServiceAlertEffect.STOP_MOVED,
  ServiceAlertEffect.SUSPENSION,
  ServiceAlertEffect.TRACK_CHANGE,
]

export function ServiceAlert ({
  attributes
}: {attributes: ServiceAlertAttributes}): JSX.Element {
  const {t} = useTranslation();
  const {palette} = useTheme();

  const isHighlightedAlert =
    HIGHLIGHTED_LIFECYCLES.includes(attributes.lifecycle) &&
    HIGHLIGHTED_EFFECTS.includes(attributes.effect);

  const textColor = isHighlightedAlert ?
    palette.warning.contrastText : palette.info.contrastText;
  const backgroundColor = isHighlightedAlert ?
    palette.warning.main : palette.info.main;
  const backgroundColorSub = isHighlightedAlert ?
    palette.warning.dark : palette.info.dark;

  const alertDetails = [
    ...(attributes.header ? [attributes.header] : []),
    ...(attributes.description ? [attributes.description] : []),
  ];

  const updatedAtMoment = moment(attributes.updated_at);

  return (
    <AccordionStyled
      square={true}
      sx={{
        bgcolor: backgroundColor,
        color: textColor
      }}
    >
      <Summary
        expandIcon={
          <ArrowForwardIosSharpIcon
            sx={{
              color: textColor,
              fontSize: '0.9rem'
            }}
          />
        }
      >
        {attributes?.service_effect || null}
      </Summary>
      <Details
        sx={{
          bgcolor: backgroundColorSub,
          color: textColor,
        }}
      >
        {alertDetails.map(details => (
          <div key={details}>{details}</div>
        ))}
        {attributes.url && (
          <LinkContainer
            linkColor={isHighlightedAlert ?
              palette.info.dark : null
            }
          >
            <a href={attributes.url} target="_blank" rel="noreferrer">
              {t('action_prompt.additional_information_link')}
            </a>
            <OpenInNewIcon
              sx={{
                color: textColor,
                fontSize: '1rem'
              }}
            />
          </LinkContainer>
        )}
        {attributes.updated_at && (
          <div>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <sub>{t('state.last_updated_label')} {updatedAtMoment.fromNow()} ({updatedAtMoment.format('LLL')})</sub>
          </div>
        )}
      </Details>
    </AccordionStyled>
  );
}

const Summary = styled(AccordionSummary)`
  flex-direction: row-reverse;

  .MuiAccordionSummary-expandIconWrapper {
    margin-right: 5px;
  }
`;

const AccordionStyled = styled(Accordion)`
  border-bottom: 1px solid #333;
`;

const Details = styled(AccordionDetails)`
  text-align: left;

  > div {
    /* Needed because the alert description string can
    contain carriage returns/new lines */
    white-space: pre-wrap;

    &:not(:last-of-type) {
      margin-bottom: 1em;
    }
  }
`;

const LinkContainer = styled.div<{linkColor?: string | null;}>`
  display: flex;
  align-items: center;

  > a {
    margin-right: 5px;
    ${({linkColor}) => linkColor ? `color: ${linkColor};` : ''}
  }
`;
