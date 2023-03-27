import {LineColors, Route} from 'types';
import {
  ReactComponent as IconBlueLine
} from 'images/icon-blue-line.svg';
import {
  ReactComponent as IconGreenLine
} from 'images/icon-green-line.svg';
import {
  ReactComponent as IconGreenLineB
} from 'images/icon-green-line-b.svg';
import {
  ReactComponent as IconGreenLineC
} from 'images/icon-green-line-c.svg';
import {
  ReactComponent as IconGreenLineD
} from 'images/icon-green-line-d.svg';
import {
  ReactComponent as IconGreenLineE
} from 'images/icon-green-line-e.svg';
import {
  ReactComponent as IconMattapanLine
} from 'images/icon-mattapan-line.svg';
import {
  ReactComponent as IconOrangeLine
} from 'images/icon-orange-line.svg';
import {
  ReactComponent as IconRedLine
} from 'images/icon-red-line.svg';
import {
  ReactComponent as IconSilverLine
} from 'images/icon-silver-line.svg';

function RedLineIcon({id}: {id: Route['id']}) {
  switch (id?.toUpperCase()) {
    case 'MATTAPAN':
      return <IconMattapanLine />
    default:
      return <IconRedLine />
  }
}

function GreenLineIcon({id}: {id: Route['id']}) {
  switch (id?.toUpperCase()) {
    case 'GREEN-B':
      return <IconGreenLineB />
    case 'GREEN-C':
      return <IconGreenLineC />
    case 'GREEN-D':
      return <IconGreenLineD />
    case 'GREEN-E':
      return <IconGreenLineE />
    default:
      return <IconGreenLine />
  }
}

export function RouteIcon ({
  color,
  id
}: {color?: LineColors, id: Route['id']}): JSX.Element | null {
  switch (color?.toUpperCase()) {
    case LineColors.BLUE:
      return <IconBlueLine />
    case LineColors.GREEN:
      return <GreenLineIcon id={id} />
    case LineColors.RED:
      return <RedLineIcon id={id} />
    case LineColors.ORANGE:
      return <IconOrangeLine />
    case LineColors.SILVER:
      return <IconSilverLine />
    default:
      return null;
  }
}
