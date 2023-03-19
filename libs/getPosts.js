import url from "url";
import fetch from "node-fetch";
import { load } from "cheerio";

export default async function getPosts(page) {
    const data = [];

    const req = await fetch(page.url);
    const content = await req.text();

    const $ = load(content);
    const selectors = [page.title, page.content, page.image, page.link];

    $(page.container).each(function(index) {
        if(index >= 6) return false;

        const container = $(this);
        
        const [
            title,
            content,
            image,
            link
        ] = selectors.map(sel => container.find(sel));
        
        data.push({
            title: title.text().trim(),
            content: content.text().trim(),
            image: image.attr("src"),
            link: link.attr("href")
        });
    });

    return data;
}
