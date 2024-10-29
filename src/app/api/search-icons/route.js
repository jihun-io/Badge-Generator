import { NextResponse } from "next/server";

async function getData() {
  const url = process.env.DATA;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("error!", err);
  }
}

export async function GET(requests) {
  const params = new URL(requests.url);

  try {
    const icons = await getData();

    if (!icons) {
      return NextResponse.error();
    } else {
      const data = icons.icons.map((i) => i.title);
      if (
        !params.searchParams.has("q") ||
        params.searchParams.get("q") === ""
      ) {
        return NextResponse.json(data);
      } else {
        const search = params.searchParams.get("q");

        // 객체를 그대로 전달하려면?

        const data = icons.icons
          .filter((i) => i.title.toLowerCase().startsWith(search.toLowerCase()))
          .map((i) => i.title);

        return NextResponse.json(data);
      }
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
