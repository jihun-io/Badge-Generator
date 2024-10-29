"use client";

import { useState, useEffect } from "react";

export default function Modal({ children }) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      >
        {children}
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Background overlay */}
          <div
            className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <dialog
                open
                className={`w-[90vw] max-w-2xl my-4 p-6 flex flex-col gap-y-4 
                           shadow-md rounded-md bg-white z-50 
                           transition-opacity duration-300
                           ${isVisible ? "opacity-100" : "opacity-0"}`}
              >
                <p>
                  디지털 세상의 중심에는 멋진 광장이 있었습니다. 이 광장에는
                  수많은 상징물들이 전시되어 있었는데, 그중에서도 반짝이는 파란
                  커피잔은 광장을 찾는 모든 이들의 사랑을 받았답니다.
                </p>
                <p>
                  이 파란 커피잔은 개발자들의 밤을 지켜주는 수호신이라 불렸어요.
                  커피잔에서 피어오르는 하얀 김은 마치 코드가 완성되어 가는 모습
                  같았고, 그래서 모두가 이 상징을 아끼고 사랑했답니다.
                </p>
                <p>
                  하지만 어느 날, 높은 탑에 사는 강력한 마법사가 나타났어요.{" "}
                  <q>
                    이 커피잔은 내가 만든 마법의 물건이니, 더 이상 이곳에 둘 수
                    없다!
                  </q>
                </p>
                <p>
                  광장을 관리하는 이장님은 고민에 빠졌습니다. 마법사의 말도
                  일리가 있었기 때문이죠. 결국 이장님은 슬픈 마음으로 파란
                  커피잔을 광장에서 내려놓기로 했어요.
                </p>
                <p className="mt-4 text-sm">
                  요약: Oracle 법무 팀이 Simple Icons 측에 &ldquo;허가를 받지
                  않은 로고 사용&rdquo;이라면서 Java 로고를 내려줄 것을
                  요청했습니다. 그러므로 Java 배지 만들기는 지원되지 않습니다.{" "}
                  <a
                    href="https://github.com/simple-icons/simple-icons/issues/7374"
                    className="whitespace-nowrap font-bold text-elf-green-600 hover:text-elf-green-800 transition-colors"
                  >
                    자세히 알아보기
                  </a>
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  닫기
                </button>
              </dialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
