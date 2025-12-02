import GameView from "./views/GameView";

const App = () => {
  return (
    <div className="bg-neutral-200 h-screen w-screen relative">
      <div className="grid h-screen place-items-center">
        <h2 className="text-center text-3xl">Isokoban</h2>
        <GameView />
        <p>A JavaScript game by Ryan Boros</p>
      </div>
    </div>
  );
};

export default App;
