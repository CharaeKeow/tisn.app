import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';

import { decodeText } from '../../logic/utils';
import { formatDateTimeRange } from '../../logic/date-time';

import Style from '../Style/Style';

const EventDetails = (props) => {
  const {
    event,
    restrictedDisplay,
    futureEvent,
    userAttending,
    handleClick,
    attendants,
    limitMet,
  } = props;

  const history = useHistory();
  const style = Style();

  const decodedName = decodeText(event.name);

  return (
    <Card>
      <CardMedia
        component="img"
        src={
          event.coverPhoto ? event.coverPhoto : '../../../event-placeholder.jpg'
        }
        alt={decodedName}
        title={decodedName}
      />
      <CardContent>
        <div className={style.alignRight}>
          <Typography
            gutterBottom
            className={style.preLine}
            variant="h5"
            component="p"
            color="textSecondary"
          >
            {formatDateTimeRange(event.startDate, event.endDate)}
          </Typography>
          {futureEvent && (
            <Fragment>
              {(!limitMet || userAttending) && (
                <Button
                  variant={userAttending ? 'outlined' : 'contained'}
                  color={userAttending ? 'secondary' : 'primary'}
                  onClick={() => handleClick()}
                >
                  {userAttending ? "I won't attend" : 'I will attend!'}
                </Button>
              )}
              <Typography gutterBottom variant="body1" color="textSecondary">
                Attendants limit: {event.attendantsLimit}
              </Typography>
              {restrictedDisplay && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => history.push(`/events/${event._id}/edit`)}
                >
                  Edit
                </Button>
              )}
            </Fragment>
          )}
        </div>
        <Typography gutterBottom variant="h5" component="h3">
          {decodedName}
        </Typography>
        <Typography
          gutterBottom
          className={style.preLine}
          variant="body1"
          component="p"
          color="textSecondary"
        >
          {decodeText(event.description)}
        </Typography>
        {event.relatedInterests.length > 0 && (
          <Fragment>
            <Typography variant="h6" component="h4">
              Related interests:
            </Typography>
            {event.relatedInterests.map((interest) => (
              <Chip
                className={style.chip}
                variant="outlined"
                key={interest._id}
                avatar={<Avatar src={interest.avatar} alt={interest.name} />}
                label={interest.name}
              />
            ))}
          </Fragment>
        )}
        {attendants && attendants.length > 0 && (
          <Fragment>
            <Typography variant="h6" component="h4">
              Attendants:
            </Typography>
            <AvatarGroup>
              {attendants.map((attendant) => (
                <Avatar
                  key={attendant.user._id}
                  src={attendant.user.avatar}
                  alt={`${attendant.user.name}'s avatar`}
                >
                  {attendant.user.name.charAt(0).toUpperCase()}
                </Avatar>
              ))}
            </AvatarGroup>
          </Fragment>
        )}
      </CardContent>
    </Card>
  );
};

export default EventDetails;
