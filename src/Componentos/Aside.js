import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import TshirtModel from "./TshirtModel";
import "../Styles/Aside.css";

function Aside() {
    return (
        <aside className="aside flex-center">
            <div className="overlay"></div>

            {/* Title / Background Text */}
            <div className="aside-bg-text">
                <h2>FIMO</h2>
            </div>

            <div className="aside-container">

                {/* Info Card 1 */}
                <div className="info-card card-top-left">
                    <span className="info-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
                    </span>
                    <div className="info-text">
                        <h4>100% Organic Cotton</h4>
                        <p>Breathable, soft, and sustainable fabric for everyday comfort.</p>
                    </div>
                </div>

                {/* Info Card 2 */}
                <div className="info-card card-top-right">
                    <span className="info-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>
                    </span>
                    <div className="info-text">
                        <h4>Premium Stitching</h4>
                        <p>Durable seams that ensure long-lasting wear without losing shape.</p>
                    </div>
                </div>

                {/* React Three Fiber 3D Canvas */}
                <div className="aside-3d-model">
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                        <ambientLight intensity={0.4} />

                        <spotLight
                            position={[5, 10, 5]}
                            angle={0.3}
                            penumbra={1}
                            intensity={2}
                            castShadow
                            color="#000"
                        />

                        <spotLight
                            position={[-5, 5, 5]}
                            angle={0.3}
                            penumbra={1}
                            intensity={1.2}
                            color="#555555"
                        />

                        <Suspense fallback={null}>
                            {/* 🔥 Model yanayam kattalashtirildi */}
                            <TshirtModel scale={11} />

                            <Environment preset="studio" />

                            <ContactShadows
                                position={[0, -4.2, 0]}
                                opacity={0.8}
                                scale={25}
                                blur={3}
                                far={5}
                                color="#000000"
                            />
                        </Suspense>

                        <OrbitControls
                            enableZoom={false}
                            autoRotate
                            autoRotateSpeed={1.0}
                            enablePan={false}
                            maxPolarAngle={Math.PI / 2 + 0.1}
                            minPolarAngle={Math.PI / 2 - 0.5}
                        />
                    </Canvas>
                    <div className="glow-effect"></div>
                </div>

                {/* Info Card 3 */}
                <div className="info-card card-bottom-left">
                    <span className="info-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                    </span>
                    <div className="info-text">
                        <h4>Eco-Friendly Dye</h4>
                        <p>Colors that stay vibrant wash after wash without harsh chemicals.</p>
                    </div>
                </div>

                {/* Info Card 4 */}
                <div className="info-card card-bottom-right">
                    <span className="info-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>
                    </span>
                    <div className="info-text">
                        <h4>Perfect Fit</h4>
                        <p>Designed to provide maximum comfort and a stylish look for any occasion.</p>
                    </div>
                </div>
            </div>

        </aside>
    );
}

export default Aside;