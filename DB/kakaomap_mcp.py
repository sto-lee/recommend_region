"""
Kakao MCP를 이용한 교통 정보 추출
"""
import mcp
from mcp.client.websocket import websocket_client
import json
import base64
import os
from dotenv import load_dotenv
import pandas as pd
import asyncio

load_dotenv()

config = {
    "kakaoRestApiKey": os.getenv('KAKAO_API_KEY')
}
# Encode config in base64
config_b64 = base64.b64encode(json.dumps(config).encode())
smithery_api_key = os.getenv('SMITHERY_API_KEY')

print(os.getenv('KAKAO_API_KEY'))
print(os.getenv('SMITHERY_API_KEY'))

# Create server URL
url = f"wss://server.smithery.ai/@CaChiJ/kakao-mobility-mcp-server/ws?config={config_b64}&api_key={smithery_api_key}"

async def call_tool(originAddress: str, destAddress: str):
    # Connect to the server using websocket client
    async with websocket_client(url) as streams:
        async with mcp.ClientSession(*streams) as session:
            # Initialize the connection
            await session.initialize()

            result = await session.call_tool("direction_search_by_address", arguments={"originAddress": originAddress, 
                                                                                        "destAddress":destAddress})

            raw = result.json()

            if isinstance(raw, str):
                response = json.loads(raw)
            else:
                response = raw

            inner_json_str = response['content'][0]['text']

            inner_data = json.loads(inner_json_str)

            # 예외처리 추가
            if not inner_data.get('routes') or not inner_data['routes']:
                raise ValueError(f"경로 정보가 없습니다: {originAddress} -> {destAddress}")

            summary = inner_data['routes'][0].get('summary')
            if not summary:
                raise ValueError(f"summary 정보가 없습니다: {originAddress} -> {destAddress}")

            result = {
                'distance_m': summary['distance'],
                'duration_s': summary['duration'],
            }

            return result

# 주소 데이터 로드
csv_path = './data/HomeGenie_fixed_with_avg_price.csv'
df = pd.read_csv(csv_path)
df['address'] = df['시군구'].str.cat(df['도로명주소'], sep=' ')
df = df.head()

# addresses = df['address'].drop_duplicates().tolist()

addresses = ['서울특별시 아차산로 27길 61', '서울특별시 왕십리로 222', '서울특별시 송파구 올림픽로 155']

results = []

async def process_all():
    for i, origin in enumerate(addresses):
        print(f"Processing {i+1} of {origin}")
        for j, dest in enumerate(addresses):
            if i == j:
                continue
            try:
                summary = await call_tool(origin, dest)
                results.append({
                    'origin': origin,
                    'dest': dest,
                    'distance_m': summary['distance_m'],
                    'duration_s': summary['duration_s']
                })
                print(f"성공: {origin} -> {dest}")
            except Exception as e:
                print(f"실패: {origin} -> {dest} : {e}")

    # 결과를 CSV로 저장
    pd.DataFrame(results).to_csv('./data/traffic_data.csv', index=False)

if __name__ == '__main__':
    asyncio.run(process_all())