import streamlit as st
from chat.driver import run_chat
from config import get_tools

# ────── Streamlit UI ──────
st.set_page_config(page_title="서울 지역 추천 챗봇")
st.title("🏘️ 서울 지역 추천 챗봇")
if "lang_state" not in st.session_state: st.session_state.lang_state={}
if "messages"   not in st.session_state: st.session_state.messages=[]

tools = get_tools()

# 이전 대화 렌더
for m in st.session_state.messages:
    with st.chat_message(m["role"]):
        st.markdown(m["content"])

prompt = st.chat_input("궁금한 점을 입력하세요")

if prompt:
    st.session_state.messages.append({"role":"user","content":prompt})
    with st.chat_message("user"): st.markdown(prompt)

    result = run_chat(prompt, tools,
                        prev=st.session_state.get("lang_state"),
                        sid="user")
    print(result)
    
    st.session_state.lang_state = result

    # 챗봇의 다음 행동
    if "answer" in result:
        bot_msg = result["answer"]
    else:
        bot_msg = result.get("ask","(알 수 없는 응답입니다)")
    st.session_state.messages.append({"role":"assistant","content":bot_msg})

    with st.chat_message("assistant"): st.markdown(bot_msg)
