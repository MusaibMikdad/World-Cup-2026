import { useState, useEffect, useRef } from 'react';
import './CountdownTimer.css';

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target) - new Date());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    total: diff,
  };
}

export default function CountdownTimer({ targetDate, label }) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const tick = () => {
      setTime(getTimeLeft(targetDate));
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (time.total <= 0) {
    return (
      <div className="countdown">
        {label && <p className="countdown__label">{label}</p>}
        <div className="countdown__expired badge badge-live">KICK OFF!</div>
      </div>
    );
  }

  const units = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hrs' },
    { value: time.minutes, label: 'Min' },
    { value: time.seconds, label: 'Sec' },
  ];

  return (
    <div className="countdown">
      {label && <p className="countdown__label">{label}</p>}
      <div className="countdown__boxes">
        {units.map((unit) => (
          <div className="countdown__box" key={unit.label}>
            <span className="countdown__value" key={unit.value}>
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="countdown__unit">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
