import { BirthdayForm } from "@/components/birthday-form/BirthdayForm";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#161616] text-white flex flex-col lg:flex-row items-center justify-center p-3 sm:p-6 lg:p-10 xl:p-14 gap-6 lg:gap-14 overflow-x-hidden">
      
      {/* DIV IZQUIERDO CON EL GATO CSS ANIMADO - CENTRADO VERTICALMENTE */}
      <div id="custom-left-container" className="w-full lg:flex-1 flex items-center justify-center self-center py-4 lg:py-0">
        <div className="scale-90 sm:scale-110 lg:scale-140 transform transition-transform flex items-center justify-center">
          <div className="cat">
            <div className="ear ear--left"></div>
            <div className="ear ear--right"></div>
            <div className="face">
              <div className="eye eye--left">
                <div className="eye-pupil"></div>
              </div>
              <div className="eye eye--right">
                <div className="eye-pupil"></div>
              </div>
              <div className="muzzle"></div>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULARIO A LA DERECHA - CENTRADO VERTICALMENTE */}
      <div className="w-full max-w-[480px] lg:w-[480px] shrink-0 flex items-center justify-center lg:justify-end self-center my-auto">
        <BirthdayForm />
      </div>

    </main>
  );
}


