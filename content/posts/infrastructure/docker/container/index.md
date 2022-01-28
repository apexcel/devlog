---
title: "도커 컨테이너(Docker Container)"
tags: [Programming, Docker, DevOps, Infrastructure, Cloud]
category: "Infrastructure"
date: "2021-03-03T11:32:08.791Z"
---
## 도커와 유용성

> **도커(Docker)**는 리눅스의 응용 프로그램들을 소프트웨어 컨테이너에 배치시키는 일을 자동화하는 오픈 소스 프로젝트이다.

도커는 **Go**언어로 구현한 libcontainer를 사용한다. libcontainer는 OS수준에서의 가상화를 도와주며 대부분의 리눅스 운영체제에서 사용가능하고 기존의 가상 머신(VMWare/VirtualBox)에 비해 가볍고 성능 손실이 적으며 배포하기 편리하다는 장점이 있다. **도커 컨테이너**는 Host OS 위에서 돌아가는 격리된 공간이다. 서로 다른 개발환경에서 매번 의존성 패키지를 설치하고 설정하는데 시간을 들이지 않고 도커 이미지를 배포하고 받아서 똑같은 환경을 구성하여 사용할 수 있다.

하나의 프로그램내에서 여러 기능을 처리하는 방식의 어플리케이션을 **모놀리틱(monolithic)** 어플리케이션이라고 하는데 소규모의 앱에서는 큰 상관이 없지만 크기가 커질수록 상호간의 의존성이 커지고 기능을 분리하기가 어려워진다. 이에 등장한 것이 **마이크로서비스 아키텍쳐(microservice architecture)**이다. 이는 각 기능들을 모듈별로 분리하므로 장애 대응이 상대적으로 빠르고 관리하기 쉬운 장점이 있다. 이 모듈들을 각각 분리하여 담을 수 있는 것이 컨테이너이다.

도커 설치 방법은 [공식 홈페이지](https://docs.docker.com/engine/install/ubuntu/)에서 상세하게 설명하고 있다.

## 도커 이미지

> repo/ubuntu:20.04

도커 이미지의 이름은 보통 `[저장소명]/[이미지 이름]:[태그]` 형식으로 구성된다.

- 저장소(repository): 이미지가 저장된 장소를 뜻하며 저장소 이름이 명시되지 않은 경우 도커에서 기본적으로 제공하는 이미지 저장소인 [도커 허브](https://hub.docker.com/)의 공식 이미지를 뜻한다.
- 이미지 이름: 해당 이미지의 역할을 나타낸다.
- 태그: 이미지의 버전관리에 사용한다. 명시되지 않을 경우 lastest로 인식한다.

## 컨테이너 생성

```shell
> docker -v
Docker version 20.10.5, build 55c4c88
```

먼저 버전 확인을 한다.

```shell
> docker run -i -t ubuntu:20.04
Unable to find image 'ubuntu:20.04' locally
20.04: Pulling from library/ubuntu
83ee3a23efb7: Pull complete 
db98fc6f11f0: Pull complete 
f611acd52c6c: Pull complete 
Digest: sha256:703218c0465075f4425e58fac086e09e1de5c340b12976ab9eb8ad26615c3715
Status: Downloaded newer image for ubuntu:20.04
root@a7ccae32086d:/# 
```

`run` 명령어는 `pull` > `create` > `start` 순으로 명령어를 실행한 후 `attach`한다.

- `pull`: 이미지를 내려 받음.
- `create`: 이미지를 이용해 컨테이너 생성.
- `start`: 컨테이너 실행.
- `attach`: 실행된 컨테이너에 연결.

실행 시킨 프로세스에서 상호 작용을 하기 위해서는 반드시 `-i`와 `-t` 옵션을 붙여줘야한다. `-i`는 `attach`되지 않은 경우에도 interactive 할 수 있도록 해주며 `-t`는 `TTY`를 활성화 시킨다. 줄여서 `-it`로 사용할 수도 있다. 로컬에 해당하는 도커 이미지가 없다면 도커 허브에서 자동으로 이미지를 내려받으며 컨테이너의 기본 사용자는 **root**이며 호스트 이름은 무작위 16진수 해시값이며 앞의 일부분만 표시된다.

```shell
> docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
ubuntu       20.04     f63181f19b2f   5 weeks ago   72.9MB
```

`docker images`로 로컬에 내려 받은 이미지들을 확인 할 수 있다.

## 컨테이너 목록

```shell
> docker ps
CONTAINER ID   IMAGE          COMMAND       CREATED        STATUS          PORTS     NAMES
a7ccae32086d   ubuntu:20.04   "/bin/shell"   13 hours ago   Up 36 seconds             determined_galileo

> docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED         STATUS                     PORTS     NAMES
a7ccae32086d   ubuntu:20.04   "/bin/shell"   7 minutes ago   Exited (0) 7 seconds ago             determined_galileo
```

- `CONTAINER ID`: 컨테이너에 할당되는 고유 아이디 값.
- `IMAGE`: 컨테이너 생성에 이용된 이미지의 이름.
- `COMMAND`: 컨테이너가 시작될 때 실행될 명령어.
- `CREATED`: 컨테이너가 생성된 이후 흐른 시간.
- `STATUS`: 컨테이너의 상태. Up, Exited, Pause등이 있다.
- `PORT`: 컨테이너가 개방한 포트와 호스트에 연결된 포트.
- `NAMES`: 컨테이너가 생서될 때 이름을 명시하지 않으면 형용사_명사 형태로 무작위하게 결정된다. 이름을 변경할 때는 `rename` 명령어로 바꿀 수 있다.

```shell
> docker rename a7 test_image
> docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED        STATUS                     PORTS     NAMES
a7ccae32086d   ubuntu:20.04   "/bin/shell"   14 hours ago   Exited (0) 9 minutes ago             test_image
```

실행된 컨테이너를 빠져나오는데에는 두 가지 방법이 있다. `exit`을 입력하거나 `Ctrl+D`를 통해 컨테이너를 빠져나오면서 정지시킬수 있고 다른 방법은 `Ctrl+P, Q`를 통해 정지하지 않고 빠져 나오는 방법이 있다. `docker ps`는 현재 실행중인 컨테이너만 나타내며 `-a` 옵션을 사용하면 정지된 컨테이너를 포함하여 모든 컨테이너를 출력한다.

```shell
> docker start a7
a7
> docker attach a7
root@a7ccae32086d:/#
```

로컬에 있는 컨테이너에 접속하기 위해서는 `start` 이후 `attach`를 사용해야 한다. `start` 명령어는 컨테이너 ID와 이름을 사용할 수 있는데 ID의 경우 앞자리의 일부분만 적어도 된다. 만약 같은 값으로 시작하는 다른 해시값이 있을 수 있으므로 적절하게 표시해야한다.

## 컨테이너 삭제

컨테이너 삭제를 할 때는 `docker rm` 명령어를 사용한다. 한 번 삭제하면 복구할 수 없으므로 주의 해야한다.

```shell
> docker rm a7
Error response from daemon: You cannot remove a running container a7ccae32086dd7d70b13db01ba67d2b68b5fd5f4d2ce4f526b1d2e4bd8aa0280. Stop the container before attempting removal or force remove

> docker stop a7
> docker rm a7

> docker rm -f a7

> sudo docker container prune     
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
```

만약 정지된 상태가 아니라 실행중인 컨테이너를 삭제하려고 하는 경우 에러 메시지를 띄우는데 이 경우 `docker stop` 명령어를 이용해 컨테이너를 중지 시키고 삭제하거나 `-f` 옵션을 이용해 강제로 삭제하는 방법이 있다. 여러개의 정지된 도커 컨테이너를 한 번에 삭제하고 싶다면 `prune` 명령어를 이용하면 된다.

## 컨테이너 외부에 노출

컨테이너는 가상 IP주소를 할당 받는다. `ifconfig` 명령어를 통해 네트워크 인터페이스를 확인하면 이더넷 `eth0`와 로컬 호스트인 `lo`가 나타난다. 기본적인 상태에서는 호스트를 제외하고는 외부에서 해당 컨테이너로의 접근이 불가능하다.

```shell
> docker run -it --name test ubuntu:20.04
root@65a10791f777:/# ifconfig

eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.17.0.2  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)
        RX packets 5597  bytes 23488769 (23.4 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 4523  bytes 310907 (310.9 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

```shell
> docker run -it --name network_test -p 80:80 ubuntu:20.04
> docker run -it --name network_test -p 443:443 -p 192.168.0.1:4321:80 ubuntu:20.04
```

해당 컨테이너를 삭제하고 새롭게 컨테이너를 생성하는데 이때 `-p` 옵션을 추가한다. `-p` 옵션은 `--publish`로 대체할 수 있다. 해당 옵션은 `호스트의 포트:컨테이너의 포트` 형태로 바인딩해준다. 여러개의 포트를 사용하고자 한다면 `-p` 옵션을 여러번 사용하여 명시해주면 된다.

```shell
> docker run -it --name network_test -p 80:80 ubuntu:20.04
root@67d41886df41:/# apt update && apt upgrade -y && apt install apache2 -y
root@67d41886df41:/# service apache2 start
```

아파치 웹 서버를 설치한 후 로컬 호스트의 80포트로 접속하면 아파치 웹 서버의 디폴트 페이지가 보인다. 컨테이너의 80포트로 접근하려면 172.17.0.2:80을 통해 접근해야 하지만 `-p` 옵션을 통해 호스트의 80포트를 컨테이너의 80포트로 포워딩 해주었기 때문에 접근이 가능하다.

## 참조(References)

- 용찬호, *시작하세요! 도커/쿠버네티스: 친절한 설명으로 쉽게 이해하는 컨테이너 관리*, (2020, 위키북스).
- "Monolithic application", *Wikipedia*, https://en.wikipedia.org/wiki/Monolithic_application.
- "Docker run reference", *Docker Docs*, https://docs.docker.com/engine/reference/run/.
- "Docker Container networking", *Docker Docs*, https://docs.docker.com/config/containers/container-networking/.