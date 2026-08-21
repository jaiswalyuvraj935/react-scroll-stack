import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
    {
        id: 1,
        title: 'First Card',
        text: 'This is the initial content layer.',
        bg: 'bg-slate-800',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Second Card',
        text: 'This slides up and overlays the first card.',
        bg: 'bg-teal-700',
        image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'Third Card',
        text: 'This overlays the second card as you scroll down.',
        bg: 'bg-indigo-700',
        image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
    },
];

export default function CardStack() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(
        () => {
            const cards = cardsRef.current;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: `+=${cards.length * 100}%`,
                    pin: true,
                    scrub: 1,
                },
            });

            cards.forEach((card, index) => {
                if (index === 0) return;

                tl.fromTo(
                    card,
                    {
                        yPercent: 100,
                        opacity: 0.8,
                    },
                    {
                        yPercent: 0,
                        opacity: 1,
                        ease: 'none',
                    }
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <div className="bg-zinc-950 font-sans text-white">
            {/* Spacer Above */}
            <div className="flex h-screen items-center justify-center">
                <h2 className="text-2xl font-bold"> Scroll Down to View the Stack</h2>
            </div>

            {/* Sticky Parent Container */}
            <div
                ref={containerRef}
                className="relative flex h-screen w-full items-center justify-center overflow-hidden"
            >
                {/* Child Cards Stacked Absolute */}
                {cardsData.map((card, index) => (
                    <div
                        key={card.id}
                        ref={(el) => (cardsRef.current[index] = el)}
                        style={{ zIndex: index + 1 }}
                        className={`absolute flex h-215 w-[80%] max-w-500 flex-row px-20 py-20 rounded-2xl border border-white/10 p-8 shadow-2xl ${card.bg}`}
                    >
                        {/* Left Side: Text Content */}
                        <div className="flex flex-1 flex-col justify-center">
                            <h3 className="mb-3 text-8xl font-semibold">{card.title}</h3>
                            <p className="leading-relaxed text-4xl text-slate-300">{card.text}</p>
                        </div>

                        {/* Right Side: Image Section */}
                        <div className="flex flex-1 items-center justify-center overflow-hidden">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="h-full w-full rounded-xl object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Spacer Below */}
        </div>
    );
}