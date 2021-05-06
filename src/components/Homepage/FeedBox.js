import React from "react";
import { Link } from "react-router-dom";

export function FeedBox({ info }) {
  return (
    <>
      <Link
        to={`/feed/${info.id}`}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <section className="feedbox_container">
          <h2 className="feedbox_name">{info.name}</h2>
          <div className="barrier" />
          <div className="feedbox_price">
            {info.valuePrefix} {info.price}
          </div>
        </section>
      </Link>
    </>
  );
}
