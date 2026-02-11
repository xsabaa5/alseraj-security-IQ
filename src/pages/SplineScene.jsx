import "./SplineScene.scss";
import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="reltive w-screen z-0 pt-25 sm:pt-20 md:pt-0 lg:pt-20">
        <div className="SplineScene ">
      <Spline
      className="w-screen"
        scene="https://prod.spline.design/wXH9s-mz1tsC47-J/scene.splinecode"/>
        </div>
    </div>
  );
}
