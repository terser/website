import React, { useEffect, useRef } from 'react';

export default function Ad({ desktopOnly }) {
    const ref = useRef(null);

    useEffect(() => {
        if (desktopOnly && !window.matchMedia?.('(min-width: 1000px)').matches) return;

        let script;
        const timeout = setTimeout(() => {
            if (ref.current) {
                script = mountAd(ref.current);
            }
        }, 100)

        return () => {
            clearTimeout(timeout);
            script?.remove();
        }
    }, []);

    return <div ref={ref} />
}

const mountAd = parentElm => {
    const script = document.createElement('script');
    script.id = '_carbonads_js';
    script.async = true;
    script.type = 'text/javascript';
    script.src = '//cdn.carbonads.com/carbon.js?serve=CWYDK53W&placement=terserorg';
    parentElm.appendChild(script);
    return script;
}