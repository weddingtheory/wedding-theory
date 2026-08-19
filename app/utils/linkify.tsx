import React, { Fragment } from 'react';

// Matches an email address anywhere in a string.
const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

// Matches an Indian mobile number: exactly 10 digits starting 6-9, with an
// optional +91 country code. Deliberately narrow so it doesn't collide with
// prices ("₹1.5-2 lakhs"), day counts ("20 days"), or other free-text
// numbers that show up in CMS-authored copy.
const PHONE_PATTERN = /(?:\+91[\s-]?)?[6-9]\d{9}\b/g;

const LINK_CLASSES =
  'text-[#68401b] font-medium underline decoration-[#D4B08C]/60 underline-offset-2 hover:decoration-[#68401b] hover:text-[#5e4429] transition-colors';

/**
 * Renders plain text with any email addresses and Indian mobile numbers
 * turned into clickable mailto:/tel: links, everything else left as-is.
 * Safe to run on arbitrary CMS-authored copy — only these two shapes match.
 */
export function linkifyContactInfo(text: string): React.ReactNode {
  const combined = new RegExp(
    `${EMAIL_PATTERN.source}|${PHONE_PATTERN.source}`,
    'g'
  );

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = combined.exec(text)) !== null) {
    const matched = match[0];
    if (match.index > lastIndex) {
      parts.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>
      );
    }

    const isEmail = matched.includes('@');
    parts.push(
      <a
        key={key++}
        href={isEmail ? `mailto:${matched}` : `tel:${matched.replace(/[\s-]/g, '')}`}
        className={LINK_CLASSES}
      >
        {matched}
      </a>
    );

    lastIndex = match.index + matched.length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return parts;
}
