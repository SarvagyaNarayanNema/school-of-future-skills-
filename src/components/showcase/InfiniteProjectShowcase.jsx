import React from 'react';
import { FeaturedDestinationStage, AUTO_ADVANCE_INTERVAL_MS, TRANSITION_DURATION_MS } from './FeaturedDestinationStage';

export { AUTO_ADVANCE_INTERVAL_MS, TRANSITION_DURATION_MS };
export const AUTO_ADVANCE_DELAY_MS = AUTO_ADVANCE_INTERVAL_MS;

/**
 * InfiniteProjectShowcase is re-exported from FeaturedDestinationStage
 * representing the physical destination stage above the gallery.
 */
export const InfiniteProjectShowcase = FeaturedDestinationStage;
export default FeaturedDestinationStage;
