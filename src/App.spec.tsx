import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./views/GameView", () => ({
  default: () => {
    return <div data-testid="game-view"></div>;
  },
}));

describe("App component", () => {
  it("should render app", () => {
    render(<App />);

    expect(screen.getByText("Isokoban")).toBeInTheDocument();
  });
});
