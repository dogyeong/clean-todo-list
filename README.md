# clean-todo-list

## What is it

- 클린 아키텍쳐를 읽고 실습으로 투두리스트 만들기
- 아키텍처 관점에서 접근
  - 의존성을 어떻게 관리할 것인지
- TDD 방식 적용
- 타입스크립트 기반

## Architecture

- Model (플랫폼에 관계없이 사용가능해야 함)
  - Entity : 핵심 비즈니스로직을 캡슐화하는 객체(클래스)
  - UseCase : 운영 관점에서의 비즈니스로직
- Adapter (인터페이스 어댑터 계층, 웹에서 서비스할 수 있도록 변환하는 역할)
  - Controller: UseCase로 인풋을 전달
  - Presenter: UseCase의 아웃풋을 받아서 ViewModel을 만드는 역할
  - View: 만들어진 ViewModel로 화면을 그리는 역할
- Driver (구체적인 플러그인 계층)
  - Storage: DB 플러그인

```
# asciiflow.com

          +-------------------+         +-------------------+
          |                   |         |                   |
          |                   |         |                   |
          |    Todo Entity    |<--------+    List Entity    |
          |                   |         |                   |
          |                   |         |                   |
          +---------^---------+         +----------^--------+
                    |                              |
                    +---------------+--------------+
                                    |
                         +----------+-----------+               +-------------------+
                         |                      |               |                   |
                         |                      |               |                   |
                         |      Interactor      |               |     Storage       |
                         |                      +-------------->|                   |
                         |       Usecase        |               |     Interface     |
                         |                      |               |                   |
                         +---------^------------+               +---------^---------+
                                   |                                      |
                                   |                  Models              |
                                   |                                      |
-----------------------------------+----------------------+---------------+--------------------
                                   |                      |               |
                                   |           Adapters   |   Drivers     |
                                   |                      |               |
                +------------------+-----+                |               |
                |                        |                |               |
                |                        |                |     +---------+-----------+
        +-------+-------+      +---------+-------+        |     |                     |
        |               |      |                 |        |     |                     |
        |               |      |                 |        |     |    LocalStorage     |
        |   Presenter   |      |    Controller   |        |     |                     |
        |               |      |                 |        |     |       Driver        |
        |               |      |                 |        |     |                     |
        +-------+-------+      +-----------------+        |     +---------------------+
                |                                         |
                |                                         |
        +-------v-------+                                 |
        |               |                                 |
        |               |                                 |
        |   View Model  |                                 |
        |               |                                 |
        |               |                                 |
        +-------^-------+                                 |
                |                                         |
                |                                         |
        +-------+-------+                                 |
        |               |                                 |
        |               |                                 |
        |     View      |                                 |
        |               |                                 |
        |               |                                 |
        +---------------+                                 |
                                                          |
```