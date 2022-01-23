//각 요소를 선택하는 방법에는 여러가지가 있다.
/*
1. id속성을 지정해서 선택하기 
2. name속성을 지정해서 선택하기 
3. html 태그 이름을 지정해서 선택하기 
4. css class이름을 지정해서 선택하기 
5. 지정한 css선택자와 일치 여부로 선택하기 
*/


//-----type으로 요소 선택하기 

//태그 네임으로 요소를 찾을 때는 nodelist객체를 반환한다. 그래서 문서상 첫번째 p요소를 선택하려면 다음처럼 하면 된다. 
var firstpara = document.getElementsByTagName("p")[0] 


//nodelist는 똑같은 배열이기 때문에 다른 배열들 처럼 똑같이 접근할 수 있다. 
for(var i = 0; i < document.images.length; i++){
    document.images[i].style.display ="none"
}

//nodelist와 htmlCollecion의 특징 중 가장 놀라운 점은 변화하는 문서의 어떤 특정 순간이 아닌 실시간 상태가 반영된다는 것이다. 따라서 그 안에 담긴 요소 리스트는 문서가 변하면 달라질 수 있다. 

//---------css class로 요소 선택하기 
//class속성에 "warning"이 있는 모든 요소를 찾는다. 
var warnings = document.getElementsByClassName("warning");

//이름이 'log'인 요소의 자손 중에서, class에 'error'와 'fatal'이 있는 요소를 모두 찾는다. 
var log = document.getElementById("log");
var fatal = document.getElementsByClassName("fatal error")

//-------------css선택자로 요소 선택하기 

//문서의 구조를 명시하는 것도 가능하다. 
#log span //id가 'log'인 요소의 자손들 중에서 <span></span>
#log > span //id가 'log'인 요소의 한 레벨 아래의 span
body>h1:first-child //body한 레벨 아래의h1 중에서 첫 번째 요소 


//querySelectorAll()메서드가 반환하는 nodelist는 메서드를 호출하는 순간 선택자와 일치하는 요소를 그대로 가ㅕ오기느 하지만, 그 후에 일어나는 문서 내 변화를 반영하지는 않는다. 일치하는 요소가 없다면 querySelectorAll()메서드는 비어있는 nodeList를 반환한다. 

//document.all[]

document.all[0] // 문서의 첫 번째 요소 
document.all["navbar"] //id나 name속성값이 'navbar'인 요소 혹은 요소의 집합 
