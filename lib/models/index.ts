import buildNewEstimation from './estimation';
import newBuildProperty from './property';
import estimationRates from '../data/estimation-rates';

const buildProperty = newBuildProperty();
const newEstimation = buildNewEstimation({ rates: estimationRates });

export { buildProperty, newEstimation };
