import moment from 'moment';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@mui/material/styles';
import {
  AlertEffect,
  AlertLifecycle,
  ServiceAlertAttributes
} from 'types';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const HIGHLIGHTED_LIFECYCLES = [
  AlertLifecycle.NEW,
  AlertLifecycle.ONGOING,
  AlertLifecycle.ONGOING_UPCOMING
];

const HIGHLIGHTED_EFFECTS = [
  AlertEffect.CANCELLATION,
  AlertEffect.DELAY,
  AlertEffect.DETOUR,
  AlertEffect.MODIFIED_SERVICE,
  AlertEffect.NO_SERVICE,
  AlertEffect.SCHEDULE_CHANGE,
  AlertEffect.SHUTTLE,
  AlertEffect.SNOW_ROUTE,
  AlertEffect.STATION_CLOSURE,
  AlertEffect.STOP_CLOSURE,
  AlertEffect.STOP_MOVE,
  AlertEffect.STOP_MOVED,
  AlertEffect.SUSPENSION,
  AlertEffect.TRACK_CHANGE,
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
              {t('state.additional_information_link')}
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
