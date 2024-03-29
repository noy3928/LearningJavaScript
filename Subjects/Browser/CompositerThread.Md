# CompositerThread

브라우저의 메인 스레드가 모든 것을 담당하기에는 너무 많은 일이 브라우저 상에서 일어난다.  
때문에 여러 스레드가 나눠져서 역할을 담당한다.

컴포지터 스레드를 활용하면,
페이지의 버전을 순간적으로 기록할 수 있고,  
유저가 스크롤 함과 동시에 애니메이션을 보여줄 수 있다.  
이렇게 함으로서 페이지가 원활하게 흘러가는 것처럼 만들 수 있다.

레이어트리가 생성되고 페인트 순서가 결정되고 나면 메인 스레드가 해당 정보를  
컴포지터 스레드에 넘긴다.  
그러면 컴포지터 스레드는 각 레이어를 래스터화한다.  
어떤 레리어는 페이지의 전체 길이만큼 클 수 있다.  
그래서 컴포지터 스레드는 레이어를 타일 형태로 나눠 각 타일을 래스터 스레드로 보낸다.  
래스터 스레드는 각 타일을 래스터화해 GPU 메모리에 저장한다.

# Nice Threads

정말 압축적으로 말해보자면, 브라우저에는 3개의 스레드가 있다.

- UI thread : chrome itself. the tab bar, etc.
- the renderer thread : we usaually call this the main thread. this is where all js, parsing html and css, style calculation, layout, and painting happens. there are one of these per tab.
- the compositor thread : draws bitmaps to the screen via the GPU.

## the compositor thread :

- when we paint , we create bitmaps for the elements, put them onto layers, and prepare shadars for animations if neccessary.
- after painting, the bitmaps are shared with a thread on the gpu to do the actual compositing.
- the gpu process works with openGL to make magic happen on your screen.
- the compositor thread is gpu-intensive thread.
