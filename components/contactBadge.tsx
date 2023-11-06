// components/ContactBadge.tsx
import React from "react";
import { ContactType } from "../interfaces/contactBadge";

export interface ContactBadgeProps {
  type: ContactType;
  link: string;
}

const ContactBadge: React.FC<ContactBadgeProps> = ({ type, link }) => {
  if (type == ContactType.EMAIL) {
    return (
      <a href={`mailto:${link}`} className="underline mr-3">
        Email
      </a>
    );
  }

  const renderLabel = () => {
    switch (type) {
      case ContactType.GITHUB:
        return "GitHub";
      case ContactType.LINKEDIN:
        return "LinkedIn";
      case ContactType.TWITTER:
        return "Twitter";
      case ContactType.FACEBOOK:
        return "Facebook";
      case ContactType.INSTAGRAM:
        return "Instagram";
      case ContactType.OTHER:
        return "Other";

      default:
        return null;
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="underline mr-3"
    >
      {renderLabel()}
    </a>
  );
};

export default ContactBadge;
