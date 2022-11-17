# React Wrap Balancer

One simple component to make your titles more elegant:

![](.github/demo.gif)

Notice that in “Balanced Title Wrapping” above, every line of wrapped text has almost the same width, so it will likely not to have one single word in a line.

## Usage

Install it to your React project:

```bash
npm i react-wrap-balancer
```

And wrap any text with it:

```jsx
import { Balancer } from 'react-wrap-balancer'

// ...

function Title() {
  return (
    <h1>
      <Balancer>My Awesome Title</Balancer>
    </h1>
  )
}
```

## Requirements

This library uses browser and React 18 APIs such as:
- `ResizeObserver`
- `Symbol.for`
- `useId()` hook

## License

MIT.
