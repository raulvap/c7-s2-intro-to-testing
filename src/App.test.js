import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

/*
  Factory function to create a ShallowWrapper for the App Component
  @factory setup
  @returns {ShallowWrapper}
  (shallow renders the component)
*/
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
};

test("renders without errors", () => {
  const wrapper = shallow(<App />);
  const appComponent = findByTestAttr(wrapper, "component-app");

  expect(appComponent.length).toBe(1);
});

test("Render non-empty component", () => {
  // Shallow no va tan profundo con los childrens
  const wrapper = setup();

  // Hacemos un test de que el wrapper existe
  expect(wrapper.exists()).toBe(true);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");

  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");

  expect(counterDisplay.length).toBe(1);
});

test("counter displays starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();

  expect(count).toBe("0");
});

test("clicking button increments counter display", () => {
  const wrapper = setup();

  // find the button
  const button = findByTestAttr(wrapper, "increment-button");

  // click the button (method)
  button.simulate("click");

  // find the display and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

//https://github.com/bonnie/udemy-ENZYME/blob/main/SOLUTIONS%20for%20Click%20Counter%20Challenges/src/App.test.js
test("clicking button decrements counter display", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);
});

test("error not showing when counter is not 0", () => {
  const wrapper = setup();

  const message = findByTestAttr(wrapper, "error-message");

  expect(message.length).toBe(0);
});

describe("counter is 0 and decrement is clicked", () => {
  // using a describe here so I can use a "beforeEach" for shared setup

  // scoping wrapper to the describe, so it can be used in beforeEach and the tests
  let wrapper;
  beforeEach(() => {
    // no need to set counter value here; default value of 0 is good
    wrapper = setup();

    // find button and click
    const button = findByTestAttr(wrapper, "decrement-button");
    button.simulate("click");
  });

  test("error shows", () => {
    const message = findByTestAttr(wrapper, "error-message");
    expect(message.length).toBe(1);
  });

  test("counter still displays 0", () => {
    const count = findByTestAttr(wrapper, "count").text();
    expect(count).toBe("0");
  });

  test("clicking increment clears the error", () => {
    // find and click the increment button
    const incButton = findByTestAttr(wrapper, "increment-button");
    incButton.simulate("click");

    const message = findByTestAttr(wrapper, "error-message");
    expect(message.length).toBe(0);
  });
});
