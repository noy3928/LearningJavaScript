import { render, screen } from "@testing-library/react"
import App from "./App"

test("renders learn react link", () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

describe("<App/>", () => {
  it("renders component correctly", () => {
    const { container } = render(<App />)
    // expect(container.getElementsByClassName("App-logo")).toHaveLength(1)
    // expect(container.getElementsByClassName("App-logo")[0]).toHaveAttribute(
    //   "src",
    //   "logo.svg"
    // )
    // expect(container.getElementsByTagName("p")).toHaveLength(1)
    // expect(container.getElementsByTagName("p")[0]).toHaveTextContent(
    //   "Edit src/App.js and save to reload"
    // )

    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
