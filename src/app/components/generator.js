"use client";

async function generate(i, validation) {
  const result = await fetch(`/api/get-icons?icon=${encodeURIComponent(i)}`);

  try {
    const data = await result.json();
    if (data.title) {
      const img = `https://img.shields.io/badge/${data.title.replaceAll(
        "-",
        "--"
      )}-${data.hex}?style=for-the-badge&logo=${validation}&logoColor=white`;

      return { title: data.title, img: img, hex: data.hex };
    } else {
      console.error("error!", data);
    }
  } catch (error) {
    console.error(error);
  }
}

export default async function Generator() {
  if (typeof document === "undefined") {
    return <></>;
  }

  const inp = document.querySelector("input#stack");

  inp.addEventListener("input", async (e) => {
    const autofill = document.querySelector("div.autofill-wrapper ul");
    const resultUl = document.querySelector("ul.result");
    const resultTag = document.querySelector("textarea#resultTag");
    const pholder = document.querySelector("div.autofill-wrapper p.pholder");

    if (e.target.value === "") {
      autofill.innerHTML = "";
      pholder.classList.remove("hidden");
      return;
    }

    const result = await fetch(
      `/api/search-icons?q=${encodeURIComponent(e.target.value)}`
    );

    try {
      const data = await result.json();
      autofill.innerHTML = "";
      pholder.classList.add("hidden");

      data.forEach((i) => {
        const autofillLi = document.createElement("li");
        autofillLi.classList.add(
          "hover:bg-elf-green-500",
          "hover:text-white",
          "cursor-pointer",
          "p-2"
        );
        autofillLi.tabIndex = 0;
        autofillLi.textContent = i;

        autofillLi.addEventListener("click", async () => {
          autofill.innerHTML = "";
          pholder.classList.remove("hidden");

          const validation = i
            .replaceAll(" ", "")
            .replaceAll("-", "")
            .replaceAll(".", "dot")
            .replaceAll("+", "plus")
            .replaceAll("#", "sharp")
            .replaceAll("/", "")
            .replaceAll(`'`, "")
            .replaceAll("&", "and");

          const src = await generate(i, validation);

          const img = document.createElement("img");
          img.src = src.img;
          const li = document.createElement("li");
          li.classList.add("cursor-pointer");

          li.addEventListener("click", () => {
            resultUl.removeChild(li);
            resultTag.value = resultTag.value.replace(
              `[![${
                src.title
              }](https://img.shields.io/badge/${src.title.replaceAll(
                "-",
                "--"
              )}-${
                src.hex
              }?style=for-the-badge&logo=${validation}&logoColor=white)](https://simpleicons.org/icons/${
                src.title
              })\n`,
              ""
            );
          });

          li.appendChild(img);
          resultUl.appendChild(li);

          resultTag.value =
            resultTag.value +
            `[![${src.title}](https://img.shields.io/badge/${encodeURIComponent(
              src.title
            )}-${src.hex}?style=for-the-badge&logo=${encodeURIComponent(
              src.title
            )}&logoColor=white)](https://simpleicons.org/icons/${encodeURIComponent(
              src.title
            )})\n`;

          inp.value = "";
        });

        autofillLi.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            autofillLi.click();
          }

          if (e.key === "ArrowDown") {
            if (autofillLi.nextSibling === null) {
              return;
            }
            e.preventDefault();
            if (autofillLi.nextSibling !== null) {
              autofillLi.nextSibling.focus();
            }
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            if (autofillLi.previousSibling === null) {
              inp.focus();
              return;
            }
            autofillLi.previousSibling.focus();
          }
        });

        autofill.appendChild(autofillLi);
      });
    } catch (error) {
      console.error(error);
    }
  });

  inp.addEventListener("keydown", (e) => {
    const autofill = document.querySelector("div.autofill-wrapper ul");
    const pholder = document.querySelector("div.autofill-wrapper p.pholder");

    if (e.key === "ArrowDown") {
      if (autofill.firstChild === null) {
        return;
      }
      e.preventDefault();
      autofill.firstChild.focus();
    }
  });

  const resultTag = document.querySelector("textarea#resultTag");

  const copy = document.querySelector("button.copy");
  const msg = document.querySelector("p.copy-msg");

  copy.addEventListener("click", () => {
    if (resultTag.value === "") {
      return;
    }
    navigator.clipboard.writeText(resultTag.value);
    msg.classList.remove("hidden");
    requestAnimationFrame(() => {
      msg.classList.remove("opacity-0");
      msg.classList.add("opacity-100");
    });

    setTimeout(() => {
      msg.classList.add("opacity-0");
      msg.classList.remove("opacity-100");

      // hidden 클래스는 transition이 완료된 후에 추가
      setTimeout(() => {
        msg.classList.add("hidden");
      }, 300); // transition duration과 동일한 시간
    }, 2000);
  });

  return <></>;
}
