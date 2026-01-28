'use client';

import React from 'react';
import { Screensaver } from '../../components/Screensaver';

export default function ScreensaverPage() {
    return (
        <Screensaver
            idleTimeout={60000}  // 1 minute
            enabled={true}
        />
    );
}
