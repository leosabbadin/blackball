// Independent Multi-Video Visibility & Autoplay Manager
// Allows multiple visible videos to play simultaneously with hysteresis (PLAY >= 0.35, PAUSE <= 0.10).
// Separates Preloading (rootMargin: 300px) from Playback (35% threshold), preserving position on resume.

export const PLAY_THRESHOLD = 0.35;
export const PAUSE_THRESHOLD = 0.10;

export interface RegisteredPlayer {
  id: string;
  containerEl: HTMLElement;
  getVideoEl: () => HTMLVideoElement | null;
  onNearViewport?: () => void;
  isModal?: boolean;
}

interface PlayerState {
  id: string;
  containerEl: HTMLElement;
  getVideoEl: () => HTMLVideoElement | null;
  onNearViewport?: () => void;
  isModal?: boolean;
  isPlaying: boolean;
  isPreloaded: boolean;
  lastRatio: number;
}

class VideoFeedManager {
  private players = new Map<string, PlayerState>();
  private preloadObserver: IntersectionObserver | null = null;
  private playbackObserver: IntersectionObserver | null = null;
  private isModalOpen = false;
  private isUnlocked = false;

  constructor() {
    this.initObservers();
    this.initVisibilityListener();
    this.initUserInteractionUnlock();
  }

  private initObservers() {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    // 1. Observer for lazy loading / preparation (300px ahead of viewport)
    this.preloadObserver = new IntersectionObserver(this.handlePreloadIntersection, {
      rootMargin: '300px 0px',
      threshold: 0,
    });

    // 2. Observer for independent playback and hysteresis (play >= 0.35, pause <= 0.10)
    this.playbackObserver = new IntersectionObserver(this.handlePlaybackIntersection, {
      threshold: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.50, 0.60, 0.75, 0.90, 1.0],
    });
  }

  private initVisibilityListener() {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAll();
      } else {
        if (!this.isModalOpen) {
          this.recheckAll();
        }
      }
    });

    window.addEventListener('pagehide', () => this.pauseAll());
  }

  private initUserInteractionUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (this.isUnlocked) return;
      this.isUnlocked = true;

      // When the user first interacts, trigger play for any player already in view
      if (!this.isModalOpen && (typeof document === 'undefined' || !document.hidden)) {
        for (const player of this.players.values()) {
          if (player.lastRatio >= PLAY_THRESHOLD && !player.isModal) {
            this.playPlayer(player);
          }
        }
      }

      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('scroll', unlock);
    };

    window.addEventListener('touchstart', unlock, { passive: true, once: true });
    window.addEventListener('pointerdown', unlock, { passive: true, once: true });
    window.addEventListener('scroll', unlock, { passive: true, once: true });
  }

  /**
   * Triggers video mounting/preparation when within 300px of viewport
   */
  private handlePreloadIntersection = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        const id = target.dataset.videoplayerId;
        if (!id) continue;

        const player = this.players.get(id);
        if (player && !player.isPreloaded) {
          player.isPreloaded = true;
          player.onNearViewport?.();
          this.preloadObserver?.unobserve(target);
        }
      }
    }
  };

  /**
   * Independent playback evaluation for each individual video card
   */
  private handlePlaybackIntersection = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      const target = entry.target as HTMLElement;
      const id = target.dataset.videoplayerId;
      if (!id) continue;

      const player = this.players.get(id);
      if (!player) continue;

      const rawRatio = entry.isIntersecting ? entry.intersectionRatio : 0;
      // Account for clipping in horizontal containers (e.g. FeaturedCarousel)
      const computedRatio = this.calculateVisibleRatio(player.containerEl);
      const effectiveRatio = entry.isIntersecting ? Math.min(rawRatio, computedRatio) : 0;
      player.lastRatio = effectiveRatio;

      if (this.isModalOpen || (typeof document !== 'undefined' && document.hidden)) {
        this.pausePlayer(player);
        continue;
      }

      // Hysteresis:
      // PLAY when entering view >= 0.35
      // PAUSE when leaving view <= 0.10
      // Between 0.10 and 0.35: preserve current state without interrupting
      if (effectiveRatio >= PLAY_THRESHOLD) {
        this.playPlayer(player);
      } else if (effectiveRatio <= PAUSE_THRESHOLD) {
        this.pausePlayer(player);
      }
    }
  };

  /**
   * Calculates the exact visible ratio taking into account viewport and
   * any overflow-clipped ancestor containers (like carousel horizontal scroll).
   */
  public calculateVisibleRatio(target: HTMLElement): number {
    if (typeof window === 'undefined') return 0;

    try {
      const rect = target.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) return 0;

      const vpWidth = window.innerWidth || document.documentElement.clientWidth;
      const vpHeight = window.innerHeight || document.documentElement.clientHeight;

      let visibleLeft = Math.max(0, rect.left);
      let visibleTop = Math.max(0, rect.top);
      let visibleRight = Math.min(vpWidth, rect.right);
      let visibleBottom = Math.min(vpHeight, rect.bottom);

      // Clip against any overflow-clipped ancestor
      let parent = target.parentElement;
      while (parent && parent !== document.body) {
        const style = window.getComputedStyle(parent);
        if (
          style.overflowX === 'auto' || style.overflowX === 'hidden' || style.overflowX === 'scroll' ||
          style.overflowY === 'auto' || style.overflowY === 'hidden' || style.overflowY === 'scroll'
        ) {
          const pRect = parent.getBoundingClientRect();
          visibleLeft = Math.max(visibleLeft, pRect.left);
          visibleTop = Math.max(visibleTop, pRect.top);
          visibleRight = Math.min(visibleRight, pRect.right);
          visibleBottom = Math.min(visibleBottom, pRect.bottom);
        }
        parent = parent.parentElement;
      }

      const visibleWidth = Math.max(0, visibleRight - visibleLeft);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibleArea = visibleWidth * visibleHeight;
      const totalArea = width * height;

      return totalArea > 0 ? visibleArea / totalArea : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Registers a video player component with independent lifecycle management.
   */
  public register(player: RegisteredPlayer): () => void {
    const { id, containerEl, isModal } = player;

    if (isModal) {
      return () => {};
    }

    const state: PlayerState = {
      ...player,
      isPlaying: false,
      isPreloaded: false,
      lastRatio: 0,
    };

    this.players.set(id, state);
    containerEl.dataset.videoplayerId = id;

    // 1. Observe for preloading if not already preloaded
    if (this.preloadObserver) {
      this.preloadObserver.observe(containerEl);
    }

    // 2. Observe for independent playback
    if (this.playbackObserver) {
      this.playbackObserver.observe(containerEl);
    }

    return () => {
      if (this.preloadObserver) {
        this.preloadObserver.unobserve(containerEl);
      }
      if (this.playbackObserver) {
        this.playbackObserver.unobserve(containerEl);
      }
      this.players.delete(id);
    };
  }

  /**
   * Called when a lazily loaded video element is mounted into the DOM.
   * If it is already visible in viewport (>= 0.35), begins playback immediately.
   */
  public notifyVideoMounted(id: string, videoEl: HTMLVideoElement) {
    const player = this.players.get(id);
    if (!player) return;

    // Check immediate visibility ratio
    const currentRatio = this.calculateVisibleRatio(player.containerEl);
    player.lastRatio = currentRatio;

    if (currentRatio >= PLAY_THRESHOLD && !this.isModalOpen && (typeof document === 'undefined' || !document.hidden)) {
      this.playVideo(videoEl);
      player.isPlaying = true;
    }
  }

  /**
   * Plays an individual video player smoothly without resetting currentTime.
   */
  private playPlayer(player: PlayerState) {
    player.isPlaying = true;
    const videoEl = player.getVideoEl();
    if (!videoEl) return;

    if (videoEl.paused) {
      this.playVideo(videoEl);
    }
  }

  /**
   * Pauses an individual video player, preserving current frame position.
   */
  private pausePlayer(player: PlayerState) {
    player.isPlaying = false;
    const videoEl = player.getVideoEl();
    if (!videoEl) return;

    if (!videoEl.paused) {
      try {
        videoEl.pause();
      } catch {
        // Ignore
      }
    }
  }

  /**
   * Safely plays a video with mobile autoplay parameters.
   */
  public playVideo(videoEl: HTMLVideoElement) {
    try {
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      videoEl.playsInline = true;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully if browser blocks background autoplay
        });
      }
    } catch {
      // Ignore
    }
  }

  /**
   * Pauses all registered feed videos (e.g. when modal opens or tab is hidden).
   */
  public pauseAll() {
    for (const player of this.players.values()) {
      this.pausePlayer(player);
    }
  }

  /**
   * Re-evaluates visibility for all registered players independently.
   * Useful when modal closes or carousel scrolls horizontally.
   */
  public recheckAll() {
    if (this.isModalOpen || (typeof document !== 'undefined' && document.hidden)) {
      this.pauseAll();
      return;
    }

    for (const player of this.players.values()) {
      const ratio = this.calculateVisibleRatio(player.containerEl);
      player.lastRatio = ratio;

      if (ratio >= PLAY_THRESHOLD) {
        this.playPlayer(player);
      } else if (ratio <= PAUSE_THRESHOLD) {
        this.pausePlayer(player);
      }
    }
  }

  /**
   * Controls modal state.
   * When modal is open: pause all feed videos to free device resources.
   * When modal is closed: resume videos that are currently visible.
   */
  public setModalOpen(open: boolean) {
    this.isModalOpen = open;
    if (open) {
      this.pauseAll();
    } else {
      setTimeout(() => {
        this.recheckAll();
      }, 60);
    }
  }
}

export const videoFeedManager = new VideoFeedManager();
