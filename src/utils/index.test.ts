/**
 * @jest-environment node
 */
import {parseBusNumberStringForSort} from 'utils';

const testBusRouteNames = [
  {given: '62/76', expected: 5450},
  {given: '34E', expected: 5152},
  {given: 'SL1', expected: 837649},
  {given: 'SLW', expected: 837687},
  {given: 'SL/W', expected: 83764787},
  {given: 'CT2', expected: 678450},
  {given: '71', expected: 5549}
];

test('parses bus route names for sorting, correctly', () => {
  testBusRouteNames.forEach(({given, expected}) => {
    const parsedValue = parseBusNumberStringForSort(given)

    expect(parsedValue).toEqual(expected);
  });
});
