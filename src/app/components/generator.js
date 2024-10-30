"use client";

function adjustContrastWithWhite(srcHex) {
  // HEX to RGB 변환
  const hex = srcHex.replace(/^#/, "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // 상대 휘도 계산 (WCAG 공식)
  const toLuminance = (c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const luminance =
    0.2126 * toLuminance(r) + 0.7152 * toLuminance(g) + 0.0722 * toLuminance(b);

  // 흰색의 휘도는 1
  const whiteL = 1;

  // 대비율 계산
  const contrast = (whiteL + 0.05) / (luminance + 0.05);

  // 대비가 2 미만이면 검은색 반환
  return contrast < 2 ? "black" : "white";
}

async function generate(i, validation) {
  const result = await fetch(`/api/get-icons?icon=${encodeURIComponent(i)}`);

  try {
    const data = await result.json();
    if (data.title) {
      const img = `https://img.shields.io/badge/${data.title.replaceAll(
        "-",
        "--"
      )}-${
        data.hex
      }?style=for-the-badge&logo=${validation}&logoColor=${adjustContrastWithWhite(
        data.hex
      )}`;

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

          const tempLi = document.createElement("li");
          tempLi.classList.add("cursor-pointer");

          // 텍스트 색깔과 아이콘 색깔 동기화
          tempLi.innerHTML = src.svg;
          const textColor = tempLi.querySelector("text").attributes.fill.value;

          const resultColor = () => {
            if (textColor === "#fff") {
              return "white";
            } else {
              return "black";
            }
          };

          // 이미지 생성
          const img = document.createElement("img");
          img.src = `https://img.shields.io/badge/${src.title.replaceAll(
            "-",
            "--"
          )}-${
            src.hex
          }?style=for-the-badge&logo=${validation}&logoColor=${resultColor()}`;

          const li = document.createElement("li");

          li.addEventListener("click", () => {
            resultUl.removeChild(li);
            resultTag.value = resultTag.value.replace(result, "");
          });

          li.appendChild(img);
          resultUl.appendChild(li);

          resultTag.value = resultTag.value + result;

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

    if (e.key === "Enter") {
      e.preventDefault();
      if (autofill.firstChild === null) {
        return;
      }
      autofill.firstChild.click();
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
