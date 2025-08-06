"use client";
import { useState } from "react";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaSms,
} from "react-icons/fa";
import { Dialog, DialogTitle, DialogDescription } from "@headlessui/react";
import { useSearchParams } from "next/navigation";

export default function InviteButton() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const reward = searchParams.get("reward") ?? "a reward";
  const level = searchParams.get("level") ?? "1";

  const websiteUrl = "https://guhuza.com/";
  const text = encodeURIComponent(
    `🎮 Come and play this game! I just unlocked "${reward}" at Level ${level} on Guhuza. Check it out here: ${websiteUrl}`
  );

  const shareOptions = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}&quote=${text}`,
      icon: <FaFacebook className="text-blue-600" />,
    },
    {
      label: "Twitter (X)",
      href: `https://twitter.com/intent/tweet?url=${websiteUrl}&text=${text}`,
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}`,
      icon: <FaLinkedin className="text-blue-700" />,
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${text}`,
      icon: <FaWhatsapp className="text-green-500" />,
    },
    {
      label: "Email",
      href: `mailto:?subject=Join me on Guhuza!&body=Hey! I just unlocked "${reward}" at Level ${level}. Try it here: ${websiteUrl}`,
      icon: <FaEnvelope className="text-yellow-500" />,
    },
    {
      label: "SMS",
      href: `sms:?&body=Hey! I just unlocked "${reward}" at Level ${level} on Guhuza! Check it out: ${websiteUrl}`,
      icon: <FaSms className="text-pink-500" />,
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
      >
        <FaShareAlt />
        Invite Friends
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-md w-full bg-white rounded-2xl p-6 shadow-xl transform transition-all">
            <DialogTitle className="text-xl font-bold mb-4 text-center text-purple-700">
              🎁 Invite Your Friends!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mb-6">
              Share your achievement and invite them to play!
            </DialogDescription>

            <div className="grid grid-cols-2 gap-4">
              {shareOptions.map((option) => (
                <a
                  key={option.label}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 shadow-sm transition"
                >
                  {option.icon}
                  <span className="text-sm font-medium text-gray-800">
                    {option.label}
                  </span>
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full py-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
