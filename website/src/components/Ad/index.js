import React, { useEffect, useRef } from 'react';

export default function Ad({ desktopOnly }) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        if (desktopOnly && !window.matchMedia?.('(min-width: 1000px)').matches) return;

        const script = document.createElement('script');
        script.id = '_carbonads_js';
        script.async = true;
        script.type = 'text/javascript';
        script.src = '//cdn.carbonads.com/carbon.js?serve=CWYDK53W&placement=terserorg';
        ref.current.appendChild(script);

        return () => {
            script.remove();
        }
    }, []);

    return <div ref={ref} />
}