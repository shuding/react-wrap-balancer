# React Wrap Balancer

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
