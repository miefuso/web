/**
 * c-subtitle アニメーション
 *
 * .c-subtitle__box 要素が画面下 1/3 に入った際に is-animated クラスを付与し、
 * ボーダーの中央から左右に伸びるアニメーションと
 * サブタイトルの文字タイピングアニメーションを同時に発火する。
 * 一度発火したら監視を解除する。
 */
const subtitleBoxes =
  document.querySelectorAll<HTMLElement>(".c-subtitle__box");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // is-animated クラスを付与してアニメーションを発火
        entry.target.classList.add("is-animated");
        // 一度発火したら監視を解除
        observer.unobserve(entry.target);
      }
    });
  },
  {
    // 画面下 20% に入った時点で発火
    rootMargin: "0px 0px -20% 0px",
  },
);

subtitleBoxes.forEach((box) => observer.observe(box));

/**
 * 画像ズームアウト＋フェードインアニメーション
 *
 * .p-top-recon__image / .p-feat-technical__image 要素が画面下 1/3 に入った際に
 * is-animated クラスを付与し、ズームアウト＋フェードインを発火する。
 * 一度発火したら監視を解除する。
 */
const zoomImages = document.querySelectorAll<HTMLElement>(
  ".p-top-recon__image, .p-feat-technical__image",
);

const zoomObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // is-animated クラスを付与してアニメーションを発火
        entry.target.classList.add("is-animated");
        // 一度発火したら監視を解除
        zoomObserver.unobserve(entry.target);
      }
    });
  },
  {
    // 画面下 1/3 に入った時点で発火
    rootMargin: "0px 0px -33% 0px",
  },
);

zoomImages.forEach((image) => zoomObserver.observe(image));

/**
 * p-feat-head-link アニメーション
 *
 * .p-feat-head-link が画面下 10% に入った際に
 * 各 li に順番に is-animated クラスを付与し、上からのフェードインを発火する。
 * 一度発火したら監視を解除する。
 */
const featHeadList = document.querySelector<HTMLElement>(".p-feat-head-link");

if (featHeadList) {
  const featObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll<HTMLElement>("li");
          // 各 li に 150ms ずつ遅らせて is-animated を付与
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add("is-animated");
            }, i * 300);
          });
          featObserver.unobserve(entry.target);
        }
      });
    },
    {
      // 画面下 10% に入った時点で発火
      rootMargin: "0px 0px -10% 0px",
    },
  );

  featObserver.observe(featHeadList);
}
