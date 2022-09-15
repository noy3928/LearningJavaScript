# 이벤트 위임 패턴

- 이벤트 위임은 캡처링과 버블링을 활용한 이벤트 핸들링 패턴이다.
- 이벤트 위임을 사용하면 요소마다 핸들러를 할당하지 않고, 요소의 공통 조상에 이벤트 핸들러를 단 하나만 할당해도 여러 요소를 한꺼번에 다룰 수 있다.

```javascript
<div>
    <button data-action="save">저장하기</button>
    <button data-action="load">불러오기</button>
    <button data-action="search">검색하기</button>
</div>

<script>
 class Menu{
     constructor(elem){
         this._elem = elem;
         elem.onclick = this.onClick.bind(this); //(*)
     }

     save(){
         alert('저장하기')
     }

     load(){
         alert('불러오기')
     }

     search(){
         alert('검색하기')
     }

     onClick(){
         let action = event.target.dataset.action;
         if(action){
             this[action]()
         }
     }
 }
 new Menu(menu)
</script>
```

<br>

## 행동 패턴

버튼을 클릭하면 숫자가 증가하는 행동을 부여해주는 속성인 data-counter를 살펴보자.

```javascript
<input type="button" value="1" data-counter>
<input type="button" value="2" data-counter>

<script>
document.addEventListener('click', function(event){
    if(event.target.dataset.counter != undefined){
        event.target.value++;
    }
})
</script>
```

여기서 중요한 것은 접근 방식이다.  
data-counter 속성이 있는 요소는 원하는 만큼 만들 수 있다.  
필요할 때마다 HTML에 추가해주면 된다.  
예시에선 이벤트 위임을 사용해 행동을 선언해주는 속성을 추가해서 HTML을 '확장'했다.

<br>

### 토글러 구현하기

```javascript
<button data-toggle-id="subscribe-mail">
    구독 폼 보여주기
</button>

<form id="subscribe-mail" hidden>
    메일 주소 : <input type="email">
</form>

<script>
    document.addEventListener('click', function(event){
        let id = event.target.dataset.toggleId;
        if(!id) return;

        let elem = document.getElementById(id);

        elem.hidden = !elem.hidden;
    })
</script>

```

태드게 data-toggle-id속성만 추가하면 요소를 토글할 수 있다.

## 이벤트 위임의 장점 :

- 많은 핸들러를 할당하지 않아도 되기 때문에 초기화가 단순해지고 메모리가 절약된다.
- 요소를 추가하거나 제거할 때 해당 요소에 할당된 핸들러를 추가하거나 제거할 필요가 없기 때문에 코드가 짧아진다.
