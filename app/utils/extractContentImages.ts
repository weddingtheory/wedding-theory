// Pulls every <img src="..."> out of a blog post's rich-text HTML body, so
// the gallery section can skip images the editor already placed inline
// instead of showing them a second time.
export function extractContentImageUrls(html: string | null | undefined): Set<string> {
  if (!html) return new Set();

  const urls = new Set<string>();
  const imgTagPattern = /<img[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;

  while ((match = imgTagPattern.exec(html)) !== null) {
    urls.add(match[1]);
  }

  return urls;
}
