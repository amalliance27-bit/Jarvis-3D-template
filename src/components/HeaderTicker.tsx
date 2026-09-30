import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CloudSun, Sparkles, Compass, Moon, Play, Pause } from 'lucide-react';

interface HeaderTickerProps {
  isAutoScrollActive?: boolean;
  onToggleAutoScroll?: () => void;
}

/**
 * Calculates the Universal Day Number (Life Path Number of the day)
 * in Pythagorean numerology by reducing month, day, and year digits.
 */
function getLifePathDayInfo(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const reduceDigits = (num: number): number => {
    let sum = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    // Keep master numbers 11, 22, 33 or reduce to single digit
    if (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      return reduceDigits(sum);
    }
    return sum;
  };

  const totalSum = reduceDigits(month) + reduceDigits(day) + reduceDigits(year);
  const lifePathNumber = reduceDigits(totalSum);

  const vibrations: Record<number, { title: string; focus: string }> = {
    1: { title: 'Initiation & Leadership', focus: 'Action, courage, and bold beginnings' },
    2: { title: 'Harmony & Collaboration', focus: 'Intuition, diplomacy, and balanced partnership' },
    3: { title: 'Creative Expression & Expansion', focus: 'Optimism, voice, and artistic vision' },
    4: { title: 'Foundations & Structure', focus: 'Discipline, meticulous craft, and stability' },
    5: { title: 'Dynamic Breakthrough & Freedom', focus: 'Adaptability, rapid innovation, and change' },
    6: { title: 'Service, Balance & Community', focus: 'Responsibility, harmony, and elevated care' },
    7: { title: 'Deep Insight & Inner Truth', focus: 'Wisdom, technical mastery, and spiritual focus' },
    8: { title: 'Abundance & Material Mastery', focus: 'Empowerment, business acumen, and scale' },
    9: { title: 'Universal Vision & Completion', focus: 'Philanthropy, higher perspective, and release' },
    11: { title: 'Master Illumination', focus: 'High frequency vision and spiritual clarity' },
    22: { title: 'Master Builder', focus: 'Turning monumental concepts into physical form' },
    33: { title: 'Master Teacher', focus: 'Uplifting consciousness and inspired creation' },
  };

  const info = vibrations[lifePathNumber] || {
    title: 'New Horizons',
    focus: 'Clarity, purpose, and deliberate momentum',
  };

  return { number: lifePathNumber, ...info };
}

export function HeaderTicker({ isAutoScrollActive, onToggleAutoScroll }: HeaderTickerProps) {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [tempCelsius, setTempCelsius] = useState<number>(22);
  const [tempFahrenheit, setTempFahrenheit] = useState<number>(72);
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(true);

  // Live timer updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const lifePath = getLifePathDayInfo(currentDateTime);

  // Formatted date and time
  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate days remaining in Gemini retrograde / transit cycle
  // Gemini retrograde phase active status until October 24, 2026
  const retrogradeTargetDate = new Date('2026-10-24T00:00:00');
  const msRemaining = retrogradeTargetDate.getTime() - currentDateTime.getTime();
  const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
  const retrogradeStatus =
    daysRemaining > 0
      ? `Active Direct Transit until Oct 24, 2026 (${daysRemaining} Days)`
      : `Stationing Direct · Post-Retrograde Shadow Clear`;

  // Aspirational Daily Themes & Messages
  const dailyTheme = 'Radical Clarity, Zero Overhead & Conscious Creation';
  const aspirationalMessage =
    'Build without bloated agency overhead · Transform ideas from basic mockups into high-impact AI interactive experiences · Lead with purpose';

  return (
    <div className="w-full bg-black/95 text-white border-b border-white/10 select-none overflow-hidden relative z-50">
      <div className="flex items-center justify-between text-[11px] font-mono leading-none">
        
        {/* Left pinned item: Live Clock & Date */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 border-r border-white/10 shrink-0 bg-neutral-950/80">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <Clock className="w-3 h-3 text-[#adff2f]" />
            <span className="text-white font-semibold tabular-nums">{formattedTime}</span>
          </div>
          <span className="text-neutral-600" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Calendar className="w-3 h-3 text-neutral-400" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Center scrolling continuous marquee ticker */}
        <div className="relative flex-1 overflow-hidden py-2 px-2">
          <div className="ticker-track flex items-center gap-8 whitespace-nowrap">
            
            {/* Item 1: Live Date & Time for mobile/desktop marquee */}
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-3 h-3 text-[#adff2f]" />
              <span className="text-white font-semibold">{formattedTime}</span>
              <span className="text-neutral-500">({formattedDate})</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            {/* Item 2: Temperature */}
            <div 
              onClick={() => setIsFahrenheit(!isFahrenheit)}
              className="flex items-center gap-1.5 text-neutral-300 cursor-pointer hover:text-white transition-colors"
              title="Click to toggle °F / °C"
            >
              <CloudSun className="w-3 h-3 text-cyan-400" />
              <span>Temp:</span>
              <span className="text-white font-bold tabular-nums">
                {isFahrenheit ? `${tempFahrenheit}°F` : `${tempCelsius}°C`}
              </span>
              <span className="text-neutral-400">· Clear Skies</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            {/* Item 3: Gemini in Retrograde Status */}
            <div className="flex items-center gap-2 text-neutral-300">
              <Moon className="w-3 h-3 text-purple-400" />
              <span className="text-neutral-400">Gemini in Retrograde Status:</span>
              <span className="text-[#adff2f] font-semibold">{retrogradeStatus}</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            {/* Item 4: Life Path Number of the Day */}
            <div className="flex items-center gap-2 text-neutral-300">
              <Compass className="w-3 h-3 text-[#adff2f]" />
              <span className="text-neutral-400">Life Path Number Today:</span>
              <span className="px-1.5 py-0.5 rounded bg-[#adff2f]/20 text-[#adff2f] font-bold tabular-nums">
                {lifePath.number}
              </span>
              <span className="text-white font-medium">{lifePath.title}</span>
              <span className="text-neutral-500">({lifePath.focus})</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            {/* Item 5: Theme */}
            <div className="flex items-center gap-2 text-neutral-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span className="text-neutral-400">Daily Theme:</span>
              <span className="text-white font-semibold">{dailyTheme}</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            {/* Item 6: Aspirational Message */}
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="text-[#adff2f] font-bold">Aspiration:</span>
              <span className="text-neutral-200">{aspirationalMessage}</span>
            </div>

            {/* Duplicate set for seamless infinite loop */}
            <span className="text-neutral-600" aria-hidden="true">|</span>

            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-3 h-3 text-[#adff2f]" />
              <span className="text-white font-semibold">{formattedTime}</span>
              <span className="text-neutral-500">({formattedDate})</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            <div className="flex items-center gap-1.5 text-neutral-300">
              <CloudSun className="w-3 h-3 text-cyan-400" />
              <span>Temp:</span>
              <span className="text-white font-bold tabular-nums">
                {isFahrenheit ? `${tempFahrenheit}°F` : `${tempCelsius}°C`}
              </span>
              <span className="text-neutral-400">· Clear Skies</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            <div className="flex items-center gap-2 text-neutral-300">
              <Moon className="w-3 h-3 text-purple-400" />
              <span className="text-neutral-400">Gemini in Retrograde Status:</span>
              <span className="text-[#adff2f] font-semibold">{retrogradeStatus}</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            <div className="flex items-center gap-2 text-neutral-300">
              <Compass className="w-3 h-3 text-[#adff2f]" />
              <span className="text-neutral-400">Life Path Number Today:</span>
              <span className="px-1.5 py-0.5 rounded bg-[#adff2f]/20 text-[#adff2f] font-bold tabular-nums">
                {lifePath.number}
              </span>
              <span className="text-white font-medium">{lifePath.title}</span>
            </div>

            <span className="text-neutral-600" aria-hidden="true">|</span>

            <div className="flex items-center gap-2 text-neutral-300">
              <span className="text-[#adff2f] font-bold">Aspiration:</span>
              <span className="text-neutral-200">{aspirationalMessage}</span>
            </div>

          </div>
        </div>

        {/* Right pinned item: Subtle Hypnotic Auto-scroll toggle status */}
        {onToggleAutoScroll && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 border-l border-white/10 shrink-0 bg-neutral-950/80">
            <button
              onClick={onToggleAutoScroll}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
              title="Toggle background hypnotic scroll"
            >
              {isAutoScrollActive ? (
                <>
                  <Pause className="w-2.5 h-2.5 text-[#adff2f] fill-[#adff2f]" />
                  <span className="text-[10px] text-[#adff2f]">Scroll: Active</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5 text-neutral-400 fill-neutral-400" />
                  <span className="text-[10px] text-neutral-400">Scroll: Paused</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .ticker-track {
          display: inline-flex;
          animation: ticker 42s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
