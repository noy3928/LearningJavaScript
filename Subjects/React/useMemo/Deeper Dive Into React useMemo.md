## When to use useMemo

Use Case 1: 연산비용이 많이 들고, 불필요한 리렌더링을 방지하고자 할 때 사용한다.

이전 포스트에서는 부모 컴포넌트가 지속적으로 상태를 변경시키고 있기 때문에,
자식 컴포넌트가 지속적으로 리렌더링 해야하는 상황을 다루고 있었다.

```javascript
export type VideoGameSearchProps = {
  allGames: VideoGameProps[],
}

export const VideoGameSearch: React.FC<VideoGameSearchProps> = ({
  allGames,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [count, setCount] = React.useState < number > 1

  // NOTE useMemo here!!
  const results = useMemo(() => {
    console.log("Filtering games")
    return allGames.filter(game => game.name.includes(searchTerm))
  }, [searchTerm, allGames])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const onClickHandler = () => {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <>
      <input type="text" value={searchTerm} onChange={onChangeHandler} />
      {results.map(game => (
        <VideoGame
          key={game.name}
          rating={game.rating}
          name={game.name}
          releaseDate={game.releaseDate}
        />
      ))}
      <br />
      <br />
      <p>Count: {count}</p>
      <button onClick={onClickHandler}>Increment count</button>
    </>
  )
}
```

This is a completely made-up example which would likely never exist in production code, but I wanted to illustrate the takeaway points clearly. In this case, there are 2 things going on in this component:

A user can click on an "increment count" button which updates the count state and displays the current number in the UI.
A user can enter a search query in the input field which updates the searchTerm state onChange. This in turn causes the results function to re-calculate, where results is rendered as a list in the UI.
The incrementing of count has nothing to do with how searchTerm is set, or results run. However, every time count is incremented, the component re-renders and runs the results function. It's probably not going to be a big deal here, but what if the allGames array actually contains millions of elements... and instead of a simple filter function, it was a much more computationally complex calculation? This is where useMemo would come in handy.

Wrapping the results function with useMemo (with searchTerm and allGames as dependencies) tells React to only re-run this function, if either of those 2 variables changes. This means that changes in count would no longer cause results to be recalculated, with the memoised result being returned instead.

Note: I've added the console.log in there so you can test it for yourselves to see how many times that function runs with and without the useMemo when you increment count!

Use Case 2: Ensuring referential equality when dealing with dependency lists

If you have a case whereby you're relying on a dependency list, e.g. when using a useEffect hook, you really want to ensure you're only updating the component when the dependency values have truly changed.
