## context를 사용하기 전에 고려할 것

- 여러 레벨에 걸쳐 props 넘기는 걸 대체하는 데에 context보다 컴포넌트 합성이 더 간단한 해결책일 수도 있습니다.

<br>

## API

```javascript
const MyContext = React.createContext(defaultValue)

...

<MyContext.Provider value={/* 어떤 값 */}>
```

- Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.
- Provider 컴포넌트는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달한다.
- 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없다.
- Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider의 값이 우선시된다.
- Provider 하위에서 context를 구독하는 모든 컴포넌트는 context가 변경될 때마다, 리렌더링된다.

### Context.Consumer

```javascript
<MyContext.Consumer>
  {value => /* context 값을 이용한 렌더링 */}
</MyContext.Consumer>
```

- 이 컴포넌트를 사용하면 함수 컴포넌트안에서 context를 구독할 수 있다.
- 이 함수가 받는 value 매개변수 값은 해당 context의 Provider 중 상위 트리에서 가장 가까운 Provider의 value prop과 동일하다.

### Context.displayName

```javascript
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" in DevTools
<MyContext.Consumer> // "MyDisplayName.Consumer" in DevTools
```
