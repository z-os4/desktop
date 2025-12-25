import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
  duration?: number;
  logo?: React.ReactNode;
  className?: string;
}

const BootSequence: React.FC<BootSequenceProps> = ({
  onComplete,
  duration = 3000,
  logo,
  className
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'logo' | 'loading' | 'complete'>('logo');

  useEffect(() => {
    // Show logo
    const logoTimer = setTimeout(() => {
      setPhase('loading');
    }, 500);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    // Complete
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      setTimeout(onComplete, 500);
    }, duration);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black ${className || ''}`}>
      {/* Logo */}
      <div className={`transition-opacity duration-500 ${phase === 'logo' ? 'opacity-0' : 'opacity-100'}`}>
        {logo || (
          <div className="text-6xl mb-8">
            🍎
          </div>
        )}
      </div>

      {/* Progress bar */}
      {phase === 'loading' && (
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mt-8">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Fade out */}
      {phase === 'complete' && (
        <div className="absolute inset-0 bg-black animate-fadeOut" />
      )}
    </div>
  );
};

export default BootSequence;
