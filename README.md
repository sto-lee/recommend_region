# 서울 지역 추천 챗봇

이 프로젝트는 서울 지역을 추천하고, 관련 정보를 대화형으로 제공하는 인공지능 챗봇 서비스입니다. 사용자는 자연어로 궁금한 점을 입력하면, 챗봇이 대화 중 필요한 정보가 부족할 경우 추가 질문을 통해 정보를 보완하며, 그래프 데이터베이스(Neo4j)에 저장된 정보를 바탕으로 맞춤형 답변을 제공합니다. 사용자의 의도를 파악해 최적의 추천을 제공합니다.

**주요 목적 및 특징**
- 서울 지역에 특화된 장소 추천 및 정보 제공
- 자연어 기반의 자유로운 질의응답 지원
- 대화 맥락을 반영한 맞춤형 추천
- 그래프 데이터베이스(Neo4j)와 연동하여 관계형 정보 탐색
- LangChain, LangGraph 등 최신 LLM 및 에이전트 오케스트레이션 기술 활용
- Streamlit 기반의 직관적이고 간편한 웹 UI 제공

Neo4j 그래프 데이터베이스와 연동하여 다양한 정보를 제공합니다.

---

## 사용 기술 스택

- **Streamlit** : 웹 기반 대화형 UI 구현
- **Neo4j** : 그래프 데이터베이스, 서울 지역 정보 저장 및 질의
- **LangChain** : LLM(대형 언어 모델) 기반 자연어 처리 및 에이전트 구성
- **LangGraph** : 그래프 기반 워크플로우 및 에이전트 오케스트레이션
- **OpenAI API** : GPT 등 LLM 활용
- **Python-dotenv** : 환경 변수 관리
- **Python** : 전체 서비스 구현 언어

---

## 프로젝트 구조

```
HOME_Genie_project/
├── app.py                # Streamlit UI 및 챗봇 메인 실행 파일
├── config.py             # 환경 변수 및 툴(neo4j 등) 설정
├── tools/
│   └── graph_query.py    # 그래프 DB 질의용 툴
├── llm/
│   └── slot_filler.py    # LLM 기반 슬롯 추출기
├── graph/
│   └── build_graph.py    # 그래프 데이터 구축 스크립트
├── chat/
│   └── driver.py         # 챗봇 대화 흐름 제어
├── agents/
│   ├── ask_user.py
│   ├── slot_filler_agent.py
│   ├── rank_agent.py
│   ├── retrieve_agent.py
│   ├── graph_agent.py
│   └── planner_agent.py  # 다양한 역할의 에이전트
└── README.md
```

---

## 설치 및 실행 방법

1. **필수 패키지 설치**
   ```bash
   pip install -r requirements.txt
   ```

2. **환경 변수 설정**
   - `.env` 파일을 프로젝트 루트에 생성하고 아래와 같이 입력하세요.
     ```
     OPENAI_API_KEY=your_openai_api_key
     NEO4J_URL=bolt://localhost:7687
     NEO4J_USER=neo4j
     NEO4J_PW=your_neo4j_password
     ```

3. **그래프 데이터 구축**
   - `graph/build_graph.py`를 실행하여 Neo4j에 데이터를 구축합니다.
     ```bash
     python graph/build_graph.py
     ```

4. **Streamlit 앱 실행**
   ```bash
   streamlit run app.py
   ```

---

## 주요 파일 및 폴더 설명

- **app.py**  
  Streamlit 기반의 챗봇 UI 및 메인 실행 파일입니다.  
  사용자 입력을 받아 챗봇과의 대화를 관리합니다.

- **config.py**  
  환경 변수 로딩 및 Neo4j 드라이버, 툴 객체를 초기화합니다.

- **tools/graph_query.py**  
  Neo4j 그래프 데이터베이스에 질의를 보내는 툴 클래스가 정의되어 있습니다.

- **llm/slot_filler.py**  
  LLM을 활용해 사용자의 입력에서 슬롯(정보)을 추출하는 기능을 담당합니다.

- **graph/build_graph.py**  
  서울 지역 관련 데이터를 Neo4j에 구축하는 스크립트입니다.

- **chat/driver.py**  
  챗봇의 대화 흐름을 제어하는 핵심 로직이 구현되어 있습니다.

- **agents/**  
  다양한 역할의 에이전트(슬롯 추출, 랭킹, 질의, 그래프, 플래너 등)가 정의되어 있습니다.

---

## 사용 예시

1. 웹 브라우저에서 Streamlit 앱을 실행하면 챗봇 UI가 나타납니다.
2. "강남역 근처 맛집 추천해줘"와 같이 질문을 입력하면 챗봇이 답변을 제공합니다.

---

## 문의

- 이 프로젝트에 대한 문의는 이슈 또는 PR로 남겨주세요.
