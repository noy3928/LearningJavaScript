- React.memo는 다른 컴포넌트를 감싸는 고차함수 컴포넌트다.
  - 리액트는 컴포넌트가 처음 렌더링되고 나서, 이것을 메모리 상에 저장해둔다.
  - 그리고 리액트는 prop 값에 대해서 얕은 비교를 진행한다.
  - 이전 값과 같다면 리액트는 저장된 컴포넌트를 사용하고, 같지 않다면 컴포넌트를 리렌더링한다.

### TIP 1 :

본인이 재정의한 비교함수를 두번째 인자로 넘길 수도 있다.  
기본적인 함수를 사용하는 것 대신에.

```javascript
const checkStrictEquality = (prevProps, newProps) => {
  // blah blah
}

React.memo(Component, checkStrictEquality)
```

<br>

### TIP 2 :

얕은 비교를 사용하기 때문에, 레퍼런스 타입을 넘기는 것을 주의해야한다.  
이럴 때 useCallback과, useMemo를 사용하는 것이 유용하다.  
이렇게하면 주소값을 저장해놓고 사용하는 것이 가능하기 때문에,  
react.memo로 감싸고 있는 컴포넌트가 리렌더링하는 것을 방지할 수 있다.

```javascript
const onClickHandler = useCallback(() => {
  // blah blah
}, [insert dependencies here]);

export const VideoGame: React.FC<VideoGameProps> = React.memo(
  ({ rating, name, releaseDate, onClickHandler }) => (
    <div>
      <p>Name: {name}</p>
      <p>Rating: {rating}</p>
      <p>Release date: {releaseDate}</p>
      <button onClick={onClickHandler}>Click</button>
      <hr />
    </div>
  )
);
```
