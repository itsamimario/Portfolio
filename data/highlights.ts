/**
 * Impact highlights/metrics for the about page
 */

export interface Highlight {
  metric: string;
  label: string;
  context: string;
}

export const highlights: Highlight[] = [
  {
    metric: '10x',
    label: 'Revenue Growth',
    context: 'RatedPower',
  },
  {
    metric: '2x',
    label: 'YoY Revenue',
    context: 'Maxem',
  },
  {
    metric: '50%',
    label: 'D1 Retention',
    context: 'CatchIT!',
  },
  {
    metric: '100 MWp',
    label: 'Solar Delivered',
    context: 'Solarpack',
  },
  {
    metric: '3',
    label: 'Continents',
    context: 'Global Experience',
  },
  {
    metric: '6+',
    label: 'Years',
    context: 'Product Experience',
  },
];
