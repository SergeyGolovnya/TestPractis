CSS pseudo-class :focus-within could be used to allow conditional rendering in parent element on the focus state of descendant elements.

While it is cool, in complex web apps, it might be better to control the state in script.

Now please create useFocus() to support this.

function App() {
  const [ref, isFocused] = useFocus()
  return <div>
    <input ref={ref}/>
    {isFocused && <p>focused</p>}
  </div>
}
