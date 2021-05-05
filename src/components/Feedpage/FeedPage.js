import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/feedpage.css';

export function FeedPage({feedObj}) {
    const { id } = useParams();
    const feedData = feedObj[id];

    const countdown = () => {
        const timeLeft = feedData.lastUpdate - new Date() + (feedData.heartbeat * 1000);
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24).toLocaleString(undefined, {minimumIntegerDigits: 2});
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
        const seconds = Math.floor((timeLeft / 1000) % 60).toLocaleString(undefined, {minimumIntegerDigits: 2});
        let timerStr = `${hours}:${minutes}:${seconds}`;

        return timerStr;

    }
    const [timeLeft, setTimeLeft] = useState(countdown());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(countdown());
        }, 1000);

        return () => clearTimeout(timer);
    });
    const lastUpdate = feedData.lastUpdate.toLocaleString();
    return (<>
        <div className="feedpage_container">
            <div className="feedpage_header">
                <div className="feedpage_name">
                    {feedData.name}
                </div>
                <div>
                    <p className="feedpage_info">Latest answer</p>
                    <p className="feedpage_price">{feedData.valuePrefix} {feedData.price}</p>
                </div>
            </div>
            <div className="feedpage_otherStats">
                <div className="feedpage_leftStats">
                    <div>
                        <p className="feedpage_info">Threshold</p>
                        <p className="feedpage_stat_threshold">{feedData.threshold}</p>
                    </div>
                    <div>
                        <p className="feedpage_info">Heartbeat</p>
                        <p className="feedpage_stat_heartbeat">{timeLeft}</p>
                    </div>
                </div>
                <div>
                    <p className="feedpage_info">Last update</p>
                    <p className="feedpage_stat_lastUpdate">{lastUpdate}</p>
                </div>
            </div>
        </div>
    </>)
}
