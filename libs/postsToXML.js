export default function postsToXML(feeds) {
    const template = ['<rss version="2.0">', "<channel>"];

    for(const { title, content, image, link } of feeds) {
				if(!title && !content) continue;

        template.push("<item>")

        if (title) template.push(`<title><![CDATA[${title}]]></title>`);
        if (content) template.push(`<description><![CDATA[${content}]]></description>`);
        if (image) template.push(`<image>${image}</image>`);
        if (link) template.push(`<link>${link}</link>`);

        template.push("</item>")
    }

    template.push("</channel>", "</rss>")

    return template.join("\n");
}
