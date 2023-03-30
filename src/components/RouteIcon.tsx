import {LineColors, Route} from 'types';

// Direct import of SVGs for path referencing,
// SVGs as components for usage with JSX
import IconBlueLine, {
  ReactComponent as IconBlueLineComponent
} from 'images/icon-blue-line.svg';
import IconGreenLine, {
  ReactComponent as IconGreenLineComponent
} from 'images/icon-green-line.svg';
import IconGreenLineB, {
  ReactComponent as IconGreenLineBComponent
} from 'images/icon-green-line-b.svg';
import IconGreenLineC, {
  ReactComponent as IconGreenLineCComponent
} from 'images/icon-green-line-c.svg';
import IconGreenLineD, {
  ReactComponent as IconGreenLineDComponent
} from 'images/icon-green-line-d.svg';
import IconGreenLineE, {
  ReactComponent as IconGreenLineEComponent
} from 'images/icon-green-line-e.svg';
import IconMattapanLine, {
  ReactComponent as IconMattapanLineComponent
} from 'images/icon-mattapan-line.svg';
import IconOrangeLine, {
  ReactComponent as IconOrangeLineComponent
} from 'images/icon-orange-line.svg';
import IconRedLine, {
  ReactComponent as IconRedLineComponent
} from 'images/icon-red-line.svg';
import IconSilverLine, {
  ReactComponent as IconSilverLineComponent
} from 'images/icon-silver-line.svg';

enum GreenLineBranches {
  GREEN_B = "GREEN-B",
  GREEN_C = "GREEN-C",
  GREEN_D = "GREEN-D",
  GREEN_E = "GREEN-E"
}

enum RedLineBranches {
  MATTAPAN = "MATTAPAN"
}

function RedLineIconComponent({id}: {id: Route['id']}) {
  switch (id?.toUpperCase()) {
    case RedLineBranches.MATTAPAN:
      return (<IconMattapanLineComponent />);
    default:
      return (<IconRedLineComponent />);
  }
}

function GreenLineIconComponent({id}: {id: Route['id']}) {
  switch (id?.toUpperCase()) {
    case GreenLineBranches.GREEN_B:
      return (<IconGreenLineBComponent />);
    case GreenLineBranches.GREEN_C:
      return (<IconGreenLineCComponent />);
    case GreenLineBranches.GREEN_D:
      return (<IconGreenLineDComponent />);
    case GreenLineBranches.GREEN_E:
      return (<IconGreenLineEComponent />);
    default:
      return (<IconGreenLineComponent />);
  }
}

// Return the SVG as a component
export function RouteIconComponent ({
  color,
  id
}: {color?: LineColors, id: Route['id']}): JSX.Element | null {
  switch (color?.toUpperCase()) {
    case LineColors.BLUE:
      return (<IconBlueLineComponent />);
    case LineColors.GREEN:
      return (<GreenLineIconComponent id={id} />);
    case LineColors.RED:
      return (<RedLineIconComponent id={id} />);
    case LineColors.ORANGE:
      return (<IconOrangeLineComponent />);
    case LineColors.SILVER:
      return (<IconSilverLineComponent/>);
    default:
      return null;
  }
}

// Return the SVG Path
export function RouteIcon (
  color: LineColors,
  routeId?: Route['id']
): string | null {
  switch (color.toUpperCase()) {
    case LineColors.BLUE:
      return IconBlueLine;
    case LineColors.GREEN:
      switch (routeId?.toUpperCase()) {
        case GreenLineBranches.GREEN_B:
          return IconGreenLineB;
        case GreenLineBranches.GREEN_C:
          return IconGreenLineC;
        case GreenLineBranches.GREEN_D:
          return IconGreenLineD;
        case GreenLineBranches.GREEN_E:
          return IconGreenLineE;
        default:
          return IconGreenLine;
      }
    case LineColors.RED:
      switch (routeId?.toUpperCase()) {
        case RedLineBranches.MATTAPAN:
          return IconMattapanLine;
        default:
          return IconRedLine;
      }
    case LineColors.ORANGE:
      return IconOrangeLine;
    case LineColors.SILVER:
      return IconSilverLine;
    default:
      return null;
  }
}
