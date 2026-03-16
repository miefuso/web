/**
 * 固定ヘッダーを考慮したアンカーリンクのスムーススクロール
 *
 * ページ内の a[href^="#"] を対象に、クリック時にヘッダー高さ分を
 * オフセットしたスムーススクロールを実行する。
 */
const header = document.querySelector<HTMLElement>('header');


document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const href = anchor.getAttribute('href');
    if (!href) return;

    // href="#" の場合はページトップへスクロール
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const headerHeight = header?.offsetHeight ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});
