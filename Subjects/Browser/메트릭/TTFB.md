# Time To First Byte

- TTFB는 리소스에 대한 요청과 첫번째 응답이 도착하기까지의 시간을 말한다.
- TTFB는 다음과 같은 시간의 총합이라고 할 수 있다.

  - Redirect time
  - Service worker startup time (if applicable)
  - DNS lookup
  - Connection and TLS negotiation
  - Request, up until the point at which the first byte of the response has arrived

- 여기서 시간이 지연되는 것은 대체로 서버측의 문제이다. 그러나 프론트측에서도 도움을 얻을 수 있는 방법이 있다면, CDN을 활용하는 것이다.
