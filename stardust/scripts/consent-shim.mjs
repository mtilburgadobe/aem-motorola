// Run-local preload (node --import): adds motorola.com's Evidon consent control to the shared
// live-session consent candidates, for instruments without a --consent flag. No script is edited.
import { CONSENT_CANDIDATES } from './diff/live-session.mjs';

if (!CONSENT_CANDIDATES.includes('#_evidon-banner-acceptbutton')) CONSENT_CANDIDATES.unshift('#_evidon-banner-acceptbutton');
