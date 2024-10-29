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

export async function GET(request) {
  const params = new URL(request.url);

  if (
    !params.searchParams.has("icon") ||
    params.searchParams.get("icon") === ""
  ) {
    try {
      const icons = await getData();

      if (!icons) {
        return NextResponse.error(icons);
      } else {
        return NextResponse.json(icons);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  } else {
    const icon = params.searchParams.get("icon");
    try {
      const icons = await getData();
      const iconData = icons.icons.find((i) => i.title === icon);

      if (!iconData) {
        return NextResponse.error();
      } else {
        return NextResponse.json(iconData);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  }
}
