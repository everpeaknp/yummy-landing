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
  fallbackAlt?: string;
}

function cleanSlugOrFilename(url: string): string {
  try {
    const filename = url.split('/').pop()?.split('?')[0]?.split('#')[0] || '';
    const nameWithoutExt = filename.replace(/\.[a-z0-9]+$/i, '');
    const clean = decodeURIComponent(nameWithoutExt)
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!clean || /^[0-9a-f]{8,}$/i.test(clean) || /^(image|img|photo|picture|file|untitled)$/i.test(clean)) {
      return '';
    }
    return clean;
  } catch {
    return '';
  }
}

/**
 * Optimizes all <img> tags inside CKEditor/CMS HTML for SEO and Core Web Vitals:
 * - Injects descriptive alt tags if missing or generic
 * - Injects title attributes for tooltip & search signals
 * - Adds loading="lazy" and decoding="async"
 * - Injects responsive styling classes
 */
export function optimizeHtmlImages(html: string, fallbackAlt?: string): string {
  if (!html || !html.includes('<img')) return html;

  return html.replace(/<img\b([^>]*)>/gi, (_, attrs) => {
    // Extract src
    const srcMatch = attrs.match(/\bsrc=["']([^"']*)["']/i);
    const src = srcMatch ? srcMatch[1] : '';

    // Extract alt
    const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
    let alt = altMatch ? altMatch[1].trim() : '';

    const isGeneric = !alt || /^(image|img|photo|picture|screenshot|untitled)$/i.test(alt);
    if (isGeneric) {
      const derivedFromFilename = cleanSlugOrFilename(src);
      if (derivedFromFilename) {
        alt = `${derivedFromFilename} - Yummy Manage Restaurant POS Nepal`;
      } else if (fallbackAlt) {
        alt = `${fallbackAlt} - Yummy Manage POS`;
      } else {
        alt = 'Yummy Manage Cloud Restaurant POS System Nepal';
      }
    }

    let newAttrs = attrs;

    // Update or insert alt
    if (altMatch) {
      newAttrs = newAttrs.replace(/\balt=["'][^"']*["']/i, `alt="${alt.replace(/"/g, '&quot;')}"`);
    } else {
      newAttrs += ` alt="${alt.replace(/"/g, '&quot;')}"`;
    }

    // Ensure title attribute
    if (!/\btitle=["'][^"']*["']/i.test(newAttrs)) {
      newAttrs += ` title="${alt.replace(/"/g, '&quot;')}"`;
    }

    // Ensure lazy loading for CMS images
    if (!/\bloading=["'][^"']*["']/i.test(newAttrs)) {
      newAttrs += ` loading="lazy"`;
    }

    // Ensure async decoding for performance
    if (!/\bdecoding=["'][^"']*["']/i.test(newAttrs)) {
      newAttrs += ` decoding="async"`;
    }

    return `<img${newAttrs}>`;
  });
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
export function HTMLContent({ html, className = "", as: Tag = "span", style, fallbackAlt }: HTMLContentProps) {
  const normalizedHtml = normalizeRichHtml(html);
  const optimizedHtml = optimizeHtmlImages(normalizedHtml, fallbackAlt);

  // If the content doesn't contain any HTML tags, render as plain text
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(optimizedHtml);
  
  if (!hasHtmlTags) {
    return React.createElement(Tag, { className, style }, decodeHtmlEntities(optimizedHtml));
  }

  return React.createElement(Tag, {
    className: `html-content ${className}`,
    style,
    dangerouslySetInnerHTML: { __html: optimizedHtml }
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
