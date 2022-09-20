[How To Identify And Reduce Render-Blocking Resources](https://www.searchenginejournal.com/identify-reduce-render-blocking-resources/316365/#close)

Identifying and reducing resources responsible for blocking the rendering of your web pag is a critical optimization point that can make or break your page speed.

It can be so critical that it can pay dividens to your site's page experience metrics as a result.

> dividens :
>
> > A dividend is the part of company's profits which is paid to people who own shares in the company.  
> > 1.the number or quantity to be divided.
> > 2.an individual's share of such a sum or quantity.

In 2021, the average time it took to fully render a mobile web page was 22 seconds. In2018, it was 15 seconds.

Clearly, this is a substantially higher number than Google's recommended time of 2-3 seconds. It's also substantially higher than it used to be.

What could be causing these issues with render-blocking resources?

What is driving this increase in overall page render speed?

One interesing trend to note is that there has been an increasing reliance on third party fonts compared to system fonts. Using third-party fonts as a resource tends to interfere with the processing and rendering of a page.

> reliance :
>
> > A person's or thing's reliance on something is the fact that they need it and often cannot live or work without it.
> > the act of relying, trust, dependence , or confidence

With system fonts, the browser does not have to load anything extra, so it doesn't have that additional processing step as a result.

This reliance across industries is likely to impact this rendering time. Of course, this is not the only cause of this issue with render-blocking resources.

In addition, Google's own services tend to have a significant impact on rendering time, such as Google Analytics or using a third-party Facebook pixel for tracking purposes.

The desire to rely on such technologies is not necessarily terrible from a marketing perspertive.

But, from a render-blocking resources perspective, it can cause significant increases in page load time and how Google perceives your page.

The ideal solution is to make sure that your page loads for user interaction as quickly as possible.

it's also a possiblity that poor web development practices in use by web developers today are to blame.

Either way, this is something in every website project that should be addressed as part of your Core Web Vitals audits.

Page experience, however, is not just about how fast the entire page loads.

instead, it's more about the overall experience of the page as measured by Google's page experience framework, or Core Web Vitals.

This is why you want to work on improving and optimizing your page speed for the critical rendering path throughout the DOM.

=> 첫번째 문맥에서는 성능에 대한 이야기를 하고 있다. 이것은 단순히 속도에 대한 이야기 뿐만이 아니라, 유저가 페이지에서 경험하게 대한 모든 것이 대한 것이라고 이해할 수 있다. 이것을 저해하는 요소들을 Rendering blocking resources라고 부른다.

## What is The Critical Rendering Path?

The critical rendering path refers to all of the steps that it takes in order to render the entire page, from when the browser first begins receiving data to when it finally compiles the page at the final render.  
=> crp는 steps이다. 어떤 step이냐? 전체 화면을 그리기 위한 steps.

This is a process that can take only several milliseconds if you optimize it right.

Optimizing for the critical rendering path means making sure that you optimize for the performance of rendering on many different devices.  
=> crp를 최적화 한다는 것은 다양한 devices에서 최적화한다는 것도 의미한다.

This is accomplished by optimizing the critical rendering path to get to your first paint as quickly as possible.

Bascically, you're reducing the amount of time users spend looking at a blank white screen to display visual content ASAP.  
=> 기본적으로 아예 흰색 빈 화면만 보게 만드는 시간을 줄이는 것이다.

<br>

## How does The Critical Rendering Path Work?

The critical rendering path refers to the series of steps a browser take on its journey to render a page, by converting the HTML, CSS, and JS to actual pixels on the screen.  
=> crp의 또 다른 정의 : 브라우저가 가지는 단계들을 말하는 것이다. 브라우저가 HTML, CSS, JS를 실제 화면의 pixel로 변환하는 그 여정에서 거치는 그 단계들을 CRP라고 부른다.

Essentially, the browser needs to request, receive, and parse all HTML, and CSS files before it will start to render any visual content.  
=> 눈에 보이는 것들을 render하기 전에 HTML과 CSS파일을 parse한다.

This process occurs within a fraction of a second. Until the browser completes these steps, users will see a blank white page.

The following is an example of how users may experience how a page loads accoring to the different stages of the page load process:

Improving the critical rendering path can thus improve on the overall page experience, which can help contribute to improved performance on Core Webb Vitals metrics.

<br>

## How do i optimize the critical rendering path?

- Reducing the quantity of resources :
  - that are critical to the rendering path. This can be done by using a defer method for any possible render-blocking resources.
- Prioritizing content :
  - that is above-the-fold, and downloading important media assets as early as you possibly can.
- Compress the file size :
  - of any remaining critical resources.

: 3가지로 정리된다.

1. 리소스의 양을 줄인다.
2. 콘텐츠의 우선순위를 정한다.
3. 파일의 사이즈를 압축한다.

<br>

## Why should i care?

- According to Google, the same three Core Web Vitals metrics (LCP, FID, and CLS) along with their associated thresholds will now be linked to desktop ranking.

<br>

## Why Improve Render- Blocking CSS ?

- Even though it happens in the midst of a millisecond or less (in most cases), the browser won’t start to render any page content until it is able to request, receive, and handle all CSS styles.

This could take anywhere from a millisecond to several seconds, depending on what your server needs to do in order to load these resources.

It can also vary, which could depend on the size, along with the quantity, of these CSS files.

The following render tree shows an example of a browser rendering all the files along with CSS withing the DOM :

In addition, the following shows an example of ther rendering sequence of a page, in which all the files load in a process, from the construction of the DOM to the final painting and composoting of the page, which is known as the critical rendering path.

> 구글이 이런말을 했다.
>
> > “CSS is a render-blocking resource. Get it to the client as soon and as quickly as possible to optimize the time to first render.”

## Why Improve Render-Blocking JavaScript?

- But, if a browser finds JavaScript files before the first render of a page, the rendering process can be stopped until later and after JavaScript files are fully executed.

> 구글이 이런 말을 했다.
>
> > “JavaScript can also block DOM construction and delay when the page is rendered. To deliver optimal performance … eliminate any unnecessary JavaScript from the critical rendering path.”

<br>

---

# rendering blocking resource를 줄일 방법 :

## Make sure Not To Add CSS Using The @import Rule

@import 를 사용하면, 이 구문을 만났을 때 브라우저는 해당하는 css file들을 불러올 것이다.  
그러면 그 작업이 끝날때까지는 또 rendering이 blocking된다.

이 방법 대신에 <link rel = "stylesheet">를 사용할 것

<br>

## Use System Fonts Instead Of Third-Party Fonts

third-party font file은 load하는데 시간이 걸리기 때문에,  
rendering blocking 요소가 된다.

이것은 External file이기 때문에, 그것을 브라우저가 네트워크를 통해서 요청해야 한다.  
시스템 폰트를 사용하는 것은 browser의 프로세스에 속해있다. external request를 하지 않는다.

<br>

## Minify Your CSS And JavaScript Files

js나 css파일을 빈 공간이 없이 압축시키는 것. 이것은 웹팩을 통해서 진행할 수 있다.
이렇게 파일의 크기를 압축시키면 초기 렌더링 속도를 높일 수 있다.

<br>

## Improve Your Coding Techniques And Combining Files

웹팩을 통해서 여러개로 분리되어 있던 자바스크립트 파일을 하나로 합칠 것.  
그렇게 함으로써, 네트워크를 통해 요청하는 횟수를 줄이기.  
혹은 중요한 것들을 먼저 로드시키고, 필요한 것은 나중에 로드 시키는 방법으로,  
레이지 로딩하기.
