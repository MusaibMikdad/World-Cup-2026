import { createContext, useContext, useState, useEffect } from 'react';
import { useMatches } from '../hooks/useMatches';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { matches } = useMatches();
  const [globalEnabled, setGlobalEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('wc_global_notifications');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [notifiedIds, setNotifiedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('wc_notified_matches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('wc_global_notifications', JSON.stringify(globalEnabled));
  }, [globalEnabled]);

  useEffect(() => {
    localStorage.setItem('wc_notified_matches', JSON.stringify(notifiedIds));
  }, [notifiedIds]);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications.');
      return false;
    }
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  const toggleGlobalNotifications = async () => {
    if (!globalEnabled) {
      const hasPermission = await requestPermission();
      if (!hasPermission && ('Notification' in window) && Notification.permission === 'denied') {
        alert('Please enable notifications in your browser settings to receive match reminders.');
        return;
      }
      
      setGlobalEnabled(true);
      
      // Confirm subscription immediately
      if ('Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('Notifications Enabled!', {
            body: "You'll be notified 1 minute before every World Cup match kickoff.",
            icon: '/favicon.ico',
          });
        } catch (e) {
          console.warn('Notification creation failed:', e);
        }
      }
      
      triggerToast('Notifications Enabled!', "You'll receive a reminder 1 minute before every match.");
    } else {
      setGlobalEnabled(false);
      setNotifiedIds([]);
      triggerToast('Notifications Disabled', 'Match reminders turned off.');
    }
  };

  const triggerToast = (title, message, match = null) => {
    setActiveToast({ title, message, match });
  };

  const closeToast = () => {
    setActiveToast(null);
  };

  // Poll for kickoff times every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!globalEnabled) return;
      if (!matches || matches.length === 0) return;

      const now = new Date();
      const ONE_MINUTE_MS = 1 * 60 * 1000;

      matches.forEach(match => {
        if (match.status !== 'SCHEDULED') return;
        if (notifiedIds.includes(match.id)) return;

        const matchTime = new Date(match.date);
        const diffMs = matchTime - now;

        // Trigger notification if match is within 1 minute
        if (diffMs > 0 && diffMs <= ONE_MINUTE_MS) {
          const matchDescription = `${match.home} vs ${match.away}`;

          // 1. Trigger native notification
          if ('Notification' in window && Notification.permission === 'granted') {
            try {
              const notif = new Notification('Match Kickoff Soon!', {
                body: `${matchDescription} starts in 1 minute!`,
                icon: '/favicon.ico',
                requireInteraction: true,
              });
              notif.onclick = () => {
                window.focus();
                window.location.hash = '#watch';
              };
            } catch (e) {
              console.warn('Native notification failed:', e);
            }
          }

          // 2. Trigger in-app toast
          triggerToast(
            'Kickoff in 1 Minute!',
            `${matchDescription} is starting soon. Get ready to watch live!`,
            match
          );

          // 3. Mark as notified
          setNotifiedIds(prev => [...prev, match.id]);
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [matches, globalEnabled, notifiedIds]);

  return (
    <NotificationContext.Provider value={{
      globalEnabled,
      toggleGlobalNotifications,
      activeToast,
      closeToast,
      requestPermission
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
