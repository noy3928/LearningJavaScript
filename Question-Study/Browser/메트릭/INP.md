# Interaction to Next Paint

정의 : 페이지의 전반적인 응답성을 나타내는 것을 목표로한다. 응답에 가장 오래걸렸던 interaction이 INP의 점수가 될 것이다.

<br>

좋은 점수 : 200ms 미만이면 good, 200ms ~ 500ms 이면 needs improvement, 500ms 이상이면 poor

<br>

관찰되는 interaction :

- Clicking with a mouse.
- Tapping on a device with a touchscreen.
- Pressing a key on either a physical or onscreen keyboard.

<br>

FID와의 차이점 :

- FID는 첫번째 인터렉션을 측정하지만, INP는 전체 페이지의 인터렉션 중에서 측정한다.
- FID는 Load와 많은 연관이 있고, INP는 Impression과 많은 연관이 있다.
