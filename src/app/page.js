import Image from "next/image";
import Link from "next/link";

import Generator from "./components/generator";
import Modal from "./components/modal";
import Logo from "./components/logo";

export default function Home() {
  return (
    <>
      <header className="flex flex-wrap justify-between items-center text-xl text-center p-8 gap-2 bg-elf-green-100 dark:bg-elf-green-800 dark:text-elf-green-50">
        <h1>
          <Link href="/">
            <Logo />
          </Link>
        </h1>
        <h2 className="font-bold text-elf-green-600 dark:text-elf-green-50 ml-auto">
          GitHub 배지 생성기
        </h2>
      </header>
      <main className="w-full p-8 flex flex-col items-center gap-4">
        <section className="w-full flex flex-col items-center gap-4">
          <form className="w-full flex flex-col gap-4 relative">
            <fieldset className="flex gap-4">
              <label htmlFor="stack" className="sr-only">
                기술 스택
              </label>
              <input
                type="text"
                name="stack"
                id="stack"
                className="rounded-md border-[1px] border-elf-green-400 p-2 flex-grow focus:outline-elf-green-600 bg-background"
                placeholder="당신의 기술을 찾아보세요!"
              />
            </fieldset>
            <div className="autofill-wrapper relative shadow-md rounded-md w-full h-48 overflow-y-scroll border-[1px] border-elf-green-400 focus:outline-elf-green-600">
              <ul className="flex flex-col gap-y-2 p-2"></ul>
              <p className="pholder text-elf-green-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                기술 목록...
              </p>
            </div>
          </form>
          <ul className="result w-full flex flex-wrap gap-x-4 gap-y-2 flex-row"></ul>
          <textarea
            name="resultTag"
            id="resultTag"
            className="w-full h-32 border-[1px] rounded-md p-2 border-elf-green-400 focus:outline-elf-green-600 bg-background"
            placeholder="마크다운 문법이 여기에 생성됩니다"
          />
          <div className="copy-wrapper flex gap-x-2 items-center ml-auto">
            <p className="copy-msg hidden opacity-0 transition-opacity">
              복사되었습니다!
            </p>
            <button className="copy px-4 py-2 border-[1px] border-elf-green-500 text-elf-green-500 hover:elf-green-600 hover:text-elf-green-600 rounded-lg bg-background transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                />
              </svg>
            </button>
          </div>
          <Modal>혹시, Java를 찾으시나요?</Modal>
        </section>
      </main>
      <Generator />
      <footer className="text-center py-4 text-xs bg-elf-green-100 dark:bg-elf-green-600">
        <p>Copyright © 2024 Jihun Kim. All rights reserved.</p>
      </footer>
    </>
  );
}
