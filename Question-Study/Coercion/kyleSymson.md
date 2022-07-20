# Abstract Operation

These operations are not a part of the ECMAScript language;  
they are defined here to solely to aid the specification of the semantics of the ECMAScript language. Other, more specialized abstract operations are defined throughout this specification.

## ToPrimitive

- primitive가 아닌 객체가 있으면 이 메서드를 통해서 primitive 타입으로 변환할 수 있다.

## ToString

null -> "null"  
undefined -> "undefined"  
true -> "true"  
false -> "false"
