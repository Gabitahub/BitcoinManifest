"use client";
import React from "react";

const ShareOnXButton = ({
    label,
    linkText,
}: {
    label: string;
    linkText: string;
}) => {
    const url = typeof window !== "undefined" ? window.location.origin : "";

    const tweetText = linkText;
    const tweetUrl = encodeURIComponent(url);
    const hashtags = "WeThePeople,HODL,Bitcoin";

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetText
    )}&url=${tweetUrl}&hashtags=${encodeURIComponent(hashtags)}`;

    return (
        <a
            target="_blank"
            className="twitter-share-button border border-orange_secondary rounded-md px-3 py-2 hover:bg-orange_secondary/90"
            href={twitterShareUrl}
        >
            {label}
        </a>
    );
};

ShareOnXButton.displayName = "ShareOnXButton";
export default ShareOnXButton;
