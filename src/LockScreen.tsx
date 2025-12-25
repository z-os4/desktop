import React, { useState, useEffect } from 'react';

interface LockScreenProps {
  isLocked: boolean;
  onUnlock: (password?: string) => void;
  userName?: string;
  userAvatar?: string;
  requirePassword?: boolean;
  className?: string;
}

const LockScreen: React.FC<LockScreenProps> = ({
  isLocked,
  onUnlock,
  userName = 'User',
  userAvatar,
  requirePassword = false,
  className
}) => {
  const [password, setPassword] = useState('');
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requirePassword) {
      // In a real app, validate password
      if (password === 'password') {
        onUnlock(password);
      } else {
        setError(true);
        setPassword('');
        setTimeout(() => setError(false), 500);
      }
    } else {
      onUnlock();
    }
  };

  if (!isLocked) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-cover bg-center ${className || ''}`}
      style={{ backgroundImage: 'url(/wallpapers/default.jpg)' }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Time */}
        <div className="text-white text-8xl font-light mb-2">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-white/70 text-xl mb-16">
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>

        {/* User */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl mb-4 overflow-hidden">
            {userAvatar ? (
              <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
            ) : (
              '👤'
            )}
          </div>
          <div className="text-white text-xl mb-4">{userName}</div>

          {requirePassword ? (
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                className={`w-64 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white placeholder-white/50 outline-none text-center ${
                  error ? 'animate-shake border-2 border-red-500' : ''
                }`}
                autoFocus
              />
            </form>
          ) : (
            <button
              onClick={() => onUnlock()}
              className="px-6 py-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition-colors"
            >
              Click to Unlock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
