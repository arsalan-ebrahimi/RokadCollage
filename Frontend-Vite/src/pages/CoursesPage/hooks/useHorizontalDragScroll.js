import { useEffect, useRef, useState } from "react";

export function useHorizontalDragScroll() {
  const rowRef = useRef(null);
  const animRef = useRef(0);
  const modelRef = useRef("flip"); // flip = Chrome/Firefox (RTL negative), legacy = Safari
  const [nav, setNav] = useState({ prev: false, next: true });
  const isDraggingRef = useRef(false);
  const dragInfoRef = useRef({ startX: 0, scrollLeft: 0, hasMoved: false });

  const metrics = () => {
    const el = rowRef.current;
    if (!el) return { max: 0, pos: 0 };
    const max = el.scrollWidth - el.clientWidth;
    const rtl = getComputedStyle(el).direction === "rtl";
    if (!rtl) return { max, pos: el.scrollLeft };
    return { max, pos: modelRef.current === "legacy" ? max - el.scrollLeft : -el.scrollLeft };
  };

  const update = () => {
    const el = rowRef.current;
    if (!el) return;
    const { max, pos } = metrics();
    setNav({ prev: pos > 4, next: max > 0 && max - pos > 4 });
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (getComputedStyle(el).direction === "rtl" && max > 0) {
      modelRef.current = Math.abs(el.scrollLeft) < max / 2 ? "flip" : "legacy";
    }
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      isDraggingRef.current = true;
      dragInfoRef.current = {
        startX: e.pageX - el.offsetLeft,
        scrollLeft: el.scrollLeft,
        hasMoved: false,
      };
      el.classList.add("is-dragging");
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const x = e.pageX - el.offsetLeft;
      const delta = x - dragInfoRef.current.startX;
      if (Math.abs(delta) > 6) {
        dragInfoRef.current.hasMoved = true;
        e.preventDefault();
      }
      if (dragInfoRef.current.hasMoved) {
        const walk = delta * 1.25;
        el.scrollLeft = dragInfoRef.current.scrollLeft - walk;
      }
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      el.classList.remove("is-dragging");
      setTimeout(() => {
        if (dragInfoRef.current) {
          dragInfoRef.current.hasMoved = false;
        }
      }, 80);
    };

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(animRef.current);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const scroll = (toNext) => {
    const el = rowRef.current;
    if (!el) return;
    cancelAnimationFrame(animRef.current);
    const rtl = getComputedStyle(el).direction === "rtl";
    const dir = rtl ? (toNext ? -1 : 1) : (toNext ? 1 : -1);
    const from = el.scrollLeft;
    const to = from + dir * el.clientWidth * 0.75;
    const t0 = performance.now();
    const ease = (p) => 1 - Math.pow(1 - p, 3);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / 450);
      el.scrollLeft = from + (to - from) * ease(p);
      if (p < 1) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  return { rowRef, nav, update, scroll };
}
