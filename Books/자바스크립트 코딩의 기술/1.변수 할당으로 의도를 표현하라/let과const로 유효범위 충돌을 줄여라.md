값이 변경되는 경우 가장 좋은 선택은 let이다. 

* var는 어휘적 유효범위(lexical scope)를 따른다. 
* let은 블록 유효 범위(block scope)를 따른다. 
    * 블록 유효범위는 if블록이나 for 반복문 같은 블록내부에만 존재한다. 
    * 블록 밖에서는 블록 유효 범위 변수에 접근할 수 없다. 
    * 즉, 중괄호를 벗어나면 변수가 존재하지 않음

<pre>
<code>
function getLowsPrice(item){
    var count = item.inventory;
    var price = item.price;
    if(item.salePrice){
        var count = item.saleInventory;
        if( count > 0){
            price = item.salePrice;
        }
    }
    if(count){
        return price;
    }

    return 0;
}
<code>
</pre>

위 코드에 버그는 없는가? 변수를 같은 이름에 재할당한 것이 문제였다. 

let은 블록 유효 범위를 따르므로 블록 내부에 선언한 변수는 블록 외부에 존재하지 않는다. 

<pre>
<code>
function getLowstPrice(item){
    let count = item.inventory;
    let price = item.price;
    if(item.salePrice){
        let count = item.saleInventory;
        if(count > 0){
            price = item.salePrice;
        }
    }
    if(count){
        return price;
    }
    return 0;
}
</code>
</pre>

위의 경우, 변수 count를 선언하기 위해 if 블록 안에서 let을 사용했기 때문에 함수를 시작할 때 선언한 변수 count와 충돌하지 않습니다. 

### 재할당 가능 여부 

* let과 const는 같은 이름의 변수를 다시 선언할 수 없다. 
* var는 같은 유효 범위에서 같은 이름의 변수로 선언할 수 있다. 
    * 10행에 var price = 1 이라고 선언했다가, 25행에서 var price = 5 라고 선언해도 충돌이 생기지 않는다. 
    * 따라서 의도치 않게 변수 이름을 재사용하면 큰 문제가 생길 수 있다. 