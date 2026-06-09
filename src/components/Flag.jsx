import './Flag.css';

// FIFA code → ISO 3166-1 alpha-2 code mapping
const fifaToIso = {
  MEX: 'mx', RSA: 'za', KOR: 'kr', CZE: 'cz',
  CAN: 'ca', SUI: 'ch', QAT: 'qa', BIH: 'ba',
  BRA: 'br', MAR: 'ma', HAI: 'ht', SCO: 'gb-sct',
  USA: 'us', PAR: 'py', AUS: 'au', TUR: 'tr',
  GER: 'de', CUW: 'cw', CIV: 'ci', ECU: 'ec',
  NED: 'nl', JPN: 'jp', SWE: 'se', TUN: 'tn',
  BEL: 'be', EGY: 'eg', IRN: 'ir', NZL: 'nz',
  ESP: 'es', CPV: 'cv', KSA: 'sa', URU: 'uy',
  FRA: 'fr', SEN: 'sn', IRQ: 'iq', NOR: 'no',
  ARG: 'ar', ALG: 'dz', AUT: 'at', JOR: 'jo',
  POR: 'pt', COD: 'cd', UZB: 'uz', COL: 'co',
  ENG: 'gb-eng', CRO: 'hr', GHA: 'gh', PAN: 'pa',
};

// flagcdn.com only supports these PNG widths
const SUPPORTED_WIDTHS = [20, 40, 80, 160, 320];

function getClosestWidth(desired) {
  return SUPPORTED_WIDTHS.find(w => w >= desired) || 160;
}

function getFlagUrl(fifaCode, displayWidth) {
  const iso = fifaToIso[fifaCode];
  if (!iso) return null;
  // Use a supported width that's >= the desired display size for crisp rendering
  const cdnWidth = getClosestWidth(displayWidth * 2);
  return `https://flagcdn.com/w${cdnWidth}/${iso}.png`;
}

/**
 * Flag component — renders an actual flag image
 * @param {{ code: string, size?: 'sm' | 'md' | 'lg' }} props
 */
export default function Flag({ code, size = 'md' }) {
  const sizeMap = { sm: 20, md: 28, lg: 40 };
  const width = sizeMap[size] || 28;
  const url = getFlagUrl(code, width);

  if (!url) {
    return <span className={`flag-img flag-img--${size} flag-img--fallback`}>🏳️</span>;
  }

  return (
    <img
      className={`flag-img flag-img--${size}`}
      src={url}
      alt={`${code} flag`}
      width={width}
      loading="lazy"
      draggable={false}
    />
  );
}
