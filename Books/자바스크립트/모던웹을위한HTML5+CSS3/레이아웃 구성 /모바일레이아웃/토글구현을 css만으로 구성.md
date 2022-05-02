css 코드

<pre>
<code>
    <style>
        /* 토글 구현 */
        #toggle { display: none; }
        #toggle + #wrap > #toggle_gnb_wrap { display: none; }
        #toggle:checked + #wrap > #toggle_gnb_wrap { display: block; }

        /* 레이아웃 색상 */
        #toggle_gnb_wrap {
            background: #363636;
            padding: 15px;
        }
        #toggle_gnb {
            background: #FFFFFF;
            padding: 5px;
        }

        /* 토글 목록 */
        #toggle_gnb > ul { overflow: hidden; }
        #toggle_gnb > ul > li {
            width: 80px; float: left;
        }
    </style>
</code>
</pre>

<br>

HTML 코드

<pre>
<code>
    <input id="toggle" type="checkbox" />
    <div id="wrap">
        <header id="main_header">
            <a class="left" href="#">Main</a>
            <h1>Mobile</h1>
            <label class="right" for="toggle" onclick="">Toggle</label>
        </header>
        <div id="toggle_gnb_wrap">
            <div id="toggle_gnb">
                <ul>
                    <li><a href="#">버튼</a></li>
                    <li><a href="#">버튼</a></li>
                    <li><a href="#">버튼</a></li>
                    <li><a href="#">버튼</a></li>
                    <li><a href="#">버튼</a></li>
                    <li><a href="#">버튼</a></li>
                    <li><a href="#">버튼</a></li>
                    <li><a href="#">버튼</a></li>
                </ul>
            </div>
        </div>
</code>
</pre>
