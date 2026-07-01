"use client";

/**
 * Dual-Mode Generative + File Audio Engine.
 * 
 * Attempts to load and play a high-quality instrumental file "/love-instrumental.mp3"
 * from the public folder (recommended for wave to earth's track). 
 * 
 * If the file is not found (404) or fails to play, it dynamically falls back
 * to a generative ambient synth pad + filtered wind, keeping the card functional.
 */

type NodeRefs = {
    ctx: AudioContext | null;
    master: GainNode | null;
    padGain: GainNode | null;
    windGain: GainNode | null;
    padOscillators: OscillatorNode[];
    windSource: AudioBufferSourceNode | null;
    started: boolean;
};

const refs: NodeRefs = {
    ctx: null,
    master: null,
    padGain: null,
    windGain: null,
    padOscillators: [],
    windSource: null,
    started: false,
};

let fileAudio: HTMLAudioElement | null = null;
let useSynthFallback = false;

function getCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!refs.ctx) {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (!AC) return null;
        refs.ctx = new AC();
        refs.master = refs.ctx.createGain();
        refs.master.gain.value = 0;
        refs.master.connect(refs.ctx.destination);
    }
    return refs.ctx;
}

function makeNoiseBuffer(ctx: AudioContext, seconds = 4) {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.2;
    }
    return buffer;
}

/** Starts the ambient audio (attempts mp3 file, falls back to synth on failure). */
export function startAmbient(targetVolume = 0.14) {
    const ctx = getCtx();
    if (!ctx || !refs.master) return;
    if (ctx.state === "suspended") ctx.resume();

    // Setup the master gain nodes
    refs.master.gain.cancelScheduledValues(ctx.currentTime);
    refs.master.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 1.5);

    if (refs.started) {
        if (fileAudio && !useSynthFallback) {
            fileAudio.volume = targetVolume;
            fileAudio.play().catch(() => {
                useSynthFallback = true;
                startSynthOnly(ctx);
            });
        }
        return;
    }
    refs.started = true;

    // Initialize HTML5 Audio element for file playing
    if (typeof window !== "undefined") {
        fileAudio = new Audio("/love-instrumental.mp3");
        fileAudio.loop = true;
        fileAudio.volume = targetVolume;

        fileAudio.addEventListener("error", () => {
            console.warn("Audio file /love-instrumental.mp3 not found or could not load. Using generative synth fallback.");
            useSynthFallback = true;
            startSynthOnly(ctx);
        });

        fileAudio.play()
            .then(() => {
                console.log("Playing /love-instrumental.mp3 successfully.");
                useSynthFallback = false;
            })
            .catch((err) => {
                console.warn("Audio play blocked or failed. Using generative synth fallback:", err);
                useSynthFallback = true;
                startSynthOnly(ctx);
            });
    } else {
        useSynthFallback = true;
        startSynthOnly(ctx);
    }
}

/** Generative synthesis fallback */
function startSynthOnly(ctx: AudioContext) {
    if (!refs.master || refs.padOscillators.length > 0) return;

    // Soft pad: three detuned sine/triangle oscillators, slow filtered
    const padGain = ctx.createGain();
    padGain.gain.value = 0.5;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    padGain.connect(filter);
    filter.connect(refs.master);
    refs.padGain = padGain;

    const notes = [220, 277.18, 329.63]; // A3, C#4, E4 — warm major-ish pad
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 1 ? "triangle" : "sine";
        osc.frequency.value = freq;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.05 + i * 0.02;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 2.5;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        osc.connect(padGain);
        osc.start();
        lfo.start();
        refs.padOscillators.push(osc, lfo as unknown as OscillatorNode);
    });

    // Gentle wind / paper-air bed
    const windGain = ctx.createGain();
    windGain.gain.value = 0.06;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.value = 500;
    windFilter.Q.value = 0.6;
    const noiseBuffer = makeNoiseBuffer(ctx, 6);
    const windSource = ctx.createBufferSource();
    windSource.buffer = noiseBuffer;
    windSource.loop = true;
    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(refs.master);
    windSource.start();
    refs.windSource = windSource;
    refs.windGain = windGain;
}

export function stopAmbient() {
    const ctx = refs.ctx;
    if (fileAudio && !useSynthFallback) {
        fileAudio.pause();
    }
    if (ctx && refs.master) {
        refs.master.gain.cancelScheduledValues(ctx.currentTime);
        refs.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    }
}

export function setAmbientVolume(v: number) {
    const ctx = refs.ctx;
    if (fileAudio && !useSynthFallback) {
        fileAudio.volume = v;
    }
    if (ctx && refs.master) {
        refs.master.gain.cancelScheduledValues(ctx.currentTime);
        refs.master.gain.linearRampToValueAtTime(v, ctx.currentTime + 0.8);
    }
}

/** One-shot: soft paper rustle burst (envelope opening, letter unfolding) */
export function playPaperRustle() {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const dur = 0.9;
    const buffer = makeNoiseBuffer(ctx, dur);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1800;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + dur);
}

/** One-shot: wax seal crack — short filtered noise tick + low thud */
export function playSealCrack() {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const click = ctx.createOscillator();
    click.type = "square";
    click.frequency.setValueAtTime(180, ctx.currentTime);
    click.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.22, ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    click.connect(clickGain);
    clickGain.connect(ctx.destination);
    click.start();
    click.stop(ctx.currentTime + 0.16);

    const crackBuf = makeNoiseBuffer(ctx, 0.2);
    const crackSrc = ctx.createBufferSource();
    crackSrc.buffer = crackBuf;
    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = "highpass";
    crackFilter.frequency.value = 3000;
    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(0.15, ctx.currentTime);
    crackGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    crackSrc.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(ctx.destination);
    crackSrc.start();
    crackSrc.stop(ctx.currentTime + 0.2);
}

/** One-shot: gentle bell/chime — used for heart tap and reveals */
export function playChime(freq = 880) {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = freq * 2.01;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);
    osc.start();
    osc2.start();
    osc.stop(ctx.currentTime + 2.3);
    osc2.stop(ctx.currentTime + 1.7);
}

/** One-shot: soft heartbeat thump — used sparingly for the "Happy Birthday" reveal */
export function playHeartbeat() {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    [0, 0.28].forEach((offset) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(90, ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + offset + 0.18);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.001, ctx.currentTime + offset);
        gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + offset + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + offset);
        osc.stop(ctx.currentTime + offset + 0.24);
    });
}

export function isAudioSupported() {
    return typeof window !== "undefined" && !!(window.AudioContext || (window as any).webkitAudioContext);
}

/** One-shot: very soft gentle chime/pluck for typewriter letter typing */
export function playTypewriterSound() {
    const ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    osc.type = "sine";
    // Gentle high pitch tick/pluck sound (1000Hz - 1400Hz)
    osc.frequency.setValueAtTime(1000 + Math.random() * 300, ctx.currentTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.006, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
}

