"use client";
import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaSms } from "react-icons/fa";

import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const reward = searchParams.get("reward") ?? "a reward";
  const level = searchParams.get("level") ?? "1";

  const websiteUrl = "https://guhuza.com/";
  const text = encodeURIComponent(
    `🎉 I just unlocked "${reward}" at Level ${level} on Guhuza! Try it yourself 👇`
  );

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 quizSbtn"
      >
        <FaShareAlt /> Share
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute top-12
           right-max bg-black shadow-lg rounded-lg p-3 w-25 z-10"
        >
          <p className="text-sm text-white mb-2">Share this page:</p>
          <div className="flex flex-col space-y-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}&quote=${text}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:underline"
            >
              <FaFacebook /> Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${websiteUrl}&text=${text}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:underline"
            >
              <FaTwitter /> Twitter (X)
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${text}%20${websiteUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:underline"
            >
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={`mailto:?subject=Join me on Guhuza!&body=Hey! I just unlocked "${reward}" at Level ${level} on Guhuza. Try it here: ${websiteUrl}`}
              className="flex items-center gap-2 text-yellow-400 hover:underline"
            >
              <FaEnvelope /> Email
            </a>

            <a
              href={`sms:?&body=Hey! I just unlocked "${reward}" at Level ${level} on Guhuza! Check it out: ${websiteUrl}`}
              className="flex items-center gap-2 text-pink-500 hover:underline"
            >
              <FaSms /> SMS
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
