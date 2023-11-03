// components/ContactBadge.tsx
import React from "react";
import { ContactBadgeProps, ContactType } from "../interfaces/contactBadge";

const ContactBadge: React.FC<ContactBadgeProps> = ({ type, link }) => {
  if (type == ContactType.EMAIL) {
    return (
      <a
        href={`mailto:${link}`}
        style={{
          color: "#000",
          marginRight: "10px",
          textDecoration: "underline",
        }}
      >
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
      // textDecoration underline
      style={{
        color: "#000",
        marginRight: "10px",
        textDecoration: "underline",
      }}
    >
      {renderLabel()}
    </a>
  );
};

export default ContactBadge;
