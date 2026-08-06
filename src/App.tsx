import { useEffect, useRef, useState } from 'react';

function App() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsLowPower(isCoarsePointer || prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (isLowPower) {
      if (shellRef.current) {
        shellRef.current.style.setProperty('--pointer-x', '50%');
        shellRef.current.style.setProperty('--pointer-y', '50%');
      }
      return;
    }

    const pointerRef = { x: 50, y: 50 };
    const driftRef = { x: 0, y: 0 };
    let target = { x: 0, y: 0 };

    const handlePointerMove = (event: MouseEvent) => {
      pointerRef.x = (event.clientX / window.innerWidth) * 100;
      pointerRef.y = (event.clientY / window.innerHeight) * 100;
    };

    const updateTarget = () => {
      target = {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 6,
      };
    };

    const animate = () => {
      driftRef.x += (target.x - driftRef.x) * 0.04;
      driftRef.y += (target.y - driftRef.y) * 0.04;

      const glowX = pointerRef.x * 0.7 + (50 + driftRef.x) * 0.3;
      const glowY = pointerRef.y * 0.7 + (50 + driftRef.y) * 0.3;

      if (shellRef.current) {
        shellRef.current.style.setProperty('--pointer-x', `${glowX}%`);
        shellRef.current.style.setProperty('--pointer-y', `${glowY}%`);
      }

      frame = window.requestAnimationFrame(animate);
    };

    updateTarget();
    let frame = window.requestAnimationFrame(animate);
    const interval = window.setInterval(updateTarget, 5000);

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isLowPower]);

  return (
    <div
      ref={shellRef}
      className={`app-shell relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#FCF8F2] via-[#F3E6D5] to-[#E3CBB4] ${isLowPower ? 'app-shell--mobile' : ''}`}
    >
      <main className="relative z-10 flex min-h-screen w-full items-center justify-center p-8">
        <div className="w-full max-w-lg text-center text-gray-800">
          <img src="/dxnSinFondo.png" alt="logo" className="mx-auto mb-6 h-auto w-28 object-contain" />
          <p className="mb-3 text-base font-serif text-gold md:text-lg">Tenemos el honor de invitarle a la Inauguración del</p>
          <h1 className="text-5xl font-mea font-normal leading-tight text-gold md:text-6xl">Centro de Distribución <span className="text-5xl font-serif font-normal text-gold md:text-4xl">DXN</span></h1>
          <br />
          <p className="mb-6 text-3xl font-mea font-normal text-gold md:text-4xl">
            Embajadores <span className="text-3xl font-serif font-normal text-gold md:text-4xl">II</span>
          </p>

          <p className="mb-8 text-base font-serif italic text-gold md:text-lg">
            "Un nuevo comienzo para expandir juntos Salud, Felicidad y Riqueza"
          </p>

          <div className="flex flex-col justify-center items-center gap-6 text-center font-serif md:flex-row">
            <div className="flex flex-col items-center">
              <img src="/calendar.svg" alt="Calendario" className="mb-2 w-10 h-10" />
              <p className="text-5xl font-semibold text-gold md:text-6xl">24</p>
              <p className="text-sm uppercase md:text-base">AGOSTO</p>
            </div>

            <div className="flex flex-col items-center">
              <img src="/location.svg" alt="Ubicación" className="mb-2 w-10 h-10" />
              <p className="text-base md:text-lg">Av. Emilio</p>
              <p className="text-base md:text-lg">Olmos 176</p>
            </div>

            <div className="flex flex-col items-center">
              <img src="/hora.svg" alt="Hora" className="mb-2 w-10 h-10" />
              <p className="text-5xl font-semibold text-gold md:text-6xl">16:00</p>
              <p className="text-sm md:text-base">hrs PM</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
