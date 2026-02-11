"use client";

import { useState } from "react";

interface VersionToggleProps {
    longContent: string;
    shortContent: string;
}

export default function VersionToggle({ longContent, shortContent }: VersionToggleProps) {
    const [version, setVersion] = useState<"long" | "short">("long");

    const activeContent = version === "long" ? longContent : shortContent;

    // Calculate reading time for the active version
    const wordCount = activeContent.replace(/<[^>]+>/g, "").split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <>
            {/* Toggle Bar */}
            <div className="version-toggle-bar">
                <div className="version-toggle-pills">
                    <button
                        onClick={() => setVersion("long")}
                        className={`version-toggle-pill ${version === "long" ? "active" : ""}`}
                    >
                        Long Version
                    </button>
                    <button
                        onClick={() => setVersion("short")}
                        className={`version-toggle-pill ${version === "short" ? "active" : ""}`}
                    >
                        Short Version
                    </button>
                </div>
                <span className="version-toggle-reading-time">
                    {readingTime} min read
                </span>
            </div>

            {/* Content */}
            <div
                className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: activeContent }}
            />
        </>
    );
}
