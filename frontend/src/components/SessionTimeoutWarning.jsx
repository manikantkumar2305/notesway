import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './SessionTimeoutWarning.module.css';

const INACTIVITY_WARNING_TIME = 25 * 60 * 1000; // 25 minutes
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const SessionTimeoutWarning = ({ onTimeout, onExtend }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  let timeoutId = null;
  let warningTimeoutId = null;
  let countdownId = null;

  useEffect(() => {
    const resetInactivityTimer = () => {
      clearTimeout(timeoutId);
      clearTimeout(warningTimeoutId);
      clearInterval(countdownId);
      setShowWarning(false);

      // Show warning after 25 minutes of inactivity
      warningTimeoutId = setTimeout(() => {
        setShowWarning(true);
        setTimeRemaining(5 * 60); // 5 minutes countdown

        // Countdown timer
        countdownId = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              clearInterval(countdownId);
              handleTimeout();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, INACTIVITY_WARNING_TIME);

      // Auto logout after 30 minutes
      timeoutId = setTimeout(() => {
        handleTimeout();
      }, SESSION_TIMEOUT);
    };

    // Track user activity
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer, true);
    });

    resetInactivityTimer();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(warningTimeoutId);
      clearInterval(countdownId);
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer, true);
      });
    };
  }, []);

  const handleTimeout = () => {
    setShowWarning(false);
    onTimeout?.();
  };

  const handleExtend = () => {
    setShowWarning(false);
    onExtend?.();
    // Reset the timer
    const resetInactivityTimer = () => {
      // Timer will be reset
    };
    resetInactivityTimer();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showWarning) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <AlertTriangle size={32} color="#f59e0b" />
          <h2>Session Timeout Warning</h2>
        </div>

        <div className={styles.content}>
          <p>Your session is about to expire due to inactivity.</p>
          <p className={styles.timeRemaining}>
            Time remaining: <strong>{formatTime(timeRemaining)}</strong>
          </p>
          <p className={styles.warning}>
            Click "Continue Session" to stay logged in, or your session will be automatically terminated.
          </p>
        </div>

        <div className={styles.actions}>
          <button className={styles.extendBtn} onClick={handleExtend}>
            Continue Session
          </button>
          <button className={styles.logoutBtn} onClick={handleTimeout}>
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
};
