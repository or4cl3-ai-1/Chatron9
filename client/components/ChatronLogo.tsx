interface ChatronLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'minimal' | 'full';
  animated?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
};

const imageSizeMap = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
  xl: 'w-40 h-40'
};

export function ChatronLogo({ 
  size = 'md', 
  variant = 'full', 
  animated = true,
  className = ''
}: ChatronLogoProps) {
  const containerClasses = `
    ${sizeMap[size]}
    rounded-2xl
    flex items-center justify-center
    border border-purple-500/50
    ${animated ? 'animate-neon-pulse' : ''}
    ${className}
  `;

  const backgroundClasses = `
    absolute inset-0 rounded-2xl
    ${animated ? 'animate-neon-glow' : ''}
    bg-gradient-to-br from-purple-600/20 via-purple-700/10 to-transparent
  `;

  return (
    <div className={containerClasses}>
      {/* Animated background glow */}
      <div className={backgroundClasses}></div>

      {/* Background grid effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
      </div>

      {/* Logo content */}
      <div className="relative z-10 flex items-center justify-center">
        {variant === 'full' ? (
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F70d7898e704744669df7ce9457fc7421%2F052f9f673b014dc59a72d7690d52738a?format=webp&width=800&height=1200"
            alt="CHATRON-1 Logo"
            className={`${imageSizeMap[size]} drop-shadow-lg ${animated ? 'animate-float' : ''}`}
          />
        ) : (
          <div className="text-center">
            <span className="text-purple-300 font-bold text-2xl">C1</span>
          </div>
        )}
      </div>

      {/* Corner accent lights */}
      {animated && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-2 left-2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.25s' }}></div>
        </>
      )}
    </div>
  );
}

export function ChatronLogoBranded() {
  return (
    <div className="flex flex-col items-center gap-4">
      <ChatronLogo size="lg" variant="full" animated />
      <div className="text-center">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300">
          CHATRON-1
        </h2>
        <p className="text-xs text-gray-300 mt-1">
          The Daedalus Nexus
        </p>
      </div>
    </div>
  );
}
