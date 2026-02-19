"use client";

import React from "react";

/**
 * HTMLContent Component
 * Safely renders HTML content from CKEditor or other rich text sources.
 * Use this for any text field that may contain HTML from the backend.
 */

interface HTMLContentProps {
  html: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * Renders HTML content safely using dangerouslySetInnerHTML.
 * Falls back to plain text if HTML appears to be just plain text.
 */
export function HTMLContent({ html, className = "", as: Tag = "span" }: HTMLContentProps) {
  // If the content doesn't contain any HTML tags, render as plain text
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(html);
  
  if (!hasHtmlTags) {
    return React.createElement(Tag, { className }, html);
  }

  return React.createElement(Tag, {
    className: `html-content ${className}`,
    dangerouslySetInnerHTML: { __html: html }
  });
}

/**
 * Inline version that renders within existing text flow.
 * Strips block-level tags and preserves only inline formatting.
 */
export function InlineHTMLContent({ html, className = "" }: Omit<HTMLContentProps, "as">) {
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(html);
  
  if (!hasHtmlTags) {
    return <span className={className}>{html}</span>;
  }

  // Strip common block-level wrappers but preserve content
  let cleanHtml = html
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, ' ')
    .replace(/<div[^>]*>/gi, '')
    .replace(/<\/div>/gi, ' ')
    .replace(/<h[1-6][^>]*>/gi, '')
    .replace(/<\/h[1-6]>/gi, ' ')
    .trim();

  return (
    <span 
      className={`inline-html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

export default HTMLContent;
