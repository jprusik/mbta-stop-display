import {useMemo} from 'react';
import moment from 'moment';
import styled from '@emotion/styled';
import {useTranslation} from 'react-i18next';
import {ServiceAlert as ServiceAlertType} from 'types';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ServiceAlert} from 'ServiceAlert';

export function ServiceAlerts ({
  alerts
}: {alerts: ServiceAlertType[]}): JSX.Element {
  const {t} = useTranslation();

  // Exclude alerts that aren't relevant to today
  const filteredAlerts = useMemo(() => {
    const endOfToday = moment().endOf('day');

    return alerts.filter(({attributes}) => {
      const alertStartsAfterToday =
        !!attributes.active_period[0]?.start &&
        moment(attributes.active_period[0].start).isAfter(endOfToday);

      return !alertStartsAfterToday;
    });
  }, [alerts]);

  const alertsCount = filteredAlerts?.length || 0;

  return (
    <AccordionStyled
      disableGutters={true}
      square={true}
    >
      <Summary sx={{margin: 0}} expandIcon={<ExpandMoreIcon />}>
        <AnnouncementIcon />
        {t('state.service_alerts_count', {alertsCount})}
      </Summary>
      <Details>
        {filteredAlerts.map(({id, attributes}) => (
          <ServiceAlert key={id} attributes={attributes} />
        ))}
      </Details>
    </AccordionStyled>
  );
}

const AccordionStyled = styled(Accordion)`
  padding: 0;

  > * {
    width: 100%;
  }
`;

const Summary = styled(AccordionSummary)`
  margin: 0 auto;
  max-width: 185px;
  min-height: 2rem;
  font-size: .8rem;
  font-weight: bold;

  > .MuiAccordionSummary-content {
    justify-content: space-between;
    margin: 0;
    background-color: transparent;
    text-align: center;
  }
`;

const Details = styled(AccordionDetails)`
  background-color: #121212;
`;
