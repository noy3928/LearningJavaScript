const people = ['yoshi', 'ryu', 'chun-li', 'mario'];
const ages = [20, 25, 30, 35];

console.log(people);

module.exports = {
    people,
    ages
} // 여기서 넘겨주는 값은, 다른 곳에서 require로 받는 값이 될 것이다. 