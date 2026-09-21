/**
 * Ambient Lo-Fi & Rain synthesizer using the Web Audio API.
 * Ensures zero-dependency, reliable, instant playback across all devices.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private currentStep = 0;
  private masterGain: GainNode | null = null;
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private listeners: Array<(playing: boolean) => void> = [];

  private chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23], // G7
  ];

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify(playing: boolean) {
    this.listeners.forEach(cb => cb(playing));
  }

  private playTone(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm Rhodes / Electric Piano sine-triangle blend
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm low-pass filtering for lo-fi feel
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, startTime);
    filter.frequency.exponentialRampToValueAtTime(450, startTime + duration);

    // Gentle envelope (soft attack, slow decay)
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private startRain() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter noise to sound like gentle distant window rain
      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.value = 650;
      rainFilter.Q.value = 1.2;

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      whiteNoise.connect(rainFilter);
      rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);

      whiteNoise.start();
      this.rainNode = whiteNoise;
    } catch {
      // Ignore if web audio blocked
    }
  }

  private stopRain() {
    if (this.rainNode) {
      try {
        (this.rainNode as AudioScheduledSourceNode).stop();
      } catch {
        // Already stopped
      }
      this.rainNode = null;
    }
  }

  private playStep() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const currentChord = this.chords[this.currentStep % this.chords.length];

    // Play arpeggiated lo-fi chord notes
    currentChord.forEach((noteFreq, idx) => {
      this.playTone(noteFreq, now + idx * 0.15, 2.2);
    });

    this.currentStep = (this.currentStep + 1) % this.chords.length;
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    this.startRain();
    this.playStep();
    this.timer = window.setInterval(() => {
      this.playStep();
    }, 2400);

    this.notify(true);
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.stopRain();
    this.notify(false);
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val * 0.3)), this.ctx.currentTime);
    }
  }
}

export const soundEngine = new SoundEngine();
