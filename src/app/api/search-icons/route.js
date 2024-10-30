import { NextResponse } from "next/server";
export const runtime = "edge";

const runtimeConfig = {
  url: process.env.URL,
};

async function getData() {
  try {
    const res = await fetch(runtimeConfig.url);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("error!", err);
  }
}

export async function GET(requests) {
  const params = new URL(requests.url);
  console.log("fetching data...");

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
