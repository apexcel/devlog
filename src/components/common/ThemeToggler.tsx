import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Theme } from '../../hooks/useThemeToggler';

const ThemeToggler: React.FC = () => {
    const { themeToggler } = useContext(Theme);

    return (
        <div>
            <button onClick={themeToggler}>toggler</button>
        </div>
    )
}

export default ThemeToggler;