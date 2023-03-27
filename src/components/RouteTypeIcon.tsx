import {RouteTypeKeyName} from 'types';
import {ReactComponent as IconBus} from 'images/icon-bus.svg';
import {ReactComponent as IconCommuterRail} from 'images/icon-commuter-rail.svg';
import {ReactComponent as IconFerry} from 'images/icon-ferry.svg';
import {ReactComponent as IconSubway} from 'images/icon-subway.svg';

export function RouteTypeIcon ({
  typeKey
}: {typeKey: RouteTypeKeyName}): JSX.Element | null {
  return typeKey === RouteTypeKeyName.BUS ? (
    <IconBus />
  ) : typeKey === RouteTypeKeyName.COMMUTER_RAIL ? (
    <IconCommuterRail />
  ) : typeKey === RouteTypeKeyName.FERRY ? (
    <IconFerry />
  ) : typeKey === RouteTypeKeyName.TRAIN ? (
    <IconSubway />
  ) : null;
}
