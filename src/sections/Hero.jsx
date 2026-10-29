import { useEffect, useRef } from 'react'
import { HERO, SOLUTIONS } from '../data/content'
import { Button, SmartLink } from '../components/ui'

// Full-screen cinematic hero. The photo starts close on her eyes and zooms out to fill the screen.
// With WebGL, her face sways slowly in 2.5D (and follows the pointer), and the blue digital patterns
// already in the photo are extracted and animated with light flowing down over them.
export default function Hero() {
  const camRef = useRef(null), imgRef = useRef(null), glRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current, cam = camRef.current, glc = glRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0, stopped = false
    const cleanups = []

    const run = () => {
      if (stopped) return
      const gl = glc.getContext('webgl', { premultipliedAlpha: false })
      if (!gl) return

      // --- pattern layer: pixels much brighter and bluer than their surroundings ---
      const LW = 720, LH = Math.round(img.naturalHeight * LW / img.naturalWidth)
      const layer = document.createElement('canvas'); layer.width = LW; layer.height = LH
      const lg = layer.getContext('2d', { willReadFrequently: true }); lg.drawImage(img, 0, 0, LW, LH)
      const d = lg.getImageData(0, 0, LW, LH), px = d.data
      const bl = document.createElement('canvas'); bl.width = LW; bl.height = LH
      const bg = bl.getContext('2d', { willReadFrequently: true }); bg.filter = 'blur(7px)'; bg.drawImage(img, 0, 0, LW, LH)
      const bp = bg.getImageData(0, 0, LW, LH).data
      for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i + 1], b = px[i + 2]
        const lum = 0.3 * r + 0.5 * g + 0.2 * b, avg = 0.3 * bp[i] + 0.5 * bp[i + 1] + 0.2 * bp[i + 2]
        const a = Math.max(0, Math.min(1, (lum - avg - 10) / 38)) * Math.max(0, Math.min(1, (b - r + 10) / 60))
        px[i] = 180; px[i + 1] = 240; px[i + 2] = 255; px[i + 3] = a * 255
      }
      lg.putImageData(d, 0, 0)
      const fx = document.createElement('canvas'); fx.width = LW; fx.height = LH; const fc = fx.getContext('2d')
      const tmp = document.createElement('canvas'); tmp.width = LW; tmp.height = LH; const tc = tmp.getContext('2d')
      const drawFx = (T) => {
        tc.globalCompositeOperation = 'source-over'; tc.clearRect(0, 0, LW, LH); tc.drawImage(layer, 0, 0)
        tc.globalCompositeOperation = 'destination-in'
        const gd = tc.createLinearGradient(0, 0, 0, LH), off = (T * 0.16) % 1
        for (let k = 0; k <= 4; k++) {
          const c = (k / 4 + off) % 1
          for (const [p, a] of [[c - 0.09, 0], [c - 0.02, 1], [c, 1], [c + 0.015, 0]]) if (p >= 0 && p <= 1) gd.addColorStop(p, `rgba(0,0,0,${a})`)
        }
        tc.fillStyle = gd; tc.fillRect(0, 0, LW, LH)
        fc.globalCompositeOperation = 'source-over'; fc.clearRect(0, 0, LW, LH)
        fc.globalCompositeOperation = 'lighter'; fc.globalAlpha = 1; fc.drawImage(tmp, 0, 0); fc.drawImage(tmp, 0, 0)
        fc.globalAlpha = 0.35 + 0.25 * Math.sin(T * 1.6); fc.drawImage(layer, 0, 0)
        fc.globalAlpha = 1; fc.globalCompositeOperation = 'destination-out'; fc.fillStyle = 'rgba(0,0,0,0.9)'
        for (let k = 0; k < 18; k++) fc.fillRect(Math.random() * LW, (0.2 + Math.random() * 0.5) * LH, 3 + Math.random() * 10, 2)
        fc.globalCompositeOperation = 'source-over'
      }

      // --- WebGL: photo + patterns, displaced more on the face than on the background ---
      const vs = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }'
      const fs = `precision mediump float;
        uniform sampler2D uImg, uFx; uniform vec2 uRes, uImgSize, uPos, uOff; uniform float uT;
        void main(){
          vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
          float sc = max(uRes.x / uImgSize.x, uRes.y / uImgSize.y);
          vec2 size = uImgSize * sc, o = (uRes - size) * uPos;
          vec2 uv = (frag - o) / size;
          vec2 q = (uv - vec2(0.5, 0.38)) / vec2(0.40, 0.44);
          float depth = smoothstep(1.15, 0.0, length(q));
          vec2 uv2 = uv - uOff * (0.004 + depth * 0.016);
          uv2.y += sin(uv.y * 30.0 + uT * 0.8) * 0.0006 * depth;
          vec4 c = texture2D(uImg, clamp(uv2, 0.0, 1.0));
          vec4 f = texture2D(uFx, clamp(uv2, 0.0, 1.0));
          c.rgb *= 1.0 + 0.035 * sin(uT * 1.3) * depth;
          gl_FragColor = vec4(1.0 - (1.0 - c.rgb) * (1.0 - f.rgb * f.a), 1.0);
        }`
      const sh = (t, src) => { const x = gl.createShader(t); gl.shaderSource(x, src); gl.compileShader(x); return x }
      const pr = gl.createProgram()
      gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr)
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return
      gl.useProgram(pr)
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      const U = (n) => gl.getUniformLocation(pr, n)
      const mk = (unit) => {
        const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, t)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        return t
      }
      const tImg = mk(0), tFx = mk(1)
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tImg)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)

      let pos = [0.7, 0.25]
      const layout = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2), W = cam.clientWidth, H = cam.clientHeight
        glc.width = Math.round(W * dpr); glc.height = Math.round(H * dpr); gl.viewport(0, 0, glc.width, glc.height)
        pos = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100)
        const s = Math.max(W / img.naturalWidth, H / img.naturalHeight), w = img.naturalWidth * s, h = img.naturalHeight * s
        cam.style.transformOrigin = `${(W - w) * pos[0] + w * 0.5}px ${(H - h) * pos[1] + h * 0.34}px`
      }
      layout()
      window.addEventListener('resize', layout); cleanups.push(() => window.removeEventListener('resize', layout))
      const ptr = { x: 0, y: 0 }, cur = { x: 0, y: 0 }
      const onMove = (e) => { ptr.x = e.clientX / window.innerWidth - 0.5; ptr.y = e.clientY / window.innerHeight - 0.5 }
      window.addEventListener('pointermove', onMove); cleanups.push(() => window.removeEventListener('pointermove', onMove))
      let visible = true
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(glc); cleanups.push(() => io.disconnect())

      const frame = (t) => {
        if (stopped) return
        raf = requestAnimationFrame(frame)
        if (!visible) return
        const T = t / 1000
        cur.x += (ptr.x - cur.x) * 0.04; cur.y += (ptr.y - cur.y) * 0.04
        drawFx(T)
        gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tFx)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fx)
        gl.uniform1i(U('uImg'), 0); gl.uniform1i(U('uFx'), 1)
        gl.uniform2f(U('uRes'), glc.width, glc.height)
        gl.uniform2f(U('uImgSize'), img.naturalWidth, img.naturalHeight)
        gl.uniform2f(U('uPos'), pos[0], pos[1])
        gl.uniform2f(U('uOff'), Math.sin(T * 0.33) * 0.55 + Math.sin(T * 0.13) * 0.25 + cur.x * 1.6, Math.cos(T * 0.27) * 0.35 + cur.y * 1.2)
        gl.uniform1f(U('uT'), T)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
      cam.classList.add('is-live')
      raf = requestAnimationFrame(frame)
    }

    if (img.complete && img.naturalWidth) run()
    else { img.addEventListener('load', run, { once: true }); cleanups.push(() => img.removeEventListener('load', run)) }
    return () => { stopped = true; cancelAnimationFrame(raf); cleanups.forEach((f) => f()) }
  }, [])

  return (
    <section className="hx" id="top" aria-labelledby="hero-title">
      <div className="hx-bg" aria-hidden="true">
        <div className="hx-cam" ref={camRef}>
          <img ref={imgRef} src={HERO.image.src} alt="" />
          <canvas ref={glRef} />
        </div>
      </div>
      <div className="hx-shade" aria-hidden="true" />
      <div className="lines hx-lines" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="hx-body">
        <div className="wrap">
          <div className="hx-copy">
            <span className="hx-label">{HERO.tagline}</span>
            <h1 id="hero-title">{HERO.title}</h1>
            <p className="hx-lead">{HERO.text[0]}</p>
            <div className="ctas">
              <Button to={HERO.primary.to} className="on-dark">{HERO.primary.label}</Button>
              <Button to={HERO.secondary.to} variant="line">{HERO.secondary.label}</Button>
            </div>
          </div>
        </div>
      </div>
      <nav className="hx-strip" aria-label="Solution areas">
        <div className="wrap">
          <div className="hx-g4">
            {SOLUTIONS.map((s) => (
              <SmartLink key={s.id} className="hx-item" to={`/solutions/${s.id}`}>
                <small>{s.n}</small><b>{s.name}</b><span>{s.tagline}</span><i aria-hidden="true">↗</i>
              </SmartLink>
            ))}
          </div>
        </div>
      </nav>
    </section>
  )
}
