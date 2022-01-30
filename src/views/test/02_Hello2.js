import React from 'react';

import { useEffect } from 'react';

function Hello2({ name, color, isReact }) {
    // 마운트시 호출됨
    useEffect(() => {
        console.log('> Hello2 mounted');
        return () => {
            console.log('> Hello2 unmounted');
        };
    }, []);

    return (
        <div style={{ color }}>
            안녕하세요 {name}!{isReact ? '만나서 반가워요.' : null}
        </div>
    );
}

Hello2.defaultProps = {
    name: 'Guest',
};

// props가 변경되지 않았다면 리렌더링 방지
export default React.memo(Hello2);
