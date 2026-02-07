// Accurate moon phase calculation and solunar fishing periods
// Based on astronomical algorithms - no external API needed

export interface MoonData {
  phase: string;
  phaseName: string;
  illumination: number; // 0-100%
  age: number; // days into cycle (0-29.53)
  isFirstQuarterWindow: boolean; // 3 days leading into + day of first quarter
  moonRiseApprox: string; // HH:MM approximate
  moonSetApprox: string;
  moonOverhead: string; // approximate time moon is directly above
  moonUnderfoot: string; // approximate time moon is directly below
  majorPeriods: { start: string; end: string }[];
  minorPeriods: { start: string; end: string }[];
  solunarRating: 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Poor';
}

// Accurate moon phase calculation using Jean Meeus algorithm
function getMoonAge(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Calculate Julian Date
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;

  // Known new moon: January 6, 2000 18:14 UTC (JD 2451550.26)
  const knownNewMoon = 2451550.26;
  const lunarCycle = 29.53058867; // Synodic month

  const daysSinceNew = JD - knownNewMoon;
  const cycles = daysSinceNew / lunarCycle;
  const age = (cycles - Math.floor(cycles)) * lunarCycle;

  return age;
}

function getMoonPhaseName(age: number): { phase: string; phaseName: string } {
  if (age < 1.85) return { phase: 'new', phaseName: 'New Moon' };
  if (age < 7.38) return { phase: 'waxing_crescent', phaseName: 'Waxing Crescent' };
  if (age < 9.23) return { phase: 'first_quarter', phaseName: 'First Quarter' };
  if (age < 14.77) return { phase: 'waxing_gibbous', phaseName: 'Waxing Gibbous' };
  if (age < 16.61) return { phase: 'full', phaseName: 'Full Moon' };
  if (age < 22.15) return { phase: 'waning_gibbous', phaseName: 'Waning Gibbous' };
  if (age < 23.99) return { phase: 'last_quarter', phaseName: 'Last Quarter' };
  if (age < 27.68) return { phase: 'waning_crescent', phaseName: 'Waning Crescent' };
  return { phase: 'new', phaseName: 'New Moon' };
}

function getMoonIllumination(age: number): number {
  // Approximate illumination based on age
  const cyclePosition = age / 29.53;
  return Math.round(50 * (1 - Math.cos(2 * Math.PI * cyclePosition)));
}

// Approximate moonrise time based on moon age
// New moon rises ~6am, first quarter ~noon, full ~6pm, last quarter ~midnight
function getApproxMoonTimes(age: number): { rise: string; set: string; overhead: string; underfoot: string } {
  // Moonrise shifts ~50 minutes later each day
  const baseRiseHour = 6; // New moon rises at ~6am
  const riseOffset = (age * 50) / 60; // 50 minutes per day in hours
  const riseHour = (baseRiseHour + riseOffset) % 24;
  const setHour = (riseHour + 12) % 24;
  const overheadHour = (riseHour + 6) % 24;
  const underfootHour = (riseHour + 18) % 24;

  const formatTime = (h: number): string => {
    const hours = Math.floor(h);
    const minutes = Math.floor((h - hours) * 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return {
    rise: formatTime(riseHour),
    set: formatTime(setHour),
    overhead: formatTime(overheadHour),
    underfoot: formatTime(underfootHour),
  };
}

// Solunar theory: Major periods occur when moon is directly overhead or underfoot
// Minor periods occur at moonrise and moonset
function getSolunarPeriods(age: number): { major: { start: string; end: string }[]; minor: { start: string; end: string }[] } {
  const times = getApproxMoonTimes(age);

  const addMinutes = (timeStr: string, minutes: number): string => {
    const match = timeStr.match(/(\d+):(\d+) (AM|PM)/);
    if (!match) return timeStr;
    let hour = parseInt(match[1]);
    let min = parseInt(match[2]);
    const ampm = match[3];

    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;

    const totalMin = hour * 60 + min + minutes;
    const newHour = Math.floor(((totalMin % 1440) + 1440) % 1440 / 60);
    const newMin = ((totalMin % 1440) + 1440) % 1440 % 60;
    const newAmpm = newHour >= 12 ? 'PM' : 'AM';
    const displayHour = newHour % 12 || 12;
    return `${displayHour}:${newMin.toString().padStart(2, '0')} ${newAmpm}`;
  };

  return {
    major: [
      { start: addMinutes(times.overhead, -60), end: addMinutes(times.overhead, 60) },
      { start: addMinutes(times.underfoot, -60), end: addMinutes(times.underfoot, 60) },
    ],
    minor: [
      { start: addMinutes(times.rise, -30), end: addMinutes(times.rise, 30) },
      { start: addMinutes(times.set, -30), end: addMinutes(times.set, 30) },
    ],
  };
}

// Rate solunar activity based on moon phase
function getSolunarRating(age: number, isFirstQuarterWindow: boolean): MoonData['solunarRating'] {
  const { phase } = getMoonPhaseName(age);

  // First quarter window is prime fishing (user emphasis)
  if (isFirstQuarterWindow) return 'Excellent';

  // New and full moons have strongest gravitational pull
  if (phase === 'new' || phase === 'full') return 'Very Good';

  // Quarter moons are good
  if (phase === 'first_quarter' || phase === 'last_quarter') return 'Good';

  // Waxing crescent (building to first quarter) is fair to good
  if (phase === 'waxing_crescent') {
    // Last 3 days before first quarter
    if (age >= 4.4) return 'Good';
    return 'Fair';
  }

  // Waxing gibbous is fair
  if (phase === 'waxing_gibbous') return 'Fair';

  // Waning phases are least productive
  return 'Fair';
}

export function getMoonData(date: Date): MoonData {
  const age = getMoonAge(date);
  const { phase, phaseName } = getMoonPhaseName(age);
  const illumination = getMoonIllumination(age);
  const times = getApproxMoonTimes(age);
  const solunarPeriods = getSolunarPeriods(age);

  // First quarter window: the 3 days leading up to and including first quarter
  // First quarter occurs around age 7.38
  const isFirstQuarterWindow = age >= 4.4 && age <= 9.23;

  const solunarRating = getSolunarRating(age, isFirstQuarterWindow);

  return {
    phase,
    phaseName,
    illumination,
    age,
    isFirstQuarterWindow,
    moonRiseApprox: times.rise,
    moonSetApprox: times.set,
    moonOverhead: times.overhead,
    moonUnderfoot: times.underfoot,
    majorPeriods: solunarPeriods.major,
    minorPeriods: solunarPeriods.minor,
    solunarRating,
  };
}

// Get moon score for fishing forecast (0-100)
export function getMoonFishingScore(date: Date): number {
  const moon = getMoonData(date);
  let score = 0;

  // Phase score (0-30)
  switch (moon.phase) {
    case 'new': score += 22; break;
    case 'waxing_crescent': score += (moon.age >= 4.4 ? 28 : 18); break;
    case 'first_quarter': score += 30; break; // Prime fishing (user emphasis)
    case 'waxing_gibbous': score += 18; break;
    case 'full': score += 25; break;
    case 'waning_gibbous': score += 15; break;
    case 'last_quarter': score += 18; break;
    case 'waning_crescent': score += 10; break;
  }

  // First quarter window bonus (user emphasis: "very prime excellent fishing")
  if (moon.isFirstQuarterWindow) {
    score += 20;
  }

  // Solunar rating bonus
  switch (moon.solunarRating) {
    case 'Excellent': score += 15; break;
    case 'Very Good': score += 12; break;
    case 'Good': score += 8; break;
    case 'Fair': score += 5; break;
    case 'Poor': score += 0; break;
  }

  return Math.min(100, score);
}
