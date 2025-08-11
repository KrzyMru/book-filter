'use client'
import React from "react";
import { useInView } from "react-intersection-observer";

const SlideInWrapper = ({ 
    children, 
    variant = 'header',
    threshold = 0.1,
}: Readonly<{ 
    children: React.ReactNode,
    variant: 'header' | 'work',
    threshold?: number,
}>) => {
    const [inert, setInert] = React.useState<boolean>(true);
    const { ref, inView } = useInView({
        threshold: threshold,
        triggerOnce: true
    });

    const animation = 
        variant === 'header' ? 'animate-slide-in-header' :
        variant === 'work' ? 'animate-slide-in-work' : 
        '';

    return (
        <div 
            ref={ref} 
            className={`opacity-0 ${inView ? animation : ''}`}
            inert={inert}
            onAnimationEnd={() => setInert(false)}
        >
            {children}
        </div>
    );
}

export default SlideInWrapper;