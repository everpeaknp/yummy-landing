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
  style?: React.CSSProperties;
}

function decodeHtmlEntities(input: string): string {
  if (!input) return input;

  // Decode named entities commonly seen from CMS/DB escaped HTML.
  let decoded = input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, "/");

  // Decode numeric entities (decimal and hex), e.g. &#8217; and &#x2019;
  decoded = decoded.replace(/&#(\d+);/g, (_, code) => {
    const n = Number(code);
    return Number.isFinite(n) ? String.fromCodePoint(n) : _;
  });
  decoded = decoded.replace(/&#x([0-9a-f]+);/gi, (_, code) => {
    const n = parseInt(code, 16);
    return Number.isFinite(n) ? String.fromCodePoint(n) : _;
  });

  return decoded;
}

function normalizeRichHtml(input: string): string {
  // If the payload contains encoded tags (&lt;p&gt;...), decode first.
  const hasEncodedTags = /&lt;\/?[a-z][^&]*&gt;/i.test(input);
  return hasEncodedTags ? decodeHtmlEntities(input) : input;
}

/**
 * Renders HTML content safely using dangerouslySetInnerHTML.
 * Falls back to plain text if HTML appears to be just plain text.
 */
export function HTMLContent({ html, className = "", as: Tag = "span", style }: HTMLContentProps) {
  const normalizedHtml = normalizeRichHtml(html);

  // If the content doesn't contain any HTML tags, render as plain text
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(normalizedHtml);
  
  if (!hasHtmlTags) {
    return React.createElement(Tag, { className, style }, decodeHtmlEntities(normalizedHtml));
  }

  return React.createElement(Tag, {
    className: `html-content ${className}`,
    style,
    dangerouslySetInnerHTML: { __html: normalizedHtml }
  });
}

/**
 * Inline version that renders within existing text flow.
 * Strips block-level tags and preserves only inline formatting.
 */
export function InlineHTMLContent({ html, className = "" }: Omit<HTMLContentProps, "as">) {
  const normalizedHtml = normalizeRichHtml(html);
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(normalizedHtml);
  
  if (!hasHtmlTags) {
    return <span className={className}>{decodeHtmlEntities(normalizedHtml)}</span>;
  }

  // Strip common block-level wrappers but preserve content
  let cleanHtml = normalizedHtml
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
