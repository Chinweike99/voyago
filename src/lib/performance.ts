import React from "react"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Lazy loading utility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyLoad<T extends React.ComponentType<any>>(importFunc: () => Promise<{ default: T }>): React.LazyExoticComponent<T> {
  return React.lazy(importFunc)
}

// Image preloader
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}

// Viewport detection
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Memory usage monitoring (development only)
export function logMemoryUsage() {
  if (typeof window !== "undefined" && "memory" in performance) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const memory = (performance as any).memory
    console.log({
      usedJSHeapSize: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      totalJSHeapSize: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      jsHeapSizeLimit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
    })
  }
}
