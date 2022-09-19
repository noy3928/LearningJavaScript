Let say that we have a component that on one iteration renders 5 components and the next inserts a new component in the middle of the list. This would be really hard with just this information to know how to do the mapping between the two lists of components.

By default, React associates the first component of the previous list with the first component of the next list, etc. You can provide a key attribute in order to help React figure out the mapping. In practice, this is usually easy to find out a unique key among the children.

[https://calendar.perfplanet.com/2013/diff/]

---

반복적으로 동일한 컴포넌트를 사용하게 되면 리액트에서는 해당 컴포넌트가 어떤 데이터와 연결되어 있는지 정확히 인지할 수가 없다.  
이렇게 어떤 데이터가 정확히 어떤 컴포넌트와 연결되었는지 인식할 수 없는 경우 리액트는 변경된 컴포넌트만 갱신하는 것이 아니라,  
state에 해당하는 모든 컴포넌트드를 지우고 전부 다시 그리게 된다.

<br>

이런 문제를 해겷하기 위해 리액트에서는 반복적으로 표시되는 동일한 컴포넌트에 key값을 설정하여 특정 데이터와 컴포넌트를 연결하게 된다.  
반복적으로 동일한 컴포넌트를 사용할 때 이 key값이 주어진다면 해당 key값을 보고 가상 돔에서 새로 만든 ToDoItem 컴포넌트들과 이전에 있던  
ToDoItem 컴포넌트를 비교하여 변경된 부분만 갱신하게 된다.

[스무디 한 잔 마시며 끝내는 리액트 TDD]
