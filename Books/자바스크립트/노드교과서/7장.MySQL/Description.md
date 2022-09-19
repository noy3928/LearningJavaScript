# 데이터베이스란?

- 데이터베이스는 관련성을 가지면 중복이 없는 데이터드르이 집합이다.
- 이런 데이터베이스를 관리하는 시스템을 DBMS라고 부른다.

```mysql
mysql> CREATE TABLE nodejs.comments (
    -> id INT NOT NULL AUTO_INCREMENT,
    -> commenter INT NOT NULL,
    -> comment VARCHAR(100) NOT NULL,
    -> created_at DATETIME NOT NULL DEFAULT now(),
    -> PRIMARY KEY(id),
    -> INDEX commenter_idx (commenter ASC),
    -> CONSTRAINT commenter
    -> FOREIGN KEY (commenter)
    -> REFERENCES nodejs.users (id)
    -> ON DELETE CASCADE
    -> ON UPDATE CASCADE)
    -> COMMENT = '댓글'
    -> DEFAULT CHARSET=utf8mb4
    -> ENGINE=InnoDB;
```

- commenter 컬럼에는 댓글을 작성한 사용자의 id를 저장할 것이다. 이렇게 다른 테이블의 기본 키를 저장하는 칼럼을 외래 키라고 부른다.
- CONSTRAINT [제약조건명] FOREIGN KEY [컬럼명] REFERENCES [참고하는 컬럼명]으로 외래 키를 지정할 수 있다.

# CRUD

### Create

```mysql
INSERT INTO nodejs.users (name,age,married, comment) VALUES ('zero',24,0,'자기소개1');
INSERT INTO nodejs.users (name,age,married,comment) VALUES('nero',32,1,'자기소개2');
```

- 데이터 넣어주기.

### Read

```mysql
mysql> SELECT * FROM nodejs.users;


+----+------+-----+---------+---------------+---------------------+
| id | name | age | married | comment       | created_at          |
+----+------+-----+---------+---------------+---------------------+
|  1 | zero |  24 |       0 | 자기소개1     | 2022-09-19 11:30:05 |
|  2 | nero |  32 |       1 | 자기소개2     | 2022-09-19 11:31:03 |
+----+------+-----+---------+---------------+---------------------+
2 rows in set (0.01 sec)



mysql> SELECT * FROM nodejs.comments;

+----+-----------+-----------------------------------------+---------------------+
| id | commenter | comment                                 | created_at          |
+----+-----------+-----------------------------------------+---------------------+
|  1 |         1 | 안녕하세요.zero의댓글입니다.            | 2022-09-19 11:32:39 |
+----+-----------+-----------------------------------------+---------------------+
1 row in set (0.01 sec)
```

- 특정 컬럼만 조회하기

```mysql
mysql> SELECT name,married FROM nodejs.users;
+------+---------+
| name | married |
+------+---------+
| zero |       0 |
| nero |       1 |
+------+---------+
2 rows in set (0.01 sec)
```

- WHERE절을 사용하면 특정 조건을 가진 데이터만 조회할 수도 있다.
- 다음은 결혼을 했고 나이가 30세 이상인 사용자를 조회하는 SQL문이다.
- AND로 여러 조건을 묶어줄 수 있다.

```mysql
mysql> SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
+------+-----+
| name | age |
+------+-----+
| nero |  32 |
+------+-----+
1 row in set (0.00 sec)
```

- ORDER BY [칼럼명] [ASC|DESC] 키워드를 사용하면 정렬도 가능하다.

```mysql
mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC;
+----+------+
| id | name |
+----+------+
|  2 | nero |
|  1 | zero |
+----+------+
2 rows in set (0.00 sec)
```

- 조회할 로우 개수를 설정할 수도 있다.
- LIMIT [숫자] 키워드를 사용한다.

```mysql

mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1;
+----+------+
| id | name |
+----+------+
|  2 | nero |
+----+------+
1 row in set (0.00 sec)
```

- 로우 개수를 설정하면서 몇 개를 건너뛸지 설정할 수 있다.
- 이는 게시판 등의 페이지네이션 기능을 구현할 때 유용하다.
- OFFSET [건너뛸 숫자] 키워드를 사용한다.

```mysql
mysql> SELECT id, name FROM nodejs.users ORDER BY age DESC LIMIT 1 OFFSET 1;
+----+------+
| id | name |
+----+------+
|  1 | zero |
+----+------+
1 row in set (0.00 sec)
```

<br>

### Update

```mysql
mysql> UPDATE nodejs.users SET comment='바꿀내용' WHERE id = 2;
Query OK, 1 row affected (0.01 sec)
Rows matched: 1  Changed: 1  Warnings: 0

```

- 수정 명령어는 UPDATE [테이블명] SET [컬럼명 = 바꿀 값] WHERE [조건] 이다.
- 위의 명령어처럼 id가 2인 로우의 컬럼을 수정할 수 있다.
- users 테이블에서 id가 2인 로우의 comment 를 주어진 내용으로 바꾸라는 뜻이다.

<br>

### Delete

```mysql
mysql> DELETE FROM nodejs.users WHERE id = 2;
Query OK, 1 row affected (0.01 sec)
```

- 삭제 명령어는 DELETE FROM [테이블명] WHERE [조건]dlek.

<br>

# 시퀄라이즈 사용하기

- 시퀄라이즈는 ORM으로 분류된다.
- ORM (Object - relational Mapping)
- ORM은 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구다.
- 시퀄라이즈를 쓰는 이유는 자바스크립트 구문을 알아서 SQL로 바꿔주기 때문이다.

```javascript
const Sequelize = require("sequelize")

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    )
  }

  static associate(db) {}
}
```

- init 메서드 :
  - super.init 메서드의 첫 번째 인수가 테이블 칼럼에 대한 설정이다.
  - 두 번째 인수가 테이블 자체에 대한 설정이다.
- 시퀄라이즈는 알아서 id를 기본 키로 연결한다. id 칼럼은 적을 필요가 없다.

<br>

- model의 index.js 파일

```javascript
const Sequelize = require("sequelize")
const User = require("./user")
const Comment = require("./comment")

const env = process.env.NODE_ENV || "development"
const config = require("../config/config.json")[env]
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize

db.User = User
db.Comment = Comment

User.init(sequelize)
User.init(sequelize)

User.associate(db)
Comment.associate(db)

module.exports = db
```

- db라는 객체에 User와 Comment 모델을 담아두었다.
- db 객체를 require 하여 User와 Comment 모델에 접근할 수 있다.
- User.init과 Comment.init은 각각의 모델의 static.init 메서드를 호출하는 것이다.
- init이 실행되어야 테이블이 모델로 연결된다.

<br>

## 관계 정의하기

- 사용자 한 명은 댓글을 여러 개 작성할 수 있다.
- 하지만 댓글 하나에 사용자가 여러 명 일수는 없다.
- 이런 관계를 일대다 관계라고 한다.
- 1:N 관계에서는 사용자가 1이고, 댓글이 N이다.

- 다른 관계로 일대일, 다대다 관계가 있다.
- 일대일은 사용자와 사용자에 대한 정보 테이블을 예로 들 수 있다.
- 다대다 관계로는 게시글 테이블과 해시태그 테이블 관계를 예로 들 수 있다.
- 한 게시글에는 해시태그가 여러개 달릴 수 있고, 한 해시태그도 여러 게시글에 달릴 수 있다.
- 이런 관계를 다대다 관계라고 한다.

### 1:N

- 시퀄라이즈에서는 1:N 관계를 hasMany라는 메서드로 표현한다.
- users 테이블의 로우 하나를 불러올 때 연결된 comments 테이블의 로우들도 같이 불러올 수 있다.
- 반대로 belongsTo 메서드도 있다.
- comments 테이블의 로우를 불러올 때 연결된 users 테이블의 로우를 가져온다.

```javascript
static associate(db){
    db.User.hasMany(db.Comment, {foreignKey : 'commenter', sourceKey : 'id'})
}

...

static associate(db){
    db.Comment.belongTo(db.User, {foreignKey : 'commenter', targetKey : 'id'})
}
```

- 다른 모델의 정보가 들어가는 테이블에 belongTo를 사용한다.
  - 예제에서는 commenter 컬럼이 추가되는 Comment 모델에 belongTo를 사용하면 된다.
  - 사용자는 한 명이고, 그에 속한 댓글은 여러 개이므로 댓글 로우에 사용자(commenter)가 누구인지 적어야 한다.
- 시퀄라이즈는 위에서 정의한 대로 모델 관계를 파악해서 Comment 모델에 foreingKey(외래키)인 commenter 컬럼을 추가한다. Commenter 모델의 외래 키 칼럼은 commenter이고, User 모델의 id 칼럼을 가리키고 있다.
- hasMany 메서드에서는 sourceKey 속성에 id를 넣고, belongsTo 메서드에서는 targetKey 속성에 id를 넣는다. sourceKey의 id와 targetKey의 id 모두 User 모델의 id이다. hasMany에서는 sourceKey를 쓰고, belongsTo에서는 targetKey를 쓴다고 생각하면 된다.
- foreignKey를 따로 지정하지 않으면 이름이 모델명 + 기본 키인 칼럼이 모델에 생성된다.

<br>

### 1:1 관계

- 1:1관계에서는 hasMany 메서드 대신 hasOne 메서드를 사용한다.
- 사용자 정보를 담고 있는 가상의 info 모델이 있다면 다음과 같이 표현할 수 있다.

```javascript
db.User.hasOne(db.Info, { foreignKey: "UserId", sourceKey: "id" })
db.Info.belongsTo(db.User, { foreignKey: "UserId", targetKey: "id" })
```

<br>

### N : M 관계

- 시퀄라이즈에는 N:M 관계를 표현하기 위한 belongToMany 메서드가 있다.
- 게시글 정보를 담고 있는 가상의 Post 모델과 해시태그 정보를 담고 있는 가상의 Hashtag 모델이 있다면 다음과 같이 표현될 수 있다.

```javascript
db.Post.belongsToMany(db.hashtag, { through: "PostHashtag" })
db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" })
```

- N : M에서는 데이터를 조회할 때 여러 단계를 거쳐야 한다.

<br>

## 쿼리 알아보기

```javascript
INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개1');

const {User} = require('../models');
User.create({
  name : 'zero',
  age : 24,
  married : false,
  comment: '자기소개1',
})

```

```javascript
SELECT * FROM nodejs.users;

User.findAll({});

...

SELECT * FROM nodejs.users LIMIT 1;
User.findOne({});

...

SELECT name, married FROM nodejs.users;
User.findAll({
  attributes:['name','married']
})

...

SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
const {Op} = require('sequelize');
const {User} = require('../models');

User.findAll({
  attributes : ['name', 'age'],
  where:{
    married : true,
    age : {[Op.gt]:30}
  }
})
```

- WHERE의 age 부분이 조금 특이하다.
- 시퀄라이즈는 자바스크립트 객체를 사용해서 쿼리를 생성해야하므로 Op.gt 같은 특수한 연산자들이 사용된다.
- Sequelize 객체 내부의 Op 객체를 불러와 사용한다.

```javascript
SELECT id , name FROM users ORDER BY age DESC;
User.findAll({
  attributes : ['id', 'name'],
  order:[['age', 'DESC']]
})
```

### 관계 커리

- findOne 이나 findAll 메서드를 호출할 때 프로미스의 결과로 모델을 반환한다.

```javascript
const user = await User.findOne({})
console.log(user.nick)
```

- 현재 User 모델은 Comment 모델과 hasMany-belongsTo 관계가 맺어져 있다.
- 만약 특정 사용자를 가져오면서 그 사람의 댓글까지 모두 가져오고 싶다면 include 속성을 사용한다.
- 어떤 모델과 관계 있는지를 include 배열에 넣어주면된다.
  - 배열인 이유는 다양한 모델과 관계가 있을 수 있기 때문이다.

```javascript
const user = await User.findOne({
  include: [
    {
      model: Comment,
    },
  ],
})
```

- 관계를 설정하고 나면 getComments, setComments, addComment 등등의 메서드를 지원한다.
- 동사 뒤에 모델의 이름이 붙는 형식이다.

- include 나 관계 쿼리 메서드에도 where이나 attributes 같은 옵션을 사용할 수 있다.

```javascript
const user = await User.findOne({
  include: [
    {
      model: Comment,
      where: {
        id: 1,
      },
      attributes: ["id"],
    },
  ],
})

//또는

const comments = await user.getComments({
  where: { id: 1 },
  attributes: ["id"],
})
```

- 직접 쿼리를 사용하는 방법도 있다.

```javascript
const [result, metadata] = await sequelize.query("SELECT * FROM comments")
```
