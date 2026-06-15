import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import { getTeam } from '../data/teams';
import Flag from './Flag';
import './NotificationToast.css';

export default function NotificationToast() {
  const { activeToast, closeToast } = useNotifications();

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      closeToast();
    }, 8000); // Auto close after 8 seconds
    return () => clearTimeout(timer);
  }, [activeToast, closeToast]);

  if (!activeToast) return null;

  const match = activeToast.match;
  let homeTeam = null;
  let awayTeam = null;

  if (match && match.home && match.away) {
    homeTeam = getTeam(match.home);
    awayTeam = getTeam(match.away);
  }

  return (
    <div className="notification-toast-container">
      <div className="notification-toast glass-card animate-slide-in">
        <div className="notification-toast__header">
          <span className="notification-toast__bell">🔔</span>
          <span className="notification-toast__title">{activeToast.title}</span>
          <button className="notification-toast__close" onClick={closeToast}>✕</button>
        </div>
        
        <div className="notification-toast__body">
          <p className="notification-toast__message">{activeToast.message}</p>
          
          {match && homeTeam && awayTeam && (
            <div className="notification-toast__match">
              <div className="notification-toast__teams">
                <span className="notification-toast__team">
                  <Flag code={homeTeam.code} size="sm" />
                  <span>{homeTeam.code}</span>
                </span>
                <span className="notification-toast__vs">vs</span>
                <span className="notification-toast__team">
                  <Flag code={awayTeam.code} size="sm" />
                  <span>{awayTeam.code}</span>
                </span>
              </div>
              <Link 
                to="/watch" 
                className="btn btn-xs btn-live notification-toast__btn"
                onClick={closeToast}
              >
                📺 Watch Live
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
