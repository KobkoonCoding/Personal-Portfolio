import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [showControls, setShowControls] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);

    // Public no-copyright chill instrumental music
    const musicUrl = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Autoplay music when component mounts
    useEffect(() => {
        const autoplayMusic = async () => {
            if (audioRef.current && !isPlaying) {
                try {
                    audioRef.current.volume = volume;
                    await audioRef.current.play();
                    setIsPlaying(true);
                    setAudioError(false);
                    setIsLoading(false);
                    console.log('Music started automatically');
                } catch (err) {
                    console.log('Autoplay prevented. Waiting for user interaction...');
                    setIsLoading(false);

                    const startOnInteraction = async () => {
                        try {
                            await audioRef.current.play();
                            setIsPlaying(true);
                            setAudioError(false);
                            console.log('Music started after user interaction');
                            document.removeEventListener('click', startOnInteraction);
                            document.removeEventListener('touchstart', startOnInteraction);
                        } catch (e) {
                            console.log('Failed to start music:', e);
                        }
                    };

                    document.addEventListener('click', startOnInteraction, { once: true });
                    document.addEventListener('touchstart', startOnInteraction, { once: true });
                }
            }
        };

        const timer = setTimeout(autoplayMusic, 1000);
        return () => clearTimeout(timer);
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                setIsLoading(true);
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setAudioError(false);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        console.log('Audio play failed:', err);
                        setAudioError(true);
                        setIsPlaying(false);
                        setIsLoading(false);
                    });
            }
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleAudioError = () => {
        console.log('Audio failed to load from public source');
        setAudioError(true);
        setIsPlaying(false);
        setIsLoading(false);
    };

    const handleAudioLoaded = () => {
        console.log('Audio loaded successfully - Chill instrumental music ready');
        setAudioError(false);
        setIsLoading(false);
    };

    return (
        <div
            className="fixed top-2 left-2 sm:top-4 sm:left-4 z-50"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <audio
                ref={audioRef}
                src={musicUrl}
                loop
                preload="auto"
                onError={handleAudioError}
                onLoadedData={handleAudioLoaded}
                crossOrigin="anonymous"
            />

            <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Futuristic AI-themed Music Button with VX branding */}
                <Link to="/" className="block">
                    <motion.button
                        onClick={(e) => {
                            e.preventDefault();
                            togglePlay();
                        }}
                        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]
                         flex items-center justify-center shadow-2xl
                         transition-all duration-300 border-2 overflow-hidden group
                         ${audioError ? 'opacity-50 cursor-not-allowed border-red-500/30' :
                                isPlaying ? 'border-cyan-400/50 shadow-cyan-500/20' : 'border-purple-500/30 shadow-purple-500/20'}
                         hover:scale-105 hover:shadow-2xl backdrop-blur-sm`}
                        aria-label={isPlaying ? 'Pause music' : 'Play music'}
                        disabled={audioError || isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Animated background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r opacity-20 transition-opacity duration-500
                            ${isPlaying ? 'from-cyan-500 via-blue-500 to-purple-500 animate-pulse' : 'from-purple-500 via-pink-500 to-red-500'}`}
                        />

                        {/* Circuit pattern overlay */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
                            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
                        </div>

                        {/* VX Logo with play/pause icon */}
                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <span className={`text-xs sm:text-sm font-bold tracking-wider transition-all duration-300
                                ${isPlaying ? 'text-cyan-400' : 'text-purple-400'} 
                                group-hover:text-white`}
                                style={{ fontFamily: 'monospace' }}
                            >
                                VX
                            </span>

                            {/* Play/Pause Icon */}
                            <div className="mt-0.5">
                                {isLoading ? (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : isPlaying ? (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Glowing corner accents */}
                        <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-300
                            ${isPlaying ? 'border-cyan-400' : 'border-purple-400'}`} />
                        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-300
                            ${isPlaying ? 'border-cyan-400' : 'border-purple-400'}`} />

                        {/* Pulsing ring when playing */}
                        {isPlaying && (
                            <motion.div
                                className="absolute inset-0 rounded-xl border-2 border-cyan-400"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        )}
                    </motion.button>
                </Link>

                {/* Error Indicator */}
                {audioError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3"
                    >
                        <div className="w-full h-full rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
                    </motion.div>
                )}

                {/* Volume Control - Futuristic Design */}
                <AnimatePresence>
                    {showControls && !audioError && (
                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.8 }}
                            transition={{ duration: 0.3, type: "spring" }}
                            className="absolute left-16 sm:left-20 top-1/2 -translate-y-1/2 
                                     bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]
                                     rounded-full px-4 py-2.5 shadow-2xl border-2 border-cyan-400/30
                                     backdrop-blur-md"
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-20 h-1.5 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg appearance-none cursor-pointer
                                             border border-cyan-400/20
                                             [&::-webkit-slider-thumb]:appearance-none 
                                             [&::-webkit-slider-thumb]:w-3.5 
                                             [&::-webkit-slider-thumb]:h-3.5 
                                             [&::-webkit-slider-thumb]:rounded-full 
                                             [&::-webkit-slider-thumb]:bg-gradient-to-r
                                             [&::-webkit-slider-thumb]:from-cyan-400
                                             [&::-webkit-slider-thumb]:to-purple-400
                                             [&::-webkit-slider-thumb]:cursor-pointer
                                             [&::-webkit-slider-thumb]:shadow-lg
                                             [&::-webkit-slider-thumb]:shadow-cyan-500/50
                                             [&::-moz-range-thumb]:w-3.5 
                                             [&::-moz-range-thumb]:h-3.5 
                                             [&::-moz-range-thumb]:rounded-full 
                                             [&::-moz-range-thumb]:bg-gradient-to-r
                                             [&::-moz-range-thumb]:from-cyan-400
                                             [&::-moz-range-thumb]:to-purple-400
                                             [&::-moz-range-thumb]:border-0
                                             [&::-moz-range-thumb]:cursor-pointer
                                             [&::-moz-range-thumb]:shadow-lg"
                                    aria-label="Volume control"
                                />
                                <span className="text-xs font-mono text-cyan-400 w-9 text-right">
                                    {Math.round(volume * 100)}%
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Audio Wave Visualization when playing */}
                {isPlaying && !audioError && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-0.5 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
                                animate={{
                                    height: ["4px", "8px", "4px"],
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default MusicPlayer;
