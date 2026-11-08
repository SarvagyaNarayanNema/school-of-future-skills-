import { useState, useEffect, useRef } from 'react';

/**
 * useFutureBotState
 * 
 * Manages the high-level emotional state machine of FutureBot
 * based on real application and conversation activity:
 * 'idle' | 'greeting' | 'listening' | 'thinking' | 'responding' | 'success' | 'error'
 */
export function useFutureBotState({
  isOpen = false,
  isListening = false,
  isTyping = false,
  isSpeaking = false,
  hasError = false,
  hasSuccess = false,
}) {
  const [characterState, setCharacterState] = useState('idle');
  const greetingTimer = useRef(null);
  const successTimer = useRef(null);
  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    // When modal just opens, show brief greeting state
    if (isOpen && !prevIsOpen.current) {
      setCharacterState('greeting');
      if (greetingTimer.current) clearTimeout(greetingTimer.current);
      greetingTimer.current = setTimeout(() => {
        setCharacterState('idle');
      }, 2400);
    }
    prevIsOpen.current = isOpen;

    return () => {
      if (greetingTimer.current) clearTimeout(greetingTimer.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isListening) {
      setCharacterState('listening');
    } else if (isTyping) {
      setCharacterState('thinking');
    } else if (isSpeaking) {
      setCharacterState('responding');
    } else if (hasError) {
      setCharacterState('error');
    } else if (hasSuccess) {
      setCharacterState('success');
      if (successTimer.current) clearTimeout(successTimer.current);
      successTimer.current = setTimeout(() => {
        setCharacterState('idle');
      }, 2000);
    } else {
      // Don't override active greeting timer
      setCharacterState((prev) => (prev === 'greeting' ? prev : 'idle'));
    }

    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, [isListening, isTyping, isSpeaking, hasError, hasSuccess]);

  return characterState;
}

export default useFutureBotState;

