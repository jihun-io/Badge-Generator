"use client";

async function generate(i, validation) {
  const result = await fetch(`/api/get-icons?icon=${encodeURIComponent(i)}`);

  try {
    const data = await result.json();
    if (data.title) {
      const img = `https://img.shields.io/badge/${data.title.replaceAll(
        "-",
        "--"
      )}-${data.hex}?style=for-the-badge&logo=${validation}&logoColor=white}`;

      const svg = await fetch(img);
      const svgResult = await svg.text();

      return {
        title: data.title,
        img: img,
        hex: data.hex,
        svg: svgResult,
      };
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

  // 자동 완성 기능
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

    // 자동 완성 데이터 불러오기
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

          // 특수 문자 치환
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
          li.classList.add("cursor-pointer");

          li.addEventListener("click", () => {
            resultUl.removeChild(li);
            resultTag.value = resultTag.value.replace(result, "");
          });

          li.appendChild(img);
          resultUl.appendChild(li);

          // 마크다운 생성
          const result = `![${src.title}](${img.src})\n`;
          resultTag.value = resultTag.value + result;

          inp.value = "";
        });

        // 화살표 키로 선택 스크립트
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

  // 마크다운 복사 기능
  const copy = document.querySelector("button.copy");
  copy.addEventListener("click", () => {
    const resultTag = document.querySelector("textarea#resultTag");
    const msg = document.querySelector("p.copy-msg");
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
