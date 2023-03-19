import { load } from "cheerio";
import url from "url";

export default async function fetchPageInfo(address) {
    const { host } = url.parse(address);

    const req = await fetch(address);
	
	if(!req.ok) throw `Status code: ${req.status}`;

	const content = await req.text();

    const $ = load(content);

    const name = $("title").eq(0).text()?.trim();
    const description = $("meta[name='description']").eq(0).attr("content")?.trim();

    return {
        name: name ?? "",
        description: description ?? "",
        icon: `https://icon.horse/icon/${host}`
    };
}