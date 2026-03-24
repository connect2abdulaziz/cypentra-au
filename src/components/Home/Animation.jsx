'use client'

import React, { useEffect, useState, useRef } from 'react';
import { ShieldAlert, Lock, Cloud, FlaskConical, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CypentraArchitecture() {
  const [isAnimating, setIsAnimating] = useState(true);
  const canvasRef = useRef(null);
  const router = useRouter();
  const calendlyUrl = 'https://calendly.com/cypentra-consultation/30min';

  const services = [
    {
      icon: ShieldAlert,
      title: 'SOC 2 Readiness & Compliance',
      description: 'Policies, controls, and readiness audits',
      position: 'left-0'
    },
    {
      icon: Lock,
      title: 'Cloud Infrastructure Hardening',
      description: 'Secure IAM, encryption, and configuration baselines',
      position: 'left-1/4'
    },
    {
      icon: FlaskConical,
      title: 'Penetration Testing & Vulnerability',
      description: 'Identify and patch security gaps before attackers do',
      position: 'left-1/2'
    },
    {
      icon: Cloud,
      title: 'Continuous Cloud Security Management',
      description: 'Ongoing monitoring and risk mitigation',
      position: 'left-3/4'
    },
    {
      icon: Eye,
      title: 'vCISO Advisory & Reporting',
      description: 'Strategic leadership and compliance alignment',
      position: 'right-0'
    }
  ];

  const features = [
    'Fully tailored for SaaS & cloud businesses',
    'Expert-led assessment, configuration & reports',
    'Compliance-ready documentation & evidence',
    'Fast delivery — measurable security impact in days'
  ];

  // Particle animation for canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 145, 164, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 145, 164, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleClick = () => {
    router.push('/packages');
  }

  const handleBookCall = (e) => {
    e.stopPropagation();
    window.location.href = calendlyUrl;
  }

  return (
    <div
      className="min-h-screen grid-background text-white font-sans overflow-hidden relative cursor-pointer group/container"
      onClick={handleClick}
      style={{ position: 'relative' }}
    >
      {/* Animated Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 pointer-events-none z-0"
      />

      <style>{`
        @keyframes flowLine {
          0% {
            stroke-dashoffset: 1500;
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(0, 145, 164, 0.8));
          }
          90% {
            opacity: 0.4;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        @keyframes flowParticle {
          0% {
            offset-distance: 0%;
            opacity: 0;
            r: 2;
          }
          10% {
            opacity: 1;
            r: 3;
          }
          50% {
            r: 4;
          }
          90% {
            opacity: 1;
            r: 3;
          }
          100% {
            offset-distance: 100%;
            opacity: 0;
            r: 2;
          }
        }

        .animated-line {
          stroke-dasharray: 1500;
          animation: flowLine 4s ease-in-out infinite;
          filter: drop-shadow(0 0 4px rgba(0, 145, 164, 0.6));
        }

        .line-1 { animation-delay: 0s; }
        .line-2 { animation-delay: 0.4s; }
        .line-3 { animation-delay: 0.8s; }
        .line-4 { animation-delay: 1.2s; }
        .line-5 { animation-delay: 1.6s; }

        .flow-particle {
          animation: flowParticle 4s ease-in-out infinite;
        }

        .particle-1 {
          offset-path: path('M 50 100 Q 150 280, 500 420');
          animation-delay: 0s;
        }
        .particle-2 {
          offset-path: path('M 250 100 Q 350 250, 500 420');
          animation-delay: 0.4s;
        }
        .particle-3 {
          offset-path: path('M 500 100 L 500 420');
          animation-delay: 0.8s;
        }
        .particle-4 {
          offset-path: path('M 750 100 Q 650 250, 500 420');
          animation-delay: 1.2s;
        }
        .particle-5 {
          offset-path: path('M 950 100 Q 850 280, 500 420');
          animation-delay: 1.6s;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(0, 145, 164, 0.4), 
              0 0 40px rgba(0, 145, 164, 0.2),
              inset 0 0 20px rgba(0, 145, 164, 0.1);
            transform: scale(1);
          }
          50% {
            box-shadow: 
              0 0 40px rgba(0, 145, 164, 0.6), 
              0 0 60px rgba(0, 145, 164, 0.3),
              0 0 80px rgba(0, 145, 164, 0.1),
              inset 0 0 30px rgba(0, 145, 164, 0.2);
            transform: scale(1.05);
          }
        }

        .lock-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .service-box {
          animation: fadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }

        .service-box:nth-child(1) { animation-delay: 0.1s; }
        .service-box:nth-child(2) { animation-delay: 0.2s; }
        .service-box:nth-child(3) { animation-delay: 0.3s; }
        .service-box:nth-child(4) { animation-delay: 0.4s; }
        .service-box:nth-child(5) { animation-delay: 0.5s; }

        .service-icon {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .service-box:hover .service-icon {
          animation: iconFloat 1.5s ease-in-out infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes reverseSpin {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .spin-ring {
          animation: spin 8s linear infinite;
        }

        .reverse-spin-ring {
          animation: reverseSpin 6s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 145, 164, 0.1) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        @keyframes checkmarkSlide {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .feature-item {
          animation: checkmarkSlide 0.6s ease-out forwards;
          opacity: 0;
        }

        .feature-item:nth-child(1) { animation-delay: 0.8s; }
        .feature-item:nth-child(2) { animation-delay: 1.0s; }
        .feature-item:nth-child(3) { animation-delay: 1.2s; }
        .feature-item:nth-child(4) { animation-delay: 1.4s; }

        svg {
          filter: drop-shadow(0 0 20px rgba(0, 145, 164, 0.15));
        }

        @keyframes energyPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }

        .energy-ring {
          animation: energyPulse 2s ease-in-out infinite;
        }

        .energy-ring-1 { animation-delay: 0s; }
        .energy-ring-2 { animation-delay: 0.4s; }
        .energy-ring-3 { animation-delay: 0.8s; }
      `}</style>

      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 145, 164, .05) 25%, rgba(0, 145, 164, .05) 26%, transparent 27%, transparent 74%, rgba(0, 145, 164, .05) 75%, rgba(0, 145, 164, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 145, 164, .05) 25%, rgba(0, 145, 164, .05) 26%, transparent 27%, transparent 74%, rgba(0, 145, 164, .05) 75%, rgba(0, 145, 164, .05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-10 xl:px-16 py-8 sm:py-12 md:py-16 pointer-events-none">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
            <span className="text-[#0091a4] inline-block relative">
              CYPENTRA SECURITY<br className="sm:hidden" /> ARCHITECTURE
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#0091a4] to-transparent opacity-50" />
            </span>
            <br />
            <span className="text-white">Structured Security &amp; Compliance — End to End</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-2">
            A comprehensive approach that connects every layer of your security and compliance journey.
          </p>
        </div>

        {/* Services Grid with Enhanced Animated Connections */}
        <div className="relative mb-12 sm:mb-16 md:mb-24">
          {/* SVG Canvas for Advanced Animated Lines - Show on all screens */}
          <svg
            className="absolute inset-0 w-full pointer-events-none"
            style={{
              height: '520px',
              top: '0',
              left: '0'
            }}
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 145, 164, 0.2)" />
                <stop offset="30%" stopColor="rgba(0, 145, 164, 0.6)" />
                <stop offset="50%" stopColor="rgba(0, 145, 164, 1)" />
                <stop offset="70%" stopColor="rgba(0, 145, 164, 0.6)" />
                <stop offset="100%" stopColor="rgba(0, 145, 164, 0.2)" />
              </linearGradient>

              <radialGradient id="particleGradient">
                <stop offset="0%" stopColor="rgba(0, 145, 164, 1)" />
                <stop offset="50%" stopColor="rgba(0, 145, 164, 0.6)" />
                <stop offset="100%" stopColor="rgba(0, 145, 164, 0)" />
              </radialGradient>
            </defs>

            {/* Enhanced animated paths from services to center lock */}
            <path
              className="animated-line line-1"
              d="M 50 100 Q 150 280, 500 420"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            <path
              className="animated-line line-2"
              d="M 250 100 Q 350 250, 500 420"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            <path
              className="animated-line line-3"
              d="M 500 100 L 500 420"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            <path
              className="animated-line line-4"
              d="M 750 100 Q 650 250, 500 420"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            <path
              className="animated-line line-5"
              d="M 950 100 Q 850 280, 500 420"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Flowing Particles */}
            <circle className="flow-particle particle-1" r="3" fill="url(#particleGradient)" filter="url(#glow)" />
            <circle className="flow-particle particle-2" r="3" fill="url(#particleGradient)" filter="url(#glow)" />
            <circle className="flow-particle particle-3" r="3" fill="url(#particleGradient)" filter="url(#glow)" />
            <circle className="flow-particle particle-4" r="3" fill="url(#particleGradient)" filter="url(#glow)" />
            <circle className="flow-particle particle-5" r="3" fill="url(#particleGradient)" filter="url(#glow)" />
          </svg>

          {/* Services Grid - Always show 5 columns like desktop */}
          <div className="grid grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-12 relative z-20">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="service-box text-center">
                  <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                    <div className="relative group">
                      <div className="shimmer absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="service-icon w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 rounded-lg border-2 border-cyan-500 border-opacity-50 flex items-center justify-center bg-linear-to-br from-cyan-500/10 to-blue-500/10 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 backdrop-blur-sm relative overflow-hidden group">
                        <Icon className="w-6 sm:w-8 md:w-10 h-6 sm:h-8 md:h-10 text-cyan-400 relative z-10 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-400/0 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                  {/* Hide text on mobile, show on sm and above */}
                  <div className="hidden sm:block">
                    <h3 className="font-bold text-xs sm:text-sm md:text-sm mb-1 sm:mb-2 text-white leading-tight line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spacer for SVG height - Responsive */}
          <div className="h-64 sm:h-72 md:h-56 relative z-20" />

          {/* Enhanced Center Lock Icon - Responsive */}
          <div className="flex justify-center mb-8 sm:mb-12 md:mb-12 relative z-30 mt-0">
            <div className="relative">
              {/* Outer energy rings - Responsive size */}
              <div className="energy-ring energy-ring-1 absolute -inset-12 sm:-inset-14 md:-inset-16 rounded-full border border-cyan-400/20" />
              <div className="energy-ring energy-ring-2 absolute -inset-10 sm:-inset-11 md:-inset-12 rounded-full border border-cyan-400/30" />
              <div className="energy-ring energy-ring-3 absolute -inset-7 sm:-inset-8 md:-inset-8 rounded-full border border-cyan-400/40" />

              {/* Main lock container - Responsive */}
              <div className="lock-glow w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 rounded-full border-2 border-cyan-400 border-opacity-60 flex items-center justify-center bg-linear-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-400/10 via-transparent to-blue-500/10" />
                <Lock className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 text-cyan-400 relative z-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" strokeWidth={1.5} />
              </div>

              {/* Rotating rings */}
              <div className="spin-ring absolute inset-1 rounded-full border border-cyan-400/30 border-dashed" />
              <div className="reverse-spin-ring absolute inset-3 rounded-full border border-cyan-400/20" />
            </div>
          </div>

          {/* Center Text - Responsive */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-20 px-2">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold leading-tight mb-2">
              We connect every layer —
              <br />
              <span className="text-cyan-400 inline-block relative">
                closing every security gap.
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
              </span>
            </h2>
          </div>
        </div>

        <div className="mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4 sm:p-6 md:p-8 text-center pointer-events-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2">
            Ready to move forward?
          </h3>
          <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-4 sm:mb-5">
            We&apos;ll walk you through your current security posture, identify gaps, and outline clear next steps.
          </p>
          <p className="text-cyan-300 text-sm sm:text-base font-medium mb-3">
            Speak with a security advisor
          </p>
          <button
            onClick={handleBookCall}
            className="inline-flex items-center gap-2 rounded-full bg-[#0091a4] text-black font-semibold px-5 sm:px-6 py-2.5 sm:py-3 hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300"
          >
            Book a Call
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Features - Stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8 mb-12 sm:mb-16 md:mb-24">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-item flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 rounded-lg bg-cyan-500/5 border border-cyan-500/10 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 group">
              <CheckCircle2 className="w-5 sm:w-5 md:w-6 h-5 sm:h-5 md:h-6 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <p className="text-xs sm:text-sm md:text-lg text-gray-300 group-hover:text-white transition-colors duration-300 line-clamp-3">
                {feature}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-6 sm:pt-8 md:pt-12 border-[#0091a4] border-opacity-30 relative">
          <div className="flex justify-center items-center gap-3 mb-4 sm:mb-6">
            {/* Animated dots */}
            <div className="flex gap-2 items-center">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#0091a4] animate-pulse" />
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#0091a4]/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#0091a4] animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          {/* Glowing accent line */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="h-0.5 w-16 sm:w-20 bg-linear-to-r from-transparent via-[#0091a4] to-transparent" />
          </div>
        </div>
      </div>

    </div>
  );
}