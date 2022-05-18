# 뷰포트 meta 태그

meta 태그는 웹 브라우저에게 특별한 정보를 제공하는 HTML 태그입니다.
모바일 웹 페이지는 화면에 대한 특별한 정보를 제공하려고 뷰포터 meta 태그를 사용합니다.
뷰포트 meta태그는 브라우저의 화면 설정과 관련된 정보를 제공합니다.

다음은 네이버 모바일 페이지의 뷰포트 meta태그입니다.

<pre>
<code>

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi" />

</code>
</pre>

---

뷰포트는 웹페이지가 사용자에게 보여지는 영역을 말하는 것이다. 데스크탑의 경우 브라우저의 크기를 바꿔서 뷰포트의 크기를 바꿀 수 있지만, 모바일의 경우 브라우저의 크기를 변경할 수 없다. 게다가 각각의 브라우저는 한 화면에 모든 내용을 보여주는 것을 정책으로 삼고 있기 때문에, 뷰포트의 영역이 좁은데, 화면이 큰 경우에는 화면이 매우 작게 나오는 문제가 있다.
이런 문제를 해결하기 위해서 모바일에 해당하는 경우 적절한 뷰포트 meta태그를 설정해주는 것이 필요하다.

<pre>
<code>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</code>
</pre>

위의 코드가 가장 일반적으로 사용되는 코드이다. 위의 설정은 페이지 너비를 휴대기기 화면너비에 맞추고, 처음 로딩시 줌을 하지 않는 것이다.
