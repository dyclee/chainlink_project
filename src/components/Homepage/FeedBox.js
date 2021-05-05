import React from 'react';
import { Link } from 'react-router-dom';

export function FeedBox({info}) {
    return (<>
        <Link
            to={`/feed/${info.id}`}
            style={{
                textDecoration: 'none',
                color: 'black',
            }}
        >
            <div className="feedbox_container">
                <div className="feedbox_name">
                    {info.name}
                </div>
                <div className="feedbox_price">
                    {info.valuePrefix} {info.price}
                </div>
            </div>
        </Link>
    </>)
}
