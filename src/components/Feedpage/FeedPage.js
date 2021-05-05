import React from 'react';
import { useParams } from 'react-router-dom';

export function FeedPage({feedObj}) {
    const { id } = useParams();
    const feedData = feedObj[id];
    return (<>
    </>)
}
