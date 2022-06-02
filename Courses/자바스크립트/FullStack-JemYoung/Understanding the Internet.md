# How does the internet work?

internet is a system of globally interconnected devices

intranet is a private internet.

# DNS

domain name system  
it is like a internet phone book.

# Trace Routes

<pre>
<code>
man traceroute 

tracroute google.com
</code>
</pre>

Traceroute gives you a map of every single have along that point.
it's mapping the path of every single server that we hit along the way.

이것을 통해서 우리는 network problem을 진단할 수 있다.

우리가 이렇게 ping을 보내거나, traceroute를 보내는 것은
ICMP에게 보내는 것과 같다.  
ICMP(Internet Control Message Protocol) is health checks of sort.  
Traceroute is how many hops does it take to get to the server, are you alive?

> 홉 hop
>
> > 홉은 컴퓨터 네트워크에서 출발지와 목적지 사이에 위치한 경로의 한 부분이다. 데이터 패킷은 브리지, 라우터, 게이트웨이를 거치면서 출발지에서 목적지로 경유한다.

<br>

# Packet

it's the smallest bit of information you can transmit.
envelop.
there is addres.
where you coming from.

- on the internet is just billions, and trilliions, and trillions of packets are moving right now.

- key information is meta data.

  - where it' going
  - where it came from
  - all these metadata attached to it.

- packet is not a just one.
